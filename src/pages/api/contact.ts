import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { isRecaptchaEnabled, validateRecaptcha } from '../../lib/recaptcha';

type ResponseData = {
  message: string;
  success: boolean;
  error?: string;
};

const RECAPTCHA_ACTION = 'contact_form';

const LIMITS = {
  name: 120,
  email: 200,
  phone: 40,
  subject: 200,
  message: 5000,
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clean(value: unknown, maxLength: number): string {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getSmtpConfig() {
  const user = process.env.SMTP_USER || process.env.EMAIL_USER;
  const pass = process.env.SMTP_PASSWORD || process.env.EMAIL_PASSWORD;
  if (!user || !pass) return null;

  const port = Number(process.env.SMTP_PORT || 465);
  return {
    host: process.env.SMTP_HOST || 'smtp.hostinger.com',
    port,
    secure: port === 465,
    auth: { user, pass },
  };
}

const confirmationCopy = {
  es: {
    subject: 'Hemos recibido su mensaje - Mardini Law Firm',
    greeting: (name: string) => `Estimado/a ${name},`,
    body: 'Hemos recibido su mensaje y un miembro de nuestro equipo se pondrá en contacto con usted a la brevedad.',
    urgent: 'Si su consulta es urgente, puede escribirnos por WhatsApp o llamarnos al +1 (754) 234-4284.',
    closing: 'Atentamente,',
  },
  en: {
    subject: 'We have received your message - Mardini Law Firm',
    greeting: (name: string) => `Dear ${name},`,
    body: 'We have received your message and a member of our team will contact you shortly.',
    urgent: 'If your matter is urgent, you can message us on WhatsApp or call us at +1 (754) 234-4284.',
    closing: 'Sincerely,',
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({
      message: 'Método no permitido',
      success: false,
      error: 'Método no permitido',
    });
  }

  const body = req.body || {};

  // Campo trampa invisible: solo lo completan los bots.
  if (clean(body.website, 200)) {
    return res.status(200).json({ message: 'Correo enviado correctamente', success: true });
  }

  const name = clean(body.name, LIMITS.name);
  const email = clean(body.email, LIMITS.email);
  const phone = clean(body.phone, LIMITS.phone);
  const subject = clean(body.subject || body.service, LIMITS.subject);
  const message = clean(body.message, LIMITS.message);
  const locale = body.locale === 'en' ? 'en' : 'es';

  if (!name || !email || !message) {
    return res.status(400).json({
      message: 'Faltan campos obligatorios',
      success: false,
      error: 'Faltan campos obligatorios',
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({
      message: 'Formato de email inválido',
      success: false,
      error: 'Formato de email inválido',
    });
  }

  if (isRecaptchaEnabled()) {
    const token = clean(body.recaptchaToken, 4000);
    if (!token || !(await validateRecaptcha(token, RECAPTCHA_ACTION))) {
      return res.status(400).json({
        message: 'Verificación reCAPTCHA fallida',
        success: false,
        error: 'Verificación reCAPTCHA fallida',
      });
    }
  }

  const smtp = getSmtpConfig();
  if (!smtp) {
    console.error('API de contacto: faltan SMTP_USER/SMTP_PASSWORD (o EMAIL_USER/EMAIL_PASSWORD).');
    return res.status(500).json({
      message: 'El envío de correo no está configurado',
      success: false,
      error: 'El envío de correo no está configurado',
    });
  }

  const transporter = nodemailer.createTransport(smtp);
  const from = `"Mardini Law Firm" <${smtp.auth.user}>`;
  const recipient = process.env.CONTACT_TO_EMAIL || 'info@mardinilawfirm.com';

  const rows: [string, string][] = [
    ['Nombre', name],
    ['Correo electrónico', email],
    ['Teléfono', phone || '—'],
    ['Asunto', subject || '—'],
    ['Idioma del sitio', locale === 'en' ? 'Inglés' : 'Español'],
  ];

  try {
    await transporter.sendMail({
      from,
      to: recipient,
      replyTo: email,
      subject: `Nuevo mensaje de contacto de ${name}`,
      text: `${rows.map(([label, value]) => `${label}: ${value}`).join('\n')}\n\nMensaje:\n${message}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        ${rows.map(([label, value]) => `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>`).join('')}
        <p><strong>Mensaje:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `,
    });
  } catch (error) {
    console.error('Error enviando el correo de contacto:', error);
    return res.status(500).json({
      message: 'Error interno del servidor',
      success: false,
      error: 'Error interno del servidor',
    });
  }

  // El acuse no repite el contenido del mensaje para que el formulario no sirva para enviar spam a terceros.
  const copy = confirmationCopy[locale];
  try {
    await transporter.sendMail({
      from,
      to: email,
      replyTo: recipient,
      subject: copy.subject,
      text: `${copy.greeting(name)}\n\n${copy.body}\n\n${copy.urgent}\n\n${copy.closing}\nMardini Law Firm`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <p>${escapeHtml(copy.greeting(name))}</p>
          <p>${copy.body}</p>
          <p>${copy.urgent}</p>
          <p>${copy.closing}<br><strong>Mardini Law Firm</strong></p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Error enviando el acuse de recibo:', error);
  }

  return res.status(200).json({
    message: 'Correo enviado correctamente',
    success: true,
  });
}
