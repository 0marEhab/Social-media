var express = require("express");

var path = require("path");
var logger = require("morgan");
var db = require("./config/db");
const cors = require("cors");
var error = require("./middleware/error_handle");
const userRouter = require("./routes/userRouter");
const ticketRouter = require("./routes/ticketRouter");
const friendsRoutes = require("./routes/friendsRouter");
const postRouter = require("./routes/postRouter");
const chatRouter = require("./routes/chatRouter");
const searchRouter = require("./routes/searchRouter");
const adminRouter = require("./routes/adminRouter");
const bodyParser = require("body-parser");
const eventRouter = require("./routes/eventRouter"); // Import event routes

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/public/images",
  express.static(path.join(__dirname, "public/images"))
);
app.use("/api/events", eventRouter);
app.use("/api", userRouter);
app.use("/api", chatRouter);
app.use("/api", searchRouter);
app.use("/api", ticketRouter);
app.use("/api/friends", friendsRoutes);
app.use("/api/posts", postRouter);
app.use("/api/admin", adminRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(error.notfound);

app.use(error.errorhandler);
require("./seeders/index");
db();

module.exports = app;
