import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Resources.css';

const Resources: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="url-page">
      <div className="background-container"></div>
      <div className="content-wrapper">
        <h1 className="glowing-text">Educational Resources</h1>
        <div className="tips-section">
          <h2>Tips to Identify Phishing</h2>
          <ul>
            <li>Check for misspellings in URLs (e.g., "g00gle.com").</li>
            <li>Avoid clicking links in unsolicited emails.</li>
            <li>Look for HTTPS in the URL.</li>
            <li>Be cautious of urgent or threatening language.</li>
          </ul>
        </div>
        <div className="examples-section">
          <h2>Common Phishing Examples</h2>
          <p>Example: "Your account will be suspended! Click here to verify."</p>
        </div>
        <div className="external-links">
          <h2>Learn More</h2>
          <a href="https://www.consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams" target="_blank" rel="noopener noreferrer">
            FTC Phishing Guide
          </a>
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

export default Resources;