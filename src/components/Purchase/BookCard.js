// src/components/BookCard.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity } from "../../redux/cartActions";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const BookCard = ({ book }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Find the item in the cart to determine its quantity
  const cartItem = cartItems.find((item) => item.id === book.id);
  const initialQuantity = cartItem ? cartItem.quantity : 1;
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const handleAddToCart = () => {
    dispatch(
      addToCart({ id: book.id, title: book.title, price: book.price, quantity })
    );
    alert("Added to the cart!");
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    dispatch(updateQuantity(book.id, newQuantity));
  };

  return (
    <div className="col">
      <div className="card h-100" style={{ width: "250px" }}>
        <div style={{ height: "200px", overflow: "hidden" }}>
          <img
            src={book.image}
            alt={book.title}
            className="card-img-top"
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
          />
        </div>
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <h3
              className="card-title"
              style={{ fontSize: "1rem", height: "2.5rem" }}
            >
              {book.title}
            </h3>
            <p className="card-text">Price: ${book.price}</p>
          </div>
          <div className="quantity-controls d-flex justify-content-between align-items-center mb-2">
            <button
              className="btn btn-secondary"
              onClick={() => handleQuantityChange(Math.max(quantity - 1, 1))}
            >
              -
            </button>
            <span className="mx-2">{quantity}</span>
            <button
              className="btn btn-secondary"
              onClick={() => handleQuantityChange(quantity + 1)}
            >
              +
            </button>
          </div>
          <button className="btn btn-primary" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
