import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envPath = join(__dirname, '..', 'server', '.env');

const supabaseConfig = {
    SUPABASE_URL: 'https://xbeoogwcvsrjoewcmjgn.supabase.co',
    SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhiZW9vZ3djdnNyam9ld2NtamduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwNjE3NDUsImV4cCI6MjA4MTYzNzc0NX0.-U-2oVif8_WswdF3Mpj2-R5jek8Rq2d3w1SzwR8FxLY',
    SUPABASE_SERVICE_ROLE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhiZW9vZ3djdnNyam9ld2NtamduIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NjA2MTc0NSwiZXhwIjoyMDgxNjM3NzQ1fQ.fDri9mXZ-X_7IrJIbOxu2OXa77dbq98pVxTfmGaAQ-4'
};

console.log('🔧 Updating Supabase configuration in .env...\n');

try {
    let envContent = '';

    if (existsSync(envPath)) {
        envContent = readFileSync(envPath, 'utf8');
        console.log('✅ Found existing .env file');
    } else {
        console.log('📝 Creating new .env file');
    }

    // Update or add each key
    Object.entries(supabaseConfig).forEach(([key, value]) => {
        const regex = new RegExp(`^${key}=.*$`, 'm');
        if (regex.test(envContent)) {
            envContent = envContent.replace(regex, `${key}=${value}`);
            console.log(`   Updated: ${key}`);
        } else {
            envContent += `\n${key}=${value}`;
            console.log(`   Added: ${key}`);
        }
    });

    writeFileSync(envPath, envContent.trim() + '\n');

    console.log('\n✅ Supabase configuration updated successfully!');
    console.log('\n⚠️  IMPORTANT: Restart your dev server for changes to take effect:');
    console.log('   Press Ctrl+C in the terminal running "npm run dev:server"');
    console.log('   Then run: npm run dev:server\n');

} catch (error) {
    console.error('❌ Error updating .env:', error.message);
    process.exit(1);
}
