import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OrderCard from "./OrderCard";
import { fetchUserOrders } from "@/store/slices/ordersSlice";
import { toast } from "react-toastify";

const MyOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector(
    (state) => state.authentication
  );
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserOrders());
    } else {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [dispatch, isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleOrderClick = (order) => {
    navigate(`/dashboard/order/${order._id}`, {
      state: { order }, // ✅ Pass the whole order object here
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-violet-700 mb-6">My Orders 📦</h2>

      {loading ? (
        <div className="text-center text-gray-500">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-400 text-lg">You have no orders yet 😔</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {orders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              onClick={() => handleOrderClick(order)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
