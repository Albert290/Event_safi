import StarRating from './StarRating';
import { User } from 'lucide-react';

export default function ReviewCard({ review }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    {/* User Avatar */}
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-white" />
                    </div>

                    <div>
                        <p className="font-semibold text-gray-900">
                            {review.user?.name || 'Anonymous User'}
                        </p>
                        <p className="text-sm text-gray-500">
                            {formatDate(review.created_at)}
                        </p>
                    </div>
                </div>

                {/* Rating */}
                <StarRating rating={review.rating} readonly size="sm" />
            </div>

            {/* Review Text */}
            <p className="text-gray-700 mb-4 whitespace-pre-wrap">{review.text}</p>

            {/* Review Image */}
            {review.image && (
                <div className="mb-4">
                    <img
                        src={review.image}
                        alt="Review"
                        className="w-full max-w-md h-48 object-cover rounded-lg border border-gray-200"
                    />
                </div>
            )}

            {/* Service Info */}
            {review.service && (
                <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                        Service: <span className="font-medium text-gray-900">{review.service.name}</span>
                    </p>
                </div>
            )}
        </div>
    );
}
