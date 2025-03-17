import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart, FaPlus, FaMinus } from "react-icons/fa";

const ProductCardProducts = ({
  id,
  name,
  mrp,
  price,
  image,
  description,
  onAddToCart,
  onRemoveFromCart,
  onViewDetails,
  quantityInCart = 0,
  isWishlisted = false,
  onToggleWishlist,
}) => {
  const [wishlisted, setWishlisted] = useState(isWishlisted);

  return (
    <motion.div
      key={id}
      className="relative cursor-pointer border border-gray-200 rounded-xl overflow-hidden shadow-md bg-white hover:shadow-lg transition-all"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Wishlist Icon */}
      <div className="absolute top-3 right-3 z-10">
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            setWishlisted(!wishlisted);
            onToggleWishlist(id);
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {wishlisted ? (
            <FaHeart className="text-violet-500 text-xl" />
          ) : (
            <FaRegHeart className="text-gray-400 text-xl" />
          )}
        </motion.button>
      </div>

      {/* Product Image */}
      <div className="relative overflow-hidden">
        <motion.img
          src={image}
          alt={name}
          className="w-full h-48 object-cover"
          initial={{ opacity: 0.8, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Product Details */}
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800 tracking-tight">
          {name}
        </h3>

        {/* MRP and Our Price */}
        <div className="mt-1 flex items-center gap-2">
          <p className="text-gray-400 text-base line-through">₹{mrp}</p>
          <p className="text-violet-600 text-base font-semibold">₹{price}</p>
        </div>

        <p className="text-gray-500 mt-2 text-sm line-clamp-2">{description}</p>

        {/* ✅ Dynamic Cart Button */}
        <div className="mt-5 flex gap-4 justify-center">
          {quantityInCart > 0 ? (
            <div className="flex items-center gap-2 bg-violet-100 text-violet-600 px-4 py-2 rounded-full shadow-md">
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveFromCart(id);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaMinus />
              </motion.button>
              <span className="font-medium">{quantityInCart}</span>
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(id);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaPlus />
              </motion.button>
            </div>
          ) : (
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(id);
              }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-violet-600 text-white font-medium rounded-full shadow-md hover:bg-violet-700 transition-all"
            >
              Add to Cart
            </motion.button>
          )}

          {/* View Details Button */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(id);
            }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-gray-100 text-gray-800 font-medium rounded-full shadow-md hover:bg-gray-200 transition-all"
          >
            View Details
          </motion.button>
        </div>
      </div>

      {/* Floating Badge */}
      <motion.div
        className="absolute top-3 left-3 bg-violet-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
      >
        New Arrival
      </motion.div>
    </motion.div>
  );
};

export default ProductCardProducts;
