import React, { useState } from "react";
import "./NavBar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [errors, setErrors] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const isLoginPage = location.pathname === "/";
  const isOnLogin = location.pathname === "/login";

  const logoutHandler = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        credentials: "include", // ✅ important for session logout
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors((prev) => ({
          ...prev,
          server: data.message || "Logout failed",
        }));
        return;
      }
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      setErrors((prev) => ({
        ...prev,
        server: "Unexpected error during logout.",
      }));
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/" className="brand-logo">
          NGC
        </Link>
      </div>
      <div className="nav-items">
        <Link to="/" className={isLoginPage ? "active" : "nav-link"}>
          Home
        </Link>

        {!isOnLogin && (
          <span
            onClick={logoutHandler}
            className="nav-link"
            style={{ cursor: "pointer" }}
          >
            Logout
          </span>
        )}

        {isOnLogin && (
          <Link to="/login" className="active">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
