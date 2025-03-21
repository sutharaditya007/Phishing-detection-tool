import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to Phishing Detection Tool</h1>
        <p>Identify and protect yourself from phishing links instantly.</p>
        <button className="start-btn" onClick={() => navigate("/check")}>
          Start Detection
        </button>
      </div>
    </div>
  );
};

export default Home;
