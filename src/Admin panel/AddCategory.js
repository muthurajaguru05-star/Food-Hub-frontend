import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Swal from "sweetalert2";

import {
  FaTags,
  FaTag,
  FaCloudUploadAlt,
  FaArrowLeft,
  FaPlus,
  FaTimes,
  FaImage,
  FaCheckCircle,
} from "react-icons/fa";
import "../Admin css/AddCategory.css";

function AddCategory() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else if (file) {
      Swal.fire({
        icon: "warning",
        title: "Invalid File Type",
        text: "Please upload an image file (JPG, PNG, WEBP, etc.)",
      });
    }
  };

  const handleImageChange = (e) => {
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
    setImage(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !image) {
      Swal.fire({
        icon: "warning",
        title: "Missing Required Fields",
        text: "Please enter a category name and upload a category image.",
        confirmButtonColor: "#ff5722",
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("image", image);

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/categories",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res.data);

      await Swal.fire({
        icon: "success",
        title: "Category Added! 🎉",
        text: "New food category created successfully.",
        timer: 1800,
        showConfirmButton: false,
      });

      navigate("/categories");
    } catch (error) {
      console.log(error.response?.data || error.message);

      Swal.fire({
        icon: "error",
        title: "Failed to Add Category",
        text:
          error.response?.data?.message ||
          "Something went wrong while saving category. Please try again!",
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

        <div className="add-category-wrapper">
          {/* Compact Header Navigation & Banner */}
          <div className="add-cat-header">
            <Link to="/categories" className="add-cat-back-btn">
              <FaArrowLeft /> Back to Categories
            </Link>

            <div className="cat-title-flex">
              <div className="category-icon-badge">
                <FaTags />
              </div>
              <div className="cat-title-text">
                <h2>Add New Category</h2>
                <p>Create and organize your restaurant's food menu categories</p>
              </div>
              <span className="live-status-tag">
                <span className="pulse-dot"></span> Live Manager
              </span>
            </div>
          </div>

          {/* Form Card */}
          <div className="add-category-card">
            <div className="card-ambient-glow"></div>

            <form onSubmit={handleSubmit} className="category-form">
              <div className="category-form-grid">
                {/* Left Column: Name & Dropzone */}
                <div className="form-left-col">
                  <div className="form-group">
                    <label htmlFor="cat-name">
                      Category Name <span className="req-star">*</span>
                    </label>
                    <div className="input-with-icon">
                      <FaTag className="input-icon" />
                      <input
                        id="cat-name"
                        type="text"
                        name="name"
                        placeholder="e.g. Italian Pizza, Burgers, Desserts"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        maxLength={40}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>
                      Category Image <span className="req-star">*</span>
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
                        onChange={handleImageChange}
                        className="hidden-file-input"
                      />

                      <div className="dropzone-content">
                        <div className="upload-icon-circle">
                          <FaCloudUploadAlt />
                        </div>
                        <h4>
                          {dragActive
                            ? "Drop image here..."
                            : "Click or drag image photo"}
                        </h4>
                        <p>PNG, JPG, WEBP (Max: 5MB)</p>
                      </div>
                    </div>
                  </div>

                  {/* Buttons on Left */}
                  <div className="form-actions">
                    <button
                      type="submit"
                      className="add-category-btn"
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
                          Add Category
                        </>
                      )}
                    </button>

                    <Link to="/categories" className="cancel-btn">
                      Cancel
                    </Link>
                  </div>
                </div>

                {/* Right Column: Live Image Preview */}
                <div className="form-right-col">
                  {preview ? (
                    <div className="category-preview-card">
                      <div className="preview-header">
                        <span className="preview-label">
                          <FaImage /> Image Preview
                        </span>
                        <button
                          type="button"
                          className="remove-img-btn"
                          onClick={removeImage}
                          title="Remove image"
                        >
                          <FaTimes /> Clear
                        </button>
                      </div>

                      <div className="preview-img-container">
                        <img src={preview} alt="Category Preview" />
                        <div className="preview-overlay">
                          <FaCheckCircle className="check-icon" />
                          <span>Ready</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="preview-placeholder-card">
                      <FaImage className="placeholder-icon" />
                      <p>Image preview will appear here upon upload</p>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCategory;