import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Settings.css';

const Settings: React.FC = () => {
  const [notifications, setNotifications] = useState<boolean>(true);
  const [theme, setTheme] = useState<string>('dark');
  const navigate = useNavigate();

  const handleClearHistory = () => {
    // Replace with actual logic to clear history
    alert('History cleared!');
  };

  return (
    <div className="url-page">
      <div className="background-container"></div>
      <div className="content-wrapper">
        <h1 className="glowing-text">Settings</h1>
        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNotifications(e.target.checked)}
            />
            Enable Notifications
          </label>
        </div>
        <div className="setting-item">
          <label>
            Theme:
            <select value={theme} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTheme(e.target.value)}>
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </label>
        </div>
        <div className="setting-item">
          <button className="check-btn" onClick={handleClearHistory}>
            <span>Clear History</span>
            <svg className="btn-arrow" fill="white" viewBox="0 0 320 512" height="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"></path>
            </svg>
          </button>
        </div>
        <button className="back-btn" onClick={() => navigate('/')}>
          <svg className="back-arrow" fill="white" viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M177.5 414c-12.5 12.5-32.8 12.5-45.3 0L9.5 291.3c-12.5-12.5-12.5-32.8 0-45.3L132.2 123.3c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L77.8 256l99.7 99.7c12.5 12.5 12.5 32.8 0 45.3zM256 256H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h224c-17.7 0-32 14.3-32 32s14.3 32 32 32z"></path>
          </svg>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Settings;