import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserProfile } from "@/store/slices/authenticationSlice"; // Import the action
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { user } = useSelector((state) => state.authentication);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    ApartmentNumber: "",
    Street: "",
    Area: "",
    City: "",
    State: "",
    PinCode: "",
    Country: "",
  });
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [showAllAddresses, setShowAllAddresses] = useState(false);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shippingCost = subtotal >= 20 ? 0 : 4;
  const discount = subtotal >= 20 ? -2 : 0;
  const total = subtotal + shippingCost + discount;

  const handlePlaceOrder = () => {
    navigate("/order-confirmation");
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
        Country: newAddress.Country,
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
    <div className="max-w-6xl mx-auto p-6 md:p-10 space-y-12">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Checkout
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left - Address & Cart Items */}
        <div className="space-y-8">
          {/* Address Selection */}
          <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
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
                      : "border-gray-300 hover:border-violet-500"
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

              {/* Show more / Show less toggle */}
              {user.addresses?.length > 3 && (
                <button
                  onClick={() => setShowAllAddresses(!showAllAddresses)}
                  className="text-violet-600 hover:text-violet-700 transition mt-4"
                >
                  {showAllAddresses ? "Show less" : "Show more"}
                </button>
              )}

              {/* Display all addresses */}
              {showAllAddresses && (
                <div>
                  {user.addresses.slice(3).map((address, i) => (
                    <div
                      key={i}
                      className={`border p-4 rounded-lg cursor-pointer transition-all duration-300 ease-in-out ${
                        address === selectedAddress
                          ? "border-violet-500 bg-violet-50 shadow-lg"
                          : "border-gray-300 hover:border-violet-500"
                      }`}
                      onClick={() => handleSelectAddress(address)}
                    >
                      <p className="text-gray-800 font-medium">
                        {address.ApartmentNumber}, {address.Street},{" "}
                        {address.Area}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {address.City}, {address.State} - {address.PinCode}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Add a New Address */}
              <button
                onClick={() => setIsAddingNewAddress(!isAddingNewAddress)}
                className="mt-6 w-full bg-violet-600 text-white py-3 rounded-lg hover:bg-violet-700 transition"
              >
                {isAddingNewAddress ? "Cancel" : "Add a New Address"}
              </button>

              {/* New Address Form */}
              {isAddingNewAddress && (
                <form
                  onSubmit={handleSubmitNewAddress}
                  className="mt-6 space-y-4"
                >
                  <div>
                    <label className="block text-sm font-semibold">
                      Apartment Number
                    </label>
                    <input
                      type="text"
                      name="ApartmentNumber"
                      value={newAddress.ApartmentNumber}
                      onChange={handleNewAddressChange}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">
                      Street
                    </label>
                    <input
                      type="text"
                      name="Street"
                      value={newAddress.Street}
                      onChange={handleNewAddressChange}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Area</label>
                    <input
                      type="text"
                      name="Area"
                      value={newAddress.Area}
                      onChange={handleNewAddressChange}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold">
                        City
                      </label>
                      <input
                        type="text"
                        name="City"
                        value={newAddress.City}
                        onChange={handleNewAddressChange}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold">
                        State
                      </label>
                      <input
                        type="text"
                        name="State"
                        value={newAddress.State}
                        onChange={handleNewAddressChange}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold">
                        Pin Code
                      </label>
                      <input
                        type="text"
                        name="PinCode"
                        value={newAddress.PinCode}
                        onChange={handleNewAddressChange}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold">
                        Country
                      </label>
                      <input
                        type="text"
                        name="Country"
                        value={newAddress.Country}
                        onChange={handleNewAddressChange}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="mt-4 w-full bg-violet-600 text-white py-3 rounded-lg hover:bg-violet-700 transition"
                  >
                    Save Address
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Cart Items Preview */}
          <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Your Items
            </h3>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-16 h-16 rounded border"
                    />
                    <div>
                      <p className="font-medium text-gray-700">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        ₹{item.price} × {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-800">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <div className="space-y-2 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹{shippingCost}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>-₹{discount}</span>
            </div>
            <div className="flex justify-between font-semibold text-gray-900">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="mt-6 w-full bg-violet-600 text-white py-3 rounded-lg hover:bg-violet-700 transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
