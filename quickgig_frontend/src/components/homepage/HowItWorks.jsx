import { useState, useEffect } from 'react';

const HowItWorks = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    const steps = [
        {
            number: "01",
            title: "Share Your Event Vision",
            description: "Tell us your event type, guest count, budget, and dream vision. Our AI instantly understands your needs.",
            icon: "💭",
            color: "bg-gradient-to-br from-primary to-secondary",
            detail: "Wedding for 200? Birthday for 50? Corporate event? We've got you covered.",
            time: "2 minutes"
        },
        {
            number: "02", 
            title: "Get Your Custom Package",
            description: "Receive a tailored event package with all services bundled at the best price - saving you 40% on average.",
            icon: "📦",
            color: "bg-gradient-to-br from-secondary to-purple",
            detail: "Photography, catering, DJ, decoration - everything in one perfect package.",
            time: "Instant"
        },
        {
            number: "03",
            title: "Book with Confidence",
            description: "Review your package, make any adjustments, and book everything with one click. All vendors are pre-coordinated.",
            icon: "✅",
            color: "bg-gradient-to-br from-purple to-success",
            detail: "Secure payment, instant confirmation, and full insurance coverage included.",
            time: "5 minutes"
        },
        {
            number: "04",
            title: "Enjoy Your Perfect Event",
            description: "Relax while our professional team executes flawlessly. We handle everything so you can focus on what matters.",
            icon: "🎉",
            color: "bg-gradient-to-br from-success to-accent",
            detail: "24/7 support, real-time updates, and guaranteed satisfaction.",
            time: "Event day"
        }
    ];

    useEffect(() => {
        setIsVisible(true);
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % steps.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="py-20 bg-gradient-to-b from-light to-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-40 h-40 bg-primary/5 rounded-full animate-float"></div>
                <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/5 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
                <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-secondary/5 rounded-full animate-float" style={{animationDelay: '4s'}}></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className={`text-center mb-20 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
                    <div className="inline-block bg-primary/10 rounded-full px-6 py-2 mb-6">
                        <span className="text-primary font-semibold text-sm">⚡ SIMPLE & FAST PROCESS</span>
                    </div>
                    <h2 className="font-header text-text font-bold text-5xl md:text-6xl mb-6">
                        From Vision to Reality in 4 Steps
                    </h2>
                    <div className="w-32 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6"></div>
                    <p className="font-body text-text/70 text-xl max-w-4xl mx-auto leading-relaxed">
                        We've revolutionized event planning. No more juggling vendors, no more stress, no more overpaying. 
                        Just tell us your vision and watch the magic happen.
                    </p>
                </div>

                {/* Process Steps */}
                <div className="relative mb-20">
                    {/* Progress Line */}
                    <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gray-200 rounded-full">
                        <div 
                            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-2000 ease-out"
                            style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                        ></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <div 
                                key={index}
                                className={`relative group cursor-pointer transition-all duration-700 ${
                                    activeStep === index ? 'transform scale-105' : ''
                                } ${isVisible ? 'animate-bounce-in' : 'opacity-0'}`}
                                style={{animationDelay: `${index * 0.2}s`}}
                                onMouseEnter={() => setActiveStep(index)}
                            >
                                <div className={`relative z-10 text-center p-8 rounded-3xl transition-all duration-500 ${
                                    activeStep === index 
                                        ? 'bg-white shadow-2xl border-2 border-primary/20' 
                                        : 'bg-white/80 hover:bg-white hover:shadow-xl border-2 border-transparent'
                                }`}>
                                    {/* Step Circle */}
                                    <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-white font-bold text-2xl transition-all duration-500 relative ${
                                        activeStep === index ? step.color + ' animate-pulse-glow' : 'bg-neutral/30'
                                    }`}>
                                        {activeStep === index ? step.icon : step.number}
                                        
                                        {/* Time Badge */}
                                        <div className={`absolute -top-2 -right-2 bg-accent text-white text-xs font-bold px-2 py-1 rounded-full transition-all duration-300 ${
                                            activeStep === index ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                                        }`}>
                                            {step.time}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="font-header font-bold text-xl mb-4 text-text">
                                        {step.title}
                                    </h3>
                                    <p className="font-body text-text/70 text-sm leading-relaxed mb-4">
                                        {step.description}
                                    </p>
                                    
                                    {/* Detail Text */}
                                    <div className={`transition-all duration-500 ${
                                        activeStep === index ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0'
                                    }`}>
                                        <div className="bg-primary/5 rounded-xl p-3 text-xs text-primary font-medium">
                                            {step.detail}
                                        </div>
                                    </div>

                                    {/* Active Indicator */}
                                    {activeStep === index && (
                                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Success Stats */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-primary/10 mb-16">
                    <div className="text-center mb-8">
                        <h3 className="font-header font-bold text-3xl text-text mb-4">
                            Why 10,000+ Clients Choose Our Process
                        </h3>
                        <p className="text-neutral">Real results from real events across Kenya</p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="group">
                            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">⚡</div>
                            <div className="font-bold text-3xl text-primary mb-1">15min</div>
                            <div className="text-neutral text-sm">Average Planning Time</div>
                        </div>
                        <div className="group">
                            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">💰</div>
                            <div className="font-bold text-3xl text-primary mb-1">40%</div>
                            <div className="text-neutral text-sm">Average Savings</div>
                        </div>
                        <div className="group">
                            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🎯</div>
                            <div className="font-bold text-3xl text-primary mb-1">100%</div>
                            <div className="text-neutral text-sm">Success Rate</div>
                        </div>
                        <div className="group">
                            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">😊</div>
                            <div className="font-bold text-3xl text-primary mb-1">4.9/5</div>
                            <div className="text-neutral text-sm">Client Satisfaction</div>
                        </div>
                    </div>
                </div>

                {/* AI Assistant CTA */}
                <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 text-white text-center">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-6xl mb-6">🤖</div>
                        <h3 className="font-header font-bold text-3xl mb-4">
                            Ready to Start? Chat with Our AI Assistant
                        </h3>
                        <p className="text-white/90 text-lg mb-8 leading-relaxed">
                            Our intelligent assistant is available 24/7 to understand your vision, recommend the perfect package, 
                            and get your event planning started in under 2 minutes. No commitment required!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-white text-primary font-bold py-4 px-8 rounded-full text-lg hover:bg-accent hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg">
                                💬 Start Planning Now - It's Free!
                            </button>
                            <button className="border-2 border-white text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-white hover:text-primary transition-all duration-300 transform hover:scale-105">
                                📞 Call (0700) 123-456
                            </button>
                        </div>
                        
                        {/* Trust Indicators */}
                        <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-white/80 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="text-accent">✓</span>
                                <span>No Hidden Fees</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-accent">✓</span>
                                <span>Instant Quotes</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-accent">✓</span>
                                <span>Full Insurance</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-accent">✓</span>
                                <span>Money-Back Guarantee</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HowItWorks;
