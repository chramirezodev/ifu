import React from 'react';
import Head from 'next/head';

const ServicesEn = () => (
  <>
    <Head>
      <title>Our Services | Mardini Law Firm</title>
      <meta name="description" content="Discover our immigration legal services for the United States. We guide you through every step of your process." />
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
        <p className="mb-4">We accompany you in your immigration process. At Mardini Law Firm, we provide legal representation and counsel for a wide variety of immigration matters before USCIS and related agencies. Our attorneys deliver reliable, personalized service to help ensure your case is properly prepared and presented.</p>
      </div>
    </main>
  </>
);

export default ServicesEn;
