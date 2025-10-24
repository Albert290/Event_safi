// Event packages with tiered pricing based on budget
export const eventPackages = {
    wedding: {
        name: 'Wedding',
        emoji: '💒',
        tiers: {
            basic: {
                name: 'Basic Wedding',
                price: 50000,
                features: [
                    '✅ Basic Photography',
                    '✅ DJ Service',
                    '✅ Simple Decorations',
                    '✅ Catering (Basic)',
                    '✅ MC Service'
                ],
                description: 'Perfect for intimate ceremonies and budget-conscious couples'
            },
            standard: {
                name: 'Standard Wedding',
                price: 100000,
                features: [
                    '✅ Professional Photography & Videography',
                    '✅ Premium DJ & Sound',
                    '✅ Elegant Decorations & Flowers',
                    '✅ Gourmet Catering',
                    '✅ Master of Ceremonies',
                    '✅ Basic Transport'
                ],
                description: 'Most popular choice - great value and quality'
            },
            premium: {
                name: 'Dream Wedding',
                price: 150000,
                features: [
                    '✅ Professional Photography & Videography',
                    '✅ Live DJ & Premium Sound',
                    '✅ Elegant Decorations & Premium Flowers',
                    '✅ Gourmet Multi-Course Catering',
                    '✅ Master of Ceremonies',
                    '✅ Premium Bridal Transport',
                    '✅ Decoration & Setup',
                    '✅ Coordination & Planning'
                ],
                description: 'Complete luxury experience for your special day'
            }
        }
    },
    birthday: {
        name: 'Birthday Party',
        emoji: '🎂',
        tiers: {
            basic: {
                name: 'Basic Birthday',
                price: 15000,
                features: [
                    '✅ Basic Decorations',
                    '✅ Music/DJ (Portable)',
                    '✅ Simple Catering',
                    '✅ Cake Coordination'
                ],
                description: 'Simple and fun birthday celebration'
            },
            standard: {
                name: 'Birthday Celebration',
                price: 35000,
                features: [
                    '✅ Event Photography',
                    '✅ Professional DJ & Entertainment',
                    '✅ Custom Decorations',
                    '✅ Delicious Catering',
                    '✅ Party Games & Activities',
                    '✅ Cake Coordination'
                ],
                description: 'Popular package with games and entertainment'
            },
            premium: {
                name: 'Premium Birthday Bash',
                price: 60000,
                features: [
                    '✅ Professional Photography & Videography',
                    '✅ Premium DJ & Live Entertainment',
                    '✅ Themed Decorations',
                    '✅ Premium Catering & Bar',
                    '✅ Professional Activities & Games',
                    '✅ Special Effects/Lighting',
                    '✅ VIP Transport (if applicable)'
                ],
                description: 'All-out celebration with premium touches'
            }
        }
    },
    harambee: {
        name: 'Harambee Event',
        emoji: '🤝',
        tiers: {
            basic: {
                name: 'Basic Harambee',
                price: 25000,
                features: [
                    '✅ Professional MC',
                    '✅ Basic Sound System',
                    '✅ Simple Catering',
                    '✅ Tent Setup'
                ],
                description: 'Essential services for community fundraising'
            },
            standard: {
                name: 'Harambee Package',
                price: 45000,
                features: [
                    '✅ Professional MC & Coordination',
                    '✅ Quality Sound System',
                    '✅ Community Catering',
                    '✅ Tent Setup & Seating',
                    '✅ Security & Crowd Management',
                    '✅ Fundraising Support'
                ],
                description: 'Complete solution for successful fundraising'
            },
            premium: {
                name: 'Premium Harambee',
                price: 75000,
                features: [
                    '✅ Professional MC & Event Coordination',
                    '✅ Premium Sound & DJ System',
                    '✅ Premium Catering',
                    '✅ Professional Tent Setup & Decorations',
                    '✅ Security & Crowd Management',
                    '✅ Fundraising Coordination',
                    '✅ Professional Photography',
                    '✅ Transport Arrangement'
                ],
                description: 'Premium community event with all amenities'
            }
        }
    },
    corporate: {
        name: 'Corporate Event',
        emoji: '🏢',
        tiers: {
            basic: {
                name: 'Basic Corporate',
                price: 40000,
                features: [
                    '✅ Basic AV Equipment',
                    '✅ Catering',
                    '✅ Sound System',
                    '✅ Registration Table'
                ],
                description: 'Essential corporate event setup'
            },
            standard: {
                name: 'Corporate Event Package',
                price: 80000,
                features: [
                    '✅ Premium AV Equipment',
                    '✅ Corporate Catering',
                    '✅ Event Photography',
                    '✅ Registration Management',
                    '✅ Security Services',
                    '✅ Transport Coordination'
                ],
                description: 'Professional corporate event solution'
            },
            premium: {
                name: 'Premium Corporate',
                price: 150000,
                features: [
                    '✅ Premium AV & Production Equipment',
                    '✅ Premium Corporate Catering & Bar',
                    '✅ Professional Photography & Videography',
                    '✅ Complete Registration & Check-in',
                    '✅ Security & Logistics',
                    '✅ Transport & Parking',
                    '✅ Event Coordination & Planning',
                    '✅ Professional Branding & Signage'
                ],
                description: 'Complete premium corporate experience'
            }
        }
    },
    funeral: {
        name: 'Funeral Service',
        emoji: '🕊️',
        tiers: {
            basic: {
                name: 'Basic Funeral Service',
                price: 30000,
                features: [
                    '✅ Basic Catering',
                    '✅ Sound System',
                    '✅ Tent Setup',
                    '✅ Seating Arrangement'
                ],
                description: 'Respectful basic service'
            },
            standard: {
                name: 'Funeral Service Package',
                price: 60000,
                features: [
                    '✅ Respectful Catering',
                    '✅ Sound System for Tributes',
                    '✅ Tent & Seating',
                    '✅ Transport Coordination',
                    '✅ Security & Management',
                    '✅ Memorial Photography'
                ],
                description: 'Comprehensive and dignified service'
            },
            premium: {
                name: 'Premium Funeral Service',
                price: 100000,
                features: [
                    '✅ Premium Catering',
                    '✅ Professional Sound & Lighting',
                    '✅ Premium Tent & Decorations',
                    '✅ Full Transport Coordination',
                    '✅ Professional Security & Management',
                    '✅ Professional Photography & Video',
                    '✅ Program & Souvenir Printing',
                    '✅ Guest Accommodation Assistance'
                ],
                description: 'Complete premium tribute service'
            }
        }
    },
    roadtrip: {
        name: 'Road Trip',
        emoji: '🚐',
        tiers: {
            basic: {
                name: 'Basic Road Trip',
                price: 12000,
                features: [
                    '✅ Transport & Driver',
                    '✅ Basic Accommodation',
                    '✅ Meal Planning',
                    '✅ Safety Kit'
                ],
                description: 'Per person - budget adventure'
            },
            standard: {
                name: 'Road Trip Package',
                price: 25000,
                features: [
                    '✅ Reliable Transport & Driver',
                    '✅ Comfortable Accommodation',
                    '✅ Activity Coordination',
                    '✅ Meal Planning',
                    '✅ Safety & First Aid',
                    '✅ Photography Services'
                ],
                description: 'Per person - great value adventure'
            },
            premium: {
                name: 'Premium Road Trip',
                price: 40000,
                features: [
                    '✅ Premium Transport & Professional Driver',
                    '✅ Luxury Accommodation',
                    '✅ VIP Activity Coordination',
                    '✅ Premium Meal Planning & Guides',
                    '✅ Travel Insurance & Safety',
                    '✅ Professional Photography & Videography',
                    '✅ Personal Tour Guide',
                    '✅ Souvenir & Merchandise'
                ],
                description: 'Per person - luxury adventure experience'
            }
        }
    }
};

// Helper function to get package recommendations based on budget
export const getPackageRecommendation = (eventType, budget) => {
    const type = eventType.toLowerCase();
    const pkg = Object.values(eventPackages).find(p => 
        p.name.toLowerCase().includes(type) || 
        Object.keys(eventPackages).some(key => key.includes(type))
    );

    if (!pkg) return null;

    const tiers = pkg.tiers;
    let recommendation = null;

    if (budget <= tiers.basic.price) {
        recommendation = {
            tier: 'basic',
            ...tiers.basic,
            suggestion: `Your budget fits our ${tiers.basic.name}! 💰`
        };
    } else if (budget <= tiers.standard.price) {
        recommendation = {
            tier: 'standard',
            ...tiers.standard,
            suggestion: `Perfect budget for our ${tiers.standard.name}! 🎉`
        };
    } else {
        recommendation = {
            tier: 'premium',
            ...tiers.premium,
            suggestion: `Great budget! We recommend our ${tiers.premium.name}! ✨`
        };
    }

    return recommendation;
};

// Helper to suggest upgrades
export const suggestUpgrade = (eventType, currentBudget) => {
    const type = eventType.toLowerCase();
    const pkgKey = Object.keys(eventPackages).find(key => key.includes(type));
    
    if (!pkgKey) return null;

    const pkg = eventPackages[pkgKey];
    const tiers = pkg.tiers;

    // If user has basic budget, show what they can get with a small upgrade
    if (currentBudget < tiers.standard.price) {
        const upgradeCost = tiers.standard.price - currentBudget;
        return {
            message: `For just KSh ${upgradeCost.toLocaleString()} more, you can upgrade to our ${tiers.standard.name}! 🚀`,
            additionalFeatures: tiers.standard.features.filter(f => !tiers.basic.features.includes(f))
        };
    }

    // If user has standard budget, show what they can get with upgrade to premium
    if (currentBudget < tiers.premium.price) {
        const upgradeCost = tiers.premium.price - currentBudget;
        return {
            message: `For just KSh ${upgradeCost.toLocaleString()} more, you can get our ${tiers.premium.name}! ✨`,
            additionalFeatures: tiers.premium.features.filter(f => !tiers.standard.features.includes(f))
        };
    }

    return null;
};
