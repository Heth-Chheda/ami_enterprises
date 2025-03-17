import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // For redirecting the user
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import {
  addToCart,
  decrementQuantity,
  removeFromCart,
  setUser,
  clearCart,
} from "@/store/slices/cartSlice"; // Import setUser action
import { toast } from "react-toastify"; // Make sure to import the toast package

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook for navigation
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { isAuthenticated } = useSelector((state) => state.authentication);

  const handleIncrement = (item) => {
    // Add the item to the cart or increase quantity
    dispatch(addToCart(item));
  };

  const handleDecrement = (item) => {
    dispatch(decrementQuantity(item));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.info("Cart has been cleared!");
  };
  // Redirect to login if the user is not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      toast.warning("Please log in to view your cart.");
      navigate("/login"); // Redirect to the login page
    }
  }, [isAuthenticated, navigate]);

  // New useEffect to load the cart from localStorage if user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const userId = localStorage.getItem("user_id");
      if (userId) {
        const savedCart = localStorage.getItem(`cart_${userId}`);
        if (savedCart) {
          try {
            const cartItemsFromStorage = JSON.parse(savedCart);
            cartItemsFromStorage.forEach((item) => {
              // ✅ Check if the item already exists before adding
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

  if (!isAuthenticated) {
    return null; // You can return null or a loading state while the user is being redirected
  }

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-[100vh]">
      <h2 className="text-3xl font-extrabold text-violet-700 mb-6">
        Shopping Cart
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-400 text-lg">Your cart is empty!</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white/80 
                backdrop-blur-lg rounded-xl shadow-lg p-5 border 
                hover:shadow-xl transition-transform transform hover:-translate-y-1"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg border border-gray-200"
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
                  className="border border-gray-300 p-2 rounded-md hover:bg-gray-100 
                    transition-transform transform active:scale-90"
                >
                  <FaMinus className="text-gray-600" />
                </button>
                <span className="text-lg font-semibold text-gray-700">
                  {item.quantity}
                </span>
                <button
                  onClick={() => handleIncrement(item)}
                  className="border border-gray-300 p-2 rounded-md hover:bg-gray-100 
                    transition-transform transform active:scale-90"
                >
                  <FaPlus className="text-gray-600" />
                </button>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 hover:text-red-700 transition-transform 
                    transform active:scale-90"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Cart Summary */}
      {cartItems.length > 0 && (
        <div className="mt-8 p-6 bg-white/80 backdrop-blur-lg rounded-xl shadow-md border">
          <div className="flex justify-between items-center text-lg font-medium">
            <span className="text-gray-600">Total:</span>
            <span className="text-gray-800 font-bold">
              ₹
              {cartItems
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </span>
          </div>
          <button
            className="mt-6 w-full bg-violet-600 hover:bg-violet-700 text-white 
              font-semibold py-3 rounded-lg transition-all duration-200 
              shadow-md active:scale-95"
          >
            Proceed to Checkout
          </button>
          <button
            onClick={handleClearCart}
            className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white 
              font-semibold py-3 rounded-lg transition-all duration-200 
              shadow-md active:scale-95"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
