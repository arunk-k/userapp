import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    if (!token || role !== "user") {
      navigate("/login");
      return;
    }

    setUsername(storedUsername || "User");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="container my-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">User Profile</h2>
      <div className="card shadow-sm p-4">
        <div className="mb-3">
            UserName:  <span className="text-info">{username}</span>  
        </div>
        <button
          className="btn btn-danger w-100 mt-4"
          onClick={handleLogout}
          aria-label="Logout"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
