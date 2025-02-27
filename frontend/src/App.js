import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import Login from './login';
import Register from './register';
import Dashboard from './dashboard';
import Layout from './components/Layout';
import './App.css';
import Tasks from "./tasks";
import AddTask from "./AddTask";
import ManageUsers from './manageusers'; // Import the ManageUsers component

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
            {/* Redirect root to login */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Private Routes with Layout */}
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/manage-users" element={<ManageUsers />} />
              <Route path="/add-task" element={<AddTask />} />
            </Route>

            {/* Fallback route for 404 */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </Auth0Provider>
  );
}

export default App;