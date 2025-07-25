import React from "react";
import "./OrderReview.css";

const OrderReview = () => {
  return (
    <div className="order-review-container">
      <div className="left">
        <h2>Newhaven Gujarati Annual Event</h2>
        <p>
          📅 <strong>11 October 2025</strong> from 4:00 PM onwards
          <br />
          📍 The Finnish Society of Melbourne Hall, Altona, VIC
        </p>
        <p>
          🎉 Enjoy Dance Performances, DJ Garba, Kids Activities & Delicious
          Food!
        </p>
        <p>
          We’re excited to celebrate with the community again. Thank you for
          your attendance.
        </p>
      </div>

      <div className="right">
        <div className="summary-box">
          <h2>Attendance Summary</h2>
          <ul className="summary-list">
            <li>
              <div>👤 Adults: 2 </div>
              <div className="edit-container">
                <span>$25</span>
                <span>Delete</span>
              </div>
            </li>
            <li>
              <div>🧒 Children (5–12): 1</div>
              <div className="edit-container">
                <span>$15</span>
                <span>Delete</span>
              </div>
            </li>
            <li>
              <div>👶 Children (Below 5): 1</div>
              <div className="edit-container">
                <span>Free</span>
                <span>Delete</span>
              </div>
            </li>
            <li>
              <div></div>
              <div>
                <span>Total</span>
                <span>$120</span>
                <span>123</span>
              </div>
            </li>
          </ul>
          <button className="checkout">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default OrderReview;
