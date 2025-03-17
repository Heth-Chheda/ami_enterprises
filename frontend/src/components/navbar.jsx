import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Menu, X, ShoppingCart } from "lucide-react";
import { getUserInformation, logout } from "@/store/slices/authenticationSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  {
    /* Cart Items Variables */
  }
  const { cartItems } = useSelector((state) => state.cart);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const dispatch = useDispatch();

  // ✅ Get isAuthenticated and user from Redux state
  const { user, isAuthenticated } = useSelector(
    (state) => state.authentication
  );

  const profileImage = user?.profileImageUrl; // Fallback profile image
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

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      setIsMenuOpen(false);
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUserInformation());
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthenticated) {
      setIsProfileOpen(false);
    }
  }, [isAuthenticated]);

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
                className="text-gray-300 hover:text-violet-400 transition duration-300 font-medium"
              >
                {label}
              </Link>
            ))}

            {/* Cart Icon */}
            <Link to="/cart" className="relative">
              <ShoppingCart
                className="text-gray-300 hover:text-violet-400 transition duration-300"
                size={24}
              />
              {cartCount >= 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
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
                  {/* ✅ Display User Name */}
                  {user?.name && (
                    <div className="px-4 py-2 text-gray-400 font-semibold border-b border-gray-700">
                      {user.name}
                    </div>
                  )}
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-gray-300 hover:bg-gray-700"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-gray-300 hover:bg-gray-700"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700"
                    disabled={isLoggingOut}
                  >
                    {isLoggingOut ? (
                      <div className="flex items-center gap-2">
                        <FaSpinner className="animate-spin" /> Logging out...
                      </div>
                    ) : (
                      "Logout"
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-violet-600 text-white px-4 py-1.5 rounded-lg shadow-md hover:bg-violet-500 transition duration-300 text-sm"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Icons */}
          <div className="md:hidden flex items-center gap-4">
            {/* Cart Icon */}
            <Link to="/cart" className="relative">
              <ShoppingCart
                className="text-gray-300 hover:text-violet-400 transition duration-300"
                size={24}
              />
              {cartCount >= 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-violet-400 transition duration-300 cursor-pointer"
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-gray-800 shadow-md transition-all duration-300">
            {["Home", "Products", "About", "Contact"].map((label) => (
              <Link
                key={label}
                to={`/${label.toLowerCase()}`}
                className="block text-gray-300 hover:text-violet-400 py-3 px-6 border-b border-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            ))}

            {/* Profile for Mobile */}
            {isAuthenticated ? (
              <div className="flex flex-col gap-2 p-4 border-t border-gray-700">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
                {/* ✅ Display User Name */}
                {user?.name && (
                  <div className="px-4 py-2 text-gray-400 font-semibold border-b border-gray-700">
                    {user.name}
                  </div>
                )}
                <Link
                  to="/dashboard"
                  className="text-gray-300 hover:text-violet-400 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/orders"
                  className="text-gray-300 hover:text-violet-400 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-violet-400 py-2 text-left"
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? (
                    <div className="flex items-center gap-2">
                      <FaSpinner className="animate-spin" /> Logging out...
                    </div>
                  ) : (
                    "Logout"
                  )}
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="block text-center bg-blue-600 text-white py-3 rounded-md hover:bg-blue-500 transition duration-300 m-4"
                onClick={() => setIsMenuOpen(false)}
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
