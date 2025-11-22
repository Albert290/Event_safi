import apiClient from './client';

export const bookingsAPI = {
    // Get all bookings
    getBookings: async () => {
        const response = await apiClient.get('/bookings/');
        return response.data;
    },

    // Get single booking
    getBooking: async (bookingId) => {
        const response = await apiClient.get(`/bookings/${bookingId}/`);
        return response.data;
    },

    // Create booking
    createBooking: async (bookingData) => {
        const response = await apiClient.post('/bookings/', bookingData);
        return response.data;
    },

    // Update booking status (for vendors)
    updateBooking: async (bookingId, bookingData) => {
        const response = await apiClient.patch(`/bookings/${bookingId}/`, bookingData);
        return response.data;
    },
};
