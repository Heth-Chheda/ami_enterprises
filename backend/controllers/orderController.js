import { catchAsyncErrorsMiddleware } from "../middlewares/catchAsyncErrorsMiddleware.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import Order from "../models/orderModel.js";
import { Product } from "../models/productModel.js";
import User from "../models/userModel.js"

export const getUserOrders = catchAsyncErrorsMiddleware(
  async (req, res, next) => {
    const userId = req.user._id;

    const orders = await Order.find({ user: userId })
      .populate({
        path: "orderItems.product",
        select: "name price images",
      })
      .sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return next(new ErrorHandler("No orders found for this user", 400));
    }

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  }
);

export const createOrder = catchAsyncErrorsMiddleware(async (req, res, next) => {
  const { orderItems, shippingAddress, totalAmount } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return next(new ErrorHandler("Order items cannot be empty.", 400));
  }

  // Validate product IDs and prices
  for (const item of orderItems) {
    const product = await Product.findById(item.product);
    if (!product) {
      return next(new ErrorHandler(`Product with ID ${item.product} not found.`, 404));
    }

    // Optional: check if the requested quantity is available
    if (item.quantity > product.stock) {
      return next(new ErrorHandler(`Not enough stock for ${product.name}.`, 400));
    }
  }

  // Create and save the order
  const newOrder = await Order.create({
    user: req.user._id,
    orderItems,
    shippingAddress,
    totalAmount,
    paymentStatus: "received",
    orderStatus: "pending",
  });

  // Add order reference to user model (optional)
  await User.findByIdAndUpdate(req.user._id, {
    $push: { orders: newOrder._id },
  });

  res.status(201).json({
    success: true,
    message: "Order created successfully.",
    order: newOrder,
  });
});