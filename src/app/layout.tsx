import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Immigration For Us - Trámites migratorios en Estados Unidos',
  description: 'Servicios profesionales de preparación de documentos migratorios en EE.UU. Residencia, ciudadanía, DACA y más.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-4">
              <div className="flex justify-between items-center">
                <a href="/" className="text-2xl font-bold text-usa-blue">Immigration For Us</a>
                <nav>
                  <ul className="flex space-x-6">
                    <li><a href="/#nosotros" className="text-gray-700 hover:text-usa-blue">Nosotros</a></li>
                    <li><a href="/#servicios" className="text-gray-700 hover:text-usa-blue">Servicios</a></li>
                    <li><a href="/#por-que-elegirnos" className="text-gray-700 hover:text-usa-blue">¿Por qué elegirnos?</a></li>
                    <li><a href="/#testimonios" className="text-gray-700 hover:text-usa-blue">Testimonios</a></li>
                    <li><a href="/#contacto" className="text-gray-700 hover:text-usa-blue">Contacto</a></li>
                  </ul>
                </nav>
              </div>
            </div>
          </header>
          <main className="flex-grow">{children}</main>
          <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto px-4">
              <div className="text-center">
                <p>© {new Date().getFullYear()} Immigration For Us. Todos los derechos reservados.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
} 