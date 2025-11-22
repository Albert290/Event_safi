import { create } from 'zustand';

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

    setLoading: (loading) => set({ loading }),

    setError: (error) => set({ error }),

    clearError: () => set({ error: null }),
}));
