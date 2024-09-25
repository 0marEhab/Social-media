const express = require("express");
const router = express.Router();
const upload = require("./../middleware/upload");
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  likePost,
  addComment,
  deleteComment,
  likeComment,
  editComment,
  getCommentsByPostId,
  replyComment,
  likeReplyComment,
  deleteReply,
  editReply,
  replayReplayComment,
  getRepliesByCommentId,
  likeReplyOnRepliedComment,
  editReplyOnRepliedComment,
  deleteReplyOnRepliedComment,
  sharePost,
  getReportedPosts,
  reportPost,
  getReportedPost,
} = require("../controllers/post.controller");
const isAuth = require("../middleware/isAuth");

router.post("/", isAuth, upload, createPost);

router.get("/", isAuth, getAllPosts);

router.get("/:id", isAuth, getPostById);

router.get("/:id/comments", isAuth, getCommentsByPostId);

router.put("/:id", isAuth, updatePost);

router.delete("/:id", isAuth, deletePost);

router.post("/like/:id", isAuth, likePost);

router.post("/comment/:id", isAuth, addComment);

router.delete("/:id/comment/:commentId", isAuth, deleteComment);

router.post("/:id/comment/:commentId/like", isAuth, likeComment);

router.put("/:id/comment/:commentId/edit", isAuth, editComment);

router.post("/:id/comment/:commentId/reply", isAuth, replyComment);

router.post(
  "/:id/comment/:commentId/replay/:replyId/like",
  isAuth,
  likeReplyComment
);

router.put("/:id/comment/:commentId/replay/:replyId/edit", isAuth, editReply);

router.delete("/:id/comment/:commentId/replay/:replyId", isAuth, deleteReply);

router.post(
  "/:id/comment/:commentId/reply/:replyId",
  isAuth,
  replayReplayComment
);
router.post(
  "/:id/comment/:commentId/reply/:replyId/reply/:replyReplyId/like",
  isAuth,
  likeReplyOnRepliedComment
);
router.put(
  "/:id/comment/:commentId/reply/:replyId/reply/:replyReplyId",
  isAuth,
  editReplyOnRepliedComment
);
router.delete(
  "/:id/comment/:commentId/reply/:replyId/reply/:replyReplyId",
  isAuth,
  deleteReplyOnRepliedComment
);

router.get("/:id/comment/:commentId/replies", isAuth, getRepliesByCommentId);

router.post("/share/:id", isAuth, sharePost);

router.get("/reportedPosts", isAuth, getReportedPosts);

router.get("/reported", isAuth, getReportedPost);

router.post("/reportPost/:id", isAuth, reportPost);

module.exports = router;
