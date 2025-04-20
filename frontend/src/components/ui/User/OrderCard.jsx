import React from "react";
import { ArrowRight } from "lucide-react";

const OrderCard = ({ order, onClick }) => {
  return (
    <div
      className="relative border border-gray-200 rounded-2xl p-5 shadow-sm cursor-pointer 
      hover:shadow-lg transition-all duration-300 bg-white 
      hover:border-violet-500 hover:ring-2 hover:ring-violet-100"
      onClick={onClick}
    >
      {/* Decorative Top Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-pink-400 to-indigo-500 rounded-t-2xl" />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        {/* ✅ Left Side: Order Info */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-gray-900 tracking-tight">
            Order{" "}
            <span className="text-violet-600">#{order._id.slice(-6)}</span>
          </h3>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800">
              ₹{order.totalAmount}
            </span>{" "}
            • {order.orderItems?.length || 0} item
            {order.orderItems?.length > 1 ? "s" : ""}
          </p>
        </div>

        {/* ✅ Right Side: Status & Arrow */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Status Badge */}
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full border
              ${
                order.orderStatus === "Delivered"
                  ? "bg-green-100 text-green-700 border-green-300"
                  : order.orderStatus === "Shipped"
                  ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                  : "bg-blue-100 text-blue-700 border-blue-300"
              }`}
          >
            {order.orderStatus}
          </span>

          {/* Arrow Icon */}
          <ArrowRight className="text-gray-400 w-5 h-5 hidden sm:block" />
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
