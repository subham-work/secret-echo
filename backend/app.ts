import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import messageRoutes from "./routes/messageRoutes";
import { errorHandler } from "./middleware/errorMiddleware";
import { apiLimiter } from "./middleware/rateLimiter";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", apiLimiter, authRoutes);
app.use("/api/messages", apiLimiter, messageRoutes);
app.use(errorHandler);

export default app;
