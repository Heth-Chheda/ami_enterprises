import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import AdminDashboard from "@/components/ui/AdminDashboard";
import UserDashboard from "@/components/ui/UserDashboard";
import Sidebar from "@/components/Sidebar";
import ManageProducts from "@/components/ui/Admin/ManageProducts";
import ManageUsers from "@/components/ui/Admin/ManageUsers";
import { useSelector } from "react-redux";

const DashboardLayout = () => {
  const { isAuthenticated } = useSelector((state) => state.authentication);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <Sidebar />
      <div className="flex-1 p-4 overflow-auto mt-16 md:mt-0">
        <Routes>
          {/* Conditional rendering based on user role */}
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="user" element={<UserDashboard />} />
          <Route path="manage-products" element={<ManageProducts />} />
          <Route path="manage-users" element={<ManageUsers />} />
        </Routes>
      </div>
    </div>
  );
};

export default DashboardLayout;
