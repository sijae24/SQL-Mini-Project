import { useState, useEffect } from "react";
import { CalendarIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import EventCard from "../components/EventCard";

const Events = ({ user }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registerError, setRegisterError] = useState(null);
  const [unregisterSuccess, setUnregisterSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const userID = user?.userID;

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
      setRegisterSuccess(true);
      setTimeout(() => setRegisterSuccess(false), 5000);
    } catch (error) {
      const message = error.response?.data?.message;

      if (message.includes("event is full")) {
        setRegisterError("This event is currently full.");
      } else if (message.includes("is already registered")) {
        setRegisterError("You are already registered for this event.");
      } else {
        setRegisterError("Registration failed. Please try again.");
      }
      setTimeout(() => setRegisterError(null), 5000);
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
      setUnregisterSuccess(true);
      setTimeout(() => setUnregisterSuccess(false), 5000);
    } catch (error) {
      alert("Unregistration failed");
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

      {registerSuccess && (
        <div className="alert alert-success mb-6">
          <div className="flex-1">
            <CheckCircleIcon className="h-6 w-6" />
            <label>Successfully registered for the event!</label>
          </div>
        </div>
      )}

      {unregisterSuccess && (
        <div className="alert alert-success mb-6">
          <div className="flex-1">
            <CheckCircleIcon className="h-6 w-6" />
            <label>Successfully unregistered from the event!</label>
          </div>
        </div>
      )}

      {registerError && (
        <div className="alert alert-error mb-6">
          <div className="flex-1">
            <XCircleIcon className="h-6 w-6" />
            <label>{registerError}</label>
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
