import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import axios from "axios";
import "./StudentLayout.css";
import API from "../../api";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await API.get("/api/leave/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Leaves response:", res.data);
        setLeaves(res.data.data || []);
      } catch (err) {
        console.error("Error fetching leaves:", err.response || err);
        setError(
          err.response?.data?.message || "Failed to fetch leave requests"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, [navigate]);

  const pendingLeaves = leaves.filter((leave) => leave.status === "Pending")
    .length;

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <div className="student-dashboard-home">
      {/* Dashboard header */}
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <button className="logout-btn" onClick={handleLogout}>
          ↩ Logout
        </button>
      </div>

      {/* Cards */}
      <div className="student-cards">
        {/* Fees Paid */}
        <div className="student-card">
          <h4>💰 Fees Paid</h4>
          <p className="card-value">₹ 0</p>
          <span className="card-subtext">No payments yet</span>
        </div>

        {/* Leave Requests */}
        <div className="student-card">
          <h4>📅 Leave Requests</h4>
          <p className="card-value">
            {loading ? "..." : leaves.length || "0"}
          </p>
          <span className="card-subtext">
            {loading
              ? "Loading..."
              : pendingLeaves > 0
              ? `${pendingLeaves} pending approvals`
              : "No pending approvals"}
          </span>
        </div>

        {/* Complaints */}
        <div className="student-card">
          <h4>📝 Complaints</h4>
          <p className="card-value">0</p>
          <span className="card-subtext">Active complaints</span>
        </div>
      </div>

      {/* Leave details */}
      <div className="student-panel">
        <h3>Leave Requests</h3>
        {loading && <p>Loading leave requests...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && leaves.length === 0 && <p>No leave requests found.</p>}

        {!loading && leaves.length > 0 && (
          <table className="leave-table">
            <thead>
              <tr>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr key={leave.leaveID}>
                  <td>{new Date(leave.startDate).toLocaleDateString()}</td>
                  <td>{new Date(leave.endDate).toLocaleDateString()}</td>
                  <td>{leave.reason}</td>
                  <td>{leave.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
