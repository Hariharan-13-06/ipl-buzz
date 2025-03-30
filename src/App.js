import React from 'react';
import './App.css';
import PointsTable from './pages/points-table/PointsTable';
import UpcomingMatches from './pages/upcoming-matches/UpcomingMatches';

function App() {
  return (
    <div className="app">
      <div className='app-header'>Tata Indian Premier League 2025</div>
      <UpcomingMatches />
      <PointsTable />
    </div>
  )
}

export default App;
