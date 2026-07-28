import React from 'react';
import Head from 'next/head';

const HomeEn = () => (
  <>
    <Head>
      <title>Mardini Law Firm | Immigration Attorneys</title>
      <meta name="description" content="Mardini Law Firm provides immigration legal representation in the United States. Led by Roger Mardini, Esq." />
    </Head>
    <main className="py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-usa-blue">Welcome to Mardini Law Firm</h1>
        <p className="mb-4">Led by Roger Mardini, Esq., Mardini Law Firm provides immigration legal representation to help you achieve your goals in the United States. We are dedicated to guiding clients through complex immigration matters with clarity and care.</p>
        <p className="mb-4">Our firm offers professional legal counsel for visas, permanent residency, naturalization, asylum, and related immigration matters. We work to ensure your case is properly prepared and that you understand each step of the process.</p>
      </div>
    </main>
  </>
);

export default HomeEn;
