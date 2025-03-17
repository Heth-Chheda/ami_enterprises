import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Calendar,
  UserCheck,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";

const UserDashboard = () => {
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector(
    (state) => state.authentication
  );

  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    dateOfBirth: "",
    gender: "",
    user_role: "",
    status: "",
    profileImageUrl: "",
    accountVerified: false,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/"); // Redirect to Home if not authenticated
    } else if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        mobileNumber: user.mobileNumber || "",
        dateOfBirth: user.dateOfBirth?.split("T")[0] || "",
        gender: user.gender || "",
        user_role: user.user_role || "",
        status: user.status || "",
        profileImageUrl: user.profileImageUrl || "",
        accountVerified: user.accountVerified || false,
      });
    }
  }, [isAuthenticated, user, navigate]);

  const handleEdit = () => setEditable(!editable);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the save logic
    setEditable(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-3xl font-bold text-violet-700 mb-6">
        User Dashboard
      </h2>

      <div className="flex items-center gap-4 mb-6">
        {/* ✅ Render image only if profileImageUrl is not empty */}
        {formData.profileImageUrl ? (
          <img
            src={formData.profileImageUrl}
            alt="Profile"
            className="w-20 h-20 rounded-full border-5 border-violet-500 object-contain"
          />
        ) : (
          <div className="w-20 h-20 rounded-full border-4 border-violet-500 bg-gray-200 flex items-center justify-center">
            <User className="text-gray-400" size={32} />
          </div>
        )}
        <div>
          <h3 className="text-2xl font-semibold">{formData.name || "N/A"}</h3>
          <p className="text-gray-500">{formData.user_role || "User"}</p>
        </div>
      </div>

      {/* Information Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Name */}
        <div className="bg-violet-100 p-4 rounded-lg flex items-center gap-4">
          <User className="text-violet-700" />
          <div>
            <p className="text-gray-600">Name</p>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!editable}
              className="w-full bg-transparent border-none focus:outline-none"
            />
          </div>
        </div>

        {/* Email */}
        <div className="bg-violet-100 p-4 rounded-lg flex items-center gap-4">
          <Mail className="text-violet-700" />
          <div className="flex-1 min-w-0">
            <p className="text-gray-600">Email</p>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!editable}
              className="w-full bg-transparent border-none focus:outline-none truncate"
            />
          </div>
        </div>

        {/* Phone */}
        <div className="bg-violet-100 p-4 rounded-lg flex items-center gap-4">
          <Phone className="text-violet-700" />
          <div>
            <p className="text-gray-600">Phone</p>
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              disabled={!editable}
              className="w-full bg-transparent border-none focus:outline-none"
            />
          </div>
        </div>

        {/* Date of Birth */}
        <div className="bg-violet-100 p-4 rounded-lg flex items-center gap-4">
          <Calendar className="text-violet-700" />
          <div>
            <p className="text-gray-600">Date of Birth</p>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              disabled={!editable}
              className="w-full bg-transparent border-none focus:outline-none"
            />
          </div>
        </div>

        {/* Gender */}
        <div className="bg-violet-100 p-4 rounded-lg flex items-center gap-4">
          <UserCheck className="text-violet-700" />
          <div>
            <p className="text-gray-600">Gender</p>
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              disabled={!editable}
              className="w-full bg-transparent border-none focus:outline-none"
            />
          </div>
        </div>

        {/* Role */}
        <div className="bg-violet-100 p-4 rounded-lg flex items-center gap-4">
          <ShieldCheck className="text-violet-700" />
          <div>
            <p className="text-gray-600">Role</p>
            <input
              type="text"
              name="user_role"
              value={formData.user_role}
              onChange={handleChange}
              disabled={!editable}
              className="w-full bg-transparent border-none focus:outline-none"
            />
          </div>
        </div>

        {/* Account Status */}
        <div className="bg-violet-100 p-4 rounded-lg flex items-center gap-4">
          <BadgeCheck className="text-violet-700" />
          <div>
            <p className="text-gray-600">Account Status</p>
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleChange}
              disabled={!editable}
              className="w-full bg-transparent border-none focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end mt-6 gap-4">
        {editable ? (
          <>
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-violet-600 text-white px-4 py-2 rounded-md hover:bg-violet-700 transition"
            >
              Save Changes
            </button>
            <button
              onClick={() => setEditable(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Edit Information
          </button>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
