import { Router } from 'express';
import { supabase, supabaseAdmin } from '../config/supabase.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// GET data by key (Public)
router.get('/:key', async (req, res) => {
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

        if (error && error.code !== 'PGRST116') { // PGRST116 is "No rows found", we can handle it gracefully.
            throw error;
        }

        if (!data) return res.status(404).json({ error: 'Key not found' });

        res.json({ value: data.value });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// PUT data by key (Admin only)
router.put('/:key', authenticateToken, async (req, res) => {
    try {
        if (!supabaseAdmin) {
            return res.status(503).json({ error: 'Database service unavailable' });
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
