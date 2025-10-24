import { useState } from 'react';

const FeaturesSection = () => {
    const [hoveredFeature, setHoveredFeature] = useState(null);

    const features = [
        {
            icon: "🤖",
            title: "AI-Powered Matching",
            description: "Our smart AI understands your needs and budget to find perfect service providers instantly",
            color: "from-purple-500 to-pink-500",
            stats: "95% Match Accuracy"
        },
        {
            icon: "💰",
            title: "Transparent Pricing",
            description: "No hidden fees! See exact costs upfront and compare prices from multiple providers",
            color: "from-green-500 to-blue-500",
            stats: "Save up to 30%"
        },
        {
            icon: "⚡",
            title: "Instant Booking",
            description: "Book your entire event team in minutes, not days. Real-time availability and instant confirmations",
            color: "from-yellow-500 to-red-500",
            stats: "Book in 2 Minutes"
        },
        {
            icon: "🛡️",
            title: "Quality Guaranteed",
            description: "All providers are verified, insured, and rated by real customers. Your satisfaction is guaranteed",
            color: "from-blue-500 to-purple-500",
            stats: "4.9/5 Average Rating"
        },
        {
            icon: "📱",
            title: "All-in-One Dashboard",
            description: "Manage all your bookings, communicate with providers, and track progress from one place",
            color: "from-teal-500 to-green-500",
            stats: "Everything Organized"
        },
        {
            icon: "🎯",
            title: "Custom Packages",
            description: "Bundle multiple services for better deals. Our AI suggests the best combinations for your event",
            color: "from-pink-500 to-purple-500",
            stats: "Smart Bundles"
        }
    ];

    return (
        <div className="py-20 bg-gradient-to-br from-light to-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-full h-full" 
                     style={{
                         backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                     }}
                ></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="font-header text-text font-bold text-5xl md:text-6xl mb-6">
                        Why Choose Events-Safi?
                    </h2>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
                    <p className="font-body text-text/70 text-xl max-w-3xl mx-auto leading-relaxed">
                        We're revolutionizing event planning with cutting-edge technology and exceptional service
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div 
                            key={index}
                            className="group relative"
                            onMouseEnter={() => setHoveredFeature(index)}
                            onMouseLeave={() => setHoveredFeature(null)}
                        >
                            <div className={`relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 ${
                                hoveredFeature === index ? 'animate-pulse-glow' : ''
                            }`}>
                                {/* Gradient Background */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                                
                                <div className="relative z-10 p-8">
                                    {/* Icon */}
                                    <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-3xl transform group-hover:scale-110 transition-transform duration-300`}>
                                        {feature.icon}
                                    </div>

                                    {/* Content */}
                                    <h3 className="font-header font-bold text-xl mb-4 text-text text-center">
                                        {feature.title}
                                    </h3>
                                    <p className="font-body text-text/70 text-center leading-relaxed mb-6">
                                        {feature.description}
                                    </p>

                                    {/* Stats */}
                                    <div className={`text-center py-2 px-4 rounded-full bg-gradient-to-r ${feature.color} text-white font-semibold text-sm transform group-hover:scale-105 transition-transform duration-300`}>
                                        {feature.stats}
                                    </div>
                                </div>

                                {/* Hover Effect Border */}
                                <div className={`absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-primary/20 transition-colors duration-300`}></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <div className="bg-white rounded-3xl p-8 shadow-lg max-w-4xl mx-auto">
                        <h3 className="font-header font-bold text-3xl mb-4 text-text">
                            Ready to Plan Your Perfect Event?
                        </h3>
                        <p className="font-body text-text/70 text-lg mb-8">
                            Join thousands of satisfied customers who trust Events-Safi for their special occasions
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-primary text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-secondary transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                                🚀 Start Planning Now
                            </button>
                            <button className="border-2 border-primary text-primary font-bold py-4 px-8 rounded-full text-lg hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-105">
                                📞 Talk to Expert
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturesSection;