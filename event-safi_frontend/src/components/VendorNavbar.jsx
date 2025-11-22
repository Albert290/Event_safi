import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import {
    House, Calendar, ChevronDown, Settings, LogOut,
    User as UserIcon, Package, TrendingUp, Image, DollarSign
} from "lucide-react";

function VendorNavbar({ isOpen, onClose }) {
    const [servicesOpen, setServicesOpen] = useState(false);
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <nav className={`
                fixed lg:static
                left-0 top-0 h-screen w-64 
                bg-white border-r border-gray-200 
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
                        className="h-8 w-8 rounded-full object-cover"
                    />
                    <div>
                        <h1 className="font-semibold">Event Safi</h1>
                        <p className="text-gray-600 text-xs">Vendor Dashboard</p>
                    </div>
                </div>

                <hr className="my-2 border-t border-gray-300" />

                {/* User Info */}
                {user && (
                    <div className="mb-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                                <UserIcon className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm truncate">{user.name}</p>
                                <p className="text-xs text-purple-600 truncate">Vendor Account</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Dashboard */}
                <Link to="/vendor/dashboard" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 w-full text-left">
                    <House className="w-5 h-5 text-gray-700" />
                    <span>Dashboard</span>
                </Link>

                <hr className="my-2 border-t border-gray-300" />

                {/* Bookings */}
                <Link to="/vendor/bookings" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 w-full text-left">
                    <Calendar className="w-5 h-5 text-gray-700" />
                    <span>Bookings</span>
                </Link>

                {/* Services & Packages Dropdown */}
                <div className="mt-2">
                    <button
                        onClick={() => setServicesOpen(!servicesOpen)}
                        className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 w-full text-left"
                    >
                        <Package className="w-5 h-5 text-gray-700" />
                        <span className="flex-1">Services</span>
                        <ChevronDown
                            size={16}
                            className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                        />
                    </button>

                    {servicesOpen && (
                        <div className="ml-7 mt-1 flex flex-col gap-1">
                            <Link to="/vendor/services" className="p-1 hover:text-purple-500 cursor-pointer">My Services</Link>
                            <Link to="/vendor/packages" className="p-1 hover:text-purple-500 cursor-pointer">Packages</Link>
                        </div>
                    )}
                </div>

                {/* Portfolio/Profile */}
                <Link to="/vendor/profile" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 w-full text-left mt-2">
                    <Image className="w-5 h-5 text-gray-700" />
                    <span>Portfolio</span>
                </Link>

                {/* Analytics */}
                <Link to="/vendor/analytics" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 w-full text-left">
                    <TrendingUp className="w-5 h-5 text-gray-700" />
                    <span>Analytics</span>
                </Link>

                <hr className="my-2 border-t border-gray-300" />

                {/* Settings */}
                <Link to="/settings" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 w-full text-left">
                    <Settings className="w-5 h-5 text-gray-700" />
                    <span>Settings</span>
                </Link>

                <hr className="my-2 border-t border-gray-300" />

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-red-50 hover:text-red-600 w-full text-left text-red-500 transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            </nav>
        </>
    );
}

export default VendorNavbar;
