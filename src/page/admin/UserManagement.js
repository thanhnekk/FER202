import React, { useEffect, useState } from "react";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:9999/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  const handleToggleUserStatus = (id) => {
    const updatedUser = users.find((user) => user.id === id);
    updatedUser.status =
      updatedUser.status === "Active" ? "Inactive" : "Active";
    axios.put(`http://localhost:9999/users/${id}`, updatedUser).then(() => {
      setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
    });
  };

  return (
    <div className="user-management">
      <h2>User Management</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} - {user.status}
            <button onClick={() => handleToggleUserStatus(user.id)}>
              {user.status === "Active" ? "Deactivate" : "Activate"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
