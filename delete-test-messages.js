import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing Supabase credentials in .env file');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function deleteAllMessages() {
    console.log('🗑️  Deleting all test messages from contact_messages table...\n');

    try {
        // Delete all messages
        const { data, error } = await supabase
            .from('contact_messages')
            .delete()
            .neq('id', ''); // This will match all rows

        if (error) {
            console.error('❌ Error deleting messages:', error);
            process.exit(1);
        }

        console.log('✅ All test messages deleted successfully!');
        console.log('📊 The contact_messages table is now empty.\n');

    } catch (err) {
        console.error('❌ Unexpected error:', err);
        process.exit(1);
    }
}

deleteAllMessages();
