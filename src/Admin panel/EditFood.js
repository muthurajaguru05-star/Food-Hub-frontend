import React, { useCallback, useState, useEffect, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
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
  FaEdit,
  FaTimes,
  FaImage,
  FaCheckCircle,
} from "react-icons/fa";
import "../Admin css/AddFood.css";

function EditFood() {
  const navigate = useNavigate();
  const { id } = useParams();
  const fileInputRef = useRef(null);

  const [categories, setCategories] = useState([]);
  const [food, setFood] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const getCategories = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const getFood = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/foods/${id}`);
      setFood({
        name: res.data.name,
        category: res.data.category,
        price: res.data.price,
        description: res.data.description,
        image: null,
      });
      setPreview(res.data.image);
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Could not retrieve food item details.",
      });
    }
  }, [id]);

  useEffect(() => {
    getCategories();
    getFood();
  }, [getCategories, getFood]);

  // Input Change
  const handleChange = (e) => {
    setFood({
      ...food,
      [e.target.name]: e.target.value,
    });
  };

  // Image Selection Handler
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
        text: "Please select an image file.",
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

  const resetImage = () => {
    getFood();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Update Food
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!food.name.trim() || !food.category || !food.price || !food.description.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Required Fields",
        text: "Please complete all required fields.",
        confirmButtonColor: "#ff5722",
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", food.name.trim());
    formData.append("category", food.category);
    formData.append("price", food.price);
    formData.append("description", food.description.trim());

    if (food.image) {
      formData.append("image", food.image);
    }

    try {
      setLoading(true);
      await axios.put(`http://localhost:5000/api/foods/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Food Updated Successfully",
      }).then(() => {
        navigate("/admin/manage-food");
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Update Failed",
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
                <FaEdit />
              </div>
              <div className="food-title-text">
                <h2>Edit Food</h2>
                <p>Modify pricing, category, description, or image</p>
              </div>
              <span className="live-status-tag">
                <span className="pulse-dot"></span> Live Editor
              </span>
            </div>
          </div>

          {/* Form Card */}
          <div className="add-food-card">
            <div className="card-ambient-glow"></div>

            <form onSubmit={handleSubmit} className="food-form">
              <div className="food-form-grid">
                {/* Left Column */}
                <div className="food-left-col">
                  {/* Food Name */}
                  <div className="form-group">
                    <label htmlFor="edit-food-name">
                      Food Name <span className="req-star">*</span>
                    </label>
                    <div className="input-with-icon">
                      <FaUtensils className="input-icon" />
                      <input
                        id="edit-food-name"
                        type="text"
                        name="name"
                        value={food.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Grid 2 Columns: Category & Price */}
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label htmlFor="edit-food-cat">
                        Category <span className="req-star">*</span>
                      </label>
                      <div className="input-with-icon">
                        <FaLayerGroup className="input-icon" />
                        <select
                          id="edit-food-cat"
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
                      <label htmlFor="edit-food-price">
                        Price <span className="req-star">*</span>
                      </label>
                      <div className="input-with-icon">
                        <FaRupeeSign className="input-icon" />
                        <input
                          id="edit-food-price"
                          type="number"
                          name="price"
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
                    <label htmlFor="edit-food-desc">
                      Description <span className="req-star">*</span>
                    </label>
                    <div className="input-with-icon textarea-wrap">
                      <FaAlignLeft className="input-icon area-icon" />
                      <textarea
                        id="edit-food-desc"
                        rows="2"
                        name="description"
                        value={food.description}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="food-right-col">
                  {/* Upload Dropzone */}
                  <div className="form-group">
                    <label>Change Image</label>
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
                      />

                      <div className="dropzone-content">
                        <div className="upload-icon-circle">
                          <FaCloudUploadAlt />
                        </div>
                        <h4>
                          {dragActive
                            ? "Drop new image here..."
                            : "Click or drag to replace photo"}
                        </h4>
                      </div>
                    </div>
                  </div>

                  {/* Preview */}
                  {preview ? (
                    <div className="food-preview-card">
                      <div className="preview-header">
                        <span className="preview-label">
                          <FaImage /> {food.image ? "New Photo" : "Current Image"}
                        </span>
                        {food.image && (
                          <button
                            type="button"
                            className="remove-img-btn"
                            onClick={resetImage}
                          >
                            <FaTimes /> Revert
                          </button>
                        )}
                      </div>

                      <div className="preview-img-container">
                        <img src={preview} alt="Food Dish Preview" />
                        <div className="preview-overlay">
                          <FaCheckCircle className="check-icon" />
                          <span>{food.image ? "New Image Selected" : "Active Photo"}</span>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {/* Action Buttons */}
                  <div className="form-actions">
                    <button
                      type="submit"
                      className="save-btn"
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
                          Update Food
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

export default EditFood;