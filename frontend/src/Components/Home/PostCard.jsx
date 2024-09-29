import React, { useContext, useState } from "react";
import {
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import axios from "axios";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../Contexts/UserContext";
import summaryApi from "../../../common";
import Swal from "sweetalert2";
import PostOptions from "./PostOptions"; // Import the refactored dropdown component
export default function PostCard({ post }) {
  const { user, setSharedPosts } = useContext(UserContext);
  const relativeTime = moment(post.createdAt).fromNow();
  const [likes, setLikes] = useState(post.likes);
  const [showFullContent, setShowFullContent] = useState(false);
  const [isLiked, setIsLiked] = useState(
    user ? likes.some((like) => like._id === user._id) : false
  );
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  const handleLike = async () => {
    try {
      const response = await axios.post(
        summaryApi.like.url.replace(":id", post._id),
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setIsLiked((prev) => !prev);
      setLikes(response.data.likes);
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  const editPost = async () => {
    try {
      navigate(`/posts/edit/${post._id}`);
      Swal.fire({
        icon: "success",
        title: "Post is ready for editing!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong with editing!",
      });
    }
  };

  const deletePost = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(summaryApi.delete.url.replace(":id", post._id), {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          // Show success alert and reload the window after a delay
          Swal.fire("Deleted!", "Your post has been deleted.", "success").then(
            () => {
              navigate(0);
            }
          );
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong with deleting!",
          });
        }
      }
    });
  };
const handleContentToggle = () => {
  setShowFullContent(!showFullContent);
};
  const reportPost = async () => {
    try {
      const response = await axios.post(
        summaryApi.reportPost.url.replace(":id", post._id),
        {
          userId: user._id,
          reportedReason: "Inappropriate Content", // Placeholder reason, update based on your radio input handling
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      Swal.fire("Reported!", "This post has been reported.", "success");
    } catch (error) {
      Swal.fire(
        "Error",
        "Something went wrong with reporting the post.",
        "error"
      );
    }
  };

  function addNewlinesAfterEverySixWordsOrLongWords(
    text,
    maxWordLength = 10,
    longWordLimit = 50
  ) {
    const words = text.split(" ");
    const result = [];

    for (let i = 0; i < words.length; i++) {
      if (words[i].length > longWordLimit) {
        for (let j = 0; j < words[i].length; j += longWordLimit) {
          result.push(words[i].substring(j, j + longWordLimit));
        }
      } else {
        result.push(words[i]);
      }
      if ((i + 1) % 6 === 0) {
        result.push("\n");
      }
    }

    return result.join(" ");
  }

  const formattedText = addNewlinesAfterEverySixWordsOrLongWords(post.content);
  const maxLines = 3;
  const lines = formattedText.split("\n");
  const shouldShowReadMore = lines.length > maxLines;
  const displayedContent = showFullContent
    ? formattedText
    : lines.slice(0, maxLines).join("\n") + (shouldShowReadMore ? "..." : "");

  const handleShare = async () => {
    try {
      const response = await axios.post(
        summaryApi.share.url.replace(":id", post._id),
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      var { sharedPost } = response.data;

      Swal.fire({
        icon: "success",
        title: "Post shared successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        navigate(`/posts/${sharedPost._id}`);
      }, 1000);
      if (setSharedPosts) {
        setSharedPosts((prevPosts) => [...prevPosts, sharedPost]);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to share the post.",
      });
    }
  };

  if (post.user) {
    return (
      <div className="bg-white p-5 rounded-lg shadow-md w-full max-w-xl mx-auto my-5">
        {/* Post Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <Link to={`/profile/${post?.user?._id}`}>
              {" "}
              <img
                src={
                  post
                    ? summaryApi.domain.url + "/" + post?.user?.profilePic
                    : ""
                }
                alt={`${post?.user?.name}'s profile`}
                className="w-12 h-12 rounded-full"
              />
            </Link>

            <div>
              <Link to={`/profile/${post?.user?._id}`}>
                <h4 className="font-bold hover:underline">
                  {post?.user?.name}
                </h4>
              </Link>
              <p className="text-gray-500 text-sm">
                {relativeTime} • {post.privacy}
              </p>

              {post.sharedPost && (
                <h6>Shared from: {post?.sharedPost?.user?.name}</h6>
              )}
            </div>
          </div>

          <button className="relative">
            <BsThreeDots
              onClick={toggleOptions}
              className="text-gray-500 cursor-pointer"
            />
            {showOptions && (
              <PostOptions
                post={post}
                postId={post._id}
                editPost={user && user._id === post.user._id ? editPost : null}
                deletePost={
                  user && user._id === post.user._id ? deletePost : null
                }
                reportPost={
                  user && user._id !== post.user._id ? reportPost : null
                }
              />
            )}
          </button>
        </div>

        {/* Post Content */}
        <div>
          {post.media?.photo && (
            <img
              src={`${summaryApi.domain.url}/uploads/${post.media.photo}`}
              alt="post content"
              className="w-full max-h-[400px] object-cover object-center rounded-lg mb-4"
            />
          )}
          {post.media?.video && (
            <video
              controls
              className="w-full max-h-[400px] object-cover object-center rounded-lg mb-4"
            >
              <source
                src={`${summaryApi.domain.url}/uploads/${post.media.video}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          )}
          <p className="text-gray-500 mt-2 mb-4">{post.content}</p>
          <p className="text-blue-500 font-bold cursor-pointer">
            <Link to={`/posts/${post._id}`}>READ MORE</Link>
          </p>
        </div>

        {/* Post Footer (Likes, Comments, Share) */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-4 text-gray-500">
            <button
              className={`flex items-center gap-1 ${
                isLiked ? "text-red-500" : ""
              }`}
              onClick={handleLike}
            >
              <AiOutlineHeart size={20} />
              <span>{likes.length}</span>
            </button>

            <button
              className="flex items-center gap-1"
              onClick={() => navigate(`/posts/${post._id}`)}
            >
              <AiOutlineMessage size={20} />
              <span>{post.comments.length}</span>
            </button>
          </div>

          <button
            className="flex items-center gap-1 text-gray-500"
            onClick={handleShare}
          >
            <AiOutlineShareAlt size={20} />
            Share
          </button>
        </div>
      </div>
    );
  }
}
