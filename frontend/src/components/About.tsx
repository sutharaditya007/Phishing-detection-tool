
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './About.css';

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="url-page">
      <div className="background-container"></div>
      <div className="content-wrapper">
        <h1 className="glowing-text">About Phishing Detection Tool</h1>
        <p>Version: 1.0.0</p>
        <p>Developed by: Suthar-Aditya</p>
        <p>
          This tool helps you detect phishing URLs using advanced algorithms. Stay safe online!
        </p>
        <div className="contact-info">
          <h2>Contact Us</h2>
          <p>Email: sutharaditya1229@gmail.com</p>
          <p>
            GitHub:{' '}
            <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer">
              github.com/your-repo
            </a>
          </p>
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

export default About;