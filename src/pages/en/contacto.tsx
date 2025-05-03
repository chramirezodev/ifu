import React from 'react';
import Head from 'next/head';

const ContactEn = () => (
  <>
    <Head>
      <title>Contact Us | Immigration For US</title>
      <meta name="description" content="Contact Immigration For US for your immigration process. We are here to help you." />
    </Head>
    <main className="py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-usa-blue">Contact Us</h1>
        <p className="mb-4">We are here to help you with your immigration process. Do not hesitate to contact us to resolve your questions or schedule a consultation.</p>
        <ul className="mb-4">
          <li>WhatsApp: <a href="https://wa.me/19545884018" className="text-usa-blue underline">+1 (954) 588 4018</a></li>
          <li>Email: <a href="mailto:cpalisa@immigrationfor-us.com" className="text-usa-blue underline">cpalisa@immigrationfor-us.com</a></li>
          <li>Location: 7224 NW 116th Way, Parkland, FL. 33076</li>
          <li>Business hours: Monday to Friday, 8 am to 6 pm ET.</li>
        </ul>
      </div>
    </main>
  </>
);

export default ContactEn; 