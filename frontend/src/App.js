import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './login';
import HeroPage from './pages/HeroPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Redirect from root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          {/* Login route */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <div className="App">
      <HeroPage />
    </div>
    </Router>
  );
}

export default App;