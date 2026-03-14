import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { extractApiError, register } from "../services/api";
import "./Login.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const parsedAge = age ? Number(age) : undefined;
    if (parsedAge !== undefined && (!Number.isInteger(parsedAge) || parsedAge < 1 || parsedAge > 120)) {
      setError("Age must be a whole number between 1 and 120");
      return;
    }

    setLoading(true);
    try {
      await register({
        name,
        email,
        password,
        age: parsedAge,
        phone: phone || undefined,
        city: city || undefined,
      });
      navigate("/login", { replace: true });
    } catch (err) {
      setError(extractApiError(err, "Registration failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="glow-orb login-orb-1"></div>
      <div className="glow-orb login-orb-2"></div>

      <div className="login-card glass-panel">
        <div className="login-header">
          <h2 className="text-gradient">Create Account</h2>
          <p>Join ShowDrop and book tickets in seconds</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <div className="input-group">
            <label htmlFor="age">Age (optional)</label>
            <input
              type="number"
              id="age"
              min="1"
              max="120"
              placeholder="e.g. 24"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="phone">Phone (optional)</label>
            <input
              type="tel"
              id="phone"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="city">City (optional)</label>
            <input
              type="text"
              id="city"
              placeholder="e.g. Mumbai"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-submit-btn" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Already have an account? <Link to="/login" className="signup-link">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
