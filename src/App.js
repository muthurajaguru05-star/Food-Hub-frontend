import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Components
import Navebar from "./Components/Navebar";
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";


// Pages
import Home from "./Pages/Home";
import Menu from "./Pages/Menu";
import About from "./Pages/About";
import Gallery from "./Pages/Gallery";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ProductInfo from "./Pages/ProductInfo";
import Profile from "./Components/Profile";


// import Footer from "./Components/Footer";



import AdminLogin from "./Admin panel/AdminLogin";
import Dashboard from "./Admin panel/Dashboard";
import ManageFood from "./Admin panel/ManageFood";
import AddFood from "./Admin panel/AddFood";
import Orders from "./Admin panel/Orders";
import Users from "./Admin panel/Users";
import Categories from "./Admin panel/Categories";
import AddCategory from "./Admin panel/AddCategory";
import EditCategory from "./Admin panel/EditCategory";
import EditFood from "./Admin panel/EditFood";



function App() {
  return (
    <BrowserRouter>

      {/* Uncomment this if you want the navbar on every page */}
      {/* <Navebar /> */}

      <Routes>
        <Route path="/navebar" element={<Navebar />} />
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductInfo/>}/>
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile/>}/>




           <Route path="/admin" element={<AdminLogin />} />
           <Route path="/dashboard" element={<Dashboard />} />
           <Route path="/admin/manage-food" element={<ManageFood/>}/>
           <Route path="/admin/add-food" element={<AddFood />}/>
           <Route path="/admin/orders" element={<Orders />}/>
           <Route path="/admin/users" element={<Users/>}/>
           <Route path="/admin/categories" element={<Categories/>}/>
           <Route path="/admin/add-category" element={<AddCategory/>}/>        
           <Route path="/categories" element={<Categories/>}/>
           <Route path="/admin/add-category" element={<AddCategory/>}/>
           <Route path="/admin/edit-category/:id" element={<EditCategory />}/>
           <Route path="/admin/edit-food/:id" element={<EditFood />}/>
           
    

      </Routes>
    </BrowserRouter>
  );
}
export default App;