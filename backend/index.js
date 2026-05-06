import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import detectRoutes from "./routes/detectionRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import logger from "./middleware/loggerMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/api/auth", authRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/detect", detectRoutes);
app.use("/api/user", userRoutes);
app.use("/uploads", express.static("uploads"));

app.use(errorMiddleware);

app.listen(3000, () => console.log("Server running on port 3000"));