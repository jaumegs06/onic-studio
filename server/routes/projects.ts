import { Router } from 'express';
import { supabase, supabaseAdmin } from '../config/supabase';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// GET all projects (Public)
router.get('/', async (req, res) => {
    try {
        const client = supabase || supabaseAdmin;
        if (!client) {
            return res.status(503).json({ error: 'Database not connected' });
        }

        const { data, error } = await client
            .from('projects')
            .select('*')
            .order('year', { ascending: false })
            .order('created_at', { ascending: false });

        if (error) throw error;
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// GET single project (Public)
router.get('/:id', async (req, res) => {
    try {
        const client = supabase || supabaseAdmin;
        if (!client) {
            return res.status(503).json({ error: 'Database not connected' });
        }

        const { data, error } = await client
            .from('projects')
            .select('*')
            .eq('id', req.params.id)
            .single();

        if (error) throw error;
        if (!data) return res.status(404).json({ error: 'Project not found' });

        res.json(data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Create new project
router.post('/', authenticateToken, async (req, res) => {
    console.log('➡️ POST /api/projects request received');
    console.log('User:', req.user);
    console.log('Body:', JSON.stringify(req.body, null, 2));

    try {
        if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
            console.error('❌ Service role key missing');
            return res.status(503).json({ error: 'Database service unavailable' });
        }

        const { title, category, description, location, year, materials, images, image, is_featured } = req.body;

        let imageUrl = image;
        if (!image && images && images.length > 0) {
            imageUrl = images[0];
        }

        const { data, error } = await supabaseAdmin!
            .from('projects')
            .insert([
                {
                    title,
                    category,
                    description,
                    location,
                    year,
                    materials,
                    images,
                    image: imageUrl,
                    is_featured
                }
            ])
            .select()
            .single();

        if (error) throw error;
        res.status(201).json(data);
    } catch (error: any) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: error.message || 'Failed to create project' });
    }
});

// Update project
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
            return res.status(503).json({ error: 'Database service unavailable' });
        }

        const { id } = req.params;
        const { title, category, description, location, year, materials, images, image, is_featured } = req.body;

        let imageUrl = image;
        if (!image && images && images.length > 0) {
            imageUrl = images[0];
        }

        const { data, error } = await supabaseAdmin!
            .from('projects')
            .update({
                title,
                category,
                description,
                location,
                year,
                materials,
                images,
                image: imageUrl,
                is_featured
            })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        res.json(data);
    } catch (error: any) {
        console.error('Error updating project:', error);
        res.status(500).json({ error: error.message || 'Failed to update project' });
    }
});

// DELETE project (Admin)
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        if (!supabaseAdmin) {
            return res.status(503).json({ error: 'Database write access not configured' });
        }

        const { error } = await supabaseAdmin
            .from('projects')
            .delete()
            .eq('id', req.params.id);

        if (error) throw error;
        res.json({ message: 'Project deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
