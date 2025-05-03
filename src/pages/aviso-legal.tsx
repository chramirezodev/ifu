import React from 'react';
import Head from 'next/head';

const AvisoLegal = () => (
  <>
    <Head>
      <title>Aviso Legal | Immigration For US</title>
      <meta name="description" content="Aviso legal y condiciones de uso del sitio web de Immigration For US." />
    </Head>
    <main className="py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-usa-blue">AVISO LEGAL</h1>
        <p className="mb-4">El acceso a este sitio web implica la condición de usuario y la aceptación y conocimiento de las siguientes condiciones de uso, por lo que recomendamos leerlas y comprenderlas antes de hacer uso del sitio. En caso de que no esté dispuesto a aceptar los Términos y Condiciones del presente Acuerdo, le rogamos que no acceda ni utilice esta página web ni publique ningún contenido.</p>
        <p className="mb-4">Usted entiende que este sitio web es propiedad de Immigration for US, incluyendo todos los derechos de propiedad intelectual e industrial que se deriven de o se incluyan en la misma, sin que usted tenga ningún derecho a utilizarlos, salvo en los términos establecidos en las presentes Condiciones de Uso. Nos reservamos el derecho de negar o poner fin a su acceso al Sitio Web a nuestra discreción.</p>
        <p className="mb-4">La puesta a disposición de esta página web es gratuita y, sobre esta base, no tenemos ninguna obligación de mantenimiento o de servicio de soporte, por lo que no nos hacemos responsables de cualquier perjuicio o daño que usted pueda sufrir como consecuencia de un fallo derivado del mantenimiento o actualización de la página web.</p>
        <p className="mb-4">El Propietario de esta página web no asume responsabilidad alguna como consecuencia directa o indirecta de cualquier acción u omisión que usted lleve a cabo tomando como base la información, los servicios u otro material localizado en esta página web.</p>
        <hr className="my-8" />
        <h2 className="text-2xl font-semibold mb-4 text-usa-blue">Uso Permitido</h2>
        <p className="mb-4">Usted podrá hacer uso de esta página web con propósitos lícitos y de acuerdo con las presentes Condiciones de Uso. Se concede una licencia revocable, intransferible y no exclusiva para ver, imprimir y distribuir el contenido con fines personales y no comerciales. No podrá copiar, modificar, exhibir, distribuir o vender el contenido de esta web sin nuestro consentimiento previo y por escrito.</p>
        <p className="mb-4">Adicionalmente, usted se compromete a no:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Utilizar la web de manera que pueda dañarla o interferir con su funcionamiento.</li>
          <li>Usar procesos automáticos para monitorear, copiar o extraer información.</li>
          <li>Intentar obtener acceso no autorizado al sitio web o su contenido.</li>
                </ul>
        <hr className="my-8" />
        <h2 className="text-2xl font-semibold mb-4 text-usa-blue">Política de Privacidad</h2>
        <p className="mb-4">Consulte nuestra <a href="/politicas" className="text-usa-blue underline">Política de Uso y Privacidad</a> para conocer cómo recopilamos, usamos y protegemos su información personal.</p>
        <hr className="my-8" />
        <h2 className="text-2xl font-semibold mb-4 text-usa-blue">Contacto</h2>
        <ul className="mb-4">
          <li>WhatsApp: <a href="https://wa.me/19545884018" className="text-usa-blue underline">+1 (954) 588 4018</a></li>
          <li>Email: <a href="mailto:cpalisa@immigrationfor-us.com" className="text-usa-blue underline">cpalisa@immigrationfor-us.com</a></li>
          <li>Ubicación: 7224 NW 116th Way, Parkland, FL. 33076</li>
          <li>Horario de atención: Lunes a Viernes de 8 am a 6 pm ET.</li>
                </ul>
        <p className="text-sm text-gray-500">Nos reservamos el derecho de modificar este aviso legal en cualquier momento. Recomendamos revisar periódicamente esta página para estar al tanto de cualquier actualización.</p>
      </div>
    </main>
  </>
);

export default AvisoLegal; 