// -------------------------------Imports------------------------------------------
import ErrorHandler from "../middlewares/errorMiddleware.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { catchAsyncErrorsMiddleware } from "../middlewares/catchAsyncErrorsMiddleware.js";
import { sendVerificationCode } from "../utils/sendVerificationCode.js";

// -------------------------Register API---------------------------------------
export const register = catchAsyncErrorsMiddleware(async (req, res, next) => {
  try {
    const { name, email, password, mobileNumber, dateOfBirth, gender } =
      req.body;

    //Check if all fields are entered
    if (
      !name ||
      !email ||
      !password ||
      !mobileNumber ||
      !dateOfBirth ||
      !gender
    ) {
      return next(new ErrorHandler("Please Enter All the Fields.", 400));
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email, accountVerified: true });
    if (userExists) {
      return next(new ErrorHandler("User already exists.", 400));
    }

    //Check for the User attempts for registration
    const userAttemptsForRegistration = await User.findOne({
      email,
      accountVerified: false,
    });
    if (
      userAttemptsForRegistration &&
      userAttemptsForRegistration.verificationCode
    ) {
      return next(
        new ErrorHandler(
          "You have attempted registration too many times. Please try again later.",
          400
        )
      );
    }
    // Check for the length of the Password
    if (password.length < 8 || password.length > 16) {
      return next(
        new ErrorHandler("Password must be between 8 to 16 characters.", 400)
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      mobileNumber,
      dateOfBirth,
      gender,
    });

    const verificationCode = await user.generateVerificationCode();

    await user.save();

    sendVerificationCode(verificationCode, email, res);
  } catch (error) {
    next(error);
  }
});
