// src/components/BookList.js
import React from "react";
import BookCard from "./BookCard";

const books = [
  {
    id: 1,
    title: "The Power of Now",
    price: 15.99,
    image: "/book1.png",
  },
  {
    id: 2,
    title: "Mindset: The New Psychology of Success",
    price: 18.99,
    image: "/book2.jpg",
  },
  {
    id: 3,
    title: "Atomic Habits",
    price: 12.99,
    image: "/book3.jpg",
  },
  {
    id: 4,
    title: "The Subtle Art of Not Giving a F*ck",
    price: 14.99,
    image: "/book4.jpg",
  },
  {
    id: 5,
    title: "Educated: A Memoir",
    price: 16.49,
    image: "/book5.jpg",
  },
  {
    id: 6,
    title: "Sapiens: A Brief History of Humankind",
    price: 22.99,
    image: "/book6.jpeg",
  },
  {
    id: 7,
    title: "Becoming",
    price: 19.99,
    image: "/book7.jpeg",
  },
  {
    id: 8,
    title: "The Four Agreements",
    price: 10.99,
    image: "/book8.jpg",
  },
];

const BookList = () => {
  return (
    <div className="book-list">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
