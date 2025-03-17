import React, { useState } from "react";
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
    state.wishlist.wishlistItems.some((item) => item.id === product.id)
  );

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
    }
  };

  const toggleWishlist = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <div
      className="border rounded-lg overflow-hidden shadow-md bg-white hover:shadow-xl transition duration-300 flex flex-col h-full relative hover:scale-105 cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
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
        className="w-full h-48 object-cover"
      />

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-600 text-sm">{product.description}</p>
        <p className="text-violet-600 font-bold mt-2">₹{product.price}</p>

        {/* Ratings */}
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, i) => (
            <span key={i}>{i < product.ratings ? "⭐" : "☆"}</span>
          ))}
        </div>

        {/* Extra Info */}
        <p className="text-gray-500 text-sm mt-2">
          {product.company} | {product.color}
        </p>

        {/* Add to Cart Button */}
        <button
          className="mt-auto w-full bg-violet-600 text-white py-2 rounded hover:bg-violet-700 transition cursor-pointer"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
