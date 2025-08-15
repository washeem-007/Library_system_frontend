import React, { useState, useEffect } from "react";
import { getMembers } from "../services/memberService";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { getAllUsers, assignRoleToUser } from "../services/roleService";

function AssignRole() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [message, setMessage] = useState("");

  const roles = ["Admin", "Librarian", "Manager", "Staff"];

  const token = localStorage.getItem("token");

  useEffect(() => {
    getAllUsers(token)
      .then((res) => setUsers(res.data))
      .catch(() => setMessage("Failed to load users"));
  }, [token]);

  const handleAssign = (e) => {
    e.preventDefault();

    if (!selectedUser || !selectedRole) {
      setMessage("Please select both a user and a role.");
      return;
    }

    assignRoleToUser(token, selectedUser, selectedRole)
      .then(() => setMessage("Role assigned successfully!"))
      .catch(() => setMessage("Failed to assign role."));
  };

  return (
    <div className="container mt-4">
      <h2>Assign Role to User</h2>
      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleAssign}>
        <div className="mb-3">
          <label className="form-label">Select User</label>
          <select
            className="form-control"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">-- Choose User --</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.email}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Select Role</label>
          <select
            className="form-control"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="">-- Choose Role --</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        <button className="btn btn-primary" type="submit">
          Assign Role
        </button>
      </form>
    </div>
  );
}

export default AssignRole;