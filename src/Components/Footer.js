import React from "react";
import { Link } from "react-router-dom";
import { 
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaPhone,
  FaEnvelope
} from "react-icons/fa";
import "../Website css/Footer.css";

function Footer(){
     return(

      <footer className="footer">

      <div className="footer-container">

        <div className="footer-box">
          <h2> Food<span>Hub</span></h2>
          <p> Delicious food made with love. Fresh taste and quality ingredients.</p>
        </div>

        <div className="footer-box">

          <h3> Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/about">About</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/contact">Contact</Link>

        </div>

        <div className="footer-box">
          <h3>Contact</h3>

          <p>
            <FaPhone/>
            +91 9876543210
          </p>

          <p>
            <FaEnvelope/>
            foodhub@gmail.com
          </p>
        </div>

        <div className="footer-box">

          <h3>Follow Us</h3>

          <div className="social">

            <FaFacebook/>
            <FaInstagram/>
            <FaTwitter/>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
          © 2026 FoodHub | All Rights Reserved
      </div>
      
    </footer>
  );
}
export default Footer;