import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  FaHome,
  FaUtensils,
  FaPlusCircle,
  FaEdit,
  FaShoppingCart,
  FaUsers,
  FaImages,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
    FaThLarge,

} from "react-icons/fa";

import "../Admin css/Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/admin");
  };

  return (
    <div className="sidebar">

      <div className="logo">
        🍔 FoodHub
      </div>

      <ul>

        <li className={location.pathname === "/admin/dashboard" ? "active" : ""}>
          <Link to="/">
            <FaHome />
            <span>Dashboard</span>
          </Link>
        </li>

        <li className={location.pathname === "/admin/manage-food" ? "active" : ""}>
          <Link to="/admin/manage-food">
            <FaUtensils />
            <span>Manage Food</span>
          </Link>
        </li>
                     

          <li className={location.pathname === "/admin/categories" ? "active" : ""}>
          <Link to="/admin/categories">
            <FaThLarge/>

            <span>Category</span>
          </Link>
        </li>


        <li className={location.pathname === "/admin/orders" ? "active" : ""}>
          <Link to="/admin/orders">
            <FaShoppingCart />
            <span>Orders</span>
          </Link>
        </li>

        <li className={location.pathname === "/admin/users" ? "active" : ""}>
          <Link to="/admin/users">
            <FaUsers />
            <span>Users</span>
          </Link>
        </li>

      </ul>

      <button className="logout-btn" onClick={logout}>
        <FaSignOutAlt />
        Logout
      </button>

    </div>
  );
}

export default Sidebar;