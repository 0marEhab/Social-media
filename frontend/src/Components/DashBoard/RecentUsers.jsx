import React from 'react'

function RecentUsers({users = [] }) {
  console.log(users); // Make sure it's an array

  const recentUsers = () => {
    return (
      <div >
        {users.slice(0, 6).map((user, index) => (
          <div key={index} className="flex items-center gap-3">
            <img
              src={user.posts.profilePic}
              alt={`${user.name}'s profile`}
              className="w-12 h-12 rounded-full"
            />
            <h4 className="font-semi-bold ">{user.name}</h4>
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
  )
}

export default RecentUsers
