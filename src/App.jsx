// import { useState } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Studentlist from "./components/studentlist.jsx";
// import EditStudent from "./components/editstudent.jsx";
// import DashboardLayout from "./components/DashboardLayout.jsx";
// import EagleIntro from "./components/EagleIntro.jsx";
// import Rooms from "./components/Rooms.jsx";
// import LandingPage from "./pages/LandingPage.jsx";
// import StudentLayout from "./pages/student/StudentLayout.jsx";
// import StudentDashboard from "./pages/student/StudentDashboard.jsx";
// import Login from "./pages/Login.jsx";
// import AdminLogin from "./pages/AdminLogin.jsx"; 
// import ProtectedRoute from "./components/ProtectedRoute.jsx";
// import ForgotPassword from "./pages/ForgotPassword.jsx";
// import ResetPassword from "./pages/ResetPassword.jsx";
// import StudentLeave from "./pages/student/StudentLeave.jsx";
// import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
// const App = () => {
//   const [showIntro, setShowIntro] = useState(true);

//   // Callback to hide the intro
//   const handleIntroComplete = () => {
//     setShowIntro(false);
//   };

//   return (
//     <BrowserRouter>
//       {showIntro ? (
//         // Show Eagle Intro first
//         <EagleIntro onComplete={handleIntroComplete} autoStart={true} />
//       ) : (
//         // Main app routes after intro
//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/login" element={<Login />} />{/* student login */}
//           {/* <Route path="/admin-login" element={<AdminLogin />} /> admin login */}
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/reset-password/:token" element={<ResetPassword />} />
//           {/* Admin / Staff Dashboard */}
//           <Route
//             path="/dashboard/*"
//             element={
//               <ProtectedRoute role="admin">
//                 <DashboardLayout />
//               </ProtectedRoute>
//             }
//           >
//             <Route index element={<AdminDashboard />} />
//             {/* Default dashboard page */}
//             <Route
//               index
//               element={
//                 <h1 style={{ color: "#22c55e", textAlign: "center" }}>
//                   Welcome to Dashboard
//                 </h1>
//               }
//             />
//             <Route path="students" element={<Studentlist />} />
//             <Route path="rooms" element={<Rooms />} />
//             <Route path="students/add" element={<EditStudent />} />
//             <Route path="students/edit/:id" element={<EditStudent />} />
//           </Route>
//           {/* STUDENT DASHBOARD */}
//           <Route
//             path="/student/*"
//             element={
//               <ProtectedRoute role="student">
//                 <StudentLayout />
//               </ProtectedRoute>
//             }
//           >
//             <Route index element={<StudentDashboard />} />
//             <Route path="room" element={<h2>My Room</h2>} />
//             <Route path="complaints" element={<h2>Complaints</h2>} />
//             <Route path="feedback" element={<h2>Feedback</h2>} />
//             <Route path="leave" element={<StudentLeave />} />
//           </Route>

//           {/* Optional fallback */}
//           <Route path="*" element={<h2>Page Not Found</h2>} />
//         </Routes>
//       )}
//     </BrowserRouter>
//   );
// };

// export default App;
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Studentlist from "./components/studentlist.jsx";
import EditStudent from "./components/editstudent.jsx";
import DashboardLayout from "./components/DashboardLayout.jsx";
import EagleIntro from "./components/EagleIntro.jsx";
import Rooms from "./components/Rooms.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import StudentLayout from "./pages/student/StudentLayout.jsx";
import StudentDashboard from "./pages/student/StudentDashboard.jsx";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import StudentLeave from "./pages/student/StudentLeave.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";

const App = () => {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <BrowserRouter>
      
      {showIntro && (
        <EagleIntro
          autoStart
          onComplete={() => setShowIntro(false)}
        />
      )}

      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute role="admin">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="students" element={<Studentlist />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="students/add" element={<EditStudent />} />
          <Route path="students/edit/:id" element={<EditStudent />} />
        </Route>

        {/* STUDENT DASHBOARD */}
        <Route
          path="/student/*"
          element={
            <ProtectedRoute role="student">
              <StudentLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<StudentDashboard />} />
          <Route path="leave" element={<StudentLeave />} />
        </Route>

        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

