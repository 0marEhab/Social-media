const express = require("express");
const isAuth = require("../middleware/isAuth");
const router = express.Router();
const userController = require("../controllers/user.controller");
const upload = require("../middleware/upload");
router.post("/signup", userController.Signup);
router.post("/login", userController.Login);
router.post(
  "/uploadProfilePicture",
  isAuth, // Ensure user is authenticated
  upload, // Handle file upload using multer
  userController.uploadProfilePicture
);
router.get("/getUser", isAuth, userController.Profile);
router.get("/getUserById", isAuth, userController.getUserById);
router.put("/editUser", isAuth, userController.updateProfile);
router.get("/getUser/:id", userController.getUserProfile);
router.get("/getUsers", userController.getUsers);

router.delete("/deleteUser/:id", isAuth, userController.deleteUserById);

module.exports = router;
