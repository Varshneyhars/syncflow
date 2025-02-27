import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Ensure Link is imported correctly
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailValue)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailError && email !== '' && password !== '') {
      alert('Login successful!');
    } else {
      alert('Please enter valid credentials.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="image-section">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
            alt="Login"
          />
        </div>
        <div className="form-section">
          <div className="logo">
            <span className="icon">🟧</span> <h1>Logo</h1>
          </div>
          <h2>Sign into your account</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={validateEmail}
              required
            />
            {emailError && <p className="error-message">{emailError}</p>}

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">LOGIN</button>
          </form>
          <a href="#" className="forgot-password">
            Forgot password?
          </a>
          <p className="register">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
          <div className="terms">
            <a href="#">Terms of use</a> | <a href="#">Privacy policy</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
