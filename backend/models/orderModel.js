import mongoose from "mongoose";
import { Product } from "./productModel.js";
import User from "./userModel.js";

// ------------------ Order Item Schema ---------------------
const orderItemSchema = mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 }, // Store price at the time of purchase
  },
  { _id: false }
);

// ------------------ Order Schema ---------------------
const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [orderItemSchema], // Multiple products per order
    shippingAddress: {
      // Directly embed from user address schema
      ApartmentNumber: { type: String, required: true, trim: true },
      Street: { type: String, required: true, trim: true },
      Area: { type: String, required: true, trim: true },
      City: { type: String, required: true, trim: true },
      State: { type: String, required: true, trim: true },
      PinCode: { type: String, required: true, trim: true },
    },
    totalAmount: { type: Number, required: true, min: 0 },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    deliveredAt: { type: Date },
  },
  { timestamps: true }
);

// ------------------ Create Order Model ---------------------
const Order = mongoose.model("Order", orderSchema);

export default Order;
