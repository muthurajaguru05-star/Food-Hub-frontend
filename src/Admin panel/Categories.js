import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useNavigate } from "react-router-dom";


import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaTags
} from "react-icons/fa";

import "../Admin css/Categories.css";


function Categories(){

  const navigate = useNavigate();

  const [categories,setCategories] = useState([]);

  const [search,setSearch] = useState("");



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




  // Delete Category
  const deleteCategory = async (id) => {

  const result = await Swal.fire({
    title: "Are you sure?",
    text: "Do you want to delete this category?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    confirmButtonColor: "#d33",
    cancelButtonColor: "#6c757d"
  });

  if (result.isConfirmed) {
    try {
      await axios.delete(
        `http://localhost:5000/api/categories/${id}`
      );

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Category deleted successfully.",
        timer: 1500,
        showConfirmButton: false
      });

      getCategories();

    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to delete category."
      });
    }
  }
};

  return (

    <div className="admin">
      <Sidebar/>
      <div className="main">
        <Topbar/>
        <div className="category-container">

          <div className="category-header">

            <h2>Manage Categories</h2>
            <Link to="/admin/add-category"
              className="category-add-btn"
            >
              <FaTags/>
              Add Category
            </Link>
          </div>

          <div className="search-category">
            <FaSearch/>

            <input type="text"
            placeholder="Search Category..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            />
          </div>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Category Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>

            {categories.filter((item)=>item.name
                .toLowerCase()
                .includes(search.toLowerCase())
              )
              .map((item,index)=>(
                <tr key={item._id}>
                  <td>
                    {index+1}
                  </td>
                  <td>
                    {item.name}
                  </td>
                  <td>
                    <button
                     className="edit-category"
                     onClick={() => navigate(`/admin/edit-category/${item._id}`)}
                     >
                    <FaEdit />
                       </button>

                    <button className="delete-category"
                    onClick={()=>deleteCategory(item._id)} >
                      <FaTrash/>
                    </button>
                  </td>
                </tr>
              ))
            }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Categories;