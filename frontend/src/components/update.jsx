import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    description: "",
    author: "",
    price: "",
    availability: "1",
  });
  const [cover, setCover] = useState(null); // Separate state for file

  const navigate = useNavigate();
  const location = useLocation();
  const bookId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/books`);
        const currentBook = res.data.find((b) => b.id === parseInt(bookId));
        if (currentBook) {
          setBook(currentBook);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchBook();
  }, [bookId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBook((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setCover(e.target.files[0]); // Capture the selected file
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", book.title);
    formData.append("description", book.description);
    formData.append("author", book.author);
    formData.append("price", book.price);
    formData.append("availability", book.availability ? "1" : "0");
    if (cover) formData.append("cover", cover); // Add file only if selected

    try {
      await axios.put(`http://localhost:8800/books/${bookId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form">
      <h1>Update the Book</h1>
      <input
        type="text"
        placeholder="title"
        value={book.title}
        onChange={handleChange}
        name="title"
      />
      <input
        type="text"
        placeholder="description"
        value={book.description}
        onChange={handleChange}
        name="description"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        name="cover"
      />
      <input
        type="text"
        placeholder="author"
        value={book.author}
        onChange={handleChange}
        name="author"
      />
      <input
        type="number"
        placeholder="price"
        value={book.price}
        onChange={handleChange}
        name="price"
      />
      <label>
        Availability:
        <input
          type="checkbox"
          checked={book.availability}
          onChange={handleChange}
          name="availability"
        />
      </label>
      <button onClick={handleClick}>Update</button>
    </div>
  );
};

export default Update;
