import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "@/store/slices/wishlistSlice";
import WishlistCard from "./WishlistCard";

const MyWishlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Get wishlist products from Redux store
  const wishlistProducts = useSelector((state) => state.wishlist.wishlistItems);

  // ✅ Handle product click -> Navigate to Product Detail Page
  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  // ✅ Handle product removal from wishlist
  const handleToggleWishlist = (id) => {
    dispatch(removeFromWishlist(id));
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-violet-700 mb-6">
        My Wishlist ❤️
      </h2>

      {/* ✅ Show message if wishlist is empty */}
      {wishlistProducts.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-400 text-lg">You have no favourites 😔</p>
        </div>
      ) : (
        // ✅ Responsive Grid Layout
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => (
            <WishlistCard
              key={product.id}
              id={product.id}
              name={product.name}
              mrp={product.mrp}
              price={product.price}
              image={product.image}
              description={product.description}
              onClick={() => handleProductClick(product.id)}
              onToggleWishlist={() => handleToggleWishlist(product.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyWishlist;
