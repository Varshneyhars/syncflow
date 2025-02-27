import React from "react";
import "./login.css"; // Importing CSS file

function Login() {
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
          <form>
            <input type="email" placeholder="Email address" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">LOGIN</button>
          </form>
          <a href="#" className="forgot-password">Forgot password?</a>
          <p className="register">
            Don't have an account? <a href="#">Register here</a>
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
