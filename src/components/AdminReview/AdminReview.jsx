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
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

        let totalA = 0;
        let totalC5to12 = 0;
        let totalCBelow5 = 0;

        data.forEach(({ adults = 0, child5to12 = 0, childBelow5 = 0 }) => {
          totalA += adults;
          totalC5to12 += child5to12;
          totalCBelow5 += childBelow5;
        });

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
