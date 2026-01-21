import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database.types.js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('--- SUPABASE CONFIG DEBUG ---');
console.log('URL:', supabaseUrl);
console.log('ANON KEY length:', supabaseKey?.length, 'Start:', supabaseKey?.substring(0, 10), 'End:', supabaseKey?.slice(-5));
console.log('SERVICE KEY length:', supabaseServiceKey?.length, 'Start:', supabaseServiceKey?.substring(0, 10), 'End:', supabaseServiceKey?.slice(-5));
console.log('-----------------------------');

if (!supabaseUrl || !supabaseKey) {
    console.warn('⚠️  Missing Supabase environment variables. Running in MOCK mode.');
}

// Client for general operations (uses anon key with RLS)
export const supabase = (supabaseUrl && supabaseKey)
    ? createClient<Database>(supabaseUrl, supabaseKey)
    : null;

// Admin client for operations that bypass RLS (uses service role key)
export const supabaseAdmin = (supabaseUrl && supabaseServiceKey)
    ? createClient<Database>(supabaseUrl, supabaseServiceKey)
    : null;
