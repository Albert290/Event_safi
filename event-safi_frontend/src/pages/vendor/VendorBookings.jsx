import { useState, useEffect } from 'react';
import { useBookingsStore } from '../../stores/useBookingsStore';
import { bookingsAPI } from '../../api/bookings';
import { Calendar, Clock, User, DollarSign, Check, X, Loader2, MapPin, Tag, AlertCircle } from 'lucide-react';

export default function VendorBookings() {
    const { bookings, setBookings } = useBookingsStore();
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, pending, confirmed, completed, cancelled
    const [processingId, setProcessingId] = useState(null);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const data = await bookingsAPI.getBookings();
            // Handle paginated response (DRF pagination)
            const bookingsArray = data.results ? data.results : (Array.isArray(data) ? data : []);
            setBookings(bookingsArray);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            setBookings([]); // Set empty array on error
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (bookingId, newStatus) => {
        setProcessingId(bookingId);
        try {
            await bookingsAPI.updateBooking(bookingId, { status: newStatus });
            await fetchBookings(); // Refresh the list
            // Show success notification
            alert(`Booking ${newStatus === 'confirmed' ? 'accepted' : newStatus === 'cancelled' ? 'declined' : 'updated'} successfully!`);
        } catch (error) {
            console.error('Error updating booking:', error);
            alert('Failed to update booking status. Please try again.');
        } finally {
            setProcessingId(null);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
            completed: 'bg-green-100 text-green-800 border-green-200',
            cancelled: 'bg-red-100 text-red-800 border-red-200',
            rejected: 'bg-red-100 text-red-800 border-red-200',
        };
        return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending':
                return <AlertCircle className="w-4 h-4" />;
            case 'confirmed':
            case 'completed':
                return <Check className="w-4 h-4" />;
            case 'cancelled':
            case 'rejected':
                return <X className="w-4 h-4" />;
            default:
                return null;
        }
    };

    // Ensure bookings is always an array
    const bookingsArray = Array.isArray(bookings) ? bookings : [];

    const filteredBookings = filter === 'all'
        ? bookingsArray
        : bookingsArray.filter(b => b.status === filter);

    // Count bookings by status
    const counts = {
        all: bookingsArray.length,
        pending: bookingsArray.filter(b => b.status === 'pending').length,
        confirmed: bookingsArray.filter(b => b.status === 'confirmed').length,
        completed: bookingsArray.filter(b => b.status === 'completed').length,
        cancelled: bookingsArray.filter(b => b.status === 'cancelled' || b.status === 'rejected').length,
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Bookings</h1>
                <p className="text-gray-600">Manage your service bookings and requests from clients</p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-yellow-700 font-medium">Pending</p>
                            <p className="text-2xl font-bold text-yellow-900">{counts.pending}</p>
                        </div>
                        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                            <Clock className="w-6 h-6 text-yellow-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-blue-700 font-medium">Confirmed</p>
                            <p className="text-2xl font-bold text-blue-900">{counts.confirmed}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <Check className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-green-700 font-medium">Completed</p>
                            <p className="text-2xl font-bold text-green-900">{counts.completed}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <Check className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-700 font-medium">Total</p>
                            <p className="text-2xl font-bold text-gray-900">{counts.all}</p>
                        </div>
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-gray-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="mb-6 flex gap-2 border-b border-gray-200 overflow-x-auto">
                {[
                    { key: 'all', label: 'All' },
                    { key: 'pending', label: 'Pending' },
                    { key: 'confirmed', label: 'Confirmed' },
                    { key: 'completed', label: 'Completed' },
                    { key: 'cancelled', label: 'Declined' }
                ].map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setFilter(tab.key)}
                        className={`px-4 py-2 font-medium capitalize transition-colors whitespace-nowrap ${filter === tab.key
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        {tab.label}
                        <span className="ml-2 text-sm">({counts[tab.key]})</span>
                    </button>
                ))}
            </div>

            {/* Bookings List */}
            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                </div>
            ) : filteredBookings.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                    <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No {filter !== 'all' ? filter : ''} bookings</h3>
                    <p className="text-gray-600">
                        {filter === 'pending'
                            ? "You don't have any pending booking requests at the moment."
                            : filter === 'all'
                                ? "You haven't received any booking requests yet."
                                : `No ${filter} bookings found.`
                        }
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredBookings.map((booking) => (
                        <div
                            key={booking.id}
                            className="bg-white rounded-lg border-2 border-gray-200 p-6 hover:shadow-md transition-shadow"
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <h3 className="text-xl font-bold text-gray-900">
                                            {booking.event_title || 'Event'}
                                        </h3>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border inline-flex items-center gap-1 ${getStatusColor(booking.status)}`}>
                                            {getStatusIcon(booking.status)}
                                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                        </span>
                                    </div>

                                    {/* Service Info - Prominent */}
                                    <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                                        <div className="flex items-center gap-2">
                                            <Tag className="w-5 h-5 text-blue-600" />
                                            <div>
                                                <p className="text-sm text-blue-700 font-medium">Service Requested</p>
                                                <p className="text-lg font-bold text-blue-900">{booking.service?.name || 'Service'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Event Details Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <Calendar className="w-4 h-4 text-blue-600" />
                                            <span className="font-medium">Event Date:</span>
                                            <span>{booking.event_date ? new Date(booking.event_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Date TBD'}</span>
                                        </div>

                                        <div className="flex items-center gap-2 text-gray-700">
                                            <Clock className="w-4 h-4 text-gray-600" />
                                            <span className="font-medium">Requested:</span>
                                            <span>{new Date(booking.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                        </div>

                                        {booking.service?.category_name && (
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <Tag className="w-4 h-4 text-purple-600" />
                                                <span className="font-medium">Category:</span>
                                                <span>{booking.service.category_name}</span>
                                            </div>
                                        )}

                                        {booking.agreed_price && (
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <DollarSign className="w-4 h-4 text-green-600" />
                                                <span className="font-medium">Price:</span>
                                                <span className="font-bold text-green-700">KES {booking.agreed_price.toLocaleString()}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Client Notes */}
                                    {booking.notes && (
                                        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                            <p className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                                <User className="w-4 h-4" />
                                                Client Notes:
                                            </p>
                                            <p className="text-sm text-gray-600 italic">"{booking.notes}"</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Actions */}
                            {booking.status === 'pending' && (
                                <div className="flex gap-3 pt-4 border-t border-gray-200">
                                    <button
                                        onClick={() => handleUpdateStatus(booking.id, 'confirmed')}
                                        disabled={processingId === booking.id}
                                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                                    >
                                        {processingId === booking.id ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <Check className="w-5 h-5" />
                                                Accept Booking
                                            </>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => handleUpdateStatus(booking.id, 'cancelled')}
                                        disabled={processingId === booking.id}
                                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                                    >
                                        <X className="w-5 h-5" />
                                        Decline
                                    </button>
                                </div>
                            )}

                            {booking.status === 'confirmed' && (
                                <div className="pt-4 border-t border-gray-200">
                                    <button
                                        onClick={() => handleUpdateStatus(booking.id, 'completed')}
                                        disabled={processingId === booking.id}
                                        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
                                    >
                                        {processingId === booking.id ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <Check className="w-5 h-5" />
                                                Mark as Completed
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
