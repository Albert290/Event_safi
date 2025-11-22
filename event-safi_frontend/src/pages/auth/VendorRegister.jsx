import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';
import { authAPI } from '../../api/auth';
import { Mail, Lock, User, Phone, Building2, FileText, AlertCircle, Loader2, CheckCircle } from 'lucide-react';

export default function VendorRegister() {
    const navigate = useNavigate();
    const setAuth = useAuthStore((state) => state.setAuth);

    const [formData, setFormData] = useState({
        // User fields
        email: '',
        name: '',
        phone: '',
        password: '',
        password_confirm: '',
        // Vendor fields
        business_name: '',
        description: '',
        phone_number: '',
        address: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // User validation
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Valid email is required';
        }
        if (!formData.name || formData.name.length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }
        if (!formData.phone || !/^0\d{9}$/.test(formData.phone)) {
            newErrors.phone = 'Phone must be 10 digits starting with 0';
        }
        if (!formData.password || formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        if (formData.password !== formData.password_confirm) {
            newErrors.password_confirm = 'Passwords do not match';
        }

        // Vendor validation
        if (!formData.business_name || formData.business_name.length < 2) {
            newErrors.business_name = 'Business name is required';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);
        setErrors({});

        try {
            // Format data for vendor registration
            const vendorData = {
                user: {
                    email: formData.email,
                    name: formData.name,
                    phone: formData.phone,
                    password: formData.password,
                    password_confirm: formData.password_confirm,
                },
                business_name: formData.business_name,
                description: formData.description,
                phone_number: formData.phone_number || formData.phone,
                address: formData.address,
            };

            const data = await authAPI.registerVendor(vendorData);

            // Merge vendor_profile into user object if it exists
            const userWithVendor = {
                ...data.user,
                vendor_profile: data.vendor_profile || null
            };

            setAuth(userWithVendor, data.tokens);
            navigate('/vendor/dashboard', { replace: true });
        } catch (err) {
            const serverErrors = err.response?.data || {};
            setErrors({
                general: serverErrors.detail || 'Vendor registration failed. Please try again.',
                ...serverErrors,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4 py-12">
            <div className="max-w-2xl w-full">
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Event Safi</h1>
                    <p className="text-gray-600">Register as a vendor and grow your business</p>
                </div>

                {/* Register Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Vendor Registration</h2>

                    {/* General Error Alert */}
                    {errors.general && (
                        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-red-800">{errors.general}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* User Information Section */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <User className="w-5 h-5" />
                                Personal Information
                            </h3>
                            <div className="space-y-4">
                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`w-full pl-11 pr-4 py-3 border ${errors.email ? 'border-red-300' : 'border-gray-300'
                                                } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition`}
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                </div>

                                {/* Name and Phone in Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name
                                        </label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 border ${errors.name ? 'border-red-300' : 'border-gray-300'
                                                } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition`}
                                            placeholder="John Doe"
                                        />
                                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 border ${errors.phone ? 'border-red-300' : 'border-gray-300'
                                                } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition`}
                                            placeholder="0712345678"
                                        />
                                        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                                    </div>
                                </div>

                                {/* Password Fields in Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                            Password
                                        </label>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            required
                                            value={formData.password}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 border ${errors.password ? 'border-red-300' : 'border-gray-300'
                                                } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition`}
                                            placeholder="••••••••"
                                        />
                                        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="password_confirm" className="block text-sm font-medium text-gray-700 mb-2">
                                            Confirm Password
                                        </label>
                                        <input
                                            id="password_confirm"
                                            name="password_confirm"
                                            type="password"
                                            required
                                            value={formData.password_confirm}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 border ${errors.password_confirm ? 'border-red-300' : 'border-gray-300'
                                                } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition`}
                                            placeholder="••••••••"
                                        />
                                        {errors.password_confirm && <p className="mt-1 text-sm text-red-600">{errors.password_confirm}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Business Information Section */}
                        <div className="pt-6 border-t border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <Building2 className="w-5 h-5" />
                                Business Information
                            </h3>
                            <div className="space-y-4">
                                {/* Business Name */}
                                <div>
                                    <label htmlFor="business_name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Business Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="business_name"
                                        name="business_name"
                                        type="text"
                                        required
                                        value={formData.business_name}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 border ${errors.business_name ? 'border-red-300' : 'border-gray-300'
                                            } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition`}
                                        placeholder="Your Business Name"
                                    />
                                    {errors.business_name && <p className="mt-1 text-sm text-red-600">{errors.business_name}</p>}
                                </div>

                                {/* Description */}
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                        Business Description (Optional)
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows="3"
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition resize-none"
                                        placeholder="Tell us about your business and services..."
                                    />
                                </div>

                                {/* Phone Number and Address */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-2">
                                            Business Phone (Optional)
                                        </label>
                                        <input
                                            id="phone_number"
                                            name="phone_number"
                                            type="tel"
                                            value={formData.phone_number}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                                            placeholder="0712345678"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                                            Business Address (Optional)
                                        </label>
                                        <input
                                            id="address"
                                            name="address"
                                            type="text"
                                            value={formData.address}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                                            placeholder="Nairobi, Kenya"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Creating Vendor Account...
                                </>
                            ) : (
                                'Register as Vendor'
                            )}
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="text-purple-600 hover:text-purple-700 font-semibold">
                                Login here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
