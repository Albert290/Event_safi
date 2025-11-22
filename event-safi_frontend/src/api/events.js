import apiClient from './client';

export const eventsAPI = {
    // Get all events
    getEvents: async () => {
        const response = await apiClient.get('/events/');
        return response.data;
    },

    // Get single event
    getEvent: async (eventId) => {
        const response = await apiClient.get(`/events/${eventId}/`);
        return response.data;
    },

    // Create event
    createEvent: async (eventData) => {
        const response = await apiClient.post('/events/', eventData);
        return response.data;
    },

    // Update event
    updateEvent: async (eventId, eventData) => {
        const response = await apiClient.put(`/events/${eventId}/`, eventData);
        return response.data;
    },

    // Partial update
    patchEvent: async (eventId, eventData) => {
        const response = await apiClient.patch(`/events/${eventId}/`, eventData);
        return response.data;
    },

    // Delete event
    deleteEvent: async (eventId) => {
        const response = await apiClient.delete(`/events/${eventId}/`);
        return response.data;
    },

    // Get event types
    getEventTypes: async () => {
        const response = await apiClient.get('/event-types/');
        return response.data;
    },
};
