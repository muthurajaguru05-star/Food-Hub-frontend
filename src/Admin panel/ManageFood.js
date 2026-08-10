import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
} from "react-icons/fa";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "../Admin css/ManageFood.css";

function ManageFood() {

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");

  // Get Foods //
  const getFoods = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/foods");
      setFoods(res.data);
    } catch (err) {
      console.log(err);
    }
    };

    useEffect(() => {
    getFoods();
    }, []);

  // Delete Food //
    const deleteFood = async (id) => {
    const result = await Swal.fire({
      title: "Delete Food?",
      text: "You can't undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/foods/${id}`);
        Swal.fire(
          "Deleted!",
          "Food Deleted Successfully",
          "success"
        );
        getFoods();

      } catch (err) {
        Swal.fire(
          "Error",
          "Delete Failed",
          "error"
        );
      }
    }
  };
       const filteredFoods = foods.filter((food) =>
          food.name.toLowerCase().includes(search.toLowerCase())
      );
      const indexOfLastProduct = currentPage * productsPerPage;
      const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

      const currentFoods = filteredFoods.slice(
       indexOfFirstProduct,
       indexOfLastProduct
      );

   const totalPages = Math.ceil(filteredFoods.length / productsPerPage);

  return (
    <div className="manageadmin">

      <Sidebar />

      <div className="managemain">

        <Topbar />

        <div className="manage-food">

          <div className="manage-header">

            <h2>Manage Food</h2>

            <Link
              to="/admin/add-food"
              className="manageadd-btn"
            >
              <FaPlus />
              Add Food
            </Link>

          </div>

          <div className="managesearch-box">

            <FaSearch />

                   <input type="text"
                    placeholder="Search Food..."
                    value={search}
                    onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                     }}
                     />
          </div>

          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Image</th>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>

                {currentFoods.map((food, index) => (
               <tr key={food._id}>

              <td>{indexOfFirstProduct + index + 1}</td>

           <td>
           <img src={food.image} alt={food.name} className="managefood-image" />
           </td>

           <td>{food.name}</td>
          <td>{food.category}</td>
          <td>₹{food.price}</td>

           <td>
         <Link  to={`/admin/edit-food/${food._id}`}  className="manageedit-btn" >
         <FaEdit />
         </Link>

        <button  className="managedelete-btn" onClick={() => deleteFood(food._id)}>
        <FaTrash />
       </button>
       </td>

     </tr>
      ))}       
            </tbody>

          </table>
          <div className="managepagination">

         <button  onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}>
           Previous
           </button>

          {[...Array(totalPages)].map((_, i) => (
           <button
           key={i}
           className={currentPage === i + 1 ? "active" : ""}
           onClick={() => setCurrentPage(i + 1)}
            >
          {i + 1}
         </button>
         ))}

        <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
         >
        Next
       </button>

        </div>
        </div>
      </div>
    </div>
  );
}

export default ManageFood;