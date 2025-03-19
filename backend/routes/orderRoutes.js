import express from "express";
import { getOrdersByUserId } from "../controllers/orderController.js";

const router = express.Router();

router.get("/order/:userId", getOrdersByUserId);

export default router;
