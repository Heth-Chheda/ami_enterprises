import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderCard from "./OrderCard";

const MyOrders = () => {
  const navigate = useNavigate();

  // ✅ Sample orders data (One order can have multiple products)
  const [orders, setOrders] = useState([
    {
      id: "101",
      items: [
        {
          id: "1",
          name: "Luxury Fountain Pen",
          price: "₹799",
          image: "https://source.unsplash.com/400x300/?fountain-pen",
        },
        {
          id: "2",
          name: "Hardcover Notebook (A5)",
          price: "₹349",
          image: "https://source.unsplash.com/400x300/?notebook",
        },
      ],
      total: "₹1148",
      status: "Delivered",
      paymentMethod: "Credit Card",
      deliveryAddress: "123 Main Street, Mumbai, India",
      deliveryDate: "2025-03-10",
    },
    {
      id: "102",
      items: [
        {
          id: "3",
          name: "Gel Pen Set (10 Colors)",
          price: "₹199",
          image: "https://source.unsplash.com/400x300/?gel-pen",
        },
        {
          id: "4",
          name: "Desk Organizer",
          price: "₹699",
          image: "https://source.unsplash.com/400x300/?organizer",
        },
      ],
      total: "₹898",
      status: "Shipped",
      paymentMethod: "UPI",
      deliveryAddress: "456 Street, Delhi, India",
      deliveryDate: "2025-03-15",
    },
  ]);

  // ✅ Navigate to Order Detail page
  const handleOrderClick = (id) => {
    navigate(`/dashboard/order/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-violet-700 mb-6">My Orders 📦</h2>

      {/* ✅ Show message if no orders */}
      {orders.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-400 text-lg">You have no orders yet 😔</p>
        </div>
      ) : (
        // ✅ Responsive Grid Layout
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onClick={() => handleOrderClick(order.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
