import { useState } from 'react';
import { TrendingUp, DollarSign, Calendar, Star, Package } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function VendorAnalytics() {
    const [timeRange, setTimeRange] = useState('month');

    // Mock data - will be replaced with API
    const stats = {
        totalEarnings: 450000,
        thisMonth: 75000,
        totalBookings: 45,
        averageRating: 4.7,
        activePackages: 3,
    };

    const earningsData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Earnings (KES)',
                data: [45000, 52000, 48000, 65000, 70000, 75000],
                borderColor: 'rgb(37, 99, 235)',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                tension: 0.4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    const StatCard = ({ icon: Icon, label, value, trend, color }) => (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
                {trend && (
                    <span className={`text-sm font-medium ${trend > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                        {trend > 0 ? '+' : ''}{trend}%
                    </span>
                )}
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
            <p className="text-sm text-gray-600">{label}</p>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Analytics & Earnings</h1>
                <p className="text-gray-600 mt-2">Track your business performance</p>
            </div>

            {/* Time Range Selector */}
            <div className="mb-6 flex gap-2">
                <button
                    onClick={() => setTimeRange('week')}
                    className={`px-4 py-2 rounded-lg transition ${timeRange === 'week'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    Week
                </button>
                <button
                    onClick={() => setTimeRange('month')}
                    className={`px-4 py-2 rounded-lg transition ${timeRange === 'month'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    Month
                </button>
                <button
                    onClick={() => setTimeRange('year')}
                    className={`px-4 py-2 rounded-lg transition ${timeRange === 'year'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    Year
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                <StatCard
                    icon={DollarSign}
                    label="Total Earnings"
                    value={`KES ${stats.totalEarnings.toLocaleString()}`}
                    color="bg-green-500"
                />
                <StatCard
                    icon={TrendingUp}
                    label="This Month"
                    value={`KES ${stats.thisMonth.toLocaleString()}`}
                    trend={12}
                    color="bg-blue-500"
                />
                <StatCard
                    icon={Calendar}
                    label="Total Bookings"
                    value={stats.totalBookings}
                    color="bg-purple-500"
                />
                <StatCard
                    icon={Star}
                    label="Average Rating"
                    value={`${stats.averageRating}/5.0`}
                    color="bg-yellow-500"
                />
                <StatCard
                    icon={Package}
                    label="Active Packages"
                    value={stats.activePackages}
                    color="bg-indigo-500"
                />
            </div>

            {/* Earnings Chart */}
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Earnings Over Time</h2>
                <div className="h-80">
                    <Line data={earningsData} options={chartOptions} />
                </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Bookings</h2>
                <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <p className="font-medium text-gray-900">Wedding Photography</p>
                                <p className="text-sm text-gray-600">March 25, 2024</p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-gray-900">KES 85,000</p>
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                    Completed
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default VendorAnalytics;
