import { PRIVATE_URL, PUBLIC_URL } from "./api";

// Create a new booking
export const createBooking = (data) => {
    return PRIVATE_URL.post("bookings/", data);
}

// Book a service directly (no event required)
export const bookService = (serviceId, bookingData) => {
    const data = {
        service_id: serviceId,
        ...bookingData
    };
    return PRIVATE_URL.post("bookings/book_service/", data);
}

// Get user's bookings
export const getUserBookings = () => {
    return PRIVATE_URL.get("bookings/");
}

// Update booking status (for vendors)
export const updateBookingStatus = (bookingId, status) => {
    return PRIVATE_URL.patch(`bookings/${bookingId}/update_status/`, { status });
}

// Get booking details
export const getBookingDetails = (bookingId) => {
    return PRIVATE_URL.get(`bookings/${bookingId}/`);
}