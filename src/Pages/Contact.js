import React, { useState } from "react";
import "../Website css/Contact.css";
import Navebar from "../Components/Navebar";
import Footer from "../Components/Footer";
import axios from "axios";
import Swal from "sweetalert2";

function Contact() {

  const [form,setForm]=useState({

name:"",
email:"",
subject:"",
message:""

});
const handleChange=(e)=>{

setForm({

...form,

[e.target.name]:e.target.value

});

};
const handleSubmit=async(e)=>{

e.preventDefault();

try{

const res=await axios.post(
"http://localhost:5000/api/contact",
form
);

Swal.fire({

icon:"success",

title:res.data.message

});

setForm({

name:"",
email:"",
subject:"",
message:""

});

}

catch(err){

Swal.fire({

icon:"error",

title:"Failed"

});

}

};

  return (
    <>

      {/* Navbar */}
       <Navebar/>

      {/* Hero */}

      <section className="contact-hero">

        <h1>Contact Us</h1>

        <p>
          We'd love to hear from you. Get in touch with FoodHub.
        </p>

      </section>

      {/* Contact */}

      <section className="contact-container">

        {/* Left */}

        <div className="contact-info">

          <h2>Get In Touch</h2>

          <p>
            Have questions or want to reserve a table?
            Contact us anytime.
          </p>

          <div className="info-box">
            <h3>📍 Address</h3>
            <p>123 Food Street, Chennai, Tamil Nadu</p>
          </div>

          <div className="info-box">
            <h3>📞 Phone</h3>
            <p>+91 9876543210</p>
          </div>

          <div className="info-box">
            <h3>📧 Email</h3>
            <p>foodhub@gmail.com</p>
          </div>

          <div className="info-box">
            <h3>🕒 Opening Hours</h3>
            <p>Mon - Sun : 10:00 AM - 11:00 PM</p>
          </div>

        </div>

        {/* Right */}

        <div className="contact-form">

          <h2>Send Message</h2>

           <form onSubmit={handleSubmit}>

<input
type="text"
name="name"
placeholder="Your Name"
value={form.name}
onChange={handleChange}
/>

<input
type="email"
name="email"
placeholder="Your Email"
value={form.email}
onChange={handleChange}
/>

<input
type="text"
name="subject"
placeholder="Subject"
value={form.subject}
onChange={handleChange}
/>

<textarea
rows="6"
name="message"
placeholder="Your Message"
value={form.message}
onChange={handleChange}
></textarea>

<button type="submit">

Send Message

</button>

</form>

        </div>

      </section>

      {/* Map */}

      <section className="map">

        <iframe
          title="FoodHub Location"
          src="https://www.google.com/maps?q=Chennai&output=embed"
          allowFullScreen=""
          loading="lazy"
        ></iframe>

      </section>
 <Footer/>
    </>
  );
}

export default Contact;