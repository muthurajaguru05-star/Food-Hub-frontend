import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Website css/Menu.css";
import Navebar from "../Components/Navebar";
import Footer from "../Components/Footer";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


function Menu() {

    const navigate = useNavigate();
   
  const location = useLocation();

  const defaultCategory = location.state?.category || "All";

  const [selectedCategory, setSelectedCategory] =
    useState(defaultCategory);

  const [categories, setCategories] = useState([]);

  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);

  useEffect(() => {
    if (location.state?.category) {
      setSelectedCategory(location.state.category);
    }
  }, [location.state]);

  // Get Categories
  const getCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Get Foods
  const getFoods = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/foods");
      setFoods(res.data);
      setFilteredFoods(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategories();
    getFoods();
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredFoods(foods);
    } else {
      setFilteredFoods(
        foods.filter((food) => food.category === selectedCategory)
      );
    }
  }, [selectedCategory, foods]);

  const addToCart = (food) => {

  // Check Login
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    Swal.fire({
      icon: "warning",
      title: "Login Required",
      text: "Please login to add items to your cart.",
      confirmButtonColor: "#ff5722"
    }).then(() => {
      navigate("/login");
    });
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find(item => item._id === food._id);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({
      _id: food._id,
      name: food.name,
      price: food.price,
      category: food.category,
      image: food.image,
      qty: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  window.dispatchEvent(new Event("cartUpdated"));

  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "success",
    title: `${food.name} Added To Cart`,
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true
  });

};
  return (
    <>
      <Navebar />

      <section className="menu-header">
        <h1>Our Delicious Menu</h1>
        <p>Fresh • Healthy • Tasty</p>
      </section>

      <section className="categories">
        <button
          className={selectedCategory === "All" ? "active" : ""}
          onClick={() => setSelectedCategory("All")}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category._id}
            className={
              selectedCategory === category.name ? "active" : ""
            }
            onClick={() => setSelectedCategory(category.name)}
          >
            {category.name}
          </button>
        ))}
      </section>

      <section className="menu-container">
        {filteredFoods.map((food) => (
           <div
  className="food-card"
  key={food._id}
  onClick={() => navigate(`/product/${food._id}`)}
>
    <img src={food.image} alt={food.name} />

    <div className="food-content">

        <span>{food.name}</span>

        <p>{food.category}</p>

        <h4>₹{food.price}</h4>

        <div className="rating">
            ⭐⭐⭐⭐⭐
        </div>

        <button
            onClick={(e)=>{
                e.stopPropagation();
                addToCart(food);
            }}
        >
            Add To Cart
        </button>

    </div>

</div>
          
        ))}
      </section>

      <Footer />
    </>
  );
}

export default Menu;