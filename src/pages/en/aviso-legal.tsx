import React from 'react';
import Head from 'next/head';

const LegalNoticeEn = () => (
  <>
    <Head>
      <title>Legal Notice | Mardini Law Firm</title>
      <meta name="description" content="Legal notice and terms of use for Mardini Law Firm website." />
    </Head>
    <main className="py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-usa-blue">LEGAL NOTICE</h1>
        <p className="mb-4">Access to this website implies the status of user and the acceptance and knowledge of the following terms of use. We recommend reading and understanding them before using the site. If you do not agree to these Terms and Conditions, please do not access or use this website or post any content.</p>
        <p className="mb-4">You understand that this website is owned by Mardini Law Firm, including all intellectual and industrial property rights derived from or included in it, and you have no right to use them except as set forth in these Terms of Use. We reserve the right to deny or terminate your access to the Website at our discretion.</p>
        <p className="mb-4">This website is provided free of charge, and on this basis, we have no maintenance or support service obligations. We are not responsible for any damage or loss you may suffer as a result of maintenance or updates to the website.</p>
        <p className="mb-4">The owner of this website assumes no responsibility as a direct or indirect consequence of any action or omission you take based on the information, services, or other material found on this website.</p>
        <hr className="my-8" />
        <h2 className="text-2xl font-semibold mb-4 text-usa-blue">Permitted Use</h2>
        <p className="mb-4">You may use this website for lawful purposes and in accordance with these Terms of Use. A revocable, non-transferable, and non-exclusive license is granted to view, print, and distribute the content for personal and non-commercial purposes. You may not copy, modify, display, distribute, or sell the content of this website without our prior written consent.</p>
        <p className="mb-4">Additionally, you agree not to:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Use the website in a way that may damage or interfere with its operation.</li>
          <li>Use automated processes to monitor, copy, or extract information.</li>
          <li>Attempt to gain unauthorized access to the website or its content.</li>
        </ul>
        <hr className="my-8" />
        <h2 className="text-2xl font-semibold mb-4 text-usa-blue">Privacy Policy</h2>
        <p className="mb-4">See our <a href="/en/politicas" className="text-usa-blue underline">Terms of Use and Privacy Policy</a> to learn how we collect, use, and protect your personal information.</p>
        <hr className="my-8" />
        <h2 className="text-2xl font-semibold mb-4 text-usa-blue">Contact</h2>
        <ul className="mb-4">
          <li>WhatsApp: <a href="https://wa.me/17542344284" className="text-usa-blue underline">+1 (754) 234-4284</a></li>
          <li>Email: <a href="mailto:info@mardinilawfirm.com" className="text-usa-blue underline">info@mardinilawfirm.com</a></li>
          <li>Location: 7224 NW 116th Way, Parkland, FL 33076</li>
          <li>Business hours: Monday to Friday, 8 am to 6 pm ET.</li>
        </ul>
        <p className="text-sm text-gray-500">We reserve the right to modify this legal notice at any time. We recommend reviewing this page periodically to stay informed of any updates.</p>
      </div>
    </main>
  </>
);

export default LegalNoticeEn;
