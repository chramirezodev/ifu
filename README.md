# Immigration For US - Sitio Web Corporativo

## Descripción
Sitio web corporativo para una empresa de servicios de inmigración en Estados Unidos. El proyecto está construido con React, Tailwind CSS y utiliza Strapi como CMS headless.

## Tecnologías Principales
- React.js
- Tailwind CSS
- Strapi CMS
- Next.js (para SSR y optimización)
- WhatsApp Business API

## Requisitos del Sistema
- Node.js >= 18.x
- npm >= 9.x
- PostgreSQL >= 14.x (para Strapi)

## Estructura del Proyecto
```
immigration-for-us/
├── src/
│   ├── components/     # Componentes React reutilizables
│   ├── pages/         # Páginas de la aplicación
│   └── lib/           # Utilidades y configuraciones
├── public/
│   └── images/        # Imágenes estáticas
├── texts/             # Documentación y contenido
└── cms/              # Configuración de Strapi
```

## Paleta de Colores
- Azul Bandera: #3C3B6E
- Rojo Bandera: #B22234
- Blanco: #FFFFFF
- Azul Claro: #5C5B9E
- Rojo Claro: #D24254

## Instalación y Configuración

### 1. Clonar el Repositorio
```bash
git clone [URL_DEL_REPOSITORIO]
cd immigration-for-us
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Configurar Variables de Entorno
Crear archivo `.env.local` con las siguientes variables:
```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_WHATSAPP_NUMBER=[NÚMERO_WHATSAPP]
```

### 4. Iniciar el Proyecto
```bash
npm run dev
```

## Estructura del CMS
El CMS (Strapi) está organizado en las siguientes colecciones:

### Contenido Principal
- Inicio
- Servicios
- Proceso
- Testimonios
- Contacto

### Medios
- Imágenes
- Documentos
- Videos

## Guía de Estilos
- Tipografía: Inter (principal), Roboto (secundaria)
- Espaciado: Sistema de 8px
- Breakpoints:
  - Mobile: 320px - 767px
  - Tablet: 768px - 1023px
  - Desktop: 1024px+

## Mantenimiento
- Actualizar contenido a través del panel de administración de Strapi
- Seguir las guías de estilo establecidas
- Mantener las imágenes optimizadas
- Realizar backups regulares de la base de datos

## Contacto
Para soporte técnico o consultas, contactar a [CONTACTO_TÉCNICO] 