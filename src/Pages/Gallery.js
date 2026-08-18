import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Website css/Gallery.css";
import Navebar from "../Components/Navebar";
import Footer from "../Components/Footer";

function Gallery() {
  const [foods, setFoods] = useState([]);

  const getFoods = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/foods");
      setFoods(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFoods();
  }, []);

  return (
    <>
      <Navebar />
      
      <section className="gallery-hero">
        <h1>Our Food Gallery</h1>
        <p>Every dish is prepared with passion and served with love.</p>
      </section>

      <section className="gallery-container">
        {foods.map((food) => (
          <div className="gallery-card" key={food._id}>
            <img src={food.image} alt={food.name} />
          </div>
        ))}
      </section>

      <section className="gallery-info">
        <h2>Fresh Ingredients. Beautiful Presentation.</h2>

        <p>
          At FoodHub every meal is crafted using fresh ingredients and
          presented with care. Our gallery showcases some of our signature
          dishes loved by thousands of customers.
        </p>
      </section>

      <Footer />
    </>
  );
}
export default Gallery;