// src/components/Purchase/PurchaseSection.js
import React, { useState } from "react";
import BookList from "./BookList";
import Cart from "./Cart"; // Ensure Cart component displays items in the cart
import { FaShoppingCart } from "react-icons/fa";

import "../../styles/PurchaseSection.css";

const PurchaseSection = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="app">
      <header>
        <h1>Book Store</h1>
        <FaShoppingCart className="cart-icon" onClick={toggleCart} />
      </header>
      <div className="content">
        <BookList />
        {isCartOpen && <Cart toggleCart={toggleCart} />}{" "}
        {/* Pass toggle function to Cart */}
      </div>
    </div>
  );
};

export default PurchaseSection;
