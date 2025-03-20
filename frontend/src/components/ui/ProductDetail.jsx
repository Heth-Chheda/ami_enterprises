import React from "react";
import { Heart, Minus, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decrementQuantity } from "@/store/slices/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/store/slices/wishlistSlice";

const ProductDetail = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Check if the product is already in the cart
  const cartItem = useSelector((state) =>
    state.cart.cartItems.find(
      (item) =>
        item._id === product._id &&
        (!product.selectedVariant ||
          (item.selectedVariant &&
            item.selectedVariant.color.name ===
              product.selectedVariant.color.name &&
            item.selectedVariant.size === product.selectedVariant.size))
    )
  );

  // ✅ Check if the product is already in the wishlist
  const isInWishlist = useSelector((state) =>
    state.wishlist.wishlistItems.some((item) => item._id === product._id)
  );

  const discount = product.mrp
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  // ✅ Handle Increment
  const handleIncrement = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  // ✅ Handle Decrement
  const handleDecrement = (e) => {
    e.stopPropagation();
    dispatch(decrementQuantity(product));
  };

  // ✅ Toggle Wishlist
  const toggleWishlist = (e) => {
    e.stopPropagation(); // Prevent navigation to the product detail page
    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <div
      className="border border-gray-200 rounded-xl shadow-md bg-white transition-transform transform hover:-translate-y-1 hover:shadow-xl cursor-pointer overflow-hidden"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      {/* ✅ Image Section */}
      <div className="relative w-full h-48">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
        />

        {/* ✅ Discount Badge */}
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
            {discount}% OFF
          </span>
        )}

        {/* ✅ Wishlist Icon */}
        <div className="absolute top-2 right-2">
          <Heart
            size={24}
            className={`cursor-pointer ${
              isInWishlist ? "text-red-500" : "text-gray-400"
            } hover:text-red-500`}
            fill={isInWishlist ? "currentColor" : "none"}
            onClick={toggleWishlist}
          />
        </div>
      </div>

      {/* ✅ Product Info */}
      <div className="p-4">
        <h2 className="text-sm font-semibold truncate">{product.name}</h2>
        <p className="text-gray-500 text-xs truncate">{product.description}</p>

        {/* ✅ Price Section */}
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

        {/* ✅ Ratings */}
        <div className="flex items-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-yellow-400">
              {i < product.ratings?.average ? "⭐" : "☆"}
            </span>
          ))}
        </div>

        {/* ✅ Add to Cart Section */}
        <div className="mt-4">
          {cartItem ? (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={handleDecrement}
                className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-violet-700 transition"
              >
                <Minus size={20} />
              </button>
              <span className="text-sm font-semibold">{cartItem.quantity}</span>
              <button
                onClick={handleIncrement}
                className="bg-violet-600 text-white px-3 py-1 rounded-full hover:bg-violet-700 transition"
              >
                <Plus size={20} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleIncrement}
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

export default ProductDetail;
