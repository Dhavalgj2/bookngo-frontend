import React, { useEffect, useState } from "react";
import "./AttendForm.css";
import { useNavigate } from "react-router";
import Modal from "../Modal/Modal";

const AttendForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    address: "",
    adults: 1,
    child5to12: 0,
    childbelow5: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showAddBtn, setShowAddBtn] = useState(true);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const API_BASE_URL = "https://bookngo-backend.onrender.com";
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const navigate = useNavigate();
  useEffect(() => {
    setErrors({});
  }, []);
  const addBtnHandler = () => {
    setShowAddBtn(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const incrementHandler = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: Number(prev[field]) + 1,
    }));
  };

  const decrementHandler = (field) => {
    setFormData((prev) => {
      const min = field === "adults" ? 1 : 0;
      return {
        ...prev,
        [field]: Math.max(min, Number(prev[field] - 1)),
      };
    });
  };

  const validateForm = () => {
    const errors = {};
    if (formData.firstName === "") {
      errors.firstName = "Please Enter FirstName";
    }
    if (formData.lastName.trim() === "") {
      errors.lastName = "Please Enter LastName";
    }
    if (formData.mobile.trim() === "") {
      errors.mobile = "Please Enter Mobile";
    }
    if (formData.address.trim() === "") {
      errors.address = "Please Enter Address";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const closeModal = () => {
    setShowModal(false);
  };
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;

    setShowModal(true);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/attendance`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("res", response);

      if (!response.ok) {
        throw new Error("Failed to submit attendance");
      }

      const result = await response.json();
      console.log("result", result);

      setIsLoading(false);
      setFormData({
        firstName: "",
        lastName: "",
        mobile: "",
        address: "",
        adults: 1,
        child5to12: 0,
        childbelow5: 0,
      });
      await delay(3500);
      navigate("/");
      return result;
    } catch (err) {
      console.error("Error submitting attendance:", err);
      setIsLoading(false);
      alert("Error submitting attendance. Please try again.");
    }
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit} noValidate>
      <label>
        FirstName
        <input
          className={errors.firstName && "error-border"}
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Please enter FirstName"
        />
        {errors.firstName && (
          <span className="error-text">{errors.firstName}</span>
        )}
      </label>
      <label>
        LastName
        <input
          className={errors.lastName && "error-border"}
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Please enter LastName"
        />
        {errors.lastName && (
          <span className="error-text">{errors.lastName}</span>
        )}
      </label>
      <label>
        Mobile
        <input
          className={errors.mobile && "error-border"}
          type="number"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          placeholder="Please enter Mobile Number"
        />
        {errors.mobile && <span className="error-text">{errors.mobile}</span>}
      </label>
      <label>
        Address
        <input
          className={errors.address && "error-border"}
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Please enter Address"
        />
        {errors.address && <span className="error-text">{errors.address}</span>}
      </label>
      <div className="attendance-section">
        <div className="main-counter-sec">
          <label>Adult(s)</label>
          {showAddBtn ? (
            <button type="button" className="add-btn" onClick={addBtnHandler}>
              Add
            </button>
          ) : (
            <div className="counter-wrapper">
              <button
                type="button"
                className="decrement"
                onClick={() => decrementHandler("adults")}
              >
                −
              </button>
              <input
                type="number"
                name="adults"
                value={formData.adults || 1}
                onChange={handleChange}
                min="1"
              />
              <button
                type="button"
                className="increment"
                onClick={() => incrementHandler("adults")}
              >
                +
              </button>
            </div>
          )}
        </div>
        <div className="main-counter-sec">
          <label>Child 5 to 12</label>
          {showAddBtn ? (
            <button type="button" className="add-btn" onClick={addBtnHandler}>
              Add
            </button>
          ) : (
            <div className="counter-wrapper">
              <button
                type="button"
                className="decrement"
                onClick={() => decrementHandler("child5to12")}
              >
                −
              </button>
              <input
                type="number"
                name="child5to12"
                value={formData.child5to12}
                onChange={handleChange}
                min="0"
              />
              <button
                type="button"
                className="increment"
                onClick={() => incrementHandler("child5to12")}
              >
                +
              </button>
            </div>
          )}
        </div>
        <div className="main-counter-sec">
          <label> Child below 5</label>
          {showAddBtn ? (
            <button type="button" className="add-btn" onClick={addBtnHandler}>
              Add
            </button>
          ) : (
            <div className="counter-wrapper">
              <button
                type="button"
                className="decrement"
                onClick={() => decrementHandler("childbelow5")}
              >
                −
              </button>
              <input
                type="number"
                name="childbelow5"
                value={formData.childbelow5}
                onChange={handleChange}
                min="1"
              />
              <button
                type="button"
                className="increment"
                onClick={() => incrementHandler("childbelow5")}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>

      <button
        type="submit"
        className={showAddBtn === true ? "disable-btn" : "submit-btn"}
        disabled={showAddBtn === true}
      >
        Submit Attendance
      </button>
      {showModal && (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          isLoading={isLoading}
          closeModal={closeModal}
          message="Attendance submitted"
        />
      )}
    </form>
  );
};
export default AttendForm;
