import { useState, useEffect } from 'react';
import { useAuthStore } from '../../stores/useAuthStore';
import { authAPI } from '../../api/auth';
import { Calendar, DollarSign, Star, TrendingUp, Package, Users } from 'lucide-react';

export default function VendorDashboard() {
    const { user } = useAuthStore();
    const [stats, setStats] = useState({
        totalBookings: 0,
        pendingBookings: 0,
        totalRevenue: 0,
        averageRating: 0,
        totalServices: 0,
        totalReviews: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const data = await authAPI.getDashboard();
            // Mock stats for now - you'll get real data from backend
            setStats({
                totalBookings: 45,
                pendingBookings: 5,
                totalRevenue: 450000,
                averageRating: 4.7,
                totalServices: 8,
                totalReviews: 32,
            });
        } catch (error) {
            console.error('Error fetching dashboard:', error);
        } finally {
            setLoading(false);
        }
    };

    const StatCard = ({ icon: Icon, label, value, color, subtext }) => (
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
            <p className="text-sm text-gray-600">{label}</p>
            {subtext && <p className="text-xs text-gray-500 mt-1">{subtext}</p>}
        </div>
    );

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Welcome back, {user?.name}! 👋
                </h1>
                <p className="text-gray-600">
                    Here's what's happening with your business today
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <StatCard
                    icon={Calendar}
                    label="Total Bookings"
                    value={stats.totalBookings}
                    color="bg-blue-500"
                    subtext={`${stats.pendingBookings} pending`}
                />
                <StatCard
                    icon={DollarSign}
                    label="Total Revenue"
                    value={`KES ${stats.totalRevenue.toLocaleString()}`}
                    color="bg-blue-500"
                />
                <StatCard
                    icon={Star}
                    label="Average Rating"
                    value={`${stats.averageRating}/5.0`}
                    color="bg-blue-500"
                    subtext={`${stats.totalReviews} reviews`}
                />
                <StatCard
                    icon={Package}
                    label="Active Services"
                    value={stats.totalServices}
                    color="bg-blue-500"
                />
                <StatCard
                    icon={Users}
                    label="Pending Requests"
                    value={stats.pendingBookings}
                    color="bg-blue-500"
                />
                <StatCard
                    icon={TrendingUp}
                    label="This Month"
                    value="+12%"
                    color="bg-blue-500"
                    subtext="vs last month"
                />
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left">
                        <Package className="w-6 h-6 text-blue-600 mb-2" />
                        <p className="font-semibold text-gray-900">Add New Service</p>
                        <p className="text-sm text-gray-600">Create a new service offering</p>
                    </button>
                    <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-left">
                        <Calendar className="w-6 h-6 text-green-600 mb-2" />
                        <p className="font-semibold text-gray-900">View Bookings</p>
                        <p className="text-sm text-gray-600">Manage your bookings</p>
                    </button>
                    <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors text-left">
                        <Star className="w-6 h-6 text-purple-600 mb-2" />
                        <p className="font-semibold text-gray-900">View Reviews</p>
                        <p className="text-sm text-gray-600">See what customers say</p>
                    </button>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
                <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-gray-900">New booking request</p>
                            <p className="text-sm text-gray-600">Wedding Photography - KES 75,000</p>
                        </div>
                        <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                            <Star className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-gray-900">New 5-star review</p>
                            <p className="text-sm text-gray-600">"Excellent service and professional team!"</p>
                        </div>
                        <span className="text-xs text-gray-500">5 hours ago</span>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-gray-900">Payment received</p>
                            <p className="text-sm text-gray-600">Corporate Event Catering - KES 120,000</p>
                        </div>
                        <span className="text-xs text-gray-500">1 day ago</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
