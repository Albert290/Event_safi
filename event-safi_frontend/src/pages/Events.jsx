import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useEventsStore } from '../stores/useEventsStore';
import { eventsAPI } from '../api/events';
import EventCard from '../components/EventCard';
import { Plus, Calendar, Loader2, Search } from 'lucide-react';

function Events() {
    const { events, setEvents, setLoading, loading, error } = useEventsStore();
    const [filter, setFilter] = useState('all'); // all, upcoming, past
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const data = await eventsAPI.getEvents();
            // Handle different response formats
            const eventsArray = Array.isArray(data) ? data : (data?.results || []);
            setEvents(eventsArray);
        } catch (err) {
            console.error('Error fetching events:', err);
        } finally {
            setLoading(false);
        }
    };

    // Filter events based on status and search
    const filteredEvents = events.filter(event => {
        // Search filter
        const matchesSearch = !searchTerm ||
            event.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.event_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.location?.toLowerCase().includes(searchTerm.toLowerCase());

        // Date filter
        const eventDate = new Date(event.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let matchesFilter = true;
        if (filter === 'upcoming') {
            matchesFilter = eventDate >= today;
        } else if (filter === 'past') {
            matchesFilter = eventDate < today;
        }

        return matchesSearch && matchesFilter;
    });

    return (
        <div>
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">My Events</h1>
                <p className="text-gray-600">
                    Manage your events here. You can create new events, view existing ones, and edit event details.
                </p>
            </div>

            {/* Actions Bar */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                </div>

                {/* Create Event Button */}
                <Link
                    to="/create-event"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                >
                    <Plus className="w-5 h-5" />
                    Create New Event
                </Link>
            </div>

            {/* Filter Tabs */}
            <div className="mb-6 flex gap-2 border-b border-gray-200">
                {[
                    { key: 'all', label: 'All Events' },
                    { key: 'upcoming', label: 'Upcoming' },
                    { key: 'past', label: 'Past' }
                ].map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setFilter(tab.key)}
                        className={`px-4 py-2 font-medium transition-colors ${filter === tab.key
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        {tab.label}
                        <span className="ml-2 text-sm">
                            ({events.filter(e => {
                                if (tab.key === 'all') return true;
                                const eventDate = new Date(e.date);
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                return tab.key === 'upcoming'
                                    ? eventDate >= today
                                    : eventDate < today;
                            }).length})
                        </span>
                    </button>
                ))}
            </div>

            {/* Events Grid */}
            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                </div>
            ) : error ? (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button
                        onClick={fetchEvents}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            ) : filteredEvents.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                    <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    {searchTerm ? (
                        <>
                            <p className="text-gray-600 mb-2">No events found matching "{searchTerm}"</p>
                            <button
                                onClick={() => setSearchTerm('')}
                                className="text-blue-600 hover:text-blue-700 text-sm"
                            >
                                Clear search
                            </button>
                        </>
                    ) : events.length === 0 ? (
                        <>
                            <p className="text-gray-600 mb-4">You haven't created any events yet</p>
                            <Link
                                to="/create-event"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Plus className="w-5 h-5" />
                                Create Your First Event
                            </Link>
                        </>
                    ) : (
                        <p className="text-gray-600">No {filter} events</p>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEvents.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Events;