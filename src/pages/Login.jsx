// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./Login.css";

// const Login = () => {
//     const [loginType, setLoginType] = useState("student"); // default student
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();
//     const handleForgotPassword = () => {
//         navigate("/forgot-password");
//     };
//     const handleLogin = async () => {
//         try {
//             const res = await axios.post("http://localhost:8000/api/auth/login", { email, password });

//             // Role validation
//             if (loginType === "student" && res.data.role !== "student") {
//                 alert("Please use the staff/admin login portal");
//                 return;
//             }
//             if (loginType === "staff" && res.data.role === "student") {
//                 alert("Please use the student login portal");
//                 return;
//             }

//             localStorage.setItem("accessToken", res.data.accessToken);
//             localStorage.setItem("role", res.data.role);

//             // Redirect based on role
//             if (res.data.role === "admin" || res.data.role === "staff") navigate("/dashboard");
//             else navigate("/student");
//         } catch (err) {
//             alert(err.response?.data?.message || "Login failed");
//         }
//     };

//     return (
//         <div className="login-page">
//             <div className="login-card">
//                 <h1 className="login-title">Welcome to Hostel-14</h1>
//                 <p className="login-subtitle">Please login to continue</p>

//                 {/* Role Toggle */}
//                 <div className="role-toggle">
//                     <button
//                         className={loginType === "student" ? "active" : ""}
//                         onClick={() => setLoginType("student")}
//                     >
//                         Student
//                     </button>
//                     <button
//                         className={loginType === "staff" ? "active" : ""}
//                         onClick={() => setLoginType("staff")}
//                     >
//                         Admin / Staff
//                     </button>
//                 </div>

//                 {/* Login Form */}
//                 <div className="login-form">
//                     <input
//                         type="email"
//                         placeholder="Email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                     <input
//                         type="password"
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                     <button type="button" className="login-submit" onClick={handleLogin}>
//                         Login
//                     </button>
//                     <button
//                         type="button"
//                         className="forgot-password"
//                         onClick={handleForgotPassword}
//                     >
//                         Forgot Password?
//                     </button>
//                 </div>

//                 <div className="login-footer">
//                     &copy; {new Date().getFullYear()} Hostel-14. All rights reserved.
//                 </div>
//             </div>
//         </div>
//     );
// };


// export default Login;
import React, { useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import API from "../api";
const Login = () => {
    const [loginType, setLoginType] = useState("student"); // default role toggle
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Choose endpoint based on role
            const endpoint =
                loginType === "student"
                    ? "/api/auth/login"
                    : "/api/auth/admin-login";

            const response = await API.post(endpoint, { email, password });

            console.log(response.data); // debug: check backend response

            // Validate role returned by backend
            if (loginType === "student" && response.data.role !== "student") {
                alert("Please use the staff/admin login portal");
                setLoading(false);
                return;
            }

            if (loginType === "staff" && response.data.role === "student") {
                alert("Please use the student login portal");
                setLoading(false);
                return;
            }

            // Store token & role
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("role", response.data.role);

            // Redirect based on role
            if (response.data.role === "admin" || response.data.role === "staff") {
                navigate("/dashboard");
            } else {
                navigate("/student");
            }
        } catch (err) {
            console.error(err.response?.data || err.message);
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = () => {
        navigate("/forgot-password");
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h1 className="login-title">Welcome to Hostel-14</h1>
                <p className="login-subtitle">Please login to continue</p>

                {error && <p className="error">{error}</p>}

                {/* Role Toggle */}
                <div className="role-toggle">
                    <button
                        className={loginType === "student" ? "active" : ""}
                        onClick={() => setLoginType("student")}
                    >
                        Student
                    </button>
                    <button
                        className={loginType === "staff" ? "active" : ""}
                        onClick={() => setLoginType("staff")}
                    >
                        Admin / Staff
                    </button>
                </div>

                {/* Login Form */}
                <form className="login-form" onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <div className="password-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <span
                            className="eye-icon"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </span>
                    </div>
                    <button type="submit" className="login-submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                    <button
                        type="button"
                        className="forgot-password"
                        onClick={handleForgotPassword}
                    >
                        Forgot Password?
                    </button>
                </form>

                <div className="login-footer">
                    &copy; {new Date().getFullYear()} Hostel-14. All rights reserved.
                </div>
            </div>
        </div>
    );
};

export default Login;
