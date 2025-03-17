import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  LogOut,
  User,
  ShoppingBag,
  Heart,
  User2Icon,
  Menu,
  X,
  LayoutDashboardIcon,
} from "lucide-react";

const Sidebar = () => {
  const { user } = useSelector((state) => state.authentication);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => location.pathname.includes(path);

  const links =
    user?.user_role === "admin"
      ? [
          {
            path: "/dashboard/admin",
            label: "Admin Dashboard",
            icon: <User />,
          },
          {
            path: "/dashboard/manage-products",
            label: "Manage Products",
            icon: <ShoppingBag />,
          },
          {
            path: "/dashboard/manage-orders",
            label: "Manage Orders",
            icon: <ShoppingBag />,
          },
          {
            path: "/dashboard/manage-users",
            label: "Manage Users",
            icon: <User2Icon />,
          },
        ]
      : [
          { path: "/dashboard/user", label: "User Dashboard", icon: <User /> },
          {
            path: "/dashboard/my-orders",
            label: "My Orders",
            icon: <ShoppingBag />,
          },
          {
            path: "/dashboard/wishlist",
            label: "Wishlist",
            icon: <Heart />,
          },
        ];

  return (
    <div>
      {/* Hamburger for mobile */}
      <div className="md:hidden flex justify-between items-center p-4 bg-gray-900 text-white">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <LayoutDashboardIcon size={24} />
          ) : (
            <LayoutDashboardIcon size={24} />
          )}
        </button>
      </div>

      {/* Sidebar for desktop and dropdown for mobile */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:block h-screen w-64 bg-gray-900 text-white p-4 fixed md:relative z-20`}
      >
        <nav className="flex-1 overflow-y-auto">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition ${
                isActive(link.path) ? "bg-violet-500" : "hover:bg-gray-700"
              }`}
              onClick={() => setIsOpen(false)} // Close dropdown on link click
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
