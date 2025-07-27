import React from "react";
import "./NavBar.css";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  const home = location.pathname === "/";
  const login = location.pathname === "/login";

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/" className="brand-logo">
          NGC
        </Link>
      </div>
      <div className="nav-items">
        <Link to="/" className={` ${home ? "active" : "nav-link"}`}>
          Home
        </Link>
        <Link to="/login" className={` ${login ? "active" : "nav-link"}`}>
          Login
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
