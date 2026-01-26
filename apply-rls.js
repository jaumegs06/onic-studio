import pg from 'pg';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// We need the database connection string.
// Often in Supabase projects it's stored as DATABASE_URL
// If not available, we can't run this script and must ask user.
const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!connectionString) {
    console.error('❌ DATABASE_URL or POSTGRES_URL not found in .env');
    console.log('Please copy content of server/database/setup_auth_rls.sql to Supabase SQL Editor manually.');
    process.exit(1);
}

const { Client } = pg;
const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false } // Required for Supabase
});

async function runMigration() {
    console.log('Connecting to database...');
    try {
        await client.connect();

        console.log('Applying RLS policies...');
        const sqlPath = path.join(process.cwd(), 'server', 'database', 'setup_auth_rls.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        await client.query(sql);
        console.log('✅ RLS policies applied successfully!');
    } catch (err) {
        console.error('❌ Error applying migration:', err);
    } finally {
        await client.end();
    }
}

runMigration();
