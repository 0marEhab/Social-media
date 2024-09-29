import React from 'react'

function RecentUsers({users = [] }) {
  console.log(users); // Make sure it's an array

  const recentUsers = () => {
    return (
      <div>
        {users.slice(0, 5).map((user, index) => (
          <div key={index}>
            <p>• {user.name}</p>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="bg-white shadow rounded-lg p-4 w-full ">
      <h3 className="text-gray-600 text-sm font-medium mb-6">Recent Users</h3>
      <div>
        {recentUsers()}
      </div>
    </div>
  )
}

export default RecentUsers
