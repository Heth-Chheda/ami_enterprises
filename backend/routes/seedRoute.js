import express from "express";
import { createOrder } from "../data/seed.js";
import { isAuthenticatedUser } from "../middlewares/authenticationMiddleware.js";

const router = express.Router();

router.post("/", isAuthenticatedUser, async (req, res, next) => {
  try {
    await createOrder(req, res, next); // Pass req, res, next here
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
