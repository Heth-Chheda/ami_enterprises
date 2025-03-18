import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaMinus, FaTrash, FaShoppingCart } from "react-icons/fa";
import {
  addToCart,
  decrementQuantity,
  removeFromCart,
  clearCart,
} from "@/store/slices/cartSlice";
import { toast } from "react-toastify";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { isAuthenticated } = useSelector((state) => state.authentication);

  const handleIncrement = (item) => dispatch(addToCart(item));
  const handleDecrement = (item) => dispatch(decrementQuantity(item));
  const handleRemove = (id) => dispatch(removeFromCart(id));
  const handleClearCart = () => {
    dispatch(clearCart());
    toast.info("Cart has been cleared!");
  };

  useEffect(() => {
    if (!isAuthenticated) {
      toast.warning("Please log in to view your cart.");
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      const userId = localStorage.getItem("user_id");
      if (userId) {
        const savedCart = localStorage.getItem(`cart_${userId}`);
        if (savedCart) {
          try {
            const cartItemsFromStorage = JSON.parse(savedCart);
            cartItemsFromStorage.forEach((item) => {
              if (
                item.price &&
                item.quantity &&
                !cartItems.some((cartItem) => cartItem.id === item.id)
              ) {
                dispatch(addToCart(item));
              }
            });
          } catch (error) {
            console.error("Error loading cart from storage:", error);
          }
        }
      }
    }
  }, [isAuthenticated, dispatch, cartItems]);

  if (!isAuthenticated) return null;

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-[100vh]">
      <h2 className="text-4xl font-extrabold text-violet-700 mb-8 flex items-center gap-2">
        <FaShoppingCart className="text-violet-500" />
        Shopping Cart
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-400 text-lg animate-pulse">
          Your cart is empty!
        </p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-gradient-to-r from-white to-gray-100 
              backdrop-blur-lg rounded-xl shadow-md p-5 border hover:shadow-2xl transition-all 
              duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg border border-gray-300 transition-all 
                  duration-300 hover:scale-105"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    ₹{item.price ? item.price.toFixed(2) : "0.00"}
                  </p>
                </div>
              </div>

              {/* ✅ Quantity and Remove Buttons */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleDecrement(item)}
                  className="group border border-gray-300 p-2 rounded-full 
                  hover:bg-red-100 hover:border-red-300 transition-all duration-200"
                >
                  <FaMinus className="text-gray-600 group-hover:text-red-500 transition-all duration-200" />
                </button>
                <span className="text-lg font-semibold text-gray-700">
                  {item.quantity}
                </span>
                <button
                  onClick={() => handleIncrement(item)}
                  className="group border border-gray-300 p-2 rounded-full 
                  hover:bg-green-100 hover:border-green-300 transition-all duration-200"
                >
                  <FaPlus className="text-gray-600 group-hover:text-green-500 transition-all duration-200" />
                </button>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="group text-red-500 hover:text-red-700 transition-all duration-200"
                >
                  <FaTrash className="group-hover:scale-110 transition-all duration-200" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Cart Summary */}
      {cartItems.length > 0 && (
        <div
          className="mt-8 p-6 bg-gradient-to-r from-white to-gray-100 
          backdrop-blur-lg rounded-xl shadow-md border"
        >
          <div className="flex justify-between items-center text-lg font-medium">
            <span className="text-gray-600">Total:</span>
            <span className="text-gray-800 font-bold">
              ₹
              {cartItems
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </span>
          </div>

          {/* ✅ Proceed to Checkout Button */}
          <button
            className="mt-6 w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold 
              py-3 rounded-lg shadow-md active:scale-95 transition-transform duration-300 
              flex items-center justify-center gap-2 cursor-pointer"
          >
            <FaShoppingCart />
            Proceed to Checkout
          </button>

          {/* ✅ Clear Cart Button */}
          <button
            onClick={handleClearCart}
            className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-semibold 
              py-3 rounded-lg shadow-md active:scale-95 transition-transform duration-300 
              flex items-center justify-center gap-2 cursor-pointer"
          >
            <FaTrash />
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
