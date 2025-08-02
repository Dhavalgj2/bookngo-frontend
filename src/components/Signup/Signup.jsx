import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./Signup.css";
import Modal from "../Modal/Modal";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "Please enter firstname";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!formData.password.trim()) newErrors.password = "Password is required.";
    if (!formData.confirmPassword.trim())
      newErrors.confirmPassword = "Confirm your password.";
    if (formData.password !== formData.confirmPassword)
      newErrors.matchPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMessage("");
  };

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setShowModal(true);

    setErrors({});
    try {
      const res = await fetch(`${API_BASE_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.message || "Signup failed.");
      }
      setLoading(false);
      setFormData({
        firstName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setModalMessage("Signup successful!");
      await delay(3500);
      navigate("/login");
    } catch (err) {
      setModalMessage(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit} noValidate>
        <h2>Sign Up</h2>

        <label htmlFor="firstName">First Name</label>
        <input
          name="firstName"
          placeholder="Please enter First Name"
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
          placeholder="Confirm your Password"
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

        <button type="submit" className="signup-btn" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      {showModal && (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          isLoading={loading}
          closeModal={closeModal}
          message={modalMessage}
        />
      )}
    </div>
  );
};

export default Signup;
