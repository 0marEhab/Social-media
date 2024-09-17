const Post = require("../models/Post");
const createPost = async (req, res) => {
  try {
    const post = new Post({
      content: req.body.content,
      user: req.user._id,
      photo: req.body.photo,
      video: req.body.video,
      tags: req.body.tags,
      privacy: req.body.privacy,
      postType: req.body.postType,
    });

    const savedPost = await post.save();
    res
      .status(201)
      .json({ posts: savedPost, message: "Post saved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    console.log("Fetching posts...");
    const posts = await Post.find()
      .populate("user", "name")
      .populate("likes", "name")
      .populate("comments.user", "name")
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("user", "name")
      .populate("likes", "name")
      .populate("comments.user", "name");

    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        content: req.body.content,
        photo: req.body.photo,
        video: req.body.video,
        tags: req.body.tags,
        privacy: req.body.privacy,
      },
      { new: true }
    );

    if (!updatedPost)
      return res.status(404).json({ message: "Post not found" });
    res
      .status(200)
      .json({ updatedPost: updatedPost, message: "Post updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (!deletedPost)
      return res.status(404).json({ message: "Post not found" });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const likePost = async (req, res) => {
  const id = req.params.id;
  console.log(id);

  try {
    const post = await Post.findById(id);
    console.log(id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    const userId = req.user._id;
    if (post.likes.includes(userId)) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = {
      user: req.user._id,
      content: req.body.content,
    };

    post.comments.push(comment);
    await post.save();

    res
      .status(200)
      .json({ post: post, message: "comment created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  likePost,
  addComment,
};
