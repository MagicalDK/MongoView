const MongoClient = require("mongodb").MongoClient;
const Db = require('mongodb').Db;
const Server = require('mongodb').Server;

module.exports = (callback) => {
    const state = { };

	var url = "mongodb://127.0.0.1";
	MongoClient.connect(url, function(error, database) {
		if ( error ) return console.log(error.message);
	  	console.log("Using MongoDB database");

        var db = new Db('test', new Server('localhost', 27017));
        db.open(function(dbError, db) {
            if ( dbError ) return console.log(dbError.message);

            state.database = database;
            state.adminDatabase = db.admin();

            //db.close();
            callback(state);
        });
	});
};
