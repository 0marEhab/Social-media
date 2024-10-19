import React, { useContext, useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import axios from "axios";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../Contexts/UserContext";
import summaryApi from "../../../common";
import Swal from "sweetalert2";
export default function PostCard({ post }) {
  const textRef = useRef(null);
  const [isClamped, setIsClamped] = useState(false);
  const { user, setSharedPosts } = useContext(UserContext);
  const relativeTime = moment(post.createdAt).fromNow();
  const [likes, setLikes] = useState(post.likes);

  const [isLiked, setIsLiked] = useState(
    user ? likes.some((like) => like._id === user._id) : false
  );
  const navigate = useNavigate();

  useEffect(() => {
    const element = textRef.current;
    if (element) {
      setIsClamped(element.scrollHeight > element.clientHeight);
    }
  }, [post]);

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
          await axios.delete(
            summaryApi.deleteByAdmin.url.replace(":id", post._id),
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

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

  if (!post) {
    return <div>No post available</div>;
  }

  return (
    <div className="bg-white p-5 rounded-lg shadow-md w-full max-w-sm mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post?.user?._id}`}>
            <img
              src={
                post ? summaryApi.domain.url + "/" + post?.user?.profilePic : ""
              }
              alt={`${post?.user?.name}'s profile`}
              className="w-12 h-12 rounded-full border border-gray-300"
            />
          </Link>

          <div>
            <Link to={`/profile/${post?.user?._id}`}>
              <h4 className="font-bold hover:underline">{post?.user?.name}</h4>
            </Link>
            <Link to={`/posts/${post?.reportedBy?._id}`}>
              <p className="text-gray-500 text-sm hover:underline">
                reported by {post?.reportedBy?.name}
              </p>
            </Link>
            <p className="text-gray-500 text-sm">
              {relativeTime} • {post?.privacy}
            </p>

            {post?.sharedPost && (
              <h6>Shared from: {post?.sharedPost?.user?.name}</h6>
            )}
          </div>
        </div>

        <button className="relative" onClick={deletePost}>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>

      <div className="flex justify-center items-center">
        {" "}
        {/* Centered content */}
        {post?.media?.photo && (
          <img
            src={`${summaryApi.domain.url}/uploads/${post?.media?.photo}`}
            alt="post content"
            className="w-full max-w-[200px] max-h-[150px] object-contain object-center rounded-lg mb-4"
          />
        )}
        {post?.media?.video && (
          <video
            controls
            className="w-full max-w-[200px] max-h-[150px] object-contain object-center rounded-lg mb-4"
          >
            <source
              src={`${summaryApi.domain.url}/uploads/${post?.media?.video}`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      <p ref={textRef} className="text-gray-500 mt-2 mb-4 line-clamp-2">
        {post.content}
      </p>
      {isClamped && (
        <p className="text-blue-500 font-semi-bold cursor-pointer">
          <Link to={`/posts/${post?._id}`}>Read More</Link>
        </p>
      )}

      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-4 text-gray-500">
          <button
            className={`flex items-center gap-1 ${
              isLiked ? "text-red-500" : ""
            }`}
          >
            <AiOutlineHeart size={20} />
            <span>{likes.length}</span>
          </button>

          <button
            className="flex items-center gap-1"
            onClick={() => navigate(`/posts/${post._id}`)}
          >
            <AiOutlineMessage size={20} />
            <span>{post?.comments.length}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
