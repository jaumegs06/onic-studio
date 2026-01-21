import { Router } from 'express';
import { supabaseAdmin } from '../config/supabase.js';
import { sendCompanyNotification } from '../utils/email.js';

const router = Router();

interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    projectType: string;
    message: string;
}

interface ContactMessage extends ContactFormData {
    id: string;
    timestamp: string;
    emailSent: boolean;
}

/**
 * POST /api/contact
 * Submit a contact form
 */
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, projectType, message }: ContactFormData = req.body;

        // Validation
        if (!name || !email || !projectType || !message) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: name, email, projectType, message',
            });
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid email format',
            });
        }

        // Try to send email to company - this is the PRIMARY goal
        let emailSuccess = false;
        let emailError = null;

        try {
            const companyResult = await sendCompanyNotification({
                name,
                email,
                phone,
                projectType,
                message,
            });

            emailSuccess = companyResult.success || companyResult.reason === 'no_api_key';

            if (!companyResult.success) {
                console.log('⚠️  Email not sent:', companyResult.reason || companyResult.error);
                emailError = companyResult.error;
            } else {
                console.log('✅ Company notification email sent successfully');
            }
        } catch (emailErr) {
            console.error('⚠️  Email sending failed:', emailErr);
            emailError = emailErr;
            emailSuccess = false;
        }

        // Try to save to database if Supabase is available (OPTIONAL - not mission critical)
        const contactMessage = {
            id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            name,
            email,
            phone: phone || '',
            projectType,
            message,
            timestamp: new Date().toISOString(),
            emailSent: emailSuccess,
        };

        if (supabaseAdmin) {
            try {
                await supabaseAdmin
                    .from('contact_messages')
                    .insert([{
                        id: contactMessage.id,
                        name: contactMessage.name,
                        email: contactMessage.email,
                        phone: contactMessage.phone || null,
                        project_type: contactMessage.projectType,
                        message: contactMessage.message,
                        timestamp: contactMessage.timestamp,
                        email_sent: contactMessage.emailSent
                    }]);

                console.log('✅ Contact message saved to Supabase');
            } catch (dbError) {
                console.warn('⚠️  Failed to save to database, but continuing:', dbError);
                // Don't fail the request if database save fails
            }
        } else {
            console.log('ℹ️  Supabase not configured - message not saved to database');
        }

        // Return success response
        return res.status(200).json({
            success: true,
            message: 'Mensaje recibido correctamente',
            data: {
                id: contactMessage.id,
                emailSent: emailSuccess,
                timestamp: contactMessage.timestamp,
            },
        });
    } catch (error) {
        console.error('❌ Error processing contact form:', error);
        return res.status(500).json({
            success: false,
            error: 'Error interno del servidor. Por favor, inténtalo de nuevo.',
        });
    }
});

/**
 * GET /api/contact/messages
 * Get all contact messages (admin only - you can add auth middleware later)
 */
router.get('/messages', async (req, res) => {
    try {
        if (!supabaseAdmin) {
            console.log('Serving mock messages (Supabase client inactive)');
            return res.status(200).json({
                success: true,
                data: [
                    {
                        id: 'mock_1',
                        name: 'Usuario de Prueba',
                        email: 'test@example.com',
                        phone: '123456789',
                        projectType: 'Residencial',
                        message: 'Este es un mensaje de prueba generado porque la base de datos no está conectada.',
                        timestamp: new Date().toISOString(),
                        emailSent: false
                    }
                ],
            });
        }

        const { data: messages, error } = await supabaseAdmin!
            .from('contact_messages')
            .select('*')
            .order('timestamp', { ascending: false });

        if (error) throw error;

        // Transform snake_case to camelCase for frontend
        const transformedMessages = messages?.map(msg => ({
            id: msg.id,
            name: msg.name,
            email: msg.email,
            phone: msg.phone,
            projectType: msg.project_type,  // Transform to camelCase
            message: msg.message,
            timestamp: msg.timestamp,
            emailSent: msg.email_sent        // Transform to camelCase
        })) || [];

        return res.status(200).json({
            success: true,
            data: transformedMessages,
        });
    } catch (error) {
        console.error('❌ Error reading contact messages:', error);
        return res.status(500).json({
            success: false,
            error: 'Error al leer los mensajes',
            data: [],
        });
    }
});

export default router;
