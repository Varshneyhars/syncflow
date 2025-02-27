import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import Login from './login';
import Register from './register'; 
import Dashboard from './dashboard';
import Layout from './components/Layout'; // Import Layout component
import './App.css';

function App() {
  return (
    <Auth0Provider
      domain="dev-eil3josjqvxzmmlu.us.auth0.com"
      clientId="Nq86PXPBGpXJ7ylA3jykB5kPZZbQ3gMT"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <Router>
        <div className="App">
          <Routes>
            {/* Redirect from root to login */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            {/* Login route */}
            <Route path="/login" element={<Login />} />
            {/* Register route */}
            <Route path="/register" element={<Register />} />
            {/* Dashboard inside Layout */}
            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
            {/* Fallback route for 404 */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </Auth0Provider>
  );
}

export default App;