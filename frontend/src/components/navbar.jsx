import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useSidebar } from "@/context/sidebarContext";

const Navbar = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profileImage = "https://i.pravatar.cc/40"; // Sample image
  const profileRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <nav className="bg-gray-900 shadow-md sticky top-0 z-[100]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-white text-2xl font-extrabold tracking-wide hover:text-blue-400 transition duration-300"
          >
            Ami Enterprises
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 items-center">
            {["Home", "Products", "About", "Contact"].map((label) => (
              <Link
                key={label}
                to={`/${label.toLowerCase()}`}
                className="text-gray-300 hover:text-blue-400 transition duration-300 font-medium"
              >
                {label}
              </Link>
            ))}

            {/* Cart Icon */}
            <Link to="/cart" className="relative">
              <ShoppingCart
                className="text-gray-300 hover:text-blue-400 transition duration-300"
                size={24}
              />
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                3
              </span>
            </Link>

            {/* Profile */}
            {isAuthenticated ? (
              <div className="relative" ref={profileRef}>
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={() => setIsProfileOpen((prev) => !prev)}
                />
                {/* Profile Dropdown */}
                <div
                  className={`absolute right-0 mt-2 w-40 bg-gray-800 rounded-lg shadow-lg z-50 transition-all duration-200 transform ${
                    isProfileOpen
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-300 hover:bg-gray-700"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-gray-300 hover:bg-gray-700"
                  >
                    Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-1.5 rounded-lg shadow-md hover:bg-blue-500 transition duration-300 text-sm"
              >
                Login
              </Link>
            )}
          </div>

          {/* Sidebar Toggle for Mobile */}
          <div className="md:hidden flex items-center gap-4">
            <Link to="/cart" className="relative">
              <ShoppingCart
                className="text-gray-300 hover:text-blue-400 transition duration-300"
                size={24}
              />
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                3
              </span>
            </Link>

            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-300 hover:text-blue-400 transition duration-300"
            >
              {isSidebarOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isSidebarOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-gray-800 shadow-md transition-all duration-300">
            {["Home", "Products", "About", "Contact"].map((label) => (
              <Link
                key={label}
                to={`/${label.toLowerCase()}`}
                className="block text-gray-300 hover:text-blue-400 py-2 px-6 border-b border-gray-700 gap-3"
                onClick={() => setIsSidebarOpen(false)}
              >
                {label}
              </Link>
            ))}

            {/* Profile for Mobile */}
            {isAuthenticated ? (
              <div className="px-6 py-2 flex items-center gap-2">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-8 h-8 rounded-full mr-5"
                />
                <div className="flex flex-row gap-9">
                  <Link to="/profile" className="text-gray-300">
                    Profile
                  </Link>
                  <Link to="/orders" className="text-gray-300">
                    Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-300 text-left"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="block text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition duration-300 mx-6 my-2"
                onClick={() => setIsSidebarOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
