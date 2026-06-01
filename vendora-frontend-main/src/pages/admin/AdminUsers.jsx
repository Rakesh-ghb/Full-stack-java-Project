import { useEffect, useState } from "react";
import { getUsers } from "../../api/adminApi";

import "../../styles/AdminUsers.css";

export default function AdminUsers() {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-users-container">

      <div className="admin-users-header">

        <h2>Users Management</h2>

        <input
          className="user-search"
          placeholder="Search user..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

      </div>

      {filtered.map(u => (

        <div key={u.userId} className="admin-user-card">

          <div>
            <div className="user-label">Name</div>
            <div className="user-value">{u.name}</div>
          </div>

          <div>
            <div className="user-label">Email</div>
            <div className="user-email">{u.email}</div>
          </div>

          <div className={`role-${u.role}`}>
            {u.role}
          </div>

        </div>

      ))}

    </div>
  );
}
