import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('id');

if (error) {
    console.error('Error:', error);
} else {
    console.log(`\n📦 Total productos: ${data.length}\n`);
    data.forEach(p => {
        console.log(`ID: ${p.id} | ${p.name}`);
    });
}
