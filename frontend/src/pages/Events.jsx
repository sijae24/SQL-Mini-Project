import { useState, useEffect } from "react";
import { CalendarIcon, UserGroupIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";

const Events = ({ user }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [isRegistering, setIsRegistering] = useState(false);
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
      alert("Successfully registered for event!");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setIsRegistering(false);
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
      alert("Successfully unregistered from event");
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
            <div key={event.eventID} className="card bg-base-100 shadow-xl transition-transform hover:scale-105">
              <div className="card-body">
                <h2 className="card-title">{event.eventName}</h2>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <UserGroupIcon className="h-5 w-5" />
                  <span>{event.audience}</span>
                </div>
                <p className="mt-2">
                  <strong>Type:</strong> {event.eventType}
                </p>
                <p>
                  <strong>Location:</strong> {event.roomName}
                </p>
                <p>
                  <strong>Capacity:</strong> {event.capacity}
                </p>

                <div className="card-actions justify-end">
                  {registeredEvents.includes(event.eventID) ? (
                    <button
                      className="btn btn-primary hover:btn-secondary"
                      onClick={() => handleUnregister(event.eventID)}
                      disabled={isRegistering}
                    >
                      Cancel
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary hover:btn-secondary"
                      onClick={() => handleRegister(event.eventID)}
                      disabled={isRegistering}
                    >
                      Register
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Events;
