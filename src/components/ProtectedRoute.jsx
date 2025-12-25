// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("accessToken"); 

  const userRole = localStorage.getItem("role");

  if (!token) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (role && userRole !== role) {
    // Logged in but wrong role
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
