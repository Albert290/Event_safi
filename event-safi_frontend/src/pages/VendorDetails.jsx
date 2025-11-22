import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { vendorsAPI } from '../api/vendors';
import { reviewsAPI } from '../api/reviews';
import { bookingsAPI } from '../api/bookings';
import ReviewList from '../components/reviews/ReviewList';
import StarRating from '../components/reviews/StarRating';
import {
    Star,
    MapPin,
    Phone,
    Mail,
    Calendar,
    DollarSign,
    Loader2,
    ArrowLeft,
    CheckCircle,
    Package,
    MessageSquare
} from 'lucide-react';

export default function VendorDetails() {
    const { id } = useParams();
    const [vendor, setVendor] = useState(null);
    const [services, setServices] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    useEffect(() => {
        fetchVendorData();
    }, [id]);

    const fetchVendorData = async () => {
        setLoading(true);
        setError('');
        try {
            const [vendorData, reviewsData] = await Promise.all([
                vendorsAPI.getVendor(id),
                reviewsAPI.getVendorReviews(id).catch(() => [])
            ]);

            setVendor(vendorData);

            // Extract services from vendor data or fetch separately
            if (vendorData.services) {
                setServices(Array.isArray(vendorData.services) ? vendorData.services : []);
            }

            // Handle reviews response
            const reviewsArray = Array.isArray(reviewsData) ? reviewsData : (reviewsData?.results || []);
            setReviews(reviewsArray);
        } catch (err) {
            console.error('Error fetching vendor:', err);
            setError('Failed to load vendor details');
        } finally {
            setLoading(false);
        }
    };

    const handleBookService = (service) => {
        setSelectedService(service);
        setShowBookingModal(true);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    if (error || !vendor) {
        return (
            <div className="text-center py-12">
                <p className="text-red-600 mb-4">{error || 'Vendor not found'}</p>
                <Link to="/vendors" className="text-blue-600 hover:text-blue-700">
                    ← Back to Vendors
                </Link>
            </div>
        );
    }

    return (
        <div>
            {/* Back Button */}
            <Link
                to="/vendors"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Vendors
            </Link>

            {/* Vendor Header */}
            <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Vendor Avatar */}
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex-shrink-0 flex items-center justify-center text-white text-4xl font-bold">
                        {vendor.business_name?.charAt(0) || 'V'}
                    </div>

                    {/* Vendor Info */}
                    <div className="flex-1">
                        <div className="flex items-start justify-between gap-4 mb-4">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    {vendor.business_name}
                                </h1>
                                {vendor.category_name && (
                                    <p className="text-lg text-gray-600">{vendor.category_name}</p>
                                )}
                            </div>

                            {/* Rating */}
                            {vendor.rating > 0 && (
                                <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-lg">
                                    <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {vendor.rating.toFixed(1)}
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            {reviews.length} review{reviews.length !== 1 ? 's' : ''}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Contact Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                            {vendor.location && (
                                <div className="flex items-center gap-2 text-gray-600">
                                    <MapPin className="w-5 h-5" />
                                    <span>{vendor.location}</span>
                                </div>
                            )}
                            {vendor.phone_number && (
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Phone className="w-5 h-5" />
                                    <span>{vendor.phone_number}</span>
                                </div>
                            )}
                            {vendor.user?.email && (
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Mail className="w-5 h-5" />
                                    <span>{vendor.user.email}</span>
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        {vendor.description && (
                            <p className="text-gray-700 leading-relaxed">
                                {vendor.description}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Services Offered</h2>

                {services.length === 0 ? (
                    <div className="text-center py-8 text-gray-600">
                        <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p>No services listed yet</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {services.map((service) => (
                            <div
                                key={service.id}
                                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <Package className="w-6 h-6 text-blue-600" />
                                    </div>
                                </div>

                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {service.name}
                                </h3>

                                {service.description && (
                                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                        {service.description}
                                    </p>
                                )}

                                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                    <div>
                                        <p className="text-sm text-gray-600">Price</p>
                                        <p className="text-xl font-bold text-gray-900">
                                            KES {service.price?.toLocaleString() || '0'}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleBookService(service)}
                                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>

                {reviews.length === 0 ? (
                    <div className="text-center py-8 text-gray-600">
                        <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p>No reviews yet</p>
                        <p className="text-sm text-gray-500 mt-1">Be the first to review this vendor</p>
                    </div>
                ) : (
                    <ReviewList reviews={reviews} />
                )}
            </div>

            {/* Booking Modal */}
            {showBookingModal && (
                <BookingModal
                    vendor={vendor}
                    service={selectedService}
                    onClose={() => {
                        setShowBookingModal(false);
                        setSelectedService(null);
                    }}
                />
            )}
        </div>
    );
}

// Booking Modal Component
function BookingModal({ vendor, service, onClose }) {
    const [formData, setFormData] = useState({
        event_date: '',
        notes: '',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await bookingsAPI.createBooking({
                vendor: vendor.id,
                service: service.id,
                event_date: formData.event_date,
                notes: formData.notes,
                total_price: service.price,
            });
            setSuccess(true);
            setTimeout(() => {
                onClose();
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to create booking. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Booking Request Sent!
                    </h3>
                    <p className="text-gray-600">
                        The vendor will review your request and get back to you soon.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Book Service</h3>

                {/* Service Summary */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-600">Vendor</p>
                    <p className="font-semibold text-gray-900 mb-3">{vendor.business_name}</p>

                    <p className="text-sm text-gray-600">Service</p>
                    <p className="font-semibold text-gray-900 mb-3">{service.name}</p>

                    <p className="text-sm text-gray-600">Price</p>
                    <p className="text-xl font-bold text-gray-900">
                        KES {service.price?.toLocaleString()}
                    </p>
                </div>

                {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-800">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Event Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Event Date <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            required
                            min={new Date().toISOString().split('T')[0]}
                            value={formData.event_date}
                            onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Additional Notes (Optional)
                        </label>
                        <textarea
                            rows="4"
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                            placeholder="Any special requirements or questions..."
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                'Send Booking Request'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
