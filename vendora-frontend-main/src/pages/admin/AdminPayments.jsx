import { useEffect, useState } from "react";
import { getPayments } from "../../api/adminApi";
import "../../styles/AdminPayments.css";

export default function AdminPayments() {

  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      const res = await getPayments();
      setPayments(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load payments");
    }
  };

  // 🔍 SEARCH FILTER
  const filtered = payments.filter(p =>
    String(p.orderId).includes(search) ||
    String(p.paymentStatus)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="admin-payments-container">

      {/* ===== HEADER WITH SEARCH ===== */}
      <div className="admin-payments-header">

        <h2>Payments</h2>

        <input
          className="payment-search"
          placeholder="Search by order id / status..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

      </div>

      {/* ===== PAYMENT LIST ===== */}
      {filtered.map(p => (

        <div key={p.paymentId} className="admin-payment-card">

          <span>
            <span className="pay-label">Order:</span>
            <span className="pay-value"> {p.orderId}</span>
          </span>

          <span>
            <span className="pay-label">Amount:</span>
            <span className="amount"> ₹{p.amount}</span>
          </span>

          <span>
            <span className="pay-label">Payment ID:</span>
            <span className="pay-value">
              {p.razorpayPaymentId || "—"}
            </span>
          </span>

          <span className={`status-${p.paymentStatus}`}>
            {p.paymentStatus}
          </span>

        </div>

      ))}

      {filtered.length === 0 && (
        <p>No payments found</p>
      )}

    </div>
  );
}
