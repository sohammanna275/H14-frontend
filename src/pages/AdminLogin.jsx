import React, { useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import API from "../api";
const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const response = await API.post(
      "/api/auth/admin-login",
      { email, password }
    );

    console.log(response.data); // ✅ debug: check what you actually get

    // Correct keys
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("role", response.data.role);

    navigate("/dashboard");
  } catch (err) {
    console.error(err.response?.data || err.message); // show backend error
    setError(err.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Admin Login</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
