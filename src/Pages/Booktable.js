import React, { useState } from "react";
import "../Website css/Booktable.css";
import Navebar from "../Components/Navebar";
import Footer from "../Components/Footer";

function Booktable() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    message: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("🎉 Table Booked Successfully!");
  };

  return (
    <>
      <Navebar/>
      <section className="book-hero">
        <h1>Reserve Your Table</h1>
        <p>Book your table online and enjoy a delicious dining experience.</p>
      </section>

      <section className="booking-section">

        <div className="booking-info">

          <h2>Why Book With Us?</h2>

          <div className="info">
            <h3>🍽 Premium Dining</h3>
            <p>Enjoy delicious meals prepared by expert chefs.</p>
          </div>

          <div className="info">
            <h3>🎵 Live Music</h3>
            <p>Weekend live music with a relaxing atmosphere.</p>
          </div>

          <div className="info">
            <h3>🕒 Opening Hours</h3>
            <p>10:00 AM – 11:00 PM (Monday - Sunday)</p>
          </div>

          <div className="info">
            <h3>📍 Location</h3>
            <p>FoodHub Restaurant, Chennai</p>
          </div>

        </div>

        <div className="booking-form">

          <h2>Book Your Table</h2>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              required
            />

            <input
              type="date"
              name="date"
              onChange={handleChange}
              required
            />

            <input
              type="time"
              name="time"
              onChange={handleChange}
              required
            />

            <select
              name="guests"
              onChange={handleChange}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6+</option>
            </select>

            <textarea
              rows="5"
              name="message"
              placeholder="Special Request"
              onChange={handleChange}
            ></textarea>

            <button type="submit">
              Book Now
            </button>

          </form>

        </div>

      </section>
      <Footer/>

    </>
  );
}

export default Booktable;