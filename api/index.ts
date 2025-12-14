import express from "express";
import cors from "cors";

// Import routes
import authRoutes from "../server/routes/auth.js";
import productsRoutes from "../server/routes/products.js";
import uploadRoutes from "../server/routes/upload.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/upload", uploadRoutes);

export default app;
