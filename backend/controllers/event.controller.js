const Event = require("../models/Event"); // Make sure to import your Event model

// Get events for a specific user
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find({ userId: req.user._id });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create an event for a specific user
exports.createEvent = async (req, res) => {
  const { date, name } = req.body;
  const event = new Event({
    date,
    name,
    userId: req.user._id, // Associate event with the user
  });
  try {
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
