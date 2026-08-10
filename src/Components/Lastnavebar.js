import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaShoppingCart} from "react-icons/fa";
import "../Website css/Navebar.css";

function Lastnavebar(){
const [open,setOpen] = useState(false);

  return(
    <nav className="navbar">

      {/* Logo */}

      <div className="logo">
        Food<span>Hub</span>
      </div>

      {/* Menu */}
      <ul className={open ? "nav-links active" : "nav-links"}>
        <li>
        <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/menu">Menu</Link>
        </li>

        <li>
         <Link to="/about">About</Link>
        </li>

        <li>
          <Link to="/gallery">Gallery</Link>
        </li>

        <li>
          <Link to="/contact">Contact</Link>
        </li>

      </ul>

      {/* Right Side */}
      <div className="nav-right">
        
        <Link to="/cart" className="cart-btn">
          <FaShoppingCart/>
        </Link>

        <Link to="/booktable">
          <button className="book-btn">Book Table</button>
        </Link>

          <Link to="/login" className="login-btn">
          <FaUserCircle className="login-icon"/>
          <span>Login</span>
          </Link>

      </div>

      {/* Mobile Menu */}

      <div className="menu-icon"onClick={()=>setOpen(!open)}>☰</div>
    </nav>
  );
}
export default Lastnavebar;