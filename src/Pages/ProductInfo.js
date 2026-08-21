import React,{useEffect,useState} from "react";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";
import Navebar from "../Components/Navebar";
import Footer from "../Components/Footer";
import Swal from "sweetalert2";
import "../Website css/ProductInfo.css";

function ProductInfo(){

const {id}=useParams();
const navigate = useNavigate();

const [food,setFood]=useState({});

useEffect(()=>{
  const getFood = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/foods/${id}`
    );

    setFood(res.data);
  };

  getFood();
},[id]);

const addToCart=()=>{

const isLogin = localStorage.getItem("isLogin") === "true";

if(!isLogin) {
  Swal.fire({
    icon: "warning",
    title: "Login Required",
    text: "Please login to add items to cart",
    timer: 2000,
    showConfirmButton: false
  });
  setTimeout(() => {
    navigate("/login");
  }, 2000);
  return;
}

let cart=JSON.parse(localStorage.getItem("cart"))||[];

cart.push({
_id:food._id,
name:food.name,
price:food.price,
category:food.category,
image:food.image,
qty:1
});

localStorage.setItem("cart",JSON.stringify(cart));

window.dispatchEvent(new Event("cartUpdated"));

Swal.fire({
toast:true,
position:"top-end",
icon:"success",
title: `${food.name} Added To Cart`,
showConfirmButton:false,
timer:1800,
timerProgressBar: true
});

}

const buyNow = () => {
  const isLogin = localStorage.getItem("isLogin") === "true";

  if(!isLogin) {
    Swal.fire({
      icon: "warning",
      title: "Login Required",
      text: "Please login to buy items",
      timer: 2000,
      showConfirmButton: false
    });
    setTimeout(() => {
      navigate("/login");
    }, 2000);
    return;
  }

  let cart=JSON.parse(localStorage.getItem("cart"))||[];
  
  // Add to cart with qty 1
  cart.push({
    _id:food._id,
    name:food.name,
    price:food.price,
    category:food.category,
    image:food.image,
    qty:1
  });

  localStorage.setItem("cart",JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));

  navigate("/cart");
}

return(
<>

<Navebar/>

<div className="product-page">

<div className="product-box">

<div className="product-image">

<img
src={food.image}
alt={food.name}
/>

</div>

<div className="product-details">

<h1>{food.name}</h1>

<h2>
₹{food.price}
</h2>

<h4>{food.category}</h4>

 <h3>Discription :</h3>
<p>
{food.description}
</p>

<div className="btn-group">

<button
className="cart-btn"
onClick={addToCart}
>
ADD TO CART
</button>

<button
className="buy-btn"
onClick={buyNow}
>
BUY NOW
</button>

</div>

</div>

</div>

</div>

<Footer/>

</>
)
}
export default ProductInfo;