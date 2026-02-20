import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const NOTIFY_EMAIL = process.env.CONTACT_NOTIFY_EMAIL || 'dailymirandapardo@gmail.com';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, language } = body;

    // Validación básica
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios' },
        { status: 400 }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Obtener metadatos de la solicitud
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const referer = request.headers.get('referer') || 'direct';

    // Insertar en Supabase
    const { data, error } = await supabase
      .from('contact_messages')
      .insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim(),
        metadata: {
          language,
          user_agent: userAgent,
          referer,
          timestamp: new Date().toISOString()
        }
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Error al guardar el mensaje' },
        { status: 500 }
      );
    }

    // Enviar notificación por email
    if (resend) {
      try {
        const emailResult = await resend.emails.send({
          from: 'DailyMP Contact <onboarding@resend.dev>',
          to: NOTIFY_EMAIL,
          replyTo: email.trim().toLowerCase(),
          subject: `Nuevo mensaje de contacto: ${name.trim()}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #7c3aed;">Nuevo mensaje de contacto</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px; font-weight: bold; color: #374151;">Nombre:</td>
                  <td style="padding: 8px;">${name.trim()}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; font-weight: bold; color: #374151;">Email:</td>
                  <td style="padding: 8px;"><a href="mailto:${email.trim()}">${email.trim()}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px; font-weight: bold; color: #374151;">Idioma:</td>
                  <td style="padding: 8px;">${language || 'no especificado'}</td>
                </tr>
              </table>
              <div style="margin-top: 16px; padding: 16px; background: #f3f4f6; border-radius: 8px;">
                <h3 style="margin-top: 0; color: #374151;">Mensaje:</h3>
                <p style="white-space: pre-wrap; color: #1f2937;">${message.trim()}</p>
              </div>
              <p style="margin-top: 16px; font-size: 12px; color: #9ca3af;">
                Enviado desde dailymp.es el ${new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })}
              </p>
            </div>
          `
        });

        // Log the resend result so you can correlate with Resend dashboard
        console.log('Resend send result:', {
          to: NOTIFY_EMAIL,
          replyTo: email.trim().toLowerCase(),
          messageId: (emailResult as any)?.id || null,
          raw: emailResult
        });

      } catch (emailError) {
        // No bloquear la respuesta si falla el email
        console.error('Error enviando email:', emailError);
      }
    } else {
      console.warn('RESEND_API_KEY no configurada. Email de notificación no enviado.');
    }
    
    // Log saved DB row id for correlation
    try {
      console.log('Contact message saved:', { id: (data as any)?.id, email: (data as any)?.email });
    } catch (logErr) {
      // ignore
    }

    return NextResponse.json({
      success: true,
      message: 'Mensaje recibido correctamente'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
