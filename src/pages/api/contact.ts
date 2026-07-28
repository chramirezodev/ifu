import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { validateRecaptcha } from '../../lib/recaptcha';

type ResponseData = {
  message: string;
  success: boolean;
  error?: string;
};

// Función para validar email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Función para sanitizar datos
function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      message: 'Método no permitido', 
      success: false,
      error: 'Método no permitido'
    });
  }

  try {
    const { name, email, phone, service, message, recaptchaToken } = req.body;

    // Validar campos obligatorios
    if (!name || !email || !message) {
      return res.status(400).json({ 
        message: 'Faltan campos obligatorios', 
        success: false,
        error: 'Faltan campos obligatorios'
      });
    }

    // Validar formato de email
    if (!isValidEmail(email)) {
      return res.status(400).json({ 
        message: 'Formato de email inválido', 
        success: false,
        error: 'Formato de email inválido'
      });
    }

    // Sanitizar datos
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPhone = phone ? sanitizeInput(phone) : '';
    const sanitizedService = service ? sanitizeInput(service) : '';
    const sanitizedMessage = sanitizeInput(message);

    // Validar reCAPTCHA para prevenir spam
    if (process.env.NODE_ENV === 'production') {
      if (!recaptchaToken) {
        return res.status(400).json({ 
          message: 'Token de reCAPTCHA requerido', 
          success: false,
          error: 'Token de reCAPTCHA requerido'
        });
      }

      const recaptchaValid = await validateRecaptcha(recaptchaToken);
      if (!recaptchaValid) {
        return res.status(400).json({ 
          message: 'Verificación reCAPTCHA fallida', 
          success: false,
          error: 'Verificación reCAPTCHA fallida'
        });
      }
    }

    // Configurar transporter de email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Enviar email principal
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'info@mardinilawfirm.com',
      cc: 'carlos.ramirez16031@gmail.com',
      subject: `Nuevo mensaje de contacto de ${sanitizedName}`,
      text: `
Nombre: ${sanitizedName}
Correo electrónico: ${sanitizedEmail}
Teléfono: ${sanitizedPhone}
Servicio de interés: ${sanitizedService}
Mensaje: ${sanitizedMessage}
      `,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${sanitizedName}</p>
        <p><strong>Correo electrónico:</strong> ${sanitizedEmail}</p>
        <p><strong>Teléfono:</strong> ${sanitizedPhone}</p>
        <p><strong>Servicio de interés:</strong> ${sanitizedService}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
      `,
    });

    // Enviar email de confirmación al cliente
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: sanitizedEmail,
      subject: 'Confirmación de recepción - Mardini Law Firm',
      text: `
Estimado/a ${sanitizedName},

Hemos recibido su mensaje y nos pondremos en contacto con usted en las próximas 24 horas.

Resumen de su consulta:
Servicio de interés: ${sanitizedService || 'No especificado'}
Mensaje: ${sanitizedMessage}

Gracias por contactarnos.

Atentamente,
Mardini Law Firm
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0D1B3D;">Confirmación de recepción</h2>
          <p>Estimado/a <strong>${sanitizedName}</strong>,</p>
          <p>Hemos recibido su mensaje y nos pondremos en contacto con usted en las próximas 24 horas.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0D1B3D; margin-top: 0;">Resumen de su consulta:</h3>
            <p><strong>Servicio de interés:</strong> ${sanitizedService || 'No especificado'}</p>
            <p><strong>Mensaje:</strong></p>
            <p style="background-color: white; padding: 15px; border-radius: 4px;">${sanitizedMessage.replace(/\n/g, '<br>')}</p>
          </div>
          
          <p>Gracias por contactarnos.</p>
          <p>Atentamente,<br><strong>Mardini Law Firm</strong></p>
        </div>
      `,
    });

    return res.status(200).json({ 
      message: 'Correo enviado correctamente',
      success: true
    });
  } catch (error) {
    console.error('Error en API de contacto:', error);
    return res.status(500).json({ 
      message: 'Error interno del servidor',
      success: false,
      error: 'Error interno del servidor'
    });
  }
} 