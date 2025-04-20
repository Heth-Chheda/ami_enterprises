import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Calendar,
  UserCheck,
  ShieldCheck,
  BadgeCheck,
  Heart,
  Minus,
  Plus,
} from "lucide-react";
import { addToCart, decrementQuantity } from "@/store/slices/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/store/slices/wishlistSlice";

const UserDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(
    (state) => state.authentication
  );
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    dateOfBirth: "",
    gender: "",
    user_role: "",
    status: "",
    profileImageUrl: "",
    accountVerified: false,
  });

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
    else if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        mobileNumber: user.mobileNumber || "",
        dateOfBirth: user.dateOfBirth?.split("T")[0] || "",
        gender: user.gender || "",
        user_role: user.user_role || "",
        status: user.status || "",
        profileImageUrl: user.profileImageUrl || "",
        accountVerified: user.accountVerified || false,
      });
    }
  }, [isAuthenticated, user, navigate]);

  const handleIncrement = (e, product) => {
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  const handleDecrement = (e, product) => {
    e.stopPropagation();
    dispatch(decrementQuantity(product));
  };

  const toggleWishlist = (e, product) => {
    e.stopPropagation();
    const isInWishlist = wishlistItems.some((item) => item._id === product._id);
    if (isInWishlist) dispatch(removeFromWishlist(product._id));
    else dispatch(addToWishlist(product));
  };

  const renderProductCard = (product) => {
    const cartItem = cartItems.find((item) => item._id === product._id);
    const isInWishlist = wishlistItems.some((item) => item._id === product._id);
    const discount = product.mrp
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

    return (
      <div
        key={product._id}
        className="border rounded-xl shadow-md bg-white hover:shadow-xl transition cursor-pointer overflow-hidden"
        onClick={() => navigate(`/product/${product._id}`)}
      >
        <div className="relative w-full h-48">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {discount > 0 && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
              {discount}% OFF
            </span>
          )}
          <div className="absolute top-2 right-2">
            <Heart
              size={24}
              className={`cursor-pointer ${
                isInWishlist ? "text-red-500" : "text-gray-400"
              } hover:text-red-500`}
              fill={isInWishlist ? "currentColor" : "none"}
              onClick={(e) => toggleWishlist(e, product)}
            />
          </div>
        </div>
        <div className="p-4">
          <h2 className="text-sm font-semibold truncate">{product.name}</h2>
          <p className="text-gray-500 text-xs truncate">
            {product.description}
          </p>
          <div className="flex items-center gap-2 mt-2">
            {product.mrp && (
              <span className="text-gray-400 line-through text-sm">
                ₹{product.mrp}
              </span>
            )}
            <span className="text-violet-600 font-semibold">
              ₹{product.price}
            </span>
          </div>
          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400">
                {i < product.ratings?.average ? "⭐" : "☆"}
              </span>
            ))}
          </div>
          <div className="mt-4">
            {cartItem ? (
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={(e) => handleDecrement(e, product)}
                  className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600"
                >
                  <Minus size={20} />
                </button>
                <span className="text-sm font-semibold">
                  {cartItem.quantity}
                </span>
                <button
                  onClick={(e) => handleIncrement(e, product)}
                  className="bg-violet-600 text-white px-3 py-1 rounded-full hover:bg-violet-700"
                >
                  <Plus size={20} />
                </button>
              </div>
            ) : (
              <button
                onClick={(e) => handleIncrement(e, product)}
                className="bg-violet-600 text-white px-4 py-2 rounded-full hover:bg-violet-700 transition w-full mt-2"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-3xl font-bold text-violet-700 mb-6">
        User Dashboard
      </h2>

      {/* Wishlist Section */}
      <div className="mb-10">
        <h3 className="text-2xl font-bold text-violet-700 mb-4">
          Wishlist ({wishlistItems.length})
        </h3>
        {wishlistItems.length === 0 ? (
          <p className="text-gray-500">You have no items in your wishlist.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {wishlistItems.map((product) => renderProductCard(product))}
          </div>
        )}
      </div>

      {/* Profile Section */}
      <div className="flex items-center gap-4 mb-6">
        {formData.profileImageUrl ? (
          <img
            src={formData.profileImageUrl}
            alt="Profile"
            className="w-20 h-20 rounded-full border-5 border-violet-500 object-contain"
          />
        ) : (
          <div className="w-20 h-20 rounded-full border-4 border-violet-500 bg-gray-200 flex items-center justify-center">
            <User className="text-gray-400" size={32} />
          </div>
        )}
        <div>
          <h3 className="text-2xl font-semibold">{formData.name || "N/A"}</h3>
          <p className="text-gray-500">{formData.user_role || "User"}</p>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "Name", icon: <User />, name: "name" },
          { label: "Email", icon: <Mail />, name: "email" },
          { label: "Phone", icon: <Phone />, name: "mobileNumber" },
          {
            label: "Date of Birth",
            icon: <Calendar />,
            name: "dateOfBirth",
          },
          { label: "Gender", icon: <UserCheck />, name: "gender" },
          { label: "Role", icon: <ShieldCheck />, name: "user_role" },
          { label: "Account Status", icon: <BadgeCheck />, name: "status" },
        ].map(({ label, icon, name }) => (
          <div
            key={name}
            className="bg-violet-100 p-4 rounded-lg flex items-center gap-4"
          >
            <div className="text-violet-700">{icon}</div>
            <div className="flex-1">
              <p className="text-gray-600">{label}</p>
              <p className="text-black font-medium">
                {formData[name] || "N/A"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
