const express = require("express");

module.exports = (state) => {
    const router = express.Router();

    router.get("/", (request, response) => {
        const databaseName = request.query.database;
        const collectionName = request.query.collection;
        console.log("/documents - GET - " + databaseName + " : " + collectionName);

        const database = state.database.db(databaseName);
        const stream = database.collection(collectionName).find().stream();

        var documents = [];

        stream.on('data', function(doc) {
            console.log(doc);
            documents.push(doc);
        });
        stream.on('error', function(error) {
            console.log("Error getting document - " + error);
        });
        stream.on('end', function() {
            const title = databaseName + " - " + collectionName;
            return response.render("documents", { title: title, documents: documents, database: databaseName, collection: collectionName });
        });
    });

    router.get("/new", (request, response) => {
        const databaseName = request.query.database;
        const collectionName = request.query.collection;

        const title = databaseName + " - " + collectionName + " - " + "New document";
        return response.render("newDocument", { title: title, database: databaseName, collection: collectionName });
    });

    router.post("/", (request, response) => {
        const databaseName = request.query.database;
        const collectionName = request.query.collection;
        console.log("/documents - POST - " + databaseName + " - " + collectionName);

        const newDocument = request.body;
        
        const database = state.database.db(databaseName);
        database.collection(collectionName).insertOne(newDocument, (error, result) => {
            if ( error ) console.log("Error saving document - " + error);

            const url = "/documents" + "?database=" + databaseName + "&collection=" + collectionName;
            return response.redirect(301, url);
        });
    });

    return router;
}
