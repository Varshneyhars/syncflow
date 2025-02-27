import React from "react";
import "./dashboard.css"; // Import the CSS file

function Dashboard() {
  // Dummy user data
  const user = {
    photo: "https://via.placeholder.com/150",
    name: "John Doe",
    role: "Software Engineer",
    employeeId: "EMP12345",
  };

  // Dummy work data
  const workStats = {
    progressReport: "75% Completed",
    pendingWork: "3 Tasks Pending",
    newWork: "2 New Assignments",
  };

  return (
    <div className="dashboard-container">
      {/* User Profile Section */}
      <div className="profile-section">
        <img src={user.photo} alt="User Profile" className="profile-photo" />
        <h2>{user.name}</h2>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Employee ID:</strong> {user.employeeId}</p>
      </div>

      {/* Work Status Section */}
      <div className="work-section">
        <h2>Work Summary</h2>
        <div className="work-card">
          <h3>Progress Report</h3>
          <p>{workStats.progressReport}</p>
        </div>
        <div className="work-card pending">
          <h3>Pending Work</h3>
          <p>{workStats.pendingWork}</p>
        </div>
        <div className="work-card new">
          <h3>New Work</h3>
          <p>{workStats.newWork}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
