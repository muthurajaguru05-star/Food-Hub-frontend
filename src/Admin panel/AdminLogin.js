import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Admin css/AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy Admin Login
    if (
      admin.email === "admin@gmail.com" &&
      admin.password === "admin123"
    ) {
      localStorage.setItem("admin", "true");
      alert("Login Successful");
      navigate("/admin/dashboard");
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h1>FoodHub Admin</h1>
        <p>Administrator Login</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter Admin Email"
              value={admin.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={admin.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;