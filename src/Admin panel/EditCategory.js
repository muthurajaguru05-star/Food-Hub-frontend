import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import {
  FaTag,
  FaCloudUploadAlt,
  FaArrowLeft,
  FaEdit,
  FaTimes,
  FaImage,
  FaCheckCircle,
} from "react-icons/fa";

import "../Admin css/AddCategory.css";

function EditCategory() {
  const navigate = useNavigate();
  const { id } = useParams();
  const fileInputRef = useRef(null);

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Load Category
  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/categories/${id}`
        );
        setName(res.data.name);
        setPreview(res.data.image);
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Load Failed",
          text: "Could not fetch category details.",
        });
      }
    };

    getCategory();
  }, [id]);

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else if (file) {
      Swal.fire({
        icon: "warning",
        title: "Invalid File Type",
        text: "Please select an image file (PNG, JPG, WEBP).",
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
    setPreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Update Category
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Name Required",
        text: "Please enter a category name.",
        confirmButtonColor: "#ff5722",
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", name.trim());
    if (image) {
      formData.append("image", image);
    }

    try {
      setLoading(true);
      await axios.put(
        `http://localhost:5000/api/categories/${id}`,
        formData
      );

      await Swal.fire({
        icon: "success",
        title: "Category Updated! 🎉",
        text: "Category details updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/categories");
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Could not update category details.",
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
          {/* Header Navigation */}
          <div className="add-cat-header">
            <Link to="/categories" className="add-cat-back-btn">
              <FaArrowLeft /> Back to Categories
            </Link>

            <div className="cat-title-flex">
              <div className="category-icon-badge">
                <FaEdit />
              </div>
              <div className="cat-title-text">
                <h2>Edit Category</h2>
                <p>Modify category name or update image banner</p>
              </div>
              <span className="live-status-tag">
                <span className="pulse-dot"></span> Live Editor
              </span>
            </div>
          </div>

          {/* Form Card */}
          <div className="add-category-card">
            <div className="card-ambient-glow"></div>

            <form onSubmit={handleSubmit} className="category-form">
              <div className="category-form-grid">
                {/* Left Column */}
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
                        placeholder="Enter category name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Update Category Image</label>

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
                            ? "Drop new image here..."
                            : "Click or drag to replace image"}
                        </h4>
                        <p>PNG, JPG, WEBP (Max: 5MB)</p>
                      </div>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button
                      type="submit"
                      className="add-category-btn"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="loading-spinner"></span>
                          Updating...
                        </>
                      ) : (
                        <>
                          <FaEdit />
                          Update Category
                        </>
                      )}
                    </button>

                    <Link to="/categories" className="cancel-btn">
                      Cancel
                    </Link>
                  </div>
                </div>

                {/* Right Column */}
                <div className="form-right-col">
                  {preview ? (
                    <div className="category-preview-card">
                      <div className="preview-header">
                        <span className="preview-label">
                          <FaImage /> {image ? "New Image" : "Current Image"}
                        </span>
                        {image && (
                          <button
                            type="button"
                            className="remove-img-btn"
                            onClick={removeImage}
                          >
                            <FaTimes /> Reset
                          </button>
                        )}
                      </div>

                      <div className="preview-img-container">
                        <img src={preview} alt="Category Preview" />
                        <div className="preview-overlay">
                          <FaCheckCircle className="check-icon" />
                          <span>{image ? "New Image Attached" : "Current Image Active"}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="preview-placeholder-card">
                      <FaImage className="placeholder-icon" />
                      <p>No category image present</p>
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

export default EditCategory;