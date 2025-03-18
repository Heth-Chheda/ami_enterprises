import express from "express";
import {
  getAllProducts,
  getProductById,
} from "../controllers/productsController.js";

const router = express.Router();

// ------------------- API ROUTES ---------------------------
router.get("/products", getAllProducts);
router.get("/product/:id", getProductById);

export default router;
