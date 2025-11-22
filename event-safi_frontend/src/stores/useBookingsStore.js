import { create } from 'zustand';

export const useBookingsStore = create((set) => ({
    // State
    bookings: [],
    currentBooking: null,
    loading: false,
    error: null,

    // Actions
    setBookings: (bookings) => set({ bookings }),

    setCurrentBooking: (booking) => set({ currentBooking: booking }),

    addBooking: (booking) => set((state) => ({
        bookings: [booking, ...state.bookings],
    })),

    updateBooking: (bookingId, updatedData) => set((state) => ({
        bookings: state.bookings.map((booking) =>
            booking.id === bookingId ? { ...booking, ...updatedData } : booking
        ),
    })),

    setLoading: (loading) => set({ loading }),

    setError: (error) => set({ error }),

    clearError: () => set({ error: null }),
}));
