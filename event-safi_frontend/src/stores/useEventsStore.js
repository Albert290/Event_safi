import { create } from 'zustand';

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
