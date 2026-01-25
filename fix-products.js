import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fixProductNames() {
    try {
        console.log('🔍 Verificando productos existentes...\n');

        // Obtener todos los productos
        const { data: allProducts, error: fetchError } = await supabase
            .from('products')
            .select('id, name, category');

        if (fetchError) throw fetchError;

        console.log(`📦 Total de productos: ${allProducts.length}\n`);

        // Buscar Zimbabwe/Zimbawe
        const zimbaweProduct = allProducts.find(p =>
            p.name.toLowerCase().includes('zimbawe') ||
            p.name.toLowerCase().includes('zimbabwe')
        );

        if (zimbaweProduct) {
            console.log(`Encontrado: ${zimbaweProduct.name}`);

            if (zimbaweProduct.name.includes('Zimbawe') && !zimbaweProduct.name.includes('Zimbabwe')) {
                console.log('➡️  Corrigiendo a "Granito Negro Zimbabwe"...');
                const { error: updateError } = await supabase
                    .from('products')
                    .update({ name: 'Granito Negro Zimbabwe' })
                    .eq('id', zimbaweProduct.id);

                if (updateError) throw updateError;
                console.log('✅ Zimbabwe corregido\n');
            } else {
                console.log('ℹ️  Ya tiene el nombre correcto\n');
            }
        }

        // Verificar Techlam
        const techlamProduct = allProducts.find(p => p.name === 'Techlam');
        if (!techlamProduct) {
            console.log('➕ Agregando Techlam...');
            const { error: insertError } = await supabase
                .from('products')
                .insert({
                    name: 'Techlam',
                    category: 'Porcelánico',
                    color: 'Varios',
                    finish: 'Mate',
                    image: '/images/products/techlam-placeholder.jpg',
                    best_seller: true
                });

            if (insertError) throw insertError;
            console.log('✅ Techlam agregado\n');
        } else {
            console.log('ℹ️  Techlam ya existe\n');
        }

        // Verificar Quarzo
        const quarzoProduct = allProducts.find(p => p.name === 'Quarzo');
        if (!quarzoProduct) {
            console.log('➕ Agregando Quarzo...');
            const { error: insertError } = await supabase
                .from('products')
                .insert({
                    name: 'Quarzo',
                    category: 'Cuarzo',
                    color: 'Varios',
                    finish: 'Pulido',
                    image: '/images/products/quarzo-placeholder.jpg',
                    best_seller: true
                });

            if (insertError) throw insertError;
            console.log('✅ Quarzo agregado\n');
        } else {
            console.log('ℹ️  Quarzo ya existe\n');
        }

        // Verificación final
        console.log('📊 VERIFICACIÓN FINAL:\n');
        const { data: finalProducts } = await supabase
            .from('products')
            .select('id, name, category')
            .in('name', ['Granito Negro Zimbabwe', 'Techlam', 'Quarzo'])
            .order('name');

        console.table(finalProducts);
        console.log('\n✅ Proceso completado exitosamente!');

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

fixProductNames();
