import { BsThreeDots } from "react-icons/bs";
import { RiShareForwardFill } from "react-icons/ri";
import { AiOutlineHeart } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { useEffect, useState, useContext } from "react";
import axios from "axios"; // Assuming Axios for API calls
import { useParams } from "react-router-dom";
import moment from "moment";
import summaryApi from "../../../common";
import UserContext from "../../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
export default function Post() {
  const [showOptions, setShowOptions] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const { user } = useContext(UserContext);
  const [post, setPost] = useState();
  console.log(post);
  const navigate = useNavigate();

  const { id } = useParams();
  if (post) {
    var relativeTime = moment(post.createdAt).fromNow();
  }
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          summaryApi.post.url.replace(":id", id),
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setPost(response.data);
      } catch (error) {
        console.error("Error fetching the post", error);
      }
    };
    fetchPost();
  }, []);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const toggleLikes = () => {
    setShowLikes(!showLikes);
  };
  if (!post) {
    return <div>no post to show</div>;
  }
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
    <div className="flex text-secondary flex-col justify-start items-start">
      <div className="opacity-65 bg-gray-200 w-24 h-14 rounded-xl bg-transparent flex justify-center items-center gap-3 mb-6 mt-6">
        <button className="text-xl flex gap-3">
          <p>&lt;</p> Back
        </button>
      </div>

      <div className="flex flex-col justify-between items-start gap-3 lg:items-center lg:flex-row md:items-center md:flex-row w-full mb-10">
        <div className="flex items-center gap-3">
          <img
            src="http://via.placeholder.com/30x30"
            className="w-16 h-16 rounded-xl"
            alt="user-img"
          />
          <div>
            <p>{post.user.name}</p>
            <p className="opacity-50">{relativeTime}</p>
          </div>
        </div>

        <div className="flex gap-5">
          <button className="flex items-center gap-1">
            <AiOutlineHeart />
            <p>{post.likes.length}</p>
          </button>
          <div>
            <button onClick={toggleLikes} className="flex items-center gap-1">
              Show Likes
            </button>

            {showLikes && (
              <div className="flex flex-col gap-1 mt-2">
                {post.likes.map((like) => (
                  <p key={like._id} className="text-gray-700">
                    {user.name}
                  </p>
                ))}
              </div>
            )}
          </div>
          <button className="flex items-center gap-1" onClick={handleShare}>
            <RiShareForwardFill className="cursor-pointer" /> <p>Share</p>
          </button>
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
      </div>

      <div className="m-auto">
        <img src={post.photo} className="w-full rounded-2xl" alt="post-img" />
      </div>

      <div className="p-10">
        <p className="text-xl w-72 lg:w-full md:w-full mb-6">{post.content}</p>
      </div>
    </div>
  );
}
