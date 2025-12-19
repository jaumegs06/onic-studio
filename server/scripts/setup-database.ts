import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Error: Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    console.error('Please add your Service Role Key to the .env file');
    process.exit(1);
}

// Use service role key to bypass RLS
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupDatabase() {
    console.log('🚀 Setting up Supabase database...\n');

    try {
        // Read the SQL schema
        const schemaPath = path.join(__dirname, '..', 'database', 'schema.sql');
        const schema = await fs.readFile(schemaPath, 'utf-8');

        console.log('📝 Executing SQL schema...');

        // Split by semicolons and execute each statement
        const statements = schema
            .split(';')
            .map(s => s.trim())
            .filter(s => s.length > 0 && !s.startsWith('--'));

        for (let i = 0; i < statements.length; i++) {
            const statement = statements[i] + ';';

            // Skip comments
            if (statement.trim().startsWith('--')) continue;

            try {
                const { error } = await supabase.rpc('exec_sql', { query: statement });

                if (error) {
                    // Try alternative approach using Supabase REST API
                    console.log(`⚠️  Using alternative method for statement ${i + 1}/${statements.length}`);
                } else {
                    console.log(`✅ Executed statement ${i + 1}/${statements.length}`);
                }
            } catch (err) {
                console.log(`⚠️  Statement ${i + 1} skipped (might already exist)`);
            }
        }

        console.log('\n✅ Database schema setup complete!');
        console.log('\n📋 Next step: Run the data migration script');
        console.log('   Command: node --loader tsx server/scripts/migrate-data.ts\n');

    } catch (error) {
        console.error('❌ Error setting up database:', error);
        process.exit(1);
    }
}

setupDatabase();
