const express = require("express");
const isAuth = require("../middleware/isAuth");
const router = express.Router();
const userController = require("../controllers/user.controller");

const upload = require("../middleware/upload");
const profilePicMulter = require("../middleware/profilePicMulter");
router.post("/signup", userController.Signup);
router.post("/login", userController.Login);
router.get("/getUser", isAuth, userController.Profile);
router.get("/getUserById", isAuth, userController.getUserById);
router.put("/editUser", isAuth, userController.updateProfile);
router.put(
  "/update-profile-pic",
  isAuth,
  profilePicMulter("profilePic"), // Multer middleware to handle single image upload
  userController.updateProfilePic // Controller to handle the logic for updating the profile picture
);
router.get("/getUser/:id", userController.getUserProfile);

module.exports = router;
