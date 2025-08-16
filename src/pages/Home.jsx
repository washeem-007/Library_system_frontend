import React from "react";
import { isAdmin } from "../utils/auth";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";


export default function Home() {
  const admin = isAdmin();
  return (
    <>
      <Navbar />
      <div className="container mt-5 text-center">
        <h1>Welcome to the Library Management System</h1>
        <p className="lead">Choose an option below to get started:</p>
        <div className="mt-4">
          <Link to="/books" className="btn btn-primary btn-lg m-2">Manage Books</Link>
          <Link to="/members" className="btn btn-success btn-lg m-2">Manage Members</Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
