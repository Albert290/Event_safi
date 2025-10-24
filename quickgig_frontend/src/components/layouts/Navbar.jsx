import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import Button from '../common/Button';
import useAuthStore from "../../stores/authstore";

const Navbar = () => {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    const handleLogin = () => {
        navigate("/login");
    };

    const NavLinks = [
        { name: "Home", path: "/", icon: "" },
        { name: "Event Services", path: "/services", icon: "" },
        { name: "How It Works", path: "/how-it-works", icon: "" },
        { name: "About Us", path: "/about", icon: "" },
        ...(user ? [{name: "Dashboard", path: "/dashboard", icon: "📊"}] : []),
    ];

    return (
        <>
            <nav className="flex justify-between items-center py-4 px-6 shadow-lg sticky top-0 bg-white/95 backdrop-blur-sm z-50 border-b border-primary/10">
                {/* Mobile menu button */}
                <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X /> : <Menu />}
                </button>

                <Link to="/" className="font-header text-primary text-3xl font-bold hover:text-secondary transition-colors duration-300">
                    Events<span className="text-accent">-Safi</span>
                </Link>
                <ul className="hidden md:flex gap-8 items-center">
                    {NavLinks.map((link) => (
                        <li key={link.name}>
                            <Link 
                                to={link.path} 
                                className="font-body font-medium hover:text-primary transition-colors duration-300 flex items-center gap-2 py-2 px-3 rounded-full hover:bg-primary/10"
                            >
                                <span className="text-sm">{link.icon}</span>
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                {user ? (
                    <div className="hidden md:flex items-center gap-4">
                        <span className="font-body text-text/70">Welcome, {user.username}!</span>
                        <Button variant="secondary" onClick={handleLogout} className="bg-primary text-white hover:bg-secondary">
                            🚪 Sign Out
                        </Button>
                    </div>
                ) : (
                    <div className="hidden md:flex items-center gap-3">
                        <Button variant="outline" onClick={handleLogin} className="border-primary text-primary hover:bg-primary hover:text-white">
                            Sign In
                        </Button>
                        <Button variant="primary" onClick={() => navigate("/register")} className="bg-primary text-white hover:bg-secondary">
                            Get Started
                        </Button>
                    </div>
                )}

                {/* Mobile menu */}
                <div className={`fixed top-0 left-0 h-full w-2/3 bg-white shadow-lg z-10 transition-transform duration-300 ease-in ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
                    <ul className="flex flex-col gap-6 mt-9 ml-6">
                        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X /> : <Menu />}</button>
                        {NavLinks.map((link) => (
                            <li key={link.name}>
                                <Link to={link.path} className="font-body hover:text-secondary" onClick={() => setIsMenuOpen(false)}>
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
            <Outlet />
        </>
    )
}

export default Navbar;