# Mardini Law Firm

Sitio web de **Mardini Law Firm** — Immigration Attorneys.

Representación legal en inmigración ante USCIS, EOIR y BIA.

## URLs

| Fase | URL |
|------|-----|
| Preview / revisión cliente | [immigrationfor-us.com](https://immigrationfor-us.com) (dominio IFU actual) |
| Go-live | [www.mardinilawfirm.com](https://www.mardinilawfirm.com) |
| CMS Admin | `/admin` (Payload CMS) |

Contacto: Roger Mardini, Esq. · +1 (754) 234-4284 · info@mardinilawfirm.com  
Dirección: 7224 NW 116th Way, Parkland, FL 33076

## Stack

Next.js 15 · React 19 · TypeScript · Tailwind CSS · next-i18next (es/en) · **Payload CMS 3** · Postgres

## Desarrollo

1. Copia variables de entorno:

```bash
cp .env.example .env.local
```

2. Arranca Postgres local (Docker):

```bash
docker compose up -d
```

3. Instala dependencias y semilla el CMS:

```bash
npm install --legacy-peer-deps
npm run seed
npm run dev
```

4. Abre:
- Sitio: [http://localhost:3000](http://localhost:3000)
- Admin Payload: [http://localhost:3000/admin](http://localhost:3000/admin)

Usuario seed por defecto (cambiar en producción):

- Email: `admin@mardinilawfirm.com`
- Password: `ChangeMe123!`

## CMS — contenido editable

Desde `/admin` puedes gestionar:

**Collections:** Services, Testimonials, FAQs, Posts (blog), Media, Users  
**Globals:** Site Settings, SEO, Home Hero/Welcome/About/Why Choose Us, Services Page

El frontend usa la Local API de Payload con **fallback** al contenido local si la base de datos no está disponible.

## Base de datos (Vercel + VPS)

El CMS usa Postgres centralizado en el VPS (`168.231.70.80:5433`, contenedor Docker `postgresql`).

Base del proyecto: `mardini_cms` (usuario dedicado).

En **Vercel → Project → Settings → Environment Variables** configura:

- `DATABASE_URI` — connection string del VPS (ver `.env.vps.local` en tu máquina, no se sube a git)
- `PAYLOAD_SECRET` — secreto largo aleatorio
- `NEXT_PUBLIC_SERVER_URL` — URL pública del sitio
- `NEXT_PUBLIC_SITE_URL` — misma URL pública

Tras el primer deploy, abrí `/admin` para crear/usar el usuario admin (o corré seed en local apuntando a esa URI).

Uploads de media en Vercel requieren storage externo (Blob/S3/R2); la carpeta `media/` local no persiste en serverless.

