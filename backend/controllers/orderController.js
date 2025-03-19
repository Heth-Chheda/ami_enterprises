// --------------- IMPORTS ---------------------------
import { catchAsyncErrorsMiddleware } from "../middlewares/catchAsyncErrorsMiddleware.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import Order from "../models/orderModel.js";

export const getOrdersByUserId = catchAsyncErrorsMiddleware(
  async (req, res, next) => {
    const { userId } = req.params;

    // Find orders by user ID and populate product details
    const orders = await Order.find({ user: userId })
      .populate({
        path: "orderItems.product",
        select: "name price imageUrl", // Include necessary fields only
      })
      .sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return next(new ErrorHandler("No orders found for this user", 404));
    }

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  }
);
