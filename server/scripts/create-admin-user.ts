import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcrypt';
import readline from 'readline';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Error: Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    console.error('Please add your Service Role Key to the .env file');
    process.exit(1);
}

// Use service role key to bypass RLS
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(query: string): Promise<string> {
    return new Promise(resolve => rl.question(query, resolve));
}

async function createAdminUser() {
    console.log('🔐 Creating Admin User for Onic Studio\n');

    try {
        // Get username
        const username = await question('Enter admin username (default: admin): ') || 'admin';

        // Get password
        const password = await question('Enter admin password (default: admin123): ') || 'admin123';

        // Hash the password
        console.log('\n🔒 Hashing password...');
        const saltRounds = 10;
        const password_hash = await bcrypt.hash(password, saltRounds);

        // Check if user already exists
        const { data: existingUser } = await supabase
            .from('users')
            .select('*')
            .eq('username', username)
            .single();

        if (existingUser) {
            console.log('\n⚠️  User already exists. Updating password...');

            const { error: updateError } = await supabase
                .from('users')
                .update({ password_hash, role: 'admin' })
                .eq('username', username);

            if (updateError) {
                throw updateError;
            }

            console.log('✅ Admin user password updated successfully!');
        } else {
            console.log('\n📝 Creating new admin user...');

            const { error: insertError } = await supabase
                .from('users')
                .insert({
                    username,
                    password_hash,
                    role: 'admin'
                });

            if (insertError) {
                throw insertError;
            }

            console.log('✅ Admin user created successfully!');
        }

        console.log('\n📋 Admin Credentials:');
        console.log(`   Username: ${username}`);
        console.log(`   Password: ${password}`);
        console.log('\n✨ You can now log in to the admin panel!\n');

    } catch (error) {
        console.error('\n❌ Error creating admin user:', error);
        process.exit(1);
    } finally {
        rl.close();
    }
}

createAdminUser();
