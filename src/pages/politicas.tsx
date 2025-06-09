import React from 'react';
import Head from 'next/head';

const Politicas = () => (
  <>
    <Head>
      <title>Políticas de Uso y Privacidad | Immigration For US</title>
      <meta name="description" content="Lee nuestras políticas de uso y privacidad. Immigration For US protege tu información y explica cómo usamos tus datos." />
    </Head>
    <main className="py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-usa-blue">Políticas de Uso y Privacidad</h1>
        <p className="mb-4">En Immigration For US, nos comprometemos a proteger tu privacidad. Para conocer más detalles sobre el uso de tus datos, consulta nuestro <a href="/aviso-legal" className="text-usa-blue underline">AVISO LEGAL</a>.</p>
        <p className="mb-4">Nos reservamos el derecho de modificar estas políticas en cualquier momento. Te recomendamos revisar periódicamente esta información para estar al tanto de cualquier actualización.</p>
        <hr className="my-8" />
        <h2 className="text-2xl font-semibold mb-4 text-usa-blue">Política de Privacidad</h2>
        <h3 className="text-xl font-semibold mb-2">Información Recopilada</h3>
        <p className="mb-4">Podremos recoger información personal como su nombre, información de contacto y datos demográficos. Esta información se utiliza para:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Mantener un registro de usuarios.</li>
          <li>Procesar pedidos o facturaciones.</li>
          <li>Enviar información relevante y ofertas especiales.</li>
        </ul>
        <p className="mb-4">Nos comprometemos a mantener su información segura y no compartirla sin su consentimiento expreso, salvo cuando lo exija la ley.</p>
        <h3 className="text-xl font-semibold mb-2">Uso de Cookies</h3>
        <p className="mb-4">Nuestro sitio web utiliza cookies para mejorar la experiencia del usuario. Usted puede aceptar o rechazar el uso de cookies desde la configuración de su navegador.</p>
        <h3 className="text-xl font-semibold mb-2">Correos Electrónicos y Comunicaciones</h3>
        <p className="mb-4">Enviaremos correos electrónicos solo si usted nos proporciona su dirección y acepta recibir comunicaciones. Puede cancelar su suscripción en cualquier momento siguiendo las instrucciones incluidas en cada mensaje.</p>
        <h3 className="text-xl font-semibold mb-2">Divulgación de Información a Terceros</h3>
        <p className="mb-4">No compartimos su información personal con terceros sin su autorización, salvo en casos necesarios para el cumplimiento de la ley o protección de nuestros derechos.</p>
        <h3 className="text-xl font-semibold mb-2">Contacto</h3>
        <ul className="mb-4">
          <li>WhatsApp: <a href="https://wa.me/19545884018" className="text-usa-blue underline">+1 (954) 588 4018</a></li>
          <li>Email: <a href="mailto:cpalisa@immigrationfor-us.com" className="text-usa-blue underline">cpalisa@immigrationfor-us.com</a></li>
          <li>Horario de atención: Lunes a Viernes de 8 am a 6 pm ET.</li>
        </ul>
        <p className="text-sm text-gray-500">Nos reservamos el derecho de modificar estas políticas en cualquier momento. Recomendamos revisar periódicamente esta página para estar al tanto de cualquier actualización.</p>
      </div>
    </main>
  </>
);

export default Politicas; 