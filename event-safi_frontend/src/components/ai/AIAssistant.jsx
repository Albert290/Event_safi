import { useEffect, useRef } from 'react';
import { useAIChatStore } from '../../stores/useAIChatStore';
import { aiAPI } from '../../api/ai';
import { X, Send, Loader2, Sparkles, RotateCcw } from 'lucide-react';
import ChatMessage from './ChatMessage';
import VendorRecommendation from './VendorRecommendation';

export default function AIAssistant() {
    const {
        messages,
        isOpen,
        isTyping,
        recommendations,
        toggleChat,
        closeChat,
        sendMessage,
        clearMessages,
    } = useAIChatStore();

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const input = inputRef.current;
        const text = input.value.trim();

        if (!text) return;

        input.value = '';

        try {
            await sendMessage(text, aiAPI.getRecommendations);
        } catch (error) {
            console.error('AI Error:', error);
        }
    };

    const handleReset = async () => {
        if (confirm('Are you sure you want to clear the chat history?')) {
            try {
                await aiAPI.resetChat();
                clearMessages();
            } catch (error) {
                console.error('Reset error:', error);
            }
        }
    };

    if (!isOpen) {
        return (
            <button
                onClick={toggleChat}
                className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110 z-50"
                aria-label="Open AI Assistant"
            >
                <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
            </button>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-semibold">Event Safi AI</h3>
                        <p className="text-xs text-purple-100">Your event planning assistant</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleReset}
                        className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                        title="Reset chat"
                    >
                        <RotateCcw className="w-4 h-4" />
                    </button>
                    <button
                        onClick={closeChat}
                        className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                        aria-label="Close chat"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center px-4">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                            <Sparkles className="w-8 h-8 text-purple-600" />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">
                            Hi! I'm your AI assistant
                        </h4>
                        <p className="text-sm text-gray-600 mb-4">
                            I can help you find the perfect vendors for your event based on your budget, location, and preferences.
                        </p>
                        <div className="text-xs text-gray-500 space-y-1">
                            <p>Try asking:</p>
                            <p className="text-purple-600">"I need a wedding caterer in Nairobi"</p>
                            <p className="text-purple-600">"Find photographers under 50,000 KES"</p>
                        </div>
                    </div>
                ) : (
                    <>
                        {messages.map((message, index) => (
                            <ChatMessage key={index} message={message} />
                        ))}

                        {/* Vendor Recommendations */}
                        {recommendations?.vendors && recommendations.vendors.length > 0 && (
                            <div className="space-y-2">
                                <p className="text-sm font-semibold text-gray-700">Recommended Vendors:</p>
                                {recommendations.vendors.map((vendor, index) => (
                                    <VendorRecommendation key={index} vendor={vendor} />
                                ))}
                            </div>
                        )}

                        {/* Typing Indicator */}
                        {isTyping && (
                            <div className="flex items-center gap-2 text-gray-500">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span className="text-sm">AI is thinking...</span>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
                <div className="flex items-center gap-2">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Ask me anything about vendors..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm"
                        disabled={isTyping}
                    />
                    <button
                        type="submit"
                        disabled={isTyping}
                        className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Send message"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </form>
        </div>
    );
}
