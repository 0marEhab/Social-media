import React from 'react'

function RecentUsers({users}) {
  const recentUsers = () => {
    return (
      <div>
        {users.slice(0, 5).map((user, id) => (
          <div key={id}>
            <p className='mb-2'>• {user.name}</p>
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
