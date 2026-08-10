import React from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import "../Admin css/Topbar.css";

function Topbar() {
  return (
    <div className="topbar">

      <div className="topbar-left">
        <h2>Admin Dashboard</h2>
      </div>

      <div className="topbar-right">

        <div className="notification">
          <FaBell />
          <span className="badge">3</span>
        </div>

        <div className="admin-profile">
          <FaUserCircle className="profile-icon" />

          <div className="profile-text">
            <h4>Admin</h4>
            <p>Administrator</p>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Topbar;