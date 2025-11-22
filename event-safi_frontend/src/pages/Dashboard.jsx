import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { useEventsStore } from '../stores/useEventsStore';
import { useVendorsStore } from '../stores/useVendorsStore';
import { Calendar, Users, Star, TrendingUp, Plus, Search, Clock, MapPin } from 'lucide-react';

function Dashboard() {
    const { user } = useAuthStore();
    const { events, fetchEvents } = useEventsStore();
    const { vendors, fetchVendors } = useVendorsStore();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalEvents: 0,
        upcomingEvents: 0,
        activeBookings: 0,
        completedEvents: 0,
    });

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            await Promise.all([
                fetchEvents(),
                fetchVendors()
            ]);

            // Calculate stats from events
            const upcoming = events.filter(e => new Date(e.date) > new Date() && e.status !== 'completed').length;
            const completed = events.filter(e => e.status === 'completed').length;

            setStats({
                totalEvents: events.length,
                upcomingEvents: upcoming,
                activeBookings: 0, // This would come from bookings API
                completedEvents: completed,
            });
        } catch (error) {
            console.error('Error loading dashboard:', error);
        } finally {
            setLoading(false);
        }
    };

    const StatCard = ({ icon: Icon, label, value, color, subtext, link }) => (
        <Link to={link || '#'} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
            <p className="text-sm text-gray-600">{label}</p>
            {subtext && <p className="text-xs text-gray-500 mt-1">{subtext}</p>}
        </Link>
    );

    const upcomingEvents = events
        .filter(e => new Date(e.date) > new Date())
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 3);

    const recommendedVendors = vendors.slice(0, 3);

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Welcome back, {user?.name}! 👋
                </h1>
                <p className="text-gray-600">
                    Plan your perfect event with Event Safi
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    icon={Calendar}
                    label="Total Events"
                    value={stats.totalEvents}
                    color="bg-blue-500"
                    link="/events"
                />
                <StatCard
                    icon={Clock}
                    label="Upcoming Events"
                    value={stats.upcomingEvents}
                    color="bg-blue-500"
                    subtext="This month"
                    link="/events"
                />
                <StatCard
                    icon={Users}
                    label="Active Bookings"
                    value={stats.activeBookings}
                    color="bg-blue-500"
                    link="/vendors"
                />
                <StatCard
                    icon={TrendingUp}
                    label="Completed"
                    value={stats.completedEvents}
                    color="bg-blue-500"
                    link="/events"
                />
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-8 mb-8 text-white">
                <h2 className="text-2xl font-semibold mb-2">Ready to plan your next event?</h2>
                <p className="mb-6 text-blue-100">Get started by creating an event or finding the perfect vendors</p>
                <div className="flex flex-wrap gap-4">
                    <Link
                        to="/create-event"
                        className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Create Event
                    </Link>
                    <Link
                        to="/vendors"
                        className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors flex items-center gap-2"
                    >
                        <Search className="w-5 h-5" />
                        Find Vendors
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Upcoming Events */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">Upcoming Events</h2>
                        <Link to="/events" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            View all
                        </Link>
                    </div>

                    {upcomingEvents.length > 0 ? (
                        <div className="space-y-4">
                            {upcomingEvents.map((event) => (
                                <Link
                                    key={event.id}
                                    to={`/events/${event.id}`}
                                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Calendar className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-gray-900 truncate">{event.title}</p>
                                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                                            <Clock className="w-4 h-4" />
                                            <span>{new Date(event.date).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                                            <MapPin className="w-4 h-4" />
                                            <span className="truncate">{event.location}</span>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${event.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                        event.status === 'planning' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-gray-100 text-gray-700'
                                        }`}>
                                        {event.status}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500 mb-4">No upcoming events</p>
                            <Link
                                to="/create-event"
                                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                            >
                                <Plus className="w-4 h-4" />
                                Create your first event
                            </Link>
                        </div>
                    )}
                </div>

                {/* Recommended Vendors */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">Recommended Vendors</h2>
                        <Link to="/vendors" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            View all
                        </Link>
                    </div>

                    {recommendedVendors.length > 0 ? (
                        <div className="space-y-4">
                            {recommendedVendors.map((vendor) => (
                                <Link
                                    key={vendor.id}
                                    to={`/vendors/${vendor.id}`}
                                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Users className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-gray-900 truncate">{vendor.business_name}</p>
                                        <p className="text-sm text-gray-600 truncate mt-1">{vendor.description}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                            <span className="text-sm font-medium text-gray-700">{vendor.rating || '5.0'}</span>
                                            {vendor.is_verified && (
                                                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                                                    Verified
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500 mb-4">No vendors available</p>
                            <Link
                                to="/vendors"
                                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                            >
                                <Search className="w-4 h-4" />
                                Browse vendors
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;