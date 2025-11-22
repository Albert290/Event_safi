import { useState, useEffect } from 'react';
import { reviewsAPI } from '../api/reviews';
import ReviewList from '../components/reviews/ReviewList';
import { Star, Loader2 } from 'lucide-react';

export default function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        total: 0,
        average: 0,
    });

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        setLoading(true);
        try {
            const data = await reviewsAPI.getReviews();
            setReviews(data);

            // Calculate stats
            if (data.length > 0) {
                const total = data.length;
                const sum = data.reduce((acc, review) => acc + review.rating, 0);
                const average = (sum / total).toFixed(1);
                setStats({ total, average });
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">My Reviews</h1>
                <p className="text-gray-600">
                    Reviews you've written for vendors and services
                </p>
            </div>

            {/* Stats Card */}
            {!loading && reviews.length > 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                    <div className="flex items-center gap-8">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Total Reviews</p>
                            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Average Rating</p>
                            <div className="flex items-center gap-2">
                                <p className="text-3xl font-bold text-gray-900">{stats.average}</p>
                                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Reviews List */}
            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                </div>
            ) : (
                <ReviewList reviews={reviews} />
            )}
        </div>
    );
}
