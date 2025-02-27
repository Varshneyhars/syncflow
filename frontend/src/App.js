import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import Login from './login';
import Register from './register';
import Dashboard from './dashboard';
import Layout from './components/Layout';
import Tasks from "./tasks";
import TeamChat from "./TeamChat"; // ✅ Import the TeamChat component
import './App.css';

function App() {
  return (
    <Auth0Provider
      domain="dev-eil3josjqvxzmmlu.us.auth0.com"
      clientId="Nq86PXPBGpXJ7ylA3jykB5kPZZbQ3gMT"
      authorizationParams={{
        redirect_uri: `${window.location.origin}/dashboard`,
      }}
    >
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Layout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="manage-users" element={<ManageUsers />} />
            </Route>
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>

          {/* ✅ Floating Chat Component (Visible Everywhere) */}
          <TeamChat />
        </div>
      </Router>
    </Auth0Provider>
  );
}

export default App;
