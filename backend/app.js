//-----------------------Imports-----------------------
import express from "express";
import { config } from "dotenv";
import { connectionToDatabase } from "./database/database.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import authenticationRoutes from "./routes/authenticationRoutes.js";
import productsRoutes from "./routes/productsRoute.js";
import orderRoutes from "./routes/orderRoutes.js";
import wishlistRoute from "./routes/wishlistRoutes.js";
import seedRoute from "./routes/seedRoute.js";
import paymentRoutes from "./routes/paymentRoutes.js"

export const app = express();

// -------------------Configuration--------------------
config({
  path: "./config/config.env",
});
// -------------------MiddleWares-------------------
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
/// ----------------------- Authentication Routes --------------------------
app.use("/api/v1/authentication", authenticationRoutes);

/// --------------------- Product Routes -----------------------------------
app.use("/api", productsRoutes);

//----------------------- Order Routes -------------------------------------
app.use("/api/v1/user/orders", orderRoutes);

//--------------------------- WishList ----------------------------------
app.use("/api/user/wishlist", wishlistRoute);

//--------------------------- Payment -----------------------------------
app.use("/api/payment", paymentRoutes);

//----------------- Seed Routes for adding data to collections------------
app.use("/api/v1/seed", seedRoute);
// -------------------Connection to the Database -----------------------
connectionToDatabase();

// ------------------- Error Middleware ---------------------------------
// Note : -- Error Middleware should be at the end of all the middlewares
app.use(errorMiddleware);
