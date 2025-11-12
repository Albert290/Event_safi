import { useState, useEffect } from "react";
import { Star, CheckCircle, ArrowRight, Phone, MessageCircle, Calculator, Zap, Target, Send, X, ShoppingCart } from "lucide-react";
import ServiceBooking from "../components/ServiceBooking";

export default function Services() {
  const [selectedEvent, setSelectedEvent] = useState('wedding');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [showAIChat, setShowAIChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState('planning'); // 'planning' or 'booking'

  const eventTypes = [
    {
      id: 'wedding',
      name: "Wedding Celebrations",
      icon: "💒",
      tagline: "Your Perfect Day, Tailored to Your Budget",
      description: "From intimate ceremonies to grand celebrations - we optimize every shilling to create your dream wedding.",
      minBudget: 40000,
      maxBudget: 500000,
      avgGuests: "50-300 guests",
      popular: true,
      budgetTiers: [
        {
          range: "KSh 40,000 - 80,000",
          title: "Intimate Wedding",
          guests: "30-80 guests",
          allocation: {
            "Photography": "25%",
            "Catering": "40%",
            "DJ & Sound": "20%",
            "Decoration": "10%",
            "Coordination": "5%"
          },
          includes: ["Basic photography", "Simple catering", "DJ with sound system", "Basic decorations", "Day coordination"]
        },
        {
          range: "KSh 80,000 - 150,000",
          title: "Classic Wedding",
          guests: "80-150 guests",
          allocation: {
            "Photography & Video": "30%",
            "Catering": "35%",
            "DJ & Sound": "15%",
            "Decoration & Flowers": "15%",
            "Coordination": "5%"
          },
          includes: ["Professional photography + videography", "Quality catering", "Premium DJ", "Elegant decorations", "Full coordination"]
        },
        {
          range: "KSh 150,000 - 300,000",
          title: "Premium Wedding",
          guests: "150-250 guests",
          allocation: {
            "Photography & Video": "25%",
            "Catering": "35%",
            "Entertainment": "20%",
            "Decoration & Flowers": "15%",
            "Coordination & Extras": "5%"
          },
          includes: ["Cinematic videography", "Gourmet catering", "Live band + DJ", "Luxury decorations", "Full-service coordination"]
        },
        {
          range: "KSh 300,000+",
          title: "Luxury Wedding",
          guests: "250+ guests",
          allocation: {
            "Photography & Video": "20%",
            "Catering": "30%",
            "Entertainment": "25%",
            "Decoration & Design": "20%",
            "Premium Services": "5%"
          },
          includes: ["Award-winning photographers", "Celebrity chef catering", "Live entertainment", "Designer decorations", "Luxury coordination"]
        }
      ]
    },
    {
      id: 'birthday',
      name: "Birthday Celebrations",
      icon: "🎂",
      tagline: "Make Every Year Count Within Your Budget",
      description: "From kids' parties to milestone birthdays - we create magical celebrations that fit your budget perfectly.",
      minBudget: 15000,
      maxBudget: 100000,
      avgGuests: "20-100 guests",
      popular: false,
      budgetTiers: [
        {
          range: "KSh 15,000 - 30,000",
          title: "Fun Birthday Party",
          guests: "15-30 guests",
          allocation: {
            "Entertainment": "30%",
            "Catering & Cake": "40%",
            "Decorations": "20%",
            "Photography": "10%"
          },
          includes: ["DJ with games", "Birthday catering + cake", "Themed decorations", "Basic photography"]
        },
        {
          range: "KSh 30,000 - 60,000",
          title: "Premium Birthday",
          guests: "30-60 guests",
          allocation: {
            "Entertainment": "35%",
            "Catering & Cake": "35%",
            "Decorations": "20%",
            "Photography": "10%"
          },
          includes: ["Professional entertainer", "Premium catering", "Custom decorations", "Professional photography"]
        },
        {
          range: "KSh 60,000+",
          title: "Luxury Birthday",
          guests: "60+ guests",
          allocation: {
            "Entertainment": "40%",
            "Catering & Cake": "30%",
            "Decorations & Setup": "20%",
            "Photography & Extras": "10%"
          },
          includes: ["Live entertainment", "Gourmet catering", "Designer decorations", "Full photography package"]
        }
      ]
    },
    {
      id: 'harambee',
      name: "Harambee Events",
      icon: "🤝",
      tagline: "Unity in Purpose, Budget-Optimized Execution",
      description: "Successful fundraising events that inspire generosity while maximizing your organizational budget.",
      minBudget: 25000,
      maxBudget: 150000,
      avgGuests: "100-500 guests",
      popular: false,
      budgetTiers: [
        {
          range: "KSh 25,000 - 50,000",
          title: "Community Harambee",
          guests: "50-150 guests",
          allocation: {
            "MC & Coordination": "25%",
            "Sound System": "20%",
            "Catering": "40%",
            "Setup & Security": "15%"
          },
          includes: ["Experienced MC", "Quality sound system", "Community catering", "Basic setup"]
        },
        {
          range: "KSh 50,000 - 100,000",
          title: "Professional Harambee",
          guests: "150-300 guests",
          allocation: {
            "MC & Coordination": "20%",
            "Sound & AV": "25%",
            "Catering": "35%",
            "Setup & Security": "20%"
          },
          includes: ["Professional MC", "Premium AV setup", "Quality catering", "Full setup & security"]
        },
        {
          range: "KSh 100,000+",
          title: "Premium Harambee",
          guests: "300+ guests",
          allocation: {
            "MC & Entertainment": "25%",
            "Sound & AV": "20%",
            "Catering": "30%",
            "Setup, Security & Extras": "25%"
          },
          includes: ["Celebrity MC", "Professional AV", "Premium catering", "Full-service coordination"]
        }
      ]
    },
    {
      id: 'corporate',
      name: "Corporate Events",
      icon: "🏢",
      tagline: "Professional Excellence Within Budget",
      description: "Impress clients and motivate teams with corporate events optimized for maximum impact within your budget.",
      minBudget: 50000,
      maxBudget: 300000,
      avgGuests: "30-200 guests",
      popular: false,
      budgetTiers: [
        {
          range: "KSh 50,000 - 100,000",
          title: "Business Meeting",
          guests: "20-50 guests",
          allocation: {
            "AV Equipment": "30%",
            "Catering": "40%",
            "Venue Setup": "20%",
            "Coordination": "10%"
          },
          includes: ["Basic AV setup", "Business catering", "Professional setup", "Event coordination"]
        },
        {
          range: "KSh 100,000 - 200,000",
          title: "Corporate Conference",
          guests: "50-120 guests",
          allocation: {
            "AV & Technology": "35%",
            "Catering": "35%",
            "Setup & Branding": "20%",
            "Coordination": "10%"
          },
          includes: ["Premium AV", "Executive catering", "Branded setup", "Full coordination"]
        },
        {
          range: "KSh 200,000+",
          title: "Executive Event",
          guests: "120+ guests",
          allocation: {
            "Technology & AV": "30%",
            "Premium Catering": "40%",
            "Branding & Setup": "20%",
            "Premium Services": "10%"
          },
          includes: ["State-of-art AV", "Luxury catering", "Executive branding", "VIP coordination"]
        }
      ]
    }
  ];

  // Initialize AI chat
  useEffect(() => {
    if (showAIChat && chatMessages.length === 0) {
      setChatMessages([{
        type: 'bot',
        message: "🎉 Hi! I'm your Events-Safi budget optimizer!\n\nI'll help you get the maximum value from your budget. Tell me:\n\n1️⃣ What event are you planning?\n2️⃣ How many guests?\n3️⃣ What's your total budget?\n\nI'll instantly show you the best allocation and what's possible! 💰✨",
        timestamp: new Date()
      }]);
    }
  }, [showAIChat, chatMessages.length]);

  const generateAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    // Extract budget if mentioned
    const budgetMatch = userMessage.match(/(\d+,?\d*)/);
    const budget = budgetMatch ? parseInt(budgetMatch[1].replace(',', '')) : null;

    if (lowerMessage.includes('wedding') && budget) {
      if (budget < 40000) {
        return `💒 For a wedding with KSh ${budget.toLocaleString()}, you'll need at least KSh 40,000 for a basic ceremony.\n\n💡 **Recommendation**: Add KSh ${(40000 - budget).toLocaleString()} more for:\n• Basic photography (KSh 10,000)\n• Simple catering (KSh 16,000)\n• DJ & sound (KSh 8,000)\n• Basic decorations (KSh 4,000)\n• Coordination (KSh 2,000)\n\n🎯 **Alternative**: Consider a smaller guest list (20-30 people) to fit your current budget!`;
      } else if (budget <= 80000) {
        return `💒 **Perfect! Here's your KSh ${budget.toLocaleString()} wedding breakdown:**\n\n💰 **Budget Allocation:**\n• Photography: KSh ${Math.round(budget * 0.25).toLocaleString()} (25%)\n• Catering: KSh ${Math.round(budget * 0.40).toLocaleString()} (40%)\n• DJ & Sound: KSh ${Math.round(budget * 0.20).toLocaleString()} (20%)\n• Decorations: KSh ${Math.round(budget * 0.10).toLocaleString()} (10%)\n• Coordination: KSh ${Math.round(budget * 0.05).toLocaleString()} (5%)\n\n🎉 **You'll get**: Intimate wedding for 30-80 guests with professional photography, quality catering, and beautiful setup!\n\n✅ Ready to book? This budget works perfectly!`;
      } else if (budget <= 150000) {
        return `💒 **Excellent budget! Here's your KSh ${budget.toLocaleString()} premium wedding:**\n\n💰 **Optimized Allocation:**\n• Photography & Video: KSh ${Math.round(budget * 0.30).toLocaleString()} (30%)\n• Catering: KSh ${Math.round(budget * 0.35).toLocaleString()} (35%)\n• DJ & Sound: KSh ${Math.round(budget * 0.15).toLocaleString()} (15%)\n• Decorations: KSh ${Math.round(budget * 0.15).toLocaleString()} (15%)\n• Coordination: KSh ${Math.round(budget * 0.05).toLocaleString()} (5%)\n\n🌟 **You'll get**: Classic wedding for 80-150 guests with videography, premium catering, elegant decorations!\n\n🚀 This is our sweet spot for amazing weddings!`;
      } else {
        return `💒 **WOW! Luxury wedding with KSh ${budget.toLocaleString()}:**\n\n💎 **Premium Allocation:**\n• Photography & Video: KSh ${Math.round(budget * 0.25).toLocaleString()} (25%)\n• Gourmet Catering: KSh ${Math.round(budget * 0.35).toLocaleString()} (35%)\n• Live Entertainment: KSh ${Math.round(budget * 0.20).toLocaleString()} (20%)\n• Designer Decorations: KSh ${Math.round(budget * 0.15).toLocaleString()} (15%)\n• Premium Services: KSh ${Math.round(budget * 0.05).toLocaleString()} (5%)\n\n✨ **You'll get**: Luxury wedding for 150+ guests with cinematic videography, celebrity chef catering, live band + DJ, designer florals!\n\n👑 This will be absolutely spectacular!`;
      }
    }

    if (lowerMessage.includes('birthday') && budget) {
      if (budget < 15000) {
        return `🎂 For a birthday party with KSh ${budget.toLocaleString()}, you'll need at least KSh 15,000.\n\n💡 **Add KSh ${(15000 - budget).toLocaleString()} more for:**\n• Entertainment: KSh 4,500\n• Catering & Cake: KSh 6,000\n• Decorations: KSh 3,000\n• Photography: KSh 1,500\n\n🎈 **Alternative**: Home party with DIY decorations and homemade cake for your current budget!`;
      } else if (budget <= 30000) {
        return `🎂 **Great! Here's your KSh ${budget.toLocaleString()} birthday party:**\n\n🎉 **Budget Breakdown:**\n• Entertainment: KSh ${Math.round(budget * 0.30).toLocaleString()} (30%)\n• Catering & Cake: KSh ${Math.round(budget * 0.40).toLocaleString()} (40%)\n• Decorations: KSh ${Math.round(budget * 0.20).toLocaleString()} (20%)\n• Photography: KSh ${Math.round(budget * 0.10).toLocaleString()} (10%)\n\n🎈 **Perfect for**: 15-30 guests with DJ, themed decorations, birthday catering, and photo memories!\n\n✅ This budget creates amazing birthday memories!`;
      } else {
        return `🎂 **Fantastic! Premium birthday with KSh ${budget.toLocaleString()}:**\n\n🌟 **Premium Allocation:**\n• Professional Entertainment: KSh ${Math.round(budget * 0.35).toLocaleString()} (35%)\n• Gourmet Catering: KSh ${Math.round(budget * 0.35).toLocaleString()} (35%)\n• Custom Decorations: KSh ${Math.round(budget * 0.20).toLocaleString()} (20%)\n• Photography Package: KSh ${Math.round(budget * 0.10).toLocaleString()} (10%)\n\n🎊 **You'll get**: Premium party for 30+ guests with live entertainment, custom decorations, professional photography!\n\n🚀 This will be an unforgettable celebration!`;
      }
    }

    if (lowerMessage.includes('harambee') && budget) {
      if (budget < 25000) {
        return `🤝 For a harambee with KSh ${budget.toLocaleString()}, minimum needed is KSh 25,000.\n\n💡 **Add KSh ${(25000 - budget).toLocaleString()} for basic harambee:**\n• MC & Coordination: KSh 6,250\n• Sound System: KSh 5,000\n• Community Catering: KSh 10,000\n• Setup & Security: KSh 3,750\n\n🎯 **Alternative**: Smaller community gathering (30-50 people) with your current budget!`;
      } else {
        return `🤝 **Perfect harambee budget of KSh ${budget.toLocaleString()}!**\n\n💰 **Strategic Allocation:**\n• MC & Coordination: KSh ${Math.round(budget * 0.25).toLocaleString()} (25%)\n• Sound System: KSh ${Math.round(budget * 0.20).toLocaleString()} (20%)\n• Community Catering: KSh ${Math.round(budget * 0.40).toLocaleString()} (40%)\n• Setup & Security: KSh ${Math.round(budget * 0.15).toLocaleString()} (15%)\n\n🎯 **Expected outcome**: Well-organized harambee for ${budget >= 50000 ? '150-300' : '50-150'} guests that inspires generous giving!\n\n✅ This budget ensures fundraising success!`;
      }
    }

    if (lowerMessage.includes('corporate') && budget) {
      if (budget < 50000) {
        return `🏢 For corporate events, minimum budget is KSh 50,000.\n\n💡 **Add KSh ${(50000 - budget).toLocaleString()} for professional corporate event:**\n• AV Equipment: KSh 15,000\n• Business Catering: KSh 20,000\n• Professional Setup: KSh 10,000\n• Coordination: KSh 5,000\n\n🎯 **Alternative**: Small team meeting (10-15 people) with your current budget!`;
      } else {
        return `🏢 **Excellent corporate budget of KSh ${budget.toLocaleString()}!**\n\n💼 **Professional Allocation:**\n• AV & Technology: KSh ${Math.round(budget * 0.30).toLocaleString()} (30%)\n• Executive Catering: KSh ${Math.round(budget * 0.40).toLocaleString()} (40%)\n• Branding & Setup: KSh ${Math.round(budget * 0.20).toLocaleString()} (20%)\n• Coordination: KSh ${Math.round(budget * 0.10).toLocaleString()} (10%)\n\n🌟 **You'll get**: Professional ${budget >= 100000 ? 'conference' : 'business meeting'} for ${budget >= 200000 ? '120+' : budget >= 100000 ? '50-120' : '20-50'} guests with premium AV and executive catering!\n\n🚀 This will impress your clients and team!`;
      }
    }

    return "🎉 I'd love to help optimize your budget! Please tell me:\n\n1️⃣ **Event type** (wedding, birthday, harambee, corporate)\n2️⃣ **Number of guests**\n3️⃣ **Your total budget** (e.g., KSh 80,000)\n\nI'll instantly show you the best allocation and what amazing event you can create! 💰✨";
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage = {
      type: 'user',
      message: chatInput,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        message: generateAIResponse(chatInput),
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const selectedEventData = eventTypes.find(event => event.id === selectedEvent);

  const handleGetQuote = (eventType) => {
    setShowAIChat(true);
    setChatMessages([{
      type: 'bot',
      message: `🎉 Perfect! You're interested in ${eventType}.\n\nTo give you the most accurate budget breakdown, please tell me:\n\n1️⃣ How many guests?\n2️⃣ What's your total budget?\n3️⃣ Any specific requirements?\n\nI'll optimize every shilling for maximum impact! 💰✨`,
      timestamp: new Date()
    }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-light to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-16 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-accent/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/5 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="text-6xl mb-6">💰</div>
          <h1 className="font-header text-5xl md:text-6xl font-bold mb-6">
            Budget-First Event Planning
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-90">
            Tell us your budget, we'll optimize every shilling. No fixed packages - just maximum value for YOUR money.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm mb-8">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              <span>Budget-optimized allocation</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              <span>Maximum value guaranteed</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              <span>AI-powered matching</span>
            </div>
          </div>

          <button
            onClick={() => setShowAIChat(true)}
            className="bg-white text-primary font-bold py-4 px-8 rounded-full text-lg hover:bg-accent hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            🤖 Chat with Budget AI - Get Instant Breakdown
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Tab Navigation */}
        <div className="mb-12">
          <div className="flex justify-center">
            <div className="bg-white rounded-full p-2 shadow-lg">
              <button
                onClick={() => setActiveTab('planning')}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${activeTab === 'planning'
                  ? 'bg-primary text-white shadow-md'
                  : 'text-primary hover:bg-primary/10'
                  }`}
              >
                <Calculator className="w-5 h-5 inline mr-2" />
                Budget Planning
              </button>
              <button
                onClick={() => setActiveTab('booking')}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${activeTab === 'booking'
                  ? 'bg-primary text-white shadow-md'
                  : 'text-primary hover:bg-primary/10'
                  }`}
              >
                <ShoppingCart className="w-5 h-5 inline mr-2" />
                Book Services
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'planning' ? (
          <>
            {/* Event Type Selector */}
            <div className="mb-16">
              <div className="text-center mb-12">
                <div className="inline-block bg-primary/10 rounded-full px-6 py-2 mb-6">
                  <span className="text-primary font-semibold text-sm">💡 BUDGET-SMART PLANNING</span>
                </div>
                <h2 className="font-header text-4xl md:text-5xl font-bold text-text mb-6">
                  What Event Are You Planning?
                </h2>
                <p className="font-body text-text/70 text-xl max-w-3xl mx-auto">
                  Select your event type to see how we optimize budgets at every level
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {eventTypes.map((event) => (
                  <button
                    key={event.id}
                    onClick={() => setSelectedEvent(event.id)}
                    className={`group text-left p-8 rounded-3xl transition-all duration-500 transform hover:scale-105 ${selectedEvent === event.id
                      ? 'bg-gradient-to-br from-primary to-secondary text-white shadow-2xl'
                      : 'bg-white hover:bg-primary/5 border-2 border-primary/10 hover:border-primary/30 shadow-lg hover:shadow-xl'
                      }`}
                  >
                    {event.popular && (
                      <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold">
                        🔥 Popular
                      </div>
                    )}

                    <div className={`text-6xl mb-4 transition-transform duration-300 ${selectedEvent === event.id ? 'scale-110' : 'group-hover:scale-110'
                      }`}>
                      {event.icon}
                    </div>

                    <h3 className={`font-header text-2xl font-bold mb-3 ${selectedEvent === event.id ? 'text-white' : 'text-text'
                      }`}>
                      {event.name}
                    </h3>

                    <p className={`font-semibold mb-3 ${selectedEvent === event.id ? 'text-accent' : 'text-primary'
                      }`}>
                      {event.tagline}
                    </p>

                    <p className={`text-sm leading-relaxed mb-4 ${selectedEvent === event.id ? 'text-white/90' : 'text-text/70'
                      }`}>
                      {event.description}
                    </p>

                    <div className={`text-sm ${selectedEvent === event.id ? 'text-white/80' : 'text-neutral'
                      }`}>
                      <div className="flex justify-between items-center">
                        <span>Budget Range:</span>
                        <span className="font-semibold">
                          KSh {event.minBudget.toLocaleString()} - {event.maxBudget.toLocaleString()}+
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span>Typical Size:</span>
                        <span className="font-semibold">{event.avgGuests}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Tiers for Selected Event */}
            {selectedEventData && (
              <div className="mb-16">
                <div className="text-center mb-12">
                  <h3 className="font-header text-4xl font-bold text-text mb-4">
                    {selectedEventData.name} Budget Options
                  </h3>
                  <p className="font-body text-text/70 text-lg">
                    See exactly how we optimize your budget at every level
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {selectedEventData.budgetTiers.map((tier, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-primary/10"
                    >
                      <div className="text-center mb-6">
                        <div className="text-4xl mb-4">{selectedEventData.icon}</div>
                        <h4 className="font-header text-xl font-bold text-text mb-2">
                          {tier.title}
                        </h4>
                        <div className="text-primary font-bold text-lg mb-2">
                          {tier.range}
                        </div>
                        <div className="text-neutral text-sm">
                          {tier.guests}
                        </div>
                      </div>

                      {/* Budget Allocation */}
                      <div className="mb-6">
                        <h5 className="font-semibold text-text mb-3">Budget Allocation:</h5>
                        <div className="space-y-2">
                          {Object.entries(tier.allocation).map(([service, percentage]) => (
                            <div key={service} className="flex justify-between items-center text-sm">
                              <span className="text-neutral">{service}</span>
                              <span className="font-semibold text-primary">{percentage}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* What's Included */}
                      <div className="mb-6">
                        <h5 className="font-semibold text-text mb-3">What You Get:</h5>
                        <div className="space-y-2">
                          {tier.includes.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                              <span className="text-xs text-neutral">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => handleGetQuote(selectedEventData.name)}
                        className="w-full bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-secondary transition-all duration-300 transform hover:scale-105 text-sm"
                      >
                        Get This Budget Plan
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Budget Optimizer CTA */}
            <div className="mt-16 bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 text-white text-center">
              <div className="text-6xl mb-6">🤖</div>
              <h3 className="font-header text-3xl font-bold mb-4">
                Get Instant Budget Breakdown with AI
              </h3>
              <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
                Our AI Budget Optimizer analyzes your requirements and shows exactly how to maximize your event budget.
                Get personalized recommendations in seconds!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setShowAIChat(true)}
                  className="bg-white text-primary font-bold py-4 px-8 rounded-full hover:bg-accent hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat with Budget AI
                </button>
                <button className="border-2 border-white text-white font-bold py-4 px-8 rounded-full hover:bg-white hover:text-primary transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  Call (0700) 123-456
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Booking Tab Content */
          <ServiceBooking />
        )}
      </div>

      {/* AI Chat Interface */}
      {showAIChat && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 rounded-t-3xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                  🤖
                </div>
                <div>
                  <h3 className="font-bold text-xl">AI Budget Optimizer</h3>
                  <p className="text-white/80 text-sm">Maximizing your event budget</p>
                </div>
              </div>
              <button
                onClick={() => setShowAIChat(false)}
                className="hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl ${msg.type === 'user'
                    ? 'bg-primary text-white rounded-br-md'
                    : 'bg-light text-text rounded-bl-md'
                    }`}>
                    <p className="text-sm whitespace-pre-line">{msg.message}</p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-light text-text p-4 rounded-2xl rounded-bl-md">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-6 border-t border-light">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Tell me your event type, guest count, and budget..."
                  className="flex-1 p-4 border-2 border-primary/20 rounded-xl focus:outline-none focus:border-primary text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-primary text-white p-4 rounded-xl hover:bg-secondary transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {['Wedding KSh 100,000', 'Birthday KSh 40,000', 'Harambee KSh 60,000', 'Corporate KSh 80,000'].map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setChatInput(suggestion)}
                    className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full hover:bg-primary/20 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}