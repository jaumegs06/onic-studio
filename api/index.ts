import dotenv from "dotenv";
import express from "express";
import cors from "cors";

// Load environment variables FIRST
dotenv.config();

// Import routes
import authRoutes from "../server/routes/auth.js";
import productsRoutes from "../server/routes/products.js";
import uploadRoutes from "../server/routes/upload.js";
import contactRoutes from "../server/routes/contact.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/contact", contactRoutes);

export default app;
