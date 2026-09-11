import React, { useState } from "react";
import "../Website css/Checkout.css";

import Navebar from "../Components/Navebar";
import Footer from "../Components/Footer";

import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaCity,
  FaMailBulk,
  FaMoneyBillWave,
  FaMobileAlt,
  FaCreditCard,
  FaShieldAlt,
  FaTruck,
  FaArrowLeft,
  FaCheck,
  FaShoppingBag,
  FaSpinner,
} from "react-icons/fa";

function Checkout() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const [payment, setPayment] = useState("Cash On Delivery");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || user?.username || "",
    mobile: user?.mobile || "",
    address: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    if (!user) {
      Swal.fire({
        icon: "info",
        title: "Login Required",
        text: "Please login to place your order.",
        confirmButtonColor: "#ff5722",
      });
      navigate("/login");
      return;
    }

    if (
      !form.name.trim() ||
      !form.mobile.trim() ||
      !form.address.trim() ||
      !form.city.trim() ||
      !form.pincode.trim()
    ) {
      Swal.fire({
        icon: "warning",
        title: "Fill All Required Fields",
        text: "Please fill in all delivery details before placing order.",
        confirmButtonColor: "#ff5722",
      });
      return;
    }

    if (cart.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Your Cart is Empty",
        text: "Add some delicious food to your cart first!",
        confirmButtonColor: "#ff5722",
      });
      navigate("/menu");
      return;
    }

    const orderData = {
      userId: user._id,
      name: form.name,
      mobile: form.mobile,
      address: form.address,
      city: form.city,
      pincode: form.pincode,
      payment: payment,
      items: cart.map((item) => ({
        name: item.name,
        image: item.image,
        price: item.price,
        qty: item.qty,
      })),
      total: total,
    };

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/orders", orderData);

      Swal.fire({
        icon: "success",
        title: "Order Placed Successfully! 🎉",
        text: "Thank you for ordering with Food Hub! Your food will arrive soon.",
        confirmButtonColor: "#28a745",
      });

      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cartUpdated"));
      navigate("/");
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Order Placement Failed",
        text: "Something went wrong while placing your order. Please try again.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navebar />

      <div className="checkout-container">
        {/* Floating background ambient glow elements */}
        <div className="bg-glow orb-1"></div>
        <div className="bg-glow orb-2"></div>
        <div className="bg-glow orb-3"></div>

        <div className="checkout-wrapper">
          {/* Breadcrumb / Top Navigation Banner */}
          <div className="checkout-header">
            <Link to="/cart" className="back-link">
              <FaArrowLeft /> Back to Cart
            </Link>
            <div className="checkout-title-wrap">
              <h1>
                Secure Checkout <FaShieldAlt className="shield-icon" />
              </h1>
              <p>Complete your details below to enjoy fresh & hot food delivery</p>
            </div>
          </div>

          {/* Checkout Steps Bar */}
          <div className="checkout-stepper">
            <div className="step active">
              <div className="step-num">1</div>
              <span>Delivery Details</span>
            </div>
            <div className="step-line active"></div>
            <div className="step active">
              <div className="step-num">2</div>
              <span>Payment</span>
            </div>
            <div className="step-line active"></div>
            <div className="step active">
              <div className="step-num">3</div>
              <span>Order Summary</span>
            </div>
          </div>

          {/* Main 2-Column Grid Layout */}
          <div className="checkout-grid">
            {/* Left Column: Delivery Form & Payment Selection */}
            <div className="checkout-left">
              {/* Delivery Address Box */}
              <div className="checkout-card address-box">
                <div className="card-section-title">
                  <div className="icon-badge">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h3>Delivery Address</h3>
                    <p>Where should we deliver your order?</p>
                  </div>
                </div>

                <div className="form-grid">
                  <div className="input-group full">
                    <label>Full Name *</label>
                    <div className="input-field-wrap">
                      <FaUser className="field-icon" />
                      <input
                        name="name"
                        placeholder="Enter your full name"
                        value={form.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="input-group full">
                    <label>Phone Number *</label>
                    <div className="input-field-wrap">
                      <FaPhone className="field-icon" />
                      <input
                        name="mobile"
                        type="tel"
                        placeholder="Enter 10-digit mobile number"
                        value={form.mobile}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="input-group full">
                    <label>Complete Street Address *</label>
                    <div className="input-field-wrap text-area-wrap">
                      <FaMapMarkerAlt className="field-icon area-icon" />
                      <textarea
                        name="address"
                        placeholder="House / Flat No., Street, Landmark"
                        value={form.address}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="input-group half">
                    <label>City *</label>
                    <div className="input-field-wrap">
                      <FaCity className="field-icon" />
                      <input
                        name="city"
                        placeholder="City name"
                        value={form.city}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="input-group half">
                    <label>Pincode *</label>
                    <div className="input-field-wrap">
                      <FaMailBulk className="field-icon" />
                      <input
                        name="pincode"
                        placeholder="6-digit pincode"
                        value={form.pincode}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method Box */}
              <div className="checkout-card payment-box">
                <div className="card-section-title">
                  <div className="icon-badge alt">
                    <FaMoneyBillWave />
                  </div>
                  <div>
                    <h3>Payment Method</h3>
                    <p>Select your preferred payment mode</p>
                  </div>
                </div>

                <div className="payment-options">
                  <label
                    className={`payment-card ${
                      payment === "Cash On Delivery" ? "selected" : ""
                    }`}
                    onClick={() => setPayment("Cash On Delivery")}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={payment === "Cash On Delivery"}
                      onChange={() => setPayment("Cash On Delivery")}
                    />
                    <div className="payment-card-content">
                      <div className="payment-card-icon cod">
                        <FaMoneyBillWave />
                      </div>
                      <div className="payment-card-info">
                        <h4>Cash On Delivery</h4>
                        <p>Pay cash or UPI when your food arrives at your door</p>
                      </div>
                      <div className="check-badge">
                        {payment === "Cash On Delivery" && <FaCheck />}
                      </div>
                    </div>
                  </label>

                  <label
                    className={`payment-card ${
                      payment === "UPI" ? "selected" : ""
                    }`}
                    onClick={() => setPayment("UPI")}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={payment === "UPI"}
                      onChange={() => setPayment("UPI")}
                    />
                    <div className="payment-card-content">
                      <div className="payment-card-icon upi">
                        <FaMobileAlt />
                      </div>
                      <div className="payment-card-info">
                        <h4>UPI / Instant Pay</h4>
                        <p>Pay via Google Pay, PhonePe, Paytm, or BHIM UPI</p>
                      </div>
                      <div className="check-badge">
                        {payment === "UPI" && <FaCheck />}
                      </div>
                    </div>
                  </label>

                  <label
                    className={`payment-card ${
                      payment === "Card" ? "selected" : ""
                    }`}
                    onClick={() => setPayment("Card")}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={payment === "Card"}
                      onChange={() => setPayment("Card")}
                    />
                    <div className="payment-card-content">
                      <div className="payment-card-icon card">
                        <FaCreditCard />
                      </div>
                      <div className="payment-card-info">
                        <h4>Credit / Debit Card</h4>
                        <p>Visa, MasterCard, RuPay & American Express supported</p>
                      </div>
                      <div className="check-badge">
                        {payment === "Card" && <FaCheck />}
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Order Summary & Checkout Action */}
            <div className="checkout-right">
              <div className="checkout-card summary-box sticky-summary">
                <div className="card-section-title">
                  <div className="icon-badge summary">
                    <FaShoppingBag />
                  </div>
                  <div>
                    <h3>Order Summary</h3>
                    <p>{cart.length} {cart.length === 1 ? "item" : "items"} in cart</p>
                  </div>
                </div>

                <div className="summary-items-list">
                  {cart.length > 0 ? (
                    cart.map((item, index) => (
                      <div className="summary-item" key={index}>
                        <div className="img-wrapper">
                          <img src={item.image} alt={item.name} />
                          <span className="qty-badge">{item.qty}x</span>
                        </div>
                        <div className="item-details">
                          <h4>{item.name}</h4>
                          <p className="item-price">₹{item.price} each</p>
                        </div>
                        <div className="item-subtotal">
                          ₹{item.price * item.qty}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="empty-cart-msg">
                      <p>Your cart is empty.</p>
                      <Link to="/menu">Browse Menu</Link>
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="price-breakdown">
                  <div className="price-row">
                    <span>Items Subtotal</span>
                    <span>₹{total}</span>
                  </div>
                  <div className="price-row">
                    <span>Delivery Charge</span>
                    <span className="free-tag">
                      <FaTruck /> FREE
                    </span>
                  </div>
                  <div className="price-row">
                    <span>Taxes & Restaurant Charges</span>
                    <span className="free-tag">Included</span>
                  </div>

                  <hr className="summary-divider" />

                  <div className="price-row total-row">
                    <span>Total Amount</span>
                    <span className="total-price">₹{total}</span>
                  </div>
                </div>

                {/* Submit Order Button */}
                <button
                  className={`place-btn ${loading ? "btn-loading" : ""}`}
                  onClick={placeOrder}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <FaSpinner className="spinner-icon" /> Placing Order...
                    </>
                  ) : (
                    <>
                      Place Order • ₹{total}
                    </>
                  )}
                </button>

                {/* Safety Guarantee */}
                <div className="guarantee-box">
                  <div className="guarantee-item">
                    <FaShieldAlt className="guarantee-icon" />
                    <span>100% Safe & Encrypted Checkout</span>
                  </div>
                  <div className="guarantee-item">
                    <FaTruck className="guarantee-icon" />
                    <span>Estimated Delivery: 30-40 Mins</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Checkout;