// ------------------------- Imports -------------------------------------
import { catchAsyncErrorsMiddleware } from "../middlewares/catchAsyncErrorsMiddleware.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Product } from "../models/productModel.js";

// -------------- GET ALL PRODUCTS ---------------------------------------
export const getAllProducts = catchAsyncErrorsMiddleware(
  async (req, res, next) => {
    const products = await Product.find({})
      .select(
        "name mrp price description ratings.average stockQuantity categories variants"
      )
      .populate({
        path: "categories",
        select: "name", // Only include category name
      })
      .lean();

    if (!products || products.length == 0) {
      return next(new ErrorHandler("No products found.", 404));
    }

    res.status(200).json({
      success: true,
      products,
    });
  }
);

// ----------------------- GET PRODUCT BY ID --------------------------------
export const getProductById = catchAsyncErrorsMiddleware(
  async (req, res, next) => {
    try {
      const { id } = req.params;

      // Find product by ID and populate categories and subcategories
      const product = await Product.findById(id).populate(
        "categories",
        "name slug"
      ); // Populate categories

      if (!product) {
        return next(new ErrorHandler("Product not found.", 404));
      }

      res.status(200).json({
        success: true,
        message: "Product found.",
        product,
      });
    } catch (error) {
      return next(new ErrorHandler("Error fetching product", 500));
    }
  }
);
