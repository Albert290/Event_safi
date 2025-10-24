import { create } from 'zustand';

const useAuthStore = create((set) => ({
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,

    // Initialize auth from localStorage on app startup
    initializeAuth: () => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");
        if (storedUser && storedToken) {
            try {
                set({
                    user: JSON.parse(storedUser),
                    token: storedToken
                });
            } catch (error) {
                console.error("Error parsing stored user:", error);
                localStorage.removeItem("user");
                localStorage.removeItem("token");
            }
        }
    },

    register: async (email, username, password, password_confirm, location = "", phone_number = "") => {
        set({ loading: true, error: null });
        try {
            // Validate passwords match
            if (password !== password_confirm) {
                set({
                    loading: false,
                    error: "Passwords do not match"
                });
                return false;
            }

            // Create mock user object
            const mockUser = {
                id: Math.floor(Math.random() * 10000),
                username,
                email,
                location,
                phone_number,
                is_client: true,
                is_tasker: false
            };

            // Create mock token (in real app, this comes from backend)
            const mockToken = `mock_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

            // Save to localStorage
            localStorage.setItem("token", mockToken);
            localStorage.setItem("user", JSON.stringify(mockUser));

            // Update Zustand state
            set({
                user: mockUser,
                token: mockToken,
                loading: false
            });

            return true;
        } catch (error) {
            console.log("Registration error:", error.message);
            set({
                loading: false,
                error: error.message || "Registration failed"
            });
            return false;
        }
    },

    login: async (email, password) => {
        set({ loading: true, error: null });
        try {
            // Simple mock validation - in real app, this would verify against backend
            if (!email || !password) {
                set({
                    loading: false,
                    error: "Email and password are required"
                });
                return false;
            }

            if (!email.includes("@")) {
                set({
                    loading: false,
                    error: "Please enter a valid email"
                });
                return false;
            }

            // Create mock user object (would be returned from backend in real app)
            const mockUser = {
                id: Math.floor(Math.random() * 10000),
                username: email.split("@")[0], // Use email prefix as username
                email,
                location: "",
                phone_number: "",
                is_client: true,
                is_tasker: false
            };

            // Create mock token
            const mockToken = `mock_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

            // Save to localStorage
            localStorage.setItem("token", mockToken);
            localStorage.setItem("user", JSON.stringify(mockUser));

            // Update Zustand state
            set({
                user: mockUser,
                token: mockToken,
                loading: false
            });

            return true;
        } catch (error) {
            console.log("login error:", error.message);
            set({
                error: error.message || "Login failed",
                loading: false
            });
            return false;
        }
    },

    logout: async () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        set({ user: null, token: null, error: null });
    },
}));

export default useAuthStore;
