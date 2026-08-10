import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaUtensils,
  FaShoppingBag,
  FaMoneyBillWave,
  FaClock,
  FaCheckCircle,
  FaSync
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

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const getDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch Total Foods
      const foodsRes = await axios.get("http://localhost:5000/api/foods");
      setTotalFoods(Array.isArray(foodsRes.data) ? foodsRes.data.length : 0);

      // Fetch Orders from MongoDB
      const ordersRes = await axios.get("http://localhost:5000/api/orders");
      const orders = Array.isArray(ordersRes.data) ? ordersRes.data : [];

      setTotalOrders(orders.length);
      setRecentOrders(orders);

      // Statistics calculations
      const revenue = orders.reduce(
        (sum, order) => sum + (Number(order.total) || 0),
        0
      );
      setTotalRevenue(revenue);

      const pending = orders.filter(
        (order) => order.status === "Pending"
      ).length;
      setPendingOrders(pending);

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

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = recentOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalPages = Math.ceil(recentOrders.length / ordersPerPage);

  const formatDateTime = (dateStr) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main">
        <Topbar />

        <div className="dashboard-content">
          <div className="dash-header">
            <div>
              <h2>📊 Admin Dashboard</h2>
              <p className="dash-subtitle">
                Real-time store metrics and latest order updates from MongoDB
              </p>
            </div>
            <button className="refresh-btn" onClick={getDashboardData}>
              <FaSync className={loading ? "spin" : ""} /> Refresh Stats
            </button>
          </div>

          {/* Cards */}
          <div className="cards">
            <div className="card card-food">
              <div className="card-icon">
                <FaUtensils />
              </div>
              <div className="card-info">
                <h3>Total Foods</h3>
                <h2>{totalFoods}</h2>
              </div>
            </div>

            <div className="card card-orders">
              <div className="card-icon">
                <FaShoppingBag />
              </div>
              <div className="card-info">
                <h3>Total Orders</h3>
                <h2>{totalOrders}</h2>
              </div>
            </div>

            <div className="card card-revenue">
              <div className="card-icon">
                <FaMoneyBillWave />
              </div>
              <div className="card-info">
                <h3>Total Revenue</h3>
                <h2>₹ {totalRevenue.toLocaleString("en-IN")}</h2>
              </div>
            </div>

            <div className="card card-pending">
              <div className="card-icon">
                <FaClock />
              </div>
              <div className="card-info">
                <h3>Pending Orders</h3>
                <h2>{pendingOrders}</h2>
              </div>
            </div>

            <div className="card card-delivered">
              <div className="card-icon">
                <FaCheckCircle />
              </div>
              <div className="card-info">
                <h3>Delivered Orders</h3>
                <h2>{deliveredOrders}</h2>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="recent-orders">
            <div className="recent-orders-header">
              <h2>🛒 Recent Customer Orders</h2>
              <span className="live-badge">Live MongoDB Data</span>
            </div>

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
                  currentOrders.map((order, index) => (
                    <tr key={order._id}>
                      <td>{indexOfFirstOrder + index + 1}</td>

                      <td>
                        <span className="order-code">
                          #{order._id ? order._id.substring(order._id.length - 6) : "N/A"}
                        </span>
                      </td>

                      <td>
                        <strong>{order.name}</strong>
                        <div style={{ fontSize: "12px", color: "#666" }}>
                          {order.mobile}
                        </div>
                      </td>

                      <td>
                        {order.items && order.items.length > 0 ? (
                          order.items.map((item, i) => (
                            <div key={i} className="dash-item-line">
                              {item.name} × {item.qty}
                            </div>
                          ))
                        ) : (
                          "N/A"
                        )}
                      </td>

                      <td>
                        <strong>₹ {order.total}</strong>
                      </td>

                      <td style={{ fontSize: "12px", color: "#666" }}>
                        {formatDateTime(order.createdAt)}
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
                    <td
                      colSpan="7"
                      style={{
                        textAlign: "center",
                        padding: "20px"
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="dashboard-pagination">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;