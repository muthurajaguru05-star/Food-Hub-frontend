import React, { useState } from "react";
import "../Website css/About.css";
import Navebar from "../Components/Navebar";
import Footer from "../Components/Footer";

function About() {

  const [open, setOpen] = useState(false);

  return (
    <>

      {/* Navbar */}
    <Navebar/>



      {/* Hero */}

      <section className="about-hero">

        <h1>About FoodHub</h1>

        <p>
          Delicious food made with love and served with happiness.
        </p>

      </section>



      {/* About */}

      <section className="about-section">

        <div className="about-image">

          <img
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900"
            alt="Restaurant"
          />

        </div>

        <div className="about-content">

          <h2>Welcome To FoodHub</h2>

          <p>
            FoodHub is a modern restaurant serving delicious food made from
            fresh ingredients. Our experienced chefs prepare every dish with
            passion to give customers an unforgettable dining experience.
          </p>

          <p>
            Whether you love pizza, burgers, pasta, desserts or healthy meals,
            we have something special for everyone.
          </p>

          <button>
            Explore Menu
          </button>

        </div>

      </section>



      {/* Why Choose Us */}

      <section className="why-us">

        <h1>Why Choose Us?</h1>

        <div className="why-container">

          <div className="why-card">
            <h2>🍕</h2>
            <h3>Fresh Ingredients</h3>
            <p>Only high-quality fresh ingredients are used.</p>
          </div>

          <div className="why-card">
            <h2>👨‍🍳</h2>
            <h3>Expert Chefs</h3>
            <p>Professional chefs with years of experience.</p>
          </div>

          <div className="why-card">
            <h2>🚚</h2>
            <h3>Fast Delivery</h3>
            <p>Quick and safe home delivery service.</p>
          </div>

          <div className="why-card">
            <h2>❤️</h2>
            <h3>Customer First</h3>
            <p>Your satisfaction is our highest priority.</p>
          </div>

        </div>

      </section>



      {/* Team */}

      <section className="team">

        <h1>Meet Our Chefs</h1>

        <div className="team-container">

          <div className="chef-card">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Chef"
            />
            <h3>John David</h3>
            <p>Head Chef</p>
          </div>

          <div className="chef-card">
            <img
              src="https://randomuser.me/api/portraits/women/45.jpg"
              alt="Chef"
            />
            <h3>Emma Rose</h3>
            <p>Pastry Chef</p>
          </div>

          <div className="chef-card">
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="Chef"
            />
            <h3>Michael Lee</h3>
            <p>Italian Chef</p>
          </div>

        </div>

      </section>



      {/* Stats */}

      <section className="stats">

        <div>
          <h1>10+</h1>
          <p>Years Experience</p>
        </div>

        <div>
          <h1>5000+</h1>
          <p>Happy Customers</p>
        </div>

        <div>
          <h1>100+</h1>
          <p>Food Items</p>
        </div>

        <div>
          <h1>25+</h1>
          <p>Professional Chefs</p>
        </div>

      </section>
      <Footer/>

    </>
  );
}

export default About;