import React, { useState, useEffect } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import {
  FaTrash,
  FaSearch,
} from "react-icons/fa";

import "../Admin css/Users.css";
import axios from "axios";
import Swal from "sweetalert2";

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // =========================
  // PAGINATION
  // =========================
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 4;

  // =========================
  // FETCH USERS
  // =========================
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:5000/api/register/all"
      );

      if (res.data.success) {
        setUsers(res.data.data);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.log("Fetch users error:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch users",
      });
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE USER
  // =========================
  const deleteUser = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      console.log("Deleting User ID:", id);

      const response = await axios.delete(
        `http://localhost:5000/api/register/${id}`
      );

      console.log("Delete response:", response.data);

      if (response.data.success) {
        // Remove deleted user
        setUsers((prevUsers) =>
          prevUsers.filter(
            (user) => user._id !== id
          )
        );

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "User deleted successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Delete Failed",
          text:
            response.data.message ||
            "Failed to delete user.",
        });
      }
    } catch (error) {
      console.log("Delete user error:", error);

      console.log(
        "Server response:",
        error.response?.data
      );

      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text:
          error.response?.data?.message ||
          "Unable to delete the user. Please try again.",
      });
    }
  };

  // =========================
  // SEARCH
  // =========================
  const filteredUsers = users.filter((user) =>
    (user.name || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // =========================
  // RESET PAGE WHEN SEARCH CHANGES
  // =========================
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // =========================
  // PAGINATION CALCULATION
  // =========================

  const totalPages = Math.ceil(
    filteredUsers.length / usersPerPage
  );

  const indexOfLastUser =
    currentPage * usersPerPage;

  const indexOfFirstUser =
    indexOfLastUser - usersPerPage;

  const currentUsers = filteredUsers.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  // =========================
  // CHANGE PAGE
  // =========================
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="admin">

      <Sidebar />

      <div className="main">

        <Topbar />

        <div className="users-container">

          {/* Header */}
          <div className="users-header">
            <h2>Users Management</h2>
          </div>

          {/* Search */}
          <div className="search-user">

            <FaSearch />

            <input
              type="text"
              placeholder="Search User..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          {/* Loading */}
          {loading ? (

            <p
              style={{
                textAlign: "center",
                padding: "20px",
              }}
            >
              Loading users...
            </p>

          ) : users.length === 0 ? (

            /* No Users */
            <p
              style={{
                textAlign: "center",
                padding: "20px",
              }}
            >
              No users found
            </p>

          ) : (

            <>
              {/* Users Table */}
              <table>

                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>

                  {currentUsers.length === 0 ? (

                    <tr>
                      <td
                        colSpan="5"
                        style={{
                          textAlign: "center",
                          padding: "20px",
                        }}
                      >
                        No matching users found
                      </td>
                    </tr>

                  ) : (

                    currentUsers.map((user) => (

                      <tr key={user._id}>

                        {/* Name */}
                        <td>
                          {user.name}
                        </td>

                        {/* Email */}
                        <td>
                          {user.email}
                        </td>

                        {/* Contact */}
                        <td>
                          {user.contact}
                        </td>

                        {/* Role */}
                        <td>

                          <span
                            className={
                              user.role === "Admin"
                                ? "admin-role"
                                : "user-role"
                            }
                          >
                            {user.role}
                          </span>

                        </td>

                        {/* Delete */}
                        <td>

                          <button
                            className="delete-user"
                            onClick={() =>
                              deleteUser(user._id)
                            }
                          >
                            <FaTrash />
                          </button>

                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

              {/* =========================
                  PAGINATION
              ========================= */}
              {totalPages > 1 && (

                <div className="pagination">

                  {/* Previous */}
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>

                  {/* Page Numbers */}
                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((pageNumber) => (

                    <button
                      key={pageNumber}
                      onClick={() =>
                        goToPage(pageNumber)
                      }
                      className={
                        currentPage === pageNumber
                          ? "active"
                          : ""
                      }
                    >
                      {pageNumber}
                    </button>

                  ))}

                  {/* Next */}
                  <button
                    onClick={goToNextPage}
                    disabled={
                      currentPage === totalPages
                    }
                  >
                    Next
                  </button>

                </div>

              )}

            </>

          )}

        </div>

      </div>

    </div>
  );
}

export default Users;