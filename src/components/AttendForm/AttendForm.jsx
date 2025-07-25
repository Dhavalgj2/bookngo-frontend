import React, { useState } from "react";
import "./AttendForm.css";
import { useNavigate } from "react-router";

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

  const navigate = useNavigate();

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
    setFormData((prev) => ({
      ...prev,
      [field]: Number(prev[field] - 1),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/review");
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit} noValidate>
      <label>
        FirstName
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </label>
      <label>
        LastName
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </label>
      <label>
        Mobile
        <input
          type="number"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
        />
      </label>
      <label>
        Address
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </label>
      <h3>Attendance</h3>
      <div className="attendance-section">
        <div className="main-counter-sec">
          <label>Adult(s)</label>
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
        </div>
        <div className="main-counter-sec">
          <label>Child 5 to 12</label>
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
        </div>
        <div className="main-counter-sec">
          <label> Child below 5</label>
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
        </div>
      </div>

      <button type="submit" className="submit-btn">
        Submit Attendance
      </button>
    </form>
  );
};
export default AttendForm;
