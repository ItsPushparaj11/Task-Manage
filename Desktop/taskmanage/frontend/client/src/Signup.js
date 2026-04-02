import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API_URL from "./config";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post(`${API_URL}/api/auth/signup`, {
        email,
        password
      });
      setSuccess(true);
      setError("");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data || "Signup failed");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "50px auto" }}>
      <h2>Sign Up</h2>
      {success && <p style={{ color: "green" }}>Account created! Redirecting to login...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div style={{ marginBottom: "10px" }}>
        <input 
          type="email" 
          value={email}
          onChange={e => setEmail(e.target.value)} 
          placeholder="Email" 
          style={{ width: "100%", padding: "8px", marginBottom: "5px" }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <input 
          type="password" 
          value={password}
          onChange={e => setPassword(e.target.value)} 
          placeholder="Password" 
          style={{ width: "100%", padding: "8px", marginBottom: "5px" }}
        />
      </div>
      <button 
        onClick={handleSignup}
        style={{ width: "100%", padding: "10px", backgroundColor: "#28a745", color: "white", border: "none", cursor: "pointer" }}
      >
        Sign Up
      </button>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
}
