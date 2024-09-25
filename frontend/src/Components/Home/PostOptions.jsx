import React from "react";
import ReportPost from "./ReportPost";
import { useState } from "react";
export default function PostOptions({
  editPost,
  deletePost,
  reportPost,
  postId,
  post,
}) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
      <ul className="py-2">
        {editPost && (
          <li
            className="px-4 py-2 hover:bg-blue-200 cursor-pointer text-gray-700"
            onClick={editPost}
          >
            Edit Post
          </li>
        )}
        {deletePost && (
          <li
            className="px-4 py-2 hover:bg-red-200 cursor-pointer text-gray-700"
            onClick={deletePost}
          >
            Delete Post
          </li>
        )}
        {reportPost && (
          <li
            className="px-4 py-2 hover:bg-yellow-100 cursor-pointer text-gray-700"
            onClick={() => setShowPopup(true)}
          >
            Report Post
          </li>
        )}
      </ul>
      {showPopup && (
        <ReportPost postId={postId} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
}
