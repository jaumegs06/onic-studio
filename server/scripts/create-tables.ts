import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

console.log('🚀 Setting up Supabase database...\n');
console.log(`URL: ${supabaseUrl}`);
console.log(`Service Key: ${supabaseServiceKey?.substring(0, 20)}...`);

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createTables() {
    console.log('\n📝 Creating tables via SQL queries...\n');

    const tables = [
        {
            name: 'users',
            sql: `
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(255) UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          role VARCHAR(50) DEFAULT 'user',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
      `
        },
        {
            name: 'products',
            sql: `
        CREATE TABLE IF NOT EXISTS products (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          category VARCHAR(100) NOT NULL,
          color VARCHAR(100) NOT NULL,
          finish VARCHAR(100) NOT NULL,
          image TEXT NOT NULL,
          best_seller BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
        CREATE INDEX IF NOT EXISTS idx_products_color ON products(color);
        CREATE INDEX IF NOT EXISTS idx_products_finish ON products(finish);
      `
        },
        {
            name: 'contact_messages',
            sql: `
        CREATE TABLE IF NOT EXISTS contact_messages (
          id VARCHAR(255) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(50),
          project_type VARCHAR(100) NOT NULL,
          message TEXT NOT NULL,
          timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          email_sent BOOLEAN DEFAULT FALSE
        );
        CREATE INDEX IF NOT EXISTS idx_contact_messages_timestamp ON contact_messages(timestamp DESC);
      `
        },
        {
            name: 'projects',
            sql: `
        CREATE TABLE IF NOT EXISTS projects (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          image TEXT NOT NULL,
          category VARCHAR(100) NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
      `
        },
        {
            name: 'services',
            sql: `
        CREATE TABLE IF NOT EXISTS services (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          icon VARCHAR(255) NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `
        },
        {
            name: 'home_data',
            sql: `
        CREATE TABLE IF NOT EXISTS home_data (
          id SERIAL PRIMARY KEY,
          key VARCHAR(255) UNIQUE NOT NULL,
          value JSONB NOT NULL,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_home_data_key ON home_data(key);
      `
        }
    ];

    for (const table of tables) {
        try {
            console.log(`  Creating ${table.name}...`);

            // Use the from().select() as a workaround to execute raw SQL
            const { error } = await supabase.rpc('exec_sql', { sql: table.sql });

            if (error) {
                console.log(`  ⚠️  Method 1 failed for ${table.name}: ${error.message}`);
                console.log(`  ℹ️  Table ${table.name} might require manual creation`);
            } else {
                console.log(`  ✅ ${table.name} created`);
            }
        } catch (err: any) {
            console.log(`  ⚠️  Error with ${table.name}: ${err.message}`);
        }
    }

    console.log('\n================================================');
    console.log('ℹ️  If tables weren\'t created automatically, please:');
    console.log('1. Go to Supabase Dashboard → SQL Editor');
    console.log('2. Copy the contents of server/database/schema.sql');
    console.log('3. Paste and run in the SQL Editor\n');
}

createTables().catch(console.error);
