import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  FaUtensils,
  FaShoppingBag,
  FaMoneyBillWave,
  FaClock,
  FaCheckCircle,
  FaSync,
  FaUsers,
  FaTags,
  FaArrowRight,
  FaCalendarAlt,
  FaChartLine,
  FaPlus,
  FaBoxOpen
} from "react-icons/fa";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import "../Admin css/Dashboard.css";

function Dashboard() {
  const [totalFoods, setTotalFoods] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [deliveredOrders, setDeliveredOrders] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination State (3 per page for zero scroll fit)
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 3;

  // GET DASHBOARD DATA
  const getDashboardData = async () => {
    setLoading(true);

    try {
      // Fetch Foods
      const foodsRes = await axios.get("http://localhost:5000/api/foods");
      setTotalFoods(Array.isArray(foodsRes.data) ? foodsRes.data.length : 0);

      // Fetch Categories
      try {
        const catRes = await axios.get("http://localhost:5000/api/categories");
        setTotalCategories(Array.isArray(catRes.data) ? catRes.data.length : 0);
      } catch (err) {
        console.log("Categories error:", err);
      }

      // Fetch Users
      try {
        const userRes = await axios.get("http://localhost:5000/api/register/all");
        if (userRes.data?.success && Array.isArray(userRes.data.data)) {
          setTotalUsers(userRes.data.data.length);
        }
      } catch (err) {
        console.log("Users fetch error:", err);
      }

      // Fetch Orders
      const ordersRes = await axios.get("http://localhost:5000/api/orders");
      const orders = Array.isArray(ordersRes.data) ? ordersRes.data : [];

      setTotalOrders(orders.length);
      setRecentOrders(orders);
      setCurrentPage(1);

      // Revenue Calculation
      const revenue = orders.reduce(
        (sum, order) => sum + (Number(order.total) || 0),
        0
      );
      setTotalRevenue(revenue);

      // Pending Orders
      const pending = orders.filter(
        (order) => order.status === "Pending"
      ).length;
      setPendingOrders(pending);

      // Delivered Orders
      const delivered = orders.filter(
        (order) => order.status === "Delivered"
      ).length;
      setDeliveredOrders(delivered);
    } catch (err) {
      console.error("Dashboard data error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  // Pagination Calculations
  const totalPages = Math.ceil(recentOrders.length / ordersPerPage);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = recentOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPage = (pageNumber) => setCurrentPage(pageNumber);

  // Format Date Time
  const formatDateTime = (dateStr) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="dashboard-app-wrapper">
      <Sidebar />

      <div className="main">
        <Topbar />

        <div className="dashboard-content-wrapper">
          {/* Top Header Row */}
          <div className="dash-header">
            <div className="header-title-wrap">
              <h2>
                <FaChartLine className="header-icon" /> Dashboard Overview
              </h2>
              <p className="dash-subtitle">
                Real-time metrics & store analytics
              </p>
            </div>

            <div className="header-action-group">
              <button className="refresh-btn" onClick={getDashboardData}>
                <FaSync className={loading ? "spin" : ""} /> Refresh
              </button>
              <span className="live-status-tag">
                <span className="pulse-dot"></span> Live Store
              </span>
            </div>
          </div>

          {/* Metric Cards Grid */}
          <div className="cards-grid">
            {/* Total Revenue */}
            <div className="card card-revenue">
              <div className="card-icon-wrap">
                <FaMoneyBillWave />
              </div>
              <div className="card-info">
                <h3>Revenue</h3>
                <h2>₹ {totalRevenue.toLocaleString("en-IN")}</h2>
                <span className="card-sub-tag">Lifetime</span>
              </div>
            </div>

            {/* Total Orders */}
            <div className="card card-orders">
              <div className="card-icon-wrap">
                <FaShoppingBag />
              </div>
              <div className="card-info">
                <h3>Total Orders</h3>
                <h2>{totalOrders}</h2>
                <span className="card-sub-tag">All time</span>
              </div>
            </div>

            {/* Total Foods */}
            <div className="card card-food">
              <div className="card-icon-wrap">
                <FaUtensils />
              </div>
              <div className="card-info">
                <h3>Dishes</h3>
                <h2>{totalFoods}</h2>
                <span className="card-sub-tag">In menu</span>
              </div>
            </div>

            {/* Total Categories */}
            <div className="card card-categories">
              <div className="card-icon-wrap">
                <FaTags />
              </div>
              <div className="card-info">
                <h3>Categories</h3>
                <h2>{totalCategories}</h2>
                <span className="card-sub-tag">Active</span>
              </div>
            </div>

            {/* Total Users */}
            <div className="card card-users">
              <div className="card-icon-wrap">
                <FaUsers />
              </div>
              <div className="card-info">
                <h3>Users</h3>
                <h2>{totalUsers}</h2>
                <span className="card-sub-tag">Accounts</span>
              </div>
            </div>

            {/* Pending Orders */}
            <div className="card card-pending">
              <div className="card-icon-wrap">
                <FaClock />
              </div>
              <div className="card-info">
                <h3>Pending</h3>
                <h2>{pendingOrders}</h2>
                <span className="card-sub-tag warning-text">Processing</span>
              </div>
            </div>

            {/* Delivered Orders */}
            <div className="card card-delivered">
              <div className="card-icon-wrap">
                <FaCheckCircle />
              </div>
              <div className="card-info">
                <h3>Completed</h3>
                <h2>{deliveredOrders}</h2>
                <span className="card-sub-tag success-text">Delivered</span>
              </div>
            </div>
          </div>

          {/* Management Shortcuts Bar */}
          <div className="dash-quick-nav">
            <span className="quick-nav-label">Quick Actions:</span>
            <div className="quick-buttons-row">
              <Link to="/admin/manage-food" className="quick-nav-btn">
                <FaUtensils /> Manage Food
              </Link>
              <Link to="/admin/add-food" className="quick-nav-btn alt">
                <FaPlus /> Add Food
              </Link>
              <Link to="/admin/categories" className="quick-nav-btn">
                <FaTags /> Categories
              </Link>
              <Link to="/admin/orders" className="quick-nav-btn">
                <FaShoppingBag /> Orders
              </Link>
              <Link to="/admin/users" className="quick-nav-btn">
                <FaUsers /> Users
              </Link>
            </div>
          </div>

          {/* Recent Orders Section */}
          <div className="recent-orders-card">
            <div className="recent-orders-header">
              <div className="header-left-title">
                <h2><FaBoxOpen className="title-icon" /> Recent Orders</h2>
                <span className="badge-count">{recentOrders.length} total</span>
              </div>

              <Link to="/admin/orders" className="view-all-link">
                View All <FaArrowRight />
              </Link>
            </div>

            {/* Table View */}
            <div className="table-responsive-wrapper">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Date & Time</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {currentOrders.length > 0 ? (
                    currentOrders.map((order, index) => (
                      <tr key={order._id || index} className="dash-row">
                        <td>{indexOfFirstOrder + index + 1}</td>
                        <td>
                          <span className="order-code">
                            #{order._id ? order._id.substring(order._id.length - 6) : "N/A"}
                          </span>
                        </td>
                        <td>
                          <div className="customer-cell">
                            <strong>{order.name}</strong>
                            <span className="customer-mobile">{order.mobile}</span>
                          </div>
                        </td>
                        <td>
                          <div className="items-list-wrap">
                            {order.items && order.items.length > 0 ? (
                              order.items.map((item, i) => (
                                <span key={i} className="dash-item-pill">
                                  {item.name} × {item.qty}
                                </span>
                              ))
                            ) : (
                              "N/A"
                            )}
                          </div>
                        </td>
                        <td>
                          <strong className="order-total-price">
                            ₹ {order.total}
                          </strong>
                        </td>
                        <td>
                          <div className="date-cell">
                            <FaCalendarAlt className="date-icon" />
                            {formatDateTime(order.createdAt)}
                          </div>
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              order.status === "Pending"
                                ? "pending"
                                : order.status === "Preparing"
                                ? "processing"
                                : order.status === "Delivered"
                                ? "success"
                                : "danger"
                            }`}
                          >
                            {order.status || "Pending"}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="empty-cell">
                        {loading ? "Loading orders..." : "No Recent Orders"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards Grid View */}
            <div className="mobile-orders-cards">
              {currentOrders.length > 0 ? (
                currentOrders.map((order) => (
                  <div key={order._id} className="mobile-order-card">
                    <div className="mobile-card-header">
                      <span className="order-code">
                        #{order._id ? order._id.substring(order._id.length - 6) : "N/A"}
                      </span>
                      <span
                        className={`badge ${
                          order.status === "Pending"
                            ? "pending"
                            : order.status === "Preparing"
                            ? "processing"
                            : order.status === "Delivered"
                            ? "success"
                            : "danger"
                        }`}
                      >
                        {order.status || "Pending"}
                      </span>
                    </div>

                    <div className="mobile-card-body">
                      <h4>{order.name}</h4>
                      <p className="mobile-phone">{order.mobile}</p>

                      <div className="mobile-items">
                        {order.items && order.items.length > 0
                          ? order.items.map((item, i) => (
                              <div key={i} className="mobile-item-line">
                                {item.name} × {item.qty}
                              </div>
                            ))
                          : null}
                      </div>

                      <div className="mobile-card-footer">
                        <span className="mobile-date">
                          {formatDateTime(order.createdAt)}
                        </span>
                        <strong className="mobile-price">₹{order.total}</strong>
                      </div>
                    </div>
                  </div>
                ))
              ) : null}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="dashboard-pagination">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="nav-btn"
                >
                  Prev
                </button>

                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                  (pageNumber) => (
                    <button
                      key={pageNumber}
                      className={`num-btn ${
                        currentPage === pageNumber ? "active" : ""
                      }`}
                      onClick={() => goToPage(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  )
                )}

                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="nav-btn"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;