import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { forgotPassword } from "@/store/slices/authenticationSlice";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.authentication);

  //Navigate handler
  const navigate = useNavigate();

  // Handle email change
  const handleChange = (e) => setEmail(e.target.value);

  // Handle forgot password submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter a valid email");
      return;
    }

    try {
      await dispatch(forgotPassword(email));
      toast.success("Password reset link sent! Please check your email.");
      navigate("/");
      setEmail(""); // Clear the input after successful submission
    } catch (err) {
      const errorMessage =
        typeof err === "string" ? err : err?.message || "Failed to send email!";
      toast.error(errorMessage);
    }
  };

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
          Forgot Password?
        </h2>
        <p className="text-center text-gray-500 mb-4">
          Enter your email and we'll send you a link to reset your password.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
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
              value={email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Enter your email"
            />
          </div>

          {/* Submit Button */}
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
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </motion.button>
        </form>

        {/* Back to Login */}
        <div className="mt-6 text-center">
          <button
            onClick={() => window.history.back()}
            className="text-violet-500 hover:underline transition-all font-medium"
          >
            Back to Login
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

export default ForgotPassword;
