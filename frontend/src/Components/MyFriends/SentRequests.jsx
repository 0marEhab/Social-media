import { handleUnsendRequest } from "../../Utils/friends";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndoAlt } from "@fortawesome/free-solid-svg-icons";
import summaryApi from "../../../common";
export default function SentRequests({ sentRequests, setSentRequests }) {
  return (
    <div>
      {sentRequests.length === 0 ? (
        <p>No sent requests</p>
      ) : (
        sentRequests.map((request) => (
          <div
            key={request._id}
            className="flex items-center justify-between p-3 border mb-2 rounded-3xl"
          >
            <div className="flex items-center">
              <img
                src={summaryApi.domain.url + "/" + request.profilePic}
                alt={request.name}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div>
                <span className="font-semibold">{request.name}</span>
                <p className="text-sm text-gray-500">{request.email}</p>
              </div>
            </div>
            <button
              className="bg-red-500 text-white p-2 rounded-full"
              onClick={() => handleUnsendRequest(request._id, setSentRequests)}
            >
              <FontAwesomeIcon icon={faUndoAlt} />
            </button>
          </div>
        ))
      )}
    </div>
  );
}
