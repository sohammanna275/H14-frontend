import { NavLink, Outlet } from "react-router-dom";
import MatchCard from "../../components/MatchCard.jsx";
import "./FclMatchSchedule.css";

const FclMatchSchedule = () => {
    return (
        <div className="match-page">
            <h1>Match Schedule : FCL 2026</h1>

            <div className="match-grid">
                <MatchCard
                    title="Match 1"
                    team1={{ name: "META+MIN", score: "Yet to bat" }}
                    team2={{ name: "CST", score: "Yet to bat" }}
                    status={"TBD"}
                />
                <MatchCard
                    title="Match 2"
                    team1={{ name: "META+MIN", score: "Yet to bat" }}
                    team2={{ name: "CST", score: "Yet to bat" }}
                    status={"TBD"}

                />
                <MatchCard
                    title="Match 3"
                    team1={{ name: "META+MIN", score: "Yet to bat" }}
                    team2={{ name: "CST", score: "Yet to bat" }}
                    status={"TBD"}

                />
                <MatchCard
                    title="Match 4"
                    team1={{ name: "META+MIN", score: "Yet to bat" }}
                    team2={{ name: "CST", score: "Yet to bat" }}
                    status={"TBD"}

                />
                <MatchCard
                    title="Match 5"
                    team1={{ name: "META+MIN", score: "Yet to bat" }}
                    team2={{ name: "CST", score: "Yet to bat" }}
                    status={"TBD"}

                />
            </div>
        </div>
    );
};


export default FclMatchSchedule