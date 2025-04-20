import Order from "../models/orderModel.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

// Create Order Function
export const createOrder = async (req, res, next) => {
  const userId = req.user._id;

  const { orderItems, shippingAddress, totalAmount } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return next(new ErrorHandler("No order items provided", 400));
  }

  if (!shippingAddress) {
    return next(new ErrorHandler("Shipping address is required", 400));
  }

  try {
    const order = new Order({
      user: userId,
      orderItems: orderItems,
      shippingAddress: shippingAddress,
      totalAmount: totalAmount,
      paymentStatus: "pending",
      orderStatus: "pending",
      isPaid: false,
    });

    await order.save();

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    return next(new ErrorHandler("Error creating order", 500));
  }
};
