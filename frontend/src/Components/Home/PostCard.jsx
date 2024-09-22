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

export default function PostCard({ post }) {
  const { user, setSharedPosts } = useContext(UserContext);
  const relativeTime = moment(post.createdAt).fromNow();
  const [likes, setLikes] = useState(post.likes);
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

  const editPost = () => {
    navigate(`/posts/edit/${post._id}`);
  };

  const deletePost = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(summaryApi.delete.url.replace(":id", post._id), {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        alert("Post deleted successfully.");
      } catch (error) {
        console.error("Error deleting the post:", error);
      }
    }
  };

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

      alert("Post shared successfully!");

      console.log("Shared post details:", sharedPost);
      console.log("Shared post name:", sharedPost.originalPost.user.name);

      // Optionally update shared posts in the parent or context
      if (setSharedPosts) {
        setSharedPosts((prevPosts) => [...prevPosts, sharedPost]);
      }
    } catch (error) {
      console.error("Error sharing the post:", error);
      alert("Failed to share the post.");
    }
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md w-full max-w-xl mx-auto my-5">
      {/* Post Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <img
            src={post.user.profilePic}
            alt={`${post.user.name}'s profile`}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h4 className="font-bold">{post.user.name}</h4>
            <p className="text-gray-500 text-sm">{relativeTime}</p>
            {/* Show the "Shared from" message only for shared posts */}
            {post.sharedPost && (
              <h6>Shared from: {post.sharedPost.user.name}</h6>
            )}
          </div>
        </div>
        {/* Show options (Edit, Delete) if the post belongs to the current user */}
        {user && user._id === post.user._id && (
          <button className="relative">
            <BsThreeDots
              onClick={toggleOptions}
              className="text-gray-500 cursor-pointer"
            />
            {showOptions && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <ul className="py-2">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                    onClick={editPost}
                  >
                    Edit Post
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
                    onClick={deletePost}
                  >
                    Delete Post
                  </li>
                </ul>
              </div>
            )}
          </button>
        )}
      </div>

      {/* Post Content */}
      <div>
        {post.media?.photo && (
          <img
            src={`${summaryApi.domain.url}/uploads/${post.media.photo}`}
            alt="post content"
            className="w-full h-48 object-cover object-center rounded-lg mb-4"
            name="photo"
          />
        )}

        {post.media?.video && (
          <video
            controls
            className="w-full h-48 object-cover object-center rounded-lg mb-4"
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
