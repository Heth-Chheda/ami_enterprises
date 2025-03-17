import { useParams } from "react-router-dom";
import { useState } from "react";
import OrderItem from "./OrderItem";

const OrderDetail = () => {
  const { id } = useParams();

  // ✅ Sample order details
  const [order] = useState({
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
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-violet-700 mb-4">
        Order #{order.id}
      </h2>
      <p className="text-gray-500 mb-2">Delivery Date: {order.deliveryDate}</p>
      <p className="text-gray-500 mb-2">
        Payment Method: {order.paymentMethod}
      </p>
      <p className="text-gray-500 mb-6">Address: {order.deliveryAddress}</p>

      {/* ✅ List of Items */}
      {order.items.map((item) => (
        <OrderItem key={item.id} item={item} />
      ))}

      {/* ✅ Order Total */}
      <p className="text-xl font-bold mt-4">Total: {order.total}</p>
    </div>
  );
};

export default OrderDetail;
