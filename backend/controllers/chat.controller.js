const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

exports.storeConversation = async (req, res) => {
  const newConversation = new Conversation({
    senderId: req.body.senderId,
    receiverId: req.body.receiverId,
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.find({
      $or: [{ senderId: req.params.userId }, { receiverId: req.params.userId }],
    })
      .populate("senderId", "name profilePic") // Populate with name and profilePic of sender
      .populate("receiverId", "name profilePic"); // Populate with name and profilePic of receiver

    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.sendMessages = async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};
