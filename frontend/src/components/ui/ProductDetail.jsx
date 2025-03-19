import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/store/slices/wishlistSlice";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const ProductDetail = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isWishlisted = useSelector((state) =>
    state.wishlist.wishlistItems.some((item) => item._id === product._id)
  );

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [product.images]);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  const toggleWishlist = (e) => {
    e.stopPropagation();
    if (isWishlisted) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <div
      className="border rounded-lg shadow-md bg-white hover:shadow-lg transition duration-300 cursor-pointer flex flex-col w-full max-w-[280px] overflow-hidden"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      {/* Image Section */}
      <div className="relative w-full h-56 overflow-hidden">
        <AnimatePresence>
          <motion.img
            key={currentImageIndex}
            src={product.images[currentImageIndex]}
            alt={`${product.name} - ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>

        {/* Wishlist Icon */}
        <div
          className="absolute top-2 right-2 z-10 cursor-pointer"
          onClick={toggleWishlist}
        >
          <Heart
            size={24}
            className={isWishlisted ? "text-red-500" : "text-gray-400"}
            fill={isWishlisted ? "currentColor" : "none"}
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col gap-1">
        <h2 className="text-sm font-medium text-gray-700">{product.name}</h2>
        <p className="text-gray-500 text-xs truncate">{product.description}</p>

        {/* Price Section */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-gray-400 line-through text-sm">
            ₹{product.mrp}
          </span>
          <span className="text-violet-600 font-semibold text-sm">
            ₹{product.price}
          </span>
        </div>

        {/* Ratings */}
        <div className="flex items-center mt-1">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-yellow-500">
              {i < product.ratings?.average ? "⭐" : "☆"}
            </span>
          ))}
        </div>

        {/* Add to Cart Button */}
        <button
          className="mt-2 bg-violet-600 text-white text-sm py-2 rounded hover:bg-violet-700 transition"
          onClick={handleAddToCart}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
