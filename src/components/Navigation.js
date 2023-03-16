import React, { useState, useEffect } from "react";
import { logout } from "../services/authService.js";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js";
import { Link } from 'react-router-dom';
import "../public/css/Navigation.css"

export const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="navbox">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <img className="logo" src="logo.png" alt="logo"></img>
        <Link className="navbar-brand" to="/">Kit Sector</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {user ? (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/catalog">Catalog</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/upload">Upload</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contacts</Link>
              </li>
              <button onClick={logout} className="log-out form-control"> Log Out</button>
            </ul>
          ) : (        
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>  
              <li className="nav-item">
                <Link className="nav-link" to="/catalog">Catalog</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact Us</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register ">Register</Link>
              </li>
            </ul>
          )}

        </div>
      </nav>
    </div>
  );
}; 