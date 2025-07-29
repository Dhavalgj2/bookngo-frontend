import React, { useEffect, useState } from "react";

const AdminReview = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/registration", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data);
        console.log("Fetched users:", data);
      } catch (err) {
        setError(err.message);
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Review</h1>
      {error && <p className="text-red-600">Error: {error}</p>}
      {users.length > 0 ? (
        <ul className="list-disc pl-6">
          {users.map((user, index) => (
            <li key={user._id || index}>
              {user.firstName} {user.lastName} — {user.mobile}
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default AdminReview;
