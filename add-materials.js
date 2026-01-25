import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function addMissingProducts() {
    try {
        console.log('🔍 Buscando productos "Techlam" y "Quarzo"...\n');

        // Verificar si ya existen
        const { data: existing } = await supabase
            .from('products')
            .select('id, name')
            .in('name', ['Techlam', 'Quarzo']);

        console.log(`Productos encontrados: ${existing.length}`);
        existing.forEach(p => console.log(`  - ${p.name} (ID: ${p.id})`));

        const hasTechlam = existing.some(p => p.name === 'Techlam');
        const hasQuarzo = existing.some(p => p.name === 'Quarzo');

        // Agregar Techlam si no existe
        if (!hasTechlam) {
            console.log('\n➕ Agregando "Techlam"...');
            const { data, error } = await supabase
                .from('products')
                .insert({
                    name: 'Techlam',
                    category: 'Porcelánico',
                    color: 'Varios',
                    finish: 'Mate',
                    image: '/images/products/techlam-placeholder.jpg',
                    best_seller: true
                })
                .select();

            if (error) {
                console.error('❌ Error adding Techlam:', error.message);
            } else {
                console.log('✅ Techlam agregado exitosamente! ID:', data[0].id);
            }
        } else {
            console.log('\nℹ️  "Techlam" ya existe en la base de datos');
        }

        // Agregar Quarzo si no existe  
        if (!hasQuarzo) {
            console.log('\n➕ Agregando "Quarzo"...');
            const { data, error } = await supabase
                .from('products')
                .insert({
                    name: 'Quarzo',
                    category: 'Cuarzo',
                    color: 'Varios',
                    finish: 'Pulido',
                    image: '/images/products/quarzo-placeholder.jpg',
                    best_seller: true
                })
                .select();

            if (error) {
                console.error('❌ Error adding Quarzo:', error.message);
            } else {
                console.log('✅ Quarzo agregado exitosamente! ID:', data[0].id);
            }
        } else {
            console.log('\nℹ️  "Quarzo" ya existe en la base de datos');
        }

        // Verificación final
        console.log('\n📊 VERIFICACIÓN FINAL:');
        const { data: finalCheck } = await supabase
            .from('products')
            .select('id, name, category')
            .in('name', ['Granito Negro Zimbabwe', 'Techlam', 'Quarzo'])
            .order('name');

        console.table(finalCheck);
        console.log('\n✅ Proceso completo! Los materiales ahora deberían aparecer como enlaces en los proyectos.');

    } catch (error) {
        console.error('\n❌ Error:', error.message);
        process.exit(1);
    }
}

addMissingProducts();
