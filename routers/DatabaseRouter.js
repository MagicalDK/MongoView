const express = require("express");

module.exports = (state) => {
    const router = express.Router();

    router.get("/", (request, response) => {
        console.log("/databases - GET");

        state.adminDatabase.listDatabases(function(error, databases) {
            if ( error ) return console.log("Error listing databases");

            console.log("Number of databases: " + databases.databases.length);
            return response.render("index", { title: "Databases", databases: databases.databases });
        });
    });

    router.post("/", (request, response) => {
        console.log("/databases - POST");
        const databaseName = request.body.databaseName;
        const collectionName = request.body.collectionName;

        if ( !databaseName || !collectionName ) return response.redirect(301, "/databases");

        const database = state.database.db(databaseName);
        database.createCollection(collectionName, function(error, collection){
            return response.redirect(301, "/databases");
        });
    });

    return router;
}
