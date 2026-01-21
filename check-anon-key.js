
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

console.log('🔍 Testing Supabase Connection with ANON KEY...\n');
console.log('URL:', supabaseUrl);
console.log('Anon Key:', supabaseAnonKey ? `${supabaseAnonKey.substring(0, 10)}...` : 'NOT SET');

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Missing environment variables!');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
    try {
        // Test basic query (products table needs to be public for this to work with Anon key usually, 
        // or ensure RLS allows it)
        console.log('\n✅ Testing SELECT query on products...');
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .limit(5);

        if (error) {
            console.error('❌ SELECT error:', error);
        } else {
            console.log(`✅ Successfully retrieved ${data.length} products`);
            if (data.length > 0) console.log('Sample:', data[0]);
        }
    } catch (err) {
        console.error('❌ Unexpected error:', err);
    }
}

testConnection();
