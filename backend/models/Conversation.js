const mongoose = require("mongoose");

// Declare the Schema of the Mongo model
var conversationSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model
    },
  },
  { timestamps: true }
);

// Export the model
module.exports = mongoose.model("Conversation", conversationSchema);
