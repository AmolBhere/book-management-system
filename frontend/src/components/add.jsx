import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [book, setBook] = useState({
    title: "",
    description: "",
    author: "",
    price: "",
    availability: "1",
  });
  const [cover, setCover] = useState(null); // Separate state for file

  const navigate = useNavigate();

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
    if (cover) formData.append("cover", cover);

    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`); // Debugging FormData
    }
    
    try {
      await axios.post("http://localhost:8800/books", formData);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form">
      <h1>Add New Book</h1>
      <input
        type="text"
        placeholder="title"
        onChange={handleChange}
        name="title"
      />
      <input
        type="text"
        placeholder="description"
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
        onChange={handleChange}
        name="author"
      />
      <input
        type="number"
        placeholder="price"
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
      <button onClick={handleClick}>Add</button>
    </div>
  );
};

export default Add;
