import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <div className="badge glass">Welcome to the future of cinema</div>
          <h1 className="hero-title">
            Experience movies like <br />
            <span className="text-gradient">never before.</span>
          </h1>
          <p className="hero-subtitle">
            Book your tickets for the latest blockbuster hits in seconds. Seamless, beautiful, and incredibly fast.
          </p>
          <div className="hero-actions">
            <Link to="/movies" className="btn-primary">
              Explore Movies
            </Link>
            <Link to="/login" className="btn-secondary glass">
              Sign In
            </Link>
          </div>
        </div>
        
        {/* Decorative background elements */}
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
      </div>
    </div>
  );
}

export default Home;
