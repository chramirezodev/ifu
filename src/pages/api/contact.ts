import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { validateRecaptcha } from '../../lib/recaptcha';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { name, email, phone, service, message, recaptchaToken } = req.body;

  // Validar campos requeridos
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }
  
  // Validar reCAPTCHA para prevenir spam
  if (process.env.NODE_ENV === 'production') {
    const recaptchaValid = await validateRecaptcha(recaptchaToken);
    if (!recaptchaValid) {
      return res.status(400).json({ error: 'Verificación reCAPTCHA fallida' });
    }
  }

  // Configurar el transporte de correo
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER,
    port: Number(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    // Enviar correo al administrador
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `Nuevo contacto de ${name}`,
      html: `
        <h1>Nuevo mensaje de contacto</h1>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Servicio:</strong> ${service || 'No especificado'}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
    });

    // Enviar correo de confirmación al usuario
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Hemos recibido tu mensaje - Immigration For US',
      html: `
        <h1>¡Gracias por contactarnos!</h1>
        <p>Hola ${name},</p>
        <p>Hemos recibido tu mensaje y nos pondremos en contacto contigo lo antes posible.</p>
        <p>Mientras tanto, puedes contactarnos directamente a través de:</p>
        <ul>
          <li>Teléfono: +1 (954) 588 4018</li>
          <li>Email: cpalisa@immigrationfor-us.com</li>
          <li>WhatsApp: +1 (954) 588 4018</li>
        </ul>
        <p>Saludos cordiales,<br>El equipo de Immigration For US</p>
      `,
    });

    return res.status(200).json({ message: 'Mensaje enviado correctamente' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return res.status(500).json({ error: 'Error al enviar el mensaje' });
  }
} 