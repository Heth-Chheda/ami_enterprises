import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/store/slices/wishlistSlice";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductDetail = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Check if the product is already in the wishlist
  const isWishlisted = useSelector((state) =>
    state.wishlist.wishlistItems.some((item) => item._id === product._id)
  );

  const handleAddToCart = (e) => {
    e.stopPropagation(); // ✅ Stop the event from triggering the parent click
    if (product) {
      dispatch(addToCart(product));
    }
  };

  const toggleWishlist = (e) => {
    e.stopPropagation(); // ✅ Stop the event from triggering the parent click
    if (isWishlisted) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <div
      className="border rounded-lg overflow-hidden shadow-md bg-white hover:shadow-xl transition duration-300 flex flex-col h-full relative hover:scale-105 cursor-pointer"
      onClick={() => navigate(`/product/${product._id}`)}
      style={{
        minWidth: "220px", // ✅ Prevent shrinking beyond 220px
        maxWidth: "300px", // ✅ Optional to control max width
      }}
    >
      {/* Wishlist Icon */}
      <div
        className="absolute top-2 right-2 cursor-pointer"
        onClick={toggleWishlist}
      >
        <Heart
          size={24}
          className={isWishlisted ? "text-red-500" : "text-gray-400"}
          fill={isWishlisted ? "currentColor" : "none"}
        />
      </div>

      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-contain" // ✅ Use object-contain to maintain aspect ratio
      />

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-600 text-sm line-clamp-2">
          {product.description}
        </p>
        <p className="text-violet-600 font-bold mt-2">
          <span className="mr-3 text-gray-400 line-through">
            ₹{product.mrp}
          </span>
          ₹{product.price}
        </p>

        {/* Ratings */}
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, i) => (
            <span key={i}>{i < product.ratings?.average ? "⭐" : "☆"}</span>
          ))}
        </div>

        {/* Add to Cart Button */}
        <button
          className="mt-auto w-full bg-violet-600 text-white py-2 rounded hover:bg-violet-700 transition cursor-pointer"
          onClick={(e) => {
            e.stopPropagation(); // ✅ Prevent triggering the parent click
            handleAddToCart();
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
