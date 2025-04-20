import { useLocation } from "react-router-dom";
import OrderItem from "./OrderItem";
import { BadgeCheck, CreditCard, Truck } from "lucide-react";

const OrderDetail = () => {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return (
      <div className="p-6 text-center text-red-500 font-medium">
        Order not found. Please go back and try again.
      </div>
    );
  }

  const {
    _id,
    orderItems,
    totalAmount,
    orderStatus,
    paymentStatus,
    shippingAddress,
    createdAt,
  } = order;

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-md border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-violet-700">
          Order #{_id.slice(-6).toUpperCase()}
        </h2>
        <span
          className={`px-3 py-1 text-sm font-medium rounded-full 
            ${
              orderStatus === "Delivered"
                ? "bg-green-100 text-green-700"
                : orderStatus === "Shipped"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-blue-100 text-blue-700"
            }`}
        >
          {orderStatus}
        </span>
      </div>

      {/* Order Meta */}
      <div className="text-sm text-gray-700 space-y-2 mb-6">
        <p className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-violet-500" />
          <span className="font-semibold">Payment:</span>{" "}
          {paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}
        </p>
        <p className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-violet-500" />
          <span className="font-semibold">Order Date:</span>{" "}
          {new Date(createdAt).toLocaleDateString()}
        </p>
        <p className="flex items-start gap-2">
          <BadgeCheck className="w-4 h-4 mt-1 text-violet-500" />
          <span className="font-semibold">Shipping Address:</span>{" "}
          <span className="text-gray-800">
            {shippingAddress.ApartmentNumber}, {shippingAddress.Street},{" "}
            {shippingAddress.Area}, {shippingAddress.City},{" "}
            {shippingAddress.State} - {shippingAddress.PinCode}
          </span>
        </p>
      </div>

      {/* Items */}
      <div className="border-t border-b border-gray-200 py-4 space-y-4 mb-6">
        {orderItems.map((item, idx) => (
          <OrderItem
            key={idx}
            item={{
              id: item.product._id,
              name: item.product.name,
              price: item.price,
              image:
                item.product.images?.[0] || "https://via.placeholder.com/150",
              quantity: item.quantity,
            }}
          />
        ))}
      </div>

      {/* Total */}
      <div className="text-right mt-6">
        <div className="inline-block bg-violet-50 text-violet-700 font-semibold text-lg px-6 py-3 rounded-xl border border-violet-200 shadow-sm">
          Total Amount: ₹{totalAmount}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
