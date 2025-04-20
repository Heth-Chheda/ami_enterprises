import {
  productData,
  salesData,
  sessionData,
  stats,
  eventData,
  userData,
} from "@/data/data";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28AFE"];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.authentication);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
          Export
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-red-500 text-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Visits Today</h2>
          <p className="text-2xl font-bold">{stats.visitsToday}</p>
        </div>
        <div className="bg-purple-500 text-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">New Users</h2>
          <p className="text-2xl font-bold">{stats.newUsers}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">New Orders</h2>
          <p className="text-2xl font-bold">{stats.newOrders}</p>
        </div>
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Total Sales</h2>
          <p className="text-2xl font-bold">${stats.totalSales}</p>
        </div>
      </div>

      {/* Statistics and Revenue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Statistics */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">Statistics</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={eventData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#FF8042" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">Revenue</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={salesData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="online" stroke="#0088FE" />
              <Line type="monotone" dataKey="offline" stroke="#FF8042" />
              <Line type="monotone" dataKey="marketing" stroke="#00C49F" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Product Stock and Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Product Stock */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">Product Stock</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={sessionData}
                dataKey="value"
                nameKey="channel"
                cx="50%"
                cy="50%"
                outerRadius={60}
                label
              >
                {sessionData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Today's Performance */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">Today's Performance</h2>
          <p className="text-2xl font-bold text-green-500">+52%</p>
          <p className="text-gray-500">Compared to last month</p>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4 text-violet-700">
          Product Overview
        </h2>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-violet-700 text-white">
              <th className="py-3 px-4 text-left">Product</th>
              <th className="py-3 px-4 text-right">Sold</th>
              <th className="py-3 px-4 text-right">Returned</th>
              <th className="py-3 px-4 text-right">Stock</th>
            </tr>
          </thead>
          <tbody>
            {productData.map((product, index) => (
              <tr
                key={product.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                } hover:bg-gray-200 transition`}
              >
                <td className="py-3 px-4 border-b">{product.name}</td>
                <td className="py-3 px-4 border-b text-right">
                  {product.sold}
                </td>
                <td className="py-3 px-4 border-b text-right">
                  {product.returned}
                </td>
                <td className="py-3 px-4 border-b text-right">
                  {product.stock}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
