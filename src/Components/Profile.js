import React,{useEffect,useState} from "react";
import axios from "axios";
import {FaUserCircle} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

import "../Website css/Profile.css";

import Navebar from "../Components/Navebar";
import Footer from "../Components/Footer";




function Profile(){


const navigate=useNavigate();


const [user,setUser]=useState(null);

const [orders,setOrders]=useState([]);




useEffect(()=>{


const loginUser =
JSON.parse(
localStorage.getItem("user")
);



if(!loginUser){

navigate("/login");

return;

}



setUser(loginUser);


getOrders(loginUser._id);


},[]);







const getOrders=async(id)=>{


try{


const res =
await axios.get(

`http://localhost:5000/api/orders/user/${id}`

);



setOrders(res.data);


}

catch(error){

console.log(error);

}


};






if(!user)

return null;





return(

<>

<Navebar/>


<div className="profile-page">


<div className="profile-card">


<div className="profile-header">


<FaUserCircle/>


<h2>
{user.name}
</h2>


<p>
{user.email}
</p>


</div>





<div className="profile-details">


<h3>
Personal Details
</h3>


<p>
Name : {user.name}
</p>


<p>
Email : {user.email}
</p>


<p>
Contact : {user.contact}
</p>


</div>






<h2>
My Orders
</h2>





{

orders.length===0 ?


<h3>
No Orders Found
</h3>



:


orders.map((order,index)=>(


<div

className="order-card"

key={order._id}

>


<h3>
Order #{index+1}
</h3>



<p>
Status : {order.status}
</p>



<p>
Total : ₹{order.total}
</p>



<p>
Payment : {order.payment}
</p>




<hr/>





{

order.items.map((item,i)=>(


<div

className="order-item"

key={i}

>


<img

src={item.image}

width="100"

alt={item.name}

/>




<div>


<h4>
{item.name}
</h4>


<p>
Quantity : {item.qty}
</p>


<p>
Price : ₹{item.price}
</p>


<p>
Subtotal : ₹{item.price*item.qty}
</p>



</div>


</div>



))


}




</div>



))


}



</div>


</div>



<Footer/>


</>

)


}


export default Profile;