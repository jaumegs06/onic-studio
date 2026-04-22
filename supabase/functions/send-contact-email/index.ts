// 1. Import dependencies (Deno environment)
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Resend } from 'npm:resend@2.0.0'

// 2. Setup CORS headers
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// 3. Define the request handler
serve(async (req) => {
    // Handle OPTIONS request for CORS preflight
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        // 4. Initialize Resend
        // This requires RESEND_API_KEY to be set in your Supabase project (Settings > Edge Functions > Secrets)
        const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

        // 5. Parse the request body (webhook payload)
        const payload = await req.json()

        // The payload comes from a Database Webhook, so it has { type: 'INSERT', record: { ... }, ... }
        // Or if invoked directly, it might be just the body. Let's handle both or assume webhook structure.
        const record = payload.record || payload

        console.log('New contact message received:', record)

        // 6. Send the email using Resend
        const key = Deno.env.get('RESEND_API_KEY');
        if (!key) {
            throw new Error('Missing RESEND_API_KEY');
        }

        const { data, error } = await resend.emails.send({
            from: 'Onic Studio Contact <onboarding@resend.dev>',
            replyTo: record.email,
            to: ['oficinatecnica@onicestudio.com'],
            subject: `Nuevo mensaje de: ${record.full_name}`,
            html: `
        <h1>Nuevo Mensaje de Contacto</h1>
        <p><strong>Nombre:</strong> ${record.full_name}</p>
        <p><strong>Email:</strong> ${record.email}</p>
        <p><strong>Asunto:</strong> ${record.subject}</p>
        <p><strong>Mensaje:</strong></p>
        <blockquote style="background: #f9f9f9; padding: 15px; border-left: 5px solid #ccc;">
          ${record.message}
        </blockquote>
        <p><small>Enviado el: ${new Date().toLocaleString()}</small></p>
      `
        })

        if (error) {
            console.error('Error sending email:', error)
            return new Response(JSON.stringify({ error }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400,
            })
        }

        console.log('Email sent successfully:', data)

        return new Response(JSON.stringify(data), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        })

    } catch (error) {
        console.error('Unexpected error:', error)
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500,
        })
    }
})
