import { Link } from 'react-router-dom';
import { Star, MapPin, DollarSign, ExternalLink } from 'lucide-react';

export default function VendorRecommendation({ vendor }) {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                    {/* Vendor Name */}
                    <h4 className="font-semibold text-gray-900 mb-1">
                        {vendor.business_name}
                    </h4>

                    {/* Service Name */}
                    <p className="text-sm text-gray-600 mb-2">{vendor.service_name}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-medium text-gray-700">
                            {vendor.rating}
                        </span>
                    </div>

                    {/* Price Range */}
                    {vendor.price_range && (
                        <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                            <DollarSign className="w-4 h-4" />
                            <span>{vendor.price_range}</span>
                        </div>
                    )}

                    {/* View Details Button */}
                    <Link
                        to={`/vendors/${vendor.vendor_id}`}
                        className="inline-flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700 font-medium mt-2"
                    >
                        View Details
                        <ExternalLink className="w-3 h-3" />
                    </Link>
                </div>

                {/* Action Button */}
                <Link
                    to={`/vendors/${vendor.vendor_id}`}
                    className="px-3 py-1.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors whitespace-nowrap"
                >
                    Book Now
                </Link>
            </div>
        </div>
    );
}
