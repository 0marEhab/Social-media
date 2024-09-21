const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    likes: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        replies: [
          {
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            content: { type: String, required: true },
            createdAt: { type: Date, default: Date.now },
            replies: [
              {
                user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                content: { type: String, required: true },
                createdAt: { type: Date, default: Date.now },
                likes: [
                  {
                    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                    createdAt: { type: Date, default: Date.now },
                  },
                ],
              },
            ],
            likes: [
              {
                user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                createdAt: { type: Date, default: Date.now },
              },
            ],
          },
        ],
        likes: [
          {
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            createdAt: { type: Date, default: Date.now },
          },
        ],
      },
    ],
    photo: { type: String },
    video: { type: String },
    tags: [{ type: String }],
    privacy: {
      type: String,
      enum: ["public", "private", "friends"],
      default: "public",
    },
    postType: {
      type: String,
      enum: ["text", "photo", "video"],
      default: "text",
    },
    sharedPost: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
