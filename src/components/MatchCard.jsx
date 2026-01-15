import { NavLink, Outlet } from "react-router-dom";
import "./MatchCard.css";
import React from "react";

const MatchCard = ({ live, title, team1, team2, status }) => {
    return (
        <div className="match-card">

            <div className="match-header">
                {live && <span className="live-dot">● Live</span>}
                <span className="match-title">{title}</span>
            </div>
            {/* <p className="match-venue">{venue}</p> */}

            {/* Teams */}
            <div className="team-row">
                <span className="team-name">{team1.name}</span>
                <span className="score">
                    {team1.score} <small>{team1.overs}</small>
                </span>
            </div>

            <div className="team-row">
                
                <span className="team-name">{team2.name}</span>
                <span className="score">{team2.score}</span>
            </div>

            {/* Status */}
            <p className="match-status">{status}</p>
        </div>
    );
};
export default MatchCard;