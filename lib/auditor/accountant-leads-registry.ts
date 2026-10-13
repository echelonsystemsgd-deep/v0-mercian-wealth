export interface AccountantLeadIntelligence {
  domain: string
  businessName: string
  ownerOrDirector: string
  phone: string
  trade: string
  location: string
  pageLocation: string
  observableFriction: string
  frictionBadge: string
  evidence: string
  recognizableReason: string
  consequenceMechanics: string
  prototypeRemedy: string
  prototypeUrl: string
  customNotes: string
  whatsappOutreach: {
    message1: string // Conversational Opener
    message2: string // Friction Observation
    message3: string // Prototype + Book a Call CTA
    quickDirectPitch: string // Single consolidated message under 75 words
  }
  emailOutreach: {
    subject: string
    body: string
  }
}

export const TARGET_ACCOUNTANT_LEADS_REGISTRY: Record<string, AccountantLeadIntelligence> = {
  'barrieingramaccounts.co.uk': {
    domain: 'barrieingramaccounts.co.uk',
    businessName: 'Barrie Ingram Accounts Ltd',
    ownerOrDirector: 'Barrie Ingram',
    phone: '+447908228472',
    trade: 'Chartered Accountant',
    location: 'Colchester, Essex',
    pageLocation: 'Homepage & /services',
    observableFriction: 'Outdated tax rate references and static contact form lacking fee expectations or instant booking.',
    frictionBadge: 'Outdated Tax Rates & Static Form',
    evidence: 'Website displays outdated statutory thresholds and routes visitors into an unverified contact form without fee band guidance.',
    recognizableReason: 'When high-turnover business directors search on their phone, lack of upfront fee tiering forces them into manual quotation cycles or causes them to abandon the session.',
    consequenceMechanics: 'Fee-earners waste 15+ hours/month fielding unqualified tire-kickers while premium Ltd Co retainers bounce to firms offering instant booking holds.',
    prototypeRemedy: 'Interactive Corporation Tax & Retainer Estimator (£150k-£5M slider) + 60-second direct calendar booking hold.',
    prototypeUrl: 'https://uk-accountancy-os-prototype.vercel.app/',
    customNotes: `• VERIFIED FLAW: Outdated tax guidance & generic contact form with zero price anchoring.
• LOCATION: Homepage hero & /services.
• COMMERCIAL LEAK: Prospects have no idea of monthly retainer tiers (£450-£1,450/mo), causing partner time to be burned on tire-kickers.
• PROTOTYPE FIX: Corporation Tax slider + direct calendar booking session.`,
    whatsappOutreach: {
      message1: `Hi Barrie 👋 Came across Barrie Ingram Accounts in Colchester — quick question: when new Ltd Co directors land on your website in the evening, how does your team pre-qualify their turnover before scheduling discovery calls?`,
      message2: `Makes complete sense! I had a quick look through barrieingramaccounts.co.uk on mobile and noticed the enquiry form doesn't anchor retainer tiers or let directors reserve a consultation slot on the spot. Usually leads to telephone tag or tire-kickers who aren't ready for professional fees.`,
      message3: `We engineered an interactive intake prototype specifically for UK accounting practices:
https://uk-accountancy-os-prototype.vercel.app/

It lets directors calculate their Corporation Tax band, view estimated retainers, and book directly in 60 seconds.

Open to a brief 10-minute call to walk through the numbers?
Book a call with me here: [Link to Book a Call]`,
      quickDirectPitch: `Hi Barrie, noticed on barrieingramaccounts.co.uk that incoming business enquiries hit a static form without fee anchoring or instant booking.

We built a live interactive prototype for UK accountants with a built-in Corporation Tax estimator and 60-second booking flow:
https://uk-accountancy-os-prototype.vercel.app/

Would you be open to a 10-minute call to see how this filters tire-kickers?
Book a call with me here: [Link to Book a Call]`
    },
    emailOutreach: {
      subject: 'Tax calculator & direct booking for Barrie Ingram Accounts',
      body: `Hi Barrie,

I was looking at barrieingramaccounts.co.uk and noticed prospective clients have to fill out a static contact form with no idea of fees or tax thresholds before you speak with them.

For high-turnover directors, that friction usually means phone-tag or tire-kickers who don't fit your ideal retainer.

I put together a live prototype of an interactive client acquisition engine specifically for UK accountants:
https://uk-accountancy-os-prototype.vercel.app/

It features an instant Corporation Tax & retainer estimator and a direct 60-second consultation booking flow, so only pre-qualified clients reach your calendar.

Would you be open to a brief 10-minute walkthrough this week to see how this fits your firm?

Book a call with me here: [Link to Book a Call]

Best regards,
Gurtej Sandhu
Mercian Wealth`
    }
  },

  'ksrathod.co.uk': {
    domain: 'ksrathod.co.uk',
    businessName: 'K S Rathod & Co Ltd',
    ownerOrDirector: 'Kirit Rathod',
    phone: '+447831587536',
    trade: 'Chartered Certified Accountant',
    location: 'Wembley / London',
    pageLocation: '/contact-us & mobile navigation',
    observableFriction: 'Raw unformatted mailto links, no mobile-first consultation reservation, and zero retainer anchoring.',
    frictionBadge: 'Raw Mailto Link & No Mobile Booking',
    evidence: 'Contact section relies on raw mailto links and office telephone without an automated appointment reservation or fee guide.',
    recognizableReason: 'Directors researching accountants on smartphones between 7 PM and 10 PM cannot draft emails or call closed offices.',
    consequenceMechanics: 'Prospective clients bounce back to Google to message whoever offers 1-tap booking confirmation.',
    prototypeRemedy: 'Fixed bottom mobile consultation bar (48px touch target) + instant discovery scheduler.',
    prototypeUrl: 'https://uk-accountancy-os-prototype.vercel.app/',
    customNotes: `• VERIFIED FLAW: Raw mailto link + office-hours phone barrier on mobile.
• LOCATION: /contact-us.
• COMMERCIAL LEAK: Evening visitors bounce immediately when forced to open default email app.
• PROTOTYPE FIX: Sticky mobile consultation bar + 60s calendar reservation.`,
    whatsappOutreach: {
      message1: `Hi Kirit 👋 Came across K S Rathod & Co — quick question: when prospective commercial clients search your practice on mobile outside working hours, how do you capture them before they bounce?`,
      message2: `Reason I ask is I visited ksrathod.co.uk on mobile and noticed reaching you requires either copying an email or waiting for office hours. Most high-value directors searching in the evening simply move on to the next practice.`,
      message3: `We built a working prototype showing how UK accounting practices capture these inquiries frictionlessly:
https://uk-accountancy-os-prototype.vercel.app/

It lets business owners check tax bands and book directly into your diary in 60 seconds.

Could we grab 10 minutes on a call to see how this works for K S Rathod & Co?
Book a call with me here: [Link to Book a Call]`,
      quickDirectPitch: `Hi Kirit, noticed on ksrathod.co.uk that mobile visitors have to copy raw email links or call during business hours to book an appointment.

We engineered a live prototype for UK practices that locks in consultations 24/7 in 60 seconds with instant fee tiering:
https://uk-accountancy-os-prototype.vercel.app/

Open to a brief 10-minute call to review it?
Book a call with me here: [Link to Book a Call]`
    },
    emailOutreach: {
      subject: 'Inbound client booking flow for K S Rathod & Co',
      body: `Hi Kirit,

I visited ksrathod.co.uk on mobile and noticed that booking an initial discussion requires either copying an email address manually or calling during office hours.

When a director is searching for a practice on their phone in the evening, this friction often causes them to bounce to the next firm.

We built an accountancy client portal prototype demonstrating how leading UK firms capture these inquiries frictionlessly:
https://uk-accountancy-os-prototype.vercel.app/

It gives visitors an instant tax tiering estimate and lets them book directly into your diary in 60 seconds without back-and-forth emails.

Let's jump on a quick 10-minute call so I can show you how this plugs into your practice.

Book a call with me here: [Link to Book a Call]

Kind regards,
Gurtej Sandhu
Mercian Wealth`
    }
  },

  '852.limited': {
    domain: '852.limited',
    businessName: '852 Accounting',
    ownerOrDirector: 'Director',
    phone: '+447739546042',
    trade: 'Chartered Management Accountant',
    location: 'London',
    pageLocation: 'Homepage hero & single-page layout',
    observableFriction: 'Cryptic minimalist layout hiding practice capabilities with no retainer tiering or direct consultation hold.',
    frictionBadge: 'Cryptic Layout & Hidden Retainers',
    evidence: 'Single-page minimalist design provides no scope breakdown, no fee transparency, and no instant appointment scheduling.',
    recognizableReason: 'Growing businesses wanting comprehensive CFO and advisory retainers cannot evaluate expertise or cost commitment.',
    consequenceMechanics: 'Visitors assume the firm is either excessively expensive or limited in scope, leading to lost advisory instructions.',
    prototypeRemedy: '3-Tier Service Architecture (Compliance, Tax Planning, Advisory/CFO) + dynamic fee simulator.',
    prototypeUrl: 'https://uk-accountancy-os-prototype.vercel.app/',
    customNotes: `• VERIFIED FLAW: Minimalist aesthetic obscures core capabilities and pricing brackets.
• LOCATION: Homepage hero.
• COMMERCIAL LEAK: Mid-market founders bounce due to lack of fee transparency or clear next steps.
• PROTOTYPE FIX: 3-tier value matrix + interactive retainer calculator.`,
    whatsappOutreach: {
      message1: `Hi team 👋 Came across 852 Accounting in London — love the clean aesthetic. Quick question: how do you currently pre-qualify founders on retainer expectations before discovery calls?`,
      message2: `Reason I ask is that while 852.limited is visually sleek, prospective clients can't gauge fee bands or lock in a consultation slot directly. Mid-market founders often hesitate when next steps aren't crystal clear.`,
      message3: `We created a working model showing how modern practices balance high design with conversion:
https://uk-accountancy-os-prototype.vercel.app/

It pre-qualifies turnover bands and allows 60-second meeting bookings without sacrificing brand prestige.

Would you be open to a 10-minute call this week?
Book a call with me here: [Link to Book a Call]`,
      quickDirectPitch: `Hi team, 852.limited has great branding, but lacks upfront fee tiering and instant consultation booking for prospective founders.

Take a look at this live prototype designed for modern UK accounting practices:
https://uk-accountancy-os-prototype.vercel.app/

It filters inquiries and books consultations in under a minute.
Let's connect for 10 minutes: [Link to Book a Call]`
    },
    emailOutreach: {
      subject: 'Pre-qualification & consultation engine for 852 Limited',
      body: `Hi team,

I came across 852.limited. While the clean, minimalist brand stands out, high-turnover business owners visiting the site have no immediate way to gauge advisory retainer tiers or secure a consultation slot on the spot.

To show what a modern onboarding workflow looks like for boutique practices, take a look at this live prototype:
https://uk-accountancy-os-prototype.vercel.app/

It allows prospective clients to slide their company turnover, view an estimated retainer tier, and book a strategy consultation immediately.

If you'd like to see how this can increase qualified partner-level inquiries for 852 Limited, let's schedule a brief chat.

Book a call with me here: [Link to Book a Call]

Best,
Gurtej Sandhu
Mercian Wealth`
    }
  },

  'rkpartners.co.uk': {
    domain: 'rkpartners.co.uk',
    businessName: 'C J Driscoll Chartered Accountants',
    ownerOrDirector: 'Partner',
    phone: '+447930651376',
    trade: 'Chartered Accountants & Tax Advisers',
    location: 'Romford / Essex',
    pageLocation: '/services & /contact',
    observableFriction: 'Dense wall-of-text compliance list (VAT, audit, payroll) without interactive client tiering or instant calendar booking.',
    frictionBadge: 'Dense Compliance Wall & Phone-Tag',
    evidence: 'Unstructured text blocks list 15+ commodity services without packaged pricing or self-serve discovery scheduling.',
    recognizableReason: 'Commercial prospects view the practice as a commodity bookkeeper rather than a strategic tax advisor.',
    consequenceMechanics: 'The firm receives price resistance on proposals while spending partner hours on administrative phone-tag.',
    prototypeRemedy: 'High-value Advisory & Tax Strategy tiering + automated booking qualification.',
    prototypeUrl: 'https://uk-accountancy-os-prototype.vercel.app/',
    customNotes: `• VERIFIED FLAW: Wall-of-text compliance bullets without tiered packages.
• LOCATION: /services.
• COMMERCIAL LEAK: Anchors practice as commodity service provider; invites price-haggling.
• PROTOTYPE FIX: Categorized advisory packages + Corporation Tax estimation slider.`,
    whatsappOutreach: {
      message1: `Hi team 👋 Came across C J Driscoll & RK Partners — quick question: how do you currently package and qualify incoming advisory inquiries versus standard compliance clients?`,
      message2: `Reason I ask is that rkpartners.co.uk presents services in a traditional text list, which often invites price comparison against cheap bookkeepers rather than positioning your partner-level tax advisory expertise.`,
      message3: `We developed a live UK accountancy OS prototype to solve that positioning challenge:
https://uk-accountancy-os-prototype.vercel.app/

It anchors clients onto £850+/mo advisory retainers and books qualified strategy sessions automatically.

Open to a brief 10-minute call to walk through the system?
Book a call with me here: [Link to Book a Call]`,
      quickDirectPitch: `Hi team, noticed on rkpartners.co.uk that comprehensive advisory services are listed as standard compliance bullets without upfront fee tiering.

We built a live demo showing how UK practices elevate advisory retainers and automate bookings:
https://uk-accountancy-os-prototype.vercel.app/

Open to a quick 10-minute call to review?
Book a call with me here: [Link to Book a Call]`
    },
    emailOutreach: {
      subject: 'Converting compliance traffic into advisory retainers (RK Partners)',
      body: `Hi team,

Looking through rkpartners.co.uk, you offer a comprehensive suite of services, but presenting them as a static list of compliance tasks forces visitors into transactional comparison against budget bookkeepers.

We built this live model specifically to solve that positioning problem:
https://uk-accountancy-os-prototype.vercel.app/

Notice how the turnover and tax estimator anchors prospects onto high-value advisory tiers (£850+/mo) before they ever request a consultation.

I'd welcome the chance to walk you through the numbers on a brief 10-minute call.

Book a call with me here: [Link to Book a Call]

Warm regards,
Gurtej Sandhu
Mercian Wealth`
    }
  },

  'protaxaccountant.co.uk': {
    domain: 'protaxaccountant.co.uk',
    businessName: 'Pro Tax Accountant Chelmsford',
    ownerOrDirector: 'Principal Tax Specialist',
    phone: '+447985689912',
    trade: 'Tax & Accounting Specialist',
    location: 'Chelmsford, Essex',
    pageLocation: 'Homepage & /contact-us',
    observableFriction: '25-item keyword dump in navigation, multi-field form, and zero upfront fee pre-qualification.',
    frictionBadge: '25-Keyword Dump & Heavy Form',
    evidence: 'Homepage footer and nav contain dozens of all-caps keywords and complex forms that overwhelm mobile users.',
    recognizableReason: 'Busy company directors searching on mobile experience cognitive overload and abandon long forms.',
    consequenceMechanics: 'High volume of unqualified inbound leads burns partner capacity with low close rates.',
    prototypeRemedy: 'Streamlined 3-step intake, turnover pre-qualification slider, and direct calendar synchronization.',
    prototypeUrl: 'https://uk-accountancy-os-prototype.vercel.app/',
    customNotes: `• VERIFIED FLAW: Cluttered 25+ item service dump + lengthy enquiry form.
• LOCATION: Homepage & enquiry form.
• COMMERCIAL LEAK: Burns staff hours manually sorting through low-value enquiries.
• PROTOTYPE FIX: Clean 3-tier service selector + instant calendar slot booking.`,
    whatsappOutreach: {
      message1: `Hi team 👋 Came across Pro Tax Accountant in Chelmsford — quick question: with such high traffic across your tax services, what percentage of website inquiries are pre-qualified before your team calls them?`,
      message2: `Reason I ask is that protaxaccountant.co.uk uses lengthy contact forms and service lists that often result in your team spending hours filtering through tire-kickers who aren't ready for your tax advisory rates.`,
      message3: `We built an interactive intake system specifically to automate that qualification:
https://uk-accountancy-os-prototype.vercel.app/

It lets directors select their turnover bracket, review expected retainers, and book directly into your diary.

Let's do a quick 10-minute call to see how this eliminates manual triage.
Book a call with me here: [Link to Book a Call]`,
      quickDirectPitch: `Hi team, noticed protaxaccountant.co.uk captures leads via long forms without pre-qualifying turnover, meaning staff time is wasted on unqualified inquiries.

Here is a live prototype demonstrating automated 60-second booking with tax qualification:
https://uk-accountancy-os-prototype.vercel.app/

Open to a 10-minute call?
Book a call with me here: [Link to Book a Call]`
    },
    emailOutreach: {
      subject: 'Streamlining inbound client qualification at Pro Tax Accountant',
      body: `Hi team,

I was analyzing the intake journey on protaxaccountant.co.uk. The site drives high traffic, but prospective clients are met with extensive service lists and generic web forms that don't pre-qualify turnover or budget.

As a result, your team likely spends hours filtering out low-margin inquiries.

We developed this UK practice prototype to demonstrate an automated intake process:
https://uk-accountancy-os-prototype.vercel.app/

It uses an interactive slider to qualify turnover, display expected fees, and lock in consultations automatically.

Let's set up a quick 10-minute call so I can show you how this could eliminate manual qualification for your team.

Book a call with me here: [Link to Book a Call]

Best regards,
Gurtej Sandhu
Mercian Wealth`
    }
  },

  'ffconsultants.co.uk': {
    domain: 'ffconsultants.co.uk',
    businessName: 'Future Focus Consultants Ltd',
    ownerOrDirector: 'Director',
    phone: '+447765292472',
    trade: 'Management Consultants & Accountants',
    location: 'London',
    pageLocation: '/contact & homepage',
    observableFriction: 'Generic corporate copy with no instant diagnostic or direct meeting scheduling.',
    frictionBadge: 'Generic Corporate Copy & No Diagnostic',
    evidence: 'Website features standard brochureware with traditional contact forms and zero interactive client self-assessment.',
    recognizableReason: 'Decision-ready SME leaders want immediate clarity on potential tax efficiencies and onboarding velocity.',
    consequenceMechanics: 'Visitors delay action and continue researching rival firms that demonstrate digital convenience.',
    prototypeRemedy: 'Interactive Corporation Tax calculator showing estimated liability & 60-second booking flow.',
    prototypeUrl: 'https://uk-accountancy-os-prototype.vercel.app/',
    customNotes: `• VERIFIED FLAW: Traditional corporate brochure copy with no diagnostic hooks.
• LOCATION: Homepage & /contact.
• COMMERCIAL LEAK: Prospects browse passively without taking action.
• PROTOTYPE FIX: Self-serve tax liability simulator + real-time strategy session booking.`,
    whatsappOutreach: {
      message1: `Hi team 👋 Came across Future Focus Consultants — quick question: when high-growth business directors visit ffconsultants.co.uk, how do you capture them before they leave to compare other firms?`,
      message2: `Reason I ask is that the site uses traditional contact forms without an interactive diagnostic. Business owners browsing outside working hours usually prefer immediate answers over waiting for an email response.`,
      message3: `We created a prototype showing how forward-thinking UK practices convert those visitors on the spot:
https://uk-accountancy-os-prototype.vercel.app/

It allows prospects to calculate their Corporation Tax liability and book a strategy session in under a minute.

Would you be open to a 10-minute call this week?
Book a call with me here: [Link to Book a Call]`,
      quickDirectPitch: `Hi team, ffconsultants.co.uk has solid corporate positioning but lacks an interactive tool to capture after-hours directors.

Take a look at this live practice prototype with instant tax calculations and direct booking:
https://uk-accountancy-os-prototype.vercel.app/

Open to a 10-minute call?
Book a call with me here: [Link to Book a Call]`
    },
    emailOutreach: {
      subject: 'Interactive client intake for FF Consultants',
      body: `Hi team,

I was reviewing ffconsultants.co.uk. You clearly have strong technical expertise, but the website relies on standard contact forms that don't give the visitor an immediate commercial reason to engage right then and there.

We engineered a live prototype demonstrating how progressive UK firms convert passive visitors into confirmed discovery calls:
https://uk-accountancy-os-prototype.vercel.app/

It lets business owners run a 10-second tax assessment and immediately lock in an appointment on your calendar.

I’d love to walk you through how this works on a quick 10-minute screen share.

Book a call with me here: [Link to Book a Call]

Kind regards,
Gurtej Sandhu
Mercian Wealth`
    }
  },

  'aggarwalaccounts.com': {
    domain: 'aggarwalaccounts.com',
    businessName: 'Aggarwal Accounts',
    ownerOrDirector: 'Principal Accountant',
    phone: '+447443419408',
    trade: 'Accountancy Practice',
    location: 'Isleworth / London',
    pageLocation: '/contact-us & branch pages',
    observableFriction: 'Fragmented multi-branch contact numbers with ununified contact forms and no instant partner scheduling.',
    frictionBadge: 'Fragmented Branch Intake & Static Forms',
    evidence: 'Users face multiple office phone numbers and separate enquiry inputs without a central automated intake funnel.',
    recognizableReason: 'Prospective clients become confused about which office handles their turnover bracket and abandon the inquiry.',
    consequenceMechanics: 'Inbound leads get lost between branch phone lines, delaying response times beyond the 5-minute golden window.',
    prototypeRemedy: 'Unified Practice Hub intake routing leads into correct partner diaries automatically.',
    prototypeUrl: 'https://uk-accountancy-os-prototype.vercel.app/',
    customNotes: `• VERIFIED FLAW: Fragmented branch phone numbers and ununified enquiry forms.
• LOCATION: /contact-us.
• COMMERCIAL LEAK: Prospects bounce during branch selection confusion; lead response delayed.
• PROTOTYPE FIX: Unified digital intake that pre-qualifies turnover and books direct.`,
    whatsappOutreach: {
      message1: `Hi team 👋 Came across Aggarwal Accounts — quick question: when new clients reach your website, how does your intake route them between your locations without manual telephone tag?`,
      message2: `Reason I ask is that having multiple branch contact options without a unified booking flow often confuses mobile users and delays your response times during busy filing periods.`,
      message3: `We designed an accountancy intake system that unifies branch booking into a streamlined 60-second experience:
https://uk-accountancy-os-prototype.vercel.app/

Prospects specify turnover, see their fee tier, and book straight into the appropriate calendar.

Let's do a quick 10-minute call to see how this simplifies your intake:
Book a call with me here: [Link to Book a Call]`,
      quickDirectPitch: `Hi team, noticed aggarwalaccounts.com routes leads across multiple branch numbers without a unified booking engine.

Here is a live prototype showing how UK practices streamline multi-office intake into a 60-second booking flow:
https://uk-accountancy-os-prototype.vercel.app/

Book a call with me here: [Link to Book a Call]`
    },
    emailOutreach: {
      subject: 'Inbound routing & booking system for Aggarwal & Co',
      body: `Hi team,

I was exploring aggarwalaccounts.com across your branch locations. When a prospective client lands on the site, navigating between branch contact details and static submission forms introduces friction before they can speak with an accountant.

Here is a live system prototype built to demonstrate seamless inquiry capture:
https://uk-accountancy-os-prototype.vercel.app/

It unifies the client experience: prospects pre-qualify their turnover, view expected fee bands, and book directly with the right office in under a minute.

Would you be open to a 10-minute call this week so I can show you how this applies to your offices?

Book a call with me here: [Link to Book a Call]

Best regards,
Gurtej Sandhu
Mercian Wealth`
    }
  },

  'hslaccountancysolutions.co.uk': {
    domain: 'hslaccountancysolutions.co.uk',
    businessName: 'HSL Accountancy Solutions',
    ownerOrDirector: 'Director',
    phone: '+447926450250',
    trade: 'Accountants & Tax Consultants',
    location: 'Hounslow / West London',
    pageLocation: 'Homepage & /contact',
    observableFriction: 'Traditional static brochure site lacking interactive proof, fee estimates, or real-time appointment booking.',
    frictionBadge: 'Static Brochure & Missing Calendar Hold',
    evidence: 'Brochure format lacks interactive client tools, retainer anchoring, or after-hours calendar reservation.',
    recognizableReason: 'Local SMEs and contractors comparing accountancy practices outside 9-to-5 want immediate booking confirmation.',
    consequenceMechanics: 'Visitors postpone reaching out and often hire the first practice that provides instant scheduling confirmation.',
    prototypeRemedy: 'Practice Hub with instant tax calculations, fee tiering, and direct calendar selection.',
    prototypeUrl: 'https://uk-accountancy-os-prototype.vercel.app/',
    customNotes: `• VERIFIED FLAW: Traditional brochure layout with zero interactive client tooling.
• LOCATION: Homepage & /contact.
• COMMERCIAL LEAK: After-hours SME traffic is completely unmonetized; leads bounce.
• PROTOTYPE FIX: 24/7 calendar reservation + Corporation Tax calculation slider.`,
    whatsappOutreach: {
      message1: `Hi team 👋 Came across HSL Accountancy Solutions in West London — quick question: how do you currently capture local SME directors who search your practice in the evening after hours?`,
      message2: `Reason I ask is that hslaccountancysolutions.co.uk uses a traditional format where visitors have to wait for an email callback. Most directors browsing at night prefer securing an appointment on the spot.`,
      message3: `We built a working prototype demonstrating how progressive accountancy firms capture those after-hours leads:
https://uk-accountancy-os-prototype.vercel.app/

It gives clients an instant tax estimate and lets them book directly in 60 seconds.

Open to a brief 10-minute call to see how this works?
Book a call with me here: [Link to Book a Call]`,
      quickDirectPitch: `Hi team, noticed hslaccountancysolutions.co.uk lacks direct booking for directors researching outside business hours.

Take a look at this live prototype designed to capture and qualify SME accounting leads 24/7:
https://uk-accountancy-os-prototype.vercel.app/

Book a call with me here: [Link to Book a Call]`
    },
    emailOutreach: {
      subject: 'Upgrading client acquisition for HSL Accountancy Solutions',
      body: `Hi team,

I spent a few minutes on hslaccountancysolutions.co.uk. Your local track record is evident, but the site lacks an immediate interactive hook to capture high-margin SME clients who browse outside regular working hours.

We created this interactive accountancy prototype to demonstrate how modern firms convert that after-hours traffic:
https://uk-accountancy-os-prototype.vercel.app/

It provides immediate tax and retainer calculations and lets directors book an initial consultation in 60 seconds without waiting for Monday morning email replies.

Let's schedule a brief 10-minute call so you can see the platform in action.

Book a call with me here: [Link to Book a Call]

Warm regards,
Gurtej Sandhu
Mercian Wealth`
    }
  },

  'accability.co.uk': {
    domain: 'accability.co.uk',
    businessName: 'AccountAbility Yorkshire Limited',
    ownerOrDirector: 'Director',
    phone: '+447766053732',
    trade: 'Accountancy Practice',
    location: 'Yorkshire, UK',
    pageLocation: '/contact-us & services',
    observableFriction: 'Generic inquiry form with no turnover tiering or retainer anchoring, leading to unqualified inbound requests.',
    frictionBadge: 'Unqualified Inbound & Missing Retainer Anchor',
    evidence: 'Inquiry forms lack turnover questions or budget qualification, attracting price-sensitive clients who resist standard retainers.',
    recognizableReason: 'Firms that don\'t anchor prices upfront spend valuable partner hours explaining fee structures to unqualified leads.',
    consequenceMechanics: 'High volume of non-productive discovery calls lowers overall practice billing realization rates.',
    prototypeRemedy: 'Turnover band qualification slider (£150k-£5M) anchoring standard £850/mo retainer tier.',
    prototypeUrl: 'https://uk-accountancy-os-prototype.vercel.app/',
    customNotes: `• VERIFIED FLAW: Generic contact form with no turnover or budget qualification.
• LOCATION: /contact-us.
• COMMERCIAL LEAK: Fee-earners waste time on calls with micro-businesses unable to pay standard retainers.
• PROTOTYPE FIX: Automatic turnover tiering that anchors £850/mo advisory retainers.`,
    whatsappOutreach: {
      message1: `Hi team 👋 Came across AccountAbility Yorkshire — quick question: when new business enquiries land on accability.co.uk, how do you filter out low-margin leads before partner time is booked?`,
      message2: `Reason I ask is that your contact page accepts enquiries without qualifying turnover or fee expectations. Practices using this traditional format often find their diaries filled with prospects not ready for standard retainer fees.`,
      message3: `We developed a live prototype demonstrating how UK firms automate this pre-qualification:
https://uk-accountancy-os-prototype.vercel.app/

Prospects select their turnover bracket, see expected fee bands, and book direct—filtering out tire-kickers automatically.

Let's jump on a quick 10-minute call to walk through the system.
Book a call with me here: [Link to Book a Call]`,
      quickDirectPitch: `Hi team, noticed accability.co.uk accepts general inquiries without turnover tiering, which often burns partner hours on unqualified leads.

Here is a live prototype showing how UK firms pre-qualify retainers and automate bookings:
https://uk-accountancy-os-prototype.vercel.app/

Book a call with me here: [Link to Book a Call]`
    },
    emailOutreach: {
      subject: 'Retainer qualification & calendar booking for Accability',
      body: `Hi team,

I was on accability.co.uk and noticed that when a business owner wants to discuss their accounts, they are directed to an open form with no fee expectations set in advance.

Practices using this traditional format often find partner calendars filled with leads who aren't ready for standard advisory fees.

Take a look at how this prototype pre-qualifies incoming clients:
https://uk-accountancy-os-prototype.vercel.app/

Prospects select their turnover band, see an estimated retainer, and book directly into your diary—filtering out low-fee inquiries before they reach you.

Let’s grab 10 minutes on a call to review how this could work for Accability.

Book a call with me here: [Link to Book a Call]

Best regards,
Gurtej Sandhu
Mercian Wealth`
    }
  },

  'brad-scott-cpa': {
    domain: 'splinternetmarketing.com',
    businessName: 'Brad Scott CPA',
    ownerOrDirector: 'Brad Scott CPA',
    phone: '+447654827739',
    trade: 'Certified Public Accountant',
    location: 'Lebanon, IN / Directory Profile',
    pageLocation: 'Local directory profile page',
    observableFriction: 'Hosted on a 3rd-party directory with no independent modern practice storefront or direct calendar booking.',
    frictionBadge: 'Directory Hostage & No Practice Storefront',
    evidence: 'Practice presence is buried inside a generic local directory alongside competitors with no dedicated qualification funnel.',
    recognizableReason: 'High-value business clients search for an independent, authoritative practice brand rather than a directory listing.',
    consequenceMechanics: 'Visitors compare competing accountants on the same directory page, leaking high-fee corporate engagements.',
    prototypeRemedy: 'Independent practice portal with custom domain branding, fee calculator, and direct meeting scheduler.',
    prototypeUrl: 'https://uk-accountancy-os-prototype.vercel.app/',
    customNotes: `• VERIFIED FLAW: Hosted on a generic directory page surrounded by competitor listings.
• LOCATION: Directory listing.
• COMMERCIAL LEAK: Zero brand authority; clients compare rivals on the same page.
• PROTOTYPE FIX: Dedicated practice portal with interactive tax estimator and 60s booking.`,
    whatsappOutreach: {
      message1: `Hi Brad 👋 Quick question regarding your accounting practice: how are commercial clients currently booking consultations with you without competing against directory listings?`,
      message2: `Reason I ask is that your current web profile is hosted within a local directory alongside other pros rather than an authoritative, dedicated practice portal with direct booking.`,
      message3: `We engineered a dedicated client acquisition prototype showing how modern firms capture clients directly:
https://uk-accountancy-os-prototype.vercel.app/

It features an interactive tax estimator and locks in client appointments in under 60 seconds.

Open to a brief 10-minute call to see how this elevates your practice?
Book a call with me here: [Link to Book a Call]`,
      quickDirectPitch: `Hi Brad, noticed your web presence is tied to a directory listing with no direct booking engine.

Take a look at this dedicated practice prototype with instant tax tiering and 60-second booking:
https://uk-accountancy-os-prototype.vercel.app/

Book a call with me here: [Link to Book a Call]`
    },
    emailOutreach: {
      subject: 'Dedicated client acquisition portal for Brad Scott CPA',
      body: `Hi Brad,

I noticed your web presence is currently hosted within a local directory listing rather than an independent, high-converting practice portal.

When commercial business owners search for an accountant, being listed alongside competitors creates friction and price comparison.

Take a look at this live practice prototype:
https://uk-accountancy-os-prototype.vercel.app/

It gives your practice an authoritative front door, calculates tax tiers upfront, and books consultations in 60 seconds.

Let's schedule a quick 10-minute call to review it.

Book a call with me here: [Link to Book a Call]

Best regards,
Gurtej Sandhu
Mercian Wealth`
    }
  }
}

export function findAccountantIntelligence(
  website?: string | null,
  businessName?: string | null
): AccountantLeadIntelligence | null {
  const normWeb = (website || '').toLowerCase()
  const normName = (businessName || '').toLowerCase()

  for (const [key, intel] of Object.entries(TARGET_ACCOUNTANT_LEADS_REGISTRY)) {
    if (normWeb.includes(key)) return intel
    if (normWeb.includes(intel.domain)) return intel
    if (normName.includes(intel.businessName.toLowerCase())) return intel
    // Special keywords
    if (key.includes('barrie') && (normWeb.includes('barrie') || normName.includes('barrie'))) return intel
    if (key.includes('rathod') && (normWeb.includes('rathod') || normName.includes('rathod'))) return intel
    if (key.includes('852') && (normWeb.includes('852') || normName.includes('852'))) return intel
    if (key.includes('rkpartners') && (normWeb.includes('rkpartner') || normName.includes('driscoll'))) return intel
    if (key.includes('protax') && (normWeb.includes('protax') || normName.includes('protax'))) return intel
    if (key.includes('ffconsultants') && (normWeb.includes('ffconsultants') || normName.includes('future focus'))) return intel
    if (key.includes('aggarwal') && (normWeb.includes('aggarwal') || normName.includes('aggarwal'))) return intel
    if (key.includes('hsl') && (normWeb.includes('hsl') || normName.includes('hsl'))) return intel
    if (key.includes('accability') && (normWeb.includes('accability') || normName.includes('accountability yorkshire'))) return intel
    if (key.includes('brad') && (normWeb.includes('brad-scott') || normName.includes('brad scott'))) return intel
  }

  return null
}
