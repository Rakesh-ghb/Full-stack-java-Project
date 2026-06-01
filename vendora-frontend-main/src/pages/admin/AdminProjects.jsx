import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../../styles/AdminProjects.css";

import {
  getProjects,
  updateProjectStatus,
  deleteProjectApi,
  updateProjectApi
} from "../../api/adminApi";

export default function AdminProjects() {

  const [projects, setProjects] = useState([]);
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await getProjects();
      setProjects(res.data);
    } catch (err) {
      alert("Failed to load projects");
    }
  };

  const toggleStatus = async (id, active) => {
    try {
      await updateProjectStatus(id, !active);
      load();
    } catch (err) {
      alert("Status update failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    try {
      await deleteProjectApi(id);
      alert("Deleted Successfully");
      load();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const openEdit = (p) => {
    setEdit({ ...p });
  };

  const handleUpdate = async () => {
    try {
      await updateProjectApi(edit.projectId, edit);

      alert("Updated Successfully");
      setEdit(null);
      load();
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div className="admin-projects-container">

      {/* ===== ADMIN INNER NAVBAR ===== */}
      <div className="admin-inner-navbar">

        <Link to="/admin" className="admin-nav-btn">
          Dashboard
        </Link>

        <Link to="/admin/projects" className="admin-nav-btn active">
          Admin Projects
        </Link>

        <Link to="/admin/add-project" className="admin-nav-btn">
          Add Project
        </Link>

        <Link to="/admin/users" className="admin-nav-btn">
          Users
        </Link>

        <Link to="/admin/orders" className="admin-nav-btn">
          Orders
        </Link>

        <Link to="/admin/payments" className="admin-nav-btn">
          Payments
        </Link>

      </div>

      <h2>Project Management</h2>

      {projects.map(p => (

        <div key={p.projectId} className="admin-project-card">

          <div className="pro-title">
            {p.title}
          </div>

          <div className="pro-price">
            ₹{p.price}
          </div>

          <div className={
            p.isActive ? "status-ACTIVE" : "status-DISABLED"
          }>
            {p.isActive ? "ACTIVE" : "DISABLED"}
          </div>

          {/* ===== BUTTON GROUP ===== */}
          <div className="btn-group">

            <button
              className="pro-btn toggle-btn"
              onClick={() =>
                toggleStatus(p.projectId, p.isActive)
              }>
              Toggle
            </button>

            <button
              className="pro-btn edit-btn"
              onClick={() => openEdit(p)}>
              Edit
            </button>

            <button
              className="pro-btn delete-btn"
              onClick={() => handleDelete(p.projectId)}>
              Delete
            </button>

          </div>

        </div>
      ))}

      {/* ===== EDIT BOX ===== */}
      {edit && (

        <div className="edit-box">

          <h3>Edit Project</h3>

          <input
            placeholder="Title"
            value={edit.title}
            onChange={e =>
              setEdit({...edit, title: e.target.value})
            }
          />

          <input
            placeholder="Price"
            value={edit.price}
            onChange={e =>
              setEdit({...edit, price: e.target.value})
            }
          />

          <textarea
            placeholder="Description"
            value={edit.description}
            onChange={e =>
              setEdit({...edit, description: e.target.value})
            }
          />

          <div className="btn-group">

            <button
              className="pro-btn save-btn"
              onClick={handleUpdate}>
              Save
            </button>

            <button
              className="pro-btn cancel-btn"
              onClick={() => setEdit(null)}>
              Cancel
            </button>

          </div>

        </div>

      )}

    </div>
  );
}
