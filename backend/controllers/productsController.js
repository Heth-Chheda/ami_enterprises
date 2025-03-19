// ------------------------- Imports -------------------------------------
import { catchAsyncErrorsMiddleware } from "../middlewares/catchAsyncErrorsMiddleware.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Product } from "../models/productModel.js";

// -------------- GET ALL PRODUCTS ---------------------------------------
export const getAllProducts = catchAsyncErrorsMiddleware(
  async (req, res, next) => {
    const products = await Product.find({})
      .select(
        "name mrp price description ratings.average stockQuantity categories variants images"
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

// -------------- UPDATE PRODUCT BY ID ---------------------------------
export const updateProductById = catchAsyncErrorsMiddleware(
  async (req, res, next) => {
    const { id } = req.params;

    // Find and update product with the provided fields
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: req.body }, // Dynamically update all fields from req.body
      {
        new: true, // Return updated document
        runValidators: true, // Ensure schema validation on update
      }
    ).populate("categories", "name slug");

    if (!updatedProduct) {
      return next(new ErrorHandler("Product not found.", 404));
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      product: updatedProduct,
    });
  }
);

// ----------------------- DELETE PRODUCT BY ID ---------------------------
export const deleteProductById = catchAsyncErrorsMiddleware(
  async (req, res, next) => {
    const { id } = req.params;

    // Find and delete product
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return next(new ErrorHandler("Product not found.", 404));
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
    });
  }
);

// ---------------------------- ADD NEW PRODUCT ---------------------------------
export const createProduct = catchAsyncErrorsMiddleware(
  async (req, res, next) => {
    const {
      name,
      slug,
      description,
      mrp,
      price,
      stockQuantity,
      categories,
      variants,
      images,
      company,
      stockKeepingUnit,
      isFeatured,
      isActive,
      ratings,
    } = req.body;

    // Check if the product with the same SKU already exists
    const existingProduct = await Product.findOne({ stockKeepingUnit });
    if (existingProduct) {
      return next(
        new ErrorHandler("Product with this SKU already exists.", 400)
      );
    }

    // Create new product instance
    const product = new Product({
      name,
      slug,
      description,
      mrp,
      price,
      stockQuantity,
      categories,
      variants,
      images,
      company,
      stockKeepingUnit,
      isFeatured,
      isActive,
      ratings,
    });

    // Save to the database
    await product.save();

    res.status(200).json({
      success: true,
      message: "Product created successfully.",
      product,
    });
  }
);
