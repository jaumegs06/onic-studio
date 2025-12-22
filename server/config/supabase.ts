import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database.types.js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

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
