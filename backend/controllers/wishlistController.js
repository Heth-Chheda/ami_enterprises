// ------------------------- Imports -------------------------------------
import { catchAsyncErrorsMiddleware } from "../middlewares/catchAsyncErrorsMiddleware.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import WishList from "../models/wishlistModel.js";
import { Product } from "../models/productModel.js";

// ----------------------- GET USER WISHLIST --------------------------------
export const getUserWishlist = catchAsyncErrorsMiddleware(
  async (req, res, next) => {
    const userId = req.user._id;

    const wishlist = await WishList.findOne({ user: userId }).populate(
      "products",
      "name mrp price image ratings.average stockQuantity"
    );

    if (!wishlist) {
      return next(new ErrorHandler("No Products in wishlist.", 404));
    }

    res.status(200).json({
      success: true,
      wishlist: wishlist.products,
    });
  }
);

// ----------------------- ADD PRODUCT TO WISHLIST --------------------------------
export const addToWishlist = catchAsyncErrorsMiddleware(
  async (req, res, next) => {
    const userId = req.user._id;
    const { productId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return next(new ErrorHandler("Product not found.", 404));
    }

    const wishlist = await WishList.findOneAndUpdate(
      { user: userId },
      { $addToSet: { products: productId } }, // Prevent duplicates
      { new: true, upsert: true }
    ).populate("products");

    res.status(200).json({
      success: true,
      message: "Product added to wishlist.",
      wishlist: wishlist.products,
    });
  }
);

// ----------------------- REMOVE PRODUCT FROM WISHLIST --------------------------------
export const removeFromWishlist = catchAsyncErrorsMiddleware(
  async (req, res, next) => {
    const userId = req.user._id;
    const { productId } = req.params;

    const wishlist = await WishList.findOneAndUpdate(
      { user: userId },
      { $pull: { products: productId } },
      { new: true }
    ).populate("products");

    if (!wishlist) {
      return next(new ErrorHandler("Wishlist not found.", 404));
    }

    res.status(200).json({
      success: true,
      message: "Product removed from wishlist.",
      wishlist: wishlist.products,
    });
  }
);

// ----------------------- CLEAR WISHLIST --------------------------------
export const clearWishlist = catchAsyncErrorsMiddleware(
  async (req, res, next) => {
    const userId = req.user._id;

    const wishlist = await WishList.findOneAndUpdate(
      { user: userId },
      { $set: { products: [] } },
      { new: true }
    );

    if (!wishlist) {
      return next(new ErrorHandler("Wishlist not found.", 404));
    }

    res.status(200).json({
      success: true,
      message: "Wishlist cleared.",
    });
  }
);
