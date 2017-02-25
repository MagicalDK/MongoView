const express = require("express");

module.exports = (state) => {
    const router = express.Router();

    router.get("/", (request, response) => {
        const databaseName = request.query.database;
        console.log("/collections - GET - " + databaseName);

        const database = state.database.db(databaseName);
        database.listCollections().toArray(function(error, collections){
            if ( error ) return console.log("Error listing collections");

            console.log(JSON.stringify(collections));
            const title = databaseName + " - Collections";
            return response.render("collections", { title: title, database: databaseName, collections: collections });
        });
    });

    router.post("/", (request, response) => {
        console.log("/collections - POST");
        const databaseName = request.query.database;
        const collectionName = request.body.collectionName;

        if ( !databaseName || !collectionName ) return response.redirect(301, "/collections");

        const database = state.database.db(databaseName);
        database.createCollection(collectionName, function(error, collection){
            if ( error ) return console.log("Error creating collection - " + error.message);

            return response.redirect(301, "/collections?database=" + databaseName);
        });
    });

    return router;
}
