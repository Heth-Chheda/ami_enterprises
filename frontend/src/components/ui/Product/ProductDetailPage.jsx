import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementQuantity,
  removeFromCart,
} from "@/store/slices/cartSlice";
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
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [selectedVariant, setSelectedVariant] = useState(null);
  const averageRating = product?.ratings?.average || 0;
  const totalReviews = product?.ratings?.count || 0;

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

  useEffect(() => {
    if (product?.variants?.length > 0) {
      const availableVariant = product.variants.find(
        (variant) => variant.stockQuantity > 0
      );
      setSelectedVariant(availableVariant || null);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen text-2xl text-gray-400">
        Product not found!
      </div>
    );
  }

  const existingCartItem = cartItems.find(
    (item) =>
      item._id === product._id &&
      (!selectedVariant ||
        (item.selectedVariant &&
          item.selectedVariant.color.name === selectedVariant.color.name &&
          item.selectedVariant.size === selectedVariant.size))
  );

  const handleAddToCart = () => {
    const itemToAdd = selectedVariant
      ? { ...product, selectedVariant, quantity: 1 }
      : { ...product, quantity: 1 };
    dispatch(addToCart(itemToAdd));
  };

  const handleIncreaseQuantity = () => {
    if (existingCartItem && selectedVariant) {
      if (existingCartItem.quantity < selectedVariant.stockQuantity) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        dispatch(addToCart(updatedItem));
      }
    }
  };

  const handleDecreaseQuantity = () => {
    if (existingCartItem) {
      if (existingCartItem.quantity >= 0) {
        dispatch(decrementQuantity(existingCartItem));
      } else {
        dispatch(removeFromCart(existingCartItem._id));
      }
    }
  };

  const handleVariantSelect = (variant) => setSelectedVariant(variant);

  const handleWishlist = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
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
          className="w-full h-[500px] object-cover rounded-xl shadow-md hover:shadow-lg transition duration-300"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
        />

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-4xl font-extrabold text-gray-800">
            {product.name}
          </h1>

          <p className="text-gray-500 text-lg">
            By{" "}
            <span className="text-violet-600 font-semibold">
              {product.company}
            </span>
          </p>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {product.categories?.map((category) => (
              <span
                key={category._id}
                className="bg-violet-100 text-violet-600 px-3 py-1 rounded-full text-sm font-medium"
              >
                {category.name}
              </span>
            ))}
          </div>

          {/* Price and Discount */}
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-violet-600">
              ₹{product.price.toFixed(2)}
            </span>
            {product.mrp > product.price && (
              <span className="text-gray-400 line-through">
                ₹{product.mrp.toFixed(2)}
              </span>
            )}
          </div>

          {/* Ratings */}
          <div className="flex items-center gap-2 text-yellow-400">
            ⭐ {averageRating} ({totalReviews} reviews)
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          {/* Variants */}
          {product.variants?.length > 0 && (
            <div>
              <strong>Available Variants:</strong>
              <div className="flex gap-3 mt-2">
                {product.variants.map((variant) => (
                  <div
                    key={variant.color.hexCode}
                    className={`flex items-center gap-2 border rounded-lg px-4 py-2 cursor-pointer transition ${
                      selectedVariant === variant
                        ? "border-violet-600 bg-violet-100"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onClick={() => handleVariantSelect(variant)}
                  >
                    <span
                      className="w-5 h-5 rounded-full"
                      style={{ backgroundColor: variant.color.hexCode }}
                    />
                    <span>{variant.color.name}</span>
                    <span className="text-gray-500">({variant.size})</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            {existingCartItem ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDecreaseQuantity}
                  className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-md"
                >
                  -
                </button>
                <span>{existingCartItem.quantity}</span>
                <button
                  onClick={handleIncreaseQuantity}
                  className="bg-violet-500 hover:bg-violet-600 text-white px-3 py-2 rounded-md"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                className="bg-violet-500 hover:bg-violet-600 text-white px-6 py-3 rounded-md"
              >
                Add to Cart
              </button>
            )}

            <button
              onClick={handleWishlist}
              className={`border ${
                isWishlisted
                  ? "border-violet-500 text-violet-500"
                  : "border-gray-300 text-gray-600"
              } px-6 py-3 rounded-md hover:bg-gray-100`}
            >
              {isWishlisted ? "❤️ Wishlisted" : "♡ Add to Wishlist"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetailPage;
