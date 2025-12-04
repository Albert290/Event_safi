import { Link } from "react-router-dom";
import { Calendar, Tag, TrendingUp, MapPin } from 'lucide-react';

export default function EventCard({ event }) {
  // Format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Get stage color
  const getStageColor = (stage) => {
    const colors = {
      planning: 'bg-blue-100 text-blue-700',
      in_progress: 'bg-yellow-100 text-yellow-700',
      completed: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700'
    };
    return colors[stage] || 'bg-gray-100 text-gray-700';
  };

  // Get stage label
  const getStageLabel = (stage) => {
    const labels = {
      planning: 'Planning',
      in_progress: 'In Progress',
      completed: 'Completed',
      cancelled: 'Cancelled'
    };
    return labels[stage] || stage;
  };

  return (
    <Link
      to={`/events/${event.id}`}
      className="bg-white rounded-xl p-5 shadow-sm border border-black hover:shadow-lg hover:border-blue-300 transition-all block"
    >
      {/* Header: Event Name */}
      <div className="mb-3">
        <h3 className="text-xl font-bold text-gray-900 line-clamp-2 mb-1">
          {event.name || event.title}
        </h3>
      </div>

      {/* Event Details Grid */}
      <div className="space-y-2 mb-4">
        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4 text-blue-600 flex-shrink-0" />
          <span className="font-medium">{formatDate(event.date)}</span>
        </div>

        {/* Event Type */}
        {(event.event_type || event.eventType) && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Tag className="w-4 h-4 text-purple-600 flex-shrink-0" />
            <span className="px-2 py-0.5 bg-purple-50 text-purple-700 rounded-md text-xs font-medium">
              {typeof event.event_type === 'object' ? event.event_type.name : event.event_type}
            </span>
          </div>
        )}

        {/* Location */}
        {event.location && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
        )}

        {/* Stage */}
        {event.stage && (
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${getStageColor(event.stage)}`}>
              {getStageLabel(event.stage)}
            </span>
          </div>
        )}
      </div>

      {/* Footer: Vendor Count and Progress */}
      <div className="pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600">
            {event.vendor_count || 0} vendor{(event.vendor_count || 0) !== 1 ? "s" : ""}
          </span>
          {typeof event.progress !== 'undefined' && (
            <span className="text-gray-500 text-xs">
              {event.progress}% complete
            </span>
          )}
        </div>

        {/* Progress Bar */}
        {typeof event.progress !== 'undefined' && (
          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <div
              className="h-1.5 bg-gradient-to-r from-blue-500 to-emerald-500 transition-all"
              style={{ width: `${event.progress}%` }}
            />
          </div>
        )}
      </div>
    </Link>
  );
}
