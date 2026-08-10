import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Swal from "sweetalert2";

import { FaTags } from "react-icons/fa";
import "../Admin css/AddCategory.css";


function AddCategory() {

  const navigate = useNavigate();
  const [name,setName] = useState("");
  const [image,setImage] = useState(null);

  const handleSubmit = async(e)=>{
         e.preventDefault();
         if(!name || !image){
        Swal.fire({
         icon: "warning",
        title: "Missing Fields",
        text: "Please enter category name and select image"
       });
      return;
       }
    const formData = new FormData();
    formData.append("name",name);
    formData.append("image",image);
    try{
      const res = await axios.post("http://localhost:5000/api/categories",formData);
      console.log(res.data);

      Swal.fire({
      icon: "success",
      title: "Category Added",
      text: "Category added successfully!",
      timer: 2000,
      showConfirmButton: false

        });
    navigate("/categories");
    }
    catch(error){

      console.log(error.response?.data || error.message);

      Swal.fire({
      icon: "error",
      title: "Add Failed",
      text: "Something went wrong. Please try again!"
        });
    }
  };

  
return(

   <div className="admin">
   <Sidebar/>

   <div className="main">
   <Topbar/>

   <div className="add-category-page">

   <div className="category-title">    
   <FaTags/>

   <h2>Add New Category</h2>
   </div>

    <form onSubmit={handleSubmit}>
     <div className="input-group">

       <label>Category Name</label>
     <input type="text"
           name="name"
           placeholder="Enter Category Name"
           value={name}
           onChange={(e)=>setName(e.target.value)}
         />
</div>



   <div className="input-group">

          <label>Upload Image</label>
         <input type="file"
         accept="image/*"
         onChange={(e)=>setImage(e.target.files[0])}
         />
        </div>

        <button type="submit" className="add-category-btn"> Add Category </button>
       </form>
        </div>

      </div>

   </div>   

      );

       }
export default AddCategory;