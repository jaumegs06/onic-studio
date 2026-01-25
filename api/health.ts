import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const jwtSecret = process.env.JWT_SECRET;

    return res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        env: {
            SUPABASE_URL: supabaseUrl ? '✅ Set' : '❌ Missing',
            SUPABASE_SERVICE_ROLE_KEY: supabaseKey ? '✅ Set' : '❌ Missing',
            JWT_SECRET: jwtSecret ? '✅ Set (custom)' : '⚠️ Using default',
        },
        availableEndpoints: [
            'GET /api/health',
            'POST /api/auth/login',
            'GET /api/auth/me',
            'GET /api/projects',
            'POST /api/projects',
            'GET /api/projects/:id',
            'PUT /api/projects/:id',
            'DELETE /api/projects/:id',
        ]
    });
}
