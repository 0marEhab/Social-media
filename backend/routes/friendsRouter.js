const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/isAuth');
const friendController = require('../controllers/friends.controller');

router.post('/request', authMiddleware, friendController.sendFriendRequest);
router.post('/accept', authMiddleware, friendController.acceptFriendRequest);
router.post('/reject', authMiddleware, friendController.rejectFriendRequest);
router.get('/requests', authMiddleware, friendController.getFriendRequests);
router.get('/get', authMiddleware, friendController.getFriends);
router.get('/myrequests', authMiddleware, friendController.getSentRequests);
router.delete('/request', authMiddleware, friendController.deleteSentRequest);
router.get('/suggestions', authMiddleware, friendController.getSuggestions);
router.delete('/deleteFriend/:friendId', authMiddleware, friendController.deleteFriend);


module.exports = router;
