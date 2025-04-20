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

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shippingThreshold = 20; // Free shipping at ₹20
  const shippingCost = subtotal >= shippingThreshold ? 0 : 4;
  const shippingDiscount = subtotal >= shippingThreshold ? -2 : 0;
  const balance = subtotal + shippingCost + shippingDiscount;

  const progress = Math.min((subtotal / shippingThreshold) * 100, 100);

  if (!isAuthenticated) return null;

  return (
    <div className="max-w-6xl mx-auto p-8 min-h-screen">
      {/* Cart Header */}
      <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Your Cart</h2>

      {subtotal < shippingThreshold && (
        <div className="border border-gray-300 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-600">
            You're ₹{(shippingThreshold - subtotal).toFixed(2)} away from{" "}
            <span className="font-medium">FREE SHIPPING!</span>
          </p>
          <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
            <div
              className="bg-red-500 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Cart Items */}
      {cartItems.length === 0 ? (
        <p className="text-gray-400 text-lg animate-pulse">
          Your cart is empty!
        </p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between bg-white border border-gray-200 rounded-xl shadow-md p-5 hover:shadow-lg transition duration-300"
            >
              {/* Product Image & Info */}
              <div className="flex items-center space-x-4">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg border"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    ₹{item.price ? item.price.toFixed(2) : "0.00"}
                  </p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleDecrement(item)}
                  className="p-2 border rounded-full hover:bg-gray-100 transition"
                >
                  <FaMinus className="text-gray-500" />
                </button>
                <span className="text-lg font-semibold">{item.quantity}</span>
                <button
                  onClick={() => handleIncrement(item)}
                  className="p-2 border rounded-full hover:bg-gray-100 transition"
                >
                  <FaPlus className="text-gray-500" />
                </button>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="p-2 hover:text-red-500 transition"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cart Summary */}
      {cartItems.length > 0 && (
        <div className="mt-10 bg-gray-50 p-6 rounded-lg shadow-md border">
          <h3 className="text-xl font-semibold mb-4">Summary</h3>
          <div className="space-y-2 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal ({cartItems.length} Items)</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Discount</span>
              <span className={shippingDiscount < 0 ? "text-green-600" : ""}>
                ₹{shippingDiscount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Shipping & Handling</span>
              <span>₹{shippingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (Calculated at checkout)</span>
              <span>₹0.00</span>
            </div>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between font-semibold text-gray-900">
            <span>Balance</span>
            <span>₹{balance.toFixed(2)}</span>
          </div>

          {/* Checkout Button */}
          <button
            className="mt-6 w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition font-semibold"
            onClick={() => navigate("/checkout")}
          >
            Checkout
          </button>

          {/* Clear Cart Button */}
          <button
            onClick={handleClearCart}
            className="mt-4 w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition font-semibold"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
