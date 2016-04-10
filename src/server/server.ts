import express = require("express");
import path = require("path");

let favicon = require("serve-favicon");
let logger = require("morgan");
let cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");

let engine = require("ejs-mate");
let port: number = process.env.PORT || 9090;

let routes = require("./routes/index");
let mockservice = require("./routes/mock");

let app = express();

app.use("/client", express.static(path.resolve("./built/client")));
app.use("/node_modules", express.static(path.resolve("./node_modules")));
app.use("/lib", express.static(path.resolve("./public/lib")));
app.use("/images", express.static(path.resolve("./public/images")));

app.engine("ejs", engine);

app.set("views", "./built/client");
app.set("view engine", "ejs");

// uncomment after placing your favicon in /public 
// app.use(favicon(__dirname + "/public/favicon.ico"));

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(cookieParser());

app.use("/mock/*", mockservice);
app.use("/*", routes);

app.listen(9090, function() {
    console.log("server started 9090 ");
});

module.exports = app;
