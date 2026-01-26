import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing Supabase credentials in .env file');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigration() {
    console.log('🚀 Running projects table schema migration...\n');

    try {
        // Read SQL file
        const sqlPath = join(__dirname, '../database/migrate-projects-schema.sql');
        const sql = readFileSync(sqlPath, 'utf8');

        console.log('📝 Executing SQL migration...');

        // Execute SQL (note: Supabase JS client doesn't directly support raw SQL execution)
        // You need to run this in Supabase SQL Editor manually, or use postgres client
        console.log('\n⚠️  IMPORTANT:');
        console.log('Please run the following SQL in your Supabase SQL Editor:');
        console.log('Dashboard → SQL Editor → New Query → Paste the SQL from:');
        console.log(`${sqlPath}\n`);
        console.log('Or copy this SQL:\n');
        console.log('─'.repeat(80));
        console.log(sql);
        console.log('─'.repeat(80));
        console.log('\nAfter running the SQL, re-run: node server/scripts/migrate-projects.js');

    } catch (err) {
        console.error('❌ Error:', err);
        process.exit(1);
    }
}

runMigration();
