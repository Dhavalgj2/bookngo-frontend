import React from "react";
import "./NavBar.css"; // Import the CSS file
import { Link } from "react-router";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="nav-items">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
