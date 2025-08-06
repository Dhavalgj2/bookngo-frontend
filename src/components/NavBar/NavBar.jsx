import React, { useEffect, useState } from "react";
import "./NavBar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const NavBar = () => {
  const [token, setToken] = useState(null);
  const [errors, setErrors] = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const API_BASE_URL = "https://bookngo-backend.onrender.com";

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    setMobileMenuOpen(false); // Close menu on route change
  }, [location]);

  const logoutHandler = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/logout`, {
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
      setToken(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      setErrors((prev) => ({
        ...prev,
        server: "Unexpected error during logout.",
      }));
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const isHome = location.pathname === "/";
  const isLogin = location.pathname === "/login";

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/" className="brand-logo">
          NGC
        </Link>
      </div>

      <div className="menu-icon" onClick={toggleMobileMenu}>
        {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
      </div>

      <div className={`nav-items ${mobileMenuOpen ? "show" : ""}`}>
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
            <Link to="/" className={`nav-link ${isHome ? "active" : ""}`}>
              <span className="desktop">Home</span>
              <span className="mobile">
                <HomeIcon />
              </span>
            </Link>
            <Link to="/login" className={`nav-link ${isLogin ? "active" : ""}`}>
              <span className="desktop">Login</span>
              <span className="mobile">
                <PersonIcon />
              </span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
