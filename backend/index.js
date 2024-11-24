import express from "express";
import mysql from "mysql";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the 'uploads' directory
const __filename = fileURLToPath(import.meta.url); // Get the current file's absolute path
const __dirname = path.dirname(__filename); // Get the current directory's absolute path
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Set up MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Qwert@123#$",
  database: "test",
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to store files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// Default route
app.get("/", (req, res) => {
  res.json("Hello, this is the backend");
});

// Fetch all books
app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Add a new book
app.post("/books", upload.single("cover"), (req, res) => {
  const q = `
    INSERT INTO books (title, description, cover, author, price, availability) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [
    req.body.title,
    req.body.description,
    req.file ? `/uploads/${req.file.filename}` : null,
    req.body.author,
    req.body.price,
    req.body.availability,
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.json({ message: "Error creating book", err });
    return res.json({ message: "Book created successfully", data });
  });
});

// Delete a book
app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book deleted successfully");
  });
});

// Update a book
app.put("/books/:id", upload.single("cover"), (req, res) => {
  const bookId = req.params.id;
  const q = `
    UPDATE books SET title=?, description=?, cover=?, author=?, price=?, availability=? 
    WHERE id=?
  `;
  const values = [
    req.body.title,
    req.body.description,
    req.file ? `/uploads/${req.file.filename}` : req.body.cover, // Keep the existing cover if no file is uploaded
    req.body.author,
    req.body.price,
    req.body.availability,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book updated successfully");
  });
});

app.listen(8800, () => {
  console.log("Connected to backend!");
});
