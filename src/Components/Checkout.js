import React,{useState} from "react";
import "../Website css/Checkout.css";

import Navebar from "../Components/Navebar";
import Footer from "../Components/Footer";

import Swal from "sweetalert2";
import axios from "axios";
import {useNavigate} from "react-router-dom";



function Checkout(){


const navigate = useNavigate();



const user =
JSON.parse(
localStorage.getItem("user")
);



const cart =
JSON.parse(
localStorage.getItem("cart")
)||[];




const total =
cart.reduce(
(sum,item)=>
sum+(item.price*item.qty),
0
);




const [payment,setPayment]=useState(
"Cash On Delivery"
);




const [form,setForm]=useState({

name:"",
mobile:"",
address:"",
city:"",
pincode:""

});





const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};







const placeOrder=async()=>{


if(!user){


navigate("/login");

return;


}



if(

!form.name ||

!form.mobile ||

!form.address ||

!form.city ||

!form.pincode

){


Swal.fire({

icon:"warning",

title:"Fill All Fields"

});


return;


}






const orderData={


userId:user._id,


name:form.name,


mobile:form.mobile,


address:form.address,


city:form.city,


pincode:form.pincode,


payment:payment,



items:cart.map((item)=>(

{

name:item.name,

image:item.image,

price:item.price,

qty:item.qty

}

)),



total:total


};






try{


await axios.post(

"http://localhost:5000/api/orders",

orderData

);



Swal.fire({

icon:"success",

title:"Order Placed Successfully"

});



localStorage.removeItem("cart");


window.dispatchEvent(
new Event("cartUpdated")
);



navigate("/home");


}

catch(error){


console.log(error);


Swal.fire({

icon:"error",

title:"Order Failed"

});


}



};







return(

<>


<Navebar/>


<div className="checkout-container">


<div className="checkout-card">


<h2>
Checkout
</h2>



<div className="address-box">


<h3>
Delivery Address
</h3>



<input

name="name"

placeholder="Full Name"

value={form.name}

onChange={handleChange}

/>




<input

name="mobile"

placeholder="Mobile Number"

value={form.mobile}

onChange={handleChange}

/>





<textarea

name="address"

placeholder="Full Address"

value={form.address}

onChange={handleChange}

/>





<input

name="city"

placeholder="City"

value={form.city}

onChange={handleChange}

/>




<input

name="pincode"

placeholder="Pincode"

value={form.pincode}

onChange={handleChange}

/>



</div>





<div className="payment-box">


<h3>
Payment Method
</h3>


<label>

<input

type="radio"

checked={
payment==="Cash On Delivery"
}

onChange={()=>setPayment(
"Cash On Delivery"
)}

/>

Cash On Delivery

</label>




<label>

<input

type="radio"

checked={
payment==="UPI"
}

onChange={()=>setPayment(
"UPI"
)}

/>

UPI Payment

</label>



</div>






<div className="summary-box">


<h3>
Order Summary
</h3>



{

cart.map((item,index)=>(


<div

className="summary-item"

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




<hr/>


<h2>

Total : ₹ {total}

</h2>


</div>





<button

className="place-btn"

onClick={placeOrder}

>

Place Order

</button>




</div>


</div>



<Footer/>


</>


)


}


export default Checkout;