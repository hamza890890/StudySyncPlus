import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { emailOrUsername, password });

      // Save both token and username for later use
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.user.username);

      alert("Login successful!");
      navigate("/dashboard"); // Redirect to the dashboard after login
    } catch (err) {
      console.error(err);
      alert("Invalid credentials");
    }
  }

  return (
    <div className="container">
      <h1 className="app-title">StudySync+</h1>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          placeholder="Email or Username"
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
      <p>
        Don’t have an account?{" "}
        <button onClick={() => navigate("/register")}>Register</button>
      </p>
    </div>
  );
}
