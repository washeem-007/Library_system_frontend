// src/components/Layout.jsx
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="container d-flex justify-content-center mt-4">
        <div className="w-100" style={{ maxWidth: "900px" }}>
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
