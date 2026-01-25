import { config } from 'dotenv';
config();
config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';

// Test with frontend env vars
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('🔍 Testing Frontend Supabase Configuration...\n');

console.log('VITE_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
console.log('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ Set' : '❌ Missing');
console.log('');

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Frontend environment variables are missing!');
    console.log('\n💡 This means the frontend will fall back to the backend API.');
    console.log('   If the backend API is not deployed on Vercel, projects won\'t show.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testFrontendAccess() {
    console.log('📡 Testing public read access with anon key...\n');

    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('❌ Error with anon key access:', error.message);
        console.log('\n🔍 This could be:');
        console.log('   1. RLS policies blocking anon access');
        console.log('   2. Wrong anon key');
        console.log('   3. Network/connection issue');
        return;
    }

    console.log(`✅ Successfully fetched ${data?.length || 0} projects with anon key!`);

    if (data && data.length > 0) {
        console.log('\n📋 Projects accessible from frontend:');
        data.forEach((p, i) => {
            console.log(`   ${i + 1}. ${p.title} (${p.category})`);
        });
        console.log('\n✅ Frontend configuration is CORRECT!');
        console.log('💡 The issue must be with Vercel environment variables.');
    }
}

testFrontendAccess();
