import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUsers } from "@/store/slices/authenticationSlice.js";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";

const ManageUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, error } = useSelector(
    (state) => state.authentication
  );

  const [filters, setFilters] = useState({
    name: "",
    role: "",
    status: "",
  });

  const handleEdit = (id) => {
    navigate(`/dashboard/editUser/${id}`);
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  // Filter users based on state
  const filteredUsers = users.filter((user) => {
    return (
      (filters.name === "" ||
        user.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (filters.role === "" || user.role === filters.role) &&
      (filters.status === "" || user.status === filters.status)
    );
  });

  // Handle input changes for filters
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Handle delete
  const handleDelete = (id) => {
    dispatch(deleteUser(id));
    // console.log("Delete users.");
  };

  // Generate chart data
  const userActivityData = [
    {
      name: "Active",
      count: users.filter((u) => u.status === "Active").length,
    },
    {
      name: "Inactive",
      count: users.filter((u) => u.status === "Inactive").length,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

      {/* Filter Section */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Search by name"
          value={filters.name}
          onChange={handleFilterChange}
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
        <select
          name="role"
          value={filters.role}
          onChange={handleFilterChange}
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Loading State */}
      {loading && <p className="text-blue-500">Loading users...</p>}

      {/* Error State */}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* User List */}
      {!loading && !error && filteredUsers.length > 0 && (
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-violet-500 text-white">
                <th className="p-4 text-left">#</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">User Created</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-50 border-b">
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4 capitalize">{user.user_role}</td>
                  <td className="p-4">{user.status}</td>
                  <td className="p-4">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          handleEdit(user._id);
                        }}
                        className="bg-violet-500 text-white px-4 py-2 rounded-lg hover:bg-violet-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* No Users State */}
      {!loading && !error && filteredUsers.length === 0 && (
        <p className="text-gray-500 mt-6 text-center">No users found.</p>
      )}

      {/* User Activity Chart */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">User Activity Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={userActivityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#7C3AED" barSize={60} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ManageUsers;
