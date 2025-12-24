import dotenv from 'dotenv';
import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

// Load .env file explicitly
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') }); // Load from server/.env
dotenv.config({ path: path.join(__dirname, '..', '.env') }); // Load from root .env

// Import routes
import authRoutes from "./routes/auth.js";
import productsRoutes from "./routes/products.js";
import uploadRoutes from "./routes/upload.js";
import contactRoutes from "./routes/contact.js";

async function startServer() {
  // Debug: Check if RESEND_API_KEY is loaded
  console.log('🔍 RESEND_API_KEY loaded?', !!process.env.RESEND_API_KEY);
  if (process.env.RESEND_API_KEY) {
    console.log('✅ RESEND_API_KEY detected! First 10 chars:', process.env.RESEND_API_KEY.substring(0, 10));
  } else {
    console.log('❌ RESEND_API_KEY NOT FOUND in environment variables');
  }

  const app = express();
  const server = createServer(app);

  // Middleware
  app.use(express.json());
  app.use(cors());

  // Serve static files from dist/public in production
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

  // Handle client-side routing - serve index.html for all routes
  // This must be AFTER API routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 5000;

  server.listen(port, () => {
    console.log(`API Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
