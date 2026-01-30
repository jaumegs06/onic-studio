import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Error: Missing SUPABASE credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupImagesBucket() {
    try {
        console.log('🗂️  Configurando bucket de imágenes...\n');

        // Check if bucket exists
        const { data: buckets, error: listError } = await supabase.storage.listBuckets();

        if (listError) {
            console.error('❌ Error listing buckets:', listError);
            return;
        }

        console.log('📊 Buckets existentes:', buckets?.map(b => b.name).join(', ') || 'ninguno');

        const imagesBucketExists = buckets?.some(b => b.name === 'images');

        if (imagesBucketExists) {
            console.log('\n✅ El bucket "images" ya existe');
        } else {
            console.log('\n➕ Creando bucket "images"...');

            // Create the bucket with public access
            const { data: newBucket, error: createError } = await supabase.storage.createBucket('images', {
                public: true,
                fileSizeLimit: 5242880, // 5MB
                allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
            });

            if (createError) {
                console.error('❌ Error creando bucket:', createError);
                return;
            }

            console.log('✅ Bucket "images" creado correctamente');
        }

        // Test upload
        console.log('\n🧪 Probando subida de imagen de prueba...');

        const testImageBlob = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64');

        const testFileName = `test_${Date.now()}.png`;
        const { error: uploadError } = await supabase.storage
            .from('images')
            .upload(testFileName, testImageBlob, {
                contentType: 'image/png'
            });

        if (uploadError) {
            console.error('❌ Error en prueba de subida:', uploadError);
            return;
        }

        console.log('✅ Prueba de subida exitosa');

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('images')
            .getPublicUrl(testFileName);

        console.log('🌐 URL pública de prueba:', publicUrl);

        // Clean up test file
        await supabase.storage.from('images').remove([testFileName]);
        console.log('🧹 Archivo de prueba eliminado');

        console.log('\n✅ ¡Configuración completada! Ahora puedes subir imágenes desde el admin panel.');

    } catch (error) {
        console.error('❌ Error inesperado:', error);
    }
}

setupImagesBucket();
