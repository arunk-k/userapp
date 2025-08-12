import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role !== "admin") {
      navigate("/login"); 
      return;
    }
    fetchUsers();
  }, [navigate, role]);

  const fetchUsers = () => {
    setLoading(true);
    axios
      .get("https://fakestoreapi.com/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error("Error fetching users", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center text-primary fw-bold">Users List</h2>

      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-primary" role="status" aria-label="Loading">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : users.length === 0 ? (
        <p className="text-center fs-5 text-muted">No users available.</p>
      ) : (
        <div className="row g-4">
          {users.map((user) => (
            <div key={user.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card h-100 shadow-sm border-primary">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-primary fw-semibold mb-3">
                    {user.name.firstname} {user.name.lastname}
                  </h5>
                  <p className="card-text mb-1">
                    <strong>Username:</strong> {user.username}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Email:</strong> <a href={`mailto:${user.email}`} className="text-decoration-none">{user.email}</a>
                  </p>
                  <p className="card-text mb-1">
                    <strong>Phone:</strong> <a href={`tel:${user.phone}`} className="text-decoration-none">{user.phone}</a>
                  </p>
                  <p className="card-text mt-auto">
                    <strong>Address:</strong> {user.address.number} {user.address.street}, {user.address.city}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
