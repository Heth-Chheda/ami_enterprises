//-----------------------Imports-----------------------
import express from "express";
import { config } from "dotenv";
import { connectionToDatabase } from "./database/database.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import authenticationRoutes from "./routes/authenticationRoutes.js";

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

// -------------------Connection to the Database -----------------------
connectionToDatabase();

// ------------------- Error Middleware ---------------------------------
// Note : -- Error Middleware should be at the end of all the middlewares
app.use(errorMiddleware);
