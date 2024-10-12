import React, { useState, useContext } from "react";
import axios from "axios"; // You can use fetch as well
import Swal from "sweetalert2"; // Import SweetAlert
import summaryApi from "../../../common";
import UserContext from "../../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
const ReportPost = ({ postId, onClose }) => {
  const { user } = useContext(UserContext);
  const [reportReason, setReportReason] = useState("");
  
  const navigate = useNavigate();
  const handleReportSubmit = async (e) => {
    e.preventDefault();

    if (!reportReason) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Please select a reason for reporting.",
      });
      return;
    }

    try {
      const response = await axios.post(
        summaryApi.reportPost.url.replace(":id", postId),
        {
          userId: user._id,
          reportedReason: reportReason, // Placeholder reason, update based on your radio input handling
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: response.data.message || "Post reported successfully.",
      }).then(() => {
        navigate(0);
      });
      onClose(); // Close the popup after successful report
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.error || "Failed to report post.",
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h3 className="text-lg font-bold mb-4">Report Post</h3>
        <form
          onSubmit={handleReportSubmit}
          className=" flex flex-col items-start"
        >
          <div>
            <label className="block">
              <input
                type="radio"
                name="reason"
                value="Inappropriate Content"
                onChange={(e) => setReportReason(e.target.value)}
                className="mr-2"
              />
              Inappropriate Content
            </label>
          </div>
          <div>
            <label className="block">
              <input
                type="radio"
                name="reason"
                value="Harassment"
                onChange={(e) => setReportReason(e.target.value)}
                className="mr-2"
              />
              Harassment
            </label>
          </div>
          <div>
            <label className="block">
              <input
                type="radio"
                name="reason"
                value="Spam"
                onChange={(e) => setReportReason(e.target.value)}
                className="mr-2"
              />
              Spam
            </label>
          </div>
          <div>
            <label className="block">
              <input
                type="radio"
                name="reason"
                value="Other"
                onChange={(e) => setReportReason(e.target.value)}
                className="mr-2"
              />
              Other
            </label>
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-500 m-auto text-white py-2 px-4 rounded"
          >
            Submit Report
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-2 text-gray-500 hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ReportPost;
