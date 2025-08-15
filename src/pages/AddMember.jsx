import React, { useState } from "react";
import axios from "axios";

function AddMember() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    username: "",
    password: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      // Step 1: Register the user
      await axios.post("http://localhost:8081/api/Account/register", {
        email: form.email,
        password: form.password
      });

      // Step 2: Get user list and find the new user ID
      const usersRes = await axios.get("http://localhost:8081/api/Account/users");
      const newUser = usersRes.data.find(u => u.email === form.email);
      if (!newUser) throw new Error("User creation failed");

      // Step 3: Assign "Viewer" role
      await axios.post("http://localhost:8081/api/Roles/assign-role-to-user", {
        userId: newUser.id,
        roleName: "Viewer"
      });

      // Step 4: Create member entry
      await axios.post("http://localhost:8081/api/Members", {
        name: form.name,
        age: form.age,
        email: form.email,
        username: form.username
      });

      setMessage("Member created successfully with Viewer role.");
    } catch (err) {
      setMessage("Error: " + (err.response?.data || err.message));
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Member</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" name="name" placeholder="Name" onChange={handleChange} />
        <input className="form-control mb-2" name="age" placeholder="Age" onChange={handleChange} />
        <input className="form-control mb-2" name="email" placeholder="Email" onChange={handleChange} />
        <input className="form-control mb-2" name="username" placeholder="Username" onChange={handleChange} />
        <input className="form-control mb-2" name="password" type="password" placeholder="Password" onChange={handleChange} />
        <button className="btn btn-primary">Add Member</button>
      </form>
    </div>
  );
}

export default AddMember;
