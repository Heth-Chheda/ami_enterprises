import Sidebar from "../layout/Sidebar";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import UserDashboard from "@/components/ui/UserDashboard";
import AdminDashboard from "@/components/ui/AdminDashboard";
import { useSidebar } from "../context/sidebarContext";

const Home = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar(); // Use context state
  const [selectedComponent, setSelectedComponent] = useState("Dashboard");

  const { user, isAuthenticated } = useSelector(
    (state) => state.authentication
  );

  // Redirect if not authenticated
  // if (!isAuthenticated) {
  //   return <Navigate to={"/login"} />;
  // }

  return (
    <>
      <div className="relative md:pl-64 flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        {isAuthenticated && (
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            setSelectedComponent={setSelectedComponent}
          />
        )}

        {/* Component Switching */}
        {(() => {
          switch (selectedComponent) {
            case "Dashboard":
              return user?.user_role === "customer" ? (
                <UserDashboard />
              ) : (
                <AdminDashboard />
              );

            case "Products":
              return <ProductManagement />;

            case "Catalog":
              if (user?.user_role === "admin") {
                return <Catalog />;
              }
              break;

            case "Users":
              if (user?.user_role === "admin") {
                return <UsersHai />;
              }
              break;

            default:
              return user?.user_role === "customer" ? (
                <UserDashboard />
              ) : (
                <AdminDashboard />
              );
          }
        })()}
      </div>
    </>
  );
};

export default Home;
