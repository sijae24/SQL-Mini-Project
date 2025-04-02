import { useState, useEffect } from "react";
import { CalendarIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import EventCard from "../components/EventCard";

const Events = ({ user }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [isRegistering, setIsRegistering] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [notification, setNotification] = useState(null);

  const userID = user?.userID;

  // Function to show a notification
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  // Fetch all events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  // Fetch user's registered events
  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      if (!userID) return;
      try {
        const response = await axios.get(`http://localhost:5000/registered-events/${userID}`);
        setRegisteredEvents(response.data.map((e) => e.eventID));
      } catch (error) {
        console.error("Error fetching registered events:", error);
      }
    };
    fetchRegisteredEvents();
  }, [userID]);

  // Handle event registration
  const handleRegister = async (eventID) => {
    if (!userID || isRegistering) return;

    setIsRegistering(true);
    try {
      await axios.post("http://localhost:5000/register-event", {
        userID,
        eventID,
      });
      setRegisteredEvents([...registeredEvents, eventID]);
      showNotification("Successfully registered for the event!", "success");
    } catch (error) {
      const message = error.response?.data?.message;

      if (message.includes("event is full")) {
        showNotification("This event is currently full.", "error");
      } else if (message.includes("already registered")) {
        showNotification("You are already registered for this event.", "error");
      } else {
        showNotification("Registration failed. Please try again.", "error");
      }
    } finally {
      setTimeout(() => setIsRegistering(false), 1000);
    }
  };

  // Handle event unregistration
  const handleUnregister = async (eventID) => {
    if (!userID || isRegistering) return;

    setIsRegistering(true);
    try {
      await axios.post("http://localhost:5000/unregister-event", {
        userID,
        eventID,
      });
      setRegisteredEvents(registeredEvents.filter((id) => id !== eventID));
      showNotification("Successfully unregistered from the event!", "success");
    } catch (error) {
      showNotification("Unregistration failed. Please try again.", "error");
      console.error("Error unregistering event:", error);
    } finally {
      setIsRegistering(false);
    }
  };

  // Filter events based on search term and type
  const filterEvents = (eventsToFilter) => {
    // Check if any value in the event matches the search term
    return eventsToFilter.filter(
      (event) =>
        (searchTerm === "" ||
          Object.values(event).some((value) => value !== null && String(value).toLowerCase().includes(searchTerm.toLowerCase()))) &&
        (selectedType === "all" || event.eventType === selectedType)
    );
  };

  // Filter events based on active tab
  const filteredEvents = filterEvents(events).filter((event) => {
    if (activeTab === "registered") {
      return registeredEvents.includes(event.eventID);
    }
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center">
        <CalendarIcon className="h-8 w-8 mr-2" /> Find Events
      </h1>

      {notification && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div
            className={`flex items-center p-4 rounded-lg shadow-lg animate-fade-in pointer-events-auto ${
              notification.type === "success"
                ? "bg-green-100 border border-green-400 text-green-700"
                : "bg-red-100 border border-red-400 text-red-700"
            }`}
          >
            {notification.type === "success" ? <CheckCircleIcon className="h-6 w-6 mr-2" /> : <XCircleIcon className="h-6 w-6 mr-2" />}
            <div>
              <label>{notification.message}</label>
            </div>
          </div>
        </div>
      )}

      {/* Tabs for events */}
      <div className="tabs tabs-boxed mb-8">
        <button className={`tab ${activeTab === "all" ? "tab-active" : ""}`} onClick={() => setActiveTab("all")}>
          <CalendarIcon className="h-5 w-5 mr-2" /> All Events
        </button>
        <button className={`tab ${activeTab === "registered" ? "tab-active" : ""}`} onClick={() => setActiveTab("registered")}>
          <CheckCircleIcon className="h-5 w-5 mr-2" /> Registered
        </button>
      </div>

      {/* Search and type filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by event name, location, etc..."
            className="input input-bordered w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-48">
          <select className="select select-bordered w-full" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="Workshop">Workshops</option>
            <option value="Lecture">Lectures</option>
            <option value="Seminar">Seminars</option>
            <option value="Conference">Conferences</option>
          </select>
        </div>
      </div>

      {/* Events grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            {activeTab === "registered" ? "You haven't registered for any events yet" : "No events found"}
          </p>
        ) : (
          filteredEvents.map((event) => (
            <EventCard
              key={event.eventID}
              event={event}
              onRegister={handleRegister}
              registeredEvents={registeredEvents}
              isRegistering={isRegistering}
              handleUnregister={handleUnregister}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Events;
