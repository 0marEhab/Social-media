const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event.controller");
const isAuth = require("../middleware/isAuth");

// Define routes
router.get("/", isAuth, eventController.getEvents); // Get events for the logged-in user
router.post("/", isAuth, eventController.createEvent); // Create a new event for the logged-in user

module.exports = router;
