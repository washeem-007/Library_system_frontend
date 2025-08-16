import { jwtDecode } from "jwt-decode";

export const ADMIN_EMAIL = "washeem007@gmail.com";

export function isAdmin() {
  const token = localStorage.getItem("token");
  if (!token) return false;
  try {
    const decoded = jwtDecode(token);
    // If your JWT later includes a role, this will pick it up.
    const role =
      decoded["role"] ||
      decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    if (role) return role === "Admin";
    // Fallback: check email (works with your current token)
    return decoded.sub === ADMIN_EMAIL;
  } catch {
    return false;
  }
}

export function isLoggedIn() {
  return !!localStorage.getItem("token");
}
