import { useState, useEffect, useRef } from 'react';
import { X, Send, MessageCircle } from 'lucide-react';
import { eventPackages, getPackageRecommendation, suggestUpgrade } from '../../data/eventPackages';
import useBookingStore from '../../stores/bookingStore';
import RecommendedPackages from './RecommendedPackages';

const AIChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            type: 'bot',
            message: "🎉 Hi there! I'm your Events-Safi AI assistant!\n\nI specialize in creating AMAZING event packages that save you time, money, and stress. Whether it's a dream wedding, birthday bash, or corporate event - I've got the perfect solution!\n\n💰 Our clients save an average of 40% with our all-inclusive packages.\n\nWhat event are you planning? Let's make it unforgettable! ✨",
            timestamp: new Date()
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const addRecommendedPackage = useBookingStore((state) => state.addRecommendedPackage);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const quickQuestions = [
        "Planning a wedding for 200 guests",
        "Need a complete birthday party package",
        "Organizing a harambee event",
        "Corporate event for 50 people"
    ];

    const handleSendMessage = async (message = inputMessage) => {
        if (!message.trim()) return;

        // Add user message
        const userMessage = {
            type: 'user',
            message: message,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const botResponse = generateAIResponse(message);
            setMessages(prev => [...prev, {
                type: 'bot',
                message: botResponse,
                timestamp: new Date()
            }]);
            setIsTyping(false);
        }, 1500);
    };

    const generateAIResponse = (userMessage) => {
        const lowerMessage = userMessage.toLowerCase();
        
        // Extract budget from message (e.g., "50000", "50k", "ksh 50000")
        const budgetMatch = userMessage.match(/(\d+(?:,\d+)?)\s*(k|ksh)?/i);
        let budget = null;
        if (budgetMatch) {
            budget = parseInt(budgetMatch[1].replace(/,/g, '')) * (budgetMatch[2]?.toLowerCase() === 'k' ? 1000 : 1);
        }

        // Detect event type
        let eventType = null;
        let eventResponse = '';

        if (lowerMessage.includes('wedding')) {
            eventType = 'wedding';
            eventResponse = "💒 Congratulations on your upcoming wedding! �\n\n";
        } else if (lowerMessage.includes('birthday')) {
            eventType = 'birthday';
            eventResponse = "🎂 Birthday celebrations are our specialty! �\n\n";
        } else if (lowerMessage.includes('harambee')) {
            eventType = 'harambee';
            eventResponse = "🤝 Harambee events require special expertise - and we've got you covered!\n\n";
        } else if (lowerMessage.includes('corporate')) {
            eventType = 'corporate';
            eventResponse = "🏢 Elevate your business image with our event services!\n\n";
        } else if (lowerMessage.includes('funeral')) {
            eventType = 'funeral';
            eventResponse = "🕊️ During this difficult time, let us handle everything with dignity and compassion.\n\n";
        } else if (lowerMessage.includes('road trip') || lowerMessage.includes('trip')) {
            eventType = 'roadtrip';
            eventResponse = "🚐 Ready for an adventure? Our Road Trip Packages create unforgettable memories!\n\n";
        }

        // If event type detected, provide budget-aware recommendations
        if (eventType) {
            const pkg = Object.values(eventPackages).find(p => 
                p.name.toLowerCase().includes(eventType)
            );

            if (budget && pkg) {
                // Budget-aware recommendation
                const recommendation = getPackageRecommendation(eventType, budget);
                if (recommendation) {
                    eventResponse += `💡 ${recommendation.suggestion}\n\n`;
                    eventResponse += `📦 ${recommendation.name}\n`;
                    eventResponse += `💰 KSh ${recommendation.price.toLocaleString()}\n\n`;
                    eventResponse += `What's included:\n`;
                    eventResponse += recommendation.features.join('\n');
                    eventResponse += '\n\n';

                    // Add to booking store for display
                    addRecommendedPackage({
                        name: recommendation.name,
                        price: recommendation.price,
                        description: recommendation.suggestion,
                        features: recommendation.features,
                        tier: recommendation.tier,
                        eventType: eventType
                    });

                    // Suggest upgrade if applicable
                    const upgrade = suggestUpgrade(eventType, budget);
                    if (upgrade) {
                        eventResponse += `\n${upgrade.message}\n`;
                        eventResponse += `Additional features:\n${upgrade.additionalFeatures.join('\n')}`;
                    }
                }
            } else if (pkg) {
                // No budget specified, show all tiers
                const tiers = pkg.tiers;
                eventResponse += "We have options for every budget!\n\n";
                
                Object.values(tiers).forEach((tier) => {
                    eventResponse += `${tier.name} - KSh ${tier.price.toLocaleString()}\n`;
                    eventResponse += `${tier.description}\n\n`;
                    
                    // Add each tier to booking store
                    addRecommendedPackage({
                        name: tier.name,
                        price: tier.price,
                        description: tier.description,
                        features: tier.features,
                        eventType: eventType
                    });
                });

                eventResponse += "What's your budget? I'll recommend the perfect package! 💰";
            }

            return eventResponse;
        }

        // Handle budget inquiry without specific event
        if (lowerMessage.includes('budget') || (lowerMessage.includes('ksh') && !eventType) || lowerMessage.includes('cost') || lowerMessage.includes('price')) {
            if (budget) {
                return `💰 Great! With a budget of KSh ${budget.toLocaleString()}, you have wonderful options!\n\n📝 What type of event are you planning?\n\n🎯 Tell me:\n1️⃣ Wedding, Birthday, Corporate, Harambee, Funeral, or Road Trip?\n2️⃣ How many guests?\n3️⃣ Any specific requirements?\n\nI'll show you exactly what's possible with your budget! 🎉`;
            }
            return "💰 Smart question! I'll maximize every shilling for you!\n\nOur packages save you 30-40% compared to booking separately. Here's why:\n\n🎯 Bulk pricing with trusted vendors\n🎯 No coordination headaches\n🎯 Quality guaranteed\n🎯 One point of contact\n\nWhat's your total budget and event type? I'll show you exactly what's possible! 💪";
        }

        return "🎉 Welcome to Events-Safi! I'm here to make your event planning effortless and affordable!\n\n🎯 Tell me:\n1️⃣ What event are you planning? (Wedding, Birthday, Corporate, Harambee, Funeral, Road Trip)\n2️⃣ Your budget? (e.g., 50000 or 50k)\n3️⃣ How many guests?\n4️⃣ Preferred date?\n\nI'll instantly recommend the perfect package that saves you money and stress! Our clients save an average of 40% with our all-inclusive packages. Let's create something amazing together! ✨";
    };

    return (
        <>
            {/* Chat Button */}
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    onClick={() => setIsOpen(true)}
                    className={`bg-primary text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 animate-pulse-glow ${isOpen ? 'hidden' : 'block'}`}
                >
                    <MessageCircle size={24} />
                </button>
            </div>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden border border-primary/20">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">
                                🤖
                            </div>
                            <div>
                                <h3 className="font-bold">AI Event Assistant</h3>
                                <p className="text-xs opacity-90">Online • Ready to help</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="hover:bg-white/20 p-1 rounded-full transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-2xl ${
                                    msg.type === 'user' 
                                        ? 'bg-primary text-white rounded-br-md' 
                                        : 'bg-light text-text rounded-bl-md'
                                }`}>
                                    <p className="text-sm">{msg.message}</p>
                                </div>
                            </div>
                        ))}
                        
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-light text-text p-3 rounded-2xl rounded-bl-md">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Questions */}
                    {messages.length === 1 && (
                        <div className="p-4 border-t border-light">
                            <p className="text-xs text-text/60 mb-2">Quick questions:</p>
                            <div className="space-y-2">
                                {quickQuestions.map((question, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSendMessage(question)}
                                        className="w-full text-left text-xs p-2 bg-light hover:bg-primary/10 rounded-lg transition-colors"
                                    >
                                        {question}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Input */}
                    <div className="p-4 border-t border-light">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="Tell me about your event..."
                                className="flex-1 p-3 border border-primary/20 rounded-full focus:outline-none focus:border-primary text-sm"
                            />
                            <button
                                onClick={() => handleSendMessage()}
                                className="bg-primary text-white p-3 rounded-full hover:bg-secondary transition-colors"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AIChatbot;