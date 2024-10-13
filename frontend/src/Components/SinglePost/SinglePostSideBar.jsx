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
export default function SinglePostSideBar({
  initialComments = [],
  initialLikes = [],
}) {
  const { user } = useContext(UserContext);

  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(initialComments);

  const { id } = useParams();
  const [relativeTimes, setRelativeTimes] = useState([]);
  const [relativeTimesReply, setRelativeTimesReply] = useState([]);
  const [showOptions, setShowOptions] = useState(null);
  const [showReplyOptions, setShowReplyOptions] = useState({
    commentId: null,
    replyId: null,
  });
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
  const [editReplyData, setEditReplyData] = useState({
    commentId: null,
    replyId: null,
    content: "",
  });

  const toggleOptions = (commentId) => {
    setShowOptions(showOptions === commentId ? null : commentId);
    setShowReplyOptions({ commentId: null, replyId: null });
  };
  const toggleReplyOptions = (commentId, replyId) => {
    setShowReplyOptions(
      showReplyOptions.commentId === commentId &&
        showReplyOptions.replyId === replyId
        ? { commentId: null, replyId: null }
        : { commentId, replyId }
    );
    setShowOptions(null);
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
                moment(reply?.createdAt).fromNow()
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
          {
            content: newComment,
            user: {
              _id: user._id,
              name: user.name,
              profilePic: user.profilePic,
            },
          },
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

  // const openEditReplyPopup = (replyId, content) => {
  //   setEditReplyId(replyId);
  //   setEditReplyContent(content);
  //   setShowReplyPopup(true);
  // };
  // const closeEditReplyPopup = () => {
  //   setEditReplyId(null);
  //   setEditReplyContent("");
  //   setShowReplyPopup(false);
  // };

  const openEditReplyPopup = (commentId, replyId, content) => {
    setEditReplyData({ commentId, replyId, content });
  };

  const closeEditReplyPopup = () => {
    setEditReplyData({ commentId: null, replyId: null, content: "" });
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

  const handleReplySubmit = async (commentId) => {
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

        const replyData = response.data.reply;
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === commentId
              ? { ...comment, replies: [...comment.replies, replyData] }
              : comment
          )
        );

        setActiveReplyComment(null);
        toast.success("Reply added successfully!");
        setTimeout(() => window.location.reload(), 200);
      } catch (error) {
        console.error("Error replying to comment:", error);
        toast.error("Failed to add the reply.");
      }
    } else {
      toast.error("Reply cannot be empty.");
    }
  };

  const deleteReply = async (commentId, replyId) => {
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
        prevComments.map((comment) => {
          if (comment._id === commentId) {
            return {
              ...comment,
              replies: comment.replies.filter((reply) => reply._id !== replyId),
            };
          }
          return comment;
        })
      );
      Swal.fire("Deleted!", "Your reply has been deleted.", "success");
    }

    try {
      const response = await axios.delete(
        summaryApi.deleteReply.url
          .replace(":id", id)
          .replace(":commentId", commentId)
          .replace(":replyId", replyId),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.data.success) {
        console.error("Failed to delete reply on server");
      }
    } catch (error) {
      console.error("Error deleting reply:", error);
      Swal.fire("Error!", "Failed to delete the reply.", "error");
    }
  };

  const handleEditReplySubmit = async (commentId, replyId) => {
    // Close any open options or popups
    setShowOptions(null);
    closeEditReplyPopup();
    setShowReplyPopup(false);

    try {
      // Send the update request to the server
      const response = await axios.put(
        summaryApi.editReply.url
          .replace(":id", id)
          .replace(":commentId", commentId)
          .replace(":replyId", replyId),
        { content: editReplyData.content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update the local state with the new reply content
      setComments((prevComments) =>
        prevComments.map((comment) => {
          if (comment._id === commentId) {
            return {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply._id === replyId
                  ? { ...reply, content: editReplyData.content }
                  : reply
              ),
            };
          }
          return comment;
        })
      );

      // Success notification
      Swal.fire("Updated!", "Your reply has been updated.", "success");
    } catch (error) {
      console.error("Error editing reply:", error);
      Swal.fire("Error!", "Failed to update the reply.", "error");
    }
  };

  return (
    <div className="bg-gray-900 dark:bg-darkBg dark:shadow-sm dark:shadow-slate-300 rounded-t-3xl m-auto lg:w-[800px] overflow-y-auto p-8 shadow-lg">
      <div className="w-full flex justify-end mb-4">
        <Link to={`/profile/${user._id}`}>
          <img
            src={summaryApi.domain.url + "/" + user?.profilePic}
            alt={`${user.name}'s profile`}
            className="w-12 h-12 rounded-full border-2 border-gray-500 clickableImage"
          />
        </Link>
      </div>
      <h2 className="text-2xl font-bold text-gray-100 mb-6">
        Comments ({comments.length})
      </h2>

      {/* Fixed height for comments section */}
      <div className="max-h-[400px] overflow-y-auto space-y-8">
        {comments.slice(0, visibleCommentsCount).map((comment, index) => (
          <div
            key={comment._id}
            className="mb-4 mt-10 flex flex-col justify-between items-start"
          >
            {editReplyData.commentId && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-gray-800 dark:bg-darkBg  p-6 rounded-md w-11/12 md:w-1/2">
                  <h2 className="text-xl font-bold text-white mb-4">
                    Edit Reply
                  </h2>
                  <textarea
                    className="w-full p-2 text-black border border-gray-300 rounded-md mb-4"
                    value={editReplyData.content}
                    onChange={(e) =>
                      setEditReplyData({
                        ...editReplyData,
                        content: e.target.value,
                      })
                    }
                    rows="4"
                  />
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() =>
                        handleEditReplySubmit(
                          editReplyData.commentId,
                          editReplyData.replyId
                        )
                      }
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Save
                    </button>
                    <button
                      onClick={closeEditReplyPopup}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5 w-full">
                <Link to={`/profile/${comment?.user?._id}`}>
                  <img
                    src={
                      summaryApi.domain.url + "/" + comment?.user?.profilePic
                    }
                    alt={`${comment?.user?.name}'s profile`}
                    className="w-12 h-12 rounded-full border-2 border-gray-500 clickableImage"
                  />
                </Link>
                <div className="flex-grow">
                  <div className="flex items-center justify-center gap-32 md:gap-[525px] w-full">
                    <div className="flex items-center gap-5 w-10">
                      <Link to={`/profile/${comment.user.id}`}>
                        <div className="text-white w-28 hover:underline hover:text-blue-400 font-semibold">
                          {comment.user.name}
                        </div>
                      </Link>
                      <button className="relative ">
                        <BsThreeDots
                          onClick={() => toggleOptions(comment._id)}
                          className="text-gray-400 cursor-pointer ml-5 lg:ml-[150px] md:ml-[200px]"
                        />
                        {showOptions === comment._id && (
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
                  <p className="text-gray-300 mt-1">{comment.content}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-2 ml-[55px]">
              <button className="clickableImage text-gray-500 hover:text-gray-300 transition">
                <AiOutlineHeart className="text-gray-400" />
              </button>
              <button className="clickableImage text-gray-500 hover:text-gray-300 transition">
                <BiComment
                  onClick={() => handleReply(comment._id)}
                  className="text-gray-400"
                />
              </button>
            </div>

            {/* Reply input section */}
            {activeReplyComment === comment._id && (
              <div className="relative flex items-center gap-2 mt-4 ml-16">
                <input
                  type="text"
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write a reply..."
                  className="flex-grow p-2 border border-gray-700 bg-gray-800 text-white rounded-md focus:outline-none"
                />
                <button
                  onClick={() => handleReplySubmit(comment._id, index)}
                  className="absolute right-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  <AiOutlineSend />
                </button>
              </div>
            )}

            <div className="ml-16 mt-4">
              {/* Limit to 2 replies initially */}
              {comment.replies
                ?.slice(0, visibleRepliesCount)
                .map((reply, replyIndex) => (
                  <div
                    key={reply?._id}
                    className="mb-2 flex gap-20 items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Link to={`/profile/${reply?.user?._id}`}>
                        <img
                          src={
                            summaryApi.domain.url +
                            "/" +
                            reply?.user?.profilePic
                          }
                          alt={`${reply?.user?.name}'s profile`}
                          className="w-8 h-8 rounded-full border-2 border-gray-500 clickableImage"
                        />
                      </Link>
                      <div>
                        <Link to={`/profile/${reply?.user?._id}`}>
                          <p className="text-white hover:text-blue-400 transition font-semibold">
                            {reply?.user?.name}
                          </p>
                        </Link>
                        <p className="text-gray-400 overflow-hidden">
                          {reply?.content}
                        </p>
                      </div>
                      <button className="relative">
                        <BsThreeDots
                          onClick={() =>
                            toggleReplyOptions(comment._id, reply._id)
                          }
                          className="text-gray-500 cursor-pointer ml-5 lg:ml-[55px] md:ml-[200px]"
                        />
                        {showReplyOptions.commentId === comment._id &&
                          showReplyOptions.replyId === reply._id && (
                            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                              <ul className="py-2">
                                <li
                                  onClick={() =>
                                    openEditReplyPopup(
                                      comment._id,
                                      reply._id,
                                      reply.content
                                    )
                                  }
                                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                                >
                                  Edit Reply
                                </li>
                                <li
                                  onClick={() =>
                                    deleteReply(comment._id, reply._id)
                                  }
                                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
                                >
                                  Delete Reply
                                </li>
                              </ul>
                            </div>
                          )}
                      </button>
                    </div>
                    <p className="text-gray-500 text-sm">
                      {relativeTimesReply[index] &&
                        relativeTimesReply[index][replyIndex]}
                    </p>
                  </div>
                ))}

              {/* Show More button for additional replies */}
              {comment.replies?.length > visibleRepliesCount && (
                <button
                  onClick={() => {
                    setVisibleRepliesCount((prevCount) => prevCount + 2);
                  }}
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  Show more replies
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {visibleCommentsCount < comments.length && (
        <button
          onClick={handleShowMore}
          className="mt-4 text-blue-400 hover:underline"
        >
          Show More
        </button>
      )}

      <div className="flex justify-start w-[100%] gap-4 mt-8 relative">
        <input
          type="text"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-grow p-2 bg-gray-800 dark:bg-darkBg text-white rounded-md focus:outline-none border border-gray-700"
        />
        <button onClick={handleCommentSubmit}>
          <AiOutlineSend className="absolute right-8 top-[30%] text-primary" />
        </button>
      </div>

      {/* Popup for editing a comment */}
      {editCommentId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 dark:bg-darkBg p-6 rounded-md w-11/12 md:w-1/2">
            <h2 className="text-xl font-bold text-white mb-4">Edit Comment</h2>
            <textarea
              className="w-full p-2 text-black border border-gray-300 rounded-md mb-4"
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
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
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
