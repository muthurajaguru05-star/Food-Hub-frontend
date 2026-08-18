import React, { useState } from "react";
import "../Website css/Register.css";
import Navebar from "../Components/Navebar";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name:"",
    email:"",
    contact:"",
    password:"",
    role:"User"
  });

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    });
  };

  const handleSubmit = async (e) => {

  e.preventDefault();

  try {

  const res = await axios.post(
  "http://localhost:5000/api/register",
  formData
);

    Swal.fire({
      icon: "success",
      title: "Success",
      text: res.data.message,
      confirmButtonColor: "#ff6600"
    });
           
    setFormData({
      name: "",
      email: "",
      contact: "",
      password: "",
      role: "User"
    });
        setTimeout(() => {
  navigate("/login");
}, 1500);
  } catch (err) {
  console.log(err.response?.data);
  console.log(err);

  Swal.fire({
    icon: "error",
    title: "Error",
    text: err.response?.data?.message || "Registration Failed"
  });

}
  }

  return(
    <>

    <Navebar/>

    <section className="register-page">

      <div className="register-box">

        <h1>Create Account</h1>

        <p>Join FoodHub and enjoy delicious food</p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">

          <label>Name</label>

          <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
          />

          </div>

          <div className="input-group">
          <label>Email</label>
          <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
          />
          </div>

          <div className="input-group">

          <label>Contact Number</label>
          <input
          type="tel"
          name="contact"
          placeholder="Enter contact number"
          value={formData.contact}
          onChange={handleChange}
          required
          />

          </div>

          <div className="input-group">

          <label>Password</label>

          <input
          type="password"
          name="password"
          placeholder="Create password"
          value={formData.password}
          onChange={handleChange}
          required
          />

          </div>
          <div className="input-group">
          <label>Select Role</label>

          <select name="role"
          value={formData.role}
          onChange={handleChange}
          >

          <option value="User">User</option>
          </select>
          </div>

          <button className="register-btn"> Register</button>
        </form>
      </div>
    </section>

    </>
  );
}
export default Register;