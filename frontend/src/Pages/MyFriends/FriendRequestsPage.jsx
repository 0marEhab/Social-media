import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { fetchRequests } from "../../Utils/friends";
import RequestTabs from "./../../Components/MyFriends/RequestTabs";
import SentRequests from "./../../Components/MyFriends/SentRequests";
import ReceivedRequests from "./../../Components/MyFriends/ReceivedRequests";
import Loading from "../../Components/Layout/Loading";

export default function FriendRequestsPage() {
  const [activeTab, setActiveTab] = useState("received");
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchRequests(setSentRequests, setReceivedRequests, toast, setLoading);
  }, []);

  return (
    <div className="p-16 min-h-screen">
      <RequestTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {loading ? (
        <Loading color={"#666AEC"} />
      ) : activeTab === "sent" ? (
        <SentRequests
          sentRequests={sentRequests}
          setSentRequests={setSentRequests}
        />
      ) : (
        <ReceivedRequests
          receivedRequests={receivedRequests}
          setReceivedRequests={setReceivedRequests}
        />
      )}
    </div>
  );
}
