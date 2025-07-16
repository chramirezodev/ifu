import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { contactInfo } from '@/constants';

interface ContactInfo {
  email?: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
  socialMedia?: Array<{ platform: string; url: string }>;
  whatsappNumber?: string;
  whatsappAutoMessage?: string;
}

interface FooterProps {
  contactInfo?: ContactInfo;
}

const Footer: React.FC = () => {
  // Obtener el año actual para el copyright
  const currentYear = new Date().getFullYear();
  
  // Enlaces rápidos - mismo orden que el menú del header
  const quickLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Por qué Elegirnos', href: '#por-que-elegirnos' },
    { label: 'Preguntas Frecuentes', href: '#preguntas-frecuentes' },
    { label: 'Testimonios', href: '#testimonios' },
    { label: 'Contacto', href: '#contacto' }
  ];
  
  // Servicios principales
  const mainServices = [
    { label: 'Visas', href: '#servicios' },
    { label: 'Green Card', href: '#servicios' },
    { label: 'Naturalización', href: '#servicios' },
    { label: 'Asilo Afirmativo', href: '#servicios' },
    { label: 'VAWA', href: '#servicios' },
    { label: 'Visa U', href: '#servicios' }
  ];
  
  // Renderizar ícono de red social según la plataforma
  const renderSocialIcon = (platform: string) => {
    const icons: { [key: string]: JSX.Element } = {
      instagram: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858-.182-.466-.398-.8-.748-1.15-.35-.35-.683-.566-1.15-.748-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
        </svg>
      )
    };
    
    return icons[platform.toLowerCase()] || (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 15v-4H9v4h2zm0-6V7h-2v4h2zm4 6V11h-2v6h2zm0-8V7h-2v2h2z" />
      </svg>
    );
  };
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          {/* Logo y descripción */}
          <div className="flex flex-col justify-start items-start">
            <Image 
              src="/images/Logos/white_logo_transparent_background.png"
              alt="Immigration For Us Logo"
              width={90}
              height={27}
              className="mb-4"
            />
            <p className="text-gray-400 mb-4 font-semibold">
              Unidos por tus sueños, comprometidos con tu futuro
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-white font-semibold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li><Link href="/#inicio" className="text-gray-400 hover:text-white transition-colors">Inicio</Link></li>
              <li><Link href="/#nosotros" className="text-gray-400 hover:text-white transition-colors">Nosotros</Link></li>
              <li><Link href="/#servicios" className="text-gray-400 hover:text-white transition-colors">Servicios</Link></li>
              <li><Link href="/#por-que-elegirnos" className="text-gray-400 hover:text-white transition-colors">Por qué elegirnos</Link></li>
              <li><Link href="/#preguntas-frecuentes" className="text-gray-400 hover:text-white transition-colors">Preguntas</Link></li>
              <li><Link href="/#testimonios" className="text-gray-400 hover:text-white transition-colors">Testimonios</Link></li>
              <li><Link href="/#contacto" className="text-gray-400 hover:text-white transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="text-white font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li><Link href="/#servicios" className="text-gray-400 hover:text-white transition-colors">Visas</Link></li>
              <li><Link href="/#servicios" className="text-gray-400 hover:text-white transition-colors">Green Card</Link></li>
              <li><Link href="/#servicios" className="text-gray-400 hover:text-white transition-colors">Naturalización</Link></li>
              <li><Link href="/#servicios" className="text-gray-400 hover:text-white transition-colors">Asilo Afirmativo</Link></li>
              <li><Link href="/#servicios" className="text-gray-400 hover:text-white transition-colors">VAWA</Link></li>
              <li><Link href="/#servicios" className="text-gray-400 hover:text-white transition-colors">Visa U</Link></li>
            </ul>
          </div>

          {/* Contacto (sin dirección) */}
          <div className="flex flex-col justify-start md:col-span-1">
            <h3 className="text-white font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8" /></svg>
                <span className="md:text-sm text-xs whitespace-nowrap">cpalisa@immigrationfor-us.com</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span>+1 (954) 588 4018</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Íconos de redes sociales */}
        <div className="flex justify-center gap-6 mt-8 mb-4">
          <a href="https://www.instagram.com/immigration.for.us" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-usa-blue transition-colors">
            {renderSocialIcon('instagram')}
          </a>
          <a 
            href={`https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent(contactInfo.whatsappAutoMessage)}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="WhatsApp" 
            className="hover:text-usa-blue transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.52 3.48A12.07 12.07 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.22-1.63A12.07 12.07 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52zM12 22c-1.85 0-3.68-.5-5.25-1.44l-.38-.22-3.69.97.99-3.59-.25-.37A9.93 9.93 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.34-.26.27-1 1-.97 2.43.03 1.43 1.03 2.81 1.18 3.01.15.2 2.03 3.1 4.93 4.23.69.3 1.23.48 1.65.61.69.22 1.32.19 1.81.12.55-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z"/>
            </svg>
          </a>
        </div>

        {/* Línea divisoria */}
        <hr className="border-gray-800 my-8" />

        {/* Pie de página */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-8">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2022 Immigration For US. Todos los derechos reservados.
          </p>
          <div className="flex flex-col md:flex-row md:space-x-6 w-full md:w-auto md:justify-end items-center pb-4 md:pb-0">
            <Link href="/politicas" className="text-white font-bold underline hover:text-usa-blue text-lg transition-colors mb-2 md:mb-0 md:mr-2 px-4 py-2 rounded-lg bg-usa-blue bg-opacity-80 shadow-md">
              Políticas de Uso y Privacidad
            </Link>
            <Link href="/aviso-legal" className="text-white font-bold underline hover:text-usa-blue text-lg transition-colors px-4 py-2 rounded-lg bg-usa-blue bg-opacity-80 shadow-md">
              Aviso Legal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 