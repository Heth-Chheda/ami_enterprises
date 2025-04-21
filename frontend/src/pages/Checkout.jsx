import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserProfile } from "@/store/slices/authenticationSlice";
import { toast } from "react-toastify";

// Environment variable to fetch the backend URL from the .env file
const BASE_API = import.meta.env.VITE_BACKEND_URL;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { user, isAuthenticated } = useSelector((state) => state.authentication);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    ApartmentNumber: "",
    Street: "",
    Area: "",
    City: "",
    State: "",
    PinCode: "",
  });
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [showAllAddresses, setShowAllAddresses] = useState(false);
  const [isChangingAddress, setIsChangingAddress] = useState(false); // State to toggle address change

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shippingCost = subtotal >= 20 ? 0 : 4;
  const discount = subtotal >= 20 ? -2 : 0;
  const total = subtotal + shippingCost + discount;

  // Function to calculate total amount
  const calculateTotalAmount = (orderItems) => {
    return orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Define the verifyPayment function
  const verifyPayment = async (paymentDetails) => {
    try {
      if (!isAuthenticated) {
        toast.error("Please log in to place an order");
        navigate("/login");
        return;
      }

      const response = await fetch('http://localhost:4000/api/payment/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentDetails),
        credentials: "include",  // Ensures cookies are sent along with the request
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();  // Proceed to parse only if the response is valid

      if (data.success) {
        console.log("✅ Payment verified successfully");

        // Build orderItems and shippingAddress
        const orderItems = cartItems.map(item => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price,
        }));

        const shippingAddress = {
          ApartmentNumber: selectedAddress.ApartmentNumber,
          Street: selectedAddress.Street,
          Area: selectedAddress.Area,
          City: selectedAddress.City,
          State: selectedAddress.State,
          PinCode: selectedAddress.PinCode,
        };

        const totalAmount = calculateTotalAmount(orderItems);  // Calling the function here
        console.log("Selected Address:", selectedAddress);

        // Create the order
        const orderResponse = await fetch('http://localhost:4000/api/v1/user/orders/createOrder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderItems,
            shippingAddress,
            totalAmount,
          }),
          credentials: 'include',
        });

        if (!orderResponse.ok) {
          const errorData = await orderResponse.json();
          throw new Error(errorData.message || "Failed to create order");
        }

        const orderData = await orderResponse.json();

        if (orderData.success) {
          console.log("✅ Order created successfully:", orderData.order);
          navigate("/dashboard/my-orders");
          toast.success("Order placed successfully!");
        }
      } else {
        console.error("Payment verification failed:", data.message);
      }
    } catch (error) {
      console.error("Error in payment verification:", error);
    }
  };

  // Razorpay payment handler (inside the checkout callback)
  const handler = (response) => {
    const paymentDetails = {
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_order_id: response.razorpay_order_id,
      razorpay_signature: response.razorpay_signature,
    };

    // Call verifyPayment after the payment is successful
    verifyPayment(paymentDetails);
  };

  const handlePlaceOrder = async () => {
    if (!isAuthenticated) {
      toast.error("Please log in to place an order");
      navigate("/login");
      return;
    }

    if (!selectedAddress) {
      toast.error("Please select a shipping address");
      return;
    }

    try {
      const orderData = { amount: total };

      const res = await fetch(`${BASE_API}/api/payment/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,  // Send the token in the Authorization header
        },
        body: JSON.stringify(orderData),
        credentials: "include",  // Send cookies if needed
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to create order");
        return;
      }

      const { order } = await res.json();

      if (!order || !order.amount || !order.id) {
        throw new Error("Invalid order data returned from backend");
      }

      // Now, after the order has been created, open Razorpay's checkout form
      const options = {
        key: "rzp_test_wjUjyZh27sndbg",  // Your Razorpay key_id
        amount: order.amount,             // Amount (in paise)
        currency: "INR",
        order_id: order.id,               // Razorpay order ID
        name: "Your Store Name",
        description: "Order Payment",
        handler: function (response) {
          // Success callback - Payment was successful
          console.log("Payment success:", response);

          // You can send the payment response to the backend for verification here
          verifyPayment(response);
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phone,
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error(error.message || "An unexpected error occurred.");
    }
  };

  const handleNewAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    setIsChangingAddress(false);  // Close the address dropdown after selection
  };

  const handleSubmitNewAddress = async (e) => {
    e.preventDefault();

    const updatedAddresses = [
      {
        ApartmentNumber: newAddress.ApartmentNumber,
        Street: newAddress.Street,
        Area: newAddress.Area,
        City: newAddress.City,
        State: newAddress.State,
        PinCode: newAddress.PinCode,
      },
    ];

    const formData = {
      addresses: updatedAddresses,
    };

    try {
      await dispatch(updateUserProfile(formData));
      toast.success("New address added successfully!");
      window.location.reload();
      setIsAddingNewAddress(false);
    } catch (error) {
      toast.error("Failed to add new address.");
    }
  };

  if (!user || !cartItems.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Your cart is empty or you are not logged in.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10 space-y-12 bg-gradient-to-tl from-blue-50 to-purple-100 rounded-lg shadow-xl">
      <h2 className="text-4xl font-semibold text-center text-gray-900 mb-8 tracking-wide">
        Checkout
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left - Address & Cart Items */}
        <div className="space-y-8">
          {/* Address Selection */}
          <div className="bg-white p-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:scale-105 transform">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Shipping Address
            </h3>
            <div className="space-y-4">
              {user.addresses?.slice(0, 3).map((address, i) => (
                <div
                  key={i}
                  className={`border p-4 rounded-lg cursor-pointer transition-all duration-300 ease-in-out ${
                    address === selectedAddress
                      ? "border-violet-500 bg-violet-50 shadow-lg"
                      : "border-gray-300 hover:border-violet-500 hover:scale-105"
                  }`}
                  onClick={() => handleSelectAddress(address)}
                >
                  <p className="text-gray-800 font-medium">
                    {address.ApartmentNumber}, {address.Street}, {address.Area}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {address.City}, {address.State} - {address.PinCode}
                  </p>
                </div>
              ))}
              <button
                onClick={() => setIsChangingAddress(!isChangingAddress)}
                className="mt-4 text-blue-500 hover:text-blue-700 font-semibold"
              >
                {isChangingAddress ? "Cancel" : "Change Address"}
              </button>
            </div>
          </div>

          {/* New Address Form */}
          {isChangingAddress && (
            <form onSubmit={handleSubmitNewAddress}>
              <div className="space-y-4">
                <input
                  type="text"
                  name="ApartmentNumber"
                  value={newAddress.ApartmentNumber}
                  onChange={handleNewAddressChange}
                  placeholder="Apartment/Building Number"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  name="Street"
                  value={newAddress.Street}
                  onChange={handleNewAddressChange}
                  placeholder="Street"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  name="Area"
                  value={newAddress.Area}
                  onChange={handleNewAddressChange}
                  placeholder="Area"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  name="City"
                  value={newAddress.City}
                  onChange={handleNewAddressChange}
                  placeholder="City"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  name="State"
                  value={newAddress.State}
                  onChange={handleNewAddressChange}
                  placeholder="State"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  name="PinCode"
                  value={newAddress.PinCode}
                  onChange={handleNewAddressChange}
                  placeholder="Pin Code"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
                >
                  Add Address
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right - Cart Summary */}
        <div className="space-y-8 bg-white p-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:scale-105">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h3>
          <div className="space-y-6">
            {cartItems.map((item, i) => (
              <div key={i} className="flex justify-between">
                <p>{item.name}</p>
                <p>{item.quantity} x ${item.price}</p>
              </div>
            ))}
            <div className="flex justify-between font-semibold">
              <p>Subtotal</p>
              <p>${subtotal}</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping</p>
              <p>{shippingCost === 0 ? "Free" : `$${shippingCost}`}</p>
            </div>
            <div className="flex justify-between font-semibold">
              <p>Discount</p>
              <p>{discount === 0 ? "$0" : `-$${discount}`}</p>
            </div>
            <div className="flex justify-between font-semibold">
              <p>Total</p>
              <p>${total}</p>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full bg-green-500 text-white py-3 rounded-lg mt-4 hover:bg-green-600 transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
