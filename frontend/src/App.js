import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './login';
import HeroPage from './pages/HeroPage';
import Register from './register'; // Import the Register component
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
          {/* Register route */}
          <Route path="/register" element={<Register />} />
          {/* Fallback route for 404 */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
      <div className="App">
      <HeroPage />
    </div>
    </Router>
  );
}

export default App;
