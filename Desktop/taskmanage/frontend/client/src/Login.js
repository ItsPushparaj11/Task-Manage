import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API_URL from "./config";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data || "Login failed");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "50px auto" }}>
      <h2>Login</h2>
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
        onClick={handleLogin}
        style={{ width: "100%", padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", cursor: "pointer" }}
      >
        Login
      </button>
      <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
    </div>
  );
}
