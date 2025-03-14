import mongoose from "mongoose";

//-----------------------CATEGORY SCHEMA--------------------------
const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Catrgory = mongoose.model("Category", categorySchema);

// -----------------------SUBCATEGORY SCHEMA------------------------
const subCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
const Sub_Category = mongoose.model("Sub_Category", subCategorySchema);

// --------------------PRODUCT SCHEMA-----------------------------
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stockQuantity: {
      type: Number,
      required: true,
      min: 0,
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    subcategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategory",
      },
    ],
    colors: [colorSchema],
    images: [
      {
        type: String,
        trim: true,
      },
    ],
    company: {
      type: String,
      trim: true,
    },
    stockKeepingUnit: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    ratings: {
      average: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

const Products = mongoose.model("Products", productSchema);

export { Catrgory, Sub_Category, Products };
