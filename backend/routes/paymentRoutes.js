import express from "express";
import { createRazorpayOrder, verifyPayment } from "../controllers/paymentController.js";
import { isAuthenticatedUser } from "../middlewares/authenticationMiddleware.js";


const router = express.Router();

router.post("/create-order", isAuthenticatedUser, createRazorpayOrder);
router.post("/verify" , isAuthenticatedUser , verifyPayment);

export default router;
