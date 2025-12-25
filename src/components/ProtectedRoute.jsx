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
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children, role }) => {
//   const token = localStorage.getItem("accessToken"); 
//   const userRole = localStorage.getItem("role");

//   // if token is null or undefined (still loading), show nothing or a loader
//   if (token === null) return <p>Loading...</p>; 

//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   if (role && userRole !== role) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children, role }) => {
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userRole = localStorage.getItem("role");

    if (!token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAuthorized(false);
    } else if (role && userRole !== role) {
      setAuthorized(false);
    } else {
      setAuthorized(true);
    }

    setChecking(false);
  }, [role]);

  if (checking) {
    return null; // or loader
  }

  if (!authorized) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
