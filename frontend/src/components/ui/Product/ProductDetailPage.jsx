import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/store/slices/wishlistSlice";
import {
  clearSelectedProduct,
  getProductById,
} from "@/store/slices/productSlice";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const product = useSelector((state) => state.product.selectedProduct);
  const status = useSelector((state) => state.product.status);

  const isWishlisted = useSelector((state) =>
    state.wishlist.wishlistItems.some((item) => item._id === product?._id)
  );

  useEffect(() => {
    if (productId) {
      dispatch(getProductById(productId));
    }

    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, productId]);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen text-center text-2xl text-gray-500">
        Product not found!
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleWishlist = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const averageRating = product.ratings?.average || 0;
  const totalReviews = product.ratings?.count || 0;

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
          src={product.images[0]}
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

          {/* Price and Discount */}
          <div className="flex items-center gap-4 my-4">
            <motion.span
              className="text-2xl font-semibold text-violet-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              ₹{product.price.toFixed(2)}
            </motion.span>
            {product.mrp > product.price && (
              <motion.span
                className="text-xl text-gray-500 line-through"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                ₹{product.mrp.toFixed(2)}
              </motion.span>
            )}
          </div>

          {/* Description */}
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
              <strong>Category:</strong>{" "}
              {product.categories.map((category) => category.name).join(", ")}
            </li>
            <li>
              <strong>Ratings:</strong> {averageRating.toFixed(1)} ⭐ (
              {totalReviews} reviews)
            </li>
            <li>
              <strong>Availability:</strong>{" "}
              {product.stockQuantity > 0 ? (
                <span className="text-green-500 font-semibold">In Stock</span>
              ) : (
                <span className="text-red-500 font-semibold">Out of Stock</span>
              )}
            </li>
          </ul>

          {/* Product Variants */}
          {product.variants?.length > 0 && (
            <div className="mt-6">
              <strong>Available Variants:</strong>
              <div className="flex gap-4 mt-2">
                {product.variants.map((variant) => (
                  <div
                    key={variant.color.hexCode}
                    className="flex items-center gap-2 border rounded-md px-3 py-1"
                  >
                    <span
                      className="w-5 h-5 rounded-full"
                      style={{ backgroundColor: variant.color.hexCode }}
                    />
                    <span>{variant.color.name}</span>
                    <span className="text-gray-500">({variant.size})</span>
                    <span>
                      {variant.stockQuantity > 0 ? (
                        <span className="text-green-500">In Stock</span>
                      ) : (
                        <span className="text-red-500">Out of Stock</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4">
            {product.stockQuantity > 0 ? (
              <motion.button
                className="bg-violet-600 text-white px-8 py-3 rounded-md shadow-md hover:bg-violet-700 transition-transform transform hover:scale-105"
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
                  ? "bg-red-500 text-white hover:text-white"
                  : "border border-gray-400 text-gray-800"
              } px-8 py-3 rounded-md shadow-md hover:border-violet-600 hover:text-violet-400 transition-transform`}
              onClick={handleWishlist}
            >
              {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetailPage;
