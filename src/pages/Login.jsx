import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("https://fakestoreapi.com/auth/login", {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      const role = username === "kevinryan" ? "admin" : "user";
      localStorage.setItem("role", role);
      localStorage.setItem("username", username);

      navigate("/dashboard");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100 bg-light"
      style={{ padding: "1rem" }}
    >
      <div
        className="bg-white p-4 p-md-5 rounded shadow-sm"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h3 className="mb-4 text-center">Login</h3>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            className="form-control mb-3 form-control-lg"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
          />
          <input
            type="password"
            className="form-control mb-3 form-control-lg"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          {error && (
            <div className="alert alert-danger py-2 mb-3" role="alert">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="btn btn-primary w-100 btn-lg"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
