import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database.types.js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

// Client for general operations (uses anon key with RLS)
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// Admin client for operations that bypass RLS (uses service role key)
export const supabaseAdmin = supabaseServiceKey
    ? createClient<Database>(supabaseUrl, supabaseServiceKey)
    : null;
