const Ticket = require("../models/Ticket");

exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    const ticketsWithMediaUrl = tickets.map((ticket) => {
      if (ticket.media) {
        ticket.media = `${req.protocol}://${req.get("host")}/uploads/${
          ticket.media
        }`;
      }
      return ticket;
    });

    res.status(200).json(ticketsWithMediaUrl);
  } catch (err) {
    console.error("Error fetching tickets:", err);
    res.status(500).json({ message: "Failed to retrieve tickets" });
  }
};

exports.createTicket = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const media = req.file ? req.file.filename : null;

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
