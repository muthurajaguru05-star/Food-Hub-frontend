import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import axios from "axios";
import Swal from "sweetalert2";
import "../Admin css/AddFood.css";


function AddFood() {

  const navigate = useNavigate();
  const [food, setFood] = useState({

    name:"",
    category:"",
    price:"",
    description:"",
    image:null

  });

  const [categories,setCategories] = useState([]);

  // Get Categories
  const getCategories = async()=>{
    try{
      const res = await axios.get(
        "http://localhost:5000/api/categories"
      );

      setCategories(res.data);
    }
    catch(error){
      console.log(error);
    }
  };

  useEffect(()=>{
    getCategories();
  },[]);

  // Input Change
  const handleChange=(e)=>{
    setFood({...food,
      [e.target.name]:e.target.value
    });
  };

  // Image Change
  const handleImage=(e)=>{
    setFood({...food,
      image:e.target.files[0]
    });
  };

  // Submi
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const formData = new FormData();
      formData.append("name",food.name);
      formData.append("category",food.category);
      formData.append("price", food.price);
      formData.append( "description", food.description);
      formData.append("image",food.image);

      const res = await axios.post("http://localhost:5000/api/foods",formData,
        {
          headers:{
            "Content-Type":"multipart/form-data"
          }
        }
      );
      console.log(res.data);
      Swal.fire({
        title:"Success!",
        text:"Food Added Successfully",
        icon:"success",
        confirmButtonColor:"#28a745"
      }).then(()=>{
        navigate("/admin/manage-food");
      });

      setFood({
        name:"",
        category:"",
        price:"",
        description:"",
        image:null
      });
    }
    catch(error){
      console.log(error);

      Swal.fire({
        title:"Error!",
        text:"Food Add Failed",
        icon:"error",
        confirmButtonColor:"#d33"
      });
    }
  };

return (
       <div className="admin">
          <Sidebar />

        <div className="main">
        <Topbar />
        <div className="add-food">
         <h2>Add New Food</h2>
             <form onSubmit={handleSubmit}>
        <div className="input-group">

         <label>Food Name</label>
      <input type="text"
            name="name"
            placeholder="Enter Food Name"
            value={food.name}
           onChange={handleChange}
           required
          />
            </div>

        <div className="input-group">

         <label>Category</label>
        <select
          name="category"
          value={food.category}
          onChange={handleChange}
          required
          >

         <option value="">Select Category</option>
            {categories.map((category)=>(
               <option
            key={category._id}
            value={category.name}
             >
          {category.name}
        </option>
            ))
             }
          </select>
          </div>

          <div className="input-group">
          <label>Price</label>
          <input
           type="number"
            name="price"
            placeholder="Enter Price"
            value={food.price}
            onChange={handleChange}
            required
            />
          </div>

              <div className="input-group">
            <label>Description</label>
            <textarea
            name="description"
             rows="4"
            placeholder="Enter Description"
            value={food.description}
            onChange={handleChange}
            required
            ></textarea>
             </div>

              <div className="input-group">
             <label>Food Image</label>
             <input  
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImage}
            required
             />
            </div>

           <button type="submit" className="save-btn">
               Add Food
            </button>
            
          </form>
        </div>
    </div>
  </div>
);
}
export default AddFood;