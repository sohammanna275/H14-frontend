// import { useEffect, useState } from "react";
// import axios from "axios";
// import "./AdminDashboard.css";

// const AdminDashboard = () => {
//     const [leaves, setLeaves] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchLeaves = async () => {
//             try {
//                 const res = await axios.get(
//                     "http://localhost:8000/api/leave/all",
//                     {
//                         headers: {
//                             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//                         },
//                     }
//                 );
//                 setLeaves(res.data.data);
//             } catch (err) {
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchLeaves();
//     }, []);

//     const handleApprove = async (leaveID) => {
//         try {
//             await axios.put(
//                 `http://localhost:8000/api/leave/approve/${leaveID}`,
//                 {},
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//                     },
//                 }
//             );

//             setLeaves((prev) =>
//                 prev.map((leave) =>
//                     leave.leaveID === leaveID ? { ...leave, status: "Approved" } : leave
//                 )
//             );
//         } catch (err) {
//             console.error("Error approving leave:", err);
//             alert(err.response?.data?.message || "Approval failed");
//         }
//     };


//     const formatDateTime = (dateStr) => {
//         const options = {
//             year: "numeric",
//             month: "short",
//             day: "numeric",
//             hour: "2-digit",
//             minute: "2-digit",
//         };
//         return new Date(dateStr).toLocaleString(undefined, options);
//     };

//     if (loading) return <p>Loading...</p>;

//     return (
//         <div className="admin-dashboard">
//             <h2 align="center">Leave Requests</h2>

//             {leaves.length === 0 ? (
//                 <p>No leave requests</p>
//             ) : (
//                 leaves.map((leave) => (
//                     <div key={leave.leaveID} className="leave-card">
//                         <strong>
//                             {leave.FirstName} {leave.LastName}
//                         </strong>
//                         <p>Reason: {leave.reason}</p>
//                         <p>
//                             {formatDateTime(leave.startDate)} → {formatDateTime(leave.endDate)}
//                         </p>
//                         <p>Status: {leave.status || "Pending"}</p>
//                         {/* Show approved by info if approved */}
//                         {leave.status === "Approved" && (
//                             <p>
//                                 Approved by {leave.approvedBy} on {formatDateTime(leave.approvedOn)}
//                             </p>
//                         )}
//                         {leave.status !== "Approved" && (
//                             <button
//                                 onClick={() => handleApprove(leave.leaveID)}
//                                 className="approve-btn"
//                             >
//                                 Approve
//                             </button>
//                         )}
//                     </div>
//                 ))
//             )}
//         </div>
//     );
// };

// export default AdminDashboard;

import { useEffect, useState } from "react";
// import axios from "axios";
import "./AdminDashboard.css";
import API from "../../api";

const AdminDashboard = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("All"); // navbar dropdown

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await API.get("/api/leave/all", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setLeaves(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, []);

  const handleApprove = async (leaveID) => {
    try {
      const res = await API.put(
        `/api/leave/approve/${leaveID}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      setLeaves((prev) =>
        prev.map((leave) =>
          leave.leaveID === leaveID
            ? { ...leave, status: "Approved", approvedBy: res.data.leave?.approvedBy, approvedOn: res.data.leave?.approvedOn }
            : leave
        )
      );
    } catch (err) {
      console.error("Error approving leave:", err);
      alert(err.response?.data?.message || "Approval failed");
    }
  };

  const formatDateTime = (dateStr) => {
    if (!dateStr) return "-";
    const options = { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" };
    return new Date(dateStr).toLocaleString(undefined, options);
  };

  if (loading) return <p>Loading...</p>;
  const filteredLeaves = leaves.filter((leave) =>
    filterStatus === "All" ? true : leave.status === filterStatus
  );

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2>Leave Requests</h2>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{ padding: "6px 10px", borderRadius: "6px", border: "1px solid #22c55e", backgroundColor: "#b0d3b7", color: "#022c16", fontWeight: "600", cursor: "pointer" }}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
        </select>
      </div>

      {filteredLeaves.length === 0 ? (
        <p>No leave requests</p>
      ) : (
        filteredLeaves.map((leave) => (
          <div key={leave.leaveID} className="leave-card">
            <strong>
              {leave.FirstName} {leave.LastName}
            </strong>
            <p>Reason: {leave.reason}</p>
            <p>
              {formatDateTime(leave.startDate)} → {formatDateTime(leave.endDate)}
            </p>
            <p>Status: {leave.status || "Pending"}</p>
            {leave.status === "Approved" && (
              <p>
                Approved by {leave.approvedBy} on {formatDateTime(leave.approvedOn)}
              </p>
            )}
            {leave.status !== "Approved" && (
              <button
                onClick={() => handleApprove(leave.leaveID)}
                className="approve-btn"
              >
                Approve
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default AdminDashboard;
