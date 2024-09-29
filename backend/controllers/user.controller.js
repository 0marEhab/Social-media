const User = require("../models/User");
const generateToken = require("../config/generateToken");
exports.Signup = async (req, res, next) => {
  const { name, email, password, confirmPassword, birthDate, country } =
    req.body;

  try {
    // Check if email is already in use
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email is already in use",
      });
    }

    // Create new user if email is not already in use
    const user = await User.create({
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
    const error = new Error("Could not create user, Please Enter Valid Data");
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
      user: user,
    });
  } catch (err) {
    return next(err);
  }
};

exports.Profile = async (req, res, next) => {
  try {
    const userId = req.user._id; // Get user ID from req.user
    console.log(userId);
    // Find the user by ID and populate friends and posts
    const user = await User.findById(userId)
      .populate(
        "friends",
        "_id name email profilePic" // Select specific fields for friends
      )
      .populate({
        path: "posts",
        select: "_id title content createdAt likes comments media privacy user", // Select specific fields for posts
      });

    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      throw err;
    }

    res.status(200).json({ user }); // Return the populated user
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateProfile = async (req, res, next) => {
  console.log("here");
  const { name, email, birthDate, country, linkedProfile } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, email, birthDate, country, linkedProfile },
      { new: true }
    );
    res.status(200).json({ user, message: "Profile updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Profile update failed" });
  }
};

exports.updateProfilePic = async (req, res, next) => {
  const profilePic = req.file;
  console.log(profilePic.path); // Assuming you're storing the file path
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { profilePic: profilePic.path },
      { new: true }
    );
    res
      .status(200)
      .json({ user, message: "Profile picture updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Profile picture update failed" });
  }
};

exports.getUserById = async (req, res, next) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.uploadProfilePicture = async (req, res, next) => {
  try {
    const user = req.user;
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const profilePic = req.file ? req.file.filename : null; // Get the filename of the uploaded photo
    // Update user's profile picture
    user.profilePic = profilePic;
    console.log(user.profilePic);
    await user.save();

    return res.status(200).json({
      message: "Profile picture uploaded successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
};

exports.getUserProfile = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id)
      .populate("friends", "_id name email profilePic")
      .populate(
        "posts",
        "_id title content createdAt likes comments media privacy postType user "
      );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteAccount = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete account" });
  }
};
exports.searchUsers = async (req, res) => {
  try {
    const query = req.query.query;
    const users = await User.find({
      name: { $regex: query, $options: "i" },
    });
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
