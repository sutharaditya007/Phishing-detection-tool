import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UrlChecker.css";

const UrlChecker: React.FC = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");
  const navigate = useNavigate();

  const checkPhishing = async () => {
    if (!url.trim()) {
      setResult("❌ Please enter a valid URL");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5000/detect", { url });
      console.log("API Response:", response.data);
      setResult(response.data.is_phishing ? "🚨 Phishing link detected!" : "✅ Safe link.");
    } catch (error) {
      console.error("Error:", error);
      setResult("❌ Error connecting to server");
    }
  };

  return (
    <div className="url-page">
      {/* Animated Background */}
      <div className="background-container">
        <div className="stars"></div>
        <div className="twinkling"></div>
      </div>

      {/* Main Content */}
      <div className="content-wrapper">
        <h1 className="glowing-text">Enter URL to Check</h1>
        <div className="input-group">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL to check"
            className="url-input"
          />
          <button className="check-btn" onClick={checkPhishing}>
            <span>Check</span>
            <svg className="btn-arrow" fill="white" viewBox="0 0 320 512" height="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"></path>
            </svg>
          </button>
        </div>
        {result && <p className="result-text">{result}</p>}
        <button className="back-btn" onClick={() => navigate("/")}>
          <svg className="back-arrow" fill="white" viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M177.5 414c-12.5 12.5-32.8 12.5-45.3 0L9.5 291.3c-12.5-12.5-12.5-32.8 0-45.3L132.2 123.3c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L77.8 256l99.7 99.7c12.5 12.5 12.5 32.8 0 45.3zM256 256H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h224c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
          </svg>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default UrlChecker;