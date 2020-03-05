package com.neelkamath.osmosis.server

import ch.qos.logback.classic.Level
import ch.qos.logback.classic.LoggerContext
import com.google.gson.FieldNamingPolicy
import com.google.gson.GsonBuilder
import com.mongodb.client.model.Filters.eq
import com.mongodb.client.model.Filters.exists
import io.ktor.application.Application
import io.ktor.application.ApplicationCall
import io.ktor.application.call
import io.ktor.application.install
import io.ktor.features.CORS
import io.ktor.features.CallLogging
import io.ktor.features.ContentNegotiation
import io.ktor.gson.GsonConverter
import io.ktor.http.ContentType
import io.ktor.http.HttpHeaders
import io.ktor.http.HttpMethod
import io.ktor.http.HttpStatusCode
import io.ktor.response.respond
import io.ktor.routing.Routing
import io.ktor.routing.get
import org.bson.Document
import org.slf4j.LoggerFactory
import java.io.File
import java.time.LocalDate
import java.time.LocalTime

private data class RoutePopulation(
    /** Name of the bus route. */
    val route: String,
    val time: String,
    val passengers: Int
)

/** Shared Gson configuration for the entire project. */
val gson = GsonBuilder().setFieldNamingPolicy(FieldNamingPolicy.LOWER_CASE_WITH_UNDERSCORES).create()!!

/** Amount to fine passengers who do not explicitlyd end the transaction when leaving the bus. */
const val fine = 20
val db = getMongoDb()

fun Application.main() {
    (LoggerFactory.getILoggerFactory() as LoggerContext).getLogger("org.mongodb.driver").level = Level.ERROR
    seed()
    install(CallLogging)
    install(ContentNegotiation) { register(ContentType.Application.Json, GsonConverter(gson)) }
    install(CORS) {
        method(HttpMethod.Options)
        method(HttpMethod.Get)
        method(HttpMethod.Post)
        method(HttpMethod.Put)
        method(HttpMethod.Delete)
        method(HttpMethod.Patch)
        header(HttpHeaders.AccessControlAllowHeaders)
        header(HttpHeaders.ContentType)
        header(HttpHeaders.AccessControlAllowOrigin)
        allowCredentials = true
        anyHost()
    }
    install(Routing) {
        // Common endpoints.
        get("buses") {
            call.respond(
                BusMovements(
                    db.getCollection("buses").find().toList().map { it.decode(BusData::class.java) },
                    db.getCollection("bus_routes").find().toList().map { it.decode(BusRoute::class.java) }
                )
            )
        }

        // Passenger endpoints.
        get("journeys") { call.respond(Trips(getTickets().map(::ticketToTrip))) }
        get("balance") {
            val balance = db.getCollection("balance").find().first()!!.getInteger("balance")
            call.respond(Balance(balance))
        }
        get("update_balance") {
            val amount = call.request.queryParameters["balance"]!!.toInt()
            val collection = db.getCollection("balance")
            val oldBalance = collection.find().first()!!.decode(Balance::class.java).balance
            collection.deleteOne(exists("balance"))
            collection.insertOne(Document("balance", oldBalance + amount))
            call.respond(HttpStatusCode.NoContent)
        }

        // Conductor endpoints.
        get("cash_transaction") {
            db.getCollection("tickets").insertOne(encode(ticketCash(getFareData(call))))
            call.respond(HttpStatusCode.NoContent)
        }
        get("end_transaction") {
            val bus = call.request.queryParameters["bus"]!!
            endTransactions(bus)
            call.respond(HttpStatusCode.NoContent)
        }
        get("ongoing_transactions") {
            val bus = call.request.queryParameters["bus"]!!
            val tickets = db.getCollection("tickets").find(eq("bus", bus)).map { it.decode(Ticket::class.java) }
            val ongoing = tickets.filter { it.transaction.ongoing }.size
            call.respond(TransactionCount(ongoing))
        }
        get("request_fare") {
            with(getFareData(call)) {
                val fare = calculateFare(getRoute(bus), startStop, endStop, tickets)
                call.respond(Fare(fare))
            }
        }
        get("start_transaction") {
            val transaction = getNewTransaction(call)
            val balance = db.getCollection("balance").find().first()!!.decode(Balance::class.java).balance
            val requiredBalance = with(transaction) { getLastStopFare(getRoute(bus), startStop) * tickets + fine }
            if (balance < requiredBalance)
                call.respond(HttpStatusCode.PaymentRequired)
            else {
                db.getCollection("tickets").insertOne(encode(ticketTransaction(transaction)))
                call.respond(HttpStatusCode.NoContent)
            }
        }

        // Admin endpoints.
        get("analytics/money") {
            val revenues = getCompletedTransactions().map(::calculateRevenue)
            File("output.txt").writeText(getCompletedTransactions().toString())
            call.respond(MoneyAnalytics(combineRevenues(revenues)))
        }
        get("analytics/passengers") {
            val counts = getCompletedTransactions().map(::calculatePassengerCount)
            call.respond(PassengerAnalytics(combineCounts(counts)))
        }
        get("analytics/routes") {
            val tickets = db.getCollection("tickets").find().map { it.decode(Ticket::class.java) }
            val populations = tickets
                .map { RoutePopulation(getRoute(it.bus), it.pickup.time!!, passengers = 1) }
                .toList()
            combinePopulations(populations)
        }

        // Health check endpoint.
        get("health_check") { call.respond(HttpStatusCode.NoContent) }
    }
}

private fun <T> Document.decode(klass: Class<T>): T = gson.fromJson(toJson(), klass)

private fun <T> encode(data: T): Document = Document.parse(gson.toJson(data))

private fun getTickets(): List<Ticket> =
    db.getCollection("tickets").find().toList().map { it.decode(Ticket::class.java) }

/** Returns the bus route the [bus]'s license number is registered on. */
private fun getRoute(bus: String): String =
    db.getCollection("buses").find(eq("bus", bus)).first()!!.decode(BusData::class.java).route

private fun ticketToTrip(ticket: Ticket): Trip = with(ticket) {
    Trip(
        getRoute(bus),
        pickup,
        drop,
        transaction.tickets,
        transaction.ongoing,
        transaction.fine,
        ticket.transaction.fare
    )
}

private fun ticketCash(transaction: FareData): Ticket = with(transaction) {
    Ticket(
        bus,
        pickup = DatedLocation(getDateString(), getTimeString(), startStop),
        drop = DatedLocation(location = endStop),
        transaction = Transaction(
            cash = true,
            tickets = tickets,
            ongoing = true,
            fine = 0,
            fare = calculateFare(getRoute(bus), startStop, endStop)
        )
    )
}

private fun ticketTransaction(transaction: NewTransaction): Ticket = with(transaction) {
    Ticket(
        bus,
        pickup = DatedLocation(getDateString(), getTimeString(), startStop),
        drop = DatedLocation(),
        transaction = Transaction(
            cash = true,
            tickets = tickets,
            ongoing = true,
            fine = 0
        )
    )
}

private fun calculateFare(route: String, startStop: String, endStop: String, tickets: Int = 1): Int {
    val busRoute = getBusRoute(route)
    val stops = busRoute.busStops.map { it.name }
    val startIndex = stops.indexOf(startStop)
    val endIndex = stops.indexOf(endStop)
    return busRoute.costs[startIndex][endIndex] * tickets
}

/** Returns the current date in the specified format. */
private fun getDateString(): String = LocalDate.now().toString()

/** Returns the current time in the specified format. */
private fun getTimeString(): String = LocalTime.now().toString().substring(0..4)

private fun getBusRoute(route: String): BusRoute =
    db.getCollection("bus_routes").find(eq("route", route)).first()!!.decode(BusRoute::class.java)

private fun getRandomLocation(bus: String): String = getBusRoute(getRoute(bus)).busStops.random().name

private fun endTransactions(bus: String) {
    val collection = db.getCollection("tickets")
    for (ticket in collection.find(eq("bus", bus))) {
        val dropLocation = getRandomLocation(bus)
        with(ticket) {
            with(get("drop") as Document) {
                set("date", getDateString())
                set("time", getTimeString())
                set("location", dropLocation)
            }
            val pickupLocation = (get("pickup") as Document).getString("location")
            val fare = calculateFare(getRoute(bus), pickupLocation, dropLocation)
            deduct(fare)
            with(get("transaction") as Document) {
                set("ongoing", false)
                set("fare", fare)
            }
        }
        collection.replaceOne(eq("_id", ticket["_id"]), ticket)
    }
}

private fun deduct(fare: Int) {
    val collection = db.getCollection("balance")
    val balance = collection.find().first()!!.decode(Balance::class.java).balance
    collection.replaceOne(exists("balance"), Document("balance", balance - fare))
}

private fun getLastStopFare(route: String, startStop: String): Int {
    val busRoute = db.getCollection("bus_routes").find(eq("route", route)).first()!!.decode(BusRoute::class.java)
    if (busRoute.busStops.size < 2) return 0
    val startIndex = busRoute.busStops.map { it.name }.indexOf(startStop)
    val stopIndex = if (startIndex == 0) busRoute.busStops.lastIndex else startIndex - 1
    return busRoute.costs[startIndex][stopIndex]
}

private fun getCompletedTransactions(): List<Ticket> =
    db.getCollection("tickets").find().map { it.decode(Ticket::class.java) }.filterNot { it.transaction.ongoing }

private fun calculateRevenue(ticket: Ticket): MonthlyRevenue =
    with(ticket) { MonthlyRevenue(year!!, month!!, transaction.fare!! + transaction.fine!!) }

/** Combines [MonthlyRevenue]s having the same [MonthlyRevenue.year] and [MonthlyRevenue.month]. */
private fun combineRevenues(revenues: List<MonthlyRevenue>): List<MonthlyRevenue> =
    revenues.fold(mutableListOf()) { accumulated, monthlyRevenue ->
        val years = accumulated.map { it.year }
        val months = accumulated.map { it.month }
        if (years.contains(monthlyRevenue.year) && months.contains(monthlyRevenue.month)) {
            val yearIndex = years.indexOf(monthlyRevenue.year)
            val monthIndex = months.indexOf(monthlyRevenue.month)
            if (yearIndex == monthIndex) {
                accumulated.removeAt(yearIndex)
                accumulated.add(
                    MonthlyRevenue(
                        monthlyRevenue.year,
                        monthlyRevenue.month,
                        accumulated[yearIndex].money + monthlyRevenue.money
                    )
                )
            }
        }
        accumulated
    }

private fun calculatePassengerCount(ticket: Ticket): MonthlyPassengerCount =
    with(ticket) { MonthlyPassengerCount(year!!, month!!, getRoute(bus), passengers = 1) }

private fun combineCounts(counts: List<MonthlyPassengerCount>): List<MonthlyPassengerCount> =
    counts.fold(mutableListOf()) { accumulated, passengerCount ->
        val years = accumulated.map { it.year }
        val months = accumulated.map { it.month }
        if (years.contains(passengerCount.year) && months.contains(passengerCount.month)) {
            val yearIndex = years.indexOf(passengerCount.year)
            val monthIndex = months.indexOf(passengerCount.month)
            if (yearIndex == monthIndex) {
                accumulated.removeAt(yearIndex)
                accumulated.add(
                    MonthlyPassengerCount(
                        passengerCount.year,
                        passengerCount.month,
                        passengerCount.route,
                        passengerCount.passengers + accumulated[yearIndex].passengers
                    )
                )
            }
        }
        accumulated
    }

private fun combinePopulations(populations: List<RoutePopulation>): List<RoutePopulation> =
    populations.fold(mutableListOf()) { accumulator, population ->

        accumulator
    }

private fun getFareData(call: ApplicationCall): FareData = with(call.request.queryParameters) {
    FareData(get("bus")!!, get("tickets")!!.toInt(), get("start_stop")!!, get("end_stop")!!)
}

private fun getNewTransaction(call: ApplicationCall): NewTransaction = with(call.request.queryParameters) {
    NewTransaction(get("bus")!!, get("tickets")!!.toInt(), get("start_stop")!!)
}