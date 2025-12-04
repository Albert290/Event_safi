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

    // Get current vendor's profile (authenticated)
    getCurrentVendorProfile: async () => {
        const response = await apiClient.get('/vendors/dashboard/');
        return response.data;
    },

    // Update vendor profile (cover photo, description, social media, etc.)
    updateVendorProfile: async (vendorId, formData) => {
        const response = await apiClient.patch(`/vendors/${vendorId}/update_profile/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    // Upload photo to vendor gallery
    uploadGalleryPhoto: async (vendorId, photoData) => {
        const formData = new FormData();
        formData.append('image', photoData.image);
        if (photoData.caption) {
            formData.append('caption', photoData.caption);
        }
        if (photoData.order !== undefined) {
            formData.append('order', photoData.order);
        }

        const response = await apiClient.post(`/vendors/${vendorId}/upload_photo/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    // Delete photo from vendor gallery
    deleteGalleryPhoto: async (vendorId, photoId) => {
        const response = await apiClient.delete(`/vendors/${vendorId}/delete-photo/${photoId}/`);
        return response.data;
    },
};
