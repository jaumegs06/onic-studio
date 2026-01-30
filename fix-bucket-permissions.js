import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function fixBucketPermissions() {
    console.log('🔧 Configurando permisos del bucket "images"...\n');

    try {
        // Update bucket to be public
        const { data, error } = await supabase.storage.updateBucket('images', {
            public: true,
            fileSizeLimit: 5242880, // 5MB
            allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'image/gif']
        });

        if (error) {
            console.error('❌ Error updating bucket:', error);

            // If update fails, try to get bucket info
            const { data: bucketInfo } = await supabase.storage.getBucket('images');
            console.log('\n📊 Info actual del bucket:', JSON.stringify(bucketInfo, null, 2));

            return;
        }

        console.log('✅ Bucket actualizado a público');
        console.log('✅ Límite de tamaño: 5MB');
        console.log('✅ Tipos permitidos: JPG, PNG, WEBP, GIF\n');

        // Test upload with ANON key (como lo hace el frontend)
        console.log('🧪 Probando subida con clave ANON (como lo hace el frontend)...');

        const supabaseAnon = createClient(
            process.env.SUPABASE_URL!,
            process.env.SUPABASE_ANON_KEY!
        );

        const testBlob = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64');
        const testFile = `test_anon_${Date.now()}.png`;

        const { error: uploadError } = await supabaseAnon.storage
            .from('images')
            .upload(testFile, testBlob, {
                contentType: 'image/png',
                upsert: false
            });

        if (uploadError) {
            console.error('❌ Error en prueba ANON:', uploadError.message);
            console.log('\n⚠️  SOLUCIÓN:');
            console.log('Necesitas ir a Supabase Dashboard y configurar las políticas RLS:');
            console.log('1. Ve a: https://supabase.com/dashboard/project/[tu-proyecto]/storage/buckets/images');
            console.log('2. En la pestaña "Policies", crea una nueva política:');
            console.log('   - Name: "Allow public uploads"');
            console.log('   - Operation: INSERT');
            console.log('   - Policy definition: true');
            console.log('3. También crea para SELECT:');
            console.log('   - Name: "Allow public reads"');
            console.log('   - Operation: SELECT');
            console.log('   - Policy definition: true\n');
            return;
        }

        console.log('✅ Prueba ANON exitosa!');

        // Get URL
        const { data: { publicUrl } } = supabaseAnon.storage
            .from('images')
            .getPublicUrl(testFile);

        console.log('🌐 URL pública:', publicUrl);

        // Clean up
        await supabase.storage.from('images').remove([testFile]);
        console.log('🧹 Limpieza completada\n');

        console.log('✅ ¡Todo configurado! El botón de subida debería funcionar ahora.');

    } catch (error) {
        console.error('❌ Error:', error);
    }
}

fixBucketPermissions();
