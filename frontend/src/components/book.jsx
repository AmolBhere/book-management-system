import React from "react";

const Book = ({ book }) => {
  const coverUrl = book.cover ? `http://localhost:8800${book.cover}` : null;

  return (
    <div className="book">
      {coverUrl && <img src={coverUrl} alt={book.title} />}
      <h2>{book.title}</h2>
      <h4>Author: {book.author}</h4>
      <p>{book.description}</p>
      <p>Price: ₹{book.price}</p>
      <p>Availability: {book.availability ? "Yes" : "No"}</p>
    </div>
  );
};

export default Book;
