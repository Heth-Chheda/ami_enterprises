import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const initialOrders = [
  {
    id: "ORD123",
    customer: "John Doe",
    date: "2025-03-15",
    status: "Pending",
    total: "$120.00",
  },
  {
    id: "ORD124",
    customer: "Jane Smith",
    date: "2025-03-14",
    status: "Completed",
    total: "$80.00",
  },
  {
    id: "ORD125",
    customer: "Michael Johnson",
    date: "2025-03-13",
    status: "Cancelled",
    total: "$45.00",
  },
  {
    id: "ORD126",
    customer: "Alice Brown",
    date: "2025-03-12",
    status: "Pending",
    total: "$90.00",
  },
];

const statusColors = {
  Pending: "bg-yellow-500",
  Completed: "bg-green-500",
  Cancelled: "bg-red-500",
};

const chartColors = {
  Pending: "#fbbf24", // yellow
  Completed: "#22c55e", // green
  Cancelled: "#ef4444", // red
};

const ManageOrders = () => {
  const [orders, setOrders] = useState(initialOrders);

  const handleDelete = (id) => {
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);
  };

  // Grouping order data for the pie chart
  const orderStatusData = [
    {
      name: "Pending",
      value: orders.filter((order) => order.status === "Pending").length,
    },
    {
      name: "Completed",
      value: orders.filter((order) => order.status === "Completed").length,
    },
    {
      name: "Cancelled",
      value: orders.filter((order) => order.status === "Cancelled").length,
    },
  ];

  return (
    <div className="p-6">
      {/* Title */}
      <h1 className="text-3xl font-extrabold text-violet-700 mb-4">
        Manage Orders
      </h1>

      {/* Order Table */}
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-violet-700 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Order ID</th>
              <th className="py-3 px-4 text-left">Customer</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Total</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b hover:bg-gray-100 transition duration-200"
              >
                <td className="py-3 px-4 text-gray-700">{order.id}</td>
                <td className="py-3 px-4 text-gray-700">{order.customer}</td>
                <td className="py-3 px-4 text-gray-700">{order.date}</td>
                <td className="py-3 px-4">
                  <span
                    className={`text-white px-3 py-1 rounded-full text-sm ${
                      statusColors[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-700">{order.total}</td>
                <td className="py-3 px-4 flex justify-center gap-2">
                  <button
                    onClick={() => console.log(`Edit ${order.id}`)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-bold text-violet-700 mb-4">
            Order Status Overview
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={orderStatusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {orderStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={chartColors[entry.name]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Summary Section */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-bold text-violet-700 mb-4">Summary</h2>
          <div className="space-y-2">
            {orderStatusData.map((status) => (
              <div
                key={status.name}
                className="flex justify-between items-center"
              >
                <span className="text-gray-700 font-medium">{status.name}</span>
                <span className="text-gray-900 font-semibold">
                  {status.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;
