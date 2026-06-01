import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Projects from "./pages/Projects";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// ADMIN
import AdminRoute from "./routes/AdminRoute";
import AdminLayout from "./layouts/AdminLayout";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminAddProject from "./pages/admin/AdminAddProject";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* PUBLIC */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* USER */}
          <Route path="/projects" element={<Projects />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* 🔥 ADMIN WITH COMMON NAVBAR */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >

            <Route index element={<AdminDashboard />} />

            <Route path="projects" element={<AdminProjects />} />

            <Route path="add-project" element={<AdminAddProject />} />

            <Route path="users" element={<AdminUsers />} />

            <Route path="orders" element={<AdminOrders />} />

            <Route path="payments" element={<AdminPayments />} />

          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
