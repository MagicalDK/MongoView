const State = require("./State");

State((state) => {
    const server = require("./Server")(state);
    server.listen(3000, function () {
        const port = this.address().port;
        console.log("Server started at port" + port);
    });
});
