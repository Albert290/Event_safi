import { useState, useEffect } from 'react';

function About() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeValue, setActiveValue] = useState(0);

    const companyValues = [
        {
            icon: "🎯",
            title: "Excellence First",
            description: "We handpick only the best event professionals in Kenya, ensuring every service meets our rigorous quality standards."
        },
        {
            icon: "💰",
            title: "Transparent Pricing",
            description: "No hidden fees, no surprises. Our all-inclusive packages save you money while delivering premium results."
        },
        {
            icon: "🤝",
            title: "Trust & Reliability",
            description: "With 100% success rate and full insurance coverage, your event is in safe hands from planning to execution."
        },
        {
            icon: "⚡",
            title: "Innovation Driven",
            description: "Our AI-powered matching system and streamlined process revolutionize how events are planned in Kenya."
        }
    ];

    const teamMembers = [
        {
            name: "Teka",
            role: "Founder & CEO",
            image: "/images/team/Teka.jpeg",
            bio: "Visionary entrepreneur who saw the event planning problem during the hackathon and rallied the team to build the solution.",
            achievement: "Led team to victory & beyond"
        },
        {
            name: "Naommy",
            role: "Head of Finance",
            image: "/images/team/Naommy.jpeg",
            bio: "Financial strategist ensuring sustainable growth and transparent pricing that saves clients money while building a profitable business.",
            achievement: "40% average client savings"
        },
        {
            name: "Blessing",
            role: "Marketing Director",
            image: "/images/team/Blessing.jpeg",
            bio: "Creative marketing genius who crafts compelling campaigns and builds the Events-Safi brand across Kenya.",
            achievement: "10,000+ brand awareness"
        },
        {
            name: "Nick",
            role: "Lead Developer",
            image: "/images/team/Nick.jpeg",
            bio: "Technical mastermind behind our AI matching system and the seamless platform that powers every perfect event.",
            achievement: "99.9% platform uptime"
        },
        {
            name: "Albert",
            role: "Product Manager",
            image: "/images/team/Albert.jpeg",
            bio: "User experience expert who ensures every feature solves real problems and makes event planning effortless for our clients.",
            achievement: "4.9/5 user satisfaction"
        }
    ];

    const milestones = [
        { year: "2025", event: "Hackathon Victory", description: "Five strangers met at a hackathon and won with the Events-Safi concept" },
        { year: "2025", event: "Events-Safi Founded", description: "Turned hackathon idea into reality with our first event packages" },
        { year: "2025", event: "AI Assistant Launch", description: "Introduced intelligent event matching technology" },
        { year: "2025", event: "Rapid Growth", description: "Building Kenya's most trusted event planning platform" }
    ];

    useEffect(() => {
        setIsVisible(true);
        const interval = setInterval(() => {
            setActiveValue((prev) => (prev + 1) % companyValues.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-light to-white">
            {/* Hero Section */}
            <div className="relative py-20 bg-gradient-to-r from-primary to-secondary text-white overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
                    <div className="absolute bottom-10 right-10 w-24 h-24 bg-accent/20 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
                    <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/5 rounded-full animate-float" style={{animationDelay: '4s'}}></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className={`text-center ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
                        <div className="text-8xl mb-6">🎉</div>
                        <h1 className="font-header text-5xl md:text-7xl font-bold mb-6">
                            About Events<span className="text-accent">-Safi</span>
                        </h1>
                        <p className="font-body text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
                            We're revolutionizing event planning in Kenya by making it simple, affordable, and stress-free. 
                            No more vendor chaos - just perfect events, every time.
                        </p>
                    </div>
                </div>
            </div>

            {/* Origin Story */}
            <div className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-block bg-primary/10 rounded-full px-6 py-2 mb-6">
                            <span className="text-primary font-semibold text-sm">💡 OUR ORIGIN STORY</span>
                        </div>
                        <h2 className="font-header text-4xl md:text-5xl font-bold text-text mb-6">
                            From Hackathon to Revolution
                        </h2>
                        <p className="font-body text-text/70 text-xl max-w-4xl mx-auto leading-relaxed">
                            Five strangers, one weekend, and a shared frustration that changed everything
                        </p>
                    </div>

                    <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-8 md:p-12 mb-16">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="text-8xl mb-6">🏆</div>
                                <h3 className="font-header text-3xl font-bold text-text mb-6">
                                    The Hackathon That Started It All
                                </h3>
                                <p className="font-body text-text/70 text-lg leading-relaxed mb-6">
                                    In 2025, at a tech hackathon in Nairobi, five complete strangers - Teka, Naommy, Blessing, 
                                    Nich, and Albert - were randomly grouped together. Each had experienced the nightmare of 
                                    planning events in Kenya: endless calls, price haggling, vendor coordination chaos.
                                </p>
                                <p className="font-body text-text/70 text-lg leading-relaxed mb-6">
                                    Instead of building another app, we decided to solve a real problem. In 48 hours, we 
                                    prototyped Events-Safi - a platform that bundles event services into simple packages. 
                                    We won first place, but more importantly, we found our mission.
                                </p>
                                <div className="bg-white rounded-2xl p-6 shadow-lg">
                                    <div className="text-center">
                                        <div className="font-bold text-2xl text-primary mb-2">🥇 First Place Winner</div>
                                        <div className="text-sm text-neutral">
                                            "Most Innovative Solution for Real-World Problems"
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white rounded-2xl p-6 shadow-lg">
                                    <h4 className="font-bold text-lg text-text mb-3">The Problem We Identified</h4>
                                    <ul className="space-y-2 text-sm text-text/70">
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-500">❌</span>
                                            <span>Event planning took weeks of vendor coordination</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-500">❌</span>
                                            <span>Clients overpaid due to lack of transparency</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-500">❌</span>
                                            <span>Quality was inconsistent and unreliable</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-red-500">❌</span>
                                            <span>No single point of accountability</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-white rounded-2xl p-6 shadow-lg">
                                    <h4 className="font-bold text-lg text-text mb-3">Our Solution</h4>
                                    <ul className="space-y-2 text-sm text-text/70">
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-500">✅</span>
                                            <span>All-inclusive packages planned in minutes</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-500">✅</span>
                                            <span>Transparent pricing with 40% average savings</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-500">✅</span>
                                            <span>Curated, verified service providers</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-500">✅</span>
                                            <span>Single platform, full accountability</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mission & Vision */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className={`${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
                            <div className="inline-block bg-primary/10 rounded-full px-6 py-2 mb-6">
                                <span className="text-primary font-semibold text-sm">🚀 OUR MISSION</span>
                            </div>
                            <h2 className="font-header text-4xl font-bold text-text mb-6">
                                Making Every Event Extraordinary
                            </h2>
                            <p className="font-body text-text/70 text-lg leading-relaxed mb-8">
                                We believe every Kenyan deserves access to professional event services without the hassle of 
                                coordinating multiple vendors. Our mission is to bundle the best photographers, DJs, caterers, 
                                and decorators into seamless packages that save you time, money, and stress.
                            </p>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="text-center p-4 bg-white rounded-2xl shadow-lg">
                                    <div className="text-3xl font-bold text-primary mb-1">Growing</div>
                                    <div className="text-sm text-neutral">Fast</div>
                                </div>
                                <div className="text-center p-4 bg-white rounded-2xl shadow-lg">
                                    <div className="text-3xl font-bold text-primary mb-1">100%</div>
                                    <div className="text-sm text-neutral">Success Rate</div>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-primary/10">
                                <div className="text-center mb-6">
                                    <div className="text-6xl mb-4">🎯</div>
                                    <h3 className="font-header text-2xl font-bold text-text mb-4">Our Vision</h3>
                                </div>
                                <p className="font-body text-text/70 text-center leading-relaxed mb-6">
                                    From a hackathon idea to transforming Kenya's event industry - we're building 
                                    Africa's leading event planning platform where anyone can create unforgettable 
                                    celebrations with just a few clicks.
                                </p>
                                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6">
                                    <div className="text-center">
                                        <div className="font-bold text-lg text-text mb-2">"Safi" means "Clean" in Swahili</div>
                                        <div className="text-sm text-neutral">
                                            We deliver clean, seamless, and beautiful event experiences
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Company Values */}
            <div className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-block bg-primary/10 rounded-full px-6 py-2 mb-6">
                            <span className="text-primary font-semibold text-sm">💎 OUR VALUES</span>
                        </div>
                        <h2 className="font-header text-4xl md:text-5xl font-bold text-text mb-6">
                            What Drives Us Every Day
                        </h2>
                        <p className="font-body text-text/70 text-xl max-w-3xl mx-auto">
                            These core values guide every decision we make and every service we deliver
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {companyValues.map((value, index) => (
                            <div 
                                key={index}
                                className={`group text-center p-8 rounded-3xl transition-all duration-500 cursor-pointer ${
                                    activeValue === index 
                                        ? 'bg-gradient-to-br from-primary to-secondary text-white shadow-2xl transform scale-105' 
                                        : 'bg-light hover:bg-white hover:shadow-xl'
                                }`}
                                onMouseEnter={() => setActiveValue(index)}
                            >
                                <div className={`text-6xl mb-6 transition-transform duration-300 ${
                                    activeValue === index ? 'scale-110' : 'group-hover:scale-110'
                                }`}>
                                    {value.icon}
                                </div>
                                <h3 className={`font-header font-bold text-xl mb-4 ${
                                    activeValue === index ? 'text-white' : 'text-text'
                                }`}>
                                    {value.title}
                                </h3>
                                <p className={`font-body text-sm leading-relaxed ${
                                    activeValue === index ? 'text-white/90' : 'text-text/70'
                                }`}>
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="py-20 bg-gradient-to-b from-light to-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-block bg-primary/10 rounded-full px-6 py-2 mb-6">
                            <span className="text-primary font-semibold text-sm">👥 MEET THE TEAM</span>
                        </div>
                        <h2 className="font-header text-4xl md:text-5xl font-bold text-text mb-6">
                            The People Behind the Magic
                        </h2>
                        <p className="font-body text-text/70 text-xl max-w-3xl mx-auto">
                            Our passionate team combines years of event expertise with cutting-edge technology
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
                        {teamMembers.map((member, index) => (
                            <div 
                                key={index}
                                className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-primary/10"
                            >
                                <div className="text-center">
                                    <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary/20 group-hover:border-primary/40 transition-all duration-300">
                                        <img 
                                            src={member.image} 
                                            alt={`${member.name} - ${member.role}`}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            onError={(e) => {
                                                // Fallback to emoji if image fails to load
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'flex';
                                            }}
                                        />
                                        <div className="w-full h-full bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-4xl text-white" style={{display: 'none'}}>
                                            {member.name.charAt(0).toUpperCase()}
                                        </div>
                                    </div>
                                    <h3 className="font-header font-bold text-xl text-text mb-2">
                                        {member.name}
                                    </h3>
                                    <div className="text-primary font-semibold mb-4">{member.role}</div>
                                    <p className="font-body text-text/70 text-sm leading-relaxed mb-6">
                                        {member.bio}
                                    </p>
                                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-3">
                                        <div className="text-xs font-semibold text-primary">
                                            {member.achievement}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Journey Timeline */}
            <div className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-block bg-primary/10 rounded-full px-6 py-2 mb-6">
                            <span className="text-primary font-semibold text-sm">📈 OUR JOURNEY</span>
                        </div>
                        <h2 className="font-header text-4xl md:text-5xl font-bold text-text mb-6">
                            From Startup to Success
                        </h2>
                        <p className="font-body text-text/70 text-xl max-w-3xl mx-auto">
                            Every milestone represents thousands of happy clients and perfect events
                        </p>
                    </div>

                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-secondary rounded-full"></div>

                        <div className="space-y-12">
                            {milestones.map((milestone, index) => (
                                <div 
                                    key={index}
                                    className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                                >
                                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-primary/10 hover:shadow-xl transition-shadow">
                                            <div className="text-primary font-bold text-lg mb-2">{milestone.year}</div>
                                            <h3 className="font-header font-bold text-xl text-text mb-3">
                                                {milestone.event}
                                            </h3>
                                            <p className="font-body text-text/70 text-sm">
                                                {milestone.description}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {/* Timeline Dot */}
                                    <div className="relative z-10 w-6 h-6 bg-gradient-to-r from-primary to-secondary rounded-full border-4 border-white shadow-lg"></div>
                                    
                                    <div className="w-1/2"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="text-6xl mb-6">🚀</div>
                    <h2 className="font-header text-4xl md:text-5xl font-bold mb-6">
                        Ready to Join Our Success Story?
                    </h2>
                    <p className="font-body text-xl text-white/90 mb-8 leading-relaxed">
                        Whether you're planning your dream wedding or organizing a corporate event, 
                        we're here to make it extraordinary. Join 10,000+ satisfied clients who chose Events-Safi.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-primary font-bold py-4 px-8 rounded-full text-lg hover:bg-accent hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg">
                            💬 Start Planning Your Event
                        </button>
                        <button className="border-2 border-white text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-white hover:text-primary transition-all duration-300 transform hover:scale-105">
                            📞 Call (0700) 123-456
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
