import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { eventsAPI } from '../api/events';
import { bookingsAPI } from '../api/bookings';
import { paymentsAPI } from '../api/payments';
import { Calendar, MapPin, DollarSign, Edit, Users, CreditCard, Star, Plus, Loader2 } from 'lucide-react';

function EventDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [payments, setPayments] = useState([]);
    const [activeTab, setActiveTab] = useState('overview');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchEventData();
    }, [id]);

    const fetchEventData = async () => {
        setLoading(true);
        try {
            const [eventData, bookingsData, paymentsData] = await Promise.all([
                eventsAPI.getEvent(id),
                bookingsAPI.getBookings().then(data => 
                    Array.isArray(data) ? data.filter(b => b.event === id) : []
                ).catch(() => []),
                paymentsAPI.getPayments().then(data => 
                    Array.isArray(data) ? data.filter(p => p.event === id) : []
                ).catch(() => [])
            ]);
            
            setEvent(eventData);
            setBookings(bookingsData);
            setPayments(paymentsData);
        } catch (err) {
            setError('Failed to load event details');
            console.error('Error fetching event data:', err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES'
        }).format(amount);
    };

    const calculateTotals = () => {
        const totalBudget = event?.budget || 0;
        const totalSpent = payments.reduce((sum, payment) => sum + parseFloat(payment.amount || 0), 0);
        const remaining = totalBudget - totalSpent;
        return { totalBudget, totalSpent, remaining };
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className="text-center py-12">
                <p className="text-red-600 mb-4">{error || 'Event not found'}</p>
                <button
                    onClick={() => navigate('/events')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Back to Events
                </button>
            </div>
        );
    }

    const tabs = [
        { id: 'overview', label: 'Overview', icon: Calendar },
        { id: 'vendors', label: 'Vendors', icon: Users },
        { id: 'payments', label: 'Payments', icon: CreditCard },
        { id: 'feedback', label: 'Feedback', icon: Star }
    ];

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{event.title}</h1>
                        <div className="flex items-center gap-4 text-gray-600">
                            <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDate(event.date)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                <span>{event.location}</span>
                            </div>
                            {event.budget && (
                                <div className="flex items-center gap-1">
                                    <DollarSign className="w-4 h-4" />
                                    <span>{formatCurrency(event.budget)}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <Link
                        to={`/create-event?edit=${event.id}`}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Edit className="w-4 h-4" />
                        Edit Event
                    </Link>
                </div>
                
                <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        event.status === 'completed' ? 'bg-green-100 text-green-800' :
                        event.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                    }`}>
                        {event.status?.charAt(0).toUpperCase() + event.status?.slice(1)}
                    </span>
                    {event.event_type && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                            {event.event_type}
                        </span>
                    )}
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm border">
                <div className="border-b border-gray-200">
                    <nav className="flex space-x-8 px-6">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                                        activeTab === tab.id
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {tab.label}
                                    {tab.id === 'vendors' && (
                                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                                            {bookings.length}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                <div className="p-6">
                    {activeTab === 'overview' && (
                        <OverviewTab event={event} />
                    )}
                    {activeTab === 'vendors' && (
                        <VendorsTab bookings={bookings} eventId={event.id} />
                    )}
                    {activeTab === 'payments' && (
                        <PaymentsTab payments={payments} totals={calculateTotals()} />
                    )}
                    {activeTab === 'feedback' && (
                        <FeedbackTab eventId={event.id} />
                    )}
                </div>
            </div>
        </div>
    );
}

// Overview Tab Component
function OverviewTab({ event }) {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-3">Event Description</h3>
                <p className="text-gray-600 leading-relaxed">
                    {event.description || 'No description provided for this event.'}
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-medium text-gray-900 mb-2">Event Details</h4>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Created:</span>
                            <span>{new Date(event.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Last Updated:</span>
                            <span>{new Date(event.updated_at).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Status:</span>
                            <span className="capitalize">{event.status}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Vendors Tab Component
function VendorsTab({ bookings, eventId }) {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Booked Vendors</h3>
                <Link
                    to={`/vendors?event_id=${eventId}`}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Book More Vendors
                </Link>
            </div>

            {bookings.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">No vendors booked yet</p>
                    <Link
                        to={`/vendors?event_id=${eventId}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        <Plus className="w-4 h-4" />
                        Browse Vendors
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {bookings.map((booking) => (
                        <div key={booking.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-medium">{booking.service?.name || 'Service'}</h4>
                                    <p className="text-sm text-gray-600">{booking.service?.vendor?.business_name || 'Vendor'}</p>
                                    <p className="text-sm text-gray-500">{booking.service?.category || 'Category'}</p>
                                </div>
                                <div className="text-right">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                        booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                        {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1)}
                                    </span>
                                    {booking.agreed_price && (
                                        <p className="text-sm font-medium mt-1">
                                            {new Intl.NumberFormat('en-KE', {
                                                style: 'currency',
                                                currency: 'KES'
                                            }).format(booking.agreed_price)}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// Payments Tab Component
function PaymentsTab({ payments, totals }) {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-6">Payment Overview</h3>
            
            {/* Budget Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-600 font-medium">Total Budget</p>
                    <p className="text-2xl font-bold text-blue-900">
                        {new Intl.NumberFormat('en-KE', {
                            style: 'currency',
                            currency: 'KES'
                        }).format(totals.totalBudget)}
                    </p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-sm text-red-600 font-medium">Total Spent</p>
                    <p className="text-2xl font-bold text-red-900">
                        {new Intl.NumberFormat('en-KE', {
                            style: 'currency',
                            currency: 'KES'
                        }).format(totals.totalSpent)}
                    </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-600 font-medium">Remaining</p>
                    <p className="text-2xl font-bold text-green-900">
                        {new Intl.NumberFormat('en-KE', {
                            style: 'currency',
                            currency: 'KES'
                        }).format(totals.remaining)}
                    </p>
                </div>
            </div>

            {/* Payments List */}
            {payments.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No payments recorded yet</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {payments.map((payment) => (
                        <div key={payment.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-medium">{payment.description || 'Payment'}</h4>
                                    <p className="text-sm text-gray-600">
                                        {new Date(payment.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold">
                                        {new Intl.NumberFormat('en-KE', {
                                            style: 'currency',
                                            currency: 'KES'
                                        }).format(payment.amount)}
                                    </p>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                                        payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                        {payment.status?.charAt(0).toUpperCase() + payment.status?.slice(1)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// Feedback Tab Component
function FeedbackTab({ eventId }) {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-6">Reviews & Feedback</h3>
            <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Reviews will be available after the event is completed</p>
                <p className="text-sm text-gray-500">You'll be able to rate and review your vendors here</p>
            </div>
        </div>
    );
}

export default EventDetails;