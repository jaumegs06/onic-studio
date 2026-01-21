
import './server/config/env.ts'; // Load envs using the existing config
import dotenv from 'dotenv';
import path from 'path';

console.log('--- ENV DIAGNOSTIC ---');
console.log('Current Directory:', process.cwd());
console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? '✅ Loaded' : '❌ MISSING');
console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? '✅ Loaded' : '❌ MISSING');
console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Loaded' : '❌ MISSING');

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.log('\n⚠️  POSSIBLE CAUSE: The variable SUPABASE_SERVICE_ROLE_KEY is not in the .env file.');
}
console.log('----------------------');
