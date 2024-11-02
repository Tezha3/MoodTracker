// src/components/Cart.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, clearBookFromCart } from "../../redux/cartActions";

import "../../styles/Cart.css";

const Cart = ({ toggleCart }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleIncreaseQuantity = (item) => {
    dispatch(updateQuantity(item.id, item.quantity + 1));
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity(item.id, item.quantity - 1));
    }
  };

  const handleRemoveFromCart = (itemId) => {
    dispatch(clearBookFromCart(itemId));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-modal">
      <button className="close-btn" onClick={toggleCart}>
        Close
      </button>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.title} - ${item.price} (Quantity: {item.quantity})
                <div className="quantity-controls">
                  <button onClick={() => handleDecreaseQuantity(item)}>
                    -
                  </button>
                  <button onClick={() => handleIncreaseQuantity(item)}>
                    +
                  </button>
                  <button onClick={() => handleRemoveFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <h3>Total: ${total.toFixed(2)}</h3>
        </>
      )}
    </div>
  );
};

export default Cart;
