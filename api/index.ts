import { app } from '../server/app.js';

// Vercel Serverless Function Entry Point
export default async function (req: any, res: any) {
    try {
        // Log environment for debugging (safely)
        console.log('🚀 API Invoked. Node Env:', process.env.NODE_ENV);

        // Forward to Express app
        return app(req, res);
    } catch (error) {
        console.error('💥 CRITICAL ERROR in API entry point:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            details: error instanceof Error ? error.message : String(error)
        });
    }
}
