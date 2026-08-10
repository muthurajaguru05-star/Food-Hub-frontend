import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import { FaTags } from "react-icons/fa";

import "../Admin css/AddCategory.css";

function EditCategory() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [name, setName] = useState("");

  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState("");



  // Load Category

  useEffect(() => {

    getCategory();

  }, []);




  const getCategory = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/categories/${id}`
      );

      setName(res.data.name);

      setPreview(res.data.image);

    } catch (err) {

      console.log(err);

    }

  };



  // Update Category

  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);

    if (image) {

      formData.append("image", image);

    }

    try {

      await axios.put(

        `http://localhost:5000/api/categories/${id}`,

        formData

      );

      Swal.fire({

        icon: "success",

        title: "Updated",

        text: "Category Updated Successfully",

        timer: 1500,

        showConfirmButton: false

      });

      navigate("/categories");

    }

    catch (err) {

      console.log(err);

      Swal.fire({

        icon: "error",

        title: "Failed",

        text: "Update Failed"

      });

    }

  };



  return (

    <div className="admin">

      <Sidebar />

      <div className="main">

        <Topbar />



        <div className="add-category-page">

          <div className="category-title">

            <FaTags />

            <h2>Edit Category</h2>

          </div>



          <form onSubmit={handleSubmit}>



            <div className="input-group">

              <label>Category Name</label>

              <input

                type="text"

                value={name}

                onChange={(e) => setName(e.target.value)}

              />

            </div>



            <div className="input-group">

              <label>Current Image</label>

              {

                preview && (

                  <img

                    src={preview}

                    alt=""

                    style={{

                      width: "150px",

                      height: "120px",

                      objectFit: "cover",

                      marginBottom: "10px"

                    }}

                  />

                )

              }

            </div>



            <div className="input-group">

              <label>Change Image</label>

              <input

                type="file"

                accept="image/*"

                onChange={(e) => setImage(e.target.files[0])}

              />

            </div>



            <button

              className="add-category-btn"

              type="submit"

            >

              Update Category

            </button>



          </form>

        </div>

      </div>

    </div>

  );

}

export default EditCategory;