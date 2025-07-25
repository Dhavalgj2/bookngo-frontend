import React, { useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  const handleBookingClick = () => {
    navigate("/attendance");
  };

  return (
    <div className="home-container">
      <section className="event-intro">
        <h1>Newhaven Gujarati Community</h1>
        <h2>3rd Annual Celebration - 11 October 2025</h2>
        <p>
          🎉 Dance Performances • 🎧 DJ Garba • 🍱 Food • 🧒 Kids Activities
        </p>
        <p>
          📍 <strong>The Finnish Society of Melbourne Hall</strong>
          <br />
          119 Pier Street, Altona, VIC 3018
        </p>
        <p>
          A continued tradition of bringing families together for culture, fun,
          and connection.
        </p>
        <button className="booking-button" onClick={handleBookingClick}>
          Book Your Attendance
        </button>
      </section>
    </div>
  );
};

export default Home;
