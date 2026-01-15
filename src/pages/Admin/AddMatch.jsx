import { useEffect, useState } from "react";
import API from "../../api";

const AddMatch = () => {
  const [departments, setDepartments] = useState([]);
  const [match, setMatch] = useState({
    teamA: "",
    teamB: "",
    date: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch departments from backend
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await API.get("/api/fcl-departments"); // your endpoint to get departments
        setDepartments(res.data.data || []); // assuming data.data has array
      } catch (err) {
        console.error("Failed to fetch departments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    setMatch({ ...match, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate teams
    if (!match.teamA || !match.teamB) return alert("Select both teams");
    if (match.teamA === match.teamB) return alert("Teams cannot be the same");

    const payload = {
      teamA: parseInt(match.teamA), // send deptID as integer
      teamB: parseInt(match.teamB),
      startTime: match.date || new Date(), // optional
    };

    try {
      const res = await API.post("/api/match-score/add-match", payload);
      console.log("Match added:", res.data);
      alert("Match added successfully!");
      setMatch({ teamA: "", teamB: "", date: "" });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add match.");
    }
  };

  if (loading) return <p>Loading departments...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add New Match</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}
      >
        {/* Team A */}
        <label>
          Team A:
          <select name="teamA" value={match.teamA} onChange={handleChange} required>
            <option value="">Select Team A</option>
            {departments.map((d) => (
              <option key={d.deptID} value={d.deptID}>
                {d.deptName}
              </option>
            ))}
          </select>
        </label>

        {/* Team B */}
        <label>
          Team B:
          <select name="teamB" value={match.teamB} onChange={handleChange} required>
            <option value="">Select Team B</option>
            {departments.map((d) => (
              <option key={d.deptID} value={d.deptID}>
                {d.deptName}
              </option>
            ))}
          </select>
        </label>

        {/* Match date */}
        <label>
          Match Date:
          <input
            type="date"
            name="date"
            value={match.date}
            onChange={handleChange}
            required
          />
        </label>

        <button
          type="submit"
          style={{ padding: "8px", borderRadius: "6px", backgroundColor: "#22c55e", color: "#fff", fontWeight: "600", cursor: "pointer" }}
        >
          Add Match
        </button>
      </form>
    </div>
  );
};

export default AddMatch;
