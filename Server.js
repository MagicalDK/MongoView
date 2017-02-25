const express = require("express");
const bodyParser = require("body-parser");
var path = require('path');

const DatabaseRouter = require("./routers/DatabaseRouter");
const CollectionRouter = require("./routers/CollectionRouter");
const DocumentRouter = require("./routers/DocumentRouter");

module.exports = (state) => {
	const app = express();

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug')
    app.use(express.static(path.join(__dirname, 'public')));

	app.use(bodyParser.json({ limit: "5mb" }));
	app.use(bodyParser.urlencoded({ extended: true }));

    app.use("/databases", DatabaseRouter(state));
    app.use("/collections", CollectionRouter(state));
    app.use("/documents", DocumentRouter(state));

	return app;
};
