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
    res.status(405).json({ message: 'Método no permitido' });
    return;
  }

  const { name, email, phone, service, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
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

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'cpalisa@immigrationfor-us.com',
      subject: `Nuevo mensaje de contacto de ${name}`,
      text: `\nNombre: ${name}\nCorreo electrónico: ${email}\nTeléfono: ${phone}\nServicio de interés: ${service}\nMensaje: ${message}\n`,
    });

    return res.status(200).json({ message: 'Correo enviado correctamente' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al enviar el correo' });
  }
} 