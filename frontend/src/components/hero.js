import React from 'react';
import './Hero.css'; // Import the CSS file for styling

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1>SyncFlow</h1>
        <p className="tagline">
          <strong>Tack notes to keep track of crucial details, and accomplish sure tasks with ease.</strong>
        </p>
        <hr className="divider" />
        <p className="description">Think, plan, and track all in one place</p>
        <p className="description">Efficiently manage your tasks and boost productivity.</p>
        <button className="demo-button">Get free demo</button>
      </div>

      <div className="tasks-card">
        <h2>Today’s tasks</h2>
        <ul className="task-list">
          <li>New ideas for company</li>
          <li>Top 10</li>
          <li>Design PPT at</li>
          <li>Top 9</li>
        </ul>
      </div>

      <div className="integrations">
        <p>100+ Integrations</p>
      </div>
    </div>
  );
};

export default Hero;