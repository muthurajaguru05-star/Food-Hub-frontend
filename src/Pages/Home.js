import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Website css/Home.css";
import Navebar from "../Components/Navebar";
import Footer from "../Components/Footer";

function Home() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  
  // Get Categories //
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

  return (
    <>
      <Navebar />

      <div className="home">

        {/* Hero Section */}
        <section className="hero-section">

          <div className="hero-content">
            <h1>
              Delicious Food
              <br />
              Made With Love ❤️
            </h1>

            <p>
              Enjoy fresh and tasty food prepared by our expert chefs.
              Quality ingredients with amazing taste.
            </p>

               <button className="order-btn" onClick={() => navigate("/menu")}>
                     Order Now
                 </button>
            
          </div>

          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
              alt="food"
            />
          </div>

        </section>

         {/* Features */}
         <section className="features">

          <div className="card">
            <h2>🍕</h2>
            <h3>Fresh Food</h3>
            <p>Fresh ingredients everyday</p>
          </div>

          <div className="card">
            <h2>👨‍🍳</h2>
            <h3>Expert Chef</h3>
            <p>Professional cooking team</p>
          </div>

          <div className="card">
            <h2>🚚</h2>
            <h3>Fast Delivery</h3>
            <p>Quick home delivery</p>
          </div>
        </section>

        {/* Categories */}
        <section className="popular">

          <h1>Food Categories</h1>
               <div className="food-container">

              {categories.map((category) => (
             <div className="food-box"
              key={category._id}
              onClick={() =>
              navigate("/menu", {
              state: { category: category.name,},
             })
             }
             >
             <img src={category.image} alt={category.name}/>
             <h3>{category.name}</h3>
           </div>
            ))}

        </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
export default Home;