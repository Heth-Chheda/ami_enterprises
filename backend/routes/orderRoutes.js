import express from "express";
import { createOrder, getUserOrders } from "../controllers/orderController.js";
import { isAuthenticatedUser } from "../middlewares/authenticationMiddleware.js";

const router = express.Router();

router.get("/getUserOrders", isAuthenticatedUser, getUserOrders);

router.post("/createOrder", isAuthenticatedUser, createOrder);

export default router;
