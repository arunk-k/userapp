import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [form, setForm] = useState({ title: "", price: "", description: "", image: "", category: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      alert("Access denied");
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const stored = JSON.parse(sessionStorage.getItem("products")) || [];
    const newProduct = { ...form, id: Date.now(), isLocal: true };
    stored.push(newProduct);
    sessionStorage.setItem("products", JSON.stringify(stored));

    alert("Product added!");
    navigate("/dashboard");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4 text-center">Add New Product</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="title" className="form-label fw-semibold">
            Product Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter product title"
            required
            autoComplete="off"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label fw-semibold">
            Price ($)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter price"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label fw-semibold">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="form-control"
            rows="3"
            placeholder="Enter product description"
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label fw-semibold">
            Image URL
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={form.image}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter image URL"
            required
            autoComplete="off"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="form-label fw-semibold">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter product category"
            required
            autoComplete="off"
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-success btn-lg">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
