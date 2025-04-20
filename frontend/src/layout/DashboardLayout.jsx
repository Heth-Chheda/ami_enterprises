import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import AdminDashboard from "@/components/ui/AdminDashboard";
import UserDashboard from "@/components/ui/UserDashboard";
import Sidebar from "@/components/Sidebar";
import ManageProducts from "@/components/ui/Admin/ManageProducts";
import ManageUsers from "@/components/ui/Admin/ManageUsers";
import { useSelector } from "react-redux";
import ManageOrders from "@/components/ui/Admin/ManageOrders";
import MyWishlist from "@/components/ui/User/MyWishlist";
import MyOrders from "@/components/ui/User/MyOrders";
import OrderDetail from "@/components/ui/User/Orderdetail";
import EditUser from "@/components/ui/Admin/EditUser";
import EditProduct from "@/components/ui/Admin/EditProduct";
import ProfileSettings from "@/components/ui/User/ProfileSettings";
import Addresses from "@/components/ui/User/Addresses";

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
          <Route path="manage-orders" element={<ManageOrders />} />
          <Route path="wishlist" element={<MyWishlist />} />
          <Route path="my-orders" element={<MyOrders />} />
          <Route path="order/:id" element={<OrderDetail />} />
          <Route path="editUser/:email" element={<EditUser />} />
          <Route path="product/edit/:id" element={<EditProduct />} />
          <Route path="settings/profile" element={<ProfileSettings />} />
          <Route path="settings/shipping-address" element={<Addresses />} />
        </Routes>
      </div>
    </div>
  );
};

export default DashboardLayout;
