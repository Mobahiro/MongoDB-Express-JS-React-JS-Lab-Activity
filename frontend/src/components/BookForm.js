import React, { useState } from "react";
import axios from "axios";

export default function BookForm({ reload }) {
  const [book, setBook] = useState({ title: "", author: "", year: "", genre: "" });

  const updateInput = e => setBook({ ...book, [e.target.name]: e.target.value });

  const saveBook = async e => {
    e.preventDefault();
    await axios.post("http://localhost:5000/books", book);
    setBook({ title: "", author: "", year: "", genre: "" });
    reload();
  };

  return (
    <div className="card form-container">
      <h2 className="form-title">➕ Add New Book</h2>
      <form onSubmit={saveBook}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="title">Book Title</label>
            <input
              id="title"
              name="title"
              value={book.title}
              placeholder="Enter book title"
              onChange={updateInput}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              id="author"
              name="author"
              value={book.author}
              placeholder="Enter author name"
              onChange={updateInput}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="year">Publication Year</label>
            <input
              id="year"
              name="year"
              type="number"
              value={book.year}
              placeholder="YYYY"
              onChange={updateInput}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="genre">Genre</label>
            <input
              id="genre"
              name="genre"
              value={book.genre}
              placeholder="e.g., Fiction, Science"
              onChange={updateInput}
              required
              className="form-input"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">✨ Add to Library</button>
      </form>
    </div>
  );
}