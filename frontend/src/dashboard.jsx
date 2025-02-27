import React from "react";

const Dashboard = () => {
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Dashboard</h1>
      <p className="lead">Welcome to the modern dashboard!</p>

      {/* Dashboard Cards */}
      <div className="row">
        <div className="col-md-4">
          <div className="card text-white bg-primary mb-3">
            <div className="card-body">
              <h5 className="card-title">Progress Report</h5>
              <p className="card-text">75% Completed</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-white bg-warning mb-3">
            <div className="card-body">
              <h5 className="card-title">Pending Work</h5>
              <p className="card-text">3 Tasks Pending</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title">New Assignments</h5>
              <p className="card-text">2 New Assignments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
