import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios"; // Adjust the base URL according to your backend API
import summaryApi from "../../../common";
const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [events, setEvents] = useState([]); // Store events here
  const [eventInput, setEventInput] = useState(""); // Input for new event
  const [selectedDate, setSelectedDate] = useState(null); // Date for new event

  useEffect(() => {
    // Fetch events when the component mounts or currentMonth changes
    const fetchEvents = async () => {
      try {
        const res = await axios.get(summaryApi.getEvents.url, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setEvents(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, [currentMonth]);

  const generateCalendar = () => {
    const startOfMonth = currentMonth.clone().startOf("month");
    const endOfMonth = currentMonth.clone().endOf("month");
    const days = [];
    for (let i = startOfMonth; i.isBefore(endOfMonth); i.add(1, "days")) {
      days.push(i.clone());
    }
    return days;
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.clone().add(1, "month"));
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(currentMonth.clone().subtract(1, "month"));
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleAddEvent = async () => {
    if (selectedDate && eventInput) {
      try {
        const newEvent = {
          date: selectedDate.format("YYYY-MM-DD"),
          name: eventInput,
        };
        await axios.post(summaryApi.addEvent.url, newEvent, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setEvents([...events, newEvent]); // Update local events
        setEventInput("");
        setSelectedDate(null);
      } catch (error) {
        console.error("Error adding event:", error);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto my-10">
      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handlePreviousMonth}
        >
          Previous
        </button>
        <h2 className="text-xl font-bold">
          {currentMonth.format("MMMM YYYY")}
        </h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleNextMonth}
        >
          Next
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="font-bold">
            {day}
          </div>
        ))}
        {generateCalendar().map((date) => (
          <div
            key={date.format("YYYY-MM-DD")}
            className={`border p-2 ${
              selectedDate && selectedDate.isSame(date, "day")
                ? "bg-blue-200"
                : ""
            }`}
            onClick={() => handleDateClick(date)}
          >
            {date.format("D")}
            {events
              .filter((event) => event.date === date.format("YYYY-MM-DD"))
              .map((event, index) => (
                <div key={index} className="text-sm text-gray-600">
                  {event.name}
                </div>
              ))}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h3 className="font-semibold">Add Event</h3>
        <input
          type="text"
          value={eventInput}
          onChange={(e) => setEventInput(e.target.value)}
          className="border p-2 w-full mt-2"
          placeholder="Event Name"
        />
        <button
          className="bg-green-500 text-white px-4 py-2 mt-2 rounded"
          onClick={handleAddEvent}
        >
          Add Event
        </button>
      </div>
    </div>
  );
};

export default Calendar;
