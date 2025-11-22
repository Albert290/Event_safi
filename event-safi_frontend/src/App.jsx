import { useState } from "react";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "./stores/useAuthStore";

// Components
import AIAssistant from "./components/ai/AIAssistant";

// Pages
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import CreateEvent from "./pages/CreateEvent";
import Vendors from "./pages/Vendors";
import VendorDetails from "./pages/VendorDetails";
import Reviews from "./pages/Reviews";
import Settings from "./pages/Settings";
import Home from "./pages/Home";
import About from "./pages/About";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VendorRegister from "./pages/auth/VendorRegister";

// Vendor Pages
import VendorDashboard from "./pages/vendor/VendorDashboard";
import VendorBookings from "./pages/vendor/VendorBookings";
import VendorServices from "./pages/vendor/VendorServices";
import VendorProfile from "./pages/vendor/VendorProfile";
import VendorPackages from "./pages/vendor/VendorPackages";
import VendorAnalytics from "./pages/vendor/VendorAnalytics";
import SearchResults from "./pages/SearchResults";

// Components
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import VendorNavbar from "./components/VendorNavbar";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row">
        {/* Navbar - pass the state and handlers */}
        <Navbar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Header - pass the toggle handler */}
          <Header
            onMenuClick={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
          />

          {/* Page Content from Routes */}
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>

      {/* AI Assistant - Available globally */}
      <AIAssistant />
    </div>
  );
}

// Vendor Layout (for vendor-specific pages)
function VendorLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row">
        {/* Vendor Navbar */}
        <VendorNavbar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <div className="flex-1 flex flex-col">
          <Header
            onMenuClick={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
          />

          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>

      {/* AI Assistant - Available for vendors too */}
      <AIAssistant />
    </div>
  );
}


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/vendor" element={<VendorRegister />} />

        {/* Home - Public Landing Page */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />


        {/* Protected User Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute requireClient={true}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="events" element={<Events />} />
          <Route path="events/:id" element={<EventDetails />} />
          <Route path="create-event" element={<CreateEvent />} />
          <Route path="vendors" element={<Vendors />} />
          <Route path="vendors/:id" element={<VendorDetails />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="settings" element={<Settings />} />
          <Route path="search" element={<SearchResults />} />
        </Route>

        {/* Protected Vendor Routes */}
        <Route
          path="/vendor"
          element={
            <ProtectedRoute requireVendor={true}>
              <VendorLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<VendorDashboard />} />
          <Route path="bookings" element={<VendorBookings />} />
          <Route path="services" element={<VendorServices />} />
          <Route path="profile" element={<VendorProfile />} />
          <Route path="packages" element={<VendorPackages />} />
          <Route path="analytics" element={<VendorAnalytics />} />
          <Route path="search" element={<SearchResults />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;