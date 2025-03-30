import React, { useState, useEffect, use } from "react";

import "./UpcomingMatches.css";
import moment from "moment";

const UpcomingMatches = () => {
    const [upcomingMatches, setUpcomingMatches] = useState([]);
    const today = moment().format("DD MMM YYYY");

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await fetch(
                    "https://cricbuzz-cricket.p.rapidapi.com/series/v1/9237",
                    {
                        method: "GET",
                        headers: {
                            "x-rapidapi-key":
                                "5408a5ef44mshef1f0561f00b5bcp1adc28jsn64e018471ee9",
                            "x-rapidapi-host":
                                "cricbuzz-cricket.p.rapidapi.com",
                        },
                    }
                );
                const data = await response.json();
                const matches = data.matchDetails.filter((match) => {
                    return match.matchDetailsMap?.key.split(",")[1].trim() == today;
                })[0];
                setUpcomingMatches(matches);
            } catch (error) {
                console.error("Error fetching matches:", error);
            }
        };

        fetchMatches();
    }, []);
    
    return (
        <div className="upcoming-matches">
            <div className="upcoming-matches-title">Today Matches</div>
            <div className="upcoming-match-date">{upcomingMatches.matchDetailsMap.key}</div>
            <div className="upcoming-match-list">
                {
                    upcomingMatches.matchDetailsMap.match.map((match, index) => (
                        <div key={index} className="upcoming-match">
                            <div className="match-count">{match.matchInfo.matchDesc}</div>
                            <div className="match-team-container">
                                <div className="match-team">
                                    <div className={match.matchInfo.team1.teamSName.toLowerCase()}></div>
                                    <div>{match.matchInfo.team1.teamName}</div>
                                </div>
                                <div className="match-vs-container">
                                    <div className="match-vs">Vs</div>
                                    <div className="match-time">{match.matchInfo.status}</div>
                                    <div className="match-venue">{match.matchInfo.venueInfo.ground}</div>
                                    <div className="match-venue">{match.matchInfo.venueInfo.city}</div>
                                </div>
                                <div className="match-team">
                                    <div className={match.matchInfo.team2.teamSName.toLowerCase()}></div>
                                    <div>{match.matchInfo.team2.teamName}</div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
    }

export default UpcomingMatches;