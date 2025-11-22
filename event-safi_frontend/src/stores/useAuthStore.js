import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
    persist(
        (set, get) => ({
            // State
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            isVendor: false,

            // Actions
            setAuth: (user, tokens) => {
                set({
                    user,
                    accessToken: tokens.access,
                    refreshToken: tokens.refresh,
                    isAuthenticated: true,
                    isVendor: !!user.vendor_profile,
                });
            },

            setAccessToken: (token) => {
                set({ accessToken: token });
            },

            updateUser: (userData) => {
                set({ user: userData });
            },

            logout: () => {
                set({
                    user: null,
                    accessToken: null,
                    refreshToken: null,
                    isAuthenticated: false,
                    isVendor: false,
                });
            },

            // Getters
            getUser: () => get().user,
            getAccessToken: () => get().accessToken,
        }),
        {
            name: 'auth-storage', // localStorage key
            partialize: (state) => ({
                user: state.user,
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                isAuthenticated: state.isAuthenticated,
                isVendor: state.isVendor,
            }),
        }
    )
);
