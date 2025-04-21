import Razorpay from "razorpay";
import crypto from "crypto";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { catchAsyncErrorsMiddleware } from "../middlewares/catchAsyncErrorsMiddleware.js";

const razorpay = new Razorpay({
  key_id: "rzp_test_wjUjyZh27sndbg",
  key_secret: "ZSfAZA2Jd5MkvGNcVFW6c0lD",
});

// Endpoint to create a Razorpay order
export const createRazorpayOrder = catchAsyncErrorsMiddleware(async (req, res, next) => {
  const { amount } = req.body;

  if (!amount) {
    return next(new ErrorHandler("Amount is required", 400));
  }

  // You can access the authenticated user here using req.user
  console.log("Authenticated user:", req.user);  // Optionally log the user for debugging

  const options = {
    amount: amount * 100, // Razorpay accepts amount in paise (1 INR = 100 paise)
    currency: "INR",
    receipt: `receipt_order_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    return next(new ErrorHandler("Failed to create Razorpay order", 500));
  }
});

// Endpoint to verify payment
export const verifyPayment = catchAsyncErrorsMiddleware(async (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isValid = expectedSignature === razorpay_signature;

  if (!isValid) {
    return next(new ErrorHandler("Invalid payment signature", 400));
  }

  // You can now mark the order as paid or update the order status in your database
  res.status(200).json({ success: true, message: "Payment verified" });
});
