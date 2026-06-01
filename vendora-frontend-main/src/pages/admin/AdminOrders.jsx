import { useEffect, useState } from "react";
import { getOrders } from "../../api/adminApi";
import "../../styles/AdminOrders.css";

export default function AdminOrders() {

  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const res = await getOrders();
      setOrders(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load orders");
    }
  };

  // 🔍 FILTER
  const filtered = orders.filter(o =>
    String(o.orderId).includes(search) ||
    String(o.projectId).includes(search) ||
    String(o.orderStatus)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="admin-orders-container">

      {/* HEADER */}
      <div className="orders-header">
        <h2>Orders</h2>

        <input
          className="order-search"
          placeholder="Search by order / project / status..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* LIST */}
      <div className="orders-grid">

      {filtered.map(o => (

        <div key={o.orderId} className="admin-order-card">

          <div className="order-row">
            <span className="order-label">Order ID</span>
            <span className="order-value">#{o.orderId}</span>
          </div>

          <div className="order-row">
            <span className="order-label">Project ID</span>
            <span className="order-value">{o.projectId}</span>
          </div>

          <div className="order-row">
            <span className="order-label">Status</span>
            <span className={`status-${o.orderStatus}`}>
              {o.orderStatus}
            </span>
          </div>

        </div>

      ))}

      </div>

      {filtered.length === 0 && (
        <p className="empty">No orders found</p>
      )}

    </div>
  );
}
