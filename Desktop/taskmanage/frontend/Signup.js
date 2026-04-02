import axios from "axios";
import { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    await axios.post("http://localhost:5000/api/auth/signup", {
      email,
      password
    });
    alert("User Created");
  };

  return (
    <div>
      <h2>Signup</h2>
      <input type="email" onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}