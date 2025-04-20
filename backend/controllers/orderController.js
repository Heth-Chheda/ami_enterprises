import mongoose from "mongoose";
import { catchAsyncErrorsMiddleware } from "../middlewares/catchAsyncErrorsMiddleware.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import Order from "../models/orderModel.js";

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
