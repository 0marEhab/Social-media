const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                  },
                ],
              },
            ],
            likes: [
              {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
              },
            ],
          },
        ],
        likes: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
        ],
      },
    ],
    media: {
      photo: { type: String }, // Store the filename for photo
      video: { type: String }, // Store the filename for video
    },
    tags: [{ type: String }],
    privacy: {
      type: String,
      enum: ["public", "private", "friends"],
      default: "public",
    },
    sharedPost: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reported: { type: Boolean, default: false },
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reportedReason: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
