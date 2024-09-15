const express = require("express");
const isAuth = require("../middleware/isAuth");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/createUser", userController.Signup);
router.post("/login", userController.Login);
router.get("/getUser", isAuth, userController.Profile);
router.put("/editUser", isAuth, userController.updateProfile);

module.exports = router;
