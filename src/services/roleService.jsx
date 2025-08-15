import axios from "axios";

const API_BASE = "http://localhost:8081/api";

export const getAllUsers = (token) => {
  return axios.get(`${API_BASE}/Account/users`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const assignRoleToUser = (token, userId, roleName) => {
  return axios.post(
    `${API_BASE}/Roles/assign-role-to-user`,
    { userId, roleName },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

