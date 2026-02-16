import './config/env.js'; // MUST BE FIRST
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

// Import routes
import authRoutes from "./routes/auth.js";
import productsRoutes from "./routes/products.js";
import uploadRoutes from "./routes/upload.js";
import contactRoutes from "./routes/contact.js";
import projectRoutes from "./routes/projects.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create the express app without listening
export function createApp() {
    // Debug: Check if RESEND_API_KEY is loaded
    console.log('🔍 RESEND_API_KEY loaded?', !!process.env.RESEND_API_KEY);

    const app = express();

    // Middleware
    app.use(express.json());
    app.use(cors());

    // Serve static files from dist/public in production
    // Note: On Vercel this might be redundant if using outputDirectory, but harmless
    const staticPath =
        process.env.NODE_ENV === "production"
            ? path.resolve(__dirname, "public")
            : path.resolve(__dirname, "..", "dist", "public");

    app.use(express.static(staticPath));

    // API Routes
    app.use("/api/auth", authRoutes);
    app.use("/api/products", productsRoutes);
    app.use("/api/upload", uploadRoutes);
    app.use("/api/contact", contactRoutes);
    app.use("/api/projects", projectRoutes);

    // Handle client-side routing - serve index.html for all routes
    // This must be AFTER API routes
    app.get("*", (_req, res) => {
        // Check if file exists before trying to send it to avoid crashes in some envs
        try {
            res.sendFile(path.join(staticPath, "index.html"));
        } catch (e) {
            res.status(404).send("Not found");
        }
    });

    return app;
}

export const app = createApp();
