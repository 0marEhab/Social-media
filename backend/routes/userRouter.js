const express = require("express");
const isAuth = require("../middleware/isAuth");
const router = express.Router();
const userController = require("../controllers/user.controller");

const upload = require("../middleware/upload");
const profilePicMulter = require("../middleware/profilePicMulter");
router.post("/signup", userController.Signup);
router.post("/login", userController.Login);
router.put(
  "/update-profile-pic",
  isAuth,
  profilePicMulter("profilePic"),
  userController.updateProfilePic
);
router.get("/getUser", isAuth, userController.Profile);
router.get("/getUserById", isAuth, userController.getUserById);
router.put("/editUser", isAuth, userController.updateProfile);
router.get("/getUser/:id", isAuth, userController.getUserProfile);
router.get("/getUsers", isAuth, userController.getUsers);

router.delete("/deleteProfile", isAuth, userController.deleteAccount);
router.delete("/deleteUser/:id", isAuth, userController.deleteUserById);

module.exports = router;
