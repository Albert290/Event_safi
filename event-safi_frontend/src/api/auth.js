import apiClient from './client';

export const authAPI = {
    // Register user
    registerUser: async (userData) => {
        const response = await apiClient.post('/auth/register/user/', userData);
        return response.data;
    },

    // Register vendor
    registerVendor: async (vendorData) => {
        const response = await apiClient.post('/register/vendor/', vendorData);
        return response.data;
    },

    // Login
    login: async (credentials) => {
        const response = await apiClient.post('/auth/login/', credentials);
        return response.data;
    },

    // Logout
    logout: async (refreshToken) => {
        const response = await apiClient.post('/auth/logout/', { refresh: refreshToken });
        return response.data;
    },

    // Get user profile
    getProfile: async () => {
        const response = await apiClient.get('/auth/profile/');
        return response.data;
    },

    // Update profile
    updateProfile: async (profileData) => {
        const response = await apiClient.put('/auth/profile/', profileData);
        return response.data;
    },

    // Partial update profile
    patchProfile: async (profileData) => {
        const response = await apiClient.patch('/auth/profile/', profileData);
        return response.data;
    },

    // Delete account
    deleteAccount: async () => {
        const response = await apiClient.delete('/auth/profile/');
        return response.data;
    },

    // Get dashboard
    getDashboard: async () => {
        const response = await apiClient.get('/auth/dashboard/');
        return response.data;
    },
};
