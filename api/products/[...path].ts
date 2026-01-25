import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase credentials');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Auth middleware
function authenticateToken(req: VercelRequest): { valid: boolean; user?: any; error?: string } {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return { valid: false, error: 'No token provided' };
    }

    try {
        const token = authHeader.substring(7);
        const user = jwt.verify(token, JWT_SECRET);
        return { valid: true, user };
    } catch (error) {
        return { valid: false, error: 'Invalid token' };
    }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Extract ID from URL path
    const urlParts = req.url?.split('/products/') || [];
    const idPart = urlParts[1]?.split('?')[0];
    const id = idPart && idPart !== '' ? idPart : null;

    console.log('[Products API] Method:', req.method, 'ID:', id, 'URL:', req.url);

    // GET all products (public)
    if (req.method === 'GET' && !id) {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            return res.status(200).json(data);
        } catch (error: any) {
            console.error('[API Error]', error);
            return res.status(500).json({ error: error.message });
        }
    }

    // GET single product (public)
    if (req.method === 'GET' && id) {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            if (!data) return res.status(404).json({ error: 'Product not found' });
            return res.status(200).json(data);
        } catch (error: any) {
            console.error('[API Error]', error);
            return res.status(500).json({ error: error.message });
        }
    }

    // All write operations require authentication
    const auth = authenticateToken(req);
    if (!auth.valid) {
        return res.status(401).json({ error: auth.error });
    }

    // POST - Create product
    if (req.method === 'POST' && !id) {
        try {
            const { name, category, color, finish, image, best_seller } = req.body;

            const { data, error } = await supabase
                .from('products')
                .insert([{
                    name,
                    category,
                    color,
                    finish,
                    image,
                    best_seller: best_seller || false
                }])
                .select()
                .single();

            if (error) {
                console.error('[Supabase Insert Error]', error);
                throw error;
            }

            return res.status(201).json(data);
        } catch (error: any) {
            console.error('[API Error]', error);
            return res.status(500).json({ error: error.message });
        }
    }

    // PUT - Update product
    if (req.method === 'PUT' && id) {
        try {
            const { name, category, color, finish, image, best_seller } = req.body;

            const { data, error } = await supabase
                .from('products')
                .update({
                    name,
                    category,
                    color,
                    finish,
                    image,
                    best_seller
                })
                .eq('id', id)
                .select()
                .single();

            if (error) {
                console.error('[Supabase Update Error]', error);
                throw error;
            }
            return res.status(200).json(data);
        } catch (error: any) {
            console.error('[API Error]', error);
            return res.status(500).json({ error: error.message });
        }
    }

    // DELETE - Delete product
    if (req.method === 'DELETE' && id) {
        try {
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', id);

            if (error) {
                console.error('[Supabase Delete Error]', error);
                throw error;
            }
            return res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error: any) {
            console.error('[API Error]', error);
            return res.status(500).json({ error: error.message });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
