const express = require("express");
const isAuth = require("../middleware/isAuth");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/signup", userController.Signup);
router.post("/login", userController.Login);
router.get("/getUser", isAuth, userController.Profile);
router.get("/getUserById", isAuth, userController.getUserById);
router.put("/editUser", isAuth, userController.updateProfile);

module.exports = router;
