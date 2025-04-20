import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUsers } from "@/store/slices/authenticationSlice.js";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { timeFormat } from "d3-time-format";

const ManageUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, error } = useSelector(
    (state) => state.authentication
  );

  const formatTime = timeFormat("%b %d, %I:%M %p");

  const [filters, setFilters] = useState({
    name: "",
    role: "",
    status: "",
  });

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleEdit = (email) => {
    navigate(`/dashboard/editUser/${email}`);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const filteredUsers = users.filter((user) => {
    return (
      (filters.name === "" ||
        user.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (filters.role === "" || user.role === filters.role) &&
      (filters.status === "" || user.status === filters.status)
    );
  });

  const totalUsers = users.length;
  const totalAdmins = users.filter((user) => user.user_role === "admin").length;
  const totalCustomers = users.filter(
    (user) => user.user_role === "customer"
  ).length;

  const userActivityData = users.map((user, index) => ({
    x: new Date(user.createdAt).getTime(),
    y: index + 1,
    profileImage: user.profileImageUrl || "/default-avatar.png",
    name: user.name,
    createdAt: formatTime(new Date(user.createdAt)),
  }));

  const renderCustomizedShape = (props) => {
    const { cx, cy, payload } = props;
    if (!payload || !payload.profileImage) return null;

    return (
      <svg x={cx - 16} y={cy - 16} width={32} height={32} viewBox="0 0 32 32">
        <image
          href={payload.profileImage}
          width="32"
          height="32"
          style={{ borderRadius: "50%" }}
        />
      </svg>
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div
          style={{
            backgroundColor: "#fff",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <p>{data.name}</p>
          <p>{data.createdAt}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-2xl shadow-md p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            Total Users
          </h3>
          <p className="text-3xl font-bold text-violet-600">{totalUsers}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Admins</h3>
          <p className="text-3xl font-bold text-blue-500">{totalAdmins}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            Customers
          </h3>
          <p className="text-3xl font-bold text-green-500">{totalCustomers}</p>
        </div>
      </div>

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

      {/* User Table */}
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
                  <td className="p-4">
                    <img
                      src={user.profileImageUrl || "/default-avatar.png"}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </td>
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
                          handleEdit(user.email);
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

      {/* No Users Found */}
      {!loading && !error && filteredUsers.length === 0 && (
        <p className="text-gray-500 mt-6 text-center">No users found.</p>
      )}

      {/* Chart */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">User Creation Timeline</h2>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
            <CartesianGrid />
            <XAxis
              type="number"
              dataKey="x"
              domain={["dataMin", "dataMax"]}
              tickFormatter={(time) => formatTime(new Date(time))}
            />
            <YAxis type="number" dataKey="y" name="User" />
            <Tooltip content={<CustomTooltip />} />
            <Scatter
              name="Users"
              data={userActivityData}
              shape={renderCustomizedShape}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ManageUsers;
