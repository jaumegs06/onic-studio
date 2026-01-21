import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath } from "url";

// Load .env file explicitly
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load from server/.env (go up one level from config/env.ts -> server/)
dotenv.config({ path: path.join(__dirname, '..', '.env') });
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') }); // Load from root .env

console.log('✅ Environment variables loaded via config/env.ts');
