import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');

  // If no token, redirect to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Optional: You can add token expiration check here in future
  // For now, simple check is sufficient for most assignments

  return <Outlet />;
};

export default ProtectedRoute;