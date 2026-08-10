import React,{useState} from "react";
import {Link,useNavigate} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Navebar from "../Components/Navebar";
import "../Website css/Login.css";


function Login(){
   const navigate=useNavigate();
  const [loginData,setLoginData]=useState({
        email:"",
        password:""
      });

const handleChange=(e)=>{
setLoginData({
...loginData,
[e.target.name]:e.target.value
});

};

const handleSubmit=async(e)=>{
e.preventDefault();

try{

const res =await axios.post("http://localhost:5000/api/register/login",loginData);
localStorage.setItem("user",
JSON.stringify(res.data.user)
);

localStorage.setItem(
"isLogin",
"true"
);

// Navbar update
window.dispatchEvent(
new Event("login")
);

Swal.fire({
icon:"success",
title:"Login Successful",
timer:1500,
showConfirmButton:false
});

setTimeout(()=>{
navigate("/");
},1500);

}
catch(error){
Swal.fire({
icon:"error",
title:"Login Failed",
text:
error.response?.data?.message
||
"Invalid Login"
});}
};

return(
<>
<Navebar/>
<div className="login-container">

<div className="login-box">
<h1>Food Hub</h1>
<p>Welcome Back!</p>

<form onSubmit={handleSubmit}>

<input type="email"
name="email"
placeholder="Email Address"
value={loginData.email}
onChange={handleChange}
required
/>

<input
type="password"
name="password"
placeholder="Password"
value={loginData.password}
onChange={handleChange}
required
/>

<button type="submit">
Login
</button>

</form>

<p>Don't have account?
<Link to="/register">Register Here</Link>
</p>
</div>
</div>
</>
)
}
export default Login;