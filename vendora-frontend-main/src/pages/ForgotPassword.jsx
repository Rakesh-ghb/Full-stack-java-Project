import { useState } from "react";
import { forgotPasswordApi } from "../api/authApi";
import "../styles/Auth.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      alert("Email required");
      return;
    }

    setLoading(true);
    try {
      const res = await forgotPasswordApi(email);
      alert(res.data); // ✅ FIXED
    } catch {
      alert("Unable to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </div>
    </div>
  );
}
