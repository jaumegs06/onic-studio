import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';
import formidable from 'formidable';
import fs from 'fs/promises';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase credentials');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Disable body parser for file uploads
export const config = {
    api: {
        bodyParser: false,
    },
};

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

async function parseForm(req: VercelRequest): Promise<{ fields: any; files: any }> {
    const form = formidable({ multiples: true });

    return new Promise((resolve, reject) => {
        form.parse(req as any, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });
        });
    });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Require authentication
    const auth = authenticateToken(req);
    if (!auth.valid) {
        return res.status(401).json({ error: auth.error });
    }

    const path = req.url?.split('/api/upload/')[1] || '';

    // POST /api/upload/single
    if (path === 'single' && req.method === 'POST') {
        try {
            const { fields, files } = await parseForm(req);
            const file = Array.isArray(files.image) ? files.image[0] : files.image;

            if (!file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }

            const fileBuffer = await fs.readFile(file.filepath);
            const fileName = `${Date.now()}_${file.originalFilename}`;
            const filePath = `uploads/${fileName}`;

            const { data, error } = await supabase.storage
                .from('images')
                .upload(filePath, fileBuffer, {
                    contentType: file.mimetype || 'image/jpeg',
                    upsert: false
                });

            if (error) throw error;

            const { data: { publicUrl } } = supabase.storage
                .from('images')
                .getPublicUrl(filePath);

            return res.status(200).json({ url: publicUrl });
        } catch (error: any) {
            console.error('Upload error:', error);
            return res.status(500).json({ error: error.message });
        }
    }

    // POST /api/upload/multiple
    if (path === 'multiple' && req.method === 'POST') {
        try {
            const { fields, files } = await parseForm(req);
            const fileArray = Array.isArray(files.images) ? files.images : [files.images];

            const uploadPromises = fileArray.map(async (file) => {
                const fileBuffer = await fs.readFile(file.filepath);
                const fileName = `${Date.now()}_${file.originalFilename}`;
                const filePath = `uploads/${fileName}`;

                const { error } = await supabase.storage
                    .from('images')
                    .upload(filePath, fileBuffer, {
                        contentType: file.mimetype || 'image/jpeg',
                        upsert: false
                    });

                if (error) throw error;

                const { data: { publicUrl } } = supabase.storage
                    .from('images')
                    .getPublicUrl(filePath);

                return publicUrl;
            });

            const urls = await Promise.all(uploadPromises);
            return res.status(200).json({ urls });
        } catch (error: any) {
            console.error('Upload error:', error);
            return res.status(500).json({ error: error.message });
        }
    }

    return res.status(404).json({ error: 'Not found' });
}
