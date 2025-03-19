import express from "express";
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById,
} from "../controllers/productsController.js";
import { verifyAdmin } from "../middlewares/adminMiddleware.js";
import { isAuthenticatedUser } from "../middlewares/authenticationMiddleware.js";

const router = express.Router();

// ------------------- API ROUTES ---------------------------
router.get("/products", getAllProducts);
router.get("/product/:id", getProductById);

// ---------------------- ADMIN ROUTES -------------------------
router.put(
  "/products/:id",
  isAuthenticatedUser,
  verifyAdmin,
  updateProductById
);
router.delete(
  "/products/:id",
  isAuthenticatedUser,
  verifyAdmin,
  deleteProductById
);

router.post("/product/create", isAuthenticatedUser, verifyAdmin, createProduct);

export default router;
