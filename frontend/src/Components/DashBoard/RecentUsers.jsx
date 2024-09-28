<<<<<<< Updated upstream
import React from 'react';

function RecentUsers({ users = [] }) {
  console.log(users);

=======
import React from 'react'

function RecentUsers({users}) {
>>>>>>> Stashed changes
  const recentUsers = () => {
    return (
      <div>
        {users.slice(0, 5).map((user, id) => (
          <div key={id}>
<<<<<<< Updated upstream
            <p className="mb-2">• {user.name}</p>
=======
            <p className='mb-2'>• {user.name}</p>
>>>>>>> Stashed changes
          </div>
        ))}
      </div>
    );
  };
<<<<<<< Updated upstream

  return (
    <div className="bg-white shadow rounded-lg p-4 w-full">
      <h3 className="text-gray-600 text-sm font-medium mb-6">Recent Users</h3>
      <div>{recentUsers()}</div>
    </div>
  );
}

export default RecentUsers;
=======
  
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
>>>>>>> Stashed changes
