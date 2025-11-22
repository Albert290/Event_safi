import apiClient from './client';

export const reviewsAPI = {
    // Get all reviews (user's reviews)
    getReviews: async () => {
        const response = await apiClient.get('/reviews/');
        return response.data;
    },

    // Get reviews for a specific vendor
    getVendorReviews: async (vendorId) => {
        const response = await apiClient.get(`/reviews/?vendor=${vendorId}`);
        return response.data;
    },

    // Create review
    createReview: async (reviewData) => {
        const formData = new FormData();

        // Append all fields
        Object.keys(reviewData).forEach(key => {
            if (reviewData[key] !== null && reviewData[key] !== undefined) {
                formData.append(key, reviewData[key]);
            }
        });

        const response = await apiClient.post('/reviews/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },
};
