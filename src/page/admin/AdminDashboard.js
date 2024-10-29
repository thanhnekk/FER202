import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="dashboard-links">
        <button onClick={() => navigate("/admin/products")}>
          Manage Products
        </button>
        <button onClick={() => navigate("/admin/users")}>Manage Users</button>
        <button onClick={() => navigate("/admin/orders")}>Manage Orders</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
