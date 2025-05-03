import React from 'react';
import Head from 'next/head';

const ServicesEn = () => (
  <>
    <Head>
      <title>Our Services | Immigration For US</title>
      <meta name="description" content="Discover our immigration services for the United States. We guide you through every step of your process." />
    </Head>
    <main className="py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-usa-blue">Our Services</h1>
        <ul className="list-disc pl-6 mb-4">
          <li>Visa Application Support</li>
          <li>Permanent Residency (Green Card) Assistance</li>
          <li>Naturalization</li>
          <li>Affirmative Asylum Consultations</li>
          <li>VAWA Visa</li>
          <li>U Visa</li>
        </ul>
        <p className="mb-4">We accompany you in your immigration process. At Immigration For US, we offer support in preparing and submitting immigration documents to USCIS for a wide variety of procedures in the United States. We guarantee that our team will provide you with reliable and personalized service, ensuring your application meets all requirements.</p>
      </div>
    </main>
  </>
);

export default ServicesEn; 