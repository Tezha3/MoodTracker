// src/components/BookStore.js
import React from "react";
import { useSelector } from "react-redux";
import BookCard from "./BookCard";
import Cart from "./Cart";

const BookStore = ({ toggleCart }) => {
  const books = useSelector((state) => state.books);

  return (
    <div className="book-store">
      <div className="row">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      <Cart toggleCart={toggleCart} />
    </div>
  );
};

export default BookStore;
