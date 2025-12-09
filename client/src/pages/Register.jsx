import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    // Checks to see if the Email is a valid email 
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    try {
      const res = await API.post("/auth/register", { username, email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.user.username);
      navigate("/dashboard");
    } catch (err) {
      console.error("Register error:", err);

      // Try to show the backend's actual error message
      if (err.response) {
        alert(err.response.data.error || `Error: ${err.response.status}`);
      } else if (err.request) {
        alert("No response from server. Check backend URL.");
      } else {
        alert("Error registering user");
      }
    }
  }


  return (
    <div className="container">
      <h1 className="app-title">StudySync+</h1>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Register</button>
      </form>
      <p style={{ marginTop: "10px" }}>
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          style={{ color: "#007bff", cursor: "pointer", textDecoration: "underline" }}
        >
          Login here
        </span>
      </p>

    </div>
  );
}
