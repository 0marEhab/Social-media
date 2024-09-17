const express = require("express");
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  likePost,
  addComment,
} = require("../controllers/post.controller");
const isAuth = require("../middleware/isAuth");

router.post("/", isAuth, createPost);

router.get("/", isAuth, getAllPosts);

router.get("/:id", isAuth, getPostById);

router.put("/:id", isAuth, updatePost);

router.delete("/:id", isAuth, deletePost);

router.post("/like/:id", isAuth, likePost);

router.post("/comment/:id", isAuth, addComment);

module.exports = router;
