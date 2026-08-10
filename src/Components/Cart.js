import React, { useEffect, useState } from "react";
import "../Website css/Cart.css";
import Navebar from "../Components/Navebar";
import Footer from "../Components/Footer";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  };

  // Update Quantity
  const updateQty = (index, type) => {
    const data = [...cart];

    if (type === "plus") {
      data[index].qty += 1;
    }
    if (type === "minus") {
      if (data[index].qty > 1) {
        data[index].qty -= 1;
      }
    }

    setCart(data);
    localStorage.setItem("cart", JSON.stringify(data));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Remove Item
    const removeItem = (index) => {
    const data = [...cart];
    const removedItem = data[index];

    data.splice(index, 1);

    setCart(data);
    localStorage.setItem("cart", JSON.stringify(data));
    window.dispatchEvent(new Event("cartUpdated"));

    Swal.fire({
      icon: "success",
      title: `${removedItem.name} Removed`,
      text: "Item removed from cart",
      timer: 1500,
      showConfirmButton: false,
    });
  };
    // Total Price
    const subtotal = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
    ); 

  return (
    <>
      <Navebar />

      <div className="cart-page">

        {/* Left Side */}
        <div className="cart-left">
          <h2>Shopping Cart</h2>

          {cart.length === 0 ? (
            <h3>Your Cart is Empty</h3>
          ) : (
            cart.map((item, index) => (
              <div className="cart-item" key={item._id || index}>
                <img src={item.image} alt={item.name} />

                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <h4>₹ {item.price}</h4>

                  <div className="qty-box">
                    <button onClick={() => updateQty(index, "minus")}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(index, "plus")}>+</button>
                  </div>

                  <button className="remove-btn" onClick={() => removeItem(index)}>
                    Remove
                  </button>
                </div>

                <h2>₹ {item.price * item.qty}</h2>
              </div>
            ))
          )}
        </div>

        {/* Right Side - Show only if cart has items */}
        {cart.length > 0 && (
          <div className="cart-right">
            <h2>Order Summary</h2>

            <div className="summary">
              {cart.map((item, index) => (
                <div className="summary-row" key={item._id || index}>
                  <span>{item.name}</span>
                  <span>₹ {item.price * item.qty}</span>
                </div>
              ))}

              <hr/>
              
              <div className="summary-row">
                <b>Subtotal</b>
                <b>₹ {subtotal}</b>
              </div>

              <div className="summary-row">
                <b>Delivery</b>
                <b>Free</b>
              </div>

              <hr />

              <div className="summary-row">
                <h3>Total</h3>
                <h3>₹ {subtotal}</h3>
              </div>

              <button
                className="checkout-btn"
                onClick={() => navigate("/checkout")}
              >
                Checkout
              </button>
            </div>
          </div>
        )}

      </div>

      <Footer />
    </>
  );
}

export default Cart;