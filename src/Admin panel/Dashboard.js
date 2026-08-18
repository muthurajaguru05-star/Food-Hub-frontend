import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  FaUtensils,
  FaShoppingBag,
  FaMoneyBillWave,
  FaClock,
  FaCheckCircle,
  FaSync,
} from "react-icons/fa";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import "../Admin css/Dashboard.css";

function Dashboard() {
  const [totalFoods, setTotalFoods] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [deliveredOrders, setDeliveredOrders] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // PAGINATION
  // =========================
  const [currentPage, setCurrentPage] = useState(1);

  // 2 orders per page
  const ordersPerPage = 2;

  // =========================
  // GET DASHBOARD DATA
  // =========================
  const getDashboardData = async () => {
    setLoading(true);

    try {
      // =========================
      // FETCH FOODS
      // =========================
      const foodsRes = await axios.get(
        "http://localhost:5000/api/foods"
      );

      setTotalFoods(
        Array.isArray(foodsRes.data)
          ? foodsRes.data.length
          : 0
      );

      // =========================
      // FETCH ORDERS
      // =========================
      const ordersRes = await axios.get(
        "http://localhost:5000/api/orders"
      );

      const orders = Array.isArray(ordersRes.data)
        ? ordersRes.data
        : [];

      setTotalOrders(orders.length);
      setRecentOrders(orders);

      // Reset pagination after refresh
      setCurrentPage(1);

      // =========================
      // TOTAL REVENUE
      // =========================
      const revenue = orders.reduce(
        (sum, order) =>
          sum + (Number(order.total) || 0),
        0
      );

      setTotalRevenue(revenue);

      // =========================
      // PENDING ORDERS
      // =========================
      const pending = orders.filter(
        (order) => order.status === "Pending"
      ).length;

      setPendingOrders(pending);

      // =========================
      // DELIVERED ORDERS
      // =========================
      const delivered = orders.filter(
        (order) => order.status === "Delivered"
      ).length;

      setDeliveredOrders(delivered);

    } catch (err) {
      console.error(
        "Dashboard data error:",
        err
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOAD DASHBOARD
  // =========================
  useEffect(() => {
    getDashboardData();
  }, []);

  // =========================
  // PAGINATION CALCULATION
  // =========================

  const totalPages = Math.ceil(
    recentOrders.length / ordersPerPage
  );

  const indexOfLastOrder =
    currentPage * ordersPerPage;

  const indexOfFirstOrder =
    indexOfLastOrder - ordersPerPage;

  const currentOrders = recentOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  // =========================
  // PREVIOUS PAGE
  // =========================
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // =========================
  // NEXT PAGE
  // =========================
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // =========================
  // PAGE NUMBER
  // =========================
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // =========================
  // FORMAT DATE
  // =========================
  const formatDateTime = (dateStr) => {
    if (!dateStr) return "N/A";

    const d = new Date(dateStr);

    return d.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  return (
    <div className="dashboard">

      <Sidebar />

      <div className="main">

        <Topbar />

        <div className="dashboard-content">

          {/* =========================
              DASHBOARD HEADER
          ========================= */}
          <div className="dash-header">

            <div>

              <h2>
                📊 Admin Dashboard
              </h2>

              <p className="dash-subtitle">
                Real-time store metrics and latest
                order updates from MongoDB
              </p>

            </div>

            <button
              className="refresh-btn"
              onClick={getDashboardData}
            >

              <FaSync
                className={
                  loading ? "spin" : ""
                }
              />

              Refresh Stats

            </button>

          </div>

          {/* =========================
              DASHBOARD CARDS
          ========================= */}
          <div className="cards">

            {/* Total Foods */}
            <div className="card card-food">

              <div className="card-icon">
                <FaUtensils />
              </div>

              <div className="card-info">

                <h3>Total Foods</h3>

                <h2>
                  {totalFoods}
                </h2>

              </div>

            </div>

            {/* Total Orders */}
            <div className="card card-orders">

              <div className="card-icon">
                <FaShoppingBag />
              </div>

              <div className="card-info">

                <h3>Total Orders</h3>

                <h2>
                  {totalOrders}
                </h2>

              </div>

            </div>

            {/* Total Revenue */}
            <div className="card card-revenue">

              <div className="card-icon">
                <FaMoneyBillWave />
              </div>

              <div className="card-info">

                <h3>Total Revenue</h3>

                <h2>
                  ₹{" "}
                  {totalRevenue.toLocaleString(
                    "en-IN"
                  )}
                </h2>

              </div>

            </div>

            {/* Pending Orders */}
            <div className="card card-pending">

              <div className="card-icon">
                <FaClock />
              </div>

              <div className="card-info">

                <h3>Pending Orders</h3>

                <h2>
                  {pendingOrders}
                </h2>

              </div>

            </div>

            {/* Delivered Orders */}
            <div className="card card-delivered">

              <div className="card-icon">
                <FaCheckCircle />
              </div>

              <div className="card-info">

                <h3>Delivered Orders</h3>

                <h2>
                  {deliveredOrders}
                </h2>

              </div>

            </div>

          </div>

          {/* =========================
              RECENT ORDERS
          ========================= */}
          <div className="recent-orders">

            <div className="recent-orders-header">

              <h2>
                🛒 Recent Customer Orders
              </h2>

              <span className="live-badge">
                Live MongoDB Data
              </span>

            </div>

            {/* =========================
                ORDERS TABLE
            ========================= */}
            <table>

              <thead>

                <tr>

                  <th>S.No</th>

                  <th>Order ID</th>

                  <th>Customer</th>

                  <th>Food Items</th>

                  <th>Total</th>

                  <th>Date & Time</th>

                  <th>Status</th>

                </tr>

              </thead>

              <tbody>

                {currentOrders.length > 0 ? (

                  currentOrders.map(
                    (order, index) => (

                      <tr key={order._id}>

                        {/* S.No */}
                        <td>
                          {indexOfFirstOrder +
                            index +
                            1}
                        </td>

                        {/* Order ID */}
                        <td>

                          <span className="order-code">

                            #
                            {order._id
                              ? order._id.substring(
                                  order._id.length -
                                    6
                                )
                              : "N/A"}

                          </span>

                        </td>

                        {/* Customer */}
                        <td>

                          <strong>
                            {order.name}
                          </strong>

                          <div
                            style={{
                              fontSize:
                                "12px",
                              color: "#666",
                            }}
                          >
                            {order.mobile}
                          </div>

                        </td>

                        {/* Food Items */}
                        <td>

                          {order.items &&
                          order.items.length >
                            0 ? (

                            order.items.map(
                              (item, i) => (

                                <div
                                  key={i}
                                  className="dash-item-line"
                                >
                                  {item.name} ×{" "}
                                  {item.qty}
                                </div>

                              )
                            )

                          ) : (

                            "N/A"

                          )}

                        </td>

                        {/* Total */}
                        <td>

                          <strong>
                            ₹ {order.total}
                          </strong>

                        </td>

                        {/* Date */}
                        <td
                          style={{
                            fontSize:
                              "12px",
                            color: "#666",
                          }}
                        >
                          {formatDateTime(
                            order.createdAt
                          )}
                        </td>

                        {/* Status */}
                        <td>

                          <span
                            className={`badge ${
                              order.status ===
                              "Pending"
                                ? "pending"
                                : order.status ===
                                  "Preparing"
                                ? "processing"
                                : order.status ===
                                  "Delivered"
                                ? "success"
                                : "danger"
                            }`}
                          >
                            {order.status ||
                              "Pending"}
                          </span>

                        </td>

                      </tr>

                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan="7"
                      style={{
                        textAlign:
                          "center",
                        padding:
                          "20px",
                      }}
                    >
                      {loading
                        ? "Loading latest orders..."
                        : "No Orders Found in MongoDB"}
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

            {/* =========================
                PAGINATION
            ========================= */}
            {totalPages > 1 && (

              <div className="dashboard-pagination">

                {/* Previous */}
                <button
                  onClick={
                    goToPreviousPage
                  }
                  disabled={
                    currentPage === 1
                  }
                >
                  Previous
                </button>

                {/* Page Numbers */}
                {Array.from(
                  {
                    length:
                      totalPages,
                  },
                  (_, index) =>
                    index + 1
                ).map(
                  (pageNumber) => (

                    <button
                      key={
                        pageNumber
                      }
                      className={
                        currentPage ===
                        pageNumber
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        goToPage(
                          pageNumber
                        )
                      }
                    >
                      {pageNumber}
                    </button>

                  )
                )}

                {/* Next */}
                <button
                  onClick={
                    goToNextPage
                  }
                  disabled={
                    currentPage ===
                    totalPages
                  }
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