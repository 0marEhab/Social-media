const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chat.controller");

router.post("/storeConversation", chatController.storeConversation);
router.get("/getConversation/:userId", chatController.getConversation);
router.post("/sendMessage", chatController.sendMessages);
router.get("/getMessage/:conversationId", chatController.getMessages);
module.exports = router;
