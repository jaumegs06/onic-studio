import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const CALIZAS_NEEDED = [
    'Basaltina',
    'Caliza Campaspero',
    'Caliza Capri',
    'Caliza Cotton',
    'Caliza Marbella',
    'Caliza Paloma',
    'Caliza Moleanos Beige',
    'Caliza Azul Monica',
    'Caliza Cohiba',
    'Caliza Lagos Blue'
];

async function checkAndAddMissing() {
    try {
        // Get current calizas
        const { data: current, error } = await supabase
            .from('products')
            .select('*')
            .eq('category', 'Caliza');

        if (error) {
            console.error('❌ Error fetching:', error);
            return;
        }

        console.log(`\n📊 Current Calizas: ${current?.length || 0}`);
        current?.forEach(c => console.log(`   ✓ ${c.name}`));

        // Find missing
        const currentNames = current?.map(c => c.name) || [];
        const missing = CALIZAS_NEEDED.filter(name => !currentNames.includes(name));

        console.log(`\n❌ Missing Calizas: ${missing.length}`);
        missing.forEach(name => console.log(`   - ${name}`));

        if (missing.length === 0) {
            console.log('\n✅ All calizas are present!');
            return;
        }

        // Add missing
        const toAdd = missing.map(name => ({
            name,
            category: 'Caliza',
            color: name.includes('Azul') ? 'Azul' : 'Beige',
            finish: 'Natural',
            image: `https://via.placeholder.com/400x400/cccccc/333333?text=${encodeURIComponent(name)}`,
            best_seller: false
        }));

        console.log(`\n➕ Adding ${toAdd.length} calizas...`);

        const { data: inserted, error: insertError } = await supabase
            .from('products')
            .insert(toAdd)
            .select();

        if (insertError) {
            console.error('❌ Insert error:', insertError);
            return;
        }

        console.log(`✅ Added successfully!`);

        // Final count
        const { data: final } = await supabase
            .from('products')
            .select('*')
            .eq('category', 'Caliza');

        console.log(`\n📊 Final Total: ${final?.length || 0} calizas\n`);
        final?.forEach((c, i) => console.log(`   ${i + 1}. ${c.name}`));

    } catch (error) {
        console.error('❌ Error:', error);
    }
}

checkAndAddMissing();
