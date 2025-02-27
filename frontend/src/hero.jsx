// hero.jsx
import React from 'react';
import Navbar from './components/Navbar';
import './styles/hero.css';

const Hero = () => {
  return (
    <div>
      <Navbar />
      <div className="hero">
        <h1>Think, plan, and track all in one place</h1>
        <p>Organize your tasks, set reminders, and integrate with your favorite tools seamlessly.</p>
        <button className="btn btn-primary">Get free demo</button>

        {/* Floating UI Elements */}
        <div className="floating-elements">
          <div className="sticky-note">Meeting at 3 PM</div>
          <div className="reminders-card">
            <p className="font-semibold">Reminders</p>
            <p>Submit report by EOD</p>
          </div>
          <div className="todo-list">
            <p className="font-semibold">To-Do List</p>
            <ul>
              <li>Buy groceries</li>
              <li>Call client</li>
              <li>Finish presentation</li>
            </ul>
          </div>
          <div className="integration-icons">
            <img src="/icons/gmail.svg" alt="Gmail" />
            <img src="/icons/slack.svg" alt="Slack" />
            <img src="/icons/google-calendar.svg" alt="Google Calendar" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero; // Ensure this is the default export