import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ChevronDown,
  ChevronRight,
  LogOut,
  User,
  ShoppingBag,
  Star,
  MessageCircle,
  LayoutDashboardIcon,
  User2Icon,
  Menu,
  X,
  Heart,
} from "lucide-react";

const Sidebar = () => {
  const { user } = useSelector((state) => state.authentication);
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const [isOpen, setIsOpen] = useState(false);
  const [openSections, setOpenSections] = useState({});

  const location = useLocation();
  const isActive = (path) => location.pathname.includes(path);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const commonSections = [
    {
      label: "My Wishlist",
      links: [
        {
          path: "/dashboard/wishlist",
          label: `Wishlist (${wishlistItems.length})`,
          icon: <Heart className="text-red-500" />,
        },
      ],
    },
  ];

  const adminSections = [
    {
      label: "Dashboard Overview",
      links: [
        {
          path: "/dashboard/admin",
          label: "Admin Dashboard",
          icon: <LayoutDashboardIcon />,
        },
      ],
    },
    {
      label: "Management",
      links: [
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
      ],
    },
  ];

  const userSections = [
    {
      label: "Dashboard Overview",
      links: [
        { path: "/dashboard/user", label: "User Dashboard", icon: <User /> },
      ],
    },
    {
      label: "Orders",
      links: [
        {
          path: "/dashboard/my-orders",
          label: "My Orders",
          icon: <ShoppingBag />,
        },
      ],
    },
    {
      label: "Account",
      links: [
        {
          path: "/dashboard/settings/profile",
          label: "Profile Settings",
          icon: <User2Icon />,
        },
        {
          path: "/dashboard/settings/shipping-address",
          label: "Shipping Address",
          icon: <User2Icon />,
        },
      ],
    },
  ];

  const sections =
    user?.user_role === "admin"
      ? [...adminSections, ...commonSections]
      : [...userSections, ...commonSections];

  return (
    <div>
      {/* Mobile Toggle */}
      <div className="md:hidden flex justify-between items-center p-4 bg-violet-700 text-white">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:block h-screen w-64 bg-gray-900 text-white fixed md:relative z-20 transition-all duration-300 shadow-lg`}
      >
        <div className="overflow-y-auto h-full px-4 py-6">
          {/* User Info */}
          <div className="flex items-center gap-3 mb-6 px-2">
            <img
              src={user?.profileImageUrl || "https://via.placeholder.com/40"}
              alt="User"
              className="w-12 h-12 rounded-full border-2 border-violet-500"
            />
            <div>
              <p className="text-sm text-gray-400">Welcome,</p>
              <p className="text-white font-medium">{user?.name || "User"}</p>
            </div>
          </div>

          {/* Navigation Sections */}
          {sections.map((section) => (
            <div key={section.label} className="mb-6">
              {/* Section Title */}
              <div
                className="flex items-center justify-between px-3 py-2 rounded-md cursor-pointer text-gray-400 hover:text-white hover:bg-gray-800 transition"
                onClick={() => toggleSection(section.label)}
              >
                <span className="text-xs font-semibold uppercase">
                  {section.label}
                </span>
                {openSections[section.label] ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </div>

              {/* Section Links */}
              {openSections[section.label] && (
                <div className="pl-4 mt-2 space-y-1">
                  {section.links.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition ${
                        isActive(link.path)
                          ? "bg-violet-500 text-white shadow-md"
                          : "text-gray-400 hover:bg-gray-800 hover:text-white"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
