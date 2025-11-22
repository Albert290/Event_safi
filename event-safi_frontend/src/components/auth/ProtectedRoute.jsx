import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';

export default function ProtectedRoute({ children, requireVendor = false, requireClient = false }) {
    const { isAuthenticated, isVendor } = useAuthStore();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If route requires vendor and user is not a vendor
    if (requireVendor && !isVendor) {
        return <Navigate to="/dashboard" replace />;
    }

    // If route requires client (non-vendor) and user is a vendor
    if (requireClient && isVendor) {
        return <Navigate to="/vendor/dashboard" replace />;
    }

    return children;
}
