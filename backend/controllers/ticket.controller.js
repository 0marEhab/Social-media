const Ticket = require("../models/Ticket");

exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (err) {
    console.error("Error fetching tickets:", err);
    res.status(500).json({ message: "Failed to retrieve tickets" });
  }
};

exports.createTicket = async (req, res) => {
  try {
    const { name, email, message, media } = req.body;
    const newTicket = new Ticket({
      name: name,
      email: email,
      message: message,
      media: media,
    });
    await newTicket.save();
    res
      .status(201)
      .json({ message: "Ticket created successfully", ticket: newTicket });
  } catch (err) {
    console.error("Error creating ticket:", err);
    res.status(500).json({ message: "Failed to create ticket" });
  }
};
