import React from 'react';
import '../styles/hero.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">SyncFlow</div>
      <div className="nav-links">
        <a href="/features">Features</a>
        <a href="/solutions">Solutions</a>
        <a href="/resources">Resources</a>
        <a href="/pricing">Pricing</a>
      </div>
      <div className="nav-buttons">
        <a href="/signin" className="btn">Sign in</a>
        <button className="btn btn-primary">Get demo</button>
      </div>
    </nav>
  );
};

export default Navbar;