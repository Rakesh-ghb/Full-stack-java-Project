import { Link, useNavigate } from "react-router-dom";
import "../styles/AdminNavbar.css";

export default function AdminNavbar() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    alert("Logged out");
    navigate("/");
  };

  return (
    <nav className="admin-nav">

      <h2 className="admin-logo">ADMIN PANEL</h2>

      <div className="admin-links">
        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/projects">Admin Projects</Link>
        <Link to="/admin/add-project">Add Project</Link>
        <Link to="/admin/users">Users</Link>
        <Link to="/admin/orders">Orders</Link>
        <Link to="/admin/payments">Payments</Link>

        <button onClick={logout} className="admin-logout">
          Logout
        </button>
      </div>

    </nav>
  );
}
