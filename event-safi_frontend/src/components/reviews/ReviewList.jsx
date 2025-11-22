import { useState, useEffect } from 'react';
import { reviewsAPI } from '../../api/reviews';
import ReviewCard from './ReviewCard';
import { Loader2, Star } from 'lucide-react';

export default function ReviewList({ reviews: reviewsProp, vendorId, limit = null }) {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (reviewsProp !== undefined) {
            // Ensure reviewsProp is an array
            let reviewsArray = [];
            if (Array.isArray(reviewsProp)) {
                reviewsArray = reviewsProp;
            } else if (reviewsProp && Array.isArray(reviewsProp.results)) {
                reviewsArray = reviewsProp.results;
            } else if (reviewsProp && typeof reviewsProp === 'object') {
                console.warn('Unexpected reviews prop format:', reviewsProp);
                reviewsArray = [];
            }

            const reviewsToShow = limit && reviewsArray.length > limit
                ? reviewsArray.slice(0, limit)
                : reviewsArray;
            setReviews(reviewsToShow);
            setLoading(false);
        } else {
            fetchReviews();
        }
    }, [vendorId, reviewsProp, limit]);

    const fetchReviews = async () => {
        setLoading(true);
        setError('');

        try {
            const data = vendorId
                ? await reviewsAPI.getVendorReviews(vendorId)
                : await reviewsAPI.getReviews();

            // Handle different response formats
            let reviewsArray = [];
            if (Array.isArray(data)) {
                reviewsArray = data;
            } else if (data && Array.isArray(data.results)) {
                // Paginated response
                reviewsArray = data.results;
            } else if (data && typeof data === 'object') {
                // Single review or unexpected format
                console.warn('Unexpected API response format:', data);
                reviewsArray = [];
            }

            const reviewsToShow = limit ? reviewsArray.slice(0, limit) : reviewsArray;
            setReviews(reviewsToShow);
        } catch (err) {
            setError('Failed to load reviews');
            console.error('Error fetching reviews:', err);
            setReviews([]); // Ensure reviews is always an array
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    if (reviews.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600">No reviews yet</p>
                <p className="text-sm text-gray-500 mt-1">
                    Be the first to leave a review!
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
            ))}
        </div>
    );
}
