import { Resend } from 'resend';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

async function testEmailSystem() {
    console.log('\n🔍 DIAGNÓSTICO DEL SISTEMA DE EMAILS\n');
    console.log('=' + '='.repeat(50));

    // 1. Verificar API Key
    console.log('\n1️⃣ Verificando API Key de Resend...');
    if (!process.env.RESEND_API_KEY) {
        console.log('❌ ERROR: Variable RESEND_API_KEY no encontrada');
        console.log('   → Necesitas crear un archivo .env con:');
        console.log('   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx');
        console.log('\n   Obtén tu API key en: https://resend.com/api-keys\n');
        process.exit(1);
    }

    console.log('✅ API Key encontrada');
    console.log(`   Primeros 10 caracteres: ${process.env.RESEND_API_KEY.substring(0, 10)}...`);

    // 2. Test de envío de email
    console.log('\n2️⃣ Probando envío de email...');

    try {
        const testEmail = 'TU_EMAIL@gmail.com'; // ⚠️ CAMBIA ESTO A TU EMAIL

        console.log(`   Enviando email de prueba a: ${testEmail}`);

        const { data, error } = await resend.emails.send({
            from: 'Onic Studio <onboarding@resend.dev>',
            to: [testEmail],
            subject: '✅ Test - Sistema de Contacto Onic Studio',
            html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
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
                border-radius: 10px;
                text-align: center;
                margin-bottom: 20px;
              }
              .content {
                background: #f9fafb;
                padding: 30px;
                border-radius: 10px;
              }
              .success {
                background: #d1fae5;
                border-left: 4px solid #10b981;
                padding: 15px;
                margin: 20px 0;
                border-radius: 5px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 style="margin: 0;">🎉 ¡Email de Prueba!</h1>
              <p style="margin: 10px 0 0 0;">Sistema de Contacto - Onic Studio</p>
            </div>
            <div class="content">
              <div class="success">
                <strong>✅ ¡ÉXITO!</strong>
                <p>Si estás leyendo este email, significa que:</p>
                <ul>
                  <li>Tu API key de Resend está configurada correctamente</li>
                  <li>El sistema de envío de emails funciona</li>
                  <li>Los emails están llegando a su destino</li>
                </ul>
              </div>
              
              <h3>📋 Información del Test:</h3>
              <p>
                <strong>Fecha:</strong> ${new Date().toLocaleString('es-ES')}<br>
                <strong>Enviado desde:</strong> onboarding@resend.dev<br>
                <strong>Sistema:</strong> Resend API<br>
              </p>
              
              <h3>📝 Próximos Pasos:</h3>
              <ol>
                <li>Verifica que este email NO esté en spam</li>
                <li>Si todo está OK, prueba el formulario de contacto en localhost</li>
                <li>(Opcional) Configura tu dominio propio en Resend para mayor profesionalidad</li>
              </ol>
              
              <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ccc; color: #666; font-size: 14px;">
                Este es un email de prueba generado automáticamente por test-resend.js
              </p>
            </div>
          </body>
        </html>
      `,
        });

        if (error) {
            console.log('❌ ERROR al enviar email:');
            console.log('   ', error);
            console.log('\n💡 Posibles causas:');
            console.log('   - API Key inválida o expirada');
            console.log('   - Email destinatario inválido');
            console.log('   - Problemas de red/firewall');
            process.exit(1);
        }

        console.log('✅ Email enviado correctamente!');
        console.log('\n📬 Detalles del envío:');
        console.log('   ID:', data.id);
        console.log(`   Destino: ${testEmail}`);
        console.log('\n🔍 Verifica tu bandeja de entrada (y spam) en los próximos minutos');
        console.log('\n✨ Si recibiste el email, el sistema está listo para producción!');

    } catch (err) {
        console.log('❌ EXCEPCIÓN al enviar email:');
        console.log('   ', err.message);
        process.exit(1);
    }

    console.log('\n' + '=' + '='.repeat(50));
    console.log('✅ TEST COMPLETADO');
    console.log('=' + '='.repeat(50) + '\n');
}

// Ejecutar test
testEmailSystem();
