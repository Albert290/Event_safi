import { useState, useEffect } from 'react';

const CategoryPreview = () => {
    const [visibleCards, setVisibleCards] = useState([]);
    const [activePackage, setActivePackage] = useState(0);

    const eventPackages = [
        { 
            name: "Dream Weddings", 
            icon: "💒", 
            tagline: "Your Perfect Day, Flawlessly Executed",
            description: "From 'I do' to the last dance - we handle everything so you can focus on love",
            color: "bg-gradient-to-br from-pink-500 to-rose-600",
            price: "Starting KSh 150,000",
            includes: ["Professional Photography & Videography", "Live DJ & Sound System", "Elegant Decoration & Flowers", "Gourmet Catering for All Guests", "Master of Ceremonies", "Bridal Car & Transport"],
            popular: true,
            savings: "Save 40% vs booking separately"
        },
        { 
            name: "Birthday Celebrations", 
            icon: "🎂", 
            tagline: "Make Every Year Count",
            description: "Turn another year into an unforgettable celebration that your guests will talk about for months",
            color: "bg-gradient-to-br from-purple-500 to-indigo-600",
            price: "Starting KSh 35,000",
            includes: ["Event Photography", "DJ & Entertainment", "Custom Decorations", "Birthday Catering", "Party Games & Activities", "Cake & Surprise Coordination"],
            popular: false,
            savings: "Save 35% vs individual bookings"
        },
        { 
            name: "Harambee Events", 
            icon: "🤝", 
            tagline: "Unity in Purpose, Excellence in Execution",
            description: "Bring your community together with professionally organized harambees that inspire generosity",
            color: "bg-gradient-to-br from-green-500 to-emerald-600",
            price: "Starting KSh 45,000",
            includes: ["Professional MC & Coordination", "Sound System & Microphones", "Community Catering", "Tent Setup & Seating", "Security & Crowd Management", "Fundraising Support Tools"],
            popular: false,
            savings: "Complete package solution"
        },
        { 
            name: "Corporate Events", 
            icon: "🏢", 
            tagline: "Elevate Your Business Image",
            description: "Impress clients and motivate teams with corporate events that reflect your company's excellence",
            color: "bg-gradient-to-br from-blue-500 to-cyan-600",
            price: "Starting KSh 80,000",
            includes: ["Professional AV Equipment", "Corporate Catering", "Event Photography", "Registration Management", "Security Services", "Transport Coordination"],
            popular: false,
            savings: "Professional results guaranteed"
        },
        { 
            name: "Funeral Services", 
            icon: "🕊️", 
            tagline: "Honoring Lives with Dignity",
            description: "During difficult times, let us handle the arrangements with compassion and professionalism",
            color: "bg-gradient-to-br from-gray-600 to-slate-700",
            price: "Starting KSh 60,000",
            includes: ["Respectful Catering Services", "Sound System for Tributes", "Tent & Seating Arrangements", "Transport Coordination", "Security & Crowd Control", "Memorial Photography"],
            popular: false,
            savings: "Compassionate service included"
        },
        { 
            name: "Road Trip Adventures", 
            icon: "🚐", 
            tagline: "Journey Beyond the Ordinary",
            description: "Create memories that last a lifetime with perfectly planned adventures to Kenya's best destinations",
            color: "bg-gradient-to-br from-orange-500 to-red-600",
            price: "Starting KSh 25,000",
            includes: ["Reliable Transport & Driver", "Accommodation Booking", "Activity Coordination", "Meal Planning", "Safety & First Aid", "Photography Services"],
            popular: false,
            savings: "All-inclusive adventure"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setVisibleCards(prev => {
                if (prev.length < eventPackages.length) {
                    return [...prev, prev.length];
                }
                return prev;
            });
        }, 150);

        // Auto-rotate popular package highlight
        const rotateTimer = setInterval(() => {
            setActivePackage(prev => (prev + 1) % eventPackages.length);
        }, 4000);

        return () => {
            clearInterval(timer);
            clearInterval(rotateTimer);
        };
    }, [eventPackages.length]);

    return (
        <div className="py-20 bg-gradient-to-b from-white to-light">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-block bg-primary/10 rounded-full px-6 py-2 mb-6">
                        <span className="text-primary font-semibold text-sm">🎯 COMPLETE EVENT PACKAGES</span>
                    </div>
                    <h2 className="font-header text-text font-bold text-5xl md:text-6xl mb-6">
                        Every Event, Perfectly Planned
                    </h2>
                    <div className="w-32 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6"></div>
                    <p className="font-body text-text/70 text-xl max-w-4xl mx-auto leading-relaxed">
                        Stop juggling multiple vendors. Our all-inclusive packages deliver everything you need for unforgettable events at unbeatable prices.
                    </p>
                </div>

                {/* Event Package Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {eventPackages.map((pkg, index) => (
                        <div 
                            key={index}
                            className={`group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 ${
                                visibleCards.includes(index) ? 'animate-bounce-in' : 'opacity-0'
                            } ${activePackage === index ? 'ring-4 ring-primary/50' : ''}`}
                            style={{animationDelay: `${index * 0.1}s`}}
                            onMouseEnter={() => setActivePackage(index)}
                        >
                            {/* Popular Badge */}
                            {pkg.popular && (
                                <div className="absolute top-4 right-4 z-20 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                                    🔥 MOST POPULAR
                                </div>
                            )}

                            <div className={`${pkg.color} text-white relative h-full`}>
                                {/* Content */}
                                <div className="relative z-10 p-8 h-full flex flex-col">
                                    {/* Header */}
                                    <div className="mb-6">
                                        <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                                            {pkg.icon}
                                        </div>
                                        <h3 className="font-header font-bold text-2xl mb-2 leading-tight">
                                            {pkg.name}
                                        </h3>
                                        <p className="text-white/90 font-semibold text-sm mb-3">
                                            {pkg.tagline}
                                        </p>
                                        <p className="font-body text-white/80 text-sm leading-relaxed">
                                            {pkg.description}
                                        </p>
                                    </div>

                                    {/* Price */}
                                    <div className="mb-6">
                                        <div className="text-2xl font-bold mb-1">{pkg.price}</div>
                                        <div className="bg-white/20 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm inline-block">
                                            {pkg.savings}
                                        </div>
                                    </div>

                                    {/* Includes */}
                                    <div className="flex-grow mb-6">
                                        <h4 className="font-semibold mb-3 text-white/90">What's Included:</h4>
                                        <ul className="space-y-2 text-sm">
                                            {pkg.includes.slice(0, 4).map((item, idx) => (
                                                <li key={idx} className="flex items-start gap-2">
                                                    <span className="text-accent font-bold">✓</span>
                                                    <span className="text-white/80">{item}</span>
                                                </li>
                                            ))}
                                            {pkg.includes.length > 4 && (
                                                <li className="text-white/60 text-xs">
                                                    + {pkg.includes.length - 4} more services included
                                                </li>
                                            )}
                                        </ul>
                                    </div>

                                    {/* CTA Button */}
                                    <button className="w-full bg-white text-gray-800 font-bold py-3 px-6 rounded-xl hover:bg-accent hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg">
                                        Get Quote Now
                                    </button>
                                </div>

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Trust Indicators */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-primary/10">
                    <div className="text-center mb-8">
                        <h3 className="font-header font-bold text-3xl text-text mb-4">
                            Why 10,000+ Kenyans Trust Events-Safi
                        </h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                        <div className="group">
                            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">💯</div>
                            <div className="font-bold text-2xl text-primary mb-1">100%</div>
                            <div className="text-neutral text-sm">Success Rate</div>
                        </div>
                        <div className="group">
                            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">⚡</div>
                            <div className="font-bold text-2xl text-primary mb-1">24hrs</div>
                            <div className="text-neutral text-sm">Response Time</div>
                        </div>
                        <div className="group">
                            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🛡️</div>
                            <div className="font-bold text-2xl text-primary mb-1">Insured</div>
                            <div className="text-neutral text-sm">All Services</div>
                        </div>
                        <div className="group">
                            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">💰</div>
                            <div className="font-bold text-2xl text-primary mb-1">40%</div>
                            <div className="text-neutral text-sm">Average Savings</div>
                        </div>
                    </div>
                </div>

                {/* Final CTA */}
                <div className="text-center mt-16">
                    <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 text-white">
                        <h3 className="font-header font-bold text-3xl mb-4">
                            Ready to Create Something Amazing?
                        </h3>
                        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                            Join thousands of satisfied customers who chose Events-Safi for their most important moments
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-white text-primary font-bold py-4 px-8 rounded-full text-lg hover:bg-accent hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg">
                                💬 Chat with AI Assistant
                            </button>
                            <button className="border-2 border-white text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-white hover:text-primary transition-all duration-300 transform hover:scale-105">
                                📞 Call (0700) 123-456
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryPreview;
