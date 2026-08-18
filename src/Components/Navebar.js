import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import "../Website css/Navebar.css";
import Swal from "sweetalert2";

function Navebar() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // Load Cart
  const loadCart = () => {
    const data =
      JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
    setCartCount(
      data.reduce(
        (total, item) => total + item.qty,
        0
      )
    );

  };

  // Load User
  const loadUser = () => {

    const loginUser =
      JSON.parse(localStorage.getItem("user"));

    if(loginUser){
      setUser(loginUser);
    }
    else{
      setUser(null);
    }
  };

  useEffect(() => {
    loadCart();
    loadUser();

    // Login update

    window.addEventListener(
      "login",
      loadUser
    );

    // Logout update
    window.addEventListener(
      "logout",
      loadUser
    );

    // Cart update

    window.addEventListener(
      "cartUpdated",
      loadCart
    );

    return()=>{
      window.removeEventListener(
        "login",
        loadUser
      );

      window.removeEventListener(
        "logout",
        loadUser
      );

      window.removeEventListener(
        "cartUpdated",
        loadCart
      );
    };
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title:"Logout?",
      text:"Are you sure you want to logout?",
      icon:"warning",
      showCancelButton:true,
      confirmButtonColor:"#ff5722",
      cancelButtonColor:"#6c757d",
      confirmButtonText:"Yes",
      cancelButtonText:"No"
    }).then((result)=>{

      if(result.isConfirmed){
        localStorage.removeItem("user");
        localStorage.removeItem("isLogin");
        localStorage.removeItem("cart");

        // Navbar update
        window.dispatchEvent(
          new Event("logout")
        );

        Swal.fire({
          icon:"success",
          title:"Logged Out",
          text:"Logout Successfully",
          timer:1500,
          showConfirmButton:false
        });

        setTimeout(()=>{
          window.location.href="/login";
        },1500);}
    });
  };

return (

   <nav className="navbar">
   <div className="logo">
    Food<span>Hub</span>

   </div>
   <ul className={open ? "nav-links active":"nav-links"}>
   <li>
   <Link to="/">
    Home
   </Link>
   </li>

   <li>
<Link to="/menu">
Menu
</Link>
</li>

<li>
<Link to="/about">
About
</Link>
</li>

<li>
<Link to="/gallery">
Gallery
</Link>
</li>

<li>
<Link to="/contact">
Contact
</Link>
</li>

</ul>

<div className="nav-right">
{
user ?
<>

<Link
to="/profile"
className="navebarlogin-btn"
>


<FaUserCircle
className="navebarlogin-icon"
/>


<span>
{user.name}
</span>
</Link>

<button
className="logout-btn"
onClick={handleLogout}
>
Logout
</button>

</>

:

<Link
to="/login"
className="navebarlogin-btn"
>
<FaUserCircle
className="navebarlogin-icon"
/>
<span>
Login
</span>
</Link>
}

</div>

<div
className="menu-icon"
onClick={()=>setOpen(!open)}
>
☰
</div>


<div
className="cart-wrapper"
onMouseEnter={()=>setShowCart(true)}
onMouseLeave={()=>setShowCart(false)}
>


<Link

to="/cart"

className="navebarcart-btn"

>


<FaShoppingCart

className="navenarcart-icon"

/>




{

cartCount > 0 &&

<span className="cart-count">

{cartCount}

</span>

}



</Link>








{

showCart &&


<div className="cart-popup">


<h3>
Cart Items
</h3>


<hr/>





{

cart.length===0 ?


<p>
Your Cart is Empty
</p>



:


<>


{

cart.map((item,index)=>(


<div

className="popup-item"

key={index}

>


<img

src={item.image}

alt={item.name}

/>



<div>


<h4>

{item.name}

</h4>


<p>

Qty : {item.qty}

</p>


<span>

₹ {item.price}

</span>


</div>


</div>



))


}




<Link

to="/cart"

className="view-cart-btn"

>

View Cart

</Link>



</>



}




</div>



}



</div>






</nav>


);


}


export default Navebar;