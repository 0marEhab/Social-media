const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/isAuth');
const searchCotroller = require('../controllers/search.controller');

router.get('/search', authMiddleware, searchCotroller.searchUsersAndPosts);


module.exports = router;