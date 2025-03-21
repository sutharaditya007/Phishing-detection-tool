import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import UrlChecker from './components/UrlChecker';
import History from './components/History';
import Dashboard from './components/Dashboard';
import Resources from './components/Resources';
import Settings from './components/Settings';
import About from './components/About';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <MainContent />
    </Router>
  );
};

const MainContent: React.FC = () => {
  const location = useLocation();

  return (
    <div className="App">
      {/* Show Navbar only if NOT on Home Page */}
      {location.pathname !== '/' && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/check" element={<UrlChecker />} />
        <Route path="/history" element={<History />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default App;