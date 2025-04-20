import express from "express";
import { getUserOrders } from "../controllers/orderController.js";
import { isAuthenticatedUser } from "../middlewares/authenticationMiddleware.js";

const router = express.Router();

router.get("/getUserOrders", isAuthenticatedUser, getUserOrders);

export default router;
