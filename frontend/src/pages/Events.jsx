import { useState } from "react";
import { CalendarIcon } from "@heroicons/react/24/outline";

const Events = () => {
  const [event, setEvent] = useState({
    eventName: "Book Club",
    date: "2023-07-15",
    audience: "General Public",
    eventType: "Discussion",
    room: "Main Hall"
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{event.eventName}</h2>
          <div className="space-y-2">
            <p><span className="font-semibold">Date:</span> {event.date}</p>
            <p><span className="font-semibold">Event Type:</span> {event.eventType}</p>
            <p><span className="font-semibold">Room:</span> {event.room}</p>
          </div>
          <div className="card-actions justify-end">
            <button 
              className="btn btn-primary"
              onClick={() => alert("Registration coming soon!")}
            >
              Register
              <CalendarIcon className="h-5 w-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;

