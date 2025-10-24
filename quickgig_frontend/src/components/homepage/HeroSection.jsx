import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Button from '../common/Button';

const HeroSection = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-primary animate-gradient">
            {/* Floating Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-20 h-20 bg-accent rounded-full animate-float opacity-70"></div>
                <div className="absolute top-40 right-20 w-16 h-16 bg-secondary rounded-full animate-float opacity-60" style={{animationDelay: '2s'}}></div>
                <div className="absolute bottom-40 left-20 w-24 h-24 bg-purple rounded-full animate-float opacity-50" style={{animationDelay: '4s'}}></div>
                <div className="absolute bottom-20 right-10 w-18 h-18 bg-pink rounded-full animate-float opacity-80" style={{animationDelay: '1s'}}></div>
                
                {/* Event Icons */}
                <div className="absolute top-32 left-1/4 text-6xl animate-float opacity-30" style={{animationDelay: '3s'}}>🎵</div>
                <div className="absolute top-60 right-1/4 text-5xl animate-float opacity-40" style={{animationDelay: '1.5s'}}>📸</div>
                <div className="absolute bottom-32 left-1/3 text-7xl animate-float opacity-35" style={{animationDelay: '2.5s'}}>🎉</div>
                <div className="absolute bottom-60 right-1/3 text-6xl animate-float opacity-30" style={{animationDelay: '0.5s'}}>🎤</div>
            </div>

            {/* Main Content */}
            <div className={`relative z-10 text-center px-6 max-w-6xl mx-auto ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
                <div className="mb-8">
                    <h1 className="font-header font-bold text-7xl md:text-8xl lg:text-9xl text-white mb-6 leading-tight">
                        Events
                        <span className="text-accent animate-pulse-glow"> Safi</span>
                    </h1>
                    <div className="w-32 h-2 bg-accent mx-auto rounded-full mb-8 animate-pulse-glow"></div>
                </div>

                <h2 className="font-body text-white text-2xl md:text-3xl lg:text-4xl mb-8 font-medium leading-relaxed">
                    Complete Event Packages That 
                    <span className="text-accent font-bold"> Save You 40%</span>
                </h2>

                <p className="font-body text-white/90 text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
                    Stop juggling multiple vendors! Our all-inclusive packages deliver everything you need for weddings, birthdays, harambees, and corporate events at unbeatable prices.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                    <Link to="/services" className="group">
                        <button className="bg-white text-primary font-bold py-4 px-8 rounded-full text-lg hover:bg-accent hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl animate-bounce-in">
                            🎯 Find Event Services
                        </button>
                    </Link>
                    <Link to="/become-tasker" className="group">
                        <button className="border-2 border-white text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-white hover:text-primary transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl animate-bounce-in" style={{animationDelay: '0.2s'}}>
                            ⭐ Join as Provider
                        </button>
                    </Link>
                </div>

                {/* Package Preview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {[
                        { icon: '💒', title: 'Dream Weddings', price: 'From KSh 150K', color: 'bg-pink', popular: true },
                        { icon: '🎂', title: 'Birthday Parties', price: 'From KSh 35K', color: 'bg-purple', popular: false },
                        { icon: '🤝', title: 'Harambee Events', price: 'From KSh 45K', color: 'bg-secondary', popular: false }
                    ].map((pkg, index) => (
                        <div 
                            key={index}
                            className={`${pkg.color} rounded-3xl p-6 text-white transform hover:scale-105 transition-all duration-300 animate-bounce-in relative overflow-hidden`}
                            style={{animationDelay: `${0.4 + index * 0.1}s`}}
                        >
                            {pkg.popular && (
                                <div className="absolute top-2 right-2 bg-accent text-white px-2 py-1 rounded-full text-xs font-bold">
                                    🔥 Popular
                                </div>
                            )}
                            <div className="text-5xl mb-3">{pkg.icon}</div>
                            <div className="font-bold text-lg mb-1">{pkg.title}</div>
                            <div className="font-semibold text-sm opacity-90">{pkg.price}</div>
                            <div className="text-xs mt-2 opacity-75">Complete Package</div>
                        </div>
                    ))}
                </div>

                {/* Trust Indicators */}
                <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/80 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="text-accent">✓</span>
                        <span>10,000+ Happy Clients</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-accent">✓</span>
                        <span>100% Success Rate</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-accent">✓</span>
                        <span>Save 40% on Average</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-accent">✓</span>
                        <span>24hr Response Time</span>
                    </div>
                </div>
            </div>

            {/* Bottom Wave */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20 fill-white">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
                    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
                    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
                </svg>
            </div>
        </div>
    );
}

export default HeroSection;
