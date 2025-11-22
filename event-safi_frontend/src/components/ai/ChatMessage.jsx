import { User, Bot } from 'lucide-react';

export default function ChatMessage({ message }) {
    const isUser = message.role === 'user';
    const isModel = message.role === 'model' || message.role === 'assistant';

    return (
        <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
            {/* Avatar */}
            <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isUser ? 'bg-blue-500' : 'bg-purple-500'
                    }`}
            >
                {isUser ? (
                    <User className="w-4 h-4 text-white" />
                ) : (
                    <Bot className="w-4 h-4 text-white" />
                )}
            </div>

            {/* Message Bubble */}
            <div
                className={`max-w-[75%] rounded-2xl px-4 py-2 ${isUser
                        ? 'bg-blue-500 text-white rounded-tr-none'
                        : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
                    }`}
            >
                <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
                {message.timestamp && (
                    <p
                        className={`text-xs mt-1 ${isUser ? 'text-blue-100' : 'text-gray-400'
                            }`}
                    >
                        {new Date(message.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </p>
                )}
            </div>
        </div>
    );
}
