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
  const { user } = useContext(UserContext);
  const relativeTime = moment(post.createdAt).fromNow();
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(
    user ? likes.some((like) => like._id === user._id) : false
  );
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  const toggleOptions = () => {
    setShowOptions(!showOptions);
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
      setIsLiked(!isLiked);
      setLikes(response.data.likes);
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  const editPost = () => {
    navigate(`/posts/edit/${post._id}`);
  };

  const deletePost = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmDelete) {
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
      alert(response.data.message);
    } catch (error) {
      console.error("Error sharing the post:", error);
      alert("Failed to share the post.");
    }
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md w-full max-w-xl mx-auto my-5">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <img
            src={post.user.profilePic}
            alt="profile"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h4 className="font-bold">{post.user.name}</h4>
            <p className="text-gray-500 text-sm">{relativeTime}</p>
          </div>
        </div>
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

      <div>
        <img
          src={post.photo}
          alt="post-img"
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      </div>

      <p className="text-gray-500 mt-2 mb-4">{post.content}</p>
      <p className="text-blue-500 font-bold cursor-pointer">
        <Link to={`/posts/${post._id}`}>READ MORE</Link>
      </p>
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
