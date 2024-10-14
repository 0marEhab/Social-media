import { handleAcceptRequest, handleRejectRequest } from "../../Utils/friends";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import summaryApi from "../../../common";
export default function ReceivedRequests({
  receivedRequests,
  setReceivedRequests,
}) {
  return (
    <div>
      {receivedRequests.length === 0 ? (
        <p className="text-center dark:text-bg">No received requests</p>
      ) : (
        receivedRequests.map((request) => (
          <div
            key={request._id}
            className="flex items-center justify-between p-3 border rounded-3xl"
          >
            <div className="flex items-center">
              <img
                src={summaryApi.domain.url + "/" + request.profilePic}
                alt={request.name}
                className="w-10 h-10 rounded-full mr-4"
              />
              <Link to={`/profile/${request._id}`}>
                <div>
                  <span className="font-semibold text-black dark:text-white ">
                    {request.name}
                  </span>
                  <p className="text-sm text-gray-500 dark:text-white">{request.email}</p>
                </div>
              </Link>
            </div>
            <div>
              <button
                className="bg-green-500 text-white p-2 rounded-full mr-2"
                onClick={() =>
                  handleAcceptRequest(request._id, setReceivedRequests)
                }
              >
                <FontAwesomeIcon icon={faCheck} />
              </button>
              <button
                className="bg-red-500 text-white p-2 rounded-full"
                onClick={() =>
                  handleRejectRequest(request._id, setReceivedRequests)
                }
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
