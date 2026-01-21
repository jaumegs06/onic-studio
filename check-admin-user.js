
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing environment variables!');
    process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

async function checkAdminUser() {
    try {
        console.log('🔍 Checking for "admin" user in database...');
        const { data: user, error } = await supabaseAdmin
            .from('users')
            .select('*')
            .eq('username', 'admin')
            .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 is "Row not found"
            console.error('❌ Error querying user:', error);
            return;
        }

        if (user) {
            console.log('✅ User "admin" exists in the database.');
            console.log('User ID:', user.id);
        } else {
            console.log('❌ User "admin" does NOT exist in the database.');
        }

    } catch (err) {
        console.error('❌ Unexpected error:', err);
    }
}

checkAdminUser();
