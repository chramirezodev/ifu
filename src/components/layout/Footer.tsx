import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { contactInfo, footerServices, firmInfo } from '@/constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy text-white">
      <div className="container mx-auto px-4 max-w-6xl py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          <div className="flex flex-col justify-start items-start">
            <div className="bg-white rounded-md p-3 mb-4">
              <Image 
                src="/images/Logos/mardini-logo.jpeg"
                alt="Mardini Law Firm Logo"
                width={200}
                height={80}
                className="w-auto h-16 object-contain"
              />
            </div>
            <p className="text-gray-300 mb-2 font-semibold text-sm">
              {firmInfo.slogan}
            </p>
            <p className="text-brand-silver text-sm">Immigration Attorneys</p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li><Link href="/#inicio" className="text-gray-300 hover:text-white transition-colors">Inicio</Link></li>
              <li><Link href="/#nosotros" className="text-gray-300 hover:text-white transition-colors">Nosotros</Link></li>
              <li><Link href="/#servicios" className="text-gray-300 hover:text-white transition-colors">Servicios</Link></li>
              <li><Link href="/#por-que-elegirnos" className="text-gray-300 hover:text-white transition-colors">Por qué elegirnos</Link></li>
              <li>
                <a
                  href={contactInfo.paymentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Paga Aquí
                </a>
              </li>
              <li><Link href="/#contacto" className="text-gray-300 hover:text-white transition-colors">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2">
              {footerServices.map((service) => (
                <li key={service}>
                  <Link href="/#servicios" className="text-gray-300 hover:text-white transition-colors text-sm">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-start md:col-span-1">
            <h3 className="text-white font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>{contactInfo.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8" /><path strokeLinecap="round" strokeLinejoin="round" d="M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <a href={`mailto:${contactInfo.email}`} className="hover:text-white break-all">{contactInfo.email}</a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <a href={`tel:${contactInfo.phone.replace(/[^\d+]/g, '')}`} className="hover:text-white">{contactInfo.phone}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-8 mb-4">
          <a 
            href={`https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent(contactInfo.whatsappAutoMessage)}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="WhatsApp" 
            className="hover:text-brand-silver transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.52 3.48A12.07 12.07 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.22-1.63A12.07 12.07 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52zM12 22c-1.85 0-3.68-.5-5.25-1.44l-.38-.22-3.69.97.99-3.59-.25-.37A9.93 9.93 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.34-.26.27-1 1-.97 2.43.03 1.43 1.03 2.81 1.18 3.01.15.2 2.03 3.1 4.93 4.23.69.3 1.23.48 1.65.61.69.22 1.32.19 1.81.12.55-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z"/>
            </svg>
          </a>
        </div>

        <hr className="border-white/10 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center mt-4">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} Mardini Law Firm. Todos los derechos reservados.
          </p>
          <div className="flex flex-col md:flex-row md:space-x-4 w-full md:w-auto md:justify-end items-center pb-4 md:pb-0">
            <Link href="/politicas" className="text-white text-sm underline hover:text-brand-silver transition-colors mb-2 md:mb-0 px-3 py-2">
              Políticas de Uso y Privacidad
            </Link>
            <Link href="/aviso-legal" className="text-white text-sm underline hover:text-brand-silver transition-colors px-3 py-2">
              Aviso Legal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
