// // src/components/ProtectedRoute.jsx
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children, role }) => {
//   const token = localStorage.getItem("accessToken"); 

//   const userRole = localStorage.getItem("role");

//   if (!token) {
//     // Not logged in
//     return <Navigate to="/login" replace />;
//   }

//   if (role && userRole !== role) {
//     // Logged in but wrong role
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;
// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

const ProtectedRoute = ({ children, role }) => {
  const [token, setToken] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToken(localStorage.getItem("accessToken"));
    setUserRole(localStorage.getItem("role"));
    setLoading(false);
  }, []);

  if (loading) return null; // or a spinner

  if (!token) return <Navigate to="/login" replace />;
  if (role && userRole !== role) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
