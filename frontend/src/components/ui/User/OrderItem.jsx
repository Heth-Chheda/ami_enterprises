import React from "react";

const OrderItem = ({ item }) => (
  <div className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-4 border border-gray-200">
    {/* ✅ Larger Image with rounded corners */}
    <img
      src={item.image}
      alt={item.name}
      className="w-20 h-20 object-cover rounded-xl"
    />

    <div className="ml-4 flex-1">
      {/* ✅ Stylish Title */}
      <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
      {/* ✅ Price with subtle color */}
      <p className="text-violet-600 font-medium mt-1">{item.price}</p>
    </div>

    {/* ✅ Action Button (Optional) */}
    <button className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors">
      Buy Again
    </button>
  </div>
);

export default OrderItem;
