import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Book from "../components/book";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/books/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="books-container">
      <h1>Book Management System for Book Shop</h1>

      {/* Add New Book Button */}
      <div className="add-book-button">
        <button className="add-new-book">
          <Link to="/add">Add New Book</Link>
        </button>
      </div>

      {/* Displaying Books */}
      <div className="books">
        {books.map((book) => (
          <div key={book.id}>
            <Book book={book} />
            <div className="actions">
              <button className="delete" onClick={() => handleDelete(book.id)}>
                Delete
              </button>
              <button className="update">
                <Link to={`/update/${book.id}`}>Update</Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
