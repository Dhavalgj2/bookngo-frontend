import React, { useEffect, useState } from "react";
import "./NavBar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [token, setToken] = useState(null);
  const [errors, setErrors] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Sync with localStorage whenever it changes
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, [location]); // re-run when route changes

  const logoutHandler = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        credentials: "include",
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
      setToken(null); // 👈 update local state
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      setErrors((prev) => ({
        ...prev,
        server: "Unexpected error during logout.",
      }));
    }
  };

  const isLoginPage = location.pathname === "/";
  const isOnLogin = location.pathname === "/login";

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/" className="brand-logo">
          NGC
        </Link>
      </div>
      <div className="nav-items">
        {token ? (
          <span
            onClick={logoutHandler}
            className="nav-link"
            style={{ cursor: "pointer" }}
          >
            Logout
          </span>
        ) : (
          <>
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
