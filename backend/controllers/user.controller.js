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
        select:
          "_id title content createdAt likes comments media privacy postType user", // Select specific fields for posts
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
  const { name, email, birthDate, country } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, email, birthDate, country },
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
  console.log(profilePic.path) // Assuming you're storing the file path
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

    // Optionally, handle file deletion (like profile pictures) from storage (e.g., Cloudinary, local storage)

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete account" });
  }
};
