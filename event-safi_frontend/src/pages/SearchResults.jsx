import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Loader2, Calendar, MapPin, Star, Users, Package, X } from 'lucide-react';
import api from '../api/client';

function SearchResults() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [activeTab, setActiveTab] = useState('all');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState({
        events: [],
        vendors: [],
        services: [],
        counts: { events: 0, vendors: 0, services: 0, total: 0 }
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (query) {
            performSearch();
        }
    }, [query]);

    const performSearch = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get(`/search/`, {
                params: { q: query, type: activeTab }
            });
            setResults(response.data);
        } catch (err) {
            console.error('Search error:', err);
            setError('Failed to perform search. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const EventCard = ({ event }) => (
        <Link
            to={`/events/${event.id}`}
            className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200"
        >
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1">{event.title}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{event.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(event.date)}
                        </span>
                        <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {event.location}
                        </span>
                        {event.event_type && (
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                                {event.event_type.name}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );

    const VendorCard = ({ vendor }) => (
        <Link
            to={`/vendors/${vendor.id}`}
            className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200"
        >
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                    {vendor.profile_picture ? (
                        <img
                            src={vendor.profile_picture}
                            alt={vendor.business_name}
                            className="w-16 h-16 rounded-lg object-cover"
                        />
                    ) : (
                        <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Users className="w-8 h-8 text-purple-600" />
                        </div>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1">{vendor.business_name}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{vendor.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            {parseFloat(vendor.rating).toFixed(1)}
                        </span>
                        {vendor.address && (
                            <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {vendor.address}
                            </span>
                        )}
                        {vendor.is_verified && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                                Verified
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );

    const ServiceCard = ({ service }) => (
        <div className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200">
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1">{service.name}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{service.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            {parseFloat(service.rating).toFixed(1)}
                        </span>
                        {service.price_range && (
                            <span className="font-medium text-green-600">
                                {service.price_range}
                            </span>
                        )}
                        {service.category && (
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full">
                                {service.category.name}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    if (!query) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
                <Search className="w-16 h-16 text-gray-400 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Search Event-Safi</h2>
                <p className="text-gray-600 text-center max-w-md">
                    Use the search bar above to find events, vendors, and services
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            {/* Search Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Search Results for "{query}"
                </h1>
                {!loading && (
                    <p className="text-gray-600">
                        Found {results.counts.total} result{results.counts.total !== 1 ? 's' : ''}
                    </p>
                )}
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                <button
                    onClick={() => setActiveTab('all')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${activeTab === 'all'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    All ({results.counts.total})
                </button>
                <button
                    onClick={() => setActiveTab('events')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${activeTab === 'events'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    Events ({results.counts.events})
                </button>
                <button
                    onClick={() => setActiveTab('vendors')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${activeTab === 'vendors'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    Vendors ({results.counts.vendors})
                </button>
                <button
                    onClick={() => setActiveTab('services')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${activeTab === 'services'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    Services ({results.counts.services})
                </button>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                    <span className="ml-2 text-gray-600">Searching...</span>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-2 text-red-800">
                        <X className="w-5 h-5" />
                        <span>{error}</span>
                    </div>
                </div>
            )}

            {/* Results */}
            {!loading && !error && (
                <>
                    {/* Events Section */}
                    {(activeTab === 'all' || activeTab === 'events') && results.events.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                Events {activeTab === 'all' && `(${results.counts.events})`}
                            </h2>
                            <div className="grid gap-4">
                                {results.events.map(event => (
                                    <EventCard key={event.id} event={event} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Vendors Section */}
                    {(activeTab === 'all' || activeTab === 'vendors') && results.vendors.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                Vendors {activeTab === 'all' && `(${results.counts.vendors})`}
                            </h2>
                            <div className="grid gap-4">
                                {results.vendors.map(vendor => (
                                    <VendorCard key={vendor.id} vendor={vendor} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Services Section */}
                    {(activeTab === 'all' || activeTab === 'services') && results.services.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                Services {activeTab === 'all' && `(${results.counts.services})`}
                            </h2>
                            <div className="grid gap-4">
                                {results.services.map(service => (
                                    <ServiceCard key={service.id} service={service} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* No Results */}
                    {results.counts.total === 0 && (
                        <div className="flex flex-col items-center justify-center py-12">
                            <Search className="w-16 h-16 text-gray-400 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
                            <p className="text-gray-600 text-center max-w-md">
                                We couldn't find any events, vendors, or services matching "{query}".
                                Try using different keywords.
                            </p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default SearchResults;
