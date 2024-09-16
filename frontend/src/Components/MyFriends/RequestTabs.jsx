export default function RequestTabs({ activeTab, setActiveTab }) {
    return (
      <div className="flex mb-4 w-full">
        <button
          className={`p-2 w-1/2 rounded-l-xl ${activeTab === "received" ? "bg-primary text-white" : "bg-gray-200 text-black"}`}
          onClick={() => setActiveTab("received")}
        >
          Received Requests
        </button>
        <button
          className={`p-2 w-1/2 rounded-r-xl ${activeTab === "sent" ? "bg-primary text-white" : "bg-gray-200 text-black"}`}
          onClick={() => setActiveTab("sent")}
        >
          Sent Requests
        </button>
      </div>
    );
  }
  