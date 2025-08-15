import React, { useState, useEffect } from "react";

function BookForm({ initialData, onSubmit }) {
  const [formData, setFormData] = useState({
    isbn: "",
    title: "",
    author: "",
    publisher: ""
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-3">
      <div className="mb-3">
        <label>ISBN</label>
        <input
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>Title</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label>Author</label>
        <input
          name="author"
          value={formData.author}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>Publisher</label>
        <input
          name="publisher"
          value={formData.publisher}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">Save</button>
    </form>
  );
}

export default BookForm;
