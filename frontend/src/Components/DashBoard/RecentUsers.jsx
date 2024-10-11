import React from "react";
import { Link } from "react-router-dom";
import summaryApi from "../../../common";

function RecentUsers({ users }) {
  const recentUsers = () => {
    return (
      <div >
        {users.slice(0, 6).map((user, index) => (
          <div key={index} className="flex items-center gap-3">
            <Link to={`/profile/${user._id}`}>
              <img
                src={
                  user ? summaryApi.domain.url + "/" + user.profilePic : ""
                }
                alt={`${user.name}'s profile`}
                className="w-12 h-12 rounded-full border border-gray-300"
              />
            </Link>
            <Link to={`/profile/${user._id}`}>
              <h4 className="font-semi-bold hover:underline">{user.name}</h4>
            </Link>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-r from-zinc-50 to-indigo-100 hover:from-primary hover:to-violet-100 shadow-2xl rounded-3xl p-10 w-full items-center justify-center">
      <h3 className="text-gray-600 text-sm font-bold mb-6 text-center ">Recent Users</h3>
      {recentUsers()}
    </div>
  );
}

export default RecentUsers;
