import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { validateRecaptcha } from '../../lib/recaptcha';

type ResponseData = {
  message: string;
  success: boolean;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed', success: false });
    return;
  }

  const { name, email, phone, subject, message, service, recipient } = req.body;

  // Validar campos requeridos
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ 
      message: 'Faltan campos requeridos', 
      success: false,
      error: 'Todos los campos son obligatorios'
    });
  }
  
  // Validar reCAPTCHA para prevenir spam
  if (process.env.NODE_ENV === 'production') {
    const recaptchaValid = await validateRecaptcha(req.body.recaptchaToken);
    if (!recaptchaValid) {
      return res.status(400).json({ 
        message: 'Verificación reCAPTCHA fallida', 
        success: false,
        error: 'Verificación reCAPTCHA fallida'
      });
    }
  }

  // Configuración del transporte de correo
  // NOTA: Se debe configurar con las credenciales correctas en producción
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER || recipient, // Usa la variable de entorno o el email del recipiente
      pass: process.env.EMAIL_PASSWORD, // Debe ser una contraseña de aplicación de Google
    },
  });

  try {
    // Construir correo electrónico
    const mailOptions = {
      from: process.env.EMAIL_USER || recipient,
      to: recipient,
      subject: `Nuevo contacto desde Immigration For US: ${subject}`,
      html: `
        <h1>Nuevo mensaje de contacto</h1>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Asunto:</strong> ${subject}</p>
        ${service ? `<p><strong>Servicio:</strong> ${service}</p>` : ''}
        <h2>Mensaje:</h2>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Enviar correo
    const info = await transporter.sendMail(mailOptions);

    console.log('Message sent: %s', info.messageId);
    res.status(200).json({ message: 'Mensaje enviado correctamente', success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error al enviar el mensaje', success: false });
  }
} 