import express from "express";
import {
  getUserWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} from "../controllers/wishlistController.js";
import { isAuthenticatedUser } from "../middlewares/authenticationMiddleware.js";

const router = express.Router();

router.get("/", isAuthenticatedUser, getUserWishlist);
router.post("/add", isAuthenticatedUser, addToWishlist);
router.delete("/remove/:productId", isAuthenticatedUser, removeFromWishlist);
router.delete("/clear", isAuthenticatedUser, clearWishlist);

export default router;
