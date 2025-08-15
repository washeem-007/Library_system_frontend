import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

export default function Navbar() {
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserEmail(decoded.sub); 
      } catch (err) {
        console.error("Invalid token", err);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserEmail(null);
    navigate("/login");
  };

  const token = localStorage.getItem("token");
  let decodedEmail = "";

  if (token) {
    try {
      const decoded = jwtDecode(token);
      decodedEmail = decoded.sub;
    } catch (err) {
      console.error("Invalid token");
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Library</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/books">Books</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/members">Members</Link>
            </li>
            {decodedEmail === "washeem007@gmail.com" && (
              <li className="nav-item"><a className="nav-link" href="/assign-role">Assign Role</a></li>              
            )}
            <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>

          </ul>
          <ul className="navbar-nav ms-auto">
            {userEmail ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">Welcome, {userEmail}</span>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn btn-outline-light btn-sm">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
