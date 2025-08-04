import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch(`${API_BASE_URL}/api/check-auth`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (!data.authenticated) {
        navigate("/login");
      }
    };
    checkAuth();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const newErrors = { ...errors };

    if (name === "email" && value.trim() === "") {
      newErrors.email = "Email is required.";
    } else if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      newErrors.email = "Invalid email format.";
    } else if (name === "email") {
      delete newErrors.email;
    }

    if (name === "password" && value.trim() === "") {
      newErrors.password = "Password is required.";
    } else if (name === "password") {
      delete newErrors.password;
    }

    setErrors(newErrors);
  };

  const validateForm = () => {
    const errors = {};
    if (formData.email.trim() === "") {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format.";
    }

    if (formData.password.trim() === "") {
      errors.password = "Password is required.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrors((prev) => ({
          ...prev,
          server: data.message || "Login failed",
        }));
        return;
      }

      // ✅ Save token to localStorage
      localStorage.setItem("token", data.token);

      // ✅ Optional: Save user info if needed
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ Redirect to admin page
      navigate("/admin-review");
    } catch (error) {
      console.error("Login error:", error);
      setErrors((prev) => ({
        ...prev,
        server: "An unexpected error occurred. Please try again.",
      }));
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <h2>Login</h2>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your email"
        />
        {errors.email && <p className="error-message">{errors.email}</p>}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your password"
        />
        {errors.password && <p className="error-message">{errors.password}</p>}
        {errors.server && <p className="error-message">{errors.server}</p>}
        <button type="submit" className="login-btn">
          Login
        </button>

        <p className="signup-text">
          Don’t have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
