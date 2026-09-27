/** Guías de imagen para editores no técnicos (aparecen en el admin de Payload). */

export const IMG = {
  hero: 'Ideal: 3840×2160 (16:9) o 7680×4320. Mínimo Retina: 2560×1440. JPG/WebP. Evite PNG “HD” por debajo de ~1920 de ancho: en escritorio se verá borroso.',
  about: 'Recomendado: 1000×1000 px (cuadrada) o 1200×900 px. JPG o WebP. Menos de 1 MB.',
  welcomePhoto: 'Recomendado: 800×800 px (retrato cuadrado) o vertical 900×1600. JPG o WebP. Fondo limpio. Menos de 800 KB.',
  service: 'Recomendado: 1200×800 px (horizontal). JPG o WebP. Menos de 1 MB.',
  blog: 'Recomendado: 1200×630 px (ideal para redes y Google). JPG o WebP. Menos de 1 MB.',
  banner: 'Recomendado: 1600×900 px (horizontal). JPG o WebP. Menos de 1.2 MB.',
  avatar: 'Recomendado: 400×400 px (cuadrada). JPG o WebP. Menos de 300 KB.',
  logo: 'Preferible SVG (trazos finos nítidos a cualquier tamaño). PNG: fondo transparente, ≥ 2000 px de ancho (artboard ~2458×819). No usar variantes 800×600 del CMS para el menú.',
  og: 'Recomendado: 1200×630 px (imagen al compartir en WhatsApp/Facebook). JPG o WebP. Menos de 1 MB.',
  general:
    'Use JPG, PNG, WebP o SVG (logos). Máximo ~4 MB en subidas CMS. Si pesa más, comprímala antes. Complete siempre la descripción de la imagen.',
} as const
