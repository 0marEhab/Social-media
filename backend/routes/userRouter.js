const express = require("express");
const isAuth = require("../middleware/isAuth");
const router = express.Router();
const userController = require("../controllers/user.controller");

const upload = require("../middleware/upload");
const profilePicMulter = require("../middleware/profilePicMulter");
router.post("/signup", userController.Signup);
router.post("/login", userController.Login);
<<<<<<< Updated upstream
=======
router.get("/getUser", isAuth, userController.Profile);
router.get("/getUserById", isAuth, userController.getUserById);
router.put("/editUser", isAuth, userController.updateProfile);
router.get('/getUser/:id', userController.getUserProfile);
router.get('/getUsers', userController.getUsers);



>>>>>>> Stashed changes
router.post(
  "/uploadProfilePicture",
  isAuth, // Ensure user is authenticated
  upload, // Handle file upload using multer
  userController.uploadProfilePicture
);
router.get("/getUser", isAuth, userController.Profile);
router.get("/getUserById", isAuth, userController.getUserById);
router.put("/editUser", isAuth, userController.updateProfile);
router.get("/getUser/:id", isAuth, userController.getUserProfile);
router.get("/getUsers", isAuth, userController.getUsers);

router.delete("/deleteUser/:id", isAuth, userController.deleteUserById);

module.exports = router;
