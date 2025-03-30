import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['es', 'en'];
const defaultLocale = 'es';

export function middleware(request: NextRequest) {
  // Obtener la cookie de idioma si existe
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  
  // Utilizar la cookie de idioma o el predeterminado
  const locale = cookieLocale && locales.includes(cookieLocale) 
    ? cookieLocale 
    : defaultLocale;

  // Verificar si ya hay un locale en la URL
  const pathname = request.nextUrl.pathname;
  const pathnameHasLocale = locales.some(
    (loc) => pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`
  );

  // Si no hay locale en la URL, redirigir al locale de la cookie o al predeterminado
  if (!pathnameHasLocale) {
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico|images|locales).*)',
  ],
}; 