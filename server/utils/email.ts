import { Resend } from 'resend';

// Function to get Resend client (initialized on first use)
function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    console.log('⚠️  RESEND_API_KEY not found in environment');
    return null;
  }
  return new Resend(process.env.RESEND_API_KEY);
}

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  message: string;
}

/**
 * Sends notification email to company when a new contact form is submitted
 */
export async function sendCompanyNotification(data: ContactFormData) {
  try {
    // Get Resend client at runtime, not at module import time
    const resend = getResendClient();

    // If no API key or resend not initialized, skip sending email (but don't fail)
    if (!resend) {
      console.log('⚠️  Resend API key not configured. Email not sent.');
      console.log('📧  Would have sent email with data:', data);
      return { success: false, reason: 'no_api_key' };
    }

    const { data: emailData, error } = await resend.emails.send({
      from: 'Onic Studio Contact <onboarding@resend.dev>',
      replyTo: 'oficinatecnica@onicestudio.com',
      to: ['oficinatecnica@onicestudio.com'], // Company email
      subject: `🔔 Nuevo mensaje de contacto - ${data.name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                border-radius: 10px 10px 0 0;
                text-align: center;
              }
              .content {
                background: #f9fafb;
                padding: 30px;
                border-radius: 0 0 10px 10px;
              }
              .field {
                margin-bottom: 20px;
                padding: 15px;
                background: white;
                border-radius: 8px;
                border-left: 4px solid #667eea;
              }
              .label {
                font-weight: 600;
                color: #667eea;
                text-transform: uppercase;
                font-size: 12px;
                letter-spacing: 0.5px;
                margin-bottom: 5px;
              }
              .value {
                color: #1f2937;
                font-size: 16px;
              }
              .message-box {
                background: white;
                padding: 20px;
                border-radius: 8px;
                border: 1px solid #e5e7eb;
                margin-top: 10px;
              }
              .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
                color: #6b7280;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 style="margin: 0;">✨ Nuevo Mensaje de Contacto</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Formulario web de Onic Studio</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Nombre</div>
                <div class="value">${data.name}</div>
              </div>
              
              <div class="field">
                <div class="label">Email</div>
                <div class="value">
                  <a href="mailto:${data.email}" style="color: #667eea; text-decoration: none;">
                    ${data.email}
                  </a>
                </div>
              </div>
              
              ${data.phone ? `
                <div class="field">
                  <div class="label">Teléfono</div>
                  <div class="value">
                    <a href="tel:${data.phone}" style="color: #667eea; text-decoration: none;">
                      ${data.phone}
                    </a>
                  </div>
                </div>
              ` : ''}
              
              <div class="field">
                <div class="label">Tipo de Proyecto</div>
                <div class="value" style="text-transform: capitalize;">${data.projectType}</div>
              </div>
              
              <div class="field">
                <div class="label">Mensaje</div>
                <div class="message-box">
                  ${data.message.replace(/\n/g, '<br>')}
                </div>
              </div>
              
              <div class="footer">
                <p>Recibido el ${new Date().toLocaleString('es-ES', {
        dateStyle: 'full',
        timeStyle: 'short'
      })}</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('❌ Error sending company notification:', error);
      return { success: false, error };
    }

    console.log('✅ Company notification sent:', emailData);
    return { success: true, data: emailData };
  } catch (error) {
    console.error('❌ Exception sending company notification:', error);
    return { success: false, error };
  }
}


