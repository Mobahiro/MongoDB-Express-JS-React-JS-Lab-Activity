import React, { useState } from "react";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import "./App.css";

export default function App() {
  const [refresh, setRefresh] = useState(0);
  const reload = () => setRefresh(refresh + 1);

  return (
    <div className="app-container">
      <div className="header">
        <h1>📚 Book Library System</h1>
        <p>Manage your personal book collection</p>
      </div>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <BookForm reload={reload}/>
        <BookList refetch={refresh}/>
      </div>
    </div>
  );
}