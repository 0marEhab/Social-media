import React from "react";
import { Link } from "react-router-dom";
import summaryApi from "../../../common";

function RecentUsers({ users }) {
  const recentUsers = () => {
    return (
      <div className="grid grid-cols-2 gap-4">
        {users.slice(0, 6).map((user, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <Link to={`/profile/${user._id}`}>
              <img
                src={user ? summaryApi.domain.url + "/" + user.profilePic : ""}
                alt={`${user.name}'s profile`}
                className="w-12 h-12 rounded-full border border-gray-300 shadow-lg"
              />
            </Link>
            <Link to={`/profile/${user._id}`}>
              <h4 className="font-semibold text-sm mt-2 hover:underline">
                {user.name}
              </h4>
            </Link>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-r from-zinc-50 to-indigo-100 hover:from-primary hover:to-violet-100 shadow-2xl rounded-3xl p-10 w-full flex flex-col items-center justify-center">
      <h3 className="text-gray-600 text-lg font-bold mb-6">Recent Users</h3>
      {users.length > 0 ? recentUsers() : <p>No users found.</p>}
    </div>
  );
}

export default RecentUsers;
