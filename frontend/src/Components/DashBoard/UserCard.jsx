import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

function UserCard({user}) {
    const relativeTime = moment(user.createdAt).fromNow();
  return (
    <div className="bg-white p-5 rounded-lg shadow-md w-full max-w-xl mx-auto ">
      <div className="flex justify-between items-center mb-4">
        <div className=" items-center gap-3">
            <h4 className="font-bold hover:underline">{user.name}</h4> 
            <p className="text-gray-500 text-sm">
              created {relativeTime} 
            </p>         
        </div>
        <button className="relative" >
          <FontAwesomeIcon icon={faTrashCan}/>
        </button>
      </div>

      <div>
        <p>posts : {user.posts.length}</p>
      </div>

      <div>
        <p>friends : {user.friends.length}</p>
      </div>

      
    </div>
  )
}

export default UserCard