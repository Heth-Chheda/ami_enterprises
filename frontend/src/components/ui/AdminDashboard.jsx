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
      <div className="flex flex-col sm:flex-row justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">Admin Dashboard</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
          Export
        </button>
      </div>

      {/* Dashboard Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sessions by Channel */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">Sessions By Channel</h2>
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

        {/* Events */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">Events</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={eventData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#FF8042" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* User Sessions */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sessions by Channel */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">Sessions By Channel</h2>
          {userData.map((user) => (
            <div
              key={user.id}
              className="flex justify-between mb-2 text-sm sm:text-base"
            >
              <span>{user.name}</span>
              <span>{user.orders} Orders</span>
              <span>${user.totalSpent}</span>
            </div>
          ))}
        </div>

        {/* Sales Analytics */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">Sales Analytics</h2>
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

      {/* Earnings */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">Earnings</h2>
          <p>Total Earning: ${stats.totalEarnings}</p>
          <p>Last Month Earning: ${stats.lastMonthEarnings}</p>
        </div>
      </div>

      {/* Product Overview */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">Product Overview</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={productData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sold" fill="#00C49F" name="Sold" />
              <Bar dataKey="returned" fill="#FF8042" name="Returned" />
              <Bar dataKey="stock" fill="#0088FE" name="Stock" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Product Table */}
        <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto">
          <h2 className="text-xl font-bold mb-4 text-violet-700">
            Product Details
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
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
                    } hover:bg-gray-200 transition duration-200`}
                  >
                    <td className="py-3 px-4 border-b text-gray-700 whitespace-nowrap">
                      {product.name}
                    </td>
                    <td className="py-3 px-4 border-b text-gray-700 text-right">
                      {product.sold}
                    </td>
                    <td className="py-3 px-4 border-b text-gray-700 text-right">
                      {product.returned}
                    </td>
                    <td className="py-3 px-4 border-b text-gray-700 text-right">
                      {product.stock}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
