import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useVendorsStore } from '../stores/useVendorsStore';
import { vendorsAPI } from '../api/vendors';
import { eventsAPI } from '../api/events';
import { Search, Filter, Loader2, Star, MapPin, X, CheckCircle2, Calendar, ArrowLeft } from 'lucide-react';

function Vendors() {
    const { vendors, setVendors, categories, setCategories, loading, setLoading } = useVendorsStore();
    const [searchParams] = useSearchParams();
    const eventId = searchParams.get('event_id');
    const [event, setEvent] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [minRating, setMinRating] = useState(0);
    const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        fetchData();
        if (eventId) {
            fetchEventData();
        }
    }, [eventId]);

    const fetchEventData = async () => {
        try {
            const eventData = await eventsAPI.getEvent(eventId);
            setEvent(eventData);
        } catch (err) {
            console.error('Error fetching event:', err);
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const [vendorsData, categoriesData] = await Promise.all([
                vendorsAPI.getVendors(),
                vendorsAPI.getCategories(),
            ]);

            const vendorsArray = Array.isArray(vendorsData) ? vendorsData : (vendorsData?.results || []);
            const categoriesArray = Array.isArray(categoriesData) ? categoriesData : (categoriesData?.results || []);

            setVendors(vendorsArray);
            setCategories(categoriesArray);
        } catch (err) {
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    // Filter vendors
    const filteredVendors = vendors.filter(vendor => {
        // Search filter
        const matchesSearch = !searchTerm ||
            vendor.business_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vendor.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vendor.address?.toLowerCase().includes(searchTerm.toLowerCase());

        // Category filter - API returns category names, but dropdown uses IDs
        const selectedCategoryName = selectedCategory ?
            categories.find(cat => String(cat.id) === String(selectedCategory))?.name : null;
        const matchesCategory = !selectedCategory ||
            (vendor.categories && selectedCategoryName && vendor.categories.includes(selectedCategoryName));

        // Rating filter
        const matchesRating = parseFloat(vendor.rating) >= minRating;

        // Verified filter
        const matchesVerified = !showVerifiedOnly || vendor.is_verified === true;

        return matchesSearch && matchesCategory && matchesRating && matchesVerified;
    });

    // Count active filters
    const activeFilterCount = (searchTerm ? 1 : 0) +
        (selectedCategory ? 1 : 0) +
        (minRating > 0 ? 1 : 0) +
        (showVerifiedOnly ? 1 : 0);

    // Get selected category name
    const getSelectedCategoryName = () => {
        const category = categories.find(cat => String(cat.id) === String(selectedCategory));
        return category?.name || '';
    };

    // Clear all filters
    const clearAllFilters = () => {
        setSearchTerm('');
        setSelectedCategory('');
        setMinRating(0);
        setShowVerifiedOnly(false);
    };

    // Remove individual filter
    const removeFilter = (filterType) => {
        switch (filterType) {
            case 'search':
                setSearchTerm('');
                break;
            case 'category':
                setSelectedCategory('');
                break;
            case 'rating':
                setMinRating(0);
                break;
            case 'verified':
                setShowVerifiedOnly(false);
                break;
        }
    };

    const VendorCard = ({ vendor }) => (
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex-shrink-0 flex items-center justify-center text-white text-2xl font-bold">
                    {vendor.business_name?.charAt(0) || 'V'}
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                            {vendor.business_name}
                        </h3>
                        {parseFloat(vendor.rating) > 0 && (
                            <div className="flex items-center gap-1 flex-shrink-0">
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                <span className="text-sm font-medium text-gray-700">
                                    {parseFloat(vendor.rating).toFixed(1)}
                                </span>
                            </div>
                        )}
                    </div>

                    {vendor.categories && vendor.categories.length > 0 && (
                        <p className="text-sm text-gray-600 mb-2">{vendor.categories.join(', ')}</p>
                    )}

                    {vendor.description && (
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {vendor.description}
                        </p>
                    )}

                    <div className="flex items-center gap-2 mb-3">
                        {vendor.address && (
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                                <MapPin className="w-4 h-4" />
                                <span>{vendor.address}</span>
                            </div>
                        )}
                        {vendor.is_verified && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                <CheckCircle2 className="w-3 h-3" />
                                Verified
                            </span>
                        )}
                    </div>

                    <div className="flex gap-2">
                        <Link
                            to={`/vendors/${vendor.id}${eventId ? `?event_id=${eventId}` : ''}`}
                            className="flex-1 px-3 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm text-center rounded-lg hover:shadow-lg hover:shadow-amber-500/30 transition-all"
                        >
                            {eventId ? 'Book This Vendor' : 'View Profile'}
                        </Link>
                        <button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                            Contact
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div>
            {/* Event Context Banner */}
            {event && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-blue-600" />
                            <div>
                                <p className="text-sm text-blue-600 font-medium">Booking vendors for:</p>
                                <p className="text-lg font-semibold text-blue-900">{event.title}</p>
                                <p className="text-sm text-blue-700">
                                    {new Date(event.date).toLocaleDateString()} • {event.location}
                                </p>
                            </div>
                        </div>
                        <Link
                            to={`/events/${eventId}`}
                            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Event
                        </Link>
                    </div>
                </div>
            )}

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {event ? 'Choose Vendors for Your Event' : 'Vendors Directory'}
                </h1>
                <p className="text-gray-600">
                    {event 
                        ? 'Browse and book professional vendors for your event.'
                        : 'Discover and connect with event professionals.'
                    }
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Mobile Filter Toggle */}
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center justify-between gap-2 px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
                >
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-gray-700" />
                        <span className="font-medium text-gray-900">Filters</span>
                    </div>
                    {activeFilterCount > 0 && (
                        <span className="px-2 py-0.5 bg-amber-500 text-white text-xs font-medium rounded-full">
                            {activeFilterCount}
                        </span>
                    )}
                </button>

                {/* Filters Sidebar */}
                <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:w-64 flex-shrink-0`}>
                    <div className="bg-white rounded-lg border border-gray-200 p-6 lg:sticky lg:top-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Filter className="w-5 h-5 text-gray-700" />
                                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                            </div>
                            {activeFilterCount > 0 && (
                                <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded-full">
                                    {activeFilterCount}
                                </span>
                            )}
                        </div>

                        {/* Search */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Search
                            </label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search vendors..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-sm"
                                />
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-sm"
                            >
                                <option value="">All Categories</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Rating Filter */}
                        <div className="mb-4 pb-4 border-b border-gray-200">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Minimum Rating
                            </label>
                            <div className="space-y-2">
                                {[0, 3, 4, 4.5].map((rating) => (
                                    <label key={rating} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="rating"
                                            checked={minRating === rating}
                                            onChange={() => setMinRating(rating)}
                                            className="w-4 h-4 text-blue-600"
                                        />
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                            <span className="text-sm text-gray-700">
                                                {rating === 0 ? 'All' : `${rating}+ Stars`}
                                            </span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Verified Only Filter */}
                        <div className="mb-4 pb-4 border-b border-gray-200">
                            <label className="flex items-center justify-between cursor-pointer group">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                                    <span className="text-sm font-medium text-gray-700">Verified Only</span>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={showVerifiedOnly}
                                    onChange={(e) => setShowVerifiedOnly(e.target.checked)}
                                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                />
                            </label>
                        </div>

                        {/* Clear Filters */}
                        {activeFilterCount > 0 && (
                            <button
                                onClick={clearAllFilters}
                                className="w-full px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Clear All Filters
                            </button>
                        )}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    {/* Active Filters Badges */}
                    {activeFilterCount > 0 && (
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-medium text-gray-900">Active Filters</h3>
                                <button
                                    onClick={clearAllFilters}
                                    className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Clear All
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {searchTerm && (
                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-500 text-white rounded-full text-sm">
                                        Search: {searchTerm}
                                        <button
                                            onClick={() => removeFilter('search')}
                                            className="hover:bg-white/20 rounded-full p-0.5"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )}
                                {selectedCategory && (
                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-500 text-white rounded-full text-sm">
                                        Category: {getSelectedCategoryName()}
                                        <button
                                            onClick={() => removeFilter('category')}
                                            className="hover:bg-white/20 rounded-full p-0.5"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )}
                                {minRating > 0 && (
                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-500 text-white rounded-full text-sm">
                                        Rating: {minRating}+ Stars
                                        <button
                                            onClick={() => removeFilter('rating')}
                                            className="hover:bg-white/20 rounded-full p-0.5"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )}
                                {showVerifiedOnly && (
                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-500 text-white rounded-full text-sm">
                                        Verified Only
                                        <button
                                            onClick={() => removeFilter('verified')}
                                            className="hover:bg-white/20 rounded-full p-0.5"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Results Count */}
                    <div className="mb-4">
                        <p className="text-sm text-gray-600">
                            {loading ? 'Loading...' : `Found ${filteredVendors.length} vendor${filteredVendors.length !== 1 ? 's' : ''}`}
                        </p>
                    </div>

                    {/* Vendors List */}
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                        </div>
                    ) : filteredVendors.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                            <p className="text-gray-600 mb-2">No vendors found</p>
                            {activeFilterCount > 0 && (
                                <button
                                    onClick={clearAllFilters}
                                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                >
                                    Clear filters to see all vendors
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredVendors.map((vendor) => (
                                <VendorCard key={vendor.id} vendor={vendor} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Vendors;