import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { getUserInformation, login } from "@/store/slices/authenticationSlice";
import { FaSpinner } from "react-icons/fa";

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
      navigate("/");

      // ✅ Unwrap and log user info
      const userInformation = await dispatch(getUserInformation());
      console.log("User Information:", userInformation);
    } catch (err) {
      const errorMessage =
        typeof err === "string" ? err : err?.message || "Cannot login!";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const userInformation = dispatch(getUserInformation());
      navigate("/"); // ✅ Redirect to home page when authenticated
      console.log("User information : ", userInformation);
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
            className={`w-full bg-blue-500 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition-all cursor-pointer flex items-center justify-center ${
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
        <div className="mt-6 flex flex-col items-center text-sm text-gray-600 space-y-2">
          <button
            onClick={() => navigate("/forgot-password")}
            className="hover:text-blue-500 transition-all"
          >
            Forgot Password?
          </button>
          <span className="text-gray-400">or</span>
          <button
            onClick={() => navigate("/register")}
            className="hover:text-blue-500 transition-all"
          >
            Create an Account
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
