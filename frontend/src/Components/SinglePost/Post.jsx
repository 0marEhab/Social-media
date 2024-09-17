import { BiDotsVerticalRounded } from "react-icons/bi";
import { RiShareForwardFill } from "react-icons/ri";
import { AiOutlineHeart } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { useEffect, useState } from "react";
import axios from "axios"; // Assuming Axios for API calls
import { useParams } from "react-router-dom";
import moment from "moment";
export default function Post() {
  const [showOptions, setShowOptions] = useState(false);
  const [post, setPost] = useState();
  const { id } = useParams();
  if (post) {
    var relativeTime = moment(post.createdAt).fromNow();
  }
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/posts/${id}`,
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
  console.log(post);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  if (!post) {
    return <div>no post to show</div>;
  }

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
            src={post.user.profilePic}
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
            <p>{post.likes}</p>
          </button>
          <button className="flex items-center gap-1">
            <BiComment />
            <p>{post.comments.length}</p>
          </button>
          <button className="flex items-center gap-1">
            <RiShareForwardFill className="cursor-pointer" /> <p>Share</p>
          </button>
          <button className="relative">
            <BiDotsVerticalRounded
              onClick={toggleOptions}
              className="text-3xl cursor-pointer"
            />
            {showOptions && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700">
                    Edit Post
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600">
                    Delete Post
                  </li>
                </ul>
              </div>
            )}
          </button>
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
