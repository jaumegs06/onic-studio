import { Router } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { sendCompanyNotification, sendClientConfirmation } from '../utils/email.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

const CONTACT_MESSAGES_FILE = path.join(__dirname, '..', 'data', 'contact-messages.json');

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

        // Read existing messages
        let messagesData: { messages: ContactMessage[] };
        try {
            const fileContent = await fs.readFile(CONTACT_MESSAGES_FILE, 'utf-8');
            messagesData = JSON.parse(fileContent);
        } catch (error) {
            // If file doesn't exist or is corrupted, start fresh
            messagesData = { messages: [] };
        }

        // Add new message
        messagesData.messages.push(contactMessage);

        // Save to file (PRIMARY - this must succeed)
        await fs.writeFile(
            CONTACT_MESSAGES_FILE,
            JSON.stringify(messagesData, null, 2),
            'utf-8'
        );

        console.log('✅ Contact message saved to database:', contactMessage.id);

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
                await fs.writeFile(
                    CONTACT_MESSAGES_FILE,
                    JSON.stringify(messagesData, null, 2),
                    'utf-8'
                );
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
        const fileContent = await fs.readFile(CONTACT_MESSAGES_FILE, 'utf-8');
        const messagesData = JSON.parse(fileContent);

        return res.status(200).json({
            success: true,
            data: messagesData.messages,
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
