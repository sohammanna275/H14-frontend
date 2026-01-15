import { useEffect, useState } from "react";
import API from "../../api";

const UpdateScores = () => {
  const [matches, setMatches] = useState([]);
  const [selectedMatchId, setSelectedMatchId] = useState("");
  const [scoreForm, setScoreForm] = useState({
    runsA: "",
    wicketsA: "",
    oversA: "",
    runsB: "",
    wicketsB: "",
    oversB: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch matches from backend
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await API.get("/api/match-score/matches");
        setMatches(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch matches:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    setScoreForm({ ...scoreForm, [e.target.name]: e.target.value });
  };

  // Handle score update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMatchId) return alert("Select a match first");

    const match = matches.find((m) => m.matchID === parseInt(selectedMatchId));
    if (!match) return alert("Selected match not found");

    const payload = {
      matchID: match.matchID,
      // Team A
      scoreA: Number(scoreForm.runsA || match.scoreA || 0),
      wicketsA: Number(scoreForm.wicketsA || match.wicketsA || 0),
      overs: Number(scoreForm.oversA || match.overs || 0),
      // Team B
      scoreB: Number(scoreForm.runsB || match.scoreB || 0),
      wicketsB: Number(scoreForm.wicketsB || match.wicketsB || 0),
    };

    try {
      const res = await API.post("/api/match-score/update-score", payload);
      console.log("Score updated:", res.data);
      alert("Score updated successfully!");

      // Update local state immediately
      setMatches((prev) =>
        prev.map((m) =>
          m.matchID === payload.matchID
            ? { ...m, ...payload }
            : m
        )
      );

      // Reset form
      setScoreForm({
        runsA: "",
        wicketsA: "",
        oversA: "",
        runsB: "",
        wicketsB: "",
        oversB: "",
      });
      setSelectedMatchId("");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update score");
    }
  };

  if (loading) return <p>Loading matches...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Update Scores</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}
      >
        <select
          name="match"
          value={selectedMatchId}
          onChange={(e) => setSelectedMatchId(e.target.value)}
          required
        >
          <option value="">Select Match</option>
          {matches.map((m) => (
            <option key={m.matchID} value={m.matchID}>
              {m.teamAName} vs {m.teamBName}
            </option>
          ))}
        </select>

        <h4>Team A ({selectedMatchId ? matches.find(m => m.matchID === parseInt(selectedMatchId))?.teamAName : ""})</h4>
        <input
          type="number"
          name="runsA"
          placeholder="Runs"
          value={scoreForm.runsA}
          onChange={handleChange}
        />
        <input
          type="number"
          name="wicketsA"
          placeholder="Wickets"
          value={scoreForm.wicketsA}
          onChange={handleChange}
        />
        <input
          type="number"
          step="0.1"
          name="oversA"
          placeholder="Overs"
          value={scoreForm.oversA}
          onChange={handleChange}
        />

        <h4>Team B ({selectedMatchId ? matches.find(m => m.matchID === parseInt(selectedMatchId))?.teamBName : ""})</h4>
        <input
          type="number"
          name="runsB"
          placeholder="Runs"
          value={scoreForm.runsB}
          onChange={handleChange}
        />
        <input
          type="number"
          name="wicketsB"
          placeholder="Wickets"
          value={scoreForm.wicketsB}
          onChange={handleChange}
        />
        <input
          type="number"
          step="0.1"
          name="oversB"
          placeholder="Overs"
          value={scoreForm.oversB}
          onChange={handleChange}
        />

        <button
          type="submit"
          style={{
            padding: "8px",
            borderRadius: "6px",
            backgroundColor: "#22c55e",
            color: "#fff",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Update Score
        </button>
      </form>

      <div style={{ marginTop: "30px" }}>
        {matches.length === 0 ? (
          <p>No matches scheduled</p>
        ) : (
          matches.map((m) => (
            <div
              key={m.matchID}
              style={{ padding: "10px", border: "1px solid #ccc", marginBottom: "10px" }}
            >
              <strong>
                {m.teamAName} vs {m.teamBName}
              </strong>
              <p>Date: {new Date(m.startTime).toLocaleDateString()}</p>
              <p>
                Team A: {m.scoreA !== null ? `${m.scoreA}/${m.wicketsA} in ${m.overs} overs` : "Yet to bat"}
              </p>
              <p>
                Team B: {m.scoreB !== null ? `${m.scoreB}/${m.wicketsB} in ${m.overs} overs` : "Yet to bat"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UpdateScores;
