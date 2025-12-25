import React, { useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";
import API from "../api";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      const res = await API.post(
        "/api/auth/forgot-password",
        { email }
      );

      alert(res.data.message || "Reset link sent to your email");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-page">
      <div className="forgot-card">
        <h1 className="forgot-title">Forgot Password</h1>
        <p className="forgot-subtitle">
          Enter your registered email to reset your password
        </p>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <button className="back-login" onClick={() => navigate("/login")}>
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
