import React from "react";
import { Link } from "react-router-dom";
import "../public/css/Home.css";

export const Home = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Welcome to Kit Sector</h1>
        <p>Discover our wide range of football kits and extend their life!</p>
        <Link className="btn" to="/catalog">
          Explore Now
        </Link>
      </div>
    </section>
  );
};
