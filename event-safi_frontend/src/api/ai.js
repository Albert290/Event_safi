import apiClient from './client';

export const aiAPI = {
    // Get recommendations
    getRecommendations: async (conversation) => {
        const response = await apiClient.post('/ai/recommendations/', { conversation });
        return response.data;
    },

    // Reset chat
    resetChat: async () => {
        const response = await apiClient.post('/ai/recommendations/reset/');
        return response.data;
    },
};
