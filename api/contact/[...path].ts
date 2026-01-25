import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';
import { Resend } from 'resend';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase credentials');
}

const supabase = createClient(supabaseUrl, supabaseKey);
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

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
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const path = req.url?.split('/api/contact/')[1] || '';

    // POST /api/contact - Submit contact form (public)
    if (req.method === 'POST' && !path) {
        try {
            const { name, email, phone, projectType, message } = req.body;

            if (!name || !email || !projectType || !message) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

            // Save to database
            const { error: dbError } = await supabase
                .from('contact_messages')
                .insert([{
                    id: messageId,
                    name,
                    email,
                    phone: phone || null,
                    project_type: projectType,
                    message,
                    email_sent: false
                }]);

            if (dbError) throw dbError;

            // Send email if Resend is configured
            let emailSent = false;
            if (resend) {
                try {
                    await resend.emails.send({
                        from: 'Onic Studio <noreply@onicestudio.com>',
                        to: 'oficina tecnica@onicestudio.com',
                        subject: `Nuevo mensaje de contacto: ${projectType}`,
                        html: `
                            <h2>Nuevo mensaje de contacto</h2>
                            <p><strong>Nombre:</strong> ${name}</p>
                            <p><strong>Email:</strong> ${email}</p>
                            <p><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
                            <p><strong>Tipo de proyecto:</strong> ${projectType}</p>
                            <p><strong>Mensaje:</strong></p>
                            <p>${message}</p>
                        `
                    });
                    emailSent = true;

                    // Update email_sent status
                    await supabase
                        .from('contact_messages')
                        .update({ email_sent: true })
                        .eq('id', messageId);
                } catch (emailError) {
                    console.error('Email error:', emailError);
                }
            }

            return res.status(200).json({
                success: true,
                messageId,
                emailSent
            });
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    // GET /api/contact/messages - Get all messages (requires auth)
    if (req.method === 'GET' && path === 'messages') {
        const auth = authenticateToken(req);
        if (!auth.valid) {
            return res.status(401).json({ error: auth.error });
        }

        try {
            const { data, error } = await supabase
                .from('contact_messages')
                .select('*')
                .order('timestamp', { ascending: false });

            if (error) throw error;
            return res.status(200).json(data);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    return res.status(404).json({ error: 'Not found' });
}
