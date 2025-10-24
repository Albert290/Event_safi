import { X, ShoppingCart, Check } from 'lucide-react';
import useBookingStore from '../../stores/bookingStore';

const RecommendedPackages = ({ onBookingAdded }) => {
    const recommendedPackages = useBookingStore((state) => state.recommendedPackages);
    const removePackage = useBookingStore((state) => state.removeRecommendedPackage);
    const bookings = useBookingStore((state) => state.bookings);
    
    if (recommendedPackages.length === 0) {
        return null;
    }

    const handleBookNow = (package_) => {
        // Add to cart/bookings
        useBookingStore.setState((state) => ({
            bookings: [...state.bookings, {
                id: Date.now(),
                ...package_,
                bookedAt: new Date().toISOString(),
                quantity: 1
            }]
        }));
        
        if (onBookingAdded) {
            onBookingAdded(package_);
        }
    };

    return (
        <div className="bg-white border-t border-light p-4 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-text">📦 Recommended For You</h3>
                <span className="text-xs bg-accent text-white px-2 py-1 rounded-full">
                    {recommendedPackages.length} package{recommendedPackages.length > 1 ? 's' : ''}
                </span>
            </div>

            <div className="space-y-3">
                {recommendedPackages.map((pkg) => (
                    <div 
                        key={pkg.id}
                        className="bg-gradient-to-r from-light to-white border border-primary/20 rounded-2xl p-4 hover:shadow-md transition-all"
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                                <h4 className="font-bold text-text text-sm mb-1">
                                    {pkg.name}
                                </h4>
                                <p className="text-xs text-text/60 line-clamp-1">
                                    {pkg.description}
                                </p>
                            </div>
                            <button
                                onClick={() => removePackage(pkg.id)}
                                className="text-text/40 hover:text-text/70 transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Price and Features */}
                        <div className="mb-3">
                            <div className="text-lg font-bold text-primary mb-2">
                                KSh {pkg.price.toLocaleString()}
                            </div>
                            <ul className="text-xs text-text/70 space-y-1">
                                {pkg.features?.slice(0, 3).map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-2">
                                        <Check size={12} className="text-accent flex-shrink-0" />
                                        <span className="line-clamp-1">{feature}</span>
                                    </li>
                                ))}
                                {pkg.features?.length > 3 && (
                                    <li className="text-accent text-xs">
                                        +{pkg.features.length - 3} more features
                                    </li>
                                )}
                            </ul>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleBookNow(pkg)}
                                className="flex-1 bg-primary text-white text-xs font-bold py-2 px-3 rounded-lg hover:bg-secondary transition-colors flex items-center justify-center gap-2"
                            >
                                <ShoppingCart size={14} />
                                Book Now
                            </button>
                            <button
                                onClick={() => removePackage(pkg.id)}
                                className="flex-1 border border-primary/30 text-primary text-xs font-bold py-2 px-3 rounded-lg hover:bg-primary/5 transition-colors"
                            >
                                Dismiss
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Checkout CTA */}
            {bookings.length > 0 && (
                <div className="mt-4 p-3 bg-accent/10 rounded-lg border border-accent/30">
                    <div className="flex items-center justify-between">
                        <div className="text-xs text-text/70">
                            <span className="font-bold text-accent">{bookings.length}</span> package{bookings.length > 1 ? 's' : ''} ready to checkout
                        </div>
                        <button className="text-xs bg-accent text-white px-3 py-1 rounded-full hover:opacity-90 transition-opacity font-bold">
                            View Cart →
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecommendedPackages;
