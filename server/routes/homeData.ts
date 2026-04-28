import { Router, Request, Response } from 'express';
import { supabase, supabaseAdmin } from '../config/supabase.js';

const router = Router();

// GET data by key (Public)
router.get('/:key', async (req: Request, res: Response) => {
    try {
        const client = supabase || supabaseAdmin;
        if (!client) {
            return res.status(503).json({ error: 'Database not connected' });
        }

        const { data, error } = await (client as any)
            .from('home_data')
            .select('value')
            .eq('key', req.params.key)
            .single();

        if (error && error.code !== 'PGRST116') {
            throw error;
        }

        if (!data) return res.status(404).json({ error: 'Key not found' });

        res.json({ value: data.value });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// PUT data by key (Admin only - verified via Supabase Auth token)
router.put('/:key', async (req: Request, res: Response) => {
    try {
        if (!supabaseAdmin) {
            return res.status(503).json({ error: 'Database service unavailable' });
        }

        // Verify the Supabase auth token from the Authorization header
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Access token required' });
        }

        const { data: userData, error: authError } = await supabaseAdmin.auth.getUser(token);
        if (authError || !userData?.user) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }

        const { key } = req.params;
        const { value } = req.body;

        if (value === undefined) {
            return res.status(400).json({ error: 'Value is required' });
        }

        const { data, error } = await (supabaseAdmin as any)
            .from('home_data')
            .upsert(
                { key, value, updated_at: new Date().toISOString() },
                { onConflict: 'key' }
            )
            .select()
            .single();

        if (error) throw error;
        res.json(data);
    } catch (error: any) {
        console.error('Error updating home data:', error);
        res.status(500).json({ error: error.message || 'Failed to update data' });
    }
});

export default router;
