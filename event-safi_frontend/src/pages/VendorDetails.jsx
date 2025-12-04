import { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import { vendorsAPI } from '../api/vendors';
import { reviewsAPI } from '../api/reviews';
import { bookingsAPI } from '../api/bookings';
import { eventsAPI } from '../api/events';
import ReviewList from '../components/reviews/ReviewList';
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
    MessageSquare,
    User,
    Globe,
    Facebook,
    Instagram,
    Twitter,
    Linkedin,
    X as CloseIcon,
    Image as ImageIcon
} from 'lucide-react';

export default function VendorDetails() {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const eventId = searchParams.get('event_id');
    const navigate = useNavigate();

    const [vendor, setVendor] = useState(null);
    const [event, setEvent] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [showGalleryModal, setShowGalleryModal] = useState(false);
    const [selectedGalleryImage, setSelectedGalleryImage] = useState(null);

    useEffect(() => {
        fetchVendorData();
        if (eventId) {
            fetchEventData();
        }
    }, [id, eventId]);

    const fetchEventData = async () => {
        try {
            const eventData = await eventsAPI.getEvent(eventId);
            setEvent(eventData);
        } catch (err) {
            console.error('Error fetching event:', err);
        }
    };

    const fetchVendorData = async () => {
        setLoading(true);
        setError('');
        try {
            const [vendorData, reviewsData] = await Promise.all([
                vendorsAPI.getVendor(id),
                reviewsAPI.getReviews().then(data =>
                    Array.isArray(data) ? data.filter(r => r.vendor === id) : []
                ).catch(() => [])
            ]);

            setVendor(vendorData);
            setReviews(reviewsData);
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
        <div className="max-w-6xl mx-auto p-6">
            {/* Back Button */}
            <Link
                to={eventId ? `/events/${eventId}` : "/vendors"}
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                {eventId ? 'Back to Event' : 'Back to Vendors'}
            </Link>

            {/* Event Context Banner */}
            {event && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <div>
                            <p className="text-sm text-blue-600 font-medium">Booking for:</p>
                            <p className="text-lg font-semibold text-blue-900">{event.title}</p>
                            <p className="text-sm text-blue-700">
                                {new Date(event.date).toLocaleDateString()} • {event.location}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Cover Photo Hero Section */}
            {vendor.cover_photo && (
                <div className="relative h-64 md:h-80 rounded-lg overflow-hidden mb-6 shadow-lg">
                    <img
                        src={vendor.cover_photo}
                        alt={`${vendor.business_name} cover`}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h1 className="text-4xl font-bold mb-2">{vendor.business_name}</h1>
                        {vendor.categories && vendor.categories.length > 0 && (
                            <p className="text-lg">{vendor.categories.join(', ')}</p>
                        )}
                    </div>
                </div>
            )}

            {/* Vendor Header */}
            <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Vendor Avatar */}
                    <div className="w-32 h-32 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex-shrink-0 flex items-center justify-center text-white text-4xl font-bold">
                        {vendor.business_name?.charAt(0) || 'V'}
                    </div>

                    {/* Vendor Info */}
                    <div className="flex-1">
                        <div className="flex items-start justify-between gap-4 mb-4">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    {vendor.business_name}
                                </h1>
                                {vendor.categories && vendor.categories.length > 0 && (
                                    <p className="text-lg text-gray-600">{vendor.categories.join(', ')}</p>
                                )}
                                {vendor.is_verified && (
                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mt-2">
                                        <CheckCircle className="w-4 h-4" />
                                        Verified Vendor
                                    </span>
                                )}
                            </div>

                            {/* Rating */}
                            {vendor.rating > 0 && (
                                <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-lg">
                                    <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {parseFloat(vendor.rating).toFixed(1)}
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
                            {vendor.address && (
                                <div className="flex items-center gap-2 text-gray-600">
                                    <MapPin className="w-5 h-5" />
                                    <span>{vendor.address}</span>
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

            {/* Social Media Links */}
            {(vendor.facebook_url || vendor.instagram_url || vendor.twitter_url || vendor.linkedin_url || vendor.website_url) && (
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Connect With Us</h2>
                    <div className="flex flex-wrap gap-3">
                        {vendor.facebook_url && (
                            <a
                                href={vendor.facebook_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                <Facebook className="w-5 h-5" />
                                Facebook
                            </a>
                        )}
                        {vendor.instagram_url && (
                            <a
                                href={vendor.instagram_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition"
                            >
                                <Instagram className="w-5 h-5" />
                                Instagram
                            </a>
                        )}
                        {vendor.twitter_url && (
                            <a
                                href={vendor.twitter_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                            >
                                <Twitter className="w-5 h-5" />
                                Twitter/X
                            </a>
                        )}
                        {vendor.linkedin_url && (
                            <a
                                href={vendor.linkedin_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition"
                            >
                                <Linkedin className="w-5 h-5" />
                                LinkedIn
                            </a>
                        )}
                        {vendor.website_url && (
                            <a
                                href={vendor.website_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
                            >
                                <Globe className="w-5 h-5" />
                                Website
                            </a>
                        )}
                    </div>
                </div>
            )}

            {/* Photo Gallery */}
            {vendor.gallery && vendor.gallery.length > 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Photo Gallery</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {vendor.gallery.map((photo) => (
                            <div
                                key={photo.id}
                                className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square"
                                onClick={() => {
                                    setSelectedGalleryImage(photo);
                                    setShowGalleryModal(true);
                                }}
                            >
                                <img
                                    src={photo.image}
                                    alt={photo.caption || 'Portfolio image'}
                                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                                    <ImageIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                {photo.caption && (
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                        {photo.caption}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Services Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Services Offered</h2>

                {!vendor.services || vendor.services.length === 0 ? (
                    <div className="text-center py-8 text-gray-600">
                        <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p>No services listed yet</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {vendor.services.map((service) => (
                            <div
                                key={service.id}
                                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                                        <Package className="w-6 h-6 text-amber-600" />
                                    </div>
                                    {service.category_name && (
                                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                            {service.category_name}
                                        </span>
                                    )}
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
                                        <p className="text-sm text-gray-600">Price Range</p>
                                        <p className="text-lg font-bold text-gray-900">
                                            {service.price_range || 'Contact for pricing'}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleBookService(service)}
                                        className="px-4 py-2 bg-amber-600 text-white text-sm rounded-lg hover:bg-amber-700 transition-colors"
                                    >
                                        {eventId ? 'Book for Event' : 'Book Now'}
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
                    event={event}
                    eventId={eventId}
                    onClose={() => {
                        setShowBookingModal(false);
                        setSelectedService(null);
                    }}
                    onSuccess={() => {
                        setShowBookingModal(false);
                        setSelectedService(null);
                        if (eventId) {
                            navigate(`/events/${eventId}`);
                        }
                    }}
                />
            )}

            {/* Gallery Modal */}
            {showGalleryModal && selectedGalleryImage && (
                <div
                    className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
                    onClick={() => setShowGalleryModal(false)}
                >
                    <button
                        onClick={() => setShowGalleryModal(false)}
                        className="absolute top-4 right-4 text-white hover:text-gray-300 transition"
                    >
                        <CloseIcon className="w-8 h-8" />
                    </button>
                    <div
                        className="max-w-4xl max-h-[90vh] overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={selectedGalleryImage.image}
                            alt={selectedGalleryImage.caption || 'Full size image'}
                            className="w-full h-full object-contain"
                        />
                        {selectedGalleryImage.caption && (
                            <div className="bg-white p-4 text-center">
                                <p className="text-gray-900">{selectedGalleryImage.caption}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

// Booking Modal Component
function BookingModal({ vendor, service, event, eventId, onClose, onSuccess }) {
    const [formData, setFormData] = useState({
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
            const bookingData = {
                event_id: eventId,
                service_id: service.id,
                notes: formData.notes,
            };

            await bookingsAPI.createBooking(bookingData);
            setSuccess(true);
            setTimeout(() => {
                onSuccess();
            }, 2000);
        } catch (err) {
            console.error('Booking error:', err);
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
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-600">Vendor</p>
                            <p className="font-semibold text-gray-900">{vendor.business_name}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Service</p>
                            <p className="font-semibold text-gray-900">{service.name}</p>
                        </div>
                        {event && (
                            <>
                                <div>
                                    <p className="text-sm text-gray-600">Event</p>
                                    <p className="font-semibold text-gray-900">{event.title}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Date</p>
                                    <p className="font-semibold text-gray-900">
                                        {new Date(event.date).toLocaleDateString()}
                                    </p>
                                </div>
                            </>
                        )}
                        <div className="col-span-2">
                            <p className="text-sm text-gray-600">Price Range</p>
                            <p className="text-xl font-bold text-gray-900">
                                {service.price_range || 'Contact for pricing'}
                            </p>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-800">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Notes */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Additional Notes (Optional)
                        </label>
                        <textarea
                            rows="4"
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none resize-none"
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
                            disabled={loading || !eventId}
                            className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

                    {!eventId && (
                        <p className="text-sm text-amber-600 text-center">
                            Please select an event first to make a booking
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}
