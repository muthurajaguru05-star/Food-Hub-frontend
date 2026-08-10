import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import axios from "axios";
import Swal from "sweetalert2";
import "../Admin css/AddFood.css";

function EditFood() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [categories, setCategories] = useState([]);

  const [food, setFood] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState("");

  useEffect(() => {
    getCategories();
    getFood();
  }, []);

  // Get Categories
  const getCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Get Single Food
  const getFood = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/foods/${id}`
      );

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
    }
  };

  // Input Change
  const handleChange = (e) => {
    setFood({
      ...food,
      [e.target.name]: e.target.value,
    });
  };

  // Image Change
  const handleImage = (e) => {
    setFood({
      ...food,
      image: e.target.files[0],
    });
  };

  // Update Food
  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("name", food.name);
    formData.append("category", food.category);
    formData.append("price", food.price);
    formData.append("description", food.description);

    if (food.image) {
      formData.append("image", food.image);
    }

    try {

      await axios.put(
        `http://localhost:5000/api/foods/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

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

    }

  };

  return (
    <div className="admin">

      <Sidebar />

      <div className="main">

        <Topbar />

        <div className="add-food">

          <h2>Edit Food</h2>

          <form onSubmit={handleSubmit}>

            <div className="input-group">
              <label>Food Name</label>

              <input
                type="text"
                name="name"
                value={food.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">

              <label>Category</label>

              <select
                name="category"
                value={food.category}
                onChange={handleChange}
                required
              >

                <option value="">Select Category</option>

                {categories.map((category) => (

                  <option
                    key={category._id}
                    value={category.name}
                  >
                    {category.name}
                  </option>

                ))}

              </select>

            </div>

            <div className="input-group">

              <label>Price</label>

              <input
                type="number"
                name="price"
                value={food.price}
                onChange={handleChange}
                required
              />

            </div>

            <div className="input-group">

              <label>Description</label>

              <textarea
                rows="4"
                name="description"
                value={food.description}
                onChange={handleChange}
                required
              />

            </div>

            <div className="input-group">

              <label>Current Image</label>

              {preview && (
                <img
                  src={preview}
                  alt="food"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    marginBottom: "10px",
                  }}
                />
              )}

            </div>

            <div className="input-group">

              <label>Change Image</label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
              />

            </div>

            <button
              type="submit"
              className="save-btn"
            >
              Update Food
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default EditFood;