import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

interface Stats {
  totalScans: number;
  safeLinks: number;
  phishingLinks: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats>({ totalScans: 0, safeLinks: 0, phishingLinks: 0 });
  const navigate = useNavigate();

  // Mock stats (replace with actual data fetching)
  useEffect(() => {
    const mockStats: Stats = {
      totalScans: 150,
      safeLinks: 130,
      phishingLinks: 20,
    };
    setStats(mockStats);
  }, []);

  return (
    <div className="url-page">
      <div className="background-container"></div>
      <div className="content-wrapper">
        <h1 className="glowing-text">Dashboard</h1>
        <div className="stats-container">
          <div className="stat-card">
            <h3>Total Scans</h3>
            <p>{stats.totalScans}</p>
          </div>
          <div className="stat-card">
            <h3>Safe Links</h3>
            <p>{stats.safeLinks}</p>
          </div>
          <div className="stat-card">
            <h3>Phishing Links</h3>
            <p>{stats.phishingLinks}</p>
          </div>
        </div>
        <div className="recent-scans">
          <h3>Recent Scans</h3>
          <p>example.com - ✅ Safe link.</p>
          <p>phishy.com - 🚨 Phishing link detected!</p>
        </div>
        <button className="back-btn" onClick={() => navigate('/')}>
          <svg className="back-arrow" fill="white" viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M177.5 414c-12.5 12.5-32.8 12.5-45.3 0L9.5 291.3c-12.5-12.5-12.5-32.8 0-45.3L132.2 123.3c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L77.8 256l99.7 99.7c12.5 12.5 12.5 32.8 0 45.3zM256 256H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h224c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
          </svg>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Dashboard;