import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('🔍 Testing Supabase Connection...\n');
console.log('URL:', supabaseUrl);
console.log('Service Key:', supabaseServiceKey ? `${supabaseServiceKey.substring(0, 20)}...` : 'NOT SET');

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing environment variables!');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testConnection() {
    try {
        // Test basic query
        console.log('\n✅ Testing SELECT query...');
        const { data, error } = await supabase
            .from('contact_messages')
            .select('*')
            .limit(5);

        if (error) {
            console.error('❌ SELECT error:', error);
        } else {
            console.log(`✅ Successfully retrieved ${data.length} messages`);
            console.log('Sample:', data[0]);
        }

        // Test INSERT
        console.log('\n✅ Testing INSERT query...');
        const testMessage = {
            id: `test_${Date.now()}`,
            name: 'Test Connection',
            email: 'test@example.com',
            phone: '123456789',
            project_type: 'Test',
            message: 'Testing connection',
            timestamp: new Date().toISOString(),
            email_sent: false
        };

        const { data: insertData, error: insertError } = await supabase
            .from('contact_messages')
            .insert([testMessage])
            .select();

        if (insertError) {
            console.error('❌ INSERT error:', insertError);
        } else {
            console.log('✅ Successfully inserted test message:', insertData);
        }

    } catch (err) {
        console.error('❌ Unexpected error:', err);
    }
}

testConnection();
