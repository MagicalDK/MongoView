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

    return router;
}
