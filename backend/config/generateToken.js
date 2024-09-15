const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.Login = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
