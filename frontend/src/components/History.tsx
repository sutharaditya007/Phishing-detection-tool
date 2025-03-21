import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './History.css';

interface ScanEntry {
  id: number;
  url: string;
  result: string;
  date: string;
}

const History: React.FC = () => {
  const [history, setHistory] = useState<ScanEntry[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Load history (mock data for now; replace with actual storage or API)
  useEffect(() => {
    const mockHistory: ScanEntry[] = [
      { id: 1, url: 'example.com', result: '✅ Safe link.', date: '2025-03-21' },
      { id: 2, url: 'phishy.com', result: '🚨 Phishing link detected!', date: '2025-03-20' },
    ];
    setHistory(mockHistory);
  }, []);

  const handleRecheck = (url: string) => {
    navigate('/check', { state: { url } });
  };

  const handleDelete = (id: number) => {
    setHistory(history.filter((entry) => entry.id !== id));
  };

  return (
    <div className="url-page">
      <div className="background-container"></div>
      <div className="content-wrapper">
        <h1 className="glowing-text">Scan History</h1>
        {history.length === 0 ? (
          <p className="result-text">No scans yet. Start checking URLs!</p>
        ) : (
          <div className="history-list">
            {history.map((entry) => (
              <div key={entry.id} className="history-item">
                <div>
                  <p><strong>URL:</strong> {entry.url}</p>
                  <p><strong>Result:</strong> {entry.result}</p>
                  <p><strong>Date:</strong> {entry.date}</p>
                </div>
                <div className="history-actions">
                  <button className="check-btn" onClick={() => handleRecheck(entry.url)}>
                    <span>Recheck</span>
                    <svg className="btn-arrow" fill="white" viewBox="0 0 320 512" height="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"></path>
                    </svg>
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(entry.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
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

export default History;