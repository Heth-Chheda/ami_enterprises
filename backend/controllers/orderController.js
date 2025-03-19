import mongoose from "mongoose";
import { catchAsyncErrorsMiddleware } from "../middlewares/catchAsyncErrorsMiddleware.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import Order from "../models/orderModel.js";

export const getOrdersByUserId = catchAsyncErrorsMiddleware(
  async (req, res, next) => {
    const { userId } = req.params;

    // Convert userId to ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return next(new ErrorHandler("Invalid user ID", 400));
    }

    const orders = await Order.find({
      user: new mongoose.Types.ObjectId(userId),
    }) // ✅ Convert to ObjectId
      .populate({
        path: "orderItems.product",
        select: "name price imageUrl",
      })
      .sort({ createdAt: -1 });

      console.log("Orders Found:", orders);

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
