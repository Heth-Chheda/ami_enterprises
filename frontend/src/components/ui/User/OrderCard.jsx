import React from "react";

const OrderCard = ({ order, onClick }) => {
  return (
    <div
      className="border rounded-lg p-6 shadow-sm cursor-pointer 
        hover:shadow-md transition-transform transform hover:-translate-y-1 
        bg-white hover:border-violet-400"
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        {/* ✅ Left Side: Order Details */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Order #{order.id}
          </h3>
          <p className="text-gray-500 text-sm mt-1">
            Total:{" "}
            <span className="font-medium text-gray-700">{order.total}</span>
          </p>
          <p className="text-gray-400 text-sm">Items: {order.items.length}</p>
        </div>

        {/* ✅ Right Side: Status and Arrow */}
        <div className="flex items-center space-x-2">
          {/* ✅ Status Badge */}
          <span
            className={`px-3 py-1 text-sm font-medium rounded-full 
              ${
                order.status === "Delivered"
                  ? "bg-green-100 text-green-700"
                  : order.status === "Shipped"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-blue-100 text-blue-700"
              }`}
          >
            {order.status}
          </span>

          {/* ✅ Forward Arrow */}
          <span className="text-gray-400">➔</span>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
