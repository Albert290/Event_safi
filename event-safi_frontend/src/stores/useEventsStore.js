import { create } from 'zustand';
import { eventsAPI } from '../api/events';

export const useEventsStore = create((set, get) => ({
    // State
    events: [],
    currentEvent: null,
    eventTypes: [],
    loading: false,
    error: null,

    // Actions
    setEvents: (events) => set({ events }),

    setCurrentEvent: (event) => set({ currentEvent: event }),

    setEventTypes: (types) => set({ eventTypes: types }),

    // Fetch events from API
    fetchEvents: async () => {
        set({ loading: true, error: null });
        try {
            const data = await eventsAPI.getEvents();
            set({ events: data.results || data, loading: false });
            return data;
        } catch (error) {
            console.error('Error fetching events:', error);
            set({ error: error.message, loading: false });
            throw error;
        }
    },

    // Fetch event types from API
    fetchEventTypes: async () => {
        try {
            const data = await eventsAPI.getEventTypes();
            set({ eventTypes: data.results || data });
            return data;
        } catch (error) {
            console.error('Error fetching event types:', error);
            set({ error: error.message });
            throw error;
        }
    },

    addEvent: (event) => set((state) => ({
        events: [event, ...state.events],
    })),

    updateEvent: (eventId, updatedData) => set((state) => ({
        events: state.events.map((event) =>
            event.id === eventId ? { ...event, ...updatedData } : event
        ),
        currentEvent: state.currentEvent?.id === eventId
            ? { ...state.currentEvent, ...updatedData }
            : state.currentEvent,
    })),

    deleteEvent: (eventId) => set((state) => ({
        events: state.events.filter((event) => event.id !== eventId),
        currentEvent: state.currentEvent?.id === eventId ? null : state.currentEvent,
    })),

    setLoading: (loading) => set({ loading }),

    setError: (error) => set({ error }),

    clearError: () => set({ error: null }),
}));
