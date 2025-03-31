# Immigration For US - Sitio Web

Sitio web oficial para Immigration For US, un servicio especializado en asesoría migratoria a Estados Unidos.

## Requisitos previos

- Node.js 18.0 o superior
- NPM o Yarn

## Instalación local

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/TU_USUARIO/NOMBRE_DEL_REPOSITORIO.git
   cd NOMBRE_DEL_REPOSITORIO
   ```

2. Instalar dependencias:
   ```bash
   npm install
   # o
   yarn install
   ```

3. Crear archivo `.env.local` con las variables de entorno necesarias:
   ```
   EMAIL_USER=cpalisa@immigrationfor-us.com
   EMAIL_PASSWORD=tu-contraseña-de-aplicación
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```
   
   > Nota: Para Gmail, debes usar una "contraseña de aplicación" en lugar de tu contraseña normal. 
   > [Aprende cómo crear una contraseña de aplicación para Gmail](https://support.google.com/accounts/answer/185833?hl=es)

4. Ejecutar en modo desarrollo:
   ```bash
   npm run dev
   # o
   yarn dev
   ```

5. Acceder a `http://localhost:3000` para ver el sitio.

## Despliegue en producción

### Preparación para el despliegue

1. Construir la aplicación para producción:
   ```bash
   npm run build
   # o
   yarn build
   ```

2. Asegurarse de que la aplicación funciona correctamente:
   ```bash
   npm run start
   # o
   yarn start
   ```

### Opciones de hosting

#### 1. Vercel (Recomendado)

La forma más sencilla de desplegar esta aplicación Next.js es utilizando [Vercel](https://vercel.com), la plataforma de los creadores de Next.js:

1. Crear una cuenta en Vercel
2. Importar tu repositorio Git
3. Configurar las variables de entorno en la interfaz de Vercel:
   - `EMAIL_USER`
   - `EMAIL_PASSWORD`
   - `NEXT_PUBLIC_SITE_URL`
4. Desplegar

#### 2. Netlify

También puedes utilizar [Netlify](https://netlify.com):

1. Crear una cuenta en Netlify
2. Importar tu repositorio Git
3. Configurar las variables de entorno en la interfaz de Netlify
4. Definir el comando de construcción: `npm run build`
5. Definir el directorio de publicación: `out`

#### 3. Hosting tradicional (cPanel, etc.)

1. Construir la aplicación:
   ```bash
   npm run build
   # o 
   yarn build
   ```
2. Exportar a HTML estático (opcional para algunos casos):
   ```bash
   next export
   ```
3. Subir los archivos de la carpeta `out` (si usaste `next export`) o `.next` a tu servidor
4. Configurar el servidor para servir los archivos

## Configuración de dominio

1. Comprar un dominio (si aún no lo tienes)
2. Configurar los registros DNS para que apunten a tu hosting
3. Configurar HTTPS para garantizar la seguridad del sitio

## Mantenimiento

Para mantener el sitio actualizado:

1. Realiza cambios en tu repositorio local
2. Prueba los cambios localmente
3. Haz commit y sube los cambios a GitHub
4. Si estás utilizando Vercel o Netlify, el despliegue se realizará automáticamente

## Contacto

Para soporte técnico, contacta a:
- Email: cpalisa@immigrationfor-us.com
- WhatsApp: +1 (954) 588-4018 