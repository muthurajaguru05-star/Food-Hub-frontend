import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  FaHome,
  FaUtensils,
  FaShoppingCart,
  FaUsers,
  FaSignOutAlt,
  FaThLarge,
} from "react-icons/fa";

import Swal from "sweetalert2";
import "../Admin css/Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = async () => {
    const result = await Swal.fire({
      title: "Are you sure you want to logout?",
      text: "You will need to login again to access the admin panel.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ff5722",
      cancelButtonColor: "#6c757d",
      reverseButtons: false,
    });

    if (result.isConfirmed) {
      localStorage.removeItem("admin");
      await Swal.fire({
        icon: "success",
        title: "Logged Out Successfully",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/admin");
    }
  };

  return (
    <div className="sidebar">

      <div className="logo">
        🍔 FoodHub
      </div>

      <ul>

        <li className={location.pathname === "/admin/dashboard" ? "active" : ""}>
          <Link to="/dashboard">
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