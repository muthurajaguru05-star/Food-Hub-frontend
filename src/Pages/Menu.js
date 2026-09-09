import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Website css/Menu.css";
import Navebar from "../Components/Navebar";
import Footer from "../Components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Menu() {
  const navigate = useNavigate();
  const location = useLocation();

  const defaultCategory = location.state?.category || "All";

  const [selectedCategory, setSelectedCategory] =
    useState(defaultCategory);

  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);

  // Category from previous page
  useEffect(() => {
    if (location.state?.category) {
      setSelectedCategory(location.state.category);
    }
  }, [location.state]);

  // Get Categories
  const getCategories = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/categories"
      );

      setCategories(res.data);
    } catch (error) {
      console.log("Category Error:", error);
    }
  };

  // Get Foods
  const getFoods = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/foods"
      );

      setFoods(res.data);
      setFilteredFoods(res.data);
    } catch (error) {
      console.log("Food Error:", error);
    }
  };

  // Load data
  useEffect(() => {
    getCategories();
    getFoods();
  }, []);

  // Filter foods
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredFoods(foods);
    } else {
      setFilteredFoods(
        foods.filter(
          (food) => food.category === selectedCategory
        )
      );
    }
  }, [selectedCategory, foods]);

  // Add To Cart
  const addToCart = (food) => {
    const user = JSON.parse(localStorage.getItem("user"));

    // Check Login
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to add items to your cart.",
        confirmButtonColor: "#ff5722",
      }).then(() => {
        navigate("/login");
      });

      return;
    }

    let cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(
      (item) => item._id === food._id
    );

    if (existingItem) {
      existingItem.qty += 1;
    } else {
      cart.push({
        _id: food._id,
        name: food.name,
        price: food.price,
        category: food.category,
        image: food.image,
        qty: 1,
      });
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    // Update Navbar Cart
    window.dispatchEvent(
      new Event("cartUpdated")
    );

    // Success animation
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: `${food.name} Added To Cart`,
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
  };

  return (
    <>
      <Navebar />

      {/* ================= HEADER ================= */}

      <section className="menu-header">
        <div className="header-content">

          <span className="header-small">
            🍴 WELCOME TO OUR FOOD WORLD
          </span>

          <h1>
            Our <span>Delicious</span> Menu
          </h1>

          <p>
            Fresh • Healthy • Tasty
          </p>

          <div className="header-line"></div>

        </div>
      </section>

      {/* ================= CATEGORIES ================= */}

      <section className="categories">

        <button
          className={
            selectedCategory === "All"
              ? "active"
              : ""
          }
          onClick={() =>
            setSelectedCategory("All")
          }
        >
          🍽️ All
        </button>

        {categories.map((category) => (
          <button
            key={category._id}
            className={
              selectedCategory === category.name
                ? "active"
                : ""
            }
            onClick={() =>
              setSelectedCategory(category.name)
            }
          >
            {category.name}
          </button>
        ))}

      </section>

      {/* ================= FOOD CONTAINER ================= */}

      <section className="menu-container">

        {filteredFoods.length > 0 ? (
          filteredFoods.map((food, index) => (

            <div
              className="food-card"
              key={food._id}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
              onClick={() =>
                navigate(
                  `/product/${food._id}`
                )
              }
            >

              {/* Image */}

              <div className="food-image">

                <img
                  src={food.image}
                  alt={food.name}
                />

                <div className="image-overlay">
                  <span>
                    View Details →
                  </span>
                </div>

              </div>

              {/* Content */}

              <div className="food-content">

                <span className="food-name">
                  {food.name}
                </span>

                <p>
                  {food.category}
                </p>

                <h4>
                  ₹{food.price}
                </h4>

                <div className="rating">
                  ⭐⭐⭐⭐⭐
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(food);
                  }}
                >
                  🛒 Add To Cart
                </button>

              </div>

            </div>

          ))
        ) : (

          <div className="no-food">
            <div className="no-food-icon">
              🍽️
            </div>

            <h2>
              No Food Available
            </h2>

            <p>
              Sorry, no items are available
              in this category.
            </p>

            <button
              onClick={() =>
                setSelectedCategory("All")
              }
            >
              View All Foods
            </button>

          </div>

        )}

      </section>

      <Footer />
    </>
  );
}

export default Menu;