import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Website css/Home.css";
import Navebar from "../Components/Navebar";
import Footer from "../Components/Footer";

function Home() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  // Get Categories
  const getCategories = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/categories"
      );

      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Navebar />

      <div className="home">

        {/* ================= HERO SECTION ================= */}

        <section className="hero-section">

          <div className="hero-content">

            <span className="hero-small">
              🍴 WELCOME TO OUR FOOD WORLD
            </span>

            <h1>
              Delicious Food
              <br />
              Made With
              <span> Love ❤️</span>
            </h1>

            <p>
              Enjoy fresh and tasty food prepared by our
              expert chefs. Quality ingredients with
              amazing taste delivered right to your door.
            </p>

            <div className="hero-buttons">

              <button
                className="order-btn"
                onClick={() => navigate("/menu")}
              >
                Order Now
                <span> →</span>
              </button>

              <button
                className="explore-btn"
                onClick={() => navigate("/menu")}
              >
                Explore Menu
              </button>

            </div>

            <div className="hero-stats">

              <div>
                <strong>100+</strong>
                <small>Food Items</small>
              </div>

              <div>
                <strong>50+</strong>
                <small>Happy Customers</small>
              </div>

              <div>
                <strong>10+</strong>
                <small>Expert Chefs</small>
              </div>

            </div>

          </div>

          <div className="hero-image">

            <div className="hero-circle"></div>

            <div className="floating-food food-one">
              🍕
            </div>

            <div className="floating-food food-two">
              🍔
            </div>

            <div className="floating-food food-three">
              🍟
            </div>

            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
              alt="Delicious food"
            />

          </div>

        </section>


        {/* ================= FEATURES ================= */}

        <section className="features">

          <div className="card">

            <div className="card-icon">
              🍕
            </div>

            <h3>
              Fresh Food
            </h3>

            <p>
              Fresh ingredients everyday
            </p>

            <span>
              ✓ Quality Guaranteed
            </span>

          </div>


          <div className="card">

            <div className="card-icon">
              👨‍🍳
            </div>

            <h3>
              Expert Chef
            </h3>

            <p>
              Professional cooking team
            </p>

            <span>
              ✓ Best Taste
            </span>

          </div>


          <div className="card">

            <div className="card-icon">
              🚚
            </div>

            <h3>
              Fast Delivery
            </h3>

            <p>
              Quick home delivery
            </p>

            <span>
              ✓ On Time Delivery
            </span>

          </div>

        </section>


        {/* ================= POPULAR ================= */}

        <section className="popular">

          <div className="section-heading">

            <span>
              🍽️ CHOOSE YOUR FAVORITE
            </span>

            <h1>
              Food Categories
            </h1>

            <p>
              Explore our delicious collection
              of freshly prepared foods.
            </p>

          </div>


          <div className="food-container">

            {categories.length > 0 ? (

              categories.map((category, index) => (

                <div
                  className="food-box"
                  key={category._id}
                  style={{
                    animationDelay:
                      `${index * 0.12}s`
                  }}
                  onClick={() =>
                    navigate("/menu", {
                      state: {
                        category:
                          category.name
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
                        View Menu →
                      </span>
                    </div>

                  </div>

                  <h3>
                    {category.name}
                  </h3>

                  <span>
                    Explore Now
                  </span>

                </div>

              ))

            ) : (

              <div className="category-loading">

                <div className="home-loader"></div>

                <p>
                  Loading Categories...
                </p>

              </div>

            )}

          </div>

        </section>


        {/* ================= CTA ================= */}

        <section className="home-cta">

          <div className="cta-content">

            <span>
              🔥 SPECIAL OFFER
            </span>

            <h2>
              Hungry? Let's Order
              Something Delicious!
            </h2>

            <p>
              Discover amazing food and enjoy
              delicious meals with your loved ones.
            </p>

            <button
              onClick={() => navigate("/menu")}
            >
              Order Your Food →
            </button>

          </div>

        </section>

      </div>

      <Footer />
    </>
  );
}

export default Home;
