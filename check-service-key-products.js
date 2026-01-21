
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('🔍 Testing Supabase Connection with SERVICE KEY on PRODUCTS...\n');
console.log('URL:', supabaseUrl);

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing environment variables!');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testConnection() {
    try {
        console.log('\n✅ Testing SELECT query on products (Service Role)...');
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
