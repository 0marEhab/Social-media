import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { Link } from "react-router-dom";
import axios from "axios";
import summaryApi from "../../../common";
import Swal from "sweetalert2"; // Import SweetAlert2

function UserCard({ user }) {
  const relativeTime = moment(user.createdAt).fromNow();

  const handleDelete = async (userId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("token"); // Replace with your method of retrieving the token
        const res = await axios.delete(
          summaryApi.deleteUser.url.replace(":id", userId),
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the request headers
            },
          }
        );
        if (res.status === 200) {
          Swal.fire("Deleted!", "User has been deleted.", "success").then(
            () => {
              window.location.reload();
            }
          );
        }
      } catch (error) {
        Swal.fire("Error!", "There was an error deleting the user.", "error");
      }
    }
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md w-full max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="items-center gap-3">
          <Link to={`/profile/${user._id}`}>
            <h4 className="font-bold hover:underline">{user.name}</h4>
          </Link>
          <p className="text-gray-500 text-sm">created {relativeTime}</p>
        </div>
        <button className="relative">
          <FontAwesomeIcon
            icon={faTrashCan}
            onClick={() => handleDelete(user._id)}
            className="cursor-pointer"
          />
        </button>
      </div>

      <div>
        <p>Posts: {user.posts.length}</p>
      </div>

      <div>
        <p>Friends: {user.friends.length}</p>
      </div>
    </div>
  );
}

export default UserCard;
