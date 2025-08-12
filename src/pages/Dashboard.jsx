import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Dashboard() {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role !== "admin" && role !== "user") {
      navigate("/login");
      return;
    }

    const storedProducts = sessionStorage.getItem("products");
    if (storedProducts) {
      setServices(JSON.parse(storedProducts));
    } else {
      fetchProducts();
    }
  }, [navigate, role]);

  const fetchProducts = () => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        const apiData = res.data.map((p) => ({ ...p, isLocal: false }));
        setServices(apiData);
        sessionStorage.setItem("products", JSON.stringify(apiData));
      })
      .catch((err) => console.error("Error fetching products", err));
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  const handleDelete = (id) => {
    if (role !== "admin") return;
    const updated = services.filter((item) => item.id !== id);
    setServices(updated);
    sessionStorage.setItem("products", JSON.stringify(updated));
    alert("Product deleted!");
  };

  return (
    <>
    
    <div className="container my-5">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
        <h2 className="mb-3 mb-md-0 text-center text-md-start">
          {role === "admin" ? "Admin Dashboard" : "User Dashboard"}
        </h2>
        <button
          className="btn btn-outline-danger btn-sm px-4"
          onClick={handleLogout}
          aria-label="Logout"
        >
          Logout
        </button>
      </div>

      {role === "admin" && (
        <div className="mb-4 d-flex justify-content-center justify-content-md-start gap-2">
          <Link to="/add" className="btn btn-primary btn-md px-4">
            Add Product
          </Link>
          <Link to="/users" className="btn btn-secondary btn-md px-4">
            View Users
          </Link>
        </div>
      )}

      {role === "user" && (
        <div className="mb-4 d-flex justify-content-center justify-content-md-start">
          <Link to="/profile" className="btn btn-info btn-md px-4">
            Profile
          </Link>
        </div>
      )}

      <div>
        <h4 className="mb-4 text-center text-md-start">Products List</h4>
        {services.length === 0 ? (
          <p className="text-center">No products available.</p>
        ) : (
          <div className="row g-3">
            {services.map((item) => (
              <div
                key={item.id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex"
              >
                <div className="card shadow-sm flex-fill d-flex flex-column">
                  <div
                    className="bg-light d-flex justify-content-center align-items-center"
                    style={{ height: "180px" }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ maxHeight: "160px", objectFit: "contain" }}
                      className="card-img-top p-3"
                    />
                  </div>

                  <div className="card-body d-flex flex-column">
                    <h6
                      className="card-title text-truncate"
                      title={item.title}
                      style={{ minHeight: "3rem" }}
                    >
                      {item.title}
                    </h6>
                    <p className="card-text fw-semibold mb-3">${item.price}</p>

                    {role === "user" && (
                      <button className="btn btn-success btn-sm mt-auto">
                        Request
                      </button>
                    )}

                    {role === "admin" && (
                      <div className="mt-auto d-flex justify-content-between">
                        {item.isLocal && (
                          <Link
                            to={`/edit/${item.id}`}
                            className="btn btn-warning btn-sm me-2 flex-grow-1"
                          >
                            Edit
                          </Link>
                        )}
                        <button
                          className="btn btn-danger btn-sm flex-grow-1"
                          onClick={() => handleDelete(item.id)}
                          aria-label={`Delete ${item.title}`}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
}
