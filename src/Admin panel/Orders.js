import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  FaSync,
  FaSearch,
  FaTrash,
  FaShoppingBag,
  FaClock,
  FaCheckCircle,
  FaSpinner,
  FaBoxes
} from "react-icons/fa";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import "../Admin css/Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 1;

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/orders");
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching orders:", err);
      Swal.fire({
        icon: "error",
        title: "Error Fetching Orders",
        text: "Could not retrieve orders from MongoDB. Please check if the backend is running."
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, value) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/orders/${id}`, {
        status: value
      });
      if (res.data) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: `Status updated to ${value}`,
          showConfirmButton: false,
          timer: 2000
        });
        getOrders();
      }
    } catch (err) {
      console.error("Status update error:", err);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Could not update order status."
      });
    }
  };

  const handleDeleteOrder = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Order?",
      text: "Are you sure you want to delete this order permanently from MongoDB?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Delete!"
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/orders/${id}`);
        Swal.fire("Deleted!", "Order has been deleted successfully.", "success");
        getOrders();
      } catch (err) {
        console.error("Delete order error:", err);
        Swal.fire("Error", "Failed to delete order.", "error");
      }
    }
  };

  // Filter orders based on search and status
  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      statusFilter === "All" ||
      order.status?.toLowerCase() === statusFilter.toLowerCase();

    const nameMatch = order.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const mobileMatch = order.mobile?.includes(searchTerm);
    const cityMatch = order.city?.toLowerCase().includes(searchTerm.toLowerCase());
    const idMatch = order._id?.toLowerCase().includes(searchTerm.toLowerCase());
    const itemMatch = order.items?.some((item) =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return matchesStatus && (nameMatch || mobileMatch || cityMatch || idMatch || itemMatch);
  });

  // Calculate statistics
  const totalOrdersCount = orders.length;
  const pendingCount = orders.filter((o) => o.status === "Pending").length;
  const preparingCount = orders.filter((o) => o.status === "Preparing").length;
  const deliveredCount = orders.filter((o) => o.status === "Delivered").length;
  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const formatDateTime = (dateStr) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="admin">
      <Sidebar />
      <div className="main">
        <Topbar />

        <div className="orders-container">
          <div className="orders-header">
            <div>
              <h2>📦 Orders Management</h2>
              <p className="sub-title">Real-time order details fetched live from MongoDB</p>
            </div>
            <button className="refresh-btn" onClick={getOrders} title="Reload MongoDB Data">
              <FaSync className={loading ? "spin" : ""} /> Refresh Data
            </button>
          </div>

          {/* Quick Stats Summary Cards */}
          <div className="order-stats-grid">
            <div className="stat-card">
              <div className="stat-icon icon-total"><FaBoxes /></div>
              <div>
                <h4>Total Orders</h4>
                <h3>{totalOrdersCount}</h3>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon icon-pending"><FaClock /></div>
              <div>
                <h4>Pending</h4>
                <h3>{pendingCount}</h3>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon icon-preparing"><FaSpinner /></div>
              <div>
                <h4>Preparing</h4>
                <h3>{preparingCount}</h3>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon icon-delivered"><FaCheckCircle /></div>
              <div>
                <h4>Delivered</h4>
                <h3>{deliveredCount}</h3>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon icon-revenue"><FaShoppingBag /></div>
              <div>
                <h4>Total Revenue</h4>
                <h3>₹{totalRevenue.toLocaleString("en-IN")}</h3>
              </div>
            </div>
          </div>

          {/* Filters & Search */}
          <div className="orders-controls">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search by Customer, Phone, City, Order ID, or Food Item..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <div className="filter-box">
              <label>Status Filter:</label>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">All Status ({orders.length})</option>
                <option value="Pending">Pending ({pendingCount})</option>
                <option value="Preparing">Preparing ({preparingCount})</option>
                <option value="Delivered">Delivered ({deliveredCount})</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Orders Table */}
          <div className="orders-table-wrapper">
            {loading ? (
              <div className="loading-container">
                <FaSpinner className="spin loading-icon" />
                <p>Fetching latest orders from MongoDB database...</p>
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Order Info</th>
                    <th>Customer Details</th>
                    <th>Items Ordered</th>
                    <th>Total</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.length > 0 ? (
                    currentOrders.map((order, index) => (
                      <tr key={order._id}>
                        <td>{indexOfFirstOrder + index + 1}</td>

                        {/* Order Info */}
                        <td className="order-id-cell">
                          <span className="order-id-badge" title={order._id}>
                            #{order._id ? order._id.substring(order._id.length - 8) : "N/A"}
                          </span>
                          <span className="order-date">{formatDateTime(order.createdAt)}</span>
                        </td>

                        {/* Customer Details */}
                        <td className="customer-cell">
                          <strong>{order.name}</strong>
                          <div className="cust-mobile">📞 {order.mobile}</div>
                          <div className="cust-address">{order.address}, {order.city} - {order.pincode}</div>
                        </td>

                        {/* Items Ordered */}
                        <td className="items-cell">
                          <div className="items-list">
                            {order.items && order.items.length > 0 ? (
                              order.items.map((item, i) => (
                                <div key={i} className="item-row">
                                  <span className="item-name">• {item.name}</span>
                                  <span className="item-qty">x{item.qty}</span>
                                  <span className="item-price">₹{item.price * item.qty}</span>
                                </div>
                              ))
                            ) : (
                              <span className="no-items">No items</span>
                            )}
                          </div>
                        </td>

                        {/* Total */}
                        <td className="total-cell">
                          <strong>₹{order.total}</strong>
                        </td>

                        {/* Payment */}
                        <td className="payment-cell">
                          <span className="payment-badge">{order.payment || "COD"}</span>
                        </td>

                        {/* Status */}
                        <td className="status-cell">
                          <select
                            className={`status-select status-${(order.status || "Pending").toLowerCase()}`}
                            value={order.status || "Pending"}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Preparing">Preparing</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>

                        {/* Action */}
                        <td className="action-cell">
                          <button
                            className="delete-btn"
                            title="Delete Order"
                            onClick={() => handleDeleteOrder(order._id)}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="no-data">
                        No orders found in MongoDB.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="order-pagination">
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
  );
}

export default Orders;