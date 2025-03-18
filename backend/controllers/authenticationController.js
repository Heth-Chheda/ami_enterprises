// -------------------------------Imports-------------------------------------
import ErrorHandler from "../middlewares/errorMiddleware.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { catchAsyncErrorsMiddleware } from "../middlewares/catchAsyncErrorsMiddleware.js";
import { sendVerificationCode } from "../utils/sendVerificationCode.js";
import { sendToken } from "../utils/sendToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import { generateForgotPasswordEmailTemplate } from "../utils/emailTemplate.js";

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

    await user.save();
    return res.status(200).json({
      success: true,
      message: "Registration successful!",
      user,
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
// This api only works if the user is logged in, otherwise it will give errors
export const getUser = catchAsyncErrorsMiddleware(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

//---------------------FORGOT PASSWORD API--------------------------------------
export const forgotPassword = catchAsyncErrorsMiddleware(
  async (req, res, next) => {
    if (!req.body.email) {
      return next(new ErrorHandler("Please give the email.", 400));
    }
    const user = await User.findOne({
      email: req.body.email,
      accountVerified: true,
    });
    if (!user) {
      return next(new ErrorHandler("User not found with given email.", 400));
    }

    const resetToken = await user.getResetPasswordToken();
    // console.log(`Reset Token from forgot password: ${resetToken}`);

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const message = generateForgotPasswordEmailTemplate(resetPasswordUrl);

    try {
      await sendEmail({
        email: user.email,
        subject: "Ami Enterprises Password Reset",
        message,
      });
      res.status(200).json({
        success: true,
        message: `Email sent to: ${user.email} successfully.`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpiry = undefined;
      await user.save({ validateBeforeSave: false });
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// ------------------------RESET PASSWORD API-----------------------------------
export const resetPassword = catchAsyncErrorsMiddleware(
  async (req, res, next) => {
    // console.log(`Request Params : ${JSON.stringify(req.params)}`);
    const { token } = req.params;

    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    if (!req.body.password || !req.body.confirmPassword) {
      return next(new ErrorHandler("Please enter all the fields.", 400));
    }

    // console.log(`Reset Password Token: ${resetPasswordToken}`);

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return next(
        new ErrorHandler("Reset Password Token invalid or expired.", 400)
      );
    }

    if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHandler("Passwords do not match.", 400));
    }

    if (req.body.password.length < 8 || req.body.password.length > 16) {
      return next(
        new ErrorHandler("Password must be between 8 to 16 characters", 400)
      );
    }

    // ✅ Fix bcrypt hashing
    user.password = await bcrypt.hash(req.body.password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;

    await user.save({ validateBeforeSave: false });

    sendToken(user, 200, "Password reset successfully.", res);
  }
);

//--------------------UPDATE PASSWORD API---------------------------------------
export const updatePassword = catchAsyncErrorsMiddleware(
  async (req, res, next) => {
    const user = await User.findById(req.user._id).select("+password");
    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      return next(new ErrorHandler("Please enter all fields.", 400));
    }

    const isPasswordMatched = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Current Password does not match.", 400));
    }

    if (newPassword.length < 8 || newPassword > 16) {
      return next(
        new ErrorHandler("Password must be between 8 to 16 characters.", 400)
      );
    }

    if (currentPassword == newPassword) {
      return next(new ErrorHandler("Cannot use this Password.", 400));
    }

    if (newPassword != confirmNewPassword) {
      return next(new ErrorHandler("Passwords do not match.", 400));
    }

    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully !",
    });
  }
);

// ------------------------------------------------------------------------------
// ADMIN PART ------------------------------------------------------------------------------

//---------------------- GET_ALL_USERS----------------------------------------
export const getAllUsers = catchAsyncErrorsMiddleware(
  async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
      success: true,
      users,
    });
  }
);

// ------------------------- GET_USER_BY_NAME_OR_EMAIL-------------------------
export const getUserByUsernameOrEmail = catchAsyncErrorsMiddleware(
  async (req, res, next) => {
    const { search } = req.query;

    if (!search) {
      return next(
        new ErrorHandler("Please provide with a email or name.", 400)
      );
    }

    const user = await User.findOne({
      $or: [{ name: search }, { email: search }],
    });

    if (!user) {
      return next(new ErrorHandler("User not found.", 404));
    }

    res.status(200).json({
      success: true,
      user,
    });
  }
);

// ---------------------------UPDATE THE USER BY EMAIL -------------------------

export const updateUserByEmail = catchAsyncErrorsMiddleware(
  async (req, res, next) => {
    const { email } = req.params;

    const updateUserDetials = req.body;

    console.log(updateUserDetials);

    if (!updateUserDetials || Object.keys(updateUserDetials).length === 0) {
      return next(new ErrorHandler("Nothing to update?", 400));
    }

    if (updateUserDetials.password) {
      return next(new ErrorHandler("Cannot update the password.", 400));
    }

    const user = await User.findOneAndUpdate({ email }, updateUserDetials, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return next(new ErrorHandler("User does not exist.", 404));
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      user,
    });
  }
);

// --------------------------DELETE USER BY EMAIL -----------------------------
export const deleteUserByEmail = catchAsyncErrorsMiddleware(
  async (req, res, next) => {
    const { email } = req.params;

    if (!email) {
      return next(new ErrorHandler("Select the user to delete.", 400));
    }

    const user = await User.findOneAndDelete({ email });

    if (!user) {
      return next(new ErrorHandler("User not found.", 404));
    }

    res.status(200).json({
      success: true,
      message: `User with ${email} deleted successfully.`,
    });
  }
);
