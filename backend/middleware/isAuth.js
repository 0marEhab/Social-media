const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const error = new Error("not authorized");
    res.status(401).json({ message: error.message });
    return;
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    try {
      const user = await User.findById(decodedToken.userId);
      if (!user) {
        throw new Error("not authorized");
      }
      req.user = user;
      next();
    } catch (error) {}
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error.message });
  }
};
