import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import API from "../api";
const Studentlist = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await API.get("/students-list");
        setStudents(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleStudent = (student) => {
    navigate(`/dashboard/students/edit/${student.studentID}`, {
      state: student,
    });
  };

  return (
    <div className="bg-particles">
      <div style={{ padding: "20px", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <button
            className="edit-btn"
            type="button"
            onClick={() => navigate("/dashboard/students/edit/0")}
          >
            + Add Student
          </button>
        </div>

        <h1 style={{ padding: "20px", color: "#22c55e" }}>
          Hostel Students
        </h1>

        <table
          style={{
            margin: "20px auto",
            width: "80%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Last Name</th>
              <th style={thStyle}>First Name</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.studentID}>
                <td style={tdStyle}>{student.studentID}</td>
                <td style={tdStyle}>{student.LastName}</td>
                <td style={tdStyle}>{student.FirstName}</td>
                <td style={tdStyle}>
                  <button
                    className="edit-btn"
                    onClick={() => handleStudent(student)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const tdStyle = {
  border: "2px solid #22c55e",
  padding: "10px",
  textAlign: "center",
};

const thStyle = {
  ...tdStyle,
  backgroundColor: "#0d2410",
  color: "#e8f5e8",
};

export default Studentlist;
