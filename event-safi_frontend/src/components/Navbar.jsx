import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import { House, CalendarDays, Users, ChevronDown, Sparkles, Settings, Star, Wallet, LogOut, User as UserIcon } from "lucide-react";

function Navbar({ isOpen, onClose }) {
    const [eventsOpen, setEventsOpen] = useState(false);
    const [vendorsOpen, setVendorsOpen] = useState(false);
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <>
            {/* Overlay for mobile - clicking it closes the sidebar */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <nav className={`
                fixed lg:sticky lg:top-0
                left-0 top-0 h-screen w-64 
                bg-gradient-to-b from-slate-900 to-blue-900
                p-4 text-sm select-none overflow-y-auto
                transition-transform duration-300 ease-in-out
                z-50
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                {/* Logo */}
                <div className="flex items-center gap-3 mb-4">
                    <img
                        src="/event-safi.jpg"
                        alt="Event Safi Logo"
                        className="h-8 w-8 rounded-full object-cover ring-2 ring-amber-400/50"
                    />
                    <div>
                        <h1 className="font-semibold text-white">Event Safi</h1>
                        <p className="text-amber-400 text-xs">Event Planner</p>
                    </div>
                </div>

                <hr className="my-2 border-t border-white/10" />

                {/* User Info */}
                {user && (
                    <div className="mb-4 p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                                <UserIcon className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm truncate text-white">{user.name}</p>
                                <p className="text-xs text-slate-300 truncate">{user.email}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Dashboard */}
                <Link to="/dashboard" className="flex items-center gap-2 p-2 rounded-md hover:bg-white/10 w-full text-left text-slate-200 hover:text-white transition-colors">
                    <House className="w-5 h-5 text-amber-400" />
                    <span>Dashboard</span>
                </Link>

                <hr className="my-2 border-t border-white/10" />

                {/* EVENTS DROPDOWN */}
                <div>
                    <button
                        onClick={() => setEventsOpen(!eventsOpen)}
                        className="flex items-center gap-2 p-2 rounded-md hover:bg-white/10 w-full text-left text-slate-200 hover:text-white transition-colors"
                    >
                        <CalendarDays className="w-5 h-5 text-amber-400" />
                        <span className="flex-1">Events</span>
                        <ChevronDown
                            size={16}
                            className={`transition-transform ${eventsOpen ? "rotate-180" : ""}`}
                        />
                    </button>

                    {eventsOpen && (
                        <div className="ml-7 mt-1 flex flex-col gap-1">
                            <Link to="/events" className="p-1 text-slate-300 hover:text-amber-400 cursor-pointer transition-colors">My Events</Link>
                            <Link to="/create-event" className="p-1 text-slate-300 hover:text-amber-400 cursor-pointer transition-colors">Create Event</Link>
                        </div>
                    )}
                </div>

                {/* VENDORS DROPDOWN */}
                <div className="mt-2">
                    <button
                        onClick={() => setVendorsOpen(!vendorsOpen)}
                        className="flex items-center gap-2 p-2 rounded-md hover:bg-white/10 w-full text-left text-slate-200 hover:text-white transition-colors"
                    >
                        <Users className="w-5 h-5 text-amber-400" />
                        <span className="flex-1">Vendors</span>
                        <ChevronDown
                            size={16}
                            className={`transition-transform ${vendorsOpen ? "rotate-180" : ""}`}
                        />
                    </button>

                    {vendorsOpen && (
                        <div className="ml-7 mt-1 flex flex-col gap-1">
                            <Link to="/vendors" className="p-1 text-slate-300 hover:text-amber-400 cursor-pointer transition-colors">All Vendors</Link>
                        </div>
                    )}
                </div>

                <button className="flex items-center gap-2 p-2 rounded-md hover:bg-white/10 w-full text-left mt-2 text-slate-200 hover:text-white transition-colors">
                    <Wallet className="w-5 h-5 text-amber-400" />
                    <span>Payments</span>
                </button>

                <Link to="/reviews" className="flex items-center gap-2 p-2 rounded-md hover:bg-white/10 w-full text-left text-slate-200 hover:text-white transition-colors">
                    <Star className="w-5 h-5 text-amber-400" />
                    <span>Reviews</span>
                </Link>

                <hr className="my-2 border-t border-white/10" />

                <button className="flex items-center gap-2 p-2 rounded-md hover:bg-white/10 w-full text-left text-slate-200 hover:text-white transition-colors">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span>AI assistant</span>
                </button>
                <Link to="/settings" className="flex items-center gap-2 p-2 rounded-md hover:bg-white/10 w-full text-left text-slate-200 hover:text-white transition-colors">
                    <Settings className="w-5 h-5 text-amber-400" />
                    <span>Settings</span>
                </Link>

                <hr className="my-2 border-t border-white/10" />

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-red-500/20 hover:text-red-400 w-full text-left text-red-400 transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            </nav>
        </>
    );
}

export default Navbar;