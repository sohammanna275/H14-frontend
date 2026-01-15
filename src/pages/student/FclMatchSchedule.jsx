// import { NavLink, Outlet } from "react-router-dom";
// import MatchCard from "../../components/MatchCard.jsx";
// import "./FclMatchSchedule.css";

// const FclMatchSchedule = () => {
//     return (
//         <div className="match-page">
//             <h1>Match Schedule : FCL 2026</h1>

//             <div className="match-grid">
//                 <MatchCard
//                     title="Match 1"
//                     team1={{ name: "META+MIN", score: "Yet to bat" }}
//                     team2={{ name: "CST", score: "Yet to bat" }}
//                     status={"TBD"}
//                 />
//                 <MatchCard
//                     title="Match 2"
//                     team1={{ name: "META+MIN", score: "Yet to bat" }}
//                     team2={{ name: "CST", score: "Yet to bat" }}
//                     status={"TBD"}

//                 />
//                 <MatchCard
//                     title="Match 3"
//                     team1={{ name: "META+MIN", score: "Yet to bat" }}
//                     team2={{ name: "CST", score: "Yet to bat" }}
//                     status={"TBD"}

//                 />
//                 <MatchCard
//                     title="Match 4"
//                     team1={{ name: "META+MIN", score: "Yet to bat" }}
//                     team2={{ name: "CST", score: "Yet to bat" }}
//                     status={"TBD"}

//                 />
//                 <MatchCard
//                     title="Match 5"
//                     team1={{ name: "META+MIN", score: "Yet to bat" }}
//                     team2={{ name: "CST", score: "Yet to bat" }}
//                     status={"TBD"}

//                 />
//             </div>
//         </div>
//     );
// };


// export default FclMatchSchedule
import { useEffect, useState } from "react";
import MatchCard from "../../components/MatchCard.jsx";
import API from "../../api";
import "./FclMatchSchedule.css";

const FclMatchSchedule = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const res = await API.get("/api/match-score/matches");
                setMatches(res.data.data || []); // <-- fix here
            } catch (err) {
                console.error("Failed to fetch matches:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMatches();
    }, []);


    if (loading) return <p>Loading matches...</p>;

    return (
        <div className="match-page">
            <h1>Match Schedule : FCL 2026</h1>

            <div className="match-grid">
                {matches.length === 0 ? (
                    <p>No matches scheduled yet</p>
                ) : (
                    matches.map((m, idx) => (
                        <MatchCard
                            key={m.matchID || idx}
                            title={`Match ${idx + 1}`}
                            team1={{
                                name: m.teamAName,
                                score: m.scoreA !== null ? `${m.scoreA}/${m.wicketsA} in ${m.overs} overs` : "Yet to bat",
                            }}
                            team2={{
                                name: m.teamBName,
                                score: m.scoreB !== null ? `${m.scoreB}/${m.wicketsB} in ${m.overs} overs` : "Yet to bat",
                            }}
                            status={m.status || "TBD"}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default FclMatchSchedule;
