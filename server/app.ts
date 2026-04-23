import './config/env.js'; // MUST BE FIRST
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

// Import routes
// import authRoutes from "./routes/auth.js";
import productsRoutes from "./routes/products.js";
// import uploadRoutes from "./routes/upload.js";
// import contactRoutes from "./routes/contact.js"; // Removed
import projectRoutes from "./routes/projects.js";
import homeDataRoutes from "./routes/homeData.js";

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
    // Serve static files from dist/public in production
    // Note: On Vercel, static files are handled by the Output API, but this is a fallback.
    let staticPath = path.join(process.cwd(), "public"); // Default Vercel static path

    try {
        if (process.env.NODE_ENV === "production") {
            // In Vercel, sometimes __dirname is weird. process.cwd() is safer.
            staticPath = path.join(process.cwd(), "dist", "public");
        } else {
            staticPath = path.resolve(__dirname, "..", "dist", "public");
        }
        console.log(`📂 Static path resolved to: ${staticPath}`);
    } catch (e) {
        console.error('⚠️ Error resolving static path:', e);
    }

    // Health check route
    app.get("/api/health", (_req, res) => {
        res.json({ status: "ok", env: process.env.NODE_ENV, timestamp: new Date().toISOString() });
    });

    app.use(express.static(staticPath));

    // API Routes
    // app.use("/api/auth", authRoutes);
    app.use("/api/products", productsRoutes);
    // app.use("/api/upload", uploadRoutes);
    // app.use("/api/contact", contactRoutes); // Removed: Using direct Supabase integration
    app.use("/api/projects", projectRoutes);
    app.use("/api/home-data", homeDataRoutes);

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
