// src/services/eventService.js
import { PRIVATE_URL, PUBLIC_URL } from "./api";

// Get user's events
export const getUserEvents = () => {
    return PRIVATE_URL.get("events/");
}

// Create a new event
export const createEvent = (eventData) => {
    return PRIVATE_URL.post("events/", eventData);
}

// Get event details
export const getEventDetails = (eventId) => {
    return PRIVATE_URL.get(`events/${eventId}/`);
}

// Update event
export const updateEvent = (eventId, eventData) => {
    return PRIVATE_URL.put(`events/${eventId}/`, eventData);
}

// Delete event
export const deleteEvent = (eventId) => {
    return PRIVATE_URL.delete(`events/${eventId}/`);
}

// Get event types
export const getEventTypes = () => {
    return PUBLIC_URL.get("events/types/");
}

// Get event bookings
export const getEventBookings = (eventId) => {
    return PRIVATE_URL.get(`bookings/?event=${eventId}`);
}