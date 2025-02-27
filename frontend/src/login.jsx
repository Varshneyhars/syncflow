import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css"; // Importing CSS file

function Login() {
  const {
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    isLoading,
  } = useAuth0();

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  // Handle normal login with API
  const handleNormalLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      setLoggedIn(true);
      setUserData(response.data);
      setError("");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  // Handle logout
  const handleLogout = () => {
    setLoggedIn(false);
    setUserData(null);
    logout({ returnTo: window.location.origin });
    navigate("/login");
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

          {/* Loading State */}
          {isLoading ? (
            <p>Loading...</p>
          ) : isAuthenticated || loggedIn ? (
            // Authenticated View
            <div className="authenticated-view">
              <h2>Welcome, {isAuthenticated ? user.name : userData?.name || "User"}!</h2>
              {isAuthenticated && (
                <img
                  src={user.picture}
                  alt={user.name}
                  className="profile-image"
                />
              )}
              <p>{isAuthenticated ? user.email : userData?.email || email}</p>
              <button onClick={handleLogout} className="logout-button">
                LOGOUT
              </button>
            </div>
          ) : (
            // Unauthenticated View
            <>
              <h2>Sign into your account</h2>

              {/* Normal Email/Password Login */}
              <form onSubmit={handleNormalLogin}>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {error && <p className="error-message">{error}</p>}
                <button type="submit">LOGIN</button>
              </form>

              {/* Auth0 Login Button */}
              <button
                type="button"
                onClick={() => loginWithRedirect()}
                className="auth0-login-button"
              >
                LOGIN WITH AUTH0
              </button>

              <a href="#" className="forgot-password">
                Forgot password?
              </a>
              <p className="register">
                Don't have an account?{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    loginWithRedirect({ screen_hint: "signup" });
                  }}
                >
                  Register here
                </a>
              </p>
              <div className="terms">
                <a href="#">Terms of use</a> | <a href="#">Privacy policy</a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
