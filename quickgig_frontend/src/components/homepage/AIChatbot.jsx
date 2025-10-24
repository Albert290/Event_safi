import { useState } from 'react';
import { X, Send, MessageCircle } from 'lucide-react';

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
        
        if (lowerMessage.includes('wedding')) {
            return "💒 Congratulations on your upcoming wedding! 🎉\n\nOur Dream Wedding Package is PERFECT for you:\n✅ Professional Photography & Videography\n✅ Live DJ & Premium Sound\n✅ Elegant Decorations & Flowers\n✅ Gourmet Catering\n✅ Master of Ceremonies\n✅ Bridal Transport\n\n💰 Starting at KSh 150,000 (Save 40% vs separate bookings!)\n\nHow many guests are you expecting? I'll customize the perfect package for your special day! 💕";
        }
        
        if (lowerMessage.includes('birthday')) {
            return "🎂 Birthday celebrations are our specialty! 🎈\n\nOur Birthday Celebration Package includes:\n✅ Event Photography\n✅ DJ & Entertainment\n✅ Custom Decorations\n✅ Delicious Catering\n✅ Party Games & Activities\n✅ Cake Coordination\n\n💰 Starting at KSh 35,000 (Save 35%!)\n\nWhat's the age group and how many guests? Let me create an unforgettable celebration! 🎊";
        }
        
        if (lowerMessage.includes('harambee')) {
            return "🤝 Harambee events require special expertise - and we've got you covered!\n\nOur Harambee Package ensures success:\n✅ Professional MC & Coordination\n✅ Quality Sound System\n✅ Community Catering\n✅ Tent Setup & Seating\n✅ Security & Crowd Management\n✅ Fundraising Support\n\n💰 Starting at KSh 45,000 (Complete solution!)\n\nWhat's your fundraising goal? I'll help you organize an event that inspires generosity! 💪";
        }
        
        if (lowerMessage.includes('corporate')) {
            return "🏢 Elevate your business image with our Corporate Event Package!\n\nProfessional services included:\n✅ Premium AV Equipment\n✅ Corporate Catering\n✅ Event Photography\n✅ Registration Management\n✅ Security Services\n✅ Transport Coordination\n\n💰 Starting at KSh 80,000 (Professional results guaranteed!)\n\nWhat type of corporate event? Product launch, team building, or conference? Let's make it impressive! 🚀";
        }
        
        if (lowerMessage.includes('funeral')) {
            return "🕊️ During this difficult time, let us handle everything with dignity and compassion.\n\nOur Funeral Service Package:\n✅ Respectful Catering\n✅ Sound System for Tributes\n✅ Tent & Seating\n✅ Transport Coordination\n✅ Security & Management\n✅ Memorial Photography\n\n💰 Starting at KSh 60,000 (Compassionate service)\n\nWe're here to support you. How many people are expected? We'll ensure everything is handled respectfully. 🙏";
        }
        
        if (lowerMessage.includes('road trip') || lowerMessage.includes('trip')) {
            return "🚐 Ready for an adventure? Our Road Trip Package creates unforgettable memories!\n\nAll-inclusive adventure:\n✅ Reliable Transport & Driver\n✅ Accommodation Booking\n✅ Activity Coordination\n✅ Meal Planning\n✅ Safety & First Aid\n✅ Photography Services\n\n💰 Starting at KSh 25,000 per person\n\nWhere do you want to explore? Maasai Mara, Coast, or Mount Kenya? Let's plan your perfect getaway! 🏔️";
        }
        
        if (lowerMessage.includes('budget') || lowerMessage.includes('ksh') || lowerMessage.includes('cost')) {
            return "💰 Smart question! I'll maximize every shilling for you!\n\nOur packages save you 30-40% compared to booking separately. Here's why:\n\n🎯 Bulk pricing with trusted vendors\n🎯 No coordination headaches\n🎯 Quality guaranteed\n🎯 One point of contact\n\nWhat's your total budget and event type? I'll show you exactly what's possible and how to get the most value! 💪";
        }
        
        return "🎉 Welcome to Events-Safi! I'm here to make your event planning effortless and affordable!\n\n🎯 Tell me:\n1️⃣ What event are you planning?\n2️⃣ How many guests?\n3️⃣ Your budget range?\n4️⃣ Preferred date?\n\nI'll instantly recommend the perfect package that saves you money and stress! Our clients save an average of 40% with our all-inclusive packages. Let's create something amazing together! ✨";
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