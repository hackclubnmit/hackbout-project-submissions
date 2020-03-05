package com.neelkamath.osmosis.server

import com.mongodb.client.MongoClients
import com.mongodb.client.MongoDatabase
import org.bson.Document
import java.io.File

fun getMongoDb(): MongoDatabase {
    val dbUri = System.getenv("MONGODB_URI")!!
    // We set <retryWrites> to <false> because mLab's free tier doesn't support writes being retried.
    return MongoClients
        .create("$dbUri?retryWrites=false")
        .getDatabase(dbUri.split("/").last())
}

fun seed() {
    seedBalance()
    seedDataset("bus_routes")
    seedDataset("buses")
    seedDataset("tickets")
}

private fun isSeeded(collection: String) = db.listCollectionNames().contains(collection)

private fun seedBalance() {
    if (isSeeded("balance")) return
    db.createCollection("balance")
    db.getCollection("balance").insertOne(Document("balance", 0))
}

private fun seedDataset(dataset: String) {
    if (isSeeded(dataset)) return
    db.createCollection(dataset)
    val collection = db.getCollection(dataset)
    with(FileFinder()) {
        getFiles(File("src/main/resources/datasets/$dataset"))
        files
            .map { Document.parse(it.readText()) }
            .map { collection.insertOne(it) }
    }
}

/**
 * Recursively finds files in a given directory using [getFiles].
 *
 * Every time you use this class, you should create a new instance of it. Call [getFiles], and then read the value of
 * [files].
 */
private class FileFinder {
    val files = mutableListOf<File>()

    fun getFiles(directory: File) {
        for (fileEntry in directory.listFiles()!!)
            if (fileEntry.isDirectory)
                getFiles(fileEntry)
            else if (fileEntry.name != ".DS_Store")
                files.add(fileEntry)
    }
}