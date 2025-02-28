import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import Login from "./login";
import Register from "./register";
import Dashboard from "./dashboard";
import Layout from "./components/Layout";
import Landing from "./landing"; // ✅ Import Landing Page
import Tasks from "./tasks";
import AddTask from "./AddTask"; // ✅ Ensure this is imported
import TeamChat from "./TeamChat";
import ManageUsers from "./manageusers";
import "./App.css";

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
            {/* Landing Page as Default */}
            <Route path="/" element={<Landing />} />

            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Private Routes with Layout */}
            <Route path="/" element={<Layout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="add-task" element={<AddTask />} />
              <Route path="team-chat" element={<TeamChat />} />
              <Route path="manage-users" element={<ManageUsers />} />
            </Route>

            {/* Fallback route for 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </Auth0Provider>
  );
}

export default App;
