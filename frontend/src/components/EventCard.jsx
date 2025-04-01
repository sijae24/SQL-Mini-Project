import { CalendarIcon, WrenchIcon, MicrophoneIcon, DevicePhoneMobileIcon, BuildingOfficeIcon, UserGroupIcon} from "@heroicons/react/24/outline";

const EventCard = ({ event, onRegister, registeredEvents, isRegistering, handleUnregister }) => {
  return (
    <div className="card bg-base-100 shadow-xl transition-transform hover:scale-105 cursor-pointer">
      <div className="card-body">
        <div className="flex items-center gap-2">
          {event.eventType === "Workshop" && <WrenchIcon className="h-5 w-5 text-blue-500" />}
          {event.eventType === "Lecture" && <MicrophoneIcon className="h-5 w-5 text-purple-500" />}
          {event.eventType === "Seminar" && <DevicePhoneMobileIcon className="h-5 w-5 text-green-500" />}
          {event.eventType === "Conference" && <BuildingOfficeIcon className="h-5 w-5 text-red-500" />}
        <h2 className="card-title">{event.eventName}</h2>
        </div>
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
        <p>
          <strong>Attendees:</strong> {event.attendees}
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
            <button className="btn btn-primary hover:btn-secondary" onClick={() => onRegister(event.eventID)} disabled={isRegistering}>
              Register
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
