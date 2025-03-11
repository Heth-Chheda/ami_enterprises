import express from "express";
import {
  forgotPassword,
  getUser,
  login,
  logout,
  register,
  resetPassword,
  updatePassword,
  verifyOTP,
} from "../controllers/authenticationController.js";
import { isAuthenticatedUser } from "../middlewares/authenticationMiddleware.js";

const router = express.Router();

router.post("/register", register); // register route
router.post("/verify-otp", verifyOTP); // verify otp route
router.post("/login", login); // login route
router.get("/logout", isAuthenticatedUser, logout); // logout route
router.get("/get-user", isAuthenticatedUser, getUser); // get the details of the user who has logged in
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.put("/password/update", isAuthenticatedUser, updatePassword);

export default router;
