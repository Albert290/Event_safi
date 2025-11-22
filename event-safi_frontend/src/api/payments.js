import apiClient from './client';

export const paymentsAPI = {
    // Get all payments
    getPayments: async () => {
        const response = await apiClient.get('/payments/');
        return response.data;
    },

    // Create payment
    createPayment: async (paymentData) => {
        const response = await apiClient.post('/payments/', paymentData);
        return response.data;
    },

    // Get payment status (future endpoint)
    getPaymentStatus: async (paymentId) => {
        const response = await apiClient.get(`/payments/${paymentId}/status/`);
        return response.data;
    },
};
