import mongoose from "mongoose";

//-----------------------COLOR SCHEMA--------------------------
const colorSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    hexCode: {
      type: String,
      required: true,
      match: /^#([0-9A-F]{3}){1,2}$/i, // Validates hex color code
    },
  },
  { _id: false }
);

//-----------------------VARIANT SCHEMA--------------------------
const variantSchema = mongoose.Schema(
  {
    color: colorSchema,
    size: { type: String, trim: true },
    stockQuantity: { type: Number, min: 0, required: true },
  },
  { _id: false }
);

//-----------------------CATEGORY SCHEMA--------------------------
const categorySchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    slug: { type: String, required: true, trim: true, unique: true },
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, // Self-reference
    description: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

//-----------------------PRODUCT SCHEMA--------------------------
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    mrp: {
      type: Number,
      required: true,
      min: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stockQuantity: { type: Number, required: true, min: 0 },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }], // Reference to Category
    variants: [variantSchema], // Embedded variant schema
    images: [
      {
        type: String,
        trim: true,
        validate: {
          validator: (value) =>
            /^(https?:\/\/.*\.(?:png|jpg|jpeg|webp|svg|gif))$/i.test(value),
          message: "Invalid image URL",
        },
      },
    ],
    company: { type: String, trim: true },
    stockKeepingUnit: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    ratings: {
      average: { type: Number, min: 0, max: 5, default: 0 },
      count: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export { Category, Product };
