import { Router } from 'express';
import { supabaseAdmin } from '../config/supabase.js';
import { sendCompanyNotification, sendClientConfirmation } from '../utils/email.js';

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

        // Create message object
        const contactMessage: ContactMessage = {
            id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            name,
            email,
            phone: phone || '',
            projectType,
            message,
            timestamp: new Date().toISOString(),
            emailSent: false,
        };

        // Save to Supabase (PRIMARY - this must succeed)
        const { error: insertError } = await supabaseAdmin!
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

        if (insertError) {
            throw new Error(`Failed to save message: ${insertError.message}`);
        }

        console.log('✅ Contact message saved to Supabase:', contactMessage.id);

        // Try to send emails (SECONDARY - can fail without breaking the flow)
        let emailSuccess = false;
        try {
            // Send notification to company
            const companyResult = await sendCompanyNotification({
                name,
                email,
                phone,
                projectType,
                message,
            });

            // Send confirmation to client
            const clientResult = await sendClientConfirmation({
                name,
                email,
                phone,
                projectType,
                message,
            });

            emailSuccess = (companyResult.success || companyResult.reason === 'no_api_key') &&
                (clientResult.success || clientResult.reason === 'no_api_key');

            if (emailSuccess) {
                console.log('✅ Emails sent successfully');
                // Update the message to mark email as sent
                contactMessage.emailSent = true;
                await supabaseAdmin!
                    .from('contact_messages')
                    .update({ email_sent: true })
                    .eq('id', contactMessage.id);
            }
        } catch (emailError) {
            console.error('⚠️  Email sending failed, but message was saved:', emailError);
            // Continue - we don't fail the request if email fails
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
