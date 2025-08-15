import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookForm from "../components/BookForm";
import { getBookById, updateBook } from "../services/bookService";

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load book details
  useEffect(() => {
    getBookById(id)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load book");
        navigate("/books");
      });
  }, [id, navigate]);

  const handleSubmit = (updatedBook) => {
    updateBook(id, updatedBook)
      .then(() => {
        alert("Book updated successfully");
        navigate("/books");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to update book");
      });
  };

  if (loading) return <p className="text-center mt-4">Loading book...</p>;

  return (
    <div className="container mt-4">
      <h2>Edit Book</h2>
      {book && <BookForm initialData={book} onSubmit={handleSubmit} />}
    </div>
  );
}

export default EditBook;
