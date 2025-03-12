import express from "express";
import {
  deleteUserByEmail,
  forgotPassword,
  getAllUsers,
  getUser,
  getUserByUsernameOrEmail,
  login,
  logout,
  register,
  resetPassword,
  updatePassword,
  updateUserByEmail,
  verifyOTP,
} from "../controllers/authenticationController.js";
import { isAuthenticatedUser } from "../middlewares/authenticationMiddleware.js";
import { verifyAdmin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

// All the Authentication Functionalities for all the Users
router.post("/register", register); // register route
router.post("/verify-otp", verifyOTP); // verify otp route
router.post("/login", login); // login route
router.get("/logout", isAuthenticatedUser, logout); // logout route
router.get("/get-user", isAuthenticatedUser, getUser); // get the details of the user who has logged in
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.put("/password/update", isAuthenticatedUser, updatePassword);

// Admin Functionalities
router.get("/admin/getAllUsers", isAuthenticatedUser, verifyAdmin, getAllUsers);

router.get(
  "/admin/getUserByNameOrEmail",
  isAuthenticatedUser,
  verifyAdmin,
  getUserByUsernameOrEmail
);

router.put(
  "/admin/updateUserByEmail/:email",
  isAuthenticatedUser,
  verifyAdmin,
  updateUserByEmail
);

router.delete(
  "/admin/deleteUserByEmail/:email",
  isAuthenticatedUser,
  verifyAdmin,
  deleteUserByEmail
);

export default router;
