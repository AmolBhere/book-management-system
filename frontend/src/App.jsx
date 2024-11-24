import { BrowserRouter, Routes, Route } from "react-router-dom";
import Books from "./components/books.jsx";
import Add from "./components/add.jsx";
import Update from "./components/update.jsx";
import "./style.css"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
