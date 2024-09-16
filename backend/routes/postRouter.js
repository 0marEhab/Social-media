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

router.get("/", getAllPosts);

router.get("/:id", getPostById);

router.put("/:id", isAuth, updatePost);

router.delete("/:id", isAuth, deletePost);

router.put("/:id/like", isAuth, likePost);

router.post("/:id/comment", isAuth, addComment);

module.exports = router;
