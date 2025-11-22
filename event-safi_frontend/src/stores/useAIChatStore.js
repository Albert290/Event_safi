import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAIChatStore = create(
    persist(
        (set, get) => ({
            // State
            messages: [],
            isOpen: false,
            isTyping: false,
            recommendations: null,

            // Actions
            addMessage: (message) => set((state) => ({
                messages: [...state.messages, message],
            })),

            setMessages: (messages) => set({ messages }),

            clearMessages: () => set({ messages: [], recommendations: null }),

            setRecommendations: (recommendations) => set({ recommendations }),

            toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),

            openChat: () => set({ isOpen: true }),

            closeChat: () => set({ isOpen: false }),

            setTyping: (isTyping) => set({ isTyping }),

            // Send message and get response
            sendMessage: async (text, apiCall) => {
                const userMessage = { role: 'user', text, timestamp: new Date() };
                set((state) => ({ messages: [...state.messages, userMessage] }));

                set({ isTyping: true });

                try {
                    const conversation = get().messages.map(({ role, text }) => ({ role, text }));
                    const response = await apiCall(conversation);

                    const assistantMessage = {
                        role: 'model',
                        text: response.reply,
                        timestamp: new Date(),
                    };

                    set((state) => ({
                        messages: [...state.messages, assistantMessage],
                        recommendations: response.structured_data,
                        isTyping: false,
                    }));

                    return response;
                } catch (error) {
                    set({ isTyping: false });
                    throw error;
                }
            },
        }),
        {
            name: 'ai-chat-storage',
            partialize: (state) => ({
                messages: state.messages,
                recommendations: state.recommendations,
            }),
        }
    )
);
