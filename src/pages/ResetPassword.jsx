import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
import "./ForgotPassword.css"; // reuse styles if you want
import { FiEye, FiEyeOff } from "react-icons/fi";
import API from "../api";
const ResetPassword = () => {
  const { token } = useParams(); // <-- from URL
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async () => {
    if (!newPassword || !confirmPassword) {
      alert("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await API.post(
        `/api/auth/reset-password/${token}`,
        { newPassword }
      );

      alert(res.data.message || "Password reset successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid or expired link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-page">
      <div className="forgot-card">
        <h1 className="forgot-title">Reset Password</h1>

        <div className="password-wrapper">
          <input
            type={showNewPassword ? "text" : "password"}
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <span
            className="eye-icon"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>


        <div className="password-wrapper">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span
            className="eye-icon"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>


        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
