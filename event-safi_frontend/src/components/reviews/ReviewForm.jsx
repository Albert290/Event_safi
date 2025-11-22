import { useState } from 'react';
import { reviewsAPI } from '../../api/reviews';
import StarRating from './StarRating';
import { X, Upload, Loader2, CheckCircle } from 'lucide-react';

export default function ReviewForm({ event, vendor, service, onSuccess, onCancel }) {
    const [formData, setFormData] = useState({
        rating: 0,
        text: '',
        image: null,
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setError('Image size must be less than 5MB');
                return;
            }

            setFormData({ ...formData, image: file });

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setFormData({ ...formData, image: null });
        setImagePreview(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.rating === 0) {
            setError('Please select a rating');
            return;
        }

        if (!formData.text.trim()) {
            setError('Please write a review');
            return;
        }

        setLoading(true);

        try {
            const reviewData = {
                event: event.id,
                vendor: vendor.id,
                service: service.id,
                rating: formData.rating,
                text: formData.text,
            };

            if (formData.image) {
                reviewData.image = formData.image;
            }

            await reviewsAPI.createReview(reviewData);
            setSuccess(true);

            setTimeout(() => {
                if (onSuccess) onSuccess();
            }, 1500);
        } catch (err) {
            setError(
                err.response?.data?.detail ||
                err.response?.data?.error ||
                'Failed to submit review. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="bg-white rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Review Submitted!
                </h3>
                <p className="text-gray-600">
                    Thank you for your feedback. Your review helps others make better decisions.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Write a Review</h3>
                {onCancel && (
                    <button
                        onClick={onCancel}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                )}
            </div>

            {/* Vendor Info */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Reviewing</p>
                <p className="font-semibold text-gray-900">{vendor.business_name}</p>
                <p className="text-sm text-gray-600">{service.name}</p>
            </div>

            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800">{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Rating */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Rating <span className="text-red-500">*</span>
                    </label>
                    <StarRating
                        rating={formData.rating}
                        setRating={(rating) => setFormData({ ...formData, rating })}
                        size="lg"
                    />
                </div>

                {/* Review Text */}
                <div>
                    <label htmlFor="review-text" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Review <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="review-text"
                        rows="5"
                        value={formData.text}
                        onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                        placeholder="Share your experience with this vendor..."
                        required
                    />
                    <p className="mt-1 text-xs text-gray-500">
                        {formData.text.length} characters
                    </p>
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Add Photo (Optional)
                    </label>

                    {imagePreview ? (
                        <div className="relative inline-block">
                            <img
                                src={imagePreview}
                                alt="Review preview"
                                className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                            />
                            <button
                                type="button"
                                onClick={removeImage}
                                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-600">Click to upload image</p>
                            <p className="text-xs text-gray-500">Max 5MB</p>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>
                    )}
                </div>

                {/* Submit Button */}
                <div className="flex gap-3">
                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            'Submit Review'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
