import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import axios from "axios";
import Swal from "sweetalert2";
import {
  FaUtensils,
  FaLayerGroup,
  FaRupeeSign,
  FaAlignLeft,
  FaCloudUploadAlt,
  FaArrowLeft,
  FaPlus,
  FaTimes,
  FaImage,
  FaCheckCircle,
} from "react-icons/fa";
import "../Admin css/AddFood.css";

function AddFood() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [food, setFood] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: null,
  });

  const [categories, setCategories] = useState([]);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Get Categories
  const getCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  // Input Change
  const handleChange = (e) => {
    setFood({
      ...food,
      [e.target.name]: e.target.value,
    });
  };

  // File Select Handler
  const handleFileSelect = (file) => {
    if (file && file.type.startsWith("image/")) {
      setFood({
        ...food,
        image: file,
      });
      setPreview(URL.createObjectURL(file));
    } else if (file) {
      Swal.fire({
        icon: "warning",
        title: "Invalid File",
        text: "Please select an image file (JPG, PNG, WEBP, etc.)",
      });
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const removeImage = () => {
    setFood({ ...food, image: null });
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!food.name.trim() || !food.category || !food.price || !food.description.trim() || !food.image) {
      Swal.fire({
        title: "Missing Fields",
        text: "Please fill in all required fields and upload a food image.",
        icon: "warning",
        confirmButtonColor: "#ff5722",
      });
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", food.name.trim());
      formData.append("category", food.category);
      formData.append("price", food.price);
      formData.append("description", food.description.trim());
      formData.append("image", food.image);

      const res = await axios.post("http://localhost:5000/api/foods", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res.data);

      await Swal.fire({
        title: "Success! 🎉",
        text: "Food Added Successfully",
        icon: "success",
        timer: 1800,
        confirmButtonColor: "#28a745",
      });

      navigate("/admin/manage-food");

      setFood({
        name: "",
        category: "",
        price: "",
        description: "",
        image: null,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: "Food Add Failed",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin">
      <Sidebar />

      <div className="main">
        <Topbar />

        <div className="add-food-wrapper">
          {/* Header Navigation */}
          <div className="add-food-header">
            <Link to="/admin/manage-food" className="add-food-back-btn">
              <FaArrowLeft /> Back to Manage Food
            </Link>

            <div className="food-title-flex">
              <div className="food-icon-badge">
                <FaUtensils />
              </div>
              <div className="food-title-text">
                <h2>Add New Food</h2>
                <p>Create a new food entry in your restaurant menu</p>
              </div>
              <span className="live-status-tag">
                <span className="pulse-dot"></span> Menu Studio
              </span>
            </div>
          </div>

          {/* Form Card */}
          <div className="add-food-card">
            <div className="card-ambient-glow"></div>

            <form onSubmit={handleSubmit} className="food-form">
              <div className="food-form-grid">
                {/* Left Column: Form Controls */}
                <div className="food-left-col">
                  {/* Food Name */}
                  <div className="form-group">
                    <label htmlFor="food-name">
                      Food Name <span className="req-star">*</span>
                    </label>
                    <div className="input-with-icon">
                      <FaUtensils className="input-icon" />
                      <input
                        id="food-name"
                        type="text"
                        name="name"
                        placeholder="Enter Food Name"
                        value={food.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Grid 2 Columns: Category & Price */}
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label htmlFor="food-cat">
                        Category <span className="req-star">*</span>
                      </label>
                      <div className="input-with-icon">
                        <FaLayerGroup className="input-icon" />
                        <select
                          id="food-cat"
                          name="category"
                          value={food.category}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Category</option>
                          {categories.map((category) => (
                            <option key={category._id} value={category.name}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="food-price">
                        Price <span className="req-star">*</span>
                      </label>
                      <div className="input-with-icon">
                        <FaRupeeSign className="input-icon" />
                        <input
                          id="food-price"
                          type="number"
                          name="price"
                          placeholder="Enter Price"
                          value={food.price}
                          onChange={handleChange}
                          required
                          min="0"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="form-group">
                    <label htmlFor="food-desc">
                      Description <span className="req-star">*</span>
                    </label>
                    <div className="input-with-icon textarea-wrap">
                      <FaAlignLeft className="input-icon area-icon" />
                      <textarea
                        id="food-desc"
                        name="description"
                        rows="2"
                        placeholder="Enter Description"
                        value={food.description}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Right Column: Photo Upload, Preview & Buttons */}
                <div className="food-right-col">
                  <div className="form-group">
                    <label>
                      Food Image <span className="req-star">*</span>
                    </label>
                    <div
                      className={`upload-dropzone ${dragActive ? "drag-active" : ""} ${
                        preview ? "has-file" : ""
                      }`}
                      onClick={() => fileInputRef.current?.click()}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImage}
                        className="hidden-file-input"
                        required
                      />

                      <div className="dropzone-content">
                        <div className="upload-icon-circle">
                          <FaCloudUploadAlt />
                        </div>
                        <h4>
                          {dragActive
                            ? "Drop photo here..."
                            : "Click or drag food picture"}
                        </h4>
                      </div>
                    </div>
                  </div>

                  {/* Preview or Placeholder */}
                  {preview ? (
                    <div className="food-preview-card">
                      <div className="preview-header">
                        <span className="preview-label">
                          <FaImage /> Dish Preview
                        </span>
                        <button
                          type="button"
                          className="remove-img-btn"
                          onClick={removeImage}
                        >
                          <FaTimes /> Clear
                        </button>
                      </div>

                      <div className="preview-img-container">
                        <img src={preview} alt="Food Dish Preview" />
                        <div className="preview-overlay">
                          <FaCheckCircle className="check-icon" />
                          <span>Ready</span>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {/* Submit Action Buttons */}
                  <div className="form-actions">
                    <button
                      type="submit"
                      className="save-btn"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="loading-spinner"></span>
                          Saving...
                        </>
                      ) : (
                        <>
                          <FaPlus />
                          Add Food
                        </>
                      )}
                    </button>

                    <Link to="/admin/manage-food" className="cancel-food-btn">
                      Cancel
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddFood;