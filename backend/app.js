var express = require("express");

var path = require("path");
var logger = require("morgan");
var db = require("./config/db");

const cors = require("cors");
var error = require("./middleware/error_handle");
const userRouter = require("./routes/userRouter");
const friendRequestsRoutes = require('./routes/friendRequestsRoutes'); 
var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/api", userRouter);
app.use('/api/friendRequest', friendRequestsRoutes);

app.use(error.notfound);

app.use(error.errorhandler);

db();

module.exports = app;
