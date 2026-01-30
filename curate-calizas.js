import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Error: Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Calizas to KEEP
const CALIZAS_TO_KEEP = [
    'Basaltina',
    'Caliza Campaspero',
    'Caliza Capri',
    'Caliza Cotton',
    'Caliza Marbella',
    'Caliza Paloma'
];

// NEW Calizas to ADD
const NEW_CALIZAS = [
    {
        name: 'Caliza Moleanos Beige',
        category: 'Caliza',
        color: 'Beige',
        finish: 'Natural',
        image: 'https://via.placeholder.com/400x400/f5f5dc/333333?text=Caliza+Moleanos+Beige',
        best_seller: false
    },
    {
        name: 'Caliza Azul Monica',
        category: 'Caliza',
        color: 'Azul',
        finish: 'Natural',
        image: 'https://via.placeholder.com/400x400/87ceeb/333333?text=Caliza+Azul+Monica',
        best_seller: false
    },
    {
        name: 'Caliza Cohiba',
        category: 'Caliza',
        color: 'Beige',
        finish: 'Natural',
        image: 'https://via.placeholder.com/400x400/f5f5dc/333333?text=Caliza+Cohiba',
        best_seller: false
    },
    {
        name: 'Caliza Lagos Blue',
        category: 'Caliza',
        color: 'Azul',
        finish: 'Natural',
        image: 'https://via.placeholder.com/400x400/4682b4/333333?text=Caliza+Lagos+Blue',
        best_seller: false
    }
];

async function curateCalizas() {
    try {
        console.log('🔍 Fetching all Caliza materials...\n');

        // Get all current calizas
        const { data: allCalizas, error: fetchError } = await supabase
            .from('products')
            .select('*')
            .eq('category', 'Caliza');

        if (fetchError) {
            console.error('❌ Error fetching calizas:', fetchError);
            return;
        }

        console.log(`📊 Found ${allCalizas?.length || 0} calizas in database\n`);

        // Identify calizas to delete
        const calizasToDelete = allCalizas?.filter(
            caliza => !CALIZAS_TO_KEEP.includes(caliza.name)
        ) || [];

        console.log('🗑️  Calizas to DELETE:');
        if (calizasToDelete.length === 0) {
            console.log('   (none)');
        } else {
            calizasToDelete.forEach(caliza => {
                console.log(`   - ${caliza.name} (ID: ${caliza.id})`);
            });
        }

        console.log('\n✅ Calizas to KEEP:');
        const existingKept = allCalizas?.filter(
            caliza => CALIZAS_TO_KEEP.includes(caliza.name)
        ) || [];
        existingKept.forEach(caliza => {
            console.log(`   - ${caliza.name} (ID: ${caliza.id})`);
        });

        console.log('\n➕ NEW Calizas to ADD:');
        NEW_CALIZAS.forEach(caliza => {
            console.log(`   - ${caliza.name}`);
        });

        console.log('\n⚠️  WARNING: This will:');
        console.log(`   - DELETE ${calizasToDelete.length} calizas`);
        console.log(`   - KEEP ${existingKept.length} calizas`);
        console.log(`   - ADD ${NEW_CALIZAS.length} new calizas`);
        console.log(`   - Total after: ${existingKept.length + NEW_CALIZAS.length} calizas\n`);

        // DELETE unwanted calizas
        if (calizasToDelete.length > 0) {
            const idsToDelete = calizasToDelete.map(c => c.id);

            const { error: deleteError } = await supabase
                .from('products')
                .delete()
                .in('id', idsToDelete);

            if (deleteError) {
                console.error('❌ Error deleting calizas:', deleteError);
                return;
            }

            console.log(`✅ Deleted ${calizasToDelete.length} calizas`);
        }

        // ADD new calizas
        const { data: inserted, error: insertError } = await supabase
            .from('products')
            .insert(NEW_CALIZAS)
            .select();

        if (insertError) {
            console.error('❌ Error adding new calizas:', insertError);
            return;
        }

        console.log(`✅ Added ${inserted?.length || 0} new calizas\n`);

        // Final count
        const { data: finalCalizas, error: finalError } = await supabase
            .from('products')
            .select('*')
            .eq('category', 'Caliza');

        if (!finalError) {
            console.log('📊 FINAL RESULT:');
            console.log(`   Total Calizas: ${finalCalizas?.length || 0}\n`);
            finalCalizas?.forEach(caliza => {
                console.log(`   - ${caliza.name}`);
            });
        }

        console.log('\n✅ Curación completada!');

    } catch (error) {
        console.error('❌ Unexpected error:', error);
    }
}

curateCalizas();
