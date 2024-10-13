import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import summaryApi from "../../../common";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [events, setEvents] = useState([]);
  const [eventInput, setEventInput] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(summaryApi.getEvents.url, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setEvents(res.data);
      } catch (error) {
        console.error("Error fetching events:", error);
        toast.error("Failed to fetch events");
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
        setEvents([...events, newEvent]);
        setEventInput("");
        setSelectedDate(null);
        toast.success("Event added successfully");
      } catch (error) {
        console.error("Error adding event:", error);
        toast.error("Failed to add event");
      }
    } else {
      toast.error("Please select a date and enter an event name");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 p-4 lg:p-8">
      <Toaster position="top-right" />
      {/* Calendar and Events Section */}
      <div className="col-span-1 lg:col-span-2">
        <div className="bg-white dark:bg-darkBg shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <button
              className="bg-blue-500 text-white  px-4 py-2 rounded"
              onClick={handlePreviousMonth}
            >
              Previous
            </button>
            <h2 className="text-xl font-bold text-black dark:text-white">
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
              <div key={day} className="font-bold text-black dark:text-white">
                {day}
              </div>
            ))}
            {generateCalendar().map((date) => (
              <div
                key={date.format("YYYY-MM-DD")}
                className={`border p-2 rounded-lg cursor-pointer hover:bg-slate-800 transition relative h-24 overflow-hidden ${
                  selectedDate && selectedDate.isSame(date, "day")
                    ? "bg-slate-900"
                    : ""
                }`}
                onClick={() => handleDateClick(date)}
              >
                <div className="text-lg font-bold dark:text-white text-black ">
                  {date.format("D")}
                </div>
                <div className="overflow-y-auto max-h-16">
                  {events
                    .filter((event) => event.date === date.format("YYYY-MM-DD"))
                    .map((event, index) => (
                      <div
                        key={index}
                        className="text-sm text-gray-600 dark:text-bg truncate max-h-6 overflow-hidden whitespace-nowrap"
                      >
                        {event.name}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Event Section */}
        <div className="mt-6 bg-white dark:bg-darkBg shadow-md rounded-lg p-6">
          <h3 className="font-semibold mb-4 dark:text-white">Add Event</h3>
          <input
            type="text"
            value={eventInput}
            onChange={(e) => setEventInput(e.target.value)}
            className="border p-2 w-full mt-2 rounded dark:bg-darkBg dark:text-white"
            placeholder="Event Name"
          />
          <button
            className="bg-green-500 text-white px-4 py-2 mt-2 rounded w-full"
            onClick={handleAddEvent}
          >
            Add Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
