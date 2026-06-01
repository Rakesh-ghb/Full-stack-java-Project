import { Navigate } from "react-router-dom";

// Simple JWT decode function
const getRoleFromToken = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role;
  } catch (e) {
    return null;
  }
};

export default function AdminRoute({ children }) {

  const token = localStorage.getItem("token");

  // 1. No token → login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // 2. Decode role
  const role = getRoleFromToken(token);

  // 3. If not ADMIN → block
  if (role !== "ADMIN") {
    return <Navigate to="/projects" />;
  }

  // 4. ADMIN → allow
  return children;
}
