import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navebar from "../Components/Navebar";
import Footer from "../Components/Footer";
import Swal from "sweetalert2";
import "../Website css/ProductInfo.css";

function ProductInfo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [food, setFood] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFood = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `http://localhost:5000/api/foods/${id}`
        );

        setFood(res.data);
      } catch (error) {
        console.log("Product Error:", error);

        Swal.fire({
          icon: "error",
          title: "Product Not Found",
          text: "Unable to load product details.",
          confirmButtonColor: "#ff5722",
        });
      } finally {
        setLoading(false);
      }
    };

    getFood();
  }, [id]);

  // =========================
  // ADD TO CART
  // =========================

  const addToCart = () => {
    const isLogin =
      localStorage.getItem("isLogin") === "true";

    if (!isLogin) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to add items to cart",
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);

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

    window.dispatchEvent(
      new Event("cartUpdated")
    );

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: `${food.name} Added To Cart`,
      showConfirmButton: false,
      timer: 1800,
      timerProgressBar: true,
    });
  };

  // =========================
  // BUY NOW
  // =========================

  const buyNow = () => {
    const isLogin =
      localStorage.getItem("isLogin") === "true";

    if (!isLogin) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to buy items",
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);

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

    window.dispatchEvent(
      new Event("cartUpdated")
    );

    navigate("/cart");
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <>
        <Navebar />

        <div className="product-page loading-page">
          <div className="loader"></div>
          <h3>Loading Product...</h3>
        </div>

        <Footer />
      </>
    );
  }

  // =========================
  // PRODUCT PAGE
  // =========================

  return (
    <>
      <Navebar />

      <div className="product-page">

        {/* Animated background */}
        <div className="background-shape shape-one"></div>
        <div className="background-shape shape-two"></div>
        <div className="background-shape shape-three"></div>

        <div className="product-box">

          {/* ================= IMAGE ================= */}

          <div className="product-image">

            <div className="image-circle"></div>

            <div className="image-badge">
              ✨ Fresh
            </div>

            <img
              src={food.image}
              alt={food.name}
            />

            <div className="image-shadow"></div>

          </div>

          {/* ================= DETAILS ================= */}

          <div className="product-details">

            <span className="product-label">
              🍴 OUR SPECIAL FOOD
            </span>

            <h1>
              {food.name}
            </h1>

            <div className="rating-box">
              <span>⭐⭐⭐⭐⭐</span>
              <small>
                5.0 Customer Rating
              </small>
            </div>

            <h2>
              ₹{food.price}
            </h2>

            <h4>
              {food.category}
            </h4>

            <h3>
              Description :
            </h3>

            <p>
              {food.description ||
                "Delicious and freshly prepared food made with quality ingredients. Enjoy the amazing taste and experience."}
            </p>

            <div className="product-info">

              <div className="info-item">
                <span>🍃</span>
                <div>
                  <strong>Fresh</strong>
                  <small>
                    Fresh Ingredients
                  </small>
                </div>
              </div>

              <div className="info-item">
                <span>⚡</span>
                <div>
                  <strong>Quality</strong>
                  <small>
                    Premium Quality
                  </small>
                </div>
              </div>

              <div className="info-item">
                <span>❤️</span>
                <div>
                  <strong>Healthy</strong>
                  <small>
                    Made With Care
                  </small>
                </div>
              </div>

            </div>

            {/* ================= BUTTONS ================= */}

            <div className="btn-group">

              <button
                className="cart-btn"
                onClick={addToCart}
              >
                🛒 ADD TO CART
              </button>

              <button
                className="buy-btn"
                onClick={buyNow}
              >
                ⚡ BUY NOW
              </button>

            </div>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default ProductInfo;