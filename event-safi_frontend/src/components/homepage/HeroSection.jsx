import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Calendar, Users, CheckCircle2, Award } from 'lucide-react';

const HeroSection = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }}></div>
            </div>

            {/* Elegant Gradient Overlays */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
            </div>

            {/* Main Content */}
            <div className={`relative z-10 text-center px-6 max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {/* Premium Badge */}
                <div className="inline-block mb-6">
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-full px-5 py-2 backdrop-blur-sm">
                        <span className="text-amber-400 font-semibold text-sm tracking-wide">PREMIUM EVENT PLANNING</span>
                    </div>
                </div>

                {/* Main Heading */}
                <div className="mb-8">
                    <h1 className="font-bold text-5xl md:text-6xl lg:text-7xl text-white mb-4 leading-tight">
                        Elevate Your Events with
                        <span className="block mt-2 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                            Event Safi
                        </span>
                    </h1>
                </div>

                <h2 className="text-slate-200 text-xl md:text-2xl mb-8 font-light leading-relaxed max-w-3xl mx-auto">
                    Connect with verified, professional vendors for weddings, corporate events, and celebrations.
                    Your perfect event starts here.
                </h2>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
                    <Link to="/vendors">
                        <button className="group bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-4 px-8 rounded-lg text-base hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 flex items-center gap-2">
                            <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            Browse Vendors
                        </button>
                    </Link>
                    <Link to="/login">
                        <button className="group border-2 border-white/30 text-white font-semibold py-4 px-8 rounded-lg text-base hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-all duration-300 flex items-center gap-2">
                            <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            Plan Your Event
                        </button>
                    </Link>
                </div>

                {/* Event Type Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-16">
                    {[
                        { title: 'Weddings', desc: 'Create unforgettable memories', gradient: 'from-rose-500/20 to-pink-500/20', border: 'border-rose-500/30' },
                        { title: 'Corporate', desc: 'Professional excellence', gradient: 'from-blue-500/20 to-indigo-500/20', border: 'border-blue-500/30' },
                        { title: 'Celebrations', desc: 'Moments that matter', gradient: 'from-purple-500/20 to-violet-500/20', border: 'border-purple-500/30' }
                    ].map((event, index) => (
                        <div
                            key={index}
                            className={`bg-gradient-to-br ${event.gradient} border ${event.border} backdrop-blur-sm rounded-xl p-6 text-white hover:scale-105 transition-all duration-300 cursor-pointer`}
                        >
                            <div className="font-semibold text-lg mb-2">{event.title}</div>
                            <div className="text-sm text-slate-300">{event.desc}</div>
                        </div>
                    ))}
                </div>

                {/* Trust Indicators */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto pt-8 border-t border-white/10">
                    {[
                        { icon: CheckCircle2, label: 'Verified Vendors', value: '100+' },
                        { icon: Award, label: '5-Star Rated', value: '4.9' },
                        { icon: Users, label: 'Happy Clients', value: '500+' },
                        { icon: Calendar, label: 'Events Planned', value: '1000+' }
                    ].map((item, index) => (
                        <div key={index} className="text-center">
                            <item.icon className="w-6 h-6 mx-auto mb-2 text-amber-400" />
                            <div className="text-2xl font-bold text-white mb-1">{item.value}</div>
                            <div className="text-xs text-slate-400">{item.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HeroSection;
