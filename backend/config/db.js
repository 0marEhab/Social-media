const mongoose = require("mongoose");
require("dotenv").config();

const url = mongoose.connect(process.env.MONGODB_URL);

module.exports = async () => {
  try {
    await url;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};