import React from "react";
import { motion } from "framer-motion";

const ProductCardProducts = ({
  id,
  name,
  mrp,
  price,
  image,
  description,
  onAddToCart,
  onViewDetails,
}) => {
  return (
    <motion.div
      key={id}
      className="relative cursor-pointer border border-gray-200 rounded-xl overflow-hidden shadow-md bg-white hover:shadow-lg transition-all"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Product Image with Overlay */}
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

        {/* ✅ MRP and Our Price */}
        <div className="mt-1 flex items-center gap-2">
          <p className="text-gray-400 text-base line-through">{mrp}</p>
          <p className="text-gray-800 text-base font-semibold">{price}</p>
        </div>

        <p className="text-gray-500 mt-2 text-sm line-clamp-2">{description}</p>

        {/* Buttons */}
        <div className="mt-5 flex gap-4 justify-center">
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-full shadow-md hover:bg-blue-700 transition-all"
          >
            Add to Cart
          </motion.button>
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails();
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
        className="absolute top-3 left-3 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow"
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
