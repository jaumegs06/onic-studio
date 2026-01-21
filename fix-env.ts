
import fs from 'fs';
import path from 'path';

const envContent = `PORT=5000
NODE_ENV=development
SUPABASE_URL=https://xbeoogwcvsrjoewcmjgn.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlI6MjA4MTYzNzc0NX0.-U-2oVif8_WswdF3Mpj2-R5jek8Rq2d3w1SzwR8FxLYOjE3NjYwNjE3NDUsImV4cCI
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhiZW9vZ3djdnNyam9ld2NtamduIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NjA2MTc0NSwiZXhwIjoyMDgxNjM3NzQ1fQ.fDri9mXZ-X_7IrJIbOxu2OXa77dbq98pVxTfmGaAQ-4
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin
JWT_SECRET=super_secret_jwt_key_onic_studio_dev
`;

const filePath = path.join(process.cwd(), 'server', '.env');

try {
    fs.writeFileSync(filePath, envContent, 'utf8');
    console.log('✅ .env file written successfully to:', filePath);
    console.log('Content preview:');
    console.log(envContent);
} catch (error) {
    console.error('❌ Failed to write .env file:', error);
}
