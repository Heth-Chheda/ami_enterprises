import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"; // Import heart icons

const WishlistCard = ({
  id,
  name,
  mrp,
  price,
  image,
  description,
  onClick,
  onToggleWishlist,
}) => {
  const [isInWishlist, setIsInWishlist] = useState(true); // Since it's a wishlist, default to true

  const handleWishlistToggle = (e) => {
    e.stopPropagation(); // Prevent triggering onClick (navigation)
    setIsInWishlist(!isInWishlist);
    onToggleWishlist(id); // Notify parent to update wishlist state
  };

  return (
    <motion.div
      key={id}
      onClick={onClick}
      className="relative cursor-pointer border border-gray-200 rounded-xl overflow-hidden shadow-md bg-white hover:shadow-lg transition-all"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Heart Icon for Wishlist */}
      <div
        className="absolute top-3 right-3 z-10 text-2xl text-red-500 cursor-pointer"
        onClick={handleWishlistToggle}
      >
        {isInWishlist ? <AiFillHeart /> : <AiOutlineHeart />}
      </div>

      {/* Product Image with Overlay */}
      <div className="relative overflow-hidden">
        <motion.img
          src={image}
          alt={name}
          className="w-full h-48 object-fill"
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
      </div>
    </motion.div>
  );
};

export default WishlistCard;
