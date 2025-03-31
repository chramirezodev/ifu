# Immigration For US

Proyecto de sitio web para servicios de inmigración.

## Configuración del Proyecto

### Instalación

1. Clonar el repositorio
   ```bash
   git clone https://github.com/tu-usuario/immigration-for-us.git
   cd immigration-for-us
   ```

2. Instalar dependencias de la aplicación principal
   ```bash
   npm install
   ```

3. Instalar dependencias del CMS
   ```bash
   cd cms
   npm install
   cd ..
   ```

### Configuración de Variables de Entorno

1. Crea un archivo `.env.local` en la raíz del proyecto con el siguiente contenido:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:1337
   ```

2. Para el CMS, asegúrate de configurar las siguientes variables de entorno en producción:
   ```
   ADMIN_JWT_SECRET=tu-token-seguro
   API_TOKEN_SALT=tu-salt-seguro
   APP_KEYS=tu-key1,tu-key2
   TRANSFER_TOKEN_SALT=tu-transfer-salt-seguro
   DATABASE_CLIENT=sqlite
   ```

### Desarrollo Local

1. Iniciar el CMS en modo desarrollo
   ```bash
   cd cms
   npm run develop
   # Disponible en http://localhost:1337/admin
   ```

2. En otra terminal, iniciar la aplicación Next.js
   ```bash
   npm run dev
   # Disponible en http://localhost:3000
   ```

## Despliegue en Vercel

Para desplegar este proyecto en Vercel, sigue estos pasos:

1. Crea una cuenta en [Vercel](https://vercel.com) si no tienes una.

2. Instala Vercel CLI (opcional, pero útil)
   ```bash
   npm i -g vercel
   ```

3. **Configuración antes del despliegue:**
   
   a. Asegúrate de que tu `vercel.json` esté correctamente configurado
   
   b. En el dashboard de Vercel, después de conectar tu repositorio, configura las siguientes variables de entorno:
      - `ADMIN_JWT_SECRET` - Un token seguro para la autenticación del admin
      - `API_TOKEN_SALT` - Salt para generar tokens de API
      - `APP_KEYS` - Claves de aplicación separadas por comas
      - `TRANSFER_TOKEN_SALT` - Salt para tokens de transferencia
      - `DATABASE_CLIENT` - Cliente de base de datos (sqlite, postgres, etc.)
      - Si usas Postgres u otra base de datos en producción:
        - `DATABASE_URL` - URL de conexión a la base de datos

4. **Opciones de despliegue:**

   **A. Usando la interfaz web de Vercel:**
   - Importa tu repositorio de GitHub
   - Configura el proyecto (las variables de entorno mencionadas arriba)
   - Despliega

   **B. Usando Vercel CLI:**
   ```bash
   vercel login
   vercel
   # Sigue las instrucciones en pantalla
   ```

5. **Después del primer despliegue:**
   - Configura un dominio personalizado si lo deseas
   - Verifica que tanto la aplicación Next.js como el CMS Strapi funcionen correctamente

### Notas importantes sobre el despliegue

- **Base de datos en producción:** Para entornos de producción, es recomendable usar una base de datos externa como PostgreSQL en lugar de SQLite.
- **Archivos multimedia:** Configura un proveedor de almacenamiento como AWS S3 para manejar los archivos subidos en producción.
- **Permisos de CORS:** Asegúrate de que los CORS estén correctamente configurados en el CMS para permitir solicitudes desde tu dominio.

## Estructura del Proyecto

```
immigration-for-us/
├── cms/                  # CMS Strapi
├── public/               # Archivos estáticos de Next.js
├── src/                  # Código fuente de la aplicación Next.js
│   ├── components/       # Componentes React
│   ├── pages/            # Páginas de Next.js
│   └── styles/           # Estilos CSS/SCSS
├── .env.local            # Variables de entorno locales
├── next.config.js        # Configuración de Next.js
├── package.json          # Dependencias y scripts
└── vercel.json           # Configuración de despliegue en Vercel
```

## Licencia

[MIT](https://choosealicense.com/licenses/mit/) 