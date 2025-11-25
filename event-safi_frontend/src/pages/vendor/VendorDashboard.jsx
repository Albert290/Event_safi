import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';
import { vendorsAPI } from '../../api/vendors';
import { bookingsAPI } from '../../api/bookings';
import { Calendar, DollarSign, Star, TrendingUp, Package, Users, Check, X, Clock } from 'lucide-react';

export default function VendorDashboard() {
    const { user } = useAuthStore();
    const [stats, setStats] = useState({
        totalBookings: 0,
        pendingBookings: 0,
        confirmedBookings: 0,
        completedBookings: 0,
        totalRevenue: 0,
        averageRating: 0,
        totalServices: 0,
        totalReviews: 0,
        recentBookings: []
    });
    const [loading, setLoading] = useState(true);
    const [pendingBookings, setPendingBookings] = useState([]);

    useEffect(() => {
        fetchDashboardData();
        fetchPendingBookings();
    }, []);

    const fetchDashboardData = async () => {
        try {
            console.log('Fetching dashboard data...');
            const data = await vendorsAPI.getDashboard();
            console.log('Dashboard data received:', data);
            setStats(data);
        } catch (error) {
            console.error('Error fetching dashboard:', error);
            console.error('Error details:', error.response?.data);
        } finally {
            setLoading(false);
        }
    };

    const fetchPendingBookings = async () => {
        try {
            console.log('Fetching pending bookings...');
            const bookings = await bookingsAPI.getBookings();
            console.log('Bookings received:', bookings);
            const pending = Array.isArray(bookings) 
                ? bookings.filter(b => b.status === 'pending')
                : bookings.results?.filter(b => b.status === 'pending') || [];
            console.log('Pending bookings:', pending);
            setPendingBookings(pending);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            console.error('Error details:', error.response?.data);
        }
    };

    const handleBookingAction = async (bookingId, action) => {
        try {
            await bookingsAPI.updateBooking(bookingId, { status: action });
            // Refresh data
            fetchDashboardData();
            fetchPendingBookings();
        } catch (error) {
            console.error('Error updating booking:', error);
        }
    };

    const StatCard = ({ icon: Icon, label, value, color, subtext, link }) => {
        const content = (
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                    </div>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
                <p className="text-sm text-gray-600">{label}</p>
                {subtext && <p className="text-xs text-gray-500 mt-1">{subtext}</p>}
            </div>
        );

        return link ? <Link to={link}>{content}</Link> : content;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Welcome back, {user?.name}! 👋
                </h1>
                <p className="text-gray-600">
                    Here's what's happening with your business today
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <StatCard
                    icon={Calendar}
                    label="Total Bookings"
                    value={stats.totalBookings}
                    color="bg-blue-500"
                    subtext={`${stats.pendingBookings} pending`}
                    link="/vendor/bookings"
                />
                <StatCard
                    icon={DollarSign}
                    label="Total Revenue"
                    value={`KES ${stats.totalRevenue.toLocaleString()}`}
                    color="bg-green-500"
                />
                <StatCard
                    icon={Star}
                    label="Average Rating"
                    value={stats.averageRating > 0 ? `${stats.averageRating}/5.0` : 'No ratings'}
                    color="bg-yellow-500"
                    subtext={`${stats.totalReviews} reviews`}
                />
                <StatCard
                    icon={Package}
                    label="Active Services"
                    value={stats.totalServices}
                    color="bg-purple-500"
                    link="/vendor/services"
                />
                <StatCard
                    icon={Users}
                    label="Pending Requests"
                    value={stats.pendingBookings}
                    color="bg-orange-500"
                    link="/vendor/bookings"
                />
                <StatCard
                    icon={Check}
                    label="Completed"
                    value={stats.completedBookings}
                    color="bg-indigo-500"
                />
            </div>

            {/* Pending Booking Requests */}
            {pendingBookings.length > 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Pending Booking Requests ({pendingBookings.length})
                    </h2>
                    <div className="space-y-4">
                        {pendingBookings.slice(0, 3).map((booking) => (
                            <div key={booking.id} className="border rounded-lg p-4">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900">{booking.event_title}</h3>
                                        <p className="text-sm text-gray-600">{booking.service?.name}</p>
                                        <p className="text-sm text-gray-500">
                                            {new Date(booking.created_at).toLocaleDateString()}
                                        </p>
                                        {booking.notes && (
                                            <p className="text-sm text-gray-600 mt-1">"{booking.notes}"</p>
                                        )}
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        <button
                                            onClick={() => handleBookingAction(booking.id, 'confirmed')}
                                            className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                                        >
                                            <Check className="w-4 h-4" />
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleBookingAction(booking.id, 'rejected')}
                                            className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                                        >
                                            <X className="w-4 h-4" />
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {pendingBookings.length > 3 && (
                            <Link
                                to="/vendor/bookings"
                                className="block text-center py-2 text-blue-600 hover:text-blue-700 font-medium"
                            >
                                View all {pendingBookings.length} pending requests →
                            </Link>
                        )}
                    </div>
                </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link
                        to="/vendor/services"
                        className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left block"
                    >
                        <Package className="w-6 h-6 text-blue-600 mb-2" />
                        <p className="font-semibold text-gray-900">Manage Services</p>
                        <p className="text-sm text-gray-600">Add or edit your services</p>
                    </Link>
                    <Link
                        to="/vendor/bookings"
                        className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-left block"
                    >
                        <Calendar className="w-6 h-6 text-green-600 mb-2" />
                        <p className="font-semibold text-gray-900">View Bookings</p>
                        <p className="text-sm text-gray-600">Manage your bookings</p>
                    </Link>
                    <Link
                        to="/vendor/profile"
                        className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors text-left block"
                    >
                        <Star className="w-6 h-6 text-purple-600 mb-2" />
                        <p className="font-semibold text-gray-900">Update Profile</p>
                        <p className="text-sm text-gray-600">Edit your business profile</p>
                    </Link>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Bookings</h2>
                {stats.recentBookings && stats.recentBookings.length > 0 ? (
                    <div className="space-y-4">
                        {stats.recentBookings.map((booking) => (
                            <div key={booking.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                    booking.status === 'pending' ? 'bg-yellow-100' :
                                    booking.status === 'confirmed' ? 'bg-blue-100' :
                                    booking.status === 'completed' ? 'bg-green-100' :
                                    'bg-red-100'
                                }`}>
                                    {booking.status === 'pending' ? <Clock className="w-5 h-5 text-yellow-600" /> :
                                     booking.status === 'confirmed' ? <Calendar className="w-5 h-5 text-blue-600" /> :
                                     booking.status === 'completed' ? <Check className="w-5 h-5 text-green-600" /> :
                                     <X className="w-5 h-5 text-red-600" />}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900">{booking.event_title}</p>
                                    <p className="text-sm text-gray-600">{booking.service_name}</p>
                                    <p className="text-sm text-gray-500 capitalize">{booking.status}</p>
                                </div>
                                {booking.agreed_price && (
                                    <span className="text-sm font-medium text-gray-900">
                                        KES {booking.agreed_price.toLocaleString()}
                                    </span>
                                )}
                                <span className="text-xs text-gray-500">
                                    {new Date(booking.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p>No recent bookings</p>
                    </div>
                )}
            </div>
        </div>
    );
}
