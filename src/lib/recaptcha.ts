const MIN_SCORE = 0.5;

export function isRecaptchaEnabled(): boolean {
  return Boolean(process.env.RECAPTCHA_SECRET_KEY);
}

export async function validateRecaptcha(token: string, expectedAction: string): Promise<boolean> {
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY || '',
        response: token,
      }).toString(),
    });

    const data = await response.json();
    if (!data.success) return false;
    if (data.action && data.action !== expectedAction) return false;
    return typeof data.score !== 'number' || data.score >= MIN_SCORE;
  } catch (error) {
    console.error('Error validando reCAPTCHA:', error);
    return false;
  }
}
