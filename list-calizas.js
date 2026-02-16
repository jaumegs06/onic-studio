import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ ERROR: Missing SUPABASE credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function listCalizas() {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('category', 'Caliza');

        if (error) {
            console.error('❌ Error:', error);
            return;
        }

        console.log(`\n📊 Total Calizas: ${data?.length || 0}\n`);

        data?.forEach((caliza, index) => {
            console.log(`${index + 1}. ${caliza.name} (ID: ${caliza.id})`);
        });

        console.log('\n');
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

listCalizas();
