import React, { useContext, useState, useEffect, useRef } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

function TicketCard({ticket}) {
    const textRef = useRef(null); 
    const [isClamped, setIsClamped] = useState(false); 
    const relativeTime = moment(ticket.createdAt).fromNow();
    useEffect(() => {
        const element = textRef.current; 
        if (element) {
          setIsClamped(element.scrollHeight > element.clientHeight);
        }
      }, [ticket]);
  return (
    <div className="bg-white p-5 rounded-lg shadow-md w-full max-w-xl mx-auto ">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div>
            <h4 className="font-bold hover:underline">{ticket.name}</h4>
            <p className="text-gray-500 text-sm">
                {relativeTime} 
            </p>
          </div>
        </div>
      </div>

      <div>
        {ticket.media?.photo && (
          <img
            src={`${summaryApi.domain.url}/uploads/${ticket.media.photo}`}
            alt="ticket content"
            className="w-full max-h-[400px] object-cover object-center rounded-lg mb-4"
          />
        )}
        {ticket.media?.video && (
          <video
            controls
            className="w-full max-h-[400px] object-cover object-center rounded-lg mb-4"
          >
            <source
              src={`${summaryApi.domain.url}/uploads/${ticket.media.video}`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        )}
        <p ref={textRef} className="text-gray-500 mt-2 mb-4 line-clamp-2">{ticket.message}</p>
        {isClamped && <p className="text-blue-500 font-semi-bold cursor-pointer">
          <Link to="">Read More</Link>
        </p>}
      </div>
    </div>
  )
}

export default TicketCard