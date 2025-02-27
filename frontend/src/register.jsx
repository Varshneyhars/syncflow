import React, { useState } from "react";
import "./register.css"; // Import CSS file

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [emailError, setEmailError] = useState("");

  // Email validation function
  const validateEmail = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    // Regular expression for email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailValue)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    if (emailError) {
      alert("Please enter a valid email.");
      return;
    }

    // Default role to Engineer if not entered
    const finalRole = role.trim() === "" ? "Engineer" : role;

    // Simulate form submission
    alert(`Registration successful!\nName: ${name}\nEmail: ${email}\nRole: ${finalRole}`);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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

          <input
            type="text"
            placeholder="Role (default: Engineer)"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
