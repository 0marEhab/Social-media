import { AiOutlineHeart, AiOutlineSend } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import moment from "moment";
import summaryApi from "../../../common";
import UserContext from "../../Contexts/UserContext";
import { motion, AnimatePresence } from "framer-motion";
import { BsThreeDots } from "react-icons/bs";
import Swal from "sweetalert2"; // Import SweetAlert2
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Comments({
  initialComments = [],
  initialLikes = [],
  id,
  userprofile,
}) {
  const user = useContext(UserContext);

  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(initialComments);

  const [relativeTimes, setRelativeTimes] = useState([]);
  const [relativeTimesReply, setRelativeTimesReply] = useState([]);
  const [showOptions, setShowOptions] = useState(null);
  const [visibleCommentsCount, setVisibleCommentsCount] = useState(5);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentContent, setEditCommentContent] = useState("");
  const [showReplyPopup, setShowReplyPopup] = useState(false);
  const [editReplyId, setEditReplyId] = useState(null);
  const [editReplyContent, setEditReplyContent] = useState("");
  const [activeReplyComment, setActiveReplyComment] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [visibleRepliesCount, setVisibleRepliesCount] = useState(2);

  // const [comment, setComment] = useState(comments.map((comment) => comment));
  // const [likes, setLikes] = useState(comments.map((comment) => comment.likes));
  // const [isLiked, setIsLiked] = useState(
  //   user ? likes?.some((like) => like._id === user._id) : false
  // );

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
      setRelativeTimesReply(
        comments.map((comment) =>
          comment.replies
            ? comment?.replies?.map((reply) =>
                moment(reply.createdAt).fromNow()
              )
            : []
        )
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

        const newCommentData = response.data;

        if (newCommentData && newCommentData.content) {
          setComments((prevComments) => [...prevComments, newCommentData]);
          setNewComment(""); // Clear the input field
          toast.success("Comment added successfully!");
          setTimeout(() => window.location.reload(), 200);
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
      setTimeout(() => window.location.reload(), 1200);
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
  const openEditReplyPopup = (commentId, content) => {
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
    setTimeout(() => window.location.reload(), 1200);
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
          { content: replyContent },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const replyData = response.data;
        console.log(replyData);

        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === commentId
              ? { ...comment, replies: [...comment.replies, replyData] }
              : comment
          )
        );

        setActiveReplyComment(null);
        toast.success("Reply added successfully!");
        // setTimeout(() => window.location.reload(), 200);
      } catch (error) {
        console.error("Error replying to comment:", error);
        toast.error("Failed to add the reply.");
      }
    } else {
      toast.error("Reply cannot be empty.");
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-t-3xl dark:bg-[#1D1D1D] m-auto lg:w-[80%] max-w-7xl overflow-y-auto px-8 py-12 shadow-lg"
    >
      <div className="w-full flex justify-end mb-6">
        <motion.img
          whileHover={{ scale: 1.1 }}
          src={summaryApi.domain.url + "/" + userprofile?.profilePic}
          alt={`${userprofile?.name}'s profile`}
          className="w-12 h-12 rounded-full clickableImage border-2 border-gray-200 shadow-md"
        />
      </div>

      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        Comments ({comments.length})
      </h2>

      {/* Comments section */}
      <div className="max-h-[600px] overflow-y-auto space-y-6 pr-4">
        <AnimatePresence>
          {comments?.map((comment, index) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-6 flex flex-col justify-between dark:bg-darkBg items-start p-6 rounded-lg shadow-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300"
            >
              <div className="flex items-center  justify-between w-full mb-4">
                <div className="flex items-center gap-5">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    src={
                      summaryApi.domain.url + "/" + comment?.user?.profilePic
                    }
                    alt={`${comment?.user?.name}'s profile`}
                    className="w-12 h-12 rounded-full border-2 border-gray-300 shadow-sm"
                  />
                  <div>
                    <div className="flex items-center justify-between w-full">
                      <div className="text-gray-800 dark:text-white font-semibold text-lg">
                        {comment?.user?.name}
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm">
                      {relativeTimes[index]}
                    </p>
                  </div>
                </div>
                <motion.button whileHover={{ scale: 1.1 }} className="relative">
                  <BsThreeDots
                    onClick={() => toggleOptions(index)}
                    className="text-gray-500 cursor-pointer text-xl"
                  />
                  <AnimatePresence>
                    {showOptions === index && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                      >
                        <ul className="py-2">
                          <li
                            onClick={() =>
                              openEditPopup(comment._id, comment.content)
                            }
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 transition-colors duration-200"
                          >
                            Edit Comment
                          </li>
                          <li
                            onClick={() => deleteComment(comment._id)}
                            className="px-4 py-2 hover:bg-red-100 cursor-pointer text-red-600 transition-colors duration-200"
                          >
                            Delete Comment
                          </li>
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
              <p className="text-gray-700 dark:text-white mt-2 text-lg">
                {comment.content}
              </p>

              {/* Like and reply buttons */}
              <div className="flex items-center gap-2 lg:gap-6 mt-4 ml-[60px]">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center gap-1 lg:gap-2 text-gray-500 hover:text-red-500 transition duration-300"
                >
                  <AiOutlineHeart className="text-xl" />
                  <span className=" w-9">Like</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center gap-1 lg:gap-2 text-gray-500 hover:text-blue-500 transition duration-300"
                  onClick={() => handleReply(comment._id)}
                >
                  <BiComment className="text-xl" />
                  <span className=" w-12">Reply</span>
                </motion.button>
              </div>

              {/* Reply input section */}
              <AnimatePresence>
                {activeReplyComment === comment._id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-3 mt-4 w-full"
                  >
                    <input
                      type="text"
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Write a reply..."
                      className="border p-2 w-full dark:bg-darkBg dark:text-white rounded-md shadow-sm focus:ring-2 focus:ring-blue-300 outline-none transition duration-200"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleReplySubmit(comment._id, index)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 transition duration-200"
                    >
                      <AiOutlineSend className="text-xl" />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Replies section */}
              <div className="ml-12 mt-4 space-y-4">
                {comment.replies
                  ?.slice(0, visibleRepliesCount)
                  .map((reply, replyIndex) => (
                    <motion.div
                      key={reply?._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-5 items-start dark:bg-[#1d1d1d] bg-white p-4 rounded-lg shadow-sm"
                    >
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        src={
                          summaryApi.domain.url + "/" + reply?.user?.profilePic
                        }
                        alt={`${reply?.user?.name}'s profile`}
                        className="w-10 h-10 rounded-full border-2 border-gray-300"
                      />
                      <div className="flex-grow">
                        <p className="text-gray-800 dark:text-white font-semibold">
                          {reply?.user?.name}
                        </p>
                        <p className="text-gray-600 dark:text-white mt-1">
                          {reply?.content}
                        </p>
                        <p className="text-gray-400 text-sm mt-2">
                          {relativeTimesReply[index] &&
                            relativeTimesReply[index][replyIndex]}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                {comment.replies?.length > visibleRepliesCount && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setVisibleRepliesCount((prev) => prev + 2)}
                    className="text-blue-500 hover:text-blue-600 hover:underline mt-2 transition duration-200"
                  >
                    Show more replies
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* "Show More" Button for comments */}
      {visibleCommentsCount < comments.length && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShowMore}
          className="text-blue-500 mt-6 bg-white px-6 py-2 rounded-full shadow-md hover:bg-blue-50 transition duration-200 font-semibold"
        >
          Show More Comments
        </motion.button>
      )}

      {/* Comment Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex justify-between w-full gap-4 mt-auto relative"
      >
        <input
          type="text"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="bg-gray-100 lg:absolute fixed top-[-30px] right-0 dark:bg-darkBg dark:text-white w-full h-12 rounded-full p-4 outline-none text-gray-800 focus:ring-2 focus:ring-blue-300 transition duration-200"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleCommentSubmit}
          className="absolute right-4 top-[-24px] bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-200"
        >
          <AiOutlineSend className="text-xl" />
        </motion.button>
      </motion.div>
      {/* Edit Comment Popup */}
      <AnimatePresence>
        {editCommentId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-[#1d1d1d] p-8 rounded-lg shadow-xl w-full max-w-lg"
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Edit Comment
              </h2>
              <textarea
                className="w-full p-3 border dark:bg-[#1d1d1d] dark:text-white border-gray-300 rounded-lg mb-6 focus:ring-2 focus:ring-blue-300 outline-none transition duration-200"
                value={editCommentContent}
                onChange={(e) => setEditCommentContent(e.target.value)}
                rows="4"
              />
              <div className="flex justify-end gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleEditSubmit}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                  Save
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={closeEditPopup}
                  className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition duration-200"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer position="bottom-right" />
    </motion.div>
  );
}
