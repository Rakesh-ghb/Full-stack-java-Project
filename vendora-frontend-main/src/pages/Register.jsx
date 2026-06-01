import { useState } from "react";
import { registerUser } from "../services/authService";
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";



export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleRegister = async () => {
  try {
    await registerUser(form);
    alert("Registration Successful 🎉");
    navigate("/login");   // 👈 Redirect automatically
  } catch (err) {
    alert("Registration Failed");
  }
};


  return (
  <div className="register-page">
    <div className="register-card">
      <h2>Register</h2>

      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />

      <select name="role" onChange={handleChange}>
        <option value="USER">USER</option>
        <option value="ADMIN">ADMIN</option>
      </select>

      <button onClick={handleRegister}>Register</button>
    </div>
  </div>
);
}
