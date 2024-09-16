const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/isAuth');
const friendController = require('../controllers/friends.controller');

router.post('/request', authMiddleware, friendController.sendFriendRequest);
router.post('/accept', authMiddleware, friendController.acceptFriendRequest);
router.post('/reject', authMiddleware, friendController.rejectFriendRequest);
router.get('/requests', authMiddleware, friendController.getFriendRequests);

module.exports = router;
