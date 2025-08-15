import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Layout from "./components/Layout";
import BooksList from "./pages/BooksList";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import MembersList from "./pages/MembersList"; 
import AddMember from "./pages/AddMember";
import EditMember from "./pages/EditMember";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AssignRole  from "./pages/AssignRole";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Layout><BooksList /></Layout>} />
        <Route path="/books/add" element={<Layout><AddBook /></Layout>} />
        <Route path="/books/edit/:id" element={<Layout><EditBook /></Layout>} />

        <Route path="/members" element={<Layout><MembersList /></Layout>} />
        <Route path="/members/add" element={<Layout><AddMember /></Layout>} />
        <Route path="/members/edit/:id" element={<Layout><EditMember /></Layout>} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/assign-role" element={<AssignRole  />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
