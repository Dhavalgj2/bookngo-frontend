import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const newErrors = { ...error };

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

    setError(newErrors);
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

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Login submitted:", formData);
      // perform login logic
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
        {error.email && <p className="error-message">{error.email}</p>}

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
        {error.password && <p className="error-message">{error.password}</p>}

        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
