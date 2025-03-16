import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registration } from "@/store/slices/authenticationSlice";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobileNumber: "",
    dateOfBirth: "",
    gender: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  // Toggle password visibility
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  // Check password strength
  const checkPasswordStrength = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasDigit = /\d/.test(password);

    if (
      password.length >= 8 &&
      password.length <= 16 &&
      hasUpperCase &&
      hasSpecialChar &&
      hasDigit
    ) {
      setPasswordStrength("strong");
    } else if (
      password.length >= 6 &&
      (hasUpperCase || hasSpecialChar || hasDigit)
    ) {
      setPasswordStrength("medium");
    } else {
      setPasswordStrength("weak");
    }
  };

  // Validate password criteria
  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8 || password.length > 16)
      errors.push("• Password must be 8 to 16 characters long.");
    if (!/[A-Z]/.test(password))
      errors.push("• Must contain at least one uppercase letter.");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      errors.push("• Must contain at least one special character.");
    if (!/\d/.test(password)) errors.push("• Must contain at least one digit.");

    if (errors.length > 0) {
      setToastMessage(errors.join("\n"));
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(formData.password)) {
      return;
    }
    console.log("Registering:", formData);

    try {
      await dispatch(registration(formData));
      setToastMessage("Registration Successful.");
      navigate(`/otp-verification/${formData.email}`);
    } catch (error) {
      setToastMessage(error.message || "Failed to Register.");
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Form Container */}
      <motion.div
        className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden p-8 my-2"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Create an Account
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:violet-blue-400 focus:outline-none transition"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-400 focus:outline-none transition"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-400 focus:outline-none transition"
                placeholder="Create a password"
                required
              />
              <div
                onClick={togglePassword}
                className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-400"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="mt-2 text-sm">
                <span
                  className={`font-medium ${
                    passwordStrength === "weak"
                      ? "text-red-500"
                      : passwordStrength === "medium"
                      ? "text-orange-500"
                      : "text-green-500"
                  }`}
                >
                  {passwordStrength.charAt(0).toUpperCase() +
                    passwordStrength.slice(1)}
                </span>
              </div>
            )}
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Mobile Number
            </label>
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-400 focus:outline-none transition"
              placeholder="Enter your mobile number"
              required
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-400 focus:outline-none transition"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-400 focus:outline-none transition"
              required
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Other</option>
            </select>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            className="w-full bg-violet-500 text-white font-medium py-3 rounded-lg shadow-md hover:bg-violet-700 transition"
          >
            Register
          </motion.button>
        </form>
        <div className="mt-6 flex flex-col items-center text-sm text-gray-600 space-y-2">
          <button
            onClick={() => navigate("/Login")}
            className="hover:text-violet-500 transition-all"
          >
            Already Have an account Login?
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Register;
