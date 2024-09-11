var express = require("express");

var path = require("path");
var logger = require("morgan");
var db = require("./config/db");

const cors = require("cors");
const userRouter = require("./routes/userRouter")
var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/api",userRouter)


db();

module.exports = app;
