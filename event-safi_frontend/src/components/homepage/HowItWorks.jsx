import { useState, useEffect } from 'react';
import { Search, Calendar, Settings, CheckCircle, Shield, Zap, MessageCircle } from 'lucide-react';

const HowItWorks = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    const steps = [
        {
            number: "01",
            title: "Browse & Compare",
            description: "Explore our curated list of verified vendors, read reviews, and compare prices to find the perfect match for your event.",
            icon: Search,
            color: "from-blue-500 to-indigo-600"
        },
        {
            number: "02",
            title: "Book Services",
            description: "Select your preferred vendors and book their services directly through our platform with secure payment options.",
            icon: Calendar,
            color: "from-amber-500 to-orange-600"
        },
        {
            number: "03",
            title: "Manage Event",
            description: "Keep track of all your bookings, communicate with vendors, and manage your event timeline in one convenient dashboard.",
            icon: Settings,
            color: "from-purple-500 to-pink-600"
        },
        {
            number: "04",
            title: "Enjoy Your Day",
            description: "Relax and enjoy your perfectly planned event while our professional vendors deliver exceptional service.",
            icon: CheckCircle,
            color: "from-green-500 to-emerald-600"
        }
    ];

    useEffect(() => {
        setIsVisible(true);
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % steps.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [steps.length]);

    return (
        <div className="py-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
            {/* Subtle Background */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-64 h-64 bg-amber-500 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="inline-block bg-amber-50 border border-amber-200 rounded-full px-6 py-2 mb-6">
                        <span className="text-amber-700 font-semibold text-sm tracking-wide">SIMPLE PROCESS</span>
                    </div>
                    <h2 className="font-bold text-4xl md:text-5xl mb-6 text-slate-900">
                        How It Works
                    </h2>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
                        Plan your perfect event in 4 simple steps
                    </p>
                </div>

                {/* Process Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {steps.map((step, index) => {
                        const StepIcon = step.icon;
                        return (
                            <div
                                key={index}
                                className={`relative group cursor-pointer transition-all duration-500 ${activeStep === index ? 'transform scale-105' : ''
                                    } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${index * 150}ms` }}
                                onMouseEnter={() => setActiveStep(index)}
                            >
                                <div className={`relative z-10 p-6 rounded-2xl transition-all duration-500 ${activeStep === index
                                    ? 'bg-white shadow-xl border-2 border-amber-200'
                                    : 'bg-white hover:bg-slate-50 hover:shadow-lg border-2 border-slate-100'
                                    }`}>
                                    {/* Step Number/Icon */}
                                    <div className={`w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center text-white font-bold transition-all duration-500 bg-gradient-to-br ${activeStep === index ? step.color : 'from-slate-300 to-slate-400'
                                        }`}>
                                        {activeStep === index ? (
                                            <StepIcon className="w-8 h-8" />
                                        ) : (
                                            <span className="text-xl">{step.number}</span>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <h3 className="font-bold text-lg mb-3 text-slate-900 text-center">
                                        {step.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm leading-relaxed text-center">
                                        {step.description}
                                    </p>

                                    {/* Active Indicator */}
                                    {activeStep === index && (
                                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"></div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Stats */}
                <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-2xl p-8 shadow-xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <Zap className="w-8 h-8 mx-auto mb-3 text-amber-400" />
                            <div className="font-bold text-2xl text-white mb-1">Fast</div>
                            <div className="text-slate-300 text-sm">Quick Booking</div>
                        </div>
                        <div>
                            <Shield className="w-8 h-8 mx-auto mb-3 text-amber-400" />
                            <div className="font-bold text-2xl text-white mb-1">Secure</div>
                            <div className="text-slate-300 text-sm">Safe Payments</div>
                        </div>
                        <div>
                            <CheckCircle className="w-8 h-8 mx-auto mb-3 text-amber-400" />
                            <div className="font-bold text-2xl text-white mb-1">Verified</div>
                            <div className="text-slate-300 text-sm">Trusted Vendors</div>
                        </div>
                        <div>
                            <MessageCircle className="w-8 h-8 mx-auto mb-3 text-amber-400" />
                            <div className="font-bold text-2xl text-white mb-1">24/7</div>
                            <div className="text-slate-300 text-sm">Support</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HowItWorks;
