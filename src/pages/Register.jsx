import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://fakestoreapi.com/users", {
        email,
        password,
      });
      alert("Registered! Now login.");
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <>
      <header className="bg-primary text-white py-3 mb-4">
        <div className="container d-flex justify-content-between align-items-center">
          <Link to="/" className="text-white text-decoration-none fs-4 fw-bold">
            UserApp
          </Link>
          <nav>
            <Link to="/dashboard" className="text-white me-3 text-decoration-none">
              Dashboard
            </Link>
            <Link to="/login" className="text-white text-decoration-none">
              Login
            </Link>
          </nav>
        </div>
      </header>

      <div
        className="d-flex align-items-center justify-content-center vh-100 bg-light"
        style={{ padding: "1rem" }}
      >
        <div
          className="bg-white p-4 p-md-5 rounded shadow-sm"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <h3 className="mb-4 text-center">Register</h3>
          <form onSubmit={handleRegister}>
            <input
              type="email"
              className="form-control mb-3 form-control-lg"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="form-control mb-3 form-control-lg"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-success w-100 btn-lg">
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
