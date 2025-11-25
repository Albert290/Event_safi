import apiClient from './client';

export const vendorsAPI = {
    // Get all vendors
    getVendors: async () => {
        const response = await apiClient.get('/vendors/');
        return response.data;
    },

    // Get single vendor
    getVendor: async (vendorId) => {
        const response = await apiClient.get(`/vendors/${vendorId}/`);
        return response.data;
    },

    // Get vendor dashboard stats
    getDashboard: async () => {
        const response = await apiClient.get('/vendors/dashboard/');
        return response.data;
    },

    // Get service categories
    getCategories: async () => {
        const response = await apiClient.get('/services/categories/');
        return response.data;
    },

    // Get vendor's services (authenticated vendor only)
    getServices: async () => {
        const response = await apiClient.get('/services/services/');
        return response.data;
    },

    // Get all services (public)
    getAllServices: async () => {
        const response = await apiClient.get('/services/services/');
        return response.data;
    },

    // Create service (for vendors)
    createService: async (serviceData) => {
        const response = await apiClient.post('/services/services/', serviceData);
        return response.data;
    },

    // Update service
    updateService: async (serviceId, serviceData) => {
        const response = await apiClient.put(`/services/services/${serviceId}/`, serviceData);
        return response.data;
    },

    // Delete service
    deleteService: async (serviceId) => {
        const response = await apiClient.delete(`/services/services/${serviceId}/`);
        return response.data;
    },
};
