import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import axios from "axios";
import Swal from "sweetalert2";

import {
  FaUsers,
  FaUserShield,
  FaUser,
  FaSearch,
  FaTrash,
  FaEnvelope,
  FaPhoneAlt,
  FaSpinner,
  FaTimes,
  FaSync,
} from "react-icons/fa";

import "../Admin css/Users.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Pagination State (3 users per page for compact layout where multiple users are visible at once)
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Fetch Users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/register/all");

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
        text: "Failed to fetch user accounts",
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete User
  const deleteUser = async (id) => {
    const result = await Swal.fire({
      title: "Delete User Account?",
      text: "Are you sure you want to permanently remove this user account?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
      reverseButtons: false,
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/register/${id}`
      );

      if (response.data.success) {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== id)
        );

        Swal.fire({
          icon: "success",
          title: "User Deleted! 🎉",
          text: "User account removed successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Delete Failed",
          text: response.data.message || "Failed to delete user.",
        });
      }
    } catch (error) {
      console.log("Delete user error:", error);
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text:
          error.response?.data?.message ||
          "Unable to delete user account. Please try again.",
      });
    }
  };

  // Filtered Users
  const filteredUsers = users.filter((user) =>
    (user.name || "")
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    (user.email || "")
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    (user.contact || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Reset page on search change
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Pagination Calculations
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const goToPage = (pageNumber) => setCurrentPage(pageNumber);
  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Stats Counters
  const totalAdmins = users.filter((u) => u.role === "Admin").length;
  const totalCustomers = users.filter((u) => u.role !== "Admin").length;

  // Helper for User Avatar Initial
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  return (
    <div className="admin">
      <Sidebar />

      <div className="main">
        <Topbar />

        <div className="users-page-wrapper">
          {/* Header Banner */}
          <div className="users-page-header">
            <div className="header-title-group">
              <div className="users-icon-badge">
                <FaUsers />
              </div>
              <div>
                <h2>Users Management</h2>
                <p>Manage customer accounts, roles & administrative privileges</p>
              </div>
            </div>

            <div className="header-actions">
              <button
                className="refresh-users-btn"
                onClick={fetchUsers}
                title="Refresh user list"
              >
                <FaSync className={loading ? "spin-icon" : ""} /> Refresh Data
              </button>
              <span className="live-status-tag">
                <span className="pulse-dot"></span> Live Accounts
              </span>
            </div>
          </div>

          {/* Quick Stats Summary Row */}
          <div className="users-stats-row">
            <div className="stat-card">
              <div className="stat-icon total">
                <FaUsers />
              </div>
              <div className="stat-info">
                <h3>Total Accounts</h3>
                <h2>{users.length}</h2>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon customers">
                <FaUser />
              </div>
              <div className="stat-info">
                <h3>Customers</h3>
                <h2>{totalCustomers}</h2>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon admins">
                <FaUserShield />
              </div>
              <div className="stat-info">
                <h3>Administrators</h3>
                <h2>{totalAdmins}</h2>
              </div>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="users-control-bar">
            <div className="search-input-wrap">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search by name, email, or contact..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button className="clear-search-btn" onClick={() => setSearch("")}>
                  <FaTimes />
                </button>
              )}
            </div>

            <div className="results-count">
              Showing <strong>{filteredUsers.length}</strong> {filteredUsers.length === 1 ? "user" : "users"}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="users-content-card">
            {loading ? (
              <div className="loading-state">
                <FaSpinner className="spinner" />
                <p>Loading registered user accounts...</p>
              </div>
            ) : users.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon-circle">
                  <FaUsers />
                </div>
                <h3>No Users Registered Yet</h3>
                <p>Registered customer accounts will appear here.</p>
              </div>
            ) : (
              <>
                {/* Desktop Table View */}
                <div className="desktop-table-container">
                  <table className="users-table">
                    <thead>
                      <tr>
                        <th>User Profile</th>
                        <th>Email Address</th>
                        <th>Contact Number</th>
                        <th>Role</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {currentUsers.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="no-matches-cell">
                            No users matched "{search}"
                          </td>
                        </tr>
                      ) : (
                        currentUsers.map((u) => (
                          <tr key={u._id} className="user-table-row">
                            {/* User Profile */}
                            <td>
                              <div className="user-profile-cell">
                                <div
                                  className={`avatar-circle ${
                                    u.role === "Admin" ? "admin-avatar" : ""
                                  }`}
                                >
                                  {getInitial(u.name)}
                                </div>
                                <span className="user-name-text">{u.name}</span>
                              </div>
                            </td>

                            {/* Email */}
                            <td>
                              <div className="meta-info-cell">
                                <FaEnvelope className="cell-icon" />
                                <span>{u.email}</span>
                              </div>
                            </td>

                            {/* Contact */}
                            <td>
                              <div className="meta-info-cell">
                                <FaPhoneAlt className="cell-icon" />
                                <span>{u.contact || "N/A"}</span>
                              </div>
                            </td>

                            {/* Role */}
                            <td>
                              <span
                                className={`role-badge ${
                                  u.role === "Admin" ? "admin-role" : "user-role"
                                }`}
                              >
                                {u.role === "Admin" ? (
                                  <>
                                    <FaUserShield /> Admin
                                  </>
                                ) : (
                                  <>
                                    <FaUser /> Customer
                                  </>
                                )}
                              </span>
                            </td>

                            {/* Delete Action */}
                            <td>
                              <button
                                className="delete-user-btn"
                                onClick={() => deleteUser(u._id)}
                                title="Delete user"
                              >
                                <FaTrash />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Responsive Cards Grid View */}
                <div className="mobile-cards-container">
                  {currentUsers.length === 0 ? (
                    <div className="no-matches-msg">No users matched "{search}"</div>
                  ) : (
                    currentUsers.map((u) => (
                      <div key={u._id} className="mobile-user-card">
                        <div className="card-top">
                          <div
                            className={`avatar-circle ${
                              u.role === "Admin" ? "admin-avatar" : ""
                            }`}
                          >
                            {getInitial(u.name)}
                          </div>
                          <div className="user-main-info">
                            <h4>{u.name}</h4>
                            <span
                              className={`role-badge ${
                                u.role === "Admin" ? "admin-role" : "user-role"
                              }`}
                            >
                              {u.role === "Admin" ? "Admin" : "Customer"}
                            </span>
                          </div>
                          <button
                            className="delete-user-btn"
                            onClick={() => deleteUser(u._id)}
                            title="Delete user"
                          >
                            <FaTrash />
                          </button>
                        </div>

                        <div className="card-details">
                          <div className="detail-item">
                            <FaEnvelope className="detail-icon" />
                            <span>{u.email}</span>
                          </div>
                          <div className="detail-item">
                            <FaPhoneAlt className="detail-icon" />
                            <span>{u.contact || "N/A"}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="pagination">
                    <button
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                      className="nav-page-btn"
                    >
                      Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                      (pageNumber) => (
                        <button
                          key={pageNumber}
                          onClick={() => goToPage(pageNumber)}
                          className={`num-page-btn ${
                            currentPage === pageNumber ? "active" : ""
                          }`}
                        >
                          {pageNumber}
                        </button>
                      )
                    )}

                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className="nav-page-btn"
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
    </div>
  );
}

export default Users;