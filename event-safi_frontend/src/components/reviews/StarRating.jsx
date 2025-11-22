import { useState } from 'react';
import { Star } from 'lucide-react';

export default function StarRating({ rating, setRating, readonly = false, size = 'md' }) {
    const [hover, setHover] = useState(0);

    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
    };

    const starSize = sizeClasses[size] || sizeClasses.md;

    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = star <= (hover || rating);

                return (
                    <button
                        key={star}
                        type="button"
                        onClick={() => !readonly && setRating(star)}
                        onMouseEnter={() => !readonly && setHover(star)}
                        onMouseLeave={() => !readonly && setHover(0)}
                        disabled={readonly}
                        className={`transition-all ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'
                            }`}
                        aria-label={`Rate ${star} stars`}
                    >
                        <Star
                            className={`${starSize} transition-colors ${isFilled
                                    ? 'text-yellow-500 fill-yellow-500'
                                    : 'text-gray-300'
                                }`}
                        />
                    </button>
                );
            })}
            {rating > 0 && (
                <span className="ml-2 text-sm font-medium text-gray-700">
                    {rating}.0
                </span>
            )}
        </div>
    );
}
