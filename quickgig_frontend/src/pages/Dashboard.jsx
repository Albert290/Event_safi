import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, User, Star, Settings, Plus, Search } from "lucide-react";
import useDashboardStore from "../stores/dashboardStore";
import useAuthStore from "../stores/authstore";

export default function Dashboard() {
  const { 
    tasks, 
    mode, 
    loading, 
    error, 
    setMode, 
    fetchTasks 
  } = useDashboardStore();
  
  const { user } = useAuthStore();
  const [greeting, setGreeting] = useState("");

  const userId = user?.id || JSON.parse(localStorage.getItem("user"))?.id;
  const isClient = user?.is_client || JSON.parse(localStorage.getItem("user"))?.is_client;
  const isTasker = user?.is_tasker || JSON.parse(localStorage.getItem("user"))?.is_tasker;
  const username = user?.username || JSON.parse(localStorage.getItem("user"))?.username;

  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    if (userId) {
      fetchTasks();
    }
  }, [userId, fetchTasks]);

  const quickActions = [
    {
      title: "Browse Services",
      description: "Find photographers, DJs, and more",
      icon: "🎯",
      link: "/services",
      color: "bg-gradient-to-br from-primary to-secondary"
    },
    {
      title: "Chat with AI",
      description: "Get instant service recommendations",
      icon: "🤖",
      action: "openChat",
      color: "bg-gradient-to-br from-purple to-pink"
    },
    {
      title: "My Bookings",
      description: "View and manage your events",
      icon: "📅",
      link: "/bookings",
      color: "bg-gradient-to-br from-success to-secondary"
    },
    {
      title: "Profile Settings",
      description: "Update your information",
      icon: "⚙️",
      link: "/profile",
      color: "bg-gradient-to-br from-accent to-orange"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-light to-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-header text-4xl font-bold text-text mb-2">
                {greeting}, {username}! 👋
              </h1>
              <p className="font-body text-neutral text-lg">
                Welcome to your Events-Safi dashboard
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white rounded-full p-3 shadow-lg">
                <User className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>

          {/* Mode Toggle */}
          {(isClient && isTasker) && (
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => setMode("client")}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  mode === "client" 
                    ? "bg-primary text-white shadow-lg" 
                    : "bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white"
                }`}
              >
                👤 Event Planner Mode
              </button>
              <button
                onClick={() => setMode("tasker")}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  mode === "tasker" 
                    ? "bg-secondary text-white shadow-lg" 
                    : "bg-white text-secondary border-2 border-secondary hover:bg-secondary hover:text-white"
                }`}
              >
                ⭐ Service Provider Mode
              </button>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickActions.map((action, index) => (
            <div key={index} className="group">
              {action.link ? (
                <Link to={action.link}>
                  <div className={`${action.color} text-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer`}>
                    <div className="text-4xl mb-3">{action.icon}</div>
                    <h3 className="font-bold text-lg mb-2">{action.title}</h3>
                    <p className="text-white/90 text-sm">{action.description}</p>
                  </div>
                </Link>
              ) : (
                <div className={`${action.color} text-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer`}>
                  <div className="text-4xl mb-3">{action.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{action.title}</h3>
                  <p className="text-white/90 text-sm">{action.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-primary/10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-header text-2xl font-bold text-text">
              {mode === "client" ? "📅 Your Event Bookings" : "⭐ Your Service Assignments"}
            </h2>
            <Link to="/services" className="bg-primary text-white px-4 py-2 rounded-full hover:bg-secondary transition-colors">
              <Plus className="w-4 h-4 inline mr-2" />
              {mode === "client" ? "Book Service" : "View Schedule"}
            </Link>
          </div>

          {loading && (
            <div className="flex items-center justify-center p-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-neutral">Loading your events...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 text-center">
              <div className="text-red-700">
                <p className="font-semibold mb-2">Oops! Something went wrong</p>
                <p className="text-sm">{typeof error === 'string' ? error : 'Failed to load your events'}</p>
              </div>
            </div>
          )}

          {!loading && !error && tasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="font-bold text-xl text-text mb-2">
                {mode === "client" ? "Ready to Plan Your First Event?" : "No Assignments Yet"}
              </h3>
              <p className="text-neutral mb-6">
                {mode === "client" 
                  ? "Browse our amazing service providers and start booking!" 
                  : "New service requests will appear here when clients book you."}
              </p>
              <Link 
                to="/services" 
                className="bg-primary text-white px-6 py-3 rounded-full hover:bg-secondary transition-colors inline-flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                {mode === "client" ? "Browse Services" : "View Available Services"}
              </Link>
            </div>
          ) : !loading && !error ? (
            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="bg-light rounded-2xl p-6 border border-primary/10 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-text">{task.task_name}</h4>
                        <p className="text-neutral">
                          {mode === "client" ? `Provider: ${task.tasker_name}` : `Client: ${task.client_name}`}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      task.status === 'confirmed' ? 'bg-success/20 text-success' :
                      task.status === 'in_progress' ? 'bg-accent/20 text-accent' :
                      task.status === 'completed' ? 'bg-primary/20 text-primary' :
                      'bg-neutral/20 text-neutral'
                    }`}>
                      {task.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-text">📅 Date:</span>
                      <p className="text-neutral">{task.slot_detail?.date}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-text">⏰ Time:</span>
                      <p className="text-neutral">{task.slot_detail?.start_time} - {task.slot_detail?.end_time}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-text">📝 Details:</span>
                      <p className="text-neutral">{task.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
