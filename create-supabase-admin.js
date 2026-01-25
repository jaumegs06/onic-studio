import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createAdmin() {
    console.log('Creating admin user...');

    // Check if user exists first using listUsers
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();

    if (listError) {
        console.error('Error listing users:', listError);
        return;
    }

    const email = 'oficinatecnica@onicestudio.com';
    const password = 'OnicStudio2024!'; // Temporary password
    const existingUser = users.find(u => u.email === email);

    if (existingUser) {
        console.log('User already exists (ID: ' + existingUser.id + '). Updating password...');
        const { error: updateError } = await supabase.auth.admin.updateUserById(
            existingUser.id,
            { password: password, email_confirm: true }
        );

        if (updateError) console.error('Error updating:', updateError);
        else console.log('✅ Admin user ready. Email:', email, 'Password:', password);
    } else {
        console.log('Creating new user...');
        const { data, error } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true
        });

        if (error) console.error('Error creating:', error);
        else console.log('✅ Admin user created. Email:', email, 'Password:', password);
    }
}

createAdmin();
