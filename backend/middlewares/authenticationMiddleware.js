import User from "../models/userModel.js";
import ErrorHandler from "./errorMiddleware.js";
import { catchAsyncErrorsMiddleware } from "./catchAsyncErrorsMiddleware.js";
import jwt from "jsonwebtoken";

export const isAuthenticatedUser = catchAsyncErrorsMiddleware(
  async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
      return next(
        new ErrorHandler("User is not authenticated. Please login first.", 400)
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Decoded value: ", decoded);

    req.user = await User.findById(decoded.id);
    next();
  }
);
