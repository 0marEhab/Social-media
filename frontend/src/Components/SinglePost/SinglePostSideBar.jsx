import { AiOutlineHeart, AiOutlineSend } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import summaryApi from "../../../common";
import UserContext from "../../Contexts/UserContext";

export default function SinglePostSideBar() {
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { id } = useParams();
  const [relativeTimes, setRelativeTimes] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          summaryApi.post.url.replace(":id", id),
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setComments(response.data.comments);
      } catch (error) {
        console.error("Error fetching comments", error);
      }
    };
    fetchComments();
  }, [id]);

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
        setComments([...comments, response.data]);
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
                <div className="flex items-center justify-between gap-12 lg:gap-[150px] md:gap-[525px] w-full">
                  <p className="text-white font-semibold">{user.name}</p>
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
