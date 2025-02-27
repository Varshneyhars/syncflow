import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1>ChronoTask</h1>
        <p className="lead">Tack notes to keep track of crucial details, and accomplish sure tasks with ease.</p>
        <hr />
        <p>Think, plan, and track all in one place</p>
        <p>Efficiently manage your tasks and boost productivity.</p>
        <button className="btn btn-primary mb-4">Get free demo</button>
      </div>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Today’s tasks</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">New ideas for company</li>
            <li className="list-group-item">Top 10</li>
            <li className="list-group-item">Design PPT at</li>
            <li className="list-group-item">Top 9</li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-4">
        <p>100+ Integrations</p>
      </div>
    </div>
  );
}

export default App;