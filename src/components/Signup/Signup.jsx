import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const validateForm = () => {
    const errors = {};
    if (formData.email.trim() === "") {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format.";
    }

    if (formData.firstName.trim() === "") {
      errors.firstName = "Please enter firstname";
    }
    if (formData.password.trim() === "") {
      errors.password = "Password is required.";
    }
    if (formData.confirmPassword.trim() === "") {
      errors.confirmPassword = "Password is required.";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.matchPassword = "Password is not match";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const res = await fetch(
        "https://bookngo-backend.onrender.com/api/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!res.ok) {
        setErrors("Signup failed.");
      }
      navigate("/login");
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };
  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit} noValidate>
        <h2>Sign Up</h2>
        <label htmlFor="firstName">FirstName</label>
        <input
          name="firstName"
          placeholder="Please Enter FirstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        {errors.firstName && (
          <p className="error-message">{errors.firstName}</p>
        )}

        <label htmlFor="email">Email</label>
        <input
          name="email"
          placeholder="Please enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Please enter Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors.password && <p className="error-message">{errors.password}</p>}
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Please enter confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        {errors.confirmPassword && (
          <p className="error-message">{errors.confirmPassword}</p>
        )}
        {errors.matchPassword && (
          <p className="error-message">{errors.matchPassword}</p>
        )}
        <button type="submit" className="signup-btn">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
