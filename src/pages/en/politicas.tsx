import React from 'react';
import Head from 'next/head';

const PoliciesEn = () => (
  <>
    <Head>
      <title>Terms of Use and Privacy Policy | Mardini Law Firm</title>
      <meta name="description" content="Read our terms of use and privacy policy. Mardini Law Firm protects your information and explains how we use your data." />
    </Head>
    <main className="py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-usa-blue">Terms of Use and Privacy Policy</h1>
        <p className="mb-4">At Mardini Law Firm, we are committed to protecting your privacy. For more details about how we use your data, please see our <a href="/en/aviso-legal" className="text-usa-blue underline">LEGAL NOTICE</a>.</p>
        <p className="mb-4">We reserve the right to modify these policies at any time. We recommend reviewing this information periodically to stay informed of any updates.</p>
        <hr className="my-8" />
        <h2 className="text-2xl font-semibold mb-4 text-usa-blue">Privacy Policy</h2>
        <h3 className="text-xl font-semibold mb-2">Information Collected</h3>
        <p className="mb-4">We may collect personal information such as your name, contact information, and demographic data. This information is used to:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Maintain a user record.</li>
          <li>Process orders or billing.</li>
          <li>Send relevant information and special offers.</li>
        </ul>
        <p className="mb-4">We are committed to keeping your information secure and not sharing it without your express consent, except when required by law.</p>
        <h3 className="text-xl font-semibold mb-2">Use of Cookies</h3>
        <p className="mb-4">Our website uses cookies to improve the user experience. You can accept or reject the use of cookies from your browser settings.</p>
        <h3 className="text-xl font-semibold mb-2">Emails and Communications</h3>
        <p className="mb-4">We will only send emails if you provide us with your address and agree to receive communications. You can unsubscribe at any time by following the instructions included in each message.</p>
        <h3 className="text-xl font-semibold mb-2">Disclosure of Information to Third Parties</h3>
        <p className="mb-4">We do not share your personal information with third parties without your authorization, except when necessary to comply with the law or protect our rights.</p>
        <h3 className="text-xl font-semibold mb-2">Contact</h3>
        <ul className="mb-4">
          <li>WhatsApp: <a href="https://wa.me/17542344284" className="text-usa-blue underline">+1 (754) 234-4284</a></li>
          <li>Email: <a href="mailto:info@mardinilawfirm.com" className="text-usa-blue underline">info@mardinilawfirm.com</a></li>
          <li>Location: 7224 NW 116th Way, Parkland, FL 33076</li>
          <li>Business hours: Monday to Friday, 8 am to 6 pm ET.</li>
        </ul>
        <p className="text-sm text-gray-500">We reserve the right to modify these policies at any time. We recommend reviewing this page periodically to stay informed of any updates.</p>
      </div>
    </main>
  </>
);

export default PoliciesEn;
