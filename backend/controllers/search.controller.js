const Post = require("../models/Post");
const User = require("../models/User");

exports.searchUsersAndPosts = async (req, res) => {
  try {
    const searchTerm = req.query.q;
    if (!searchTerm) {
      return res.status(400).json({ error: "Search term is required" });
    }
    const users = await User.find({
      name: { $regex: searchTerm, $options: "i" },
    }).select("name email profilePicture");

    const userFriends = req.user.friends;

    const posts = await Post.find({
      $and: [
        {
          $or: [
            { privacy: "public" },
            { privacy: "friends", user: { $in: userFriends } },
          ],
        },
        {
          $or: [
            { title: { $regex: searchTerm, $options: "i" } },
            { content: { $regex: searchTerm, $options: "i" } },
          ],
        },
      ],
    })
      .populate("user", "name")
      .populate("likes", "name")
      .populate("comments.user", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({ users, posts });
  } catch (error) {
    console.error("Error searching users and posts:", error.message);
    res.status(500).json({ error: error.message });
  }
};
