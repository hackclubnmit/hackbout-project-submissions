package com.neelkamath.osmosis.server

import com.google.gson.annotations.SerializedName

/**
 * Every top-level array element represents a day of the week using zero-based indexing.
 *
 * Inside every array is another array. Every subarray's element represents the number of passengers that traveled
 * this route during different times of this day. Each element represents six hours of the day. The first, second,
 * third, and fourth elements represent 0:00-6:00, 6:00-12:00, 12:00-18:00, and 18:00-24:00 respectively.
 */
typealias Days = List<List<Int>>

data class Balance(val balance: Int)

data class BusMovements(
    @SerializedName("buses") val busDataList: List<BusData>,
    @SerializedName("routes") val busRoutes: List<BusRoute>
)

data class BusData(
    /** License plate number. */
    val bus: String,
    /** Name of the bus route. */
    val route: String,
    /** Current longitude. */
    val longitude: Float,
    /** Current latitude. */
    val latitude: Float,
    /** Number of seats the bus contains. */
    val seats: Int,
    /** Number of passengers currently in the bus. */
    val passengers: Int
)

data class BusRoute(
    val route: String,
    @SerializedName("stops") val busStops: List<BusStop>,
    /** Cost matrix. */
    val costs: List<List<Int>>
) {
    init {
        if (costs.size != busStops.size || costs.map { it.size }.toSet().size > 1)
            throw Error("The cost matrix must have the same dimensions as the number of bus stops there are.")
    }
}

data class BusStop(val name: String, val longitude: Float, val latitude: Float)

data class Trips(val trips: List<Trip>)

/** A trip a passenger has/had. */
data class Trip(
    /** Name of the bus route. */
    val route: String,
    val pickup: DatedLocation,
    val drop: DatedLocation,
    /** Number of tickets purchased for this trip. */
    val tickets: Int,
    /** Whether the trip is ongoing. */
    val ongoing: Boolean,
    /**
     * The fine incurred.
     *
     * This will be `null` if the journey is ongoing, `0` if no fine was incurred, or a natural number if a fine was
     * incurred.
     */
    val fine: Int?,
    /** The total amount paid (inclusive of the fine), or `null` if the journey is ongoing. */
    val fare: Int?
)

/** A field will be `null` if the drop-off point is unknown (e.g., the journey is ongoing). */
data class DatedLocation(
    /** For example, `"2020-02-03"`. */
    val date: String? = null,
    /** For example, `"17:45"`. */
    val time: String? = null,
    /** Name of the bus stop. */
    val location: String? = null
)

data class Ticket(
    /** Bus's license number. */
    val bus: String,
    val pickup: DatedLocation,
    val drop: DatedLocation,
    val transaction: Transaction
) {
    @Transient
    val year: Int? = pickup.date?.substring(0..3)?.toInt()

    @Transient
    val month: Int? = pickup.date?.substring(5..6)?.toInt()
}

data class Transaction(
    /** Whether the passenger paid in cash; otherwise they paid via the app. */
    val cash: Boolean,
    /** Number of tickets the passenger purchased for their trip. */
    val tickets: Int,
    /** Whether this transaction is ongoing. */
    val ongoing: Boolean,
    /**
     * The fine incurred.
     *
     * This will be `null` if the journey is ongoing, `0` if no fine was incurred, or a natural number if a fine was
     * incurred.
     */
    val fine: Int?,
    /** The total amount paid (inclusive of the fine), or `null` if the journey is ongoing. */
    val fare: Int? = null
)

data class FareData(
    /** Bus's license number. */
    val bus: String,
    /** Number of tickets the passenger purchased for their trip. */
    val tickets: Int,
    /** Which bus stop the passenger was picked up at. */
    @SerializedName("start_stop") val startStop: String,
    /** Which bus stop the passenger is to be dropped off at. */
    @SerializedName("end_stop") val endStop: String
)

data class Bus(
    /** The bus's license number. */
    val bus: String
)

data class TransactionCount(val transactions: Int)

data class Fare(val fare: Int)

data class NewTransaction(
    /** The bus's license number. */
    val bus: String,
    /** Number of tickets the passenger purchased for their trip. */
    val tickets: Int,
    /** Which bus stop the passenger was picked up at. */
    @SerializedName("start_stop") val startStop: String
)

data class MoneyAnalytics(val money: List<MonthlyRevenue>)

data class MonthlyRevenue(
    val year: Int,
    /** The zero-based index of the month (January is `0`). */
    val month: Int,
    val money: Int
)

data class PassengerAnalytics(val analytics: List<MonthlyPassengerCount>)

data class MonthlyPassengerCount(
    val year: Int,
    val month: Int,
    /** Name of the bus route. */
    val route: String,
    /** Number of passengers who traveled this route this month. */
    val passengers: Int
)

data class RouteAnalytics(val routes: List<RouteTraffic>)

data class RouteTraffic(
    /** Name of the bus route. */
    val route: String,
    val days: Days
)