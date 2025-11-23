import { create } from 'zustand';
import { vendorsAPI } from '../api/vendors';

export const useVendorsStore = create((set) => ({
    // State
    vendors: [],
    currentVendor: null,
    categories: [],
    services: [],
    loading: false,
    error: null,

    // Actions
    setVendors: (vendors) => set({ vendors }),

    setCurrentVendor: (vendor) => set({ currentVendor: vendor }),

    setCategories: (categories) => set({ categories }),

    setServices: (services) => set({ services }),

    // Fetch vendors from API
    fetchVendors: async () => {
        set({ loading: true, error: null });
        try {
            const data = await vendorsAPI.getVendors();
            set({ vendors: data.results || data, loading: false });
            return data;
        } catch (error) {
            console.error('Error fetching vendors:', error);
            set({ error: error.message, loading: false });
            throw error;
        }
    },

    // Fetch service categories from API
    fetchCategories: async () => {
        try {
            const data = await vendorsAPI.getCategories();
            set({ categories: data.results || data });
            return data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            set({ error: error.message });
            throw error;
        }
    },

    // Fetch services from API
    fetchServices: async () => {
        try {
            const data = await vendorsAPI.getServices();
            set({ services: data.results || data });
            return data;
        } catch (error) {
            console.error('Error fetching services:', error);
            set({ error: error.message });
            throw error;
        }
    },

    setLoading: (loading) => set({ loading }),

    setError: (error) => set({ error }),

    clearError: () => set({ error: null }),
}));
