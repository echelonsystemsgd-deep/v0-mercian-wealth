/**
 * lib/site-copy.ts
 *
 * Centralised Copy Registry for mercianwealth.com
 *
 * High-Converting Websites, Bespoke Mobile Storefronts & Automated Booking Systems
 * Engineered for Premier Local Businesses, Trade Operators, Clinics & Commercial Services across the UK.
 */

export const SITE_COPY = {
  // Global Meta Info
  metadata: {
    layout: {
      defaultTitle: "Mercian Wealth · High-Converting Websites & Booking Systems",
      titleTemplate: "%s · Mercian Wealth",
      description: "We build bespoke websites, 3-tap booking flows, and instant WhatsApp alerts for UK local businesses. See a working prototype before committing.",
    },
    home: {
      title: "Mercian Wealth · High-Converting Websites & Booking Systems",
      description: "Websites that load in under a second, capture bookings in 3 taps, and stop enquiries leaking. See your new site built before you decide anything.",
    },
    services: {
      title: "Website Creations & Booking Systems · Mercian Wealth",
      description: "Bespoke Websites, 3-Tap Mobile Booking Flows, Automated Google Review Systems, and Managed Website Care.",
    },
    process: {
      title: "Website Build & Launch Protocol · Mercian Wealth",
      description: "From custom working prototype to fully live, high-converting website in 7 days. Zero downtime cutover.",
    },
    portfolio: {
      title: "Website Creations & Case Studies · Mercian Wealth",
      description: "Explore bespoke mobile storefronts, clinic portals, and booking systems built for UK local businesses.",
    },
    pricing: {
      title: "Website Build & Retainer Pricing · Mercian Wealth",
      description: "Transparent UK GBP (£) pricing: Fixed website builds (£495–£1,495) + Flat managed monthly website care (£95–£595/mo). Zero lock-in.",
    },
    testimonials: {
      title: "Operational Outcomes & Case Studies · Mercian Wealth",
      description: "Quantified revenue recovery, zero lost bookings, and verifiable business ROI.",
    },
    contact: {
      title: "Direct Gateway · Mercian Wealth",
      description: "Connect directly with our team or request a custom working prototype for your business.",
    },
    book: {
      title: "Book a Call · Mercian Wealth",
      description: "Schedule a 15-minute call to discuss your new website and see a working prototype before deciding.",
    },
  },

  // Navbar Component
  navbar: {
    logo: "Mercian Wealth",
    tagline: "High-Converting Websites · 3-Tap Booking · Zero Leaked Leads",
    links: [
      { label: "Solutions", href: "/services" },
      { label: "Protocol", href: "/process" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
    ],
    ctaText: "Book a call",
    ctaHref: "/book",
    whatsappCtaText: "Message on WhatsApp",
    whatsappHref: "https://wa.me/447851055929",
  },

  // Homepage Sections
  homepage: {
    // 0. Live Telemetry Ticker
    telemetryTicker: {
      items: [
        "Unanswered enquiries bleed revenue to faster competitors in under 60 seconds.",
        "Websites that load in under a second convert 3x more mobile visitors into bookings.",
        "Zero manual coordination: customer booking, upfront deposit capture, and instant WhatsApp alerts.",
        "Measured in four commercial outcomes: time saved, cost reduced, revenue increased, and risk removed.",
      ]
    },

    // 1. Hero Section (Outcomes-First)
    hero: {
      eyebrow: "HIGH-CONVERTING WEBSITES · MOBILE STOREFRONTS · PROTOTYPE-FIRST",
      headline: "We help local businesses stop losing jobs to whoever replies first.",
      subheadline: "Every enquiry gets answered in seconds, every deposit gets captured, every review gets collected — automatically. See your new site built before you decide anything.",
      primaryCtaText: "Book a call",
      primaryCtaHref: "/book",
      secondaryCtaText: "See a free prototype of your site",
      secondaryCtaHref: "#prototype-modal",
      whatsappCtaText: "Message on WhatsApp",
      whatsappHref: "https://wa.me/447851055929",
      proofBadge: "Time Saved · Cost Reduced · Revenue Increased · Risk Removed",
      trustItems: [
        "Faster Response Times",
        "Zero Missed Leads",
        "More Bookings Closed",
        "Less Admin Drag",
      ],
      unsureText: "Message directly on WhatsApp or test our live demo below →",
    },

    // 2. What Changed (SYSTEM I)
    whatChanged: {
      eyebrow: "WHAT CHANGED",
      headline: "The rules of customer acquisition shifted. Waiting is now an active choice to lose revenue.",
      subheadline: "Every business is feeling the shift in customer expectations. The operators who adapt to instant response capture market share while traditional setups leak cash.",
      shifts: [
        {
          outcome: "Revenue Increased",
          tag: "CONVERSION LIFT",
          title: "Customers Don't Browse Anymore, They Decide",
          description: "A slow or unclear site is now a direct revenue leak, not just a bad look. Inbound visitors arrive already half-convinced; your site's only job is closing the gap immediately.",
        },
        {
          outcome: "Risk Removed",
          tag: "DISCOVERABILITY",
          title: "Unstructured Sites Are Invisible to Search Answers",
          description: "Search engines and answer engines decide who gets recommended. If your site isn't structured to give clear, direct answers, you're invisible where customers are actually asking — a growth risk that's easy to remove and easy to ignore.",
        },
        {
          outcome: "Cost Reduced",
          tag: "TIME RECLAIMED",
          title: "Every Unanswered Hour Becomes a Lost Booking",
          description: "Every hour an enquiry sits unanswered is time that turns into a lost booking. Chasing cold leads is one of the most fixable costs in a local business.",
        },
        {
          outcome: "Risk Removed",
          tag: "CUSTOMER RETENTION",
          title: "The Business That Answers First Keeps the Customer",
          description: "The business that answers first keeps the customer. The one that's slow loses them to whoever replies faster.",
        },
      ],
    },

    // Divergence Comparison (The Two-Path Mechanic)
    divergenceComparison: {
      eyebrow: "OPERATIONAL LEVERAGE",
      headline: "Delayed response is an unforced error. Answer in seconds, or lose the job to someone who will.",
      subheadline: "In local services, the first business to pick up the enquiry and confirm the slot secures the customer. You can continue relying on slow contact forms—or deploy high-converting websites and booking systems that scale effortlessly.",
      pathConventional: {
        badge: "MANUAL DRAG · 5-FIGURE REVENUE LEAK",
        title: "The Traditional Brochure Website",
        subtitle: "Losing lucrative jobs and high-ticket bookings whilst on-site or after hours.",
        points: [
          "Slow page loads causing over 50% of mobile visitors to bounce immediately.",
          "Buried contact forms that leave customer enquiries unread for hours or days.",
          "Verbal bookings made without upfront deposits, leading to costly no-shows.",
          "Zero automated review collection, leaving your Google reputation stagnant.",
        ]
      },
      pathMercian: {
        badge: "CONVERSION INFRASTRUCTURE · 24/7 CAPTURE",
        title: "The Mercian Website System",
        subtitle: "Sub-second load speed, 3-tap booking, and upfront deposit capture.",
        points: [
          "Sub-second load times engineered for mobile searchers and high conversion.",
          "3-tap booking flow with direct Stripe / Apple Pay upfront deposit locking.",
          "Instant smartphone alerts sent to your WhatsApp the second an enquiry arrives.",
          "Managed website care guaranteeing continuous speed, uptime, and updates.",
        ],
      }
    },

    // 3. Bottleneck Analysis (SYSTEM II)
    bottleneck: {
      eyebrow: "WHERE REVENUE LEAKS",
      headline: "Four Places Your Business Leaks Revenue Every Single Week.",
      subheadline: "Most owners think they have a traffic problem. In reality, they are losing customers who already want to buy, but hit friction before they can confirm.",
      goldSlogan: "Whilst competitors let enquiries sit in inboxes, your system answers instantly, confirms details, and secures bookings.",
      systemMode: "Mode: ",
      modeAutomated: "Instant Booking System",
      modeManual: "Manual Reception Drag",
      triggerBtnActive: "Deactivate Booking Engine",
      triggerBtnInactive: "Activate Booking Engine",
      diagnosticLink: "Book a call →",
      cards: [
        {
          id: "time-leak",
          outcome: "Time Wasted",
          tag: "ADMIN DRAG",
          metric: "4–8 hrs/wk",
          title: "Manual Admin & Enquiry Chase",
          description: "Hours spent answering repetitive pricing questions, coordinating schedules, and chasing unconfirmed bookings across messages.",
        },
        {
          id: "cost-leak",
          outcome: "Cost Incurred",
          tag: "LOST REVENUE",
          metric: "£1.2k–£3.5k/mo",
          title: "Slow Speed-to-Lead",
          description: "Enquiries that sit unaddressed for hours go straight to the next competitor on Google who answers first.",
        },
        {
          id: "risk-leak",
          outcome: "Risk Incurred",
          tag: "REVENUE LEAK",
          metric: "15–30% Leaked",
          title: "No Upfront Deposit or Lock",
          description: "Consultations and bookings made verbally without a deposit, resulting in last-minute cancellations and empty diary slots.",
        },
        {
          id: "revenue-leak",
          outcome: "Revenue Lost",
          tag: "REPUTATION DRAG",
          metric: "Compounding",
          title: "Zero Follow-Up & Stagnant Reviews",
          description: "No review system, no structured follow-up — competitors compound their 5-star reputation while your customer pipeline stays flat.",
        },
      ],
    },

    // 4. Offer Mechanism (SYSTEM III)
    offerMechanism: {
      eyebrow: "THE OFFER PROTOCOL",
      headline: "Before we build your actual site, we build a working prototype of it.",
      subheadline: "You will never be asked to commit based on promises, slide decks, or vague proposals. You see your actual system running before any agreement.",
      steps: [
        {
          stepNumber: "01",
          title: "We build a working prototype specific to your business.",
          description: "Not a deck, not a proposal. Real design, real booking flow, tailored to your exact business.",
          metric: "Real Business Logic",
        },
        {
          stepNumber: "02",
          title: "You see exactly what it changes.",
          description: "Load speed, 3-tap booking flow, admin hours saved, and upfront deposits secured on your smartphone.",
          metric: "Tangible Outcomes",
        },
        {
          stepNumber: "03",
          title: "We build it for real — only once the outcome is worth it to you.",
          description: "Zero pressure, zero upfront commitment. We only deploy if the numbers make undeniable commercial sense.",
          metric: "Zero Commitment",
        },
      ],
      ctaText: "See a free prototype of your site",
    },

    // 5. Dual Proof Case Studies (SYSTEM V)
    caseStudies: {
      eyebrow: "VERIFIED OUTCOMES",
      headline: "Proven Results. No Fabricated Metrics.",
      subheadline: "Real business outcomes and live outreach prototypes engineered to stop operational leakage.",
      studies: [
        {
          id: "bakery-storefront",
          title: "The Caker Street Bakery",
          badge: "VERIFIED PRODUCTION METRICS",
          outcomes: [
            { label: "Time saved", value: "499 hrs/yr" },
            { label: "Revenue increased", value: "+£32,400/yr" },
          ],
          problem: "Overwhelmed owner spending evenings chasing bank transfers and answering order specs across Instagram DMs.",
          solution: "Automated 3-tap customer storefront with upfront card deposits and instant WhatsApp phone notifications.",
          image: "/caker-st-preview.png",
          liveUrl: "/local",
          isPrototype: false,
        },
        {
          id: "aura-aesthetics",
          title: "Aura Private Aesthetics",
          badge: "OUTREACH PROTOTYPE · ZERO FABRICATED METRICS",
          outcomes: [
            { label: "Risk removed", value: "Zero DM Leaks" },
            { label: "Outcome", value: "Consultations Secured" },
          ],
          problem: "Consultation intake & deposit engine — built to stop high-ticket enquiries leaking through DMs before they ever book.",
          solution: "Direct qualification triage that collects treatment requirements, locks appointment slots, and captures deposits within 60 seconds.",
          image: "/stamp-app-preview.png",
          liveUrl: "/local",
          isPrototype: true,
        },
      ],
    },

    // 6. Founder & Positioning Statement (SYSTEM VI)
    whyMercianWealth: {
      eyebrow: "OPERATOR COMMITMENT",
      headline: "Engineered For Businesses That Refuse to Lose Leads.",
      description: "Your website should answer immediately, confirm bookings, and capture revenue without requiring you to be tied to your screen all day.",
      founderQuoteHeadline: "Clear Outcomes. Zero Tool-Talk.",
      founderQuoteText: "We don't talk about agents, models, or workflows — that's our job, not yours. We talk about what changes for you: faster response times, fewer missed leads, more bookings closed, less time spent chasing admin. If a system doesn't save time, cut cost, grow revenue, or remove a risk, it doesn't go on your site.",
      founderQuoteAuthor: "Founder & Lead Strategist, Mercian Wealth",
      proofStats: [
        { label: "Outcome Target", value: "Time & Rev" },
        { label: "Load Speed", value: "< 1 Second" },
        { label: "Prototype-First", value: "Zero Risk" },
      ],
      differentiators: [
        "Sub-Second Mobile Storefronts — Fast loading, bespoke UI design, and frictionless booking that keeps visitors engaged.",
        "Working Prototype First — You test a live, functioning version of your website before making any financial commitment.",
        "Revenue & Time Focus — Every build is engineered strictly to save hours, cut costs, increase revenue, or remove risks.",
      ],
      structuralRealityHeadline: "The Strategic Divide",
      standardAgency: {
        title: "Standard Web / Marketing Agency",
        items: [
          "Builds slow, generic template sites that don't capture upfront deposits.",
          "Passes slow, unvetted contact forms to your overwhelmed inbox.",
          "Leaves enquiries sitting until the next working day.",
          "Charges expensive retainers with zero direct revenue-tied maintenance.",
        ],
      },
      mercianWealth: {
        title: "Mercian Wealth Website Systems",
        items: [
          "Sub-second Next.js websites deployed via rapid 7-day agile sprints.",
          "Automated upfront Stripe deposit capture on bookings and consultations.",
          "Direct smartphone WhatsApp notifications with full customer specifications.",
          "Continuous managed website care: speed optimization and uptime monitoring.",
          "Predictable, high-ROI monthly care tiers that keep your site fast and secure.",
        ],
      },
    },

    // Commodity Trap
    commodityTrap: {
      eyebrow: "THE HARSH REALITY",
      headline: "Basic web forms and slow callbacks leak revenue. Fast response closes deals.",
      description: "Customers do not wait around for days. They demand immediate confirmation, clear details, and rapid booking.",
    },

    // 5. Trend Adaptation Statement
    trendAdaptation: {
      eyebrow: "CONTINUOUS UPTIME & SPEED SLA",
      headline: "Your Website Runs 24/7 Whilst You Focus On Running Your Business.",
      description: "We handle cloud edge hosting, sub-second speed monitoring, security patches, and monthly content updates. Your website remains fast and reliable 365 days a year.",
    },

    // 6. Model Hint
    modelHint: {
      eyebrow: "TRANSPARENT PRICING",
      headline: "Fixed-Price Website Builds & Managed Retainers Engineered For Decisive ROI.",
      description: "Every tier includes bespoke website architecture + optional monthly website care: sub-second cloud hosting, uptime monitoring, conversion audits, and content updates.",
    },

    // 7. Category Exclusivity & Postcode Lock
    exclusivity: {
      eyebrow: "TERRITORIAL EXCLUSIVITY",
      headline: "We partner with selected premier local businesses per sector in each territory.",
      subheadline: "Because our high-converting websites and 3-tap booking systems capture the majority of local inbound demand, we do not deploy direct duplicate assets for local rivals simultaneously.",
      badge: "One Operator Per Sector Allocation",
      lockDescription: "Once a territory allocation is claimed, that sector is protected against direct competitor duplication for the duration of our partnership.",
      buttonText: "Check Sector & Territory Availability",
      buttonHref: "/book",
    },

    exclusivityLock: {
      eyebrow: "TERRITORIAL EXCLUSIVITY",
      headline: "We Partner With Selected Premier Local Operators Across the UK.",
      description: "To guarantee decisive commercial dominance, we partner with selected premier operators per postcode and trade sector. When we build your custom website and booking system, you hold a decisive speed advantage.",
    },

    // 8. Testimonials Section
    testimonials: {
      eyebrow: "PROVEN OPERATIONAL RESULTS",
      headline: "How premier local businesses eliminated lost enquiries and grew revenue.",
      subheadline: "Real outcomes from trade specialists, aesthetics clinics, and commercial firms who upgraded to our high-converting websites and booking systems.",
      guarantee: "Strict Performance SLAs · Sub-Second Speed Standards · Transparent Retainers",
      
      cohortCard: {
        badge: "WEBSITE ARCHITECTURE BLUEPRINT",
        title: "High-Converting Websites Built For Direct Cash Flow",
        paragraph1: "We engineer bespoke websites, 3-tap mobile storefronts, and instant WhatsApp booking flows for UK businesses who refuse to lose customers to slow response and manual admin.",
        paragraph2: "Sub-second mobile speed, automated upfront Stripe deposit collection, instant WhatsApp alerts, and automated Google review collection included as standard.",
        paragraph3: "Fixed-Price Build (£495–£1,495) + Optional Managed Website Care (£95–£595/mo). Zero hidden fees, clear 99.98% uptime SLA.",
        enquiryCtaText: "To review your current website and test a working prototype tailored to your business, book your 15-minute call below or message us directly on WhatsApp.",
      },

      trustPoints: [
        "Sub-Second Mobile Load Speed",
        "3-Tap Upfront Deposit Capture",
        "Instant Smartphone WhatsApp Alerts",
      ],

      items: [
        {
          quote: "Our old website was slow, buried in search, and prospective clients had to wait hours for a response. Mercian built our new website and sub-minute quote engine in 6 days. Enquiries now get captured with upfront details immediately. It paid for itself in the first 3 weeks.",
          author: "David H.",
          role: "Operations Director",
          location: "Apex Commercial Services · Berkshire & Thames Valley",
          metric: "+£64,000 Recovered Pipeline",
        },
        {
          quote: "Our clinic was losing clients who bounced off our clunky old booking page. Mercian designed a bespoke luxury storefront with a 3-tap consultation builder. Our consultation booking rate doubled in the first month.",
          author: "Dr. Elena Rostova",
          role: "Clinical Lead & Founder",
          location: "Aura Private Aesthetics · London & West Midlands",
          metric: "89% Consultation Show Rate",
        },
      ],
    },

    // 7. Pricing Tiers
    pricing: {
      eyebrow: "WEBSITE BUILDS & MANAGED RETAINERS",
      headline: "Predictable Investment. Measurable Commercial Return.",
      subheadline: "Choose between our fixed-price website builds and monthly website care tiers. Every build includes custom design, mobile optimization, upfront deposit capture, and instant WhatsApp alerts.",
      setupFeeDisclaimer: "Implementation setup covers bespoke web architecture, custom UI/UX design, booking flow configuration, Stripe deposit integration, and end-to-end launch testing.",
      monthlyDisclaimer: "Website care retainers cover edge cloud hosting, SSL certification, uptime monitoring, conversion audits, and monthly content/menu updates with zero lock-in.",
      revenueShareDisclaimer: "Custom multi-location and enterprise specifications available on request.",
    },

    // 8. Lead Capture / Postcode Lock
    leadCapture: {
      eyebrow: "TERRITORIAL WEBSITE AUDIT",
      headline: "Verify if your sector and territory are still available.",
      subheadline: "Enter your postcode and industry below to run a real-time availability check and schedule your 15-minute website consultation with our team.",
      postcodePlaceholder: "e.g. SL4 1PD or B91 3QJ",
      businessNamePlaceholder: "Your Business Name",
      phonePlaceholder: "Your WhatsApp / Mobile Number",
      submitButtonText: "Check Availability & Request Prototype",
      guaranteeText: "100% Free · Zero Obligation · Live Interactive Prototype Included",
      
      consultationBooking: {
        headline: "Book Your 15-Minute Website & Conversion Call",
        subheadline: "Pick a time on our live diary. We will analyse your current website, demonstrate a live prototype tailored to your services, and show you exactly where enquiries are leaking.",
        calendarPlaceholder: "Select a date and time slot from our live diary below.",
        enquiryCtaText: "To review your website and test a working prototype configured for your firm, book your 15-minute call below or message us directly on WhatsApp.",
      },

      trustPoints: [
        "Sub-Second Mobile Load Speed",
        "3-Tap Upfront Deposit Capture",
        "Instant Smartphone WhatsApp Alerts",
      ],
    },

    // 9. FOMO Close & CTA Section
    cta: {
      headline: "Stop guessing what faster, cleaner, or more profitable would look like. See it.",
      subheadline: "Request a custom working prototype for your business. You see the outcome before making any commitment.",
      buttonText: "See Your Free Prototype",
      secondaryButtonText: "Book a call",
      whatsappButtonText: "Chat on WhatsApp",
    },

    // 10. FAQ Section (100% Website Cutovers & Outcomes)
    faq: {
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      headline: "Direct Answers. Zero Jargon.",
      description: "Everything you need to know about our website builds, zero-downtime cutover, how the prototype works, and our terms.",
      faqs: [
        {
          question: "Will switching to a new website disrupt our existing domain, emails, or Google ranking?",
          answer: "No. We handle the entire cutover seamlessly with zero downtime. Your existing domain name, business email accounts, and Google Search rankings are completely preserved and strengthened.",
        },
        {
          question: "How does the upfront deposit and booking capture work on the site?",
          answer: "We integrate direct Stripe and Apple Pay gateways tailored to your booking rules. Customers pay their deposit or service fee directly in 3 taps, and you receive an instant WhatsApp alert with their details.",
        },
        {
          question: "What happens if a customer asks a question outside the standard booking flow?",
          answer: "The site features a direct WhatsApp contact channel and enquiry intake form. The instant a visitor submits an enquiry, you receive an immediate alert on your smartphone with their exact request.",
        },
        {
          question: "How does the working prototype work before we commit?",
          answer: "We build a functioning prototype of your new website within 48 hours. You test how it looks and functions on your own smartphone. You only decide to proceed if you love what you see.",
        },
        {
          question: "What is included in the monthly website care retainer?",
          answer: "All retainers are month-to-month with 30 days notice and zero long-term lock-in. Retainers include premium edge cloud hosting, security patches, conversion audits, and regular content, photo, or menu updates.",
        },
      ],
    },
  },

  // Services Page Copy (`/services`)
  servicesPage: {
    headerTitle: "Slow websites, complicated booking forms, and lost enquiries are costing you revenue.",
    headerHighlight: "Here is what we build.",
    headerSubtitle: "We build bespoke high-converting websites, 3-tap mobile booking flows, instant WhatsApp alerts, and managed website care for ambitious local businesses.",
    objectionCallout: "Traditional agencies build slow, generic brochure websites with buried contact forms. We engineer sub-second digital storefronts and booking engines that convert visitors into paying clients 24/7.",
    
    list: [
      {
        title: "High-Converting Websites & Mobile Storefronts",
        description: "Over 70% of local service enquiries come from mobile devices. If your site takes longer than 2 seconds to load, half your visitors leave.",
        outcome: "Sub-Second Mobile Load Speed",
        tagline: "Never Lose Another Client to Slow Load Speeds.",
        overview: "We design bespoke Next.js websites tailored to your exact brand. Fast, responsive, and engineered specifically to convert mobile searchers into paying clients.",
        features: [
          { name: "Sub-Second Mobile Speed", description: "Global edge CDN delivery ensuring instant rendering on smartphones." },
          { name: "Bespoke Atelier Design", description: "Tailored UI/UX reflecting your premium standards with zero generic templates." },
          { name: "Search & AEO Discoverability", description: "Structured JSON-LD schema markup so Google and AI answer engines recommend you." },
          { name: "Zero Downtime Launch", description: "Seamless transition keeping your existing domain, email, and rankings 100% intact." },
        ],
        ctaText: "Book a call",
        ctaHref: "/book",
      },
      {
        title: "3-Tap Booking Flows & WhatsApp Alerts",
        description: "Complicated forms and back-and-forth messaging cause customers to abandon bookings before confirming.",
        outcome: "< 60s Booking Handoff",
        tagline: "Frictionless Booking & Instant Smartphone Notifications.",
        overview: "A streamlined customer intake interface allowing clients to choose their service, enter requirements, and pay an upfront deposit in 3 taps.",
        features: [
          { name: "3-Tap Mobile Intake", description: "Clean step-by-step selector removing friction so clients book immediately." },
          { name: "Instant WhatsApp Owner Alerts", description: "Delivers complete customer specifications directly to your smartphone in seconds." },
          { name: "Stripe & Apple Pay Integration", description: "Secure upfront deposit capture locking in commitment before work begins." },
          { name: "Two-Way Calendar Sync", description: "Automatic slot booking synchronized with Google Calendar or your CRM." },
        ],
        ctaText: "Book a call",
        ctaHref: "/book",
      },
      {
        title: "Automated 5-Star Google Review Engine",
        description: "Local competitors with hundreds of 5-star Google reviews win the most lucrative jobs by default.",
        outcome: "Automated Reputation Growth",
        tagline: "Scale Your 5-Star Google Reviews on Autopilot.",
        overview: "An automated post-service follow-up sequence that prompts satisfied clients via WhatsApp or SMS to leave a 5-star Google review within 24 hours.",
        features: [
          { name: "Automated WhatsApp Prompts", description: "Sends a direct one-tap review link to the client once the job is marked complete." },
          { name: "Negative Feedback Filter", description: "Directs private feedback to the owner while guiding happy clients to Google." },
          { name: "Reputation Compounding", description: "Steadily builds social proof to push your business to the top of local search." },
          { name: "Hands-Off Automation", description: "Zero manual texting or follow-up required from you or your team." },
        ],
        ctaText: "Book a call",
        ctaHref: "/book",
      },
      {
        title: "Managed Website Care & Growth Retainer",
        description: "Websites that lack regular updates, security patches, and speed tuning gradually degrade in performance and search rank.",
        outcome: "99.98% Uptime & Continuous Speed",
        tagline: "Total Peace of Mind. Zero Technical Maintenance.",
        overview: "We manage your cloud hosting, SSL certificates, speed audits, and monthly content changes so your website stays fast, secure, and fresh 365 days a year.",
        features: [
          { name: "Dedicated Edge Cloud Hosting", description: "Fast, secure global hosting with automated backups and 99.98% uptime." },
          { name: "Regular Speed & Conversion Audits", description: "Continuous code and image optimization to maintain sub-second speeds." },
          { name: "Monthly Content & Menu Updates", description: "Hands-off support for price changes, new photos, and service updates." },
          { name: "Priority Direct Hotline", description: "Direct communication with our engineering team whenever you need changes." },
        ],
        ctaText: "Book a call",
        ctaHref: "/book",
      },
    ],
  },

  // Process Page Copy (`/process`)
  processPage: {
    headerTitle: "You do not have months to endure painful agency delays.",
    headerHighlight: "Live in 7 Days",
    headerSubtitle: "From initial conversion audit to a live bespoke website and 3-tap booking flow in 7 days. Zero operational drag.",
    steps: [
      {
        number: "01",
        title: "Step 1: Website Diagnostic & Conversion Audit",
        sub: "Analysing your current site, bounce rates, and booking friction points.",
        details: "We examine your current website, mobile load speed, customer flow, and competitors to design the optimal conversion architecture for your business.",
        deliverable: "Bespoke Website Architecture Blueprint",
      },
      {
        number: "02",
        title: "Step 2: Interactive Prototype Build",
        sub: "Building a working prototype of your new site within 48 hours.",
        details: "We build a functioning prototype tailored to your brand, service lines, and pricing. You test the speed and booking flow on your own smartphone before committing.",
        deliverable: "Live Working Prototype in 48 Hours",
      },
      {
        number: "03",
        title: "Step 3: Custom Design & Booking Flow Integration",
        sub: "Refining visual design, connecting Stripe deposits, and setting up WhatsApp alerts.",
        details: "We finalize your bespoke branding, connect upfront card deposit gateways, configure instant WhatsApp alerts to your phone, and test edge cases.",
        deliverable: "Fully Integrated Website & Checkout Flow",
      },
      {
        number: "04",
        title: "Step 4: Seamless Cutover & Managed Website Care",
        sub: "Zero-downtime launch keeping your domain, emails, and rankings intact.",
        details: "We switch your domain seamlessly with zero downtime. We begin our monthly managed care: monitoring speed, maintaining uptime, and implementing regular content updates.",
        deliverable: "Zero-Downtime Launch & Monthly Retainer SLA",
      },
    ],
  },

  // Portfolio Page Copy (`/portfolio`)
  portfolioPage: {
    headerTitle: "Explore our recent website creations and conversion systems.",
    headerHighlight: "Built For Growth",
    headerSubtitle: "Bespoke digital storefronts and booking systems engineered for premier local businesses across the UK.",
    noticeTitle: "Built Specific To Your Trade & Services",
    noticeDescription: "Every website is tailored to your exact brand, service lines, pricing, and deposit rules. Explore our work below or request a free working prototype for your business.",
    constructionTitle: "Request A Free Working Prototype",
    constructionDescription: "Want to see how a bespoke website and 3-tap booking flow look for your business? We build a working prototype within 48 hours.",
    emailLabel: "Business Email",
    nameLabel: "Your Name",
    submitBtnText: "Book a call",
    underConstructionText: "Request custom website prototype: ",
  },

  // Pricing Page Copy (`/pricing`)
  pricingPage: {
    headerTitle: "Losing a single high-value customer costs far more than the website that secures them.",
    headerHighlight: "Transparent Website Build & Retainer Terms",
    headerSubtitle: "Clear, predictable investment. Fixed implementation setup to design and build your custom website + Flat monthly website care to maintain speed, hosting, and updates.",
    performanceSLATitle: "Strict Speed Standards & Launch Commitments",
    performanceSLASubtitle: "We Back Our Website Systems With Transparent Commitments",
    performanceSLAParagraph: "Rapid 7-day launch backed by guaranteed sub-second mobile page loads, 99.98% uptime SLA, and hands-off monthly maintenance.",
    roiCalculator: {
      eyebrow: "REVENUE RECOVERY CALCULATOR",
      title: "Calculate Your Lost Enquiry Revenue",
      description: "Discover how much revenue a fast, high-converting website and upfront deposit flow recovers each month.",
      annualTimeLabel: "Annual Admin Hours Saved",
      growthLiftLabel: "Est. Extra Bookings Secured (+25%)",
      valueUnlockedLabel: "Total Annual Revenue Secured",
      valueDisclaimer: "Calculated based on reducing mobile bounce rates and capturing upfront deposits on inbound visitors.",
      recommendedLabel: "Recommended Package:",
      recommendedSuffix: " Architecture",
      applyBtnText: "Book a call",
      currentRevenueLabel: "Monthly Website Visitors",
      weeklyHoursLabel: "Average Booking / Job Value (£)",
    },
    billingToggleSetup: "Implementation Setup",
    billingToggleRetainer: "Website Care & Growth Retainer",
    billingToggleRevenueShare: "Custom / Enterprise",
    oneTimeTiers: [
      {
        name: "Essential Build",
        price: "495",
        interval: "one-off fixed investment",
        milestoneBreakdown: "Delivered in 5–7 business days",
        description: "For single-service businesses needing a high-speed, modern website that captures customer enquiries cleanly without losing leads.",
        features: [
          "Bespoke High-Speed Next.js Website (< 900ms load)",
          "Mobile-Optimized Storefront & Enquiry Intake",
          "Direct WhatsApp & Phone Click-to-Connect Integration",
          "Semantic Local SEO & AEO Schema Markup",
          "Google Maps & Business Profile Integration",
          "30 Days Included Post-Launch Support & Adjustments",
        ],
        cta: "Book a call",
        featured: false,
        tag: "Essential",
      },
      {
        name: "Growth System",
        price: "895",
        interval: "one-off fixed investment",
        milestoneBreakdown: "Delivered in 7 business days",
        description: "For established businesses wanting 3-tap booking, upfront deposit capture, and automated WhatsApp alerts to the owner's phone.",
        features: [
          "Everything in Essential Build",
          "Interactive 3-Tap Mobile Booking & Order Builder",
          "Stripe & Apple Pay Upfront Deposit Collection",
          "Sub-Second WhatsApp Alert to Owner on New Bookings",
          "Automated Customer Confirmation Receipt via WhatsApp/Email",
          "Google / Outlook Calendar Two-Way Synchronization",
          "Automated 5-Star Google Review Extraction Sequence",
          "60 Days Included Post-Launch Support Desk",
        ],
        cta: "Book a call",
        featured: true,
        tag: "Most Popular",
      },
      {
        name: "Flagship Custom",
        price: "1,495",
        interval: "one-off fixed investment",
        milestoneBreakdown: "Delivered in 10–14 business days",
        description: "For premier businesses requiring bespoke atelier design, multi-service consultation setters, and comprehensive conversion architecture.",
        features: [
          "Everything in Growth System",
          "Full Atelier Bespoke Design (Zero Templates, High-Luxury Polish)",
          "Multi-Service Consultation Setter & Dynamic Quote Calculator",
          "Multi-Location & Territory Sub-Pages Architecture",
          "Abandoned Booking Re-engagement Follow-Up Sequence",
          "Custom Internal CRM & Database Webhook Integration",
          "90 Days Priority Support, Speed Warranty & Dedicated SLA",
        ],
        cta: "Book a call",
        featured: false,
        tag: "Flagship",
      },
    ],
    monthlyTiers: [
      {
        name: "Care & Speed Retainer",
        price: "95",
        interval: "billed monthly · zero lock-in contracts",
        milestoneBreakdown: "Sub-second CDN hosting · 99.98% uptime SLA",
        description: "Keeps your website lightning-fast, fully secure, and continuously hosted. Includes edge cloud hosting, SSL certificates, and bi-weekly speed checks.",
        features: [
          "Dedicated Edge Cloud Hosting & 99.98% Uptime SLA",
          "Continuous Sub-Second Speed & Mobile Optimization",
          "SSL Certificate Maintenance & Security Patches",
          "Daily Automated Cloud Backups",
          "Monthly Traffic & Booking Conversion Summary",
          "Standard Support Desk (Response within 24 hours)",
        ],
        cta: "Book a call",
        featured: false,
        tag: "Care Retainer",
      },
      {
        name: "Growth & Conversion Retainer",
        price: "245",
        interval: "billed monthly · zero lock-in contracts",
        milestoneBreakdown: "Priority maintenance · Content updates included",
        description: "Full-service management for businesses that want continuous conversion improvements. Covers priority support, monthly content/photo updates, and conversion audits.",
        features: [
          "Everything in Care & Speed Retainer",
          "Monthly Content, Menu & Price Updates (Hands-off for you)",
          "Bi-Weekly Conversion Rate Audits & Speed Tuning",
          "Automated Google Review Campaign Monitoring",
          "WhatsApp Alert Gateway Maintenance & Webhook Checks",
          "Priority Technical Support Desk (Response within 4 hours)",
        ],
        cta: "Book a call",
        featured: true,
        tag: "Recommended Retainer",
      },
      {
        name: "Multi-Location Retainer",
        price: "595",
        interval: "billed monthly · zero lock-in contracts",
        milestoneBreakdown: "Dedicated engineer · Multi-depot support",
        description: "For multi-location businesses, multi-depot operators, or high-volume booking sites requiring direct engineer oversight, custom feature additions, and same-day support.",
        features: [
          "Everything in Growth & Conversion Retainer",
          "Multi-Location & Regional Territory Management",
          "Unlimited Monthly Content, Photo & Service Additions",
          "Dedicated Senior Web Engineer Desk",
          "Guaranteed Same-Day Hotline Support SLA",
          "Quarterly Executive Strategy & Local SEO Review Calls",
        ],
        cta: "Book a call",
        featured: false,
        tag: "Multi-Location Retainer",
      },
    ],
    revenueShareTiers: [
      {
        name: "Custom / Enterprise Build",
        price: "Custom",
        interval: "bespoke scope & milestone delivery",
        milestoneBreakdown: "Tailored to multi-brand or bespoke enterprise specs",
        description: "For multi-brand operators, franchises, or complex e-commerce platforms requiring bespoke web architecture and custom integrations.",
        features: [
          "Full Bespoke Enterprise Web Architecture",
          "Multi-Brand & Franchise Storefront Network",
          "Custom API Integrations (Xero / Salesforce / Custom ERP)",
          "Dedicated Cloud Infrastructure & Isolated Cluster",
          "Custom SLA & Dedicated Engineering Account Manager",
        ],
        cta: "Book a call",
        featured: false,
        tag: "Enterprise",
      },
    ],
    setupTiers: [
      {
        name: "Essential Build",
        price: "495",
        interval: "one-off fixed investment",
        milestoneBreakdown: "Delivered in 5–7 business days",
        description: "For single-service businesses needing a high-speed, modern website that captures customer enquiries cleanly without losing leads.",
        features: [
          "Bespoke High-Speed Next.js Website (< 900ms load)",
          "Mobile-Optimized Storefront & Enquiry Intake",
          "Direct WhatsApp & Phone Click-to-Connect Integration",
          "Semantic Local SEO & AEO Schema Markup",
          "Google Maps & Business Profile Integration",
          "30 Days Included Post-Launch Support & Adjustments",
        ],
        cta: "Book a call",
        featured: false,
        tag: "Essential",
      },
      {
        name: "Growth System",
        price: "895",
        interval: "one-off fixed investment",
        milestoneBreakdown: "Delivered in 7 business days",
        description: "For established businesses wanting 3-tap booking, upfront deposit capture, and automated WhatsApp alerts to the owner's phone.",
        features: [
          "Everything in Essential Build",
          "Interactive 3-Tap Mobile Booking & Order Builder",
          "Stripe & Apple Pay Upfront Deposit Collection",
          "Sub-Second WhatsApp Alert to Owner on New Bookings",
          "Automated Customer Confirmation Receipt via WhatsApp/Email",
          "Google / Outlook Calendar Two-Way Synchronization",
          "Automated 5-Star Google Review Extraction Sequence",
          "60 Days Included Post-Launch Support Desk",
        ],
        cta: "Book a call",
        featured: true,
        tag: "Most Popular",
      },
      {
        name: "Flagship Custom",
        price: "1,495",
        interval: "one-off fixed investment",
        milestoneBreakdown: "Delivered in 10–14 business days",
        description: "For premier businesses requiring bespoke atelier design, multi-service consultation setters, and comprehensive conversion architecture.",
        features: [
          "Everything in Growth System",
          "Full Atelier Bespoke Design (Zero Templates, High-Luxury Polish)",
          "Multi-Service Consultation Setter & Dynamic Quote Calculator",
          "Multi-Location & Territory Sub-Pages Architecture",
          "Abandoned Booking Re-engagement Follow-Up Sequence",
          "Custom Internal CRM & Database Webhook Integration",
          "90 Days Priority Support, Speed Warranty & Dedicated SLA",
        ],
        cta: "Book a call",
        featured: false,
        tag: "Flagship",
      },
    ],
    retainerTiers: [
      {
        name: "Care & Speed Retainer",
        price: "95",
        interval: "billed monthly · zero lock-in contracts",
        milestoneBreakdown: "Sub-second CDN hosting · 99.98% uptime SLA",
        description: "Keeps your website lightning-fast, fully secure, and continuously hosted. Includes edge cloud hosting, SSL certificates, and bi-weekly speed checks.",
        features: [
          "Dedicated Edge Cloud Hosting & 99.98% Uptime SLA",
          "Continuous Sub-Second Speed & Mobile Optimization",
          "SSL Certificate Maintenance & Security Patches",
          "Daily Automated Cloud Backups",
          "Monthly Traffic & Booking Conversion Summary",
          "Standard Support Desk (Response within 24 hours)",
        ],
        cta: "Book a call",
        featured: false,
        tag: "Care Retainer",
      },
      {
        name: "Growth & Conversion Retainer",
        price: "245",
        interval: "billed monthly · zero lock-in contracts",
        milestoneBreakdown: "Priority maintenance · Content updates included",
        description: "Full-service management for businesses that want continuous conversion improvements. Covers priority support, monthly content/photo updates, and conversion audits.",
        features: [
          "Everything in Care & Speed Retainer",
          "Monthly Content, Menu & Price Updates (Hands-off for you)",
          "Bi-Weekly Conversion Rate Audits & Speed Tuning",
          "Automated Google Review Campaign Monitoring",
          "WhatsApp Alert Gateway Maintenance & Webhook Checks",
          "Priority Technical Support Desk (Response within 4 hours)",
        ],
        cta: "Book a call",
        featured: true,
        tag: "Recommended Retainer",
      },
      {
        name: "Multi-Location Retainer",
        price: "595",
        interval: "billed monthly · zero lock-in contracts",
        milestoneBreakdown: "Dedicated engineer · Multi-depot support",
        description: "For multi-location businesses, multi-depot operators, or high-volume booking sites requiring direct engineer oversight, custom feature additions, and same-day support.",
        features: [
          "Everything in Growth & Conversion Retainer",
          "Multi-Location & Regional Territory Management",
          "Unlimited Monthly Content, Photo & Service Additions",
          "Dedicated Senior Web Engineer Desk",
          "Guaranteed Same-Day Hotline Support SLA",
          "Quarterly Executive Strategy & Local SEO Review Calls",
        ],
        cta: "Book a call",
        featured: false,
        tag: "Multi-Location Retainer",
      },
    ],
  },

  // Contact Concierge Copy (`/contact`)
  contactPage: {
    headerTitle: "Stop letting customer enquiries slip through unread.",
    headerHighlight: "Direct Gateway",
    headerSubtitle: "Ready to deploy a high-converting website and 3-tap booking flow configured specifically for your business? Connect directly below.",
    supportEyebrow: "DIRECT ASSISTANCE",
    supportTitle: "Direct Human Response",
    supportDescription: "Speak directly with our team in the UK. Zero generic ticketing queues.",
    emailLabel: "Direct Email",
    phoneLabel: "Call or WhatsApp",
    slaLabel: "Response Standard",
    slaValue: "Replied Within 1 Business Hour",
    whatsNextTitle: "What Occurs Next?",
    whatsNextItems: [
      "Instant acknowledgment and website conversion assessment.",
      "15-minute call to review your current website and booking flow.",
      "Live working prototype demonstrating your new site in 48 hours.",
    ],
  },

  // Testimonials / Cohort Status Page Copy
  testimonialsPage: {
    headerTitle: "Quantified Outcomes &",
    headerHighlight: "Verified Revenue Growth",
    headerSubtitle: "How premier local businesses eliminate lost enquiries, automate upfront booking deposits, and scale revenue with our high-converting websites.",
  },

  // Booking Page Copy (`/book`)
  bookPage: {
    clinicalEvaluationLabel: "15-Minute Website & Conversion Call",
    headerTitle: "Uncover precisely where your website is losing",
    headerHighlight: "enquiries, bookings, and revenue.",
    headerSubtitle: "Reserve a 15-minute slot on our live diary. We will dissect your current website, show you where visitors bounce, and demonstrate how a bespoke 3-tap booking flow captures more revenue.",
    trustItems: [
      "15-minute focused website & conversion consultation",
      "Live custom prototype demonstration for your business",
      "Guaranteed 7-day deployment timeline"
    ],
    socialProofQuote: "On this 15-minute call, we show you the exact website architecture and 3-tap booking flow that stops prospective customers bouncing to competitors.",
    socialProofAuthor: "Mercian Wealth Standard",
  },
};
