// landing.js
import "./landing.css";
import backgroundImage from "./main.jpg";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="landing-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="content">
        <h1 className="title">SyncFlow</h1>
        <p className="tagline">Simplify Teamwork, Amplify Results</p>
        <button className="get-started" onClick={() => navigate("/login")}>Get Started</button>
      </div>
    </div>
  );
};

export default Landing;