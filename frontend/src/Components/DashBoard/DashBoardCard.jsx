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
      <div className="bg-gradient-to-r from-violet-400 to-indigo-950 hover:from-primary hover:to-violet-100 shadow-2xl rounded-3xl p-6 w-full max-w-xs flex flex-col items-center justify-center">
        <div className="text-center">
          <h3 className="text-white text-lg font-medium">{title}</h3>  {/* Title color set to blue */}
        </div>
        <div className="flex flex-col items-center mt-4">
          <FontAwesomeIcon icon={icon} className="text-white text-4xl" />  {/* Icon color set to red */}
          <p className="text-white text-2xl font-semibold mt-2">{number}</p>  {/* Number color set to green */}
        </div>
      </div>
      );

}