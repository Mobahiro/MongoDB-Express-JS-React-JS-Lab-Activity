import React, { useEffect, useState } from "react";
import axios from "axios";

export default function BookList({ refetch }) {
  const [books, setBooks] = useState([]);

  useEffect(() => { getBooks(); }, [refetch]);

  const getBooks = async () => {
    const res = await axios.get("http://localhost:5000/books");
    setBooks(res.data);
  };

  const deleteBook = async id => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      await axios.delete(`http://localhost:5000/books/${id}`);
      getBooks();
    }
  };

  const editBook = async id => {
    const book = books.find(b => b._id === id);
    const title = prompt("New title:", book.title);
    if (!title) return;
    const author = prompt("New author:", book.author);
    if (!author) return;
    const year = prompt("New year:", book.year);
    if (!year) return;
    const genre = prompt("New genre:", book.genre);
    if (!genre) return;

    await axios.put(`http://localhost:5000/books/${id}`, { title, author, year, genre });
    getBooks();
  };

  return (
    <div className="card list-container">
      <h2 className="list-header">📖 Your Library Collection</h2>
      {books.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📚</div>
          <p>No books in your library yet. Add your first book above!</p>
        </div>
      ) : (
        books.map(b => (
          <div key={b._id} className="book-item">
            <div className="book-title">{b.title}</div>
            <div className="book-details">
              <div className="book-detail-item">👤 {b.author}</div>
              <div className="book-detail-item">📅 {b.year}</div>
            </div>
            <span className="book-genre">{b.genre}</span>
            <div className="book-actions">
              <button onClick={() => editBook(b._id)} className="btn btn-edit">✏️ Edit</button>
              <button onClick={() => deleteBook(b._id)} className="btn btn-delete">🗑️ Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
