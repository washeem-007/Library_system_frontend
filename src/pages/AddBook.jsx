import React from "react";
import { useNavigate } from "react-router-dom";
import BookForm from "../components/BookForm";
import { addBook } from "../services/bookService";

function AddBook() {
  const navigate = useNavigate();

  const handleSubmit = (book) => {
    addBook(book)
      .then(() => {
        alert("Book added successfully");
        navigate("/books");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to add book");
      });
  };

  return (
    <div className="container mt-4">
      <h2>Add Book</h2>
      <BookForm onSubmit={handleSubmit} />
    </div>
  );
}

export default AddBook;
