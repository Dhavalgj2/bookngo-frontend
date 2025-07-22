import React, { useState } from "react";
import "./AttendForm.css";

const AttendForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    address: "",
    adults: "",
    child5to12: "",
    childbelow5: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
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
        <label>
          Adult(s)
          <input
            type="number"
            name="adults"
            value={formData.adults || 1}
            onChange={handleChange}
          />
        </label>
        <label>
          Child 5 to 12
          <input
            type="number"
            name="child5to12"
            value={formData.child5to12}
            onChange={handleChange}
          />
        </label>
        <label>
          Child below 5
          <input
            type="number"
            name="childbelow5"
            value={formData.childbelow5}
            onChange={handleChange}
          />
        </label>
      </div>

      <button type="submit">Submit Attendance</button>
    </form>
  );
};
export default AttendForm;
