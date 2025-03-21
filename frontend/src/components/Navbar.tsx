import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2 onClick={() => navigate('/')}>Phishing Detection</h2>
      </div>
      <ul className="navbar-links">
        <li>
          <button
            className={`nav-btn ${location.pathname === '/check' ? 'active' : ''}`}
            onClick={() => navigate('/check')}
          >
            URL Checker
          </button>
        </li>
        <li>
          <button
            className={`nav-btn ${location.pathname === '/history' ? 'active' : ''}`}
            onClick={() => navigate('/history')}
          >
            History
          </button>
        </li>
        <li>
          <button
            className={`nav-btn ${location.pathname === '/dashboard' ? 'active' : ''}`}
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </button>
        </li>
        <li>
          <button
            className={`nav-btn ${location.pathname === '/resources' ? 'active' : ''}`}
            onClick={() => navigate('/resources')}
          >
            Resources
          </button>
        </li>
        <li>
          <button
            className={`nav-btn ${location.pathname === '/settings' ? 'active' : ''}`}
            onClick={() => navigate('/settings')}
          >
            Settings
          </button>
        </li>
        <li>
          <button
            className={`nav-btn ${location.pathname === '/about' ? 'active' : ''}`}
            onClick={() => navigate('/about')}
          >
            About
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;