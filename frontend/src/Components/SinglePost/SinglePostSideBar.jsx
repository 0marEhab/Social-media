import { AiOutlineHeart, AiOutlineSend } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import summaryApi from "../../../common";
import UserContext from "../../Contexts/UserContext";
import { BsThreeDots } from "react-icons/bs";
export default function SinglePostSideBar({ comments }) {
  const { user } = useContext(UserContext);
  const [newComment, setNewComment] = useState("");
  const { id } = useParams();
  const [relativeTimes, setRelativeTimes] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  useEffect(() => {
    const updateRelativeTimes = () => {
      setRelativeTimes(
        comments.map((comment) => moment(comment.createdAt).fromNow())
      );
    };

    updateRelativeTimes();
    const interval = setInterval(updateRelativeTimes, 60000);

    return () => clearInterval(interval);
  }, [comments]);

  const handleCommentSubmit = async () => {
    if (newComment) {
      try {
        const response = await axios.post(
          summaryApi.addComment.url.replace(":id", id),
          { content: newComment },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);
        setComments([
          ...comments,
          response.data.post.comments[comments.length],
        ]);
        setNewComment("");
      } catch (error) {
        console.error("Error adding comment", error);
      }
    }
  };

  return (
    <div className="bg-secondary rounded-l-3xl px-10 py-16">
      <div className="w-full flex justify-end">
        <img
          src="https://via.placeholder.com/30x30"
          alt="user-img"
          className="w-14 h-14 rounded-lg mt-4"
        />
      </div>
      <h2 className="text-xl font-bold text-white">
        Comments ({comments.length})
      </h2>
      {comments.map((comment, index) => (
        <div
          key={comment.id}
          className="mb-4 mt-10 flex flex-col justify-between items-start"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 w-full">
              <img
                src="http://via.placeholder.com/10x10"
                alt="user-img"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="flex items-center justify-between gap-12 lg:gap-[200px] md:gap-[525px] w-full">
                  <div className="flex items-center gap-5">
                    <p className="text-white font-semibold">{user.name}</p>
                    <button className="relative">
                      <BsThreeDots
                        onClick={() => toggleOptions(index)}
                        className="text-gray-500 cursor-pointer"
                      />
                      {showOptions && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                          <ul className="py-2">
                            <li
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                              // onClick={editComment}
                            >
                              Edit Post
                            </li>
                            <li
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
                              // onClick={deleteComment}
                            >
                              Delete Post
                            </li>
                          </ul>
                        </div>
                      )}
                    </button>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {relativeTimes[index]}
                  </p>
                </div>
                <p className="text-white">{comment.content}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-2 ml-12">
            <button>
              <AiOutlineHeart className="text-gray-400" />
            </button>
            <button>
              <BiComment className="text-gray-400" />
            </button>
          </div>
        </div>
      ))}
      <div className="flex justify-start w-[100%] gap-4 mt-8 relative">
        <input
          type="text"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="outline-none bg-white w-full h-10 rounded-md text-black p-2"
        />
        <button onClick={handleCommentSubmit}>
          <AiOutlineSend className="absolute right-8 top-[30%] text-primary" />
        </button>
      </div>
    </div>
  );
}
