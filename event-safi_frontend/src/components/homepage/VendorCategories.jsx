import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const VendorCategories = () => {
    const [visibleCards, setVisibleCards] = useState([]);

    const categories = [
        {
            name: "Catering",
            description: "Professional catering services for any event size",
            image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80",
            count: "25+ vendors"
        },
        {
            name: "Photography",
            description: "Capture your special moments beautifully",
            image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80",
            count: "30+ vendors"
        },
        {
            name: "Entertainment",
            description: "DJs, live bands, and performers",
            image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80",
            count: "20+ vendors"
        },
        {
            name: "Decoration",
            description: "Transform your venue into a dream space",
            image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
            count: "18+ vendors"
        },
        {
            name: "Venues",
            description: "Perfect locations for your event",
            image: "https://images.unsplash.com/photo-1519167758481-83f29da8c0f0?w=800&q=80",
            count: "15+ venues"
        },
        {
            name: "Transport",
            description: "Reliable transportation services",
            image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80",
            count: "12+ vendors"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setVisibleCards(prev => {
                if (prev.length < categories.length) {
                    return [...prev, prev.length];
                }
                return prev;
            });
        }, 100);

        return () => clearInterval(timer);
    }, [categories.length]);

    return (
        <div className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-block bg-amber-50 border border-amber-200 rounded-full px-6 py-2 mb-6">
                        <span className="text-amber-700 font-semibold text-sm tracking-wide">OUR SERVICES</span>
                    </div>
                    <h2 className="font-bold text-4xl md:text-5xl mb-6 text-slate-900">
                        Trusted Vendor Categories
                    </h2>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
                        Browse through our carefully vetted professionals across all event service categories
                    </p>
                </div>

                {/* Category Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {categories.map((category, index) => (
                        <Link
                            key={index}
                            to={`/vendors?category=${category.name}`}
                            className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ${visibleCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                }`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            {/* Image */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                            </div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                <h3 className="font-bold text-2xl mb-2">
                                    {category.name}
                                </h3>
                                <p className="text-slate-200 text-sm mb-4 leading-relaxed">
                                    {category.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold bg-amber-500 rounded-full px-3 py-1">
                                        {category.count}
                                    </span>
                                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform text-amber-400" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="text-center">
                    <Link to="/vendors">
                        <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-4 px-8 rounded-lg text-base hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300">
                            View All Vendors →
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default VendorCategories;
