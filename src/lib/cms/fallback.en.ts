import { fallbackCMS } from './fallback'
import type { CMSData, CMSService } from './types'

type ServiceCopy = Pick<CMSService, 'title' | 'description' | 'expandedDescription'> & {
  whatsappMessage?: string
}

export const servicesEn: Record<string, ServiceCopy> = {
  'corte-inmigracion': {
    title: 'Immigration Court Representation',
    description: 'Legal defense when your future in the United States is at stake.',
    expandedDescription:
      'Facing removal proceedings can raise many questions and a great deal of uncertainty. We evaluate your situation, the possible defenses and the forms of immigration relief that may be available, and we represent you through the different stages of your case before the Immigration Court.',
  },
  asilo: {
    title: 'Defensive and Affirmative Asylum',
    description: 'Protection for those who fear returning to their country.',
    expandedDescription:
      'If you have suffered persecution or fear returning to your country, asylum may be a form of protection in the United States. We evaluate the circumstances of your case and provide representation for both affirmative asylum applications before USCIS and defensive asylum cases before the Immigration Court, carefully preparing your case and the evidence that supports it.',
  },
  residencia: {
    title: 'Permanent Residence / Green Card',
    description: 'Build your future in the United States.',
    expandedDescription:
      'There are different paths to permanent residence. We evaluate your eligibility and guide you through every stage of the process, from preparing the application to its resolution before the appropriate immigration authority.',
  },
  naturalizacion: {
    title: 'Naturalization',
    description: 'Take the next step in your immigration journey.',
    expandedDescription:
      'Becoming a U.S. citizen is an important decision. If you are a permanent resident, we evaluate your eligibility and represent you throughout the naturalization process before USCIS.',
  },
  vawa: {
    title: 'VAWA (Violence Against Women Act)',
    description: 'Immigration protection for certain victims of abuse.',
    expandedDescription:
      'VAWA allows certain spouses, children or parents who have been abused by a U.S. citizen or permanent resident to seek immigration protection without depending on the abusive family member. We evaluate each case confidentially to determine whether it meets the requirements established by law.',
  },
  'visa-u': {
    title: 'U Visa',
    description: 'An immigration option for certain victims of crime.',
    expandedDescription:
      'If you have been the victim of a crime and have cooperated with the authorities in the investigation or prosecution, you may be eligible for a U Visa (Nonimmigrant Visa for Victims of Crimes). We carefully evaluate your situation and the eligibility requirements to determine the options available in your case.',
  },
  apelaciones: {
    title: 'Appeals and Motions',
    description: 'An adverse decision is not always the end of the road.',
    expandedDescription:
      'Depending on the circumstances, an immigration decision may be appealed or challenged through a motion to reopen or reconsider the case. We review the procedural history and the available legal options to determine the next steps.',
  },
  visas: {
    title: 'Visas and Immigration Processes',
    description: 'Legal guidance to find the right path.',
    expandedDescription:
      'Every immigration situation is different. We evaluate your circumstances and the available alternatives to determine which immigration process may apply to your case.',
  },
  fianzas: {
    title: 'Immigration Bonds',
    description: 'Guidance and representation in immigration bond proceedings.',
    expandedDescription:
      'When a person is detained by immigration authorities, a bond may be a way to request their release while the case moves forward. We evaluate the situation and the available options to guide the family on the next steps.',
  },
}

export const fallbackCMSEn: CMSData = {
  ...fallbackCMS,
  siteSettings: {
    ...fallbackCMS.siteSettings,
    slogan: 'Your future, our priority',
    whatsappAutoMessage:
      'Hello! Thank you for contacting Mardini Law Firm. We have received your message and a member of our team will get back to you very soon. If your matter is urgent, you can also email us at info@mardinilawfirm.com or call us at (754) 234-4284.',
    consultationWhatsAppMessage: 'Hello, I would like to schedule a consultation with Mardini Law Firm.',
    workHours: 'Monday to Friday: 9:00 AM - 5:00 PM',
    footerServiceLabels: [
      'Immigration Court Representation',
      'Defensive and Affirmative Asylum',
      'Permanent Residence / Green Card',
      'Visas and Immigration Processes',
      'VAWA',
      'U Visa',
      'Citizenship and Naturalization',
      'Appeals and Motions',
      'Immigration Bonds',
    ],
  },
  seo: {
    ...fallbackCMS.seo,
    defaultTitle: 'Mardini Law Firm — Immigration Attorneys in the United States',
    defaultDescription:
      'Strategic immigration legal representation before USCIS, EOIR and the BIA. Visas, permanent residence, naturalization, asylum, VAWA and U Visas.',
    keywords:
      'immigration attorney, immigration lawyer, USCIS, EOIR, BIA, green card, naturalization, asylum, VAWA, U visa, Florida, Mardini Law Firm',
  },
  homeHero: {
    ...fallbackCMS.homeHero,
    slogan: 'Your future,',
    sloganHighlight: 'our priority',
  },
  homeWelcome: {
    ...fallbackCMS.homeWelcome,
    eyebrow: 'Founder of Mardini Law Firm',
    paragraphs: [
      'Roger Mardini is an attorney licensed in the State of Florida and the founder of Mardini Law Firm. He was born in Colombia, where he earned his law degree, and later settled in the United States, where he became a U.S. citizen and earned his Juris Doctor from Nova Southeastern University.',
      'Today he dedicates his practice to immigration law, representing individuals and families before U.S. Citizenship and Immigration Services (USCIS), the Immigration Courts (EOIR) and the Board of Immigration Appeals (BIA).',
      'As an immigrant himself, attorney Roger Mardini knows firsthand the challenges of starting a new life in the United States and understands how important every decision can be during an immigration process. That is why he takes the time to get to know each case, explain the options clearly and give every client close, personalized legal representation.',
    ],
  },
  homeAbout: {
    ...fallbackCMS.homeAbout,
    title: 'About Us',
    content:
      'We are immigrants, and we know the challenges that come with settling in this country. We understand that behind every immigration process there are important decisions for you and your family. At Mardini Law Firm we offer personalized attention, clear communication and careful legal representation at every stage of the process.',
    values: [
      {
        title: 'Integrity',
        description: 'Honesty, transparency and professional ethics in the handling of every case.',
      },
      {
        title: 'Commitment',
        description:
          'Every case is different. We take the time to understand your situation and evaluate the options available.',
      },
      {
        title: 'Excellence',
        description:
          'We carefully analyze the facts, the documentation and the legal options before deciding how to move forward.',
      },
      {
        title: 'Approachability',
        description:
          'We maintain clear and direct communication so that you understand what is happening with your case.',
      },
    ],
  },
  homeWhyChooseUs: {
    ...fallbackCMS.homeWhyChooseUs,
    title: 'Why Choose Us?',
    subtitle: 'Strategic, personalized and committed legal representation',
    reasons: [
      {
        title: 'Litigation and Immigration Experience',
        description:
          'Experience representing clients before USCIS, the Immigration Courts (EOIR) and the Board of Immigration Appeals (BIA).',
        expandedDescription:
          'The practice covers a wide range of immigration matters, from applications before USCIS to representation in removal proceedings, asylum cases and appeals. Every case is carefully prepared, taking into account the facts, the documentation and the legal options available.',
        iconKey: 'experience',
      },
      {
        title: 'Personalized Attention',
        description: 'We believe good representation begins with clear and accessible communication.',
        expandedDescription:
          'Every case and every story is different. We take the time to understand your situation, answer your questions and keep you informed about the progress of your case. Clear communication is essential for you to understand the process and the decisions you need to make.',
        iconKey: 'personalized',
      },
      {
        title: 'Commitment',
        description: 'Your case receives the dedication, time and attention it deserves.',
        expandedDescription:
          'Behind every case there is a person, a family and decisions that can have a major impact on their future. That is why we take on every representation with seriousness, dedication and responsibility, giving every client the attention their case deserves.',
        iconKey: 'commitment',
      },
    ],
    bannerTitle: 'YOUR FUTURE DESERVES A STRONG DEFENSE',
    bannerSubtitle: 'Professionalism, preparation and dedication in every representation.',
  },
  servicesPage: {
    ...fallbackCMS.servicesPage,
    heroTitle: 'Our Immigration Services',
    heroSubtitle:
      'We provide strategic legal representation for your immigration matters in the United States. Learn about our services and find the option that best fits your needs.',
    ctaLabel: 'Schedule a consultation',
    sectionIntro:
      'At Mardini Law Firm we understand that every immigration process represents the future of a person and their family. That is why we provide personalized and strategic legal representation based on the particular circumstances of each case. We represent our clients before U.S. Citizenship and Immigration Services (USCIS), the Immigration Courts (EOIR) and the Board of Immigration Appeals (BIA) in a wide variety of immigration matters. Our commitment is to protect your rights, advise you on your legal options and stand by you throughout the entire immigration process.',
  },
  services: fallbackCMS.services.map((service) => ({
    ...service,
    ...(servicesEn[service.slug] ?? {}),
  })),
}
