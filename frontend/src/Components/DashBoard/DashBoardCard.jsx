import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart,
  faComment,
  faPager,
  faUser,
  faTicket
 } from '@fortawesome/free-solid-svg-icons';

export default function DashBoardCard({title,number,icon}) {
    return (
        <div className="bg-white shadow rounded-lg p-4 w-full max-w-sm">
          <div className="flex justify-between items-center">
            <h3 className="text-gray-600 text-sm font-medium ">{title}</h3>
          </div>
          <div className="flex items-center mt-6">
            <FontAwesomeIcon
              icon={icon}
            />
            <p className="text-xl font-semi-bold text-gray-800 ml-2"> {number}</p>
          </div>
          
        </div>
      );

}