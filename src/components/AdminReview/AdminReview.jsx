import React, { useEffect, useState } from "react";
import "./AdminReview.css";
import * as XLSX from "xlsx";

const AdminReview = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [totalAdults, setTotalAdults] = useState(0);
  const [child5to12, setChild5to12] = useState(0);
  const [childBelow5, setChildBelow5] = useState(0);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          "https://bookngo-backend.onrender.com/api/registration",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data);

        // Calculate totals here
        let totalA = 0;
        let totalC5to12 = 0;
        let totalCBelow5 = 0;

        data.forEach((user) => {
          totalA += user.adults || 0;
          totalC5to12 += user.child5to12 || 0;
          totalCBelow5 += user.childBelow5 || 0;
        });

        setTotalAdults(totalA);
        setChild5to12(totalC5to12);
        setChildBelow5(totalCBelow5);

        console.log("Fetched users:", data);
      } catch (err) {
        setError(err.message);
        console.error(err);
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
      {error && <p className="text-red-600">Error: {error}</p>}

      <div className="summary-box">
        <h2 className="text-xl font-semibold mb-2 border-dotted pb-2">
          Registration Summary
        </h2>
        <p>
          Total Adults: <strong>{totalAdults}</strong>
        </p>
        <p>
          Children (5-12): <strong>{child5to12}</strong>
        </p>
        <p>
          Children (Below 5): <strong>{childBelow5}</strong>
        </p>
        <p className="border-bottom pb-3">
          Total Registered:{" "}
          <strong>{totalAdults + child5to12 + childBelow5}</strong>
        </p>
        <div class="d-flex justify-content-center align-items-center">
          <button className="download-excel" onClick={downloadToExcel}>
            Download Excel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminReview;
