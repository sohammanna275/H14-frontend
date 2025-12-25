// import "./Leave.css";
// import { FiCalendar, FiPlus } from "react-icons/fi";

// const StudentLeave = () => {
//   return (
//     <div className="leave-container">
//       {/* Header */}
//       <div className="leave-header">
//         <div className="leave-title">
//           <FiCalendar />
//           <h2>Leave Requests</h2>
//         </div>

//         <button className="apply-leave-btn">
//           <FiPlus />
//           Apply Leave
//         </button>
//       </div>

//       {/* Divider */}
//       <div className="leave-divider" />

//       {/* Empty State */}
//       <div className="leave-empty">
//         <FiCalendar className="empty-icon" />
//         <p className="empty-text">No leave requests found</p>
//         <p className="empty-subtext">Apply for your first leave</p>
//       </div>
//     </div>
//   );
// };

// export default StudentLeave;
import { useState } from "react";
// import axios from "axios";
import "./Leave.css";
import { FiCalendar, FiPlus, FiX } from "react-icons/fi";
import API from "../../api";
const StudentLeave = () => {
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const submitLeave = async () => {
    if (!startDate || !endDate || !reason) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);
      await API.post(
        "/api/leave/apply",
        { startDate, endDate, reason },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      alert("Leave applied successfully");
      setShowModal(false);
      setStartDate("");
      setEndDate("");
      setReason("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to apply leave");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="leave-container">
      {/* Header */}
      <div className="leave-header">
        <div className="leave-title">
          <FiCalendar />
          <h2>Leave Requests</h2>
        </div>

        <button className="apply-leave-btn" onClick={() => setShowModal(true)}>
          <FiPlus />
          Apply Leave
        </button>
      </div>

      <div className="leave-divider" />

      {/* Empty State */}
      <div className="leave-empty">
        <FiCalendar className="empty-icon" />
        <p className="empty-text">No leave requests found</p>
        <p className="empty-subtext">Apply for your first leave</p>
      </div>

      {/* APPLY LEAVE MODAL */}
      {showModal && (
        <div className="leave-modal-overlay">
          <div className="leave-modal">
            <div className="modal-header">
              <h3>Apply for Leave</h3>
              <FiX onClick={() => setShowModal(false)} className="close-icon" />
            </div>

            <label>Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />

            <label>End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />

            <label>Reason</label>
            <textarea
              placeholder="Enter reason for leave"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button
                className="submit-btn"
                onClick={submitLeave}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentLeave;
