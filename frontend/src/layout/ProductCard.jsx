import React from "react";
import { motion } from "framer-motion";

const ProductCard = ({
  id,
  name,
  price,
  image,
  description,
  onClick,
  type,
}) => {
  return (
    <motion.div
      key={id}
      className="cursor-pointer border border-gray-300 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <motion.img
        src={image}
        alt={name}
        className="w-full h-48 object-cover"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />
      <div className="p-4 bg-white">
        <h3 className="text-lg font-bold text-gray-800">{name}</h3>
        {type === "product" ? (
          <>
            <p className="text-gray-500 mt-1">{price}</p>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent parent click event
                onClick();
              }}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
          </>
        ) : (
          <p className="text-gray-500 mt-1">
            Discover the best {name.toLowerCase()} at great prices!
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
