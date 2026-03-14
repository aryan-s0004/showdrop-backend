import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();
  const isActive = (path) => (location.pathname === path ? "active" : "");

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    user = null;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar glass">
      <div className="nav-brand">
        <Link to="/">
          <h2 className="text-gradient">ShowDrop</h2>
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/" className={`nav-link ${isActive("/")}`}>
          Home
        </Link>
        <Link to="/movies" className={`nav-link ${isActive("/movies")}`}>
          Movies
        </Link>
        {user ? (
          <button type="button" className="nav-link login-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login" className={`nav-link login-btn ${isActive("/login")}`}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
