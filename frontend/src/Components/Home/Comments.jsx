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
export default function Comments({
  initialComments = [],
  initialLikes = [],
  id,
  userprofile,
}) {
  // const user = useContext(UserContext);
  // console.log(user);
  console.log(userprofile);

  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(initialComments);
  console.log(comments);

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

        const newCommentData =
          response.data.comment ||
          response.data.post.comments[response.data.post.comments.length - 1];

        if (newCommentData && newCommentData.content) {
          setComments((prevComments) => [...prevComments, newCommentData]);
          setNewComment(""); // Clear the input field
          toast.success("Comment added successfully!");
          // setTimeout(() => window.location.reload(), 200);
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
      // setTimeout(() => window.location.reload(), 1200);
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
    // setTimeout(() => window.location.reload(), 1200);
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
  const handleReplySubmit = async (commentId, replyIndex) => {
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

        const replyData = response.data.comments[replyIndex].replies;
        console.log(response.data.comments[replyIndex].replies);
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
  console.log(
    comments.map((comment) => comment?.replies?.map((reply) => reply?.user))
  );

  return (
    <div className="bg-white rounded-t-3xl m-auto lg:w-[80%] max-w-7xl overflow-y-auto px-8 py-12">
      <div className="w-full flex justify-end">
        <img
          src={summaryApi.domain.url + "/" + userprofile?.profilePic}
          alt={`${userprofile?.name}'s profile`}
          className="w-12 h-12 rounded-full clickableImage border-2 border-gray-200 shadow-md"
        />
      </div>

      <h2 className="text-2xl font-bold text-black mb-6">
        Comments ({comments.length})
      </h2>

      {/* Comments section */}
      <div className="max-h-[400px] overflow-y-auto space-y-6">
        {comments?.map((comment, index) => (
          <div
            key={comment.id}
            className="mb-4 flex flex-col justify-between items-start  p-4 rounded-lg shadow-lg"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-5">
                <img
                  src={summaryApi.domain.url + "/" + comment?.user?.profilePic}
                  alt={`${comment?.user?.name}'s profile`}
                  className="w-10 h-10 rounded-full border-2 border-gray-300 shadow-sm"
                />
                <div>
                  <div className="flex items-center justify-between w-full">
                    <div className="text-black font-semibold">
                      {comment?.user?.name}
                    </div>
                    <button className="relative">
                      <BsThreeDots
                        onClick={() => toggleOptions(index)}
                        className="text-gray-500 cursor-pointer"
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
                  <p className="text-gray-300 text-sm">
                    {relativeTimes[index]}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-black mt-2">{comment.content}</p>

            {/* Like and reply buttons */}
            <div className="flex items-center gap-4 mt-3 ml-[55px]">
              <button className="hover:text-red-400 transition duration-300">
                <AiOutlineHeart className="text-gray-400" />
              </button>
              <button className="hover:text-blue-400 transition duration-300">
                <BiComment onClick={() => handleReply(comment._id)} />
              </button>
            </div>

            {/* Reply input section */}
            {activeReplyComment === comment._id && (
              <div className="flex items-center gap-3 mt-3">
                <input
                  type="text"
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write a reply..."
                  className="border p-2 w-full rounded-md shadow-sm"
                />
                <button
                  onClick={() => handleReplySubmit(comment._id, index)}
                  className="bg-blue-500 text-black px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 transition"
                >
                  <AiOutlineSend />
                </button>
              </div>
            )}

            {/* Replies section */}
            <div className="ml-10 mt-4 space-y-4">
              {comment.replies
                ?.slice(0, visibleRepliesCount)
                .map((reply, replyIndex) => (
                  <div key={reply?._id} className="flex gap-5 items-center">
                    <img
                      src={
                        summaryApi.domain.url + "/" + reply?.user?.profilePic
                      }
                      alt={`${reply?.user?.name}'s profile`}
                      className="w-10 h-10 rounded-full border-2 border-gray-300"
                    />
                    <div>
                      <p className="text-black font-bold">
                        {reply?.user?.name}
                      </p>
                      <p className="text-gray-300 text-sm">{reply?.content}</p>
                    </div>
                    <p className="text-gray-400 text-sm">
                      {relativeTimesReply[index] &&
                        relativeTimesReply[index][replyIndex]}
                    </p>
                  </div>
                ))}
              {comment.replies?.length > visibleRepliesCount && (
                <button
                  onClick={() => setVisibleRepliesCount((prev) => prev + 2)}
                  className="text-gray-400 hover:underline mt-2"
                >
                  Show more replies
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* "Show More" Button for comments */}
      {visibleCommentsCount < comments.length && (
        <button
          onClick={handleShowMore}
          className="text-primary mt-4 bg-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-100"
        >
          Show More
        </button>
      )}

      {/* Comment Input */}
      <div className="flex justify-between w-full gap-4 mt-6 relative">
        <input
          type="text"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="bg-gray-200 w-full h-10 rounded-md p-3 outline-none text-black"
        />
        <button onClick={handleCommentSubmit}>
          <AiOutlineSend className="absolute right-8 top-3 text-primary" />
        </button>
      </div>

      {/* Edit Comment Popup */}
      {editCommentId && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
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
                className="bg-blue-500 text-black px-4 py-2 rounded-md"
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
