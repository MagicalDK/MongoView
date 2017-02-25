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

    return router;
}
