import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Website css/Home.css";
import Navebar from "../Components/Navebar";
import Footer from "../Components/Footer";
import { 
  FaUtensils, 
  FaArrowRight, 
  FaShippingFast, 
  FaConciergeBell, 
  FaFire, 
  FaStar, 
  FaHeart 
} from "react-icons/fa";

function Home() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get Categories
  const getCategories = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/categories"
      );
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="home-wrapper">
      <Navebar />

      <div className="home">

        {/* ================= HERO SECTION ================= */}
        <section className="hero-section">
          <div className="hero-content">
            <span className="hero-small">
              <FaUtensils className="hero-small-icon" /> WELCOME TO OUR FOOD WORLD
            </span>

            <h1>
              Delicious Food
              <br />
              Made With
              <span className="love-span"> Love <FaHeart className="heart-icon" /></span>
            </h1>

            <p>
              Enjoy fresh and tasty food prepared by our expert chefs. 
              Quality ingredients with amazing taste delivered right to your door.
            </p>

            <div className="hero-buttons">
              <button
                className="order-btn"
                onClick={() => navigate("/menu")}
              >
                <span>Order Now</span>
                <FaArrowRight className="btn-arrow" />
              </button>

              <button
                className="explore-btn"
                onClick={() => navigate("/menu")}
              >
                Explore Menu
              </button>
            </div>

            <div className="hero-stats">
              <div className="stat-card">
                <strong>100+</strong>
                <small>Food Items</small>
              </div>

              <div className="stat-divider"></div>

              <div className="stat-card">
                <strong>50k+</strong>
                <small>Happy Foodies</small>
              </div>

              <div className="stat-divider"></div>

              <div className="stat-card">
                <strong>10+</strong>
                <small>Master Chefs</small>
              </div>
            </div>
          </div>

          <div className="hero-image">
            <div className="hero-circle"></div>
            <div className="hero-glow"></div>

            <div className="floating-food food-one" title="Pizza">
              🍕
            </div>

            <div className="floating-food food-two" title="Burger">
              🍔
            </div>

            <div className="floating-food food-three" title="Fries">
              🍟
            </div>

            <div className="hero-rating-badge">
              <div className="rating-stars">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <span>4.9 / 5.0 (2.5k Reviews)</span>
            </div>

            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80"
              alt="Delicious food"
            />
          </div>
        </section>

        {/* ================= FEATURES ================= */}
        <section className="features">
          <div className="features-header">
            <span className="sub-title">Why Choose FoodHub</span>
            <h2>We Serve The Best For You</h2>
          </div>

          <div className="features-grid">
            <div className="card">
              <div className="card-icon-wrapper">
                <div className="card-icon">
                  <FaUtensils />
                </div>
              </div>
              <h3>Fresh Food</h3>
              <p>Hand-picked organic fresh ingredients everyday for maximum flavor.</p>
              <span className="card-badge">✓ Quality Guaranteed</span>
            </div>

            <div className="card">
              <div className="card-icon-wrapper">
                <div className="card-icon">
                  <FaConciergeBell />
                </div>
              </div>
              <h3>Expert Chefs</h3>
              <p>Award-winning professional culinary team crafting every dish.</p>
              <span className="card-badge">✓ Signature Taste</span>
            </div>

            <div className="card">
              <div className="card-icon-wrapper">
                <div className="card-icon">
                  <FaShippingFast />
                </div>
              </div>
              <h3>Fast Delivery</h3>
              <p>Hot, fresh & lightning-fast delivery straight to your doorstep.</p>
              <span className="card-badge">✓ 30 Min Delivery</span>
            </div>
          </div>
        </section>

        {/* ================= POPULAR CATEGORIES ================= */}
        <section className="popular">
          <div className="section-heading">
            <span className="sub-badge">
              🍽️ CHOOSE YOUR FAVORITE
            </span>

            <h2>Food Categories</h2>

            <p>
              Explore our wide variety of mouth-watering dishes made fresh to order.
            </p>
          </div>

          <div className="food-container">
            {!loading && categories.length > 0 ? (
              categories.map((category, index) => (
                <div
                  className="food-box"
                  key={category._id || index}
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                  onClick={() =>
                    navigate("/menu", {
                      state: {
                        category: category.name
                      }
                    })
                  }
                >
                  <div className="food-image">
                    <img
                      src={category.image}
                      alt={category.name}
                    />
                    <div className="food-overlay">
                      <span>
                        View Menu <FaArrowRight className="overlay-arrow" />
                      </span>
                    </div>
                  </div>

                  <div className="food-details">
                    <h3>{category.name}</h3>
                    <span className="explore-link">
                      Explore Now <FaArrowRight />
                    </span>
                  </div>
                </div>
              ))
            ) : loading ? (
              <div className="category-loading">
                <div className="home-loader"></div>
                <p>Fetching delicious categories...</p>
              </div>
            ) : (
              <div className="no-categories">
                <p>No categories available right now.</p>
              </div>
            )}
          </div>
        </section>

        {/* ================= CTA BANNER ================= */}
        <section className="home-cta">
          <div className="cta-overlay"></div>
          <div className="cta-content">
            <span className="cta-badge">
              <FaFire /> SPECIAL OFFER TODAY
            </span>

            <h2>
              Hungry? Let's Order<br />
              Something Extraordinary!
            </h2>

            <p>
              Get 20% OFF on your first order with code <strong className="promo-code">FOODHUB20</strong>
            </p>

            <button
              className="cta-btn"
              onClick={() => navigate("/menu")}
            >
              <span>Order Your Food</span>
              <FaArrowRight />
            </button>
          </div>
        </section>

      </div>

      <Footer />
    </div>
  );
}

export default Home;

