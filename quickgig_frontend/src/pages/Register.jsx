import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Lock, CheckCircle } from "lucide-react";
import useAuthStore from "../stores/authstore";

function Register() {
    const register = useAuthStore((state) => state.register);
    const error = useAuthStore((state) => state.error);
    const loading = useAuthStore((state) => state.loading);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        password_confirm: "",
        location: "",
        phone_number: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
        
        if (!formData.username.trim()) {
            errors.username = "Username is required";
        }
        
        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (!formData.email.includes("@")) {
            errors.email = "Please enter a valid email";
        }
        
        if (!formData.password) {
            errors.password = "Password is required";
        } else if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }
        
        if (formData.password !== formData.password_confirm) {
            errors.password_confirm = "Passwords do not match";
        }
        
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        const success = await register(
            formData.email, 
            formData.username, 
            formData.password, 
            formData.password_confirm,
            formData.location,
            formData.phone_number
        );
        
        if (success) {
            // Redirect to dashboard instead of login
            navigate("/dashboard");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-light to-white flex items-center justify-center py-12 px-4">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full animate-float"></div>
                <div className="absolute bottom-20 right-10 w-24 h-24 bg-accent/10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
                <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-secondary/10 rounded-full animate-float" style={{animationDelay: '4s'}}></div>
            </div>

            <div className="relative z-10 max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="text-6xl mb-4">🎉</div>
                    <h1 className="font-header text-4xl font-bold text-text mb-2">
                        Join Events<span className="text-primary">-Safi</span>
                    </h1>
                    <p className="font-body text-neutral text-lg">
                        Start planning amazing events today
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 border border-primary/10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username */}
                        <div>
                            <label className="block text-sm font-medium text-text mb-2">
                                <User className="inline w-4 h-4 mr-2" />
                                Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Enter your username"
                                value={formData.username}
                                onChange={handleChange}
                                className={`w-full p-4 border-2 rounded-xl focus:outline-none focus:border-primary transition-colors ${
                                    validationErrors.username ? 'border-red-500' : 'border-gray-200'
                                }`}
                            />
                            {validationErrors.username && (
                                <p className="text-red-500 text-sm mt-1">{validationErrors.username}</p>
                            )}
                        </div>

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

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-medium text-text mb-2">
                                📍 Location (Optional)
                            </label>
                            <input
                                type="text"
                                name="location"
                                placeholder="e.g., Nairobi, Kenya"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-colors"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-text mb-2">
                                📱 Phone Number (Optional)
                            </label>
                            <input
                                type="tel"
                                name="phone_number"
                                placeholder="e.g., +254712345678"
                                value={formData.phone_number}
                                onChange={handleChange}
                                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-colors"
                            />
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
                                    placeholder="Create a strong password"
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

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-text mb-2">
                                <CheckCircle className="inline w-4 h-4 mr-2" />
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="password_confirm"
                                    placeholder="Confirm your password"
                                    value={formData.password_confirm}
                                    onChange={handleChange}
                                    className={`w-full p-4 border-2 rounded-xl focus:outline-none focus:border-primary transition-colors pr-12 ${
                                        validationErrors.password_confirm ? 'border-red-500' : 'border-gray-200'
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary"
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {validationErrors.password_confirm && (
                                <p className="text-red-500 text-sm mt-1">{validationErrors.password_confirm}</p>
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
                                    Creating Account...
                                </div>
                            ) : (
                                "🚀 Create Account"
                            )}
                        </button>

                        {/* Login Link */}
                        <p className="text-center text-neutral">
                            Already have an account?{" "}
                            <Link to="/login" className="text-primary font-semibold hover:text-secondary transition-colors">
                                Sign In
                            </Link>
                        </p>
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
                                        : "Registration failed. Please try again."}
                            </div>
                        </div>
                    )}
                </div>

                {/* Benefits */}
                <div className="mt-8 text-center">
                    <p className="text-neutral text-sm mb-4">Join thousands of event planners who trust Events-Safi</p>
                    <div className="flex justify-center space-x-6 text-xs text-neutral">
                        <span>✅ Verified Providers</span>
                        <span>✅ Instant Booking</span>
                        <span>✅ AI Matching</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;