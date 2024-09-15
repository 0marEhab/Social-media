const User = require("../models/User");
const generateToken = require("../config/generateToken");
exports.Signup = async (req, res, next) => {
  const { name, email, password, confirmPassword, birthDate, country } =
    req.body;
  console.log(req.body);
  try {
    const user = User.create({
      name,
      email,
      password,
      birthDate,
      country,
    });

    res.status(201).json({
      user: user,
      message: "User created successfully!",
    });
  } catch (err) {
    const error = new Error("Could not create user");
    error.statusCode = 500;
    return next(error);
  }
};

exports.Login = async (req, res, next) => {
  const { email, password } = req.body;
  let user;
  try {
    user = await User.findOne({ email });
    if (!user || !(await user.isPasswordMatched(password))) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      throw error;
    }
    const token = generateToken.Login(user._id.toString());
    res.statusCode = 200;
    res.json({
      token: token,
      message: "Login successful",
      email: user.email,
    });
  } catch (err) {
    return next(err);
  }
};

exports.Profile = async (req, res, next) => {
  let user = req.user;
  console.log(user);
  if (!user) {
    const err = new Error("User not found");
    err.status = 404;
    throw err;
  }
  res.status(200).json({ user });
};

exports.updateProfile = async (req, res, next) => {
  const { name, email, password, birthDate, country } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        email,
        password,
        birthDate,
        country,
      },
      { new: true }
    );
    res.status(200).json({ user, message: "update profile" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "update failed" });
  }
};
