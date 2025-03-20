import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { getUserInformation, login } from "@/store/slices/authenticationSlice";
import { FaSpinner } from "react-icons/fa";
import { setUser } from "@/store/slices/cartSlice";
import { loadWishlist } from "@/store/slices/wishlistSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, message, isAuthenticated } = useSelector(
    (state) => state.authentication
  );

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // ✅ Unwrap login response
      const result = await dispatch(login(form)).unwrap();

      toast.success(result?.message || "Login successful");

      localStorage.setItem("auth_token", result?.token);
      localStorage.setItem("user_id", result?.user_id);

      if (result?.user_id) {
        dispatch(setUser(result.user_id));

        // ✅ Load wishlist after setting user ID
        dispatch(loadWishlist(result.user_id));
      }

      navigate("/");

      // ✅ Unwrap and log user info
      await dispatch(getUserInformation());
    } catch (err) {
      const errorMessage =
        typeof err === "string" ? err : err?.message || "Cannot login!";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUserInformation());
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Welcome Back 👋
        </h2>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12 transition-all"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-4 flex items-center"
              >
                {showPassword ? (
                  <EyeOff size={22} className="text-gray-500" />
                ) : (
                  <Eye size={22} className="text-gray-500" />
                )}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <motion.button
            type="submit"
            className={`w-full bg-violet-500 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-violet-600 transition-all cursor-pointer flex items-center justify-center ${
              loading ? "opacity-75 cursor-not-allowed" : ""
            }`}
            whileHover={!loading ? { scale: 1.05 } : {}}
            whileTap={!loading ? { scale: 0.95 } : {}}
            disabled={loading}
          >
            {loading ? (
              <>
                <FaSpinner size={20} className="mr-2 animate-spin" />
                Logging in...
              </>
            ) : (
              "Log In"
            )}
          </motion.button>
        </form>

        {/* Links */}
        <div className="mt-6 flex items-center text-sm text-gray-600">
          <button
            onClick={() => navigate("/password/forgot")}
            className=" text-violet-500 hover:text-blue-600 transition-all font-medium"
          >
            Forgot Password?
          </button>
        </div>

        {/* Create account Link*/}
        <div
          className="mt-6 flex
         text-sm text-gray-600"
        >
          <button
            onClick={() => navigate("/register")}
            className="hover:text-violet-500 transition-all cursor-pointer text-violet-500 font-medium"
          >
            Create Account
          </button>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-gray-400 text-xs">
          © {new Date().getFullYear()} Ami Enterprises. All rights reserved.
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
