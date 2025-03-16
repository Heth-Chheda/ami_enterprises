import { otpVerification } from "@/store/slices/authenticationSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const OTP = () => {
  const { email } = useParams();
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.authentication
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      alert("OTP must be 6 digits!");
      return;
    }

    await dispatch(otpVerification(email, otp));

    if (isAuthenticated) {
      alert("OTP Verified Successfully!");
      toast.success("Otp verified successfully.");
      navigate("/login"); // Redirect to dashboard or homepage
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      toast.success("OTP verified successfully!");
      navigate("/login"); // Redirect to login page or dashboard
    }
  }, [isAuthenticated, navigate]);
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Verify OTP</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400 outline-none"
            placeholder="Enter OTP"
            required
          />
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTP;
