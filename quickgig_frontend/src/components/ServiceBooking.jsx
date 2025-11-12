import { useState, useEffect } from "react";
import { Star, MapPin, DollarSign, User, CheckCircle, AlertCircle, Phone, Mail, Award, X, ArrowLeft } from "lucide-react";
import { getServices, getServiceCategories, getVendors } from "../services/serviceService";
import { bookService } from "../services/bookingService";

export default function ServiceBooking() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Booking form data
  const [bookingData, setBookingData] = useState({
    customer_budget: '',
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    event_type: '',
    event_date: '',
    event_location: '',
    guest_count: '',
    notes: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      // Load public data (services, categories, vendors)
      const [servicesRes, categoriesRes, vendorsRes] = await Promise.all([
        getServices(),
        getServiceCategories(),
        getVendors()
      ]);

      console.log('Services response:', servicesRes.data);
      console.log('Categories response:', categoriesRes.data);
      console.log('Vendors response:', vendorsRes.data);

      setServices(servicesRes.data.results || servicesRes.data);
      setCategories(categoriesRes.data.results || categoriesRes.data);
      setVendors(vendorsRes.data.results || vendorsRes.data);

    } catch (error) {
      console.error('Error loading data:', error);
      setMessage({ type: 'error', text: 'Failed to load services. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const filteredServices = selectedCategory === 'all'
    ? services
    : services.filter(service => service.category === selectedCategory);

  const getVendorInfo = (vendorId) => {
    return vendors.find(vendor => vendor.id === vendorId);
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown';
  };

  const handleBookService = async () => {
    try {
      setBookingLoading(true);

      // Check if user is authenticated
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage({
          type: 'error',
          text: 'Please log in to book services. You need an account to make bookings. Click here to login or register.'
        });
        return;
      }

      // Validate required fields
      if (!bookingData.customer_name || !bookingData.customer_phone || !bookingData.customer_email) {
        setMessage({ type: 'error', text: 'Please fill in all required fields (Name, Phone, Email)' });
        return;
      }

      console.log('Sending booking data:', {
        service_id: selectedService.id,
        ...bookingData
      });

      const response = await bookService(selectedService.id, bookingData);
      console.log('Booking response:', response);

      setMessage({
        type: 'success',
        text: 'Booking request sent successfully! Our admin team will contact you within 24 hours to confirm details and connect you with the vendor.'
      });

      // Reset form
      setSelectedService(null);
      setShowBookingForm(false);
      setBookingData({
        customer_budget: '',
        customer_name: '',
        customer_phone: '',
        customer_email: '',
        event_type: '',
        event_date: '',
        event_location: '',
        guest_count: '',
        notes: ''
      });
    } catch (error) {
      console.error('Booking error:', error);
      console.error('Error response:', error.response);

      let errorMsg = 'Failed to send booking request. Please try again.';

      if (error.response?.data?.error) {
        errorMsg = error.response.data.error;
      } else if (error.response?.data?.detail) {
        errorMsg = error.response.data.detail;
      } else if (error.response?.status === 401) {
        errorMsg = 'Please log in to book services.';
      } else if (error.response?.status === 403) {
        errorMsg = 'You do not have permission to book services.';
      }

      setMessage({ type: 'error', text: errorMsg });
    } finally {
      setBookingLoading(false);
    }
  };

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setShowBookingForm(false);
  };

  const handleProceedToBooking = () => {
    setShowBookingForm(true);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
    setShowBookingForm(false);
  };

  const handleInputChange = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Book Event Services</h1>
          <p className="text-xl text-gray-600">Browse our professional services and book directly - our admin team will handle the rest!</p>

          {/* Login prompt for unauthenticated users */}
          {!localStorage.getItem('token') && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-blue-800 mb-3">
                <strong>Ready to book?</strong> You'll need an account to make bookings.
              </p>
              <div className="flex gap-3 justify-center">
                <a
                  href="/login"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                >
                  Create Account
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <div className="flex items-center">
              {message.type === 'success' ? <CheckCircle className="w-5 h-5 mr-2" /> : <AlertCircle className="w-5 h-5 mr-2" />}
              {message.text}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
            >
              All Services
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category.id ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const vendor = getVendorInfo(service.vendor);
            return (
              <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {vendor?.profile_picture && (
                  <img
                    src={vendor.profile_picture}
                    alt={service.name}
                    className="w-full h-48 object-cover"
                  />
                )}

                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">{service.rating}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-3">{getCategoryName(service.category)}</p>

                  {service.description && (
                    <p className="text-gray-700 text-sm mb-4 line-clamp-2">{service.description}</p>
                  )}

                  {vendor && (
                    <div className="flex items-center mb-4">
                      <User className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{vendor.business_name}</span>
                      {vendor.is_verified && (
                        <CheckCircle className="w-4 h-4 text-green-500 ml-2" />
                      )}
                    </div>
                  )}

                  {service.price_range && (
                    <div className="flex items-center mb-4">
                      <DollarSign className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{service.price_range}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${service.availability_status ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className="text-sm text-gray-600">
                        {service.availability_status ? 'Available' : 'Unavailable'}
                      </span>
                    </div>

                    <button
                      onClick={() => handleServiceClick(service)}
                      disabled={!service.availability_status}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${service.availability_status
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredServices.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No services found in this category.</p>
          </div>
        )}
      </div>

      {/* Service Details and Booking Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {!showBookingForm ? (
              /* Service Details View */
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Service Details</h2>
                  <button onClick={handleCloseModal} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X size={24} className="text-gray-500" />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Service Info */}
                  <div>
                    {getVendorInfo(selectedService.vendor)?.profile_picture && (
                      <img
                        src={getVendorInfo(selectedService.vendor).profile_picture}
                        alt={selectedService.name}
                        className="w-full h-64 object-cover rounded-lg mb-6"
                      />
                    )}

                    <div className="mb-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-semibold text-gray-900">{selectedService.name}</h3>
                        <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="text-sm font-medium text-yellow-700">{selectedService.rating}</span>
                        </div>
                      </div>

                      <div className="flex items-center mb-3">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {getCategoryName(selectedService.category)}
                        </span>
                      </div>

                      {selectedService.price_range && (
                        <div className="flex items-center mb-4">
                          <DollarSign className="w-5 h-5 text-gray-400 mr-2" />
                          <span className="text-lg font-semibold text-gray-900">{selectedService.price_range}</span>
                        </div>
                      )}
                    </div>

                    {selectedService.description && (
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">About This Service</h4>
                        <p className="text-gray-700 leading-relaxed">{selectedService.description}</p>
                      </div>
                    )}
                  </div>

                  {/* Vendor Info */}
                  <div>
                    {(() => {
                      const vendor = getVendorInfo(selectedService.vendor);
                      return vendor ? (
                        <div className="bg-gray-50 rounded-lg p-6">
                          <h4 className="text-lg font-semibold text-gray-900 mb-4">Vendor Information</h4>

                          <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                              <User className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h5 className="font-semibold text-gray-900">{vendor.business_name}</h5>
                              {vendor.is_verified && (
                                <div className="flex items-center">
                                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                                  <span className="text-sm text-green-600 font-medium">Verified Vendor</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="space-y-3 mb-6">
                            {vendor.phone && (
                              <div className="flex items-center">
                                <Phone className="w-4 h-4 text-gray-400 mr-3" />
                                <span className="text-gray-700">{vendor.phone}</span>
                              </div>
                            )}
                            {vendor.email && (
                              <div className="flex items-center">
                                <Mail className="w-4 h-4 text-gray-400 mr-3" />
                                <span className="text-gray-700">{vendor.email}</span>
                              </div>
                            )}
                            {vendor.location && (
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 text-gray-400 mr-3" />
                                <span className="text-gray-700">{vendor.location}</span>
                              </div>
                            )}
                          </div>

                          {vendor.description && (
                            <div className="mb-6">
                              <h6 className="font-medium text-gray-900 mb-2">About the Business</h6>
                              <p className="text-sm text-gray-600 leading-relaxed">{vendor.description}</p>
                            </div>
                          )}

                          {vendor.years_of_experience && (
                            <div className="flex items-center bg-blue-50 px-3 py-2 rounded-lg">
                              <Award className="w-4 h-4 text-blue-600 mr-2" />
                              <span className="text-sm text-blue-800 font-medium">
                                {vendor.years_of_experience} years of experience
                              </span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="bg-gray-50 rounded-lg p-6">
                          <p className="text-gray-500">Vendor information not available</p>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                <div className="flex gap-4 mt-8 pt-6 border-t">
                  <button
                    onClick={handleCloseModal}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleProceedToBooking}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Book This Service
                  </button>
                </div>
              </div>
            ) : (
              /* Booking Form */
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <button onClick={() => setShowBookingForm(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-3">
                    <ArrowLeft size={20} className="text-gray-500" />
                  </button>
                  <h3 className="text-xl font-semibold">Book {selectedService.name}</h3>
                  <button onClick={handleCloseModal} className="ml-auto p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X size={24} className="text-gray-500" />
                  </button>
                </div>

                {/* Service Summary */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{selectedService.name}</h4>
                      <p className="text-sm text-gray-600">{getCategoryName(selectedService.category)} • {getVendorInfo(selectedService.vendor)?.business_name}</p>
                    </div>
                    {selectedService.price_range && (
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{selectedService.price_range}</p>
                        <p className="text-xs text-gray-500">Price Range</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Booking Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h5 className="font-medium text-gray-900">Your Information</h5>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        value={bookingData.customer_name}
                        onChange={(e) => handleInputChange('customer_name', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        value={bookingData.customer_phone}
                        onChange={(e) => handleInputChange('customer_phone', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        value={bookingData.customer_email}
                        onChange={(e) => handleInputChange('customer_email', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Your Budget (KSh)</label>
                      <input
                        type="number"
                        value={bookingData.customer_budget}
                        onChange={(e) => handleInputChange('customer_budget', e.target.value)}
                        placeholder="Enter your budget..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500 mt-1">Optional - helps us match you with the right vendor</p>
                    </div>
                  </div>

                  {/* Event Information */}
                  <div className="space-y-4">
                    <h5 className="font-medium text-gray-900">Event Details</h5>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                      <select
                        value={bookingData.event_type}
                        onChange={(e) => handleInputChange('event_type', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select event type...</option>
                        <option value="Wedding">Wedding</option>
                        <option value="Birthday Party">Birthday Party</option>
                        <option value="Corporate Event">Corporate Event</option>
                        <option value="Harambee">Harambee</option>
                        <option value="Graduation Party">Graduation Party</option>
                        <option value="Baby Shower">Baby Shower</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
                      <input
                        type="date"
                        value={bookingData.event_date}
                        onChange={(e) => handleInputChange('event_date', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Event Location</label>
                      <input
                        type="text"
                        value={bookingData.event_location}
                        onChange={(e) => handleInputChange('event_location', e.target.value)}
                        placeholder="City, venue, or area..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expected Guests</label>
                      <input
                        type="number"
                        value={bookingData.guest_count}
                        onChange={(e) => handleInputChange('guest_count', e.target.value)}
                        placeholder="Number of guests..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                  <textarea
                    value={bookingData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Any specific requirements or questions..."
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* What Happens Next */}
                <div className="bg-blue-50 rounded-lg p-4 mt-6">
                  <h5 className="font-medium text-blue-900 mb-2">What happens next?</h5>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Your booking request will be sent to our admin team</li>
                    <li>• Admin will contact you within 24 hours to confirm details</li>
                    <li>• We'll connect you directly with the vendor</li>
                    <li>• You can finalize pricing and arrangements with the vendor</li>
                    <li>• Payment is handled directly with the vendor</li>
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-8">
                  <button
                    onClick={() => setShowBookingForm(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Back to Details
                  </button>
                  <button
                    onClick={handleBookService}
                    disabled={bookingLoading || !bookingData.customer_name || !bookingData.customer_phone || !bookingData.customer_email}
                    className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
                  >
                    {bookingLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending Request...
                      </div>
                    ) : (
                      'Send Booking Request'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}