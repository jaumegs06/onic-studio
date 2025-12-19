import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Error: Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
}

// Use service role key to bypass RLS
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkUsers() {
    console.log('🔍 Checking users in database...\n');

    try {
        const { data, error } = await supabase
            .from('users')
            .select('id, username, role, created_at');

        if (error) {
            console.error('❌ Error fetching users:', error);
            return;
        }

        if (!data || data.length === 0) {
            console.log('⚠️  No users found in database!');
            return;
        }

        console.log(`✅ Found ${data.length} user(s):\n`);
        data.forEach(user => {
            console.log(`  - ID: ${user.id}`);
            console.log(`    Username: ${user.username}`);
            console.log(`    Role: ${user.role}`);
            console.log(`    Created: ${user.created_at}`);
            console.log('');
        });
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

checkUsers();
