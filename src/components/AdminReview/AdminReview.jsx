import React, { useEffect, useState } from "react";
import "./AdminReview.css";
import * as XLSX from "xlsx";

const SummaryItem = ({ label, value }) => (
  <div className="summary-item">
    <span>{label}</span>
    <strong>{value}</strong>
  </div>
);

const AdminReview = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [totalAdults, setTotalAdults] = useState(0);
  const [child5to12, setChild5to12] = useState(0);
  const [childBelow5, setChildBelow5] = useState(0);
  const token = localStorage.getItem("token");
  const API_BASE_URL = "https://bookngo-backend.onrender.com";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/registration`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data);
        console.log("data", data);
        let totalA = 0;
        let totalC5to12 = 0;
        let totalCBelow5 = 0;

        data.forEach((user) => {
          totalA += Number(user.adults || 0);
          totalC5to12 += Number(user.child5to12 || 0);
          totalCBelow5 += Number(user.childbelow5 || 0);
        });
        console.log("totalChildBelow5", totalCBelow5);

        setTotalAdults(totalA);
        setChild5to12(totalC5to12);
        setChildBelow5(totalCBelow5);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  console.log(childBelow5);
  const downloadToExcel = () => {
    if (!users || users.length === 0) {
      alert("No user data to export.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(users);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

    XLSX.writeFile(workbook, "UserData.xlsx");
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Registration Summary</h2>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : error ? (
        <p className="error">Error: {error}</p>
      ) : (
        <>
          <div className="summary-grid">
            <SummaryItem label="Total Adults" value={totalAdults} />
            <SummaryItem label="Children (5–12)" value={child5to12} />
            <SummaryItem label="Children (Below 5)" value={childBelow5} />
            <SummaryItem
              label="Total Registered"
              value={totalAdults + child5to12 + childBelow5}
            />
          </div>

          <div className="btn-wrapper">
            <button className="download-excel" onClick={downloadToExcel}>
              Download Excel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminReview;
