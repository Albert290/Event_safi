import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import { Menu, Search, CirclePlus, Sparkles, Bell } from "lucide-react";

function Header({ onMenuClick }) {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const { isVendor } = useAuthStore();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            const searchPath = isVendor ? '/vendor/search' : '/search';
            navigate(`${searchPath}?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <header className="flex items-center justify-between gap-4 px-4 py-2 bg-white/80 backdrop-blur-sm shadow-sm">
            <div className="flex items-center gap-3">
                <button
                    aria-label="menu"
                    className="p-2 rounded-md hover:bg-gray-100"
                    onClick={onMenuClick}
                >
                    <Menu className="w-6 h-6 text-gray-700" />
                </button>
                <img
                    src="/event-safi.jpg"
                    alt="Event Safi Logo"
                    width={50}
                    height={50}
                    className="rounded-full object-cover"
                />
                <span className="sr-only">Event Safi</span>
            </div>

            <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-4">
                <label htmlFor="search" className="sr-only">
                    Search events, vendors, and services
                </label>
                <div className="flex items-center bg-gray-100 rounded-full px-3 py-1.5 shadow-inner">
                    <Search className="w-4 h-4 text-gray-500" />
                    <input
                        id="search"
                        type="text"
                        placeholder="Search events, vendors, services..."
                        className="ml-2 w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </form>

            {/* <div className="flex items-center gap-3">
                <button title="create event" className="p-2 rounded-md hover:bg-gray-100">
                    <CirclePlus className="w-5 h-5 text-gray-700" />
                </button>
                <button title="notifications" className="p-2 rounded-md hover:bg-gray-100 relative">
                    <Bell className="w-5 h-5 text-gray-700" />
                    <span className="absolute top-0 right-0 -mt-1 -mr-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-semibold text-white bg-red-500 rounded-full">
                        3
                    </span>
                </button>
            </div> */}
        </header>
    );
}

export default Header;