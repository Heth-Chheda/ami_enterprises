import express from "express";
import {
  getUser,
  login,
  logout,
  register,
  verifyOTP,
} from "../controllers/authenticationController.js";
import { isAuthenticatedUser } from "../middlewares/authenticationMiddleware.js";

const router = express.Router();

router.post("/register", register); // register route
router.post("/verify-otp", verifyOTP); // verify otp route
router.post("/login", login); // login route
router.get("/logout", isAuthenticatedUser, logout); // logout route
router.get("/get-user", isAuthenticatedUser, getUser); // get the details of the user who has logged in

export default router;
