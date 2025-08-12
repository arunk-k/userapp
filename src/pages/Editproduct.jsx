import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      alert("Access denied");
      navigate("/login");
      return;
    }

    const stored = JSON.parse(sessionStorage.getItem("products")) || [];
    const product = stored.find((p) => p.id.toString() === id.toString());
    if (product && product.isLocal) {
      setForm(product);
    } else {
      alert("Only locally added products can be edited!");
      navigate("/dashboard");
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const stored = JSON.parse(sessionStorage.getItem("products")) || [];
    const updated = stored.map((p) =>
      p.id.toString() === id.toString() ? { ...form } : p
    );
    sessionStorage.setItem("products", JSON.stringify(updated));

    alert("Product updated!");
    navigate("/dashboard");
  };

  if (!form) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4 text-center">Edit Product</h2>
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
          <button type="submit" className="btn btn-primary btn-lg">
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
}
