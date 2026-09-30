import { CONTACT } from '@/lib/data';

// Copy for the legal pages (/privacy and /terms), rendered by components/LegalPage.tsx.
// A body block is either a paragraph or a bulleted list. The closing "Contact us" section is added
// by LegalPage from CONTACT in lib/data.ts, with `contact` as its opening line.
export type LegalBlock = string | { list: string[] };
export type LegalSection = { id: string; title: string; body: LegalBlock[] };
export type LegalDoc = { title: string; seo: string; lead: string; updated: string; sections: LegalSection[]; contact: string };

// The company as it is named in the footer. Add the ABN and the licence number here once the client supplies them.
const ENTITY = 'Primeo Property Group Pty Ltd';
const UPDATED = '30 September 2026';

export const PRIVACY: LegalDoc = {
  title: 'Privacy policy',
  seo: 'How PRIMEO collects, uses, stores and shares personal information, and how to access or correct yours.',
  lead: 'What we collect when you enquire or engage us, why we collect it, who sees it and how to reach us about it.',
  updated: UPDATED,
  sections: [
    {
      id: 'about',
      title: 'About this policy',
      body: [
        `PRIMEO is the trading name of ${ENTITY}, a licensed real estate agency in Queensland (“PRIMEO”, “we”, “us”). This policy explains how we handle personal information collected through this website and while providing our buyer agency, property advisory and house & land services.`,
        'We handle personal information in line with the Privacy Act 1988 (Cth) and the Australian Privacy Principles.',
      ],
    },
    {
      id: 'what-we-collect',
      title: 'What we collect',
      body: [
        'We collect only what we need to answer your enquiry and, if you engage us, to act for you. That usually means:',
        { list: [
          'Your name, phone number and email address.',
          'What you are interested in and what you tell us about your brief, such as budget, preferred locations, timing and the kind of property you want.',
          'Once you engage us, the details needed to act for you: identification, the property and contract details, and contact details for your solicitor, lender or broker.',
          'A record of our calls, emails and meetings with you.',
          'The page of this website your enquiry was sent from.',
        ] },
        'We do not ask for sensitive information, such as health details, through this website. Please leave it out of an enquiry.',
      ],
    },
    {
      id: 'how-we-collect',
      title: 'How we collect it',
      body: [
        'Most information comes directly from you: through the enquiry forms on this website, by phone or email, or in a meeting. If you engage us, we may also receive information about you from people involved in your purchase, such as selling agents, your solicitor or conveyancer, your lender or broker, and building and pest inspectors.',
        'This website does not use advertising or analytics cookies. Our hosting provider keeps standard server logs, such as IP address, browser type and the pages requested, to keep the site secure and running. If that changes, we will update this policy.',
        'You can browse the website without telling us who you are. We can only reply to an enquiry if you give us a way to reach you.',
      ],
    },
    {
      id: 'how-we-use',
      title: 'How we use it',
      body: [
        'We use personal information to:',
        { list: [
          'Reply to your enquiry and arrange a strategy call.',
          'Provide our services: searching, assessing, negotiating, bidding and coordinating settlement on your behalf.',
          'Communicate with the other people involved in your purchase.',
          'Keep the records a licensed real estate agency is required to keep, and meet our other legal obligations.',
          'Send you occasional market updates or information about our services. You can opt out at any time by replying to the message or contacting us.',
        ] },
        'We do not use your information for a purpose you would not reasonably expect without asking you first.',
      ],
    },
    {
      id: 'who-we-share-with',
      title: 'Who we share it with',
      body: [
        'We do not sell personal information. We share it only where it is needed:',
        { list: [
          'With the people involved in your purchase, at your direction: selling agents, solicitors and conveyancers, lenders and brokers, and building and pest inspectors.',
          'With service providers who help us run the business, such as email delivery, website hosting and IT support, who may use it only to provide that service to us.',
          'With regulators, courts or other authorities where the law requires it.',
        ] },
      ],
    },
    {
      id: 'overseas',
      title: 'Overseas storage',
      body: [
        'Some of our service providers store or process data outside Australia, including in the United States. This includes the service that delivers website enquiries to our inbox. We take reasonable steps to make sure any overseas provider handles personal information consistently with the Australian Privacy Principles.',
      ],
    },
    {
      id: 'security',
      title: 'Storage and security',
      body: [
        'Personal information is held in our email and business systems, with access limited to the people who need it to do their work. We take reasonable steps to protect it from misuse, loss and unauthorised access.',
        'We keep personal information for as long as it is needed for the purposes above, or for as long as the law requires us to keep records. After that it is deleted or de-identified.',
      ],
    },
    {
      id: 'reviews',
      title: 'Client reviews',
      body: [
        'The reviews on this website were published by their authors on Google. We show the reviewer’s name and the review as it was written. If a review of yours appears here and you would like it removed from this website, contact us and we will take it down.',
      ],
    },
    {
      id: 'access',
      title: 'Access and correction',
      body: [
        'You can ask to see the personal information we hold about you, or ask us to correct it if it is wrong, out of date or incomplete. Email or call us using the details below. We will respond within 30 days and there is no charge for making a request.',
        'If we cannot give you access or make a correction, we will tell you why in writing.',
      ],
    },
    {
      id: 'complaints',
      title: 'Complaints',
      body: [
        'If you think we have mishandled your personal information, tell us first. We will look into it and respond within 30 days.',
        'If you are not satisfied with our response, you can complain to the Office of the Australian Information Commissioner at oaic.gov.au or on 1300 363 992.',
      ],
    },
    {
      id: 'changes',
      title: 'Changes to this policy',
      body: [
        'We may update this policy from time to time. The current version is always on this page, with the date it was last updated at the top.',
      ],
    },
  ],
  contact: 'Questions about this policy, or a request to access or correct your information, can go to:',
};

export const TERMS: LegalDoc = {
  title: 'Terms of use',
  seo: 'The terms that apply to using the PRIMEO website: general information only, property figures, enquiries, reviews and liability.',
  lead: 'The terms that apply when you use this website. Our services are covered by a separate written agreement.',
  updated: UPDATED,
  sections: [
    {
      id: 'about',
      title: 'About these terms',
      body: [
        `This website is operated by ${ENTITY}, a licensed real estate agency in Queensland (“PRIMEO”, “we”, “us”). By using the website you agree to these terms. If you do not agree, please do not use it.`,
        'These terms cover the website only. Our buyer agency, property advisory and house & land services are provided under a separate written agreement, which you sign before we act for you.',
      ],
    },
    {
      id: 'general-information',
      title: 'General information only',
      body: [
        'The content on this website is general information about property and about our services. It is not financial, credit, legal or tax advice, and it does not take your objectives, financial situation or needs into account.',
        'Before you act on anything you read here, consider whether it suits your circumstances and get independent advice from a suitably qualified professional.',
      ],
    },
    {
      id: 'property-information',
      title: 'Property and market information',
      body: [
        'Prices, packages, suburb commentary, market figures and examples of past purchases are shown as a guide. They rely in part on information from third parties, they can change without notice, and a property or package shown may no longer be available.',
        { list: [
          'House & land prices and inclusions are set by the builder or developer and are confirmed only in their contracts.',
          'Figures such as the number of properties secured or the amount saved describe past work. Past results are not a guarantee of future results.',
          'We do not promise any purchase price, rental return, capital growth or other outcome.',
        ] },
      ],
    },
    {
      id: 'enquiries',
      title: 'Enquiries',
      body: [
        'Sending an enquiry or booking a call does not make you a client and does not commit you or us to anything. We act for you only once a written agreement is signed.',
        'Please make sure the details you send us are accurate and are yours to give. We handle them as set out in our privacy policy.',
      ],
    },
    {
      id: 'reviews',
      title: 'Client reviews',
      body: [
        'The reviews on this website were written by clients and published on Google. We reproduce them as they were written. They describe individual experiences and are not a promise that you will have the same result.',
      ],
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual property',
      body: [
        'The text, design, logo, photographs and other content on this website belong to PRIMEO or are used with permission. You may view the website and print pages for your own personal use. You may not copy, republish or use the content commercially without our written permission.',
      ],
    },
    {
      id: 'acceptable-use',
      title: 'Acceptable use',
      body: [
        'When you use this website you agree not to:',
        { list: [
          'Use it for anything unlawful, or to send false or misleading enquiries.',
          'Interfere with how it runs, attempt to gain unauthorised access, or introduce malicious code.',
          'Collect its content or other people’s details by automated means without our permission.',
        ] },
      ],
    },
    {
      id: 'third-party-links',
      title: 'Links to other websites',
      body: [
        'This website links to other websites, including Google. We do not control them and are not responsible for their content or for how they handle your information.',
      ],
    },
    {
      id: 'liability',
      title: 'Liability',
      body: [
        'Nothing in these terms excludes, restricts or modifies any right or remedy you have under the Australian Consumer Law or any other law that cannot be excluded.',
        'Subject to that, the website is provided as it is. We take care to keep it accurate and available, but we do not warrant that it is complete, current, error-free or uninterrupted. To the extent the law allows, we are not liable for loss or damage arising from your use of the website or your reliance on its content.',
      ],
    },
    {
      id: 'governing-law',
      title: 'Governing law',
      body: [
        'These terms are governed by the laws of Queensland, Australia. Any dispute about them is to be dealt with by the courts of Queensland.',
      ],
    },
    {
      id: 'changes',
      title: 'Changes to these terms',
      body: [
        'We may update these terms from time to time. The current version is always on this page, with the date it was last updated at the top. Continuing to use the website after a change means you accept the updated terms.',
      ],
    },
  ],
  contact: 'Questions about these terms can go to:',
};

// The rows of the closing "Contact us" section on both pages.
export const LEGAL_CONTACT = [
  { label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { label: 'Phone', value: CONTACT.phone, href: CONTACT.phoneHref },
  { label: 'Post', value: `${ENTITY}, ${CONTACT.address1}, ${CONTACT.address2}` },
] as { label: string; value: string; href?: string }[];
