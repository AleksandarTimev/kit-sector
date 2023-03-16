import React, { useState, useEffect } from "react";
import { logout } from "../services/authService.js";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js";

export const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <img className="logo" src="logo.png" alt="logo"></img>
      <a className="navbar-brand" href="/">Kit Sector</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="/login">Login</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/register">Register</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/upload">Upload</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/catalog">Catalog</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">Home</a>
          </li>
          {user ? (
            <button onClick={logout} className="log-out"> Log Out</button>) : ("")}
        </ul>
      </div>
    </nav>
    </div>
  );
};