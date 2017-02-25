const express = require("express");

module.exports = (state) => {
    const router = express.Router();

    router.get("/", (request, response) => {
        const databaseName = request.query.database;
        const collectionName = request.query.collection;
        console.log("/collections - GET - " + databaseName + " : " + collectionName);

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
            return response.render("documents", { title: title, documents: documents });
        });
    });

    return router;
}
