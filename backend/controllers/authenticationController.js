// -------------------------------Imports------------------------------------------
import ErrorHandler from "../middlewares/errorMiddleware.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { catchAsyncErrorsMiddleware } from "../middlewares/catchAsyncErrorsMiddleware.js";
import { sendVerificationCode } from "../utils/sendVerificationCode.js";
import { sendToken } from "../utils/sendToken.js";

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
    if (userAttemptsForRegistration) {
      userAttemptsForRegistration.verificationCode =
        await userAttemptsForRegistration.generateVerificationCode();
      await userAttemptsForRegistration.save();
      sendVerificationCode(
        userAttemptsForRegistration.verificationCode,
        email,
        res
      );
      return res.status(200).json({
        success: true,
        message: "Verification code resent successfully.",
        verificationCode: userAttemptsForRegistration.verificationCode,
      });
    }
    // Check for the length of the Password
    if (password.length < 8 || password.length > 16) {
      return next(
        new ErrorHandler("Password must be between 8 to 16 characters.", 400)
      );
    }

    //Hashing the password
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
    return res.status(200).json({
      success: true,
      message: "Verification code sent successfully!",
      verificationCode, // Include the code in the response
    });
  } catch (error) {
    next(error);
  }
});

// ---------------------------VerifyOTP API-------------------------------------

export const verifyOTP = catchAsyncErrorsMiddleware(async (req, res, next) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return next(
      new ErrorHandler("Email or the verification code is missing.", 400)
    );
  }

  try {
    const userAllEntriesForRegistration = await User.find({
      email,
      accountVerified: false,
    }).sort({ createdAt: -1 });

    // FIX: Corrected the "User not found" condition
    if (
      !userAllEntriesForRegistration ||
      userAllEntriesForRegistration.length === 0
    ) {
      return next(new ErrorHandler("User not found.", 404));
    }

    let user;

    if (userAllEntriesForRegistration.length > 1) {
      user = userAllEntriesForRegistration[0];
      await User.deleteMany({
        _id: { $ne: user._id },
        email,
        accountVerified: false,
      });
    } else {
      user = userAllEntriesForRegistration[0];
    }

    if (user.verificationCode !== Number(otp)) {
      return next(new ErrorHandler("Invalid OTP.", 400));
    }

    const currentTime = Date.now();
    const verificaitonCodeExpiry = new Date(
      user.verificaitonCodeExpiry
    ).getTime();

    if (currentTime > verificaitonCodeExpiry) {
      return next(new ErrorHandler("Your OTP has expired.", 400));
    }

    user.accountVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpiry = null;

    return res.status(200).json({
      success: true,
      message: "Registration successful!",
    });
  } catch (error) {
    return next(new ErrorHandler("Internal server error.", 500));
  }
});

// -------------------------Login API---------------------------------------
export const login = catchAsyncErrorsMiddleware(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  try {
    //Check if the user exists
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("User does not exist.", 404));
    }
    // Check if the user is verified
    if (!user.accountVerified) {
      return next(new ErrorHandler("Please verify your account.", 400));
    }

    const doPasswordsMatch = await bcrypt.compare(password, user.password);
    //Check if the password do not match
    if (!doPasswordsMatch) {
      return next(new ErrorHandler("Invalid email or password.", 400));
    }
    sendToken(user, 200, "Login successful", res);
  } catch (error) {
    return next(new ErrorHandler("Internal sever error.", 500));
  }
});

// -----------------------Logout API-----------------------------------------
export const logout = catchAsyncErrorsMiddleware(async (req, res, next) => {
  res
    .clearCookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: `Logged out successfully !`,
    });
});

// ---------------------GET USER API--------------------------------------------
export const getUser = catchAsyncErrorsMiddleware(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});
