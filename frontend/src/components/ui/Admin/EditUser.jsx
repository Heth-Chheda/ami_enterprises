import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getUserByUsernameOrEmail,
  updateUserByEmail,
} from "@/store/slices/authenticationSlice.js";

const EditUser = () => {
  const { email } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error } = useSelector((state) => state.authentication);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    dateOfBirth: "",
    gender: "",
    profileImageUrl: "",
    user_role: "",
    accountVerified: false,
    status: "",
  });

  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (email) {
      dispatch(getUserByUsernameOrEmail(email));
    }
  }, [dispatch, email]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file" && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profileImageUrl: reader.result,
        }));
        setIsChanged(true);
      };

      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
      setIsChanged(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isChanged) {
      try {
        await dispatch(
          updateUserByEmail({
            email,
            data: formData,
          })
        );
        navigate("/dashboard/manage-users");
      } catch (error) {
        console.error("Failed to update user:", error);
      }
    }
  };

  const triggerFileInput = () => {
    document.getElementById("profileInput").click();
  };

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        mobileNumber: user.mobileNumber || "",
        dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split("T")[0] : "",
        gender: user.gender || "",
        profileImageUrl: user.profileImageUrl || "",
        user_role: user.user_role || "",
        accountVerified: user.accountVerified || false,
        status: user.status || "",
      });
    }
  }, [user]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit User</h1>

      {loading && <p className="text-blue-500">Loading user data...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-lg"
        >
          {/* Profile Image (At Top) */}
          <div className="md:col-span-2 flex flex-col items-center">
            {formData.profileImageUrl && (
              <img
                src={formData.profileImageUrl}
                alt="Profile Preview"
                className="w-32 h-32 rounded-full object-cover border cursor-pointer"
                onClick={triggerFileInput}
              />
            )}
            <input
              id="profileInput"
              type="file"
              accept="image/*"
              name="profileImage"
              onChange={handleChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={triggerFileInput}
              className="text-violet-500 mt-2"
            >
              Change Profile Picture
            </button>
          </div>

          {/* Name */}
          <div>
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
          </div>

          {/* Email (Disabled) */}
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              disabled
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-gray-700 mb-2">Mobile Number</label>
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-gray-700 mb-2">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-gray-700 mb-2">Role</label>
            <select
              name="user_role"
              value={formData.user_role}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-gray-700 mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            >
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Actions */}
          <div className="md:col-span-2 flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard/manage-users")}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isChanged}
              className={`px-4 py-2 rounded-lg ${
                isChanged ? "bg-violet-500" : "bg-gray-300"
              }`}
            >
              Save Changes
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditUser;
