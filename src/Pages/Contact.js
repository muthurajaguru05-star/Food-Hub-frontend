import React, { useState } from "react";
import "../Website css/Contact.css";
import Navebar from "../Components/Navebar";
import Footer from "../Components/Footer";
import axios from "axios";
import Swal from "sweetalert2";
import { 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaClock, 
  FaPaperPlane, 
  FaUtensils, 
  FaHeadset, 
  FaCheckCircle 
} from "react-icons/fa";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/contact",
        form
      );

      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: res.data.message || "Thank you for reaching out. We will get back to you soon!",
        confirmButtonColor: "#ff5722",
        customClass: {
          popup: "custom-swal-popup"
        }
      });

      setForm({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Could not send your message. Please try again later.",
        confirmButtonColor: "#ff5722"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page-wrapper">
      {/* Navbar */}
      <Navebar />

      {/* Modern Hero Section */}
      <section className="contact-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-badge">
            <FaUtensils className="badge-icon" /> We're Here For You
          </span>
          <h1>Get In Touch With <span className="highlight-text">FoodHub</span></h1>
          <p>
            Have a question, feedback, or want to reserve a table? Reach out to us anytime and our team will get right back to you!
          </p>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,48C840,43,960,53,1080,58.7C1200,64,1320,64,1380,64L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z" fill="#ffffff"></path>
          </svg>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="contact-container">
        {/* Left Side Info Cards */}
        <div className="contact-info">
          <div className="section-header">
            <span className="sub-title">Contact Information</span>
            <h2>Let's Start a Conversation</h2>
            <p>
              Whether you have inquiries about our menu, special catering requests, or reservations, our team is always ready to assist.
            </p>
          </div>

          <div className="info-cards-grid">
            <div className="info-box">
              <div className="info-icon-wrapper">
                <FaMapMarkerAlt className="info-icon" />
              </div>
              <div className="info-text">
                <h3>Our Location</h3>
                <p>123 Food Street, Chennai, Tamil Nadu</p>
              </div>
            </div>

            <div className="info-box">
              <div className="info-icon-wrapper">
                <FaPhoneAlt className="info-icon" />
              </div>
              <div className="info-text">
                <h3>Phone Number</h3>
                <p>+91 9876543210</p>
                <span className="small-note">Direct line for quick reservations</span>
              </div>
            </div>

            <div className="info-box">
              <div className="info-icon-wrapper">
                <FaEnvelope className="info-icon" />
              </div>
              <div className="info-text">
                <h3>Email Address</h3>
                <p>foodhub@gmail.com</p>
                <span className="small-note">We reply within 24 hours</span>
              </div>
            </div>

            <div className="info-box">
              <div className="info-icon-wrapper">
                <FaClock className="info-icon" />
              </div>
              <div className="info-text">
                <h3>Opening Hours</h3>
                <p>Mon - Sun: 10:00 AM - 11:00 PM</p>
                <span className="open-badge"><FaCheckCircle /> Open Today</span>
              </div>
            </div>
          </div>

          {/* Quick Support Card */}
          <div className="support-banner">
            <div className="support-icon">
              <FaHeadset />
            </div>
            <div className="support-details">
              <h4>Need Instant Assistance?</h4>
              <p>Call our hotline for immediate table bookings or order tracking.</p>
            </div>
          </div>
        </div>

        {/* Right Side Contact Form */}
        <div className="contact-form-wrapper">
          <div className="form-card">
            <div className="form-header">
              <h2>Send Us a Message</h2>
              <p>Fill out the form below and we'll reply as soon as possible.</p>
            </div>

            <form onSubmit={handleSubmit} className="modern-form">
              <div className="input-group">
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="subject">Subject</label>
                <input 
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Table Reservation / Catering / Feedback"
                  value={form.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="message">Your Message</label>
                <textarea 
                  id="message"
                  rows="5"
                  name="message"
                  placeholder="Write your message here..."
                  value={form.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? (
                  <span className="btn-loader">Sending...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <FaPaperPlane className="btn-icon" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="map-section">
        <div className="map-header">
          <h2>Find Us On The Map</h2>
          <p>Visit our main branch in Chennai for an exquisite dining experience.</p>
        </div>
        <div className="map-container">
          <iframe
            title="FoodHub Location"
            src="https://www.google.com/maps?q=Chennai&output=embed"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Contact;