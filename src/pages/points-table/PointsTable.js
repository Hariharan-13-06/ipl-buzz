import React, { useState, useEffect } from "react";

import "./PointsTable.css";

const PointsTable = () => {
    const [pointsTable, setPointsTable] = useState([]);

    useEffect(() => {
        const fetchPointsTable = async () => {
            try {
                const response = await fetch('https://cricbuzz-cricket.p.rapidapi.com/stats/v1/series/9237/points-table', {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-key': '5408a5ef44mshef1f0561f00b5bcp1adc28jsn64e018471ee9',
                        'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
                    }
                });
                const data = await response.json();
                setPointsTable(data.pointsTable[0].pointsTableInfo);
            } catch (error) {
                console.error("Error fetching points table:", error);
            }
        };

        fetchPointsTable();
    }, []);

  return (
    <div className="points-table">
        <div className="points-table-title">Points Table</div>
        <div className="points-table-header">
            <div className="points-table-left-col">Teams</div>
            <div className="points-table-header-right-col">
                <div className="points-table-head-cell">Match</div>
                <div className="points-table-head-cell">Won</div>
                <div className="points-table-head-cell">Lost</div>
                <div className="points-table-head-cell">Tied</div>
                <div className="points-table-head-cell">NR</div>
                <div className="points-table-head-cell">Points</div>
                <div className="points-table-head-cell">Net RR</div>
            </div>
        </div>
        <div className="points-table-body">
        {
            pointsTable.map((team, index) => (
                <div key={index} className="points-table-row">
                    <div className="team-name">
                        <div className={team.teamName.toLowerCase()}></div>
                        <div>{team.teamFullName}</div>
                    </div>
                    <div className="points-table-body-right-col">
                        <div className="points-table-row-cell">{team.matchesPlayed}</div>
                        <div className="points-table-row-cell">{team.matchesWon ?? 0}</div>
                        <div className="points-table-row-cell">{team.matchesLost ?? 0}</div>
                        <div className="points-table-row-cell">0</div>
                        <div className="points-table-row-cell">0</div>
                        <div className="points-table-row-cell">{team.points ?? 0}</div>
                        <div className="points-table-row-cell">{team.nrr ?? 0}</div>
                    </div>
                </div>
            ))
        }
        </div>
    </div>
  );
};

export default PointsTable;
