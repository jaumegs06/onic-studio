
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly load .env from server directory
const envPath = path.resolve(__dirname, '.env');
console.log('Loading .env from:', envPath);
dotenv.config({ path: envPath });

console.log('Checking Environment Variables...');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? 'Loaded' : 'MISSING');
console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? 'Loaded' : 'MISSING');
console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Loaded' : 'MISSING');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('CRITICAL: Missing Supabase credentials. Client cannot be initialized.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkProjects() {
    console.log('\nAttempting to fetch projects from DB...');
    const { data, error } = await supabase
        .from('projects')
        .select('*');

    if (error) {
        console.error('SUPABASE ERROR:', error);
        return;
    }

    if (!data || data.length === 0) {
        console.warn('WARNING: Database connection successful, but returned 0 projects.');
    } else {
        console.log(`SUCCESS: Found ${data.length} projects in the database.`);
        data.forEach(p => console.log(` - [${p.id}] ${p.title} (Featured: ${p.is_featured})`));
    }

    console.log('\nAttempting to fetch PRODUCTS (materials)...');
    const { data: prodData, error: prodError } = await supabase
        .from('products')
        .select('*');

    if (prodError) {
        console.error('SUPABASE PRODUCTS ERROR:', prodError);
    } else {
        console.log(`SUCCESS: Found ${prodData?.length || 0} products.`);
    }
}

checkProjects();
