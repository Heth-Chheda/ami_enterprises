import { useParams } from "react-router-dom";
import { products } from "@/data/products";
import { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/store/slices/wishlistSlice";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const product = products.find((p) => p.id === Number(productId));
  const dispatch = useDispatch();

  const isWishlisted = useSelector((state) =>
    state.wishlist.wishlistItems.some((item) => item.id === product?.id)
  );

  const handleWishlist = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const [reviews, setReviews] = useState(product?.reviews || []);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 0,
    comment: "",
  });

  const initialAverageRating =
    ((product.rating || 0) * (product.numReviews || 0) +
      reviews.reduce((acc, review) => acc + review.rating, 0)) /
    ((product.numReviews || 0) + reviews.length || 1);

  const averageRating =
    ((product.rating || 0) * (product.numReviews || 0) +
      reviews.reduce((acc, review) => acc + review.rating, 0)) /
    ((product.numReviews || 0) + reviews.length || 1);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen text-center text-2xl text-gray-500">
        Product not found!
      </div>
    );
  }

  // Handle review submission
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (newReview.name && newReview.rating > 0 && newReview.comment) {
      setReviews([...reviews, newReview]);
      setNewReview({ name: "", rating: 0, comment: "" });
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Product Info Section */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Product Image */}
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-[500px] object-cover rounded-lg shadow-xl"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        />

        {/* Product Info */}
        <div>
          <motion.h1
            className="text-4xl font-bold text-gray-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {product.name}
          </motion.h1>

          <motion.p
            className="text-2xl text-violet-600 font-semibold my-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            ₹{product.price}
          </motion.p>

          <motion.p
            className="text-gray-600 text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {product.description}
          </motion.p>

          {/* Additional Details */}
          <ul className="mt-6 space-y-3 text-gray-700">
            <li>
              <strong>Company:</strong> {product.company}
            </li>
            <li>
              <strong>Color:</strong> {product.color}
            </li>
            <li>
              <strong>Category:</strong> {product.category || "Not specified"}
            </li>
            <li>
              <strong>Ratings:</strong> {averageRating.toFixed(1)} ⭐ (
              {(product.numReviews || 0) + reviews.length} reviews)
            </li>
            <li>
              <strong>Availability:</strong>{" "}
              {product.inStock ? (
                <span className="text-green-500 font-semibold">In Stock</span>
              ) : (
                <span className="text-red-500 font-semibold">Out of Stock</span>
              )}
            </li>
          </ul>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4">
            {product.inStock ? (
              <motion.button
                className="bg-violet-600 text-white px-8 py-3 rounded-md shadow-md hover:bg-violet-700 transition-transform transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
              >
                Add to Cart
              </motion.button>
            ) : (
              <motion.button
                className="bg-gray-500 text-white px-8 py-3 rounded-md shadow-md"
                disabled
              >
                Out of Stock
              </motion.button>
            )}

            <motion.button
              className={`${
                isWishlisted
                  ? "bg-red-500 text-white"
                  : "border border-gray-400 text-gray-800"
              } px-8 py-3 rounded-md shadow-md hover:border-violet-600 hover:text-white transition-transform transform hover:scale-105`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWishlist}
            >
              {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* ⭐ Review Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Customer Reviews ({reviews.length})
        </h2>

        {/* Review Form */}
        <form
          onSubmit={handleSubmitReview}
          className="bg-gray-50 p-6 rounded-lg shadow-md"
        >
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your name"
              value={newReview.name}
              onChange={(e) =>
                setNewReview({ ...newReview, name: e.target.value })
              }
              className="border rounded-md px-4 py-2"
              required
            />
            <select
              value={newReview.rating}
              onChange={(e) =>
                setNewReview({ ...newReview, rating: Number(e.target.value) })
              }
              className="border rounded-md px-4 py-2"
              required
            >
              <option value="0">Select Rating</option>
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>
                  {star} ⭐
                </option>
              ))}
            </select>
            <textarea
              placeholder="Write a review"
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
              className="border rounded-md px-4 py-2 h-28"
              required
            />
            <motion.button
              type="submit"
              className="bg-violet-600 text-white px-8 py-2 rounded-md shadow-md hover:bg-violet-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit Review
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductDetailPage;
