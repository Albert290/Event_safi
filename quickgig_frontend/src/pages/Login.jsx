import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import useAuthStore from "../stores/authstore";

function Login() {
    const login = useAuthStore((state) => state.login);
    const error = useAuthStore((state) => state.error);
    const loading = useAuthStore((state) => state.loading);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear validation error when user starts typing
        if (validationErrors[name]) {
            setValidationErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const validateForm = () => {
        const errors = {};
        
        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (!formData.email.includes("@")) {
            errors.email = "Please enter a valid email";
        }
        
        if (!formData.password) {
            errors.password = "Password is required";
        }
        
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        const success = await login(formData.email, formData.password);
        if (success) {
            navigate("/");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-light to-white flex items-center justify-center py-12 px-4">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full animate-float"></div>
                <div className="absolute bottom-20 right-10 w-24 h-24 bg-accent/10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
                <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-secondary/10 rounded-full animate-float" style={{animationDelay: '4s'}}></div>
            </div>

            <div className="relative z-10 max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <Link to="/" className="font-header text-primary text-4xl font-bold hover:text-secondary transition-colors duration-300">
                        Events<span className="text-accent">-Safi</span>
                    </Link>
                    <h2 className="font-header text-3xl font-bold text-text mt-6 mb-2">Welcome Back!</h2>
                    <p className="font-body text-neutral text-lg">Sign in to continue planning amazing events</p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 border border-primary/10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-text mb-2">
                                <Mail className="inline w-4 h-4 mr-2" />
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full p-4 border-2 rounded-xl focus:outline-none focus:border-primary transition-colors ${
                                    validationErrors.email ? 'border-red-500' : 'border-gray-200'
                                }`}
                            />
                            {validationErrors.email && (
                                <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-text mb-2">
                                <Lock className="inline w-4 h-4 mr-2" />
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full p-4 border-2 rounded-xl focus:outline-none focus:border-primary transition-colors pr-12 ${
                                        validationErrors.password ? 'border-red-500' : 'border-gray-200'
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {validationErrors.password && (
                                <p className="text-red-500 text-sm mt-1">{validationErrors.password}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-white font-bold py-4 px-6 rounded-xl hover:bg-secondary transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Signing In...
                                </div>
                            ) : (
                                "🚀 Sign In"
                            )}
                        </button>

                        {/* Register Link */}
                        <div className="text-center pt-4 border-t border-light">
                            <p className="font-body text-neutral">
                                New to Events-Safi?{" "}
                                <Link to="/register" className="text-primary font-semibold hover:text-secondary transition-colors duration-300">
                                    Create Account
                                </Link>
                            </p>
                        </div>
                    </form>

                    {/* Error Display */}
                    {error && (
                        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                            <div className="text-red-700 text-sm">
                                {typeof error === "string"
                                    ? error
                                    : typeof error === "object"
                                        ? Object.entries(error).map(([key, value]) => (
                                            <div key={key} className="mb-1">
                                                <strong>{key}:</strong> {Array.isArray(value) ? value.join(", ") : value}
                                            </div>
                                        ))
                                        : "Login failed. Please try again."}
                            </div>
                        </div>
                    )}
                </div>

                {/* User Types Info */}
                <div className="mt-8 grid grid-cols-2 gap-4 text-center">
                    <div className="bg-white/80 rounded-2xl p-4 border border-primary/10">
                        <div className="text-2xl mb-2">👤</div>
                        <h3 className="font-semibold text-text text-sm">Event Planners</h3>
                        <p className="text-xs text-neutral">Book amazing services</p>
                    </div>
                    <div className="bg-white/80 rounded-2xl p-4 border border-primary/10">
                        <div className="text-2xl mb-2">⭐</div>
                        <h3 className="font-semibold text-text text-sm">Service Providers</h3>
                        <p className="text-xs text-neutral">Manage your bookings</p>
                    </div>
                </div>

                {/* Service Provider Note */}
                <div className="mt-6 bg-accent/10 rounded-xl p-4 text-center">
                    <p className="text-sm text-text">
                        <span className="font-semibold">Service Provider?</span> Use the credentials provided by Events-Safi to access your dashboard.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;