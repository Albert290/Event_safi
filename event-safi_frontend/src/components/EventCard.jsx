import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  return (
    <Link
      to={`/events/${event.id}`}
      className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition block"
    >
      {/* Event Title */}
      <h3 className="text-lg font-semibold">{event.name}</h3>

      {/* Date + Category */}
      <div className="mt-1 flex justify-between text-sm text-gray-600">
        <span>{event.date}</span>
        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs">
          {event.event_type}
        </span>
      </div>

      {/* Vendor Count */}
      <p className="mt-3 text-sm text-gray-700">
        {event.vendor_count} vendor{event.vendor_count !== 1 ? "s" : ""}
      </p>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="w-full bg-gray-200 h-2 rounded-md overflow-hidden">
          <div
            className="h-2 bg-green-500"
            style={{ width: `${event.progress}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {event.progress}% complete
        </p>
      </div>
    </Link>
  );
}
