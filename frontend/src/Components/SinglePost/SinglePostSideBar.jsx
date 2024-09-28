import { AiOutlineHeart, AiOutlineSend } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import moment from "moment";
import summaryApi from "../../../common";
import UserContext from "../../Contexts/UserContext";
import { BsThreeDots } from "react-icons/bs";
import Swal from "sweetalert2"; // Import SweetAlert2
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function SinglePostSideBar({ initialComments = [] }) {
  const { user } = useContext(UserContext);
  const [newComment, setNewComment] = useState("");
  const { id } = useParams();
  const [comments, setComments] = useState(initialComments);
  console.log(comments);

  const [relativeTimes, setRelativeTimes] = useState([]);
  const [showOptions, setShowOptions] = useState(null);
  const [visibleCommentsCount, setVisibleCommentsCount] = useState(5);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentContent, setEditCommentContent] = useState("");
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [activeReplyComment, setActiveReplyComment] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  // const [comment, setComment] = useState(comments.map((comment) => comment));
  // const [likes, setLikes] = useState(comments.map((comment) => comment.likes));
  // const [isLiked, setIsLiked] = useState(
  //   user ? likes?.some((like) => like._id === user._id) : false
  // );

  // console.log(comment.map((comment) => comment));

  // useEffect(() => {
  //   if (comment.map((com) => com) && user) {
  //     setIsLiked(
  //       comment
  //         .map((comment) => comment)
  //         .likes.some((comment) => comment._id === user._id)
  //     );
  //   }
  // }, [comment.map((com) => com), user]);
  const toggleOptions = (index) => {
    setShowOptions(showOptions === index ? null : index);
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
    if (newComment.trim()) {
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

        const newCommentData =
          response.data.comment ||
          response.data.post.comments[response.data.post.comments.length - 1];

        if (newCommentData && newCommentData.content) {
          setComments((prevComments) => [...prevComments, newCommentData]);
          setNewComment(""); // Clear the input field
          toast.success("Comment added successfully!");
        } else {
          console.error("New comment data is not valid:", newCommentData);
        }
      } catch (error) {
        console.error("Error adding comment", error);
        toast.error("Failed to adding the comment.");
      }
    } else {
      console.error("Comment cannot be empty");
      toast.error("Comment cannot be empty.");
    }
  };

  const handleShowMore = () => {
    setVisibleCommentsCount((prevCount) => prevCount + 8); // Increase the count by 8 each time
  };

  const deleteComment = async (commentId) => {
    setShowOptions(null);
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
      Swal.fire("Deleted!", "Your comment has been deleted.", "success");
    }
    try {
      const response = await axios.delete(
        summaryApi.deleteComment.url
          .replace(":id", id)
          .replace(":commentId", commentId),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.data.success) {
        console.error("Failed to delete comment on server");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      Swal.fire("Error!", "Failed to delete the comment.", "error");
    }
  };

  const openEditPopup = (commentId, content) => {
    setEditCommentId(commentId);
    setEditCommentContent(content);
    setShowEditPopup(true);
  };

  const closeEditPopup = () => {
    setEditCommentId(null);
    setEditCommentContent("");
    setShowEditPopup(false);
  };

  const handleEditSubmit = async () => {
    setShowOptions(null);

    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment._id === editCommentId
          ? { ...comment, content: editCommentContent }
          : comment
      )
    );
    closeEditPopup();
    setShowEditPopup(false);
    Swal.fire("Updated!", "Your comment has been updated.", "success");
    try {
      const response = await axios.put(
        summaryApi.editComment.url
          .replace(":id", id)
          .replace(":commentId", editCommentId),
        { content: editCommentContent },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.error("Error editing comment:", error);
      Swal.fire("Error!", "Failed to update the comment.", "error");
    }
  };
  const handleReply = (commentId) => {
    setActiveReplyComment(commentId); // Show reply input for the specific comment
    setReplyContent(""); // Clear the reply input
  };
  const handleReplySubmit = async (commentId, index) => {
    if (replyContent.trim()) {
      try {
        const response = await axios.post(
          summaryApi.replyComment.url
            .replace(":id", id)
            .replace(":commentId", commentId),
          {
            content: replyContent,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const replyData =
          response.data.comments[index].replies[comments[index].replies.length];

        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === commentId
              ? { ...comment, replies: [...comment.replies, replyData] }
              : comment
          )
        );

        setActiveReplyComment(null);
        toast.success("Reply added successfully!");
      } catch (error) {
        console.error("Error replying to comment:", error);
        toast.error("Failed to add the reply.");
      }
    } else {
      toast.error("Reply cannot be empty.");
    }
  };
  return (
    <div className="bg-secondary rounded-l-3xl  overflow-y-auto px-10 py-16">
      <div className="w-full flex justify-end">
        <Link to={`/profile/${user.id}`}>
          <img
            src="https://via.placeholder.com/30x30"
            alt="user-img"
            className="w-14 h-14 rounded-lg mt-4"
          />
        </Link>
      </div>
      <h2 className="text-xl font-bold text-white">
        Comments ({comments.length})
      </h2>
      {comments.slice(0, visibleCommentsCount).map((comment, index) => (
        <div
          key={comment.id}
          className="mb-4 mt-10 flex flex-col justify-between items-start"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5 w-full">
              <Link className="w-10 h-10" to={`/profile/${comment.user.id}`}>
                <img
                  src="http://via.placeholder.com/10x10"
                  alt="user-img"
                  className="w-10 h-10 rounded-full"
                />
              </Link>
              <div>
                <div className="flex items-center justify-center gap-32 lg:gap-[200px] md:gap-[525px] w-full">
                  <div className="flex items-center gap-5 w-10">
                    <Link to={`/profile/${comment.user.id}`}>
                      <div className="text-white w-28 hover:underline hover:text-blue-300 font-semibold">
                        {user.name}
                      </div>
                    </Link>
                    <button className="relative">
                      <BsThreeDots
                        onClick={() => toggleOptions(index)}
                        className="text-gray-500 cursor-pointer ml-5 lg:ml-[55px] md:ml-[200px] "
                      />
                      {showOptions === index && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                          <ul className="py-2">
                            <li
                              onClick={() =>
                                openEditPopup(comment._id, comment.content)
                              }
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                            >
                              Edit Comment
                            </li>
                            <li
                              onClick={() => deleteComment(comment._id)}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
                            >
                              Delete Comment
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
              <BiComment
                onClick={() => handleReply(comment._id)}
                className="text-gray-400"
              />
            </button>
          </div>
          {activeReplyComment === comment._id && (
            <div className="flex items-center gap-2 mt-2">
              <input
                type="text"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write a reply..."
                className="border p-2 w-full text-black"
              />
              <button
                onClick={() => handleReplySubmit(comment._id, index)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                <AiOutlineSend />
              </button>
            </div>
          )}
          <div className="ml-10 mt-4">
            {comment.replies?.map((reply) => (
              <div
                key={reply._id}
                className="mb-2 flex gap-20 items-center  justify-between"
              >
                <div className="flex items-center  gap-3">
                  <Link to={`/profile/${reply.user._id}`}>
                    <img src="http://via.placeholder.com/15x15"></img>
                  </Link>
                  <p className="text-gray-300  overflow-hidden">
                    {" "}
                    {reply.content}
                  </p>
                  <button className="relative">
                    <BsThreeDots
                      onClick={() => toggleOptions(index)}
                      className="text-gray-500 cursor-pointer ml-5 lg:ml-[55px] md:ml-[200px] "
                    />
                    {showOptions === index && (
                      <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        <ul className="py-2">
                          <li
                            onClick={() =>
                              openEditPopup(comment._id, comment.content)
                            }
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                          >
                            Edit Comment
                          </li>
                          <li
                            onClick={() => deleteComment(comment._id)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
                          >
                            Delete Comment
                          </li>
                        </ul>
                      </div>
                    )}
                  </button>
                </div>
                <p className="text-gray-400">{relativeTimes[index]}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {visibleCommentsCount < comments.length && (
        <button onClick={handleShowMore} className="text-primary mt-4">
          Show More
        </button>
      )}

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

      {/* Popup for editing a comment */}
      {editCommentId && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[50%]">
            <h2 className="text-xl font-bold mb-4">Edit Comment</h2>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              value={editCommentContent}
              onChange={(e) => setEditCommentContent(e.target.value)}
              rows="4"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={handleEditSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Save
              </button>
              <button
                onClick={closeEditPopup}
                className="bg-gray-300 text-black px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
