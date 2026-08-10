import React, { useState } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import {
  FaTrash,
  FaSearch,
} from "react-icons/fa";

import "../Admin css/Users.css";

function Users() {
  const [users,setUsers] = useState([
    {
      id:1,
      name:"Arun Kumar",
      email:"arun@gmail.com",
      contact:"9876543210",
      role:"User"
    },

    {
      id:2,
      name:"Priya",
      email:"priya@gmail.com",
      contact:"8765432109",
      role:"User"
    },

    {
      id:3,
      name:"Kavin",
      email:"kavin@gmail.com",
      contact:"7654321098",
      role:"User"
    },

    {
      id:4,
      name:"Admin",
      email:"admin@gmail.com",
      contact:"9999999999",
      role:"Admin"
    }

  ]);

  const [search,setSearch] = useState("");
  const deleteUser=(id)=>{
    let confirmDelete = window.confirm(
      "Delete this User?"
    );

    if(confirmDelete){
      setUsers(
        users.filter(
          (user)=>user.id !== id
        )
      );
    }
  };

  return(

    <div className="admin">
      <Sidebar/>

      <div className="main">
        <Topbar/>

        <div className="users-container">

          <div className="users-header">
            <h2>Users Management</h2>
          </div>

          <div className="search-user">
            <FaSearch/>
            <input
              type="text"
              placeholder="Search User..."
              value={search}
              onChange={
                (e)=>setSearch(e.target.value)
              }/>
          </div>
          <table>
            <thead>
              <tr>

                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Role</th>
                <th>Action</th>

              </tr>
            </thead>
            <tbody>
            {
            users
            .filter((user)=>
              user.name
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
            )
            .map((user)=>(
              <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.contact}</td>
              <td><span className={user.role==="Admin"?"admin-role":"user-role"} >{user.role} </span>
              </td>
              <td><button className="delete-user"
                  onClick={
                  ()=>deleteUser(user.id)
                  }
                  >

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
export default Users;