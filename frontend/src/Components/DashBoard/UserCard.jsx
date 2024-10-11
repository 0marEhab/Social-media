import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import summaryApi from "../../../common";
import Swal from "sweetalert2";
import axios from "axios";

function UserCard({ user }) {
  const navigate = useNavigate();

  const deleteUser = async () => {
    if (!user || !user._id) {
      Swal.fire({
        icon: "error",
        title: "User not found",
        text: "Cannot delete a user without a valid ID.",
      });
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            summaryApi.deleteUser.url.replace(":id", user._id),
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          Swal.fire("Deleted!", "User has been deleted.", "success").then(
            () => {
              navigate(0);
            }
          );
        } catch (error) {
          console.error("Error deleting user:", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong with deleting!",
          });
        }
      }
    });
  };

  const relativeTime = moment(user.createdAt).fromNow();
  return (
    <div className="bg-white p-5 rounded-lg shadow-md w-full max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div className=" items-center gap-3">
          <div className="flex items-center gap-3">
            <Link to={`/profile/${user._id}`}>
              <img
                src={user ? summaryApi.domain.url + "/" + user.profilePic : ""}
                alt={`${user.name}'s profile`}
                className="w-12 h-12 rounded-full border border-gray-300"
              />
            </Link>
            <Link to={`/profile/${user._id}`}>
              <h4 className="font-semi-bold hover:underline">{user.name}</h4>
            </Link>
          </div>
          <p className="text-gray-500 text-sm">created {relativeTime}</p>
        </div>
        <button className="relative" onClick={deleteUser}>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>

      <div>
        <p>posts : {user.posts.length}</p>
      </div>

      <div>
        <p>friends : {user.friends.length}</p>
      </div>
    </div>
  );
}

export default UserCard;
