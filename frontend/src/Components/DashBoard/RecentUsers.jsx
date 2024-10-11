import React from "react";
<<<<<<< HEAD
=======
import { Link } from "react-router-dom";
import summaryApi from "../../../common";
>>>>>>> feature/admin

function RecentUsers({ users }) {
  const recentUsers = () => {
    return (
<<<<<<< HEAD
      <div >
        {users.slice(0, 6).map((user, index) => (
          <div key={index} className="flex items-center gap-3">
<<<<<<< HEAD
            <img
              src={user.posts.profilePic}
              alt={`${user.name}'s profile`}
              className="w-12 h-12 rounded-full"
            />
            <h4 className="font-semi-bold ">{user.name}</h4>
=======
      <div>
        {users.slice(0, 5).map((user, id) => (
          <div key={id}>
            <p className="mb-2">• {user.name}</p>
>>>>>>> 6fe324bd18f90d565bff6ae50d881fcb1cd85d30
=======
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
>>>>>>> feature/admin
          </div>
        ))}
      </div>
    );
  };

  return (
<<<<<<< HEAD
    <div className="bg-gradient-to-r from-zinc-50 to-indigo-100 hover:from-primary hover:to-violet-100 shadow-2xl rounded-3xl p-10 w-full items-center justify-center">
      <h3 className="text-gray-600 text-sm font-bold mb-6 text-center ">Recent Users</h3>
      {recentUsers()}
=======
    <div className="bg-white shadow rounded-lg p-4 w-full ">
      <h3 className="text-gray-600 text-sm font-medium mb-6">Recent Users</h3>
      <div>{recentUsers()}</div>
>>>>>>> 6fe324bd18f90d565bff6ae50d881fcb1cd85d30
    </div>
  );
}

export default RecentUsers;
