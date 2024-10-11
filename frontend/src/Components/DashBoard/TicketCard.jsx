import React, { useState, useEffect, useRef } from "react";
import moment from "moment";

function TicketCard({ ticket }) {
  const textRef = useRef(null);
  const [isClamped, setIsClamped] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State to control the popup
  const relativeTime = moment(ticket.createdAt).fromNow();

  useEffect(() => {
    const element = textRef.current;
    if (element) {
      setIsClamped(element.scrollHeight > element.clientHeight);
    }
  }, [ticket]);

  const handleReadMore = () => {
    setIsOpen(true); // Open the popup
  };

  const handleClose = () => {
    setIsOpen(false); // Close the popup
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md w-full max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div>
            <h4 className="font-bold hover:underline">{ticket.name}</h4>
            <p className="text-gray-500 text-sm">{relativeTime}</p>
          </div>
        </div>
      </div>

      <div>
        {ticket.media?.photo && (
          <img
          src={
            ticket ? summaryApi.domain.url + "/" + ticket.media.image : ""
          }
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
              src={
                ticket ? summaryApi.domain.url + "/" + ticket.media.video : ""
              }
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        )}
        <p ref={textRef} className="text-gray-500 mt-2 mb-4 line-clamp-2">{ticket.message}</p>
        {isClamped && (
          <p className="text-blue-500 font-semi-bold cursor-pointer">
            <button onClick={handleReadMore}>Read More</button>
          </p>
        )}
      </div>

      {/* Popup Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold">Full Message</h2>
            {ticket.media?.photo && (
              <img
              src={
                ticket ? summaryApi.domain.url + "/" + ticket.media.image : ""
              }                
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
                  src={
                    ticket ? summaryApi.domain.url + "/" + ticket.media.video : ""
                  }
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            )}
            <p>{ticket.message}</p>
            <button
              onClick={handleClose}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TicketCard;
