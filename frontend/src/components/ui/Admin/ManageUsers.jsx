import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const initialUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2025-03-12",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "Inactive",
    lastLogin: "2025-03-05",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "User",
    status: "Active",
    lastLogin: "2025-03-10",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily@example.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2025-03-15",
  },
  {
    id: 5,
    name: "Chris Brown",
    email: "chris@example.com",
    role: "User",
    status: "Inactive",
    lastLogin: "2025-03-02",
  },
];

const ManageUsers = () => {
  const [users, setUsers] = useState(initialUsers);
  const [filters, setFilters] = useState({
    name: "",
    role: "",
    status: "",
  });

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
    setUsers((prev) => prev.filter((user) => user.id !== id));
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

      {/* User List */}
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-violet-500 text-white">
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Last Login</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-violet-50 transition duration-200 border-b"
              >
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.role}</td>
                <td className="p-4">{user.status}</td>
                <td className="p-4">{user.lastLogin}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => console.log(`Edit ${user.id}`)}
                      className="bg-violet-500 text-white px-4 py-2 rounded-lg hover:bg-violet-600 transition duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
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

      {/* No users found message */}
      {filteredUsers.length === 0 && (
        <div className="text-center text-gray-500 mt-6">No users found.</div>
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
