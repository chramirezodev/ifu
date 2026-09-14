import { Gutter } from '@payloadcms/ui'
import React from 'react'

const cards = [
  {
    href: '/admin/globals/site-settings',
    title: 'Contacto y firma',
    body: 'Teléfono, WhatsApp, dirección, logo (menú y pie) y enlace de pago.',
  },
  {
    href: '/admin/globals/home-hero',
    title: 'Portada (imagen grande)',
    body: 'Foto de fondo y textos principales del inicio. Imagen: 1920×1080.',
  },
  {
    href: '/admin/collections/services',
    title: 'Servicios',
    body: 'Títulos, descripciones e imágenes de cada servicio. Imagen: 1200×800.',
  },
  {
    href: '/admin/collections/posts',
    title: 'Blog',
    body: 'Artículos: título, resumen, foto y contenido. Portada: 1200×630.',
  },
  {
    href: '/admin/collections/media',
    title: 'Biblioteca de imágenes',
    body: 'Suba fotos aquí (JPG/WebP). Luego selecciónelas en cada sección.',
  },
]

export function BeforeDashboard() {
  return (
    <Gutter>
      <div
        style={{
          marginBottom: '2rem',
          padding: '1.25rem 1.5rem',
          borderRadius: 12,
          background: 'var(--theme-elevation-50)',
          border: '1px solid var(--theme-elevation-150)',
        }}
      >
        <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.35rem' }}>
          Panel de contenido — Mardini Law Firm
        </h2>
        <p style={{ margin: '0 0 1rem', opacity: 0.85, maxWidth: 720 }}>
          Use este panel para cambiar textos e imágenes del sitio. No necesita código. En cada
          campo de imagen verá el tamaño recomendado. Las pestañas “Avanzado” son solo para
          técnicos.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '0.75rem',
          }}
        >
          {cards.map((card) => (
            <a
              key={card.href}
              href={card.href}
              style={{
                display: 'block',
                padding: '0.9rem 1rem',
                borderRadius: 10,
                background: 'var(--theme-elevation-0)',
                border: '1px solid var(--theme-elevation-150)',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <strong style={{ display: 'block', marginBottom: 4 }}>{card.title}</strong>
              <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>{card.body}</span>
            </a>
          ))}
        </div>
        <p style={{ margin: '1rem 0 0', fontSize: '0.85rem', opacity: 0.75 }}>
          Guía rápida: Portada 1920×1080 · Blog 1200×630 · Servicios 1200×800 · Avatar 400×400 ·
          Logo PNG. Preferir JPG o WebP y menos de 1.5 MB.
        </p>
      </div>
    </Gutter>
  )
}

export default BeforeDashboard
