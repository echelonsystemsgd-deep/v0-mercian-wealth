/**
 * lib/site-copy.ts
 *
 * Centralised Copy Registry for mercianwealth.com
 *
 * Local Business Digital Infrastructure — Mobile Storefronts, 3-Tap Booking & Deposit Systems
 * Engineered for Premier Local Businesses, Trade Operators, Clinics & Commercial Services across the UK.
 */

export const SITE_COPY = {
  // Global Meta Info
  metadata: {
    layout: {
      defaultTitle: "Mercian Wealth · High-Converting Websites & Booking Systems",
      titleTemplate: "%s · Mercian Wealth",
      description: "Sub-second mobile storefronts, 3-tap booking builders, and upfront deposit collection systems that convert UK local customers before they bounce.",
    },
    home: {
      title: "Mercian Wealth · High-Converting Websites & Booking Systems",
      description: "Sub-second mobile storefronts, 3-tap booking builders, and upfront deposit collection systems that convert UK local customers before they bounce.",
    },
    services: {
      title: "Storefronts & Booking Engines",
      description: "Custom mobile storefronts, interactive order builders, instant WhatsApp lead capture, upfront Stripe deposit collection, and automated Google review workflows.",
    },
    process: {
      title: "Streamlined Deployment Protocol",
      description: "From custom mobile prototype to fully functioning online order or booking builder. Timing is confirmed after scoping. Zero operational disruption to your business.",
    },
    portfolio: {
      title: "Client Prototypes & Work",
      description: "Explore live interactive sandboxes and practice architectures built for UK accounting practices, tax consultancies, and commercial advisory firms.",
    },
    pricing: {
      title: "Packages & Growth Retainers",
      description: "Practice Core (£595), Practice Growth OS (£1,495), Institutional Practice Engine (£4,995). Transparent pricing with optional managed retainers.",
    },
    testimonials: {
      title: "Client Outcomes & Prototypes",
      description: "Operational outcomes for UK local businesses: responsive mobile storefronts, upfront deposits, and zero unreturned customer enquiries.",
    },
    contact: {
      title: "Contact & Engineering Gateway",
      description: "Connect directly with our UK engineering team, request a custom working prototype for your business, or enquire via WhatsApp.",
    },
    book: {
      title: "Book a 15-Minute Discovery Call",
      description: "Schedule a 15-minute call to identify your enquiry bottlenecks and test a custom mobile storefront prototype built for your business.",
    },
    practices: {
      title: "More Clients, Less Chasing for UK Accounting Practices",
      description: "Help more of your enquiries become clients, spend less time chasing records and avoid missed deadlines. Your team stays in control of everything that goes out.",
    },
  },

  // Navbar Component
  navbar: {
    logo: "Mercian Wealth Automation",
    tagline: "Practice Infrastructure · 60-Second Client Triage · Speed-to-Lead Routing",
    links: [
      { label: "Solutions", href: "/services" },
      { label: "Protocol", href: "/process" },
      { label: "Case Studies", href: "/portfolio" },
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
        "Sub-second mobile practice hubs eliminate visitor bounce and capture corporate retainers.",
        "60-second inbound client triage qualifies turnover, business structure, and software.",
        "Instant WhatsApp partner lead dispatch alerts your practice team in under 5 seconds.",
        "Three core outcomes: high-fee clients secured, faster partner response, and zero chasing records.",
      ]
    },

    // 1. Hero Section (Outcomes-First)
    hero: {
      eyebrow: "UK ACCOUNTANCY PRACTICE INFRASTRUCTURE",
      headline: "Your website is the only thing between a £3,000 corporate retainer and the back button.",
      subheadline: "Decision-makers do not browse ten tabs for 15 minutes. High-intent business owners arrive pre-vetted on mobile, needing reliable advisory. If your practice website is slow, reads like a static leaflet, or forces them to type paragraphs into a clunky form, they leave for a competing firm. We engineer sub-second practice hubs, 60-second inbound client triage, and instant partner speed-to-lead routing that capture corporate clients before attention wanders.",
      primaryCtaText: "Book a 15-Min Discovery Call",
      primaryCtaHref: "/book",
      secondaryCtaText: "See a free prototype for your practice",
      secondaryCtaHref: "#prototype-modal",
      whatsappCtaText: "Message on WhatsApp",
      whatsappHref: "https://wa.me/447851055929",
      proofBadge: "Sub-Second Practice Hubs · 60-Second Triage · Two-Way Diary Sync · Partner Speed-to-Lead",
      trustItems: [
        "Sub-Second Mobile Practice Hubs",
        "60-Second Inbound Client Triage",
        "Instant WhatsApp Partner Alerts",
        "Direct Calendar Booking Sync",
      ],
      unsureText: "Message directly on WhatsApp or test our live practice prototypes below →",
    },

    // 2. What Changed (SYSTEM I)
    whatChanged: {
      eyebrow: "THE PROFESSIONAL SERVICES SHIFT",
      headline: "Business owners expect sub-second clarity. Your website is your firm's conversion gateway.",
      subheadline: "When was the last time a company director read an eight-page brochure? AI and search deliver pre-vetted recommendations in seconds. When clients click through, they want to know if you handle their sector, what your onboarding looks like, and how quickly they can speak to a partner. If your site is sluggish or buried in open text boxes, that £3,000 retainer is gone.",
      shifts: [
        {
          outcome: "Trust Secured",
          tag: "ATTENTION COMPRESSION",
          title: "Directors Arrive Ready to Engage, Not Read Leaflets",
          description: "Business owners no longer spend 20 minutes reading static PDF brochures. They arrive with pressing deadlines (year-end, corporation tax, MTD), ready to speak with a responsive advisor.",
        },
        {
          outcome: "Retainers Won",
          tag: "60-SECOND CLIENT TRIAGE",
          title: "The Gateway Between Engagement and the Back Button",
          description: "You have under 30 seconds to establish authority. Clunky open-ended contact forms create massive mobile friction. Structured sector triage cards let prospective clients specify company type, turnover, and accounting software in seconds.",
        },
        {
          outcome: "Commitment Locked",
          tag: "TWO-WAY DIARY SYNC",
          title: "High-Value Clients Expect Direct Diary Booking",
          description: "Waiting days for an email reply to arrange a discovery call loses the client to whoever responds first. Live two-way diary sync lets directors reserve partner consultations on the spot.",
        },
        {
          outcome: "Speed-to-Lead",
          tag: "INSTANT PARTNER DISPATCH",
          title: "Instant Mobile Alerts Win High-Fee Accounts",
          description: "High-value corporate enquiries frequently arrive during evenings and weekends. Instant WhatsApp dispatches deliver full intake metrics straight to the partner's phone to close the engagement before competitors open on Monday.",
        },
      ],
    },

    // Divergence Comparison (The Two-Path Mechanic)
    divergenceComparison: {
      eyebrow: "OPERATIONAL LEVERAGE",
      headline: "Delayed response is an unforced error. Convert in seconds, or lose the retainer to someone who will.",
      subheadline: "In professional accounting services, speed-to-lead and frictionless intake determine which practice wins the mandate. You can continue relying on static brochure sites and slow email ping-pong—or deploy modern practice infrastructure that qualifies and books automatically.",
      pathConventional: {
        badge: "MANUAL DRAG · 5-FIGURE REVENUE LEAK",
        title: "The Traditional Practice Setup",
        subtitle: "Losing high-fee corporate clients while in partner meetings or after hours.",
        points: [
          "Clunky mobile websites taking 4+ seconds to load.",
          "Buried contact forms forcing prospective clients to type their entire tax history.",
          "Chasing onboarding documents, records, and diary slots manually via email.",
          "Unanswered inbound enquiries bouncing to competing firms in under 60 seconds.",
        ]
      },
      pathMercian: {
        badge: "PRACTICE INFRASTRUCTURE · HIGH-FEE ACQUISITION",
        title: "The Mercian Practice Infrastructure",
        subtitle: "Sub-second practice hubs, 60-second triage, and two-way diary sync.",
        points: [
          "Sub-second mobile practice hub loaded in under 400ms.",
          "60-second structured client triage eliminating contact form fatigue.",
          "Two-way calendar synchronization reserving discovery calls on the spot.",
          "Instant smartphone WhatsApp dispatch delivering full turnover and sector specs.",
        ],
      }
    },

    // 3. Bottleneck Analysis (SYSTEM II)
    bottleneck: {
      eyebrow: "WHERE PRACTICE REVENUE LEAKS",
      headline: "Four Places Your Practice Leaks High-Fee Retainers Every Month.",
      subheadline: "Most practice owners think they have a referral problem. In reality, directors arrive pre-vetted on mobile, but bounce because static leaflet pages and slow response stand between them and booking.",
      goldSlogan: "Whilst competing firms let enquiries sit in shared inboxes, your practice infrastructure triages requirements instantly and reserves partner discovery calls.",
      systemMode: "Mode: ",
      modeAutomated: "Practice Infrastructure Active",
      modeManual: "Manual Practice Drag",
      triggerBtnActive: "Deactivate Automation",
      triggerBtnInactive: "Activate Automation",
      diagnosticLink: "Book a call →",
      cards: [
        {
          id: "time-leak",
          outcome: "Time Wasted",
          tag: "MISSED INBOUND CALLS",
          metric: "3–8 calls/wk",
          title: "Unanswered Calls During Partner Engagements",
          description: "Calls missed during client reviews, HMRC escalations, or after hours. Directors rarely leave voicemails—they immediately call another firm.",
        },
        {
          id: "cost-leak",
          outcome: "Cost Incurred",
          tag: "SPEED-TO-LEAD LEAK",
          metric: "£3k–£9k/mo",
          title: "Delayed Response to Web Enquiries",
          description: "Inbound corporate enquiries sitting unaddressed in generic info@ inboxes go cold. If your firm takes over 15 minutes to respond, conversion drops sharply.",
        },
        {
          id: "risk-leak",
          outcome: "Risk Incurred",
          tag: "ADMIN REPETITION",
          metric: "8–14 hrs/wk",
          title: "Manual Diary Coordination & Record Chasing",
          description: "Coordinating meeting slots, emailing back and forth, copying names into practice management software, and chasing records manually.",
        },
        {
          id: "revenue-leak",
          outcome: "Revenue Lost",
          tag: "QUIET PROPOSALS",
          metric: "Compounding",
          title: "Zero Automated Follow-Up on Fee Proposals",
          description: "Prospective clients who requested fee quotes or onboarding estimates and went quiet, with no automated follow-up to re-engage them.",
        },
      ],
    },

    // 4. Offer Mechanism (SYSTEM III)
    offerMechanism: {
      eyebrow: "3-STEP SEQUENCING",
      headline: "Before we deploy your actual system, we build a working prototype of it.",
      subheadline: "You will never be asked to commit based on promises, slide decks, or vague proposals. You test your actual storefront prototype running on your phone before any agreement.",
      steps: [
        {
          stepNumber: "01",
          title: "We build a working storefront prototype specific to your business.",
          description: "Not a deck, not a proposal. Real mobile order flow, 3-tap booking, and deposit checkout tailored to your exact services and pricing.",
          metric: "Real Business Logic",
        },
        {
          stepNumber: "02",
          title: "You test it directly on your own smartphone.",
          description: "Walk through the customer booking flow, test the order builder, and receive the instant WhatsApp lead alert on your phone.",
          metric: "Tangible Verification",
        },
        {
          stepNumber: "03",
          title: "We deploy it live — only once the ROI is undeniable to you.",
          description: "Zero pressure, zero upfront commitment. We only deploy if the numbers make clear commercial sense.",
          metric: "Zero Commitment",
        },
      ],
      ctaText: "See a free prototype for your business",
    },

    // 5. Proof Case Studies (SYSTEM V)
    caseStudies: {
      eyebrow: "PRACTICE DEPLOYMENT OUTCOMES",
      headline: "Proven Outcomes. Zero Fabricated Metrics.",
      subheadline: "Real practice outcomes from verified production systems alongside working interactive prototypes.",
      studies: [
        {
          id: "wealthwise-advisory",
          title: "Production Architecture: WealthWise Advisory & Private Wealth",
          badge: "PRODUCTION ARCHITECTURE · MULTI-PARTNER PRACTICE",
          outcomes: [
            { label: "Client Triage", value: "60-Second Flow" },
            { label: "Partner Routing", value: "Speed-to-Lead" },
          ],
          problem: "High-net-worth tax enquiries and corporate retainers leaking through generic PDF forms and unreturned voicemails.",
          solution: "Bespoke institutional practice architecture with multi-partner enquiry triage, client portal routing, and instant partner WhatsApp notifications.",
          image: "/second-shine-preview-real.png",
          liveUrl: "/portfolio",
          isPrototype: false,
        },
        {
          id: "raw-accounting",
          title: "Production Build: Raw Accounting & Advisory",
          badge: "PRACTICE GROWTH OS · LIVE PRODUCTION",
          outcomes: [
            { label: "Inbound Intake", value: "Interactive Triage" },
            { label: "Diary Sync", value: "Two-Way Calendly" },
          ],
          problem: "Managing partner spending evening hours chasing bookkeeping documents and manual consultation scheduling.",
          solution: "Sub-second practice hub with automated fee estimation, 60-second client triage, and direct two-way Calendly diary synchronization.",
          image: "/vanguard-construction-preview-real.jpg",
          liveUrl: "/portfolio",
          isPrototype: false,
        },
      ],
    },

    // 6. Founder & Positioning Statement (SYSTEM VI)
    whyMercianWealth: {
      eyebrow: "PRACTICE COMMITMENT",
      headline: "Engineered For Accountancy Practices That Refuse to Lose High-Fee Clients.",
      description: "Your practice should convert mobile visitors, qualify company turnover, and alert partners in seconds without requiring you to spend evenings chasing records.",
      founderQuoteHeadline: "Commercial Outcomes. Zero Agency Fluff.",
      founderQuoteText: "We do not talk about design trends or fluffy metrics. We focus strictly on measurable practice outcomes: high-fee clients captured, speed-to-lead partner triage, automated calendar booking, and zero manual chasing. If an infrastructure update does not save partner hours or bring in corporate retainers, it does not get built.",
      founderQuoteAuthor: "Lead Practice Infrastructure Engineer, Mercian Wealth",
      proofStats: [
        { label: "Mobile Speed", value: "Sub-Second" },
        { label: "Partner Dispatch", value: "< 5s" },
        { label: "Prototype-First", value: "Zero Risk" },
      ],
      differentiators: [
        "High-Speed Practice Conversion — Sub-second mobile hubs engineered for business owners on smartphones.",
        "Working Prototype First — You test a live, functioning version of your practice triage flow on your phone before committing.",
        "Three Commercial Outcomes — Every build is engineered strictly to capture higher-value retainers, accelerate speed-to-lead, or eliminate manual admin.",
      ],
      structuralRealityHeadline: "The Strategic Divide",
      standardAgency: {
        title: "Traditional Accountancy Website Setup",
        items: [
          "Slow, bloated websites that read like static leaflets and leak mobile traffic.",
          "Generic contact forms asking prospective clients to type their full accounting history.",
          "Chasing onboarding documents, records, and diary slots manually via email.",
          "Zero speed-to-lead advantage, leaving prospective clients to call competing firms.",
        ],
      },
      mercianWealth: {
        title: "Mercian Wealth Practice Infrastructure",
        items: [
          "Sub-second mobile practice hub loaded smoothly on 4G/5G in under 400ms.",
          "60-second client acquisition triage qualifying turnover, sector, and accounting software.",
          "Two-way calendar booking (Calendly / Outlook / Google) with zero diary drag.",
          "Instant partner WhatsApp alerts delivering complete intake specs directly to your phone.",
          "Structured MTD, ICAEW & ACCA compliance alignment standard across all pages.",
        ],
      },
    },

    // Trend Adaptation (Why Mercian Wealth)
    trendAdaptation: {
      eyebrow: "CONTINUOUS CONVERSION TUNING",
      headline: "Order Flows & Funnels Refined Continuously.",
      description: "As customer demand evolves and new services launch, our team audits conversion metrics and refines your intake flows so you never lose booking momentum.",
    },

    // Model Hint (Why Mercian Wealth)
    modelHint: {
      eyebrow: "EDGE INFRASTRUCTURE",
      headline: "Sub-Second Global Edge Hosting & Stripe Integration.",
      description: "Fast Next.js edge caching, bank-grade Stripe payment protocols, instant WhatsApp Webhook routing, and resilient cloud availability standard.",
    },

    // 7. Testimonials / Cohort Data
    testimonials: {
      eyebrow: "PROVEN PRACTICE RESULTS",
      headline: "How UK Accountancy Firms Eliminated Missed Leads and Scaled Retainers.",
      subheadline: "Real outcomes from independent accounting practices, tax consultancies, and commercial advisory firms that deployed our practice infrastructure.",
      guarantee: "Strict Performance Standards · Sub-Second Response Standards · Transparent Retainers",
      cohortCard: {
        badge: "PRACTICE INFRASTRUCTURE",
        title: "Client Acquisition Hubs Engineered For UK Accountancy Firms",
        paragraph1: "We deploy sub-second mobile storefronts, 60-second inbound client triage, and hands-off workflow automations for UK accountancy firms and professional practices who refuse to lose corporate clients to slow response.",
        paragraph2: "Direct diary synchronization, instant partner WhatsApp/email alerts, and structured MTD compliance positioning included as standard.",
        paragraph3: "Fixed Setup (£595–£4,995) + Managed Cloud Infrastructure (£29–£99/mo). Zero lock-in, 100% practice asset ownership.",
        enquiryCtaText: "To review your practice's enquiry conversion and test a working prototype tailored to your firm, book your 15-minute call below or message us directly on WhatsApp.",
      },
      trustPoints: [
        "Sub-Second Mobile Speed",
        "Upfront Stripe Deposits",
        "Instant Smartphone WhatsApp Alerts",
      ],
      items: [
        {
          quote: "Our partners used to lose track of inbound corporate enquiries arriving outside office hours. The practice triage flow and instant WhatsApp lead routing allowed us to engage decision-ready clients in under 5 minutes and secure £18k in new retainer fees within the first quarter.",
          author: "Senior Practice Partner",
          role: "Chartered Accountancy Practice",
          location: "Thames Valley & London",
          metric: "Verified Practice Deployment",
        },
      ],
    },

    // Commodity Trap
    commodityTrap: {
      eyebrow: "THE HARSH REALITY",
      headline: "Static brochure pages and friction-heavy contact forms leak retainers. Instant triage closes clients.",
      subheadline: "In professional accounting services, speed-to-lead is everything. The firm that responds first and confirms the discovery call consistently wins the client mandate.",
    },

    // 7. Pricing Tiers
    pricing: {
      eyebrow: "STOREFRONT SYSTEMS & MANAGED RETAINERS",
      headline: "Predictable Investment. Measurable Commercial Return.",
      subheadline: "Choose between our turnkey storefront implementation packages and flat monthly management retainers. Every build includes custom configuration, live prototype testing, Stripe integration, and instant WhatsApp alerts.",
      setupFeeDisclaimer: "Implementation setup covers bespoke mobile storefront design, 3-tap order builder, Stripe payment configuration, WhatsApp webhook dispatch, and automated Google review triggers.",
      monthlyDisclaimer: "Management retainers cover continuous conversion audits, funnel tuning, hosting monitoring, feature updates, and priority support with zero lock-in contracts.",
      revenueShareDisclaimer: "Custom multi-location and enterprise specifications available on request.",
    },

    // 8. Lead Capture / Postcode Lock
    leadCapture: {
      eyebrow: "TERRITORIAL AVAILABILITY AUDIT",
      headline: "Verify if your sector and territory are still available.",
      subheadline: "Enter your postcode and industry below to run a real-time availability check and schedule your 15-minute consultation with our team.",
      postcodePlaceholder: "e.g. SL4 1PD or B91 3QJ",
      businessNamePlaceholder: "Your Business Name",
      phonePlaceholder: "Your WhatsApp / Mobile Number",
      submitButtonText: "Check Availability & Request Prototype",
      guaranteeText: "100% Free · Zero Obligation · Live Interactive Prototype Included",
      
      consultationBooking: {
        headline: "Book Your 15-Minute Discovery Call",
        subheadline: "Pick a time on our live diary. We will analyse your current response times, demonstrate a live prototype tailored to your services, and show you exactly where bookings are leaking.",
        calendarPlaceholder: "Select a date and time slot from our live diary below.",
        enquiryCtaText: "To review your operations and test a working prototype configured for your business, book your 15-minute call below or message us directly on WhatsApp.",
      },

      trustPoints: [
        "Sub-Second Mobile Storefront",
        "Upfront Stripe Deposits",
        "Instant Smartphone WhatsApp Alerts",
      ],
    },

    // 9. FOMO Close & CTA Section
    cta: {
      headline: "Stop guessing what faster, automated, and more profitable would look like. See it.",
      subheadline: "Request a custom working prototype for your business. You see the storefront running on your own phone before making any commitment.",
      buttonText: "See Your Free Prototype",
      secondaryButtonText: "Book a call",
      whatsappButtonText: "Chat on WhatsApp",
    },

    // 10. FAQ Section
    faq: {
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      headline: "Direct Answers. Zero Jargon.",
      description: "Everything you need to know about our mobile storefronts, 3-tap booking builders, deposit flows, and how the prototype works.",
      faqs: [
        {
          question: "What exactly does Mercian Wealth build for local businesses?",
          answer: "We build sub-second mobile storefronts, 3-tap customer order/booking builders, instant WhatsApp lead notifications, upfront deposit checkout systems, and automated Google review requests.",
        },
        {
          question: "How does the free prototype work before we commit?",
          answer: "Within 48 hours of our discovery call, we build a working interactive prototype tailored to your brand, services, and pricing. You test it directly on your phone before spending a single penny.",
        },
        {
          question: "Do I need to replace my existing domain or business phone?",
          answer: "No. You keep your current domain name, email hosting, and phone numbers. We simply point your domain to the new high-speed storefront.",
        },
        {
          question: "How quickly can our new storefront go live?",
          answer: "Standard deployments take 7 business days from prototype sign-off to full public launch.",
        },
        {
          question: "Can our practice opt for a one-time build without monthly hosting or maintenance?",
          answer: "Yes, 100%. You own the asset completely. If you choose not to use our managed hosting, we will give you our step-by-step handover instructions to transfer the codebase and DNS to your own cloud setup. However, self-hosting requires your team to provision servers, configure SSL certificates, manage database backups, and troubleshoot uptime incidents independently—which involves significant technical hassle. For that reason, over 95% of firms prefer our automated £29/mo or £49/mo managed cloud infrastructure with zero lock-in contracts.",
        },
        {
          question: "What ongoing maintenance is included in the £29/mo or £49/mo retainer?",
          answer: "Managed UK edge cloud hosting, automated SSL certificates, daily backups, uptime monitoring, and ongoing schema alignment via simple automated direct debit. Zero lock-in contracts, cancel anytime with 30 days notice.",
        },
      ],
    },
  },

  // Services Page Copy (`/services`)
  servicesPage: {
    headerTitle: "Missed phone calls, slow response times, and manual admin are costing you revenue.",
    headerHighlight: "Here is what we build.",
    headerSubtitle: "We engineer sub-second mobile storefronts, 3-tap order builders, WhatsApp lead capture, and upfront deposit checkout systems for UK local businesses.",
    objectionCallout: "Traditional websites leak customers who browse on mobile, hit a long clunky contact form, and leave without committing. We build 3-tap mobile ordering and booking flows that collect upfront deposits and send instant WhatsApp alerts straight to your smartphone.",
    
    list: [
      {
        title: "Sub-Second Mobile Storefronts",
        description: "The vast majority of local enquiries arrive from mobile devices. If your site takes more than 2 seconds to load, buyers bounce. We engineer custom digital storefronts loading in under 400ms.",
        outcome: "< 400ms Edge Mobile Speed",
        tagline: "Ultra-Fast Mobile Storefronts That Capture High-Ticket Enquiries.",
        overview: "A custom Next.js web platform engineered specifically for smartphones. Minimalist design, high-contrast typography, and instant page transitions that prevent visitor bounce.",
        features: [
          { name: "Sub-Second Load Speed", description: "Loads instantaneously on 4G and 5G networks to maximize visitor retention." },
          { name: "Mobile-First Design", description: "Thumb-friendly layout engineered for tap interactions rather than pinch-and-zoom." },
          { name: "Search & Local SEO", description: "Structured JSON-LD schema markup ensuring visibility on Google Maps and search." },
          { name: "Zero Downtime Cutover", description: "Seamless launch preserving your existing domain name, email accounts, and SEO history." },
        ],
        ctaText: "Book a call",
        ctaHref: "/book",
      },
      {
        title: "3-Tap Order & Booking Builders",
        description: "Traditional contact forms with excessive text inputs create friction on smartphones. Our visual step-by-step builders let clients configure orders and book appointments in under 45 seconds.",
        outcome: "Frictionless Mobile Conversion",
        tagline: "Frictionless Interactive Booking for Trades & Local Services.",
        overview: "An interactive scoping and booking flow tailored to your specific service catalogue. Clients select package options, pick calendar availability, and confirm in 3 taps.",
        features: [
          { name: "Visual Service Configurator", description: "Allows customers to pick services, dimensions, or time slots with clear visual options." },
          { name: "Live Diary Availability", description: "Direct synchronization with Google Calendar or Outlook to prevent double bookings." },
          { name: "Dynamic Price Estimation", description: "Shows transparent pricing estimates based on selected requirements to pre-qualify leads." },
          { name: "Zero Form Fatigue", description: "Eliminates lengthy open text boxes in favour of fast, intuitive tap controls." },
        ],
        ctaText: "Book a call",
        ctaHref: "/book",
      },
      {
        title: "Instant WhatsApp Lead Dispatch",
        description: "Enquiries that sit unread in email inboxes go cold in minutes. We route qualified customer specifications straight to your phone via WhatsApp in under 5 seconds.",
        outcome: "< 5s Direct-to-Phone Lead Alert",
        tagline: "Lock In Jobs Before Competitors Even Check Their Inboxes.",
        overview: "Automated webhook infrastructure connecting your storefront directly to your WhatsApp. Receive instant customer name, phone number, project scope, and payment status.",
        features: [
          { name: "Instant WhatsApp Notifications", description: "Full customer intake specifications pushed to your personal smartphone instantly." },
          { name: "One-Tap Callback / Chat", description: "Click straight into a WhatsApp conversation or call with the client with zero delay." },
          { name: "CRM & Spreadsheet Sync", description: "Simultaneously logs all lead details into Google Sheets, Notion, or your CRM." },
          { name: "Multi-Staff Routing", description: "Can route notifications to different team members or field technicians automatically." },
        ],
        ctaText: "Book a call",
        ctaHref: "/book",
      },
      {
        title: "Upfront Stripe Deposit Checkout",
        description: "No-shows and unpaid invoices waste dozens of operational hours every month. We integrate secure card and Apple Pay deposit collection directly into the booking flow.",
        outcome: "Zero Unpaid Holds & No-Shows",
        tagline: "Collect Deposits Upfront and Secure Booking Commitment.",
        overview: "Bank-grade Stripe checkout integrated directly into your 3-tap booking flow. Collect fixed deposits or full payments with 1-click Apple Pay and Google Pay.",
        features: [
          { name: "1-Click Apple & Google Pay", description: "Frictionless checkout allowing customers to pay in seconds without typing card numbers." },
          { name: "Automated Digital Receipts", description: "Instant branded payment confirmations sent to both you and the customer." },
          { name: "Direct Bank Payouts", description: "100% of customer funds settle directly into your business bank account via Stripe." },
          { name: "Refund & Cancellation Logic", description: "Custom rules for deposit holding, cancellations, and booking rescheduling." },
        ],
        ctaText: "Book a call",
        ctaHref: "/book",
      },
      {
        title: "Automated Google Review Extraction",
        description: "5-star Google reviews drive local ranking dominance and customer trust. We trigger automated post-service review requests via WhatsApp and SMS upon job completion.",
        outcome: "Automated 5-Star Review Growth",
        tagline: "Build Search Dominance and Social Proof on Autopilot.",
        overview: "Hands-off review extraction sequences that reach satisfied customers at the exact moment of peak happiness. Direct deep links open Google review modals in one tap.",
        features: [
          { name: "1-Tap Direct Review Link", description: "Direct deep-link to your Google Business Profile review screen to minimize friction." },
          { name: "Timed Delivery Triggers", description: "Sends requests automatically 2 hours or 24 hours post-service completion." },
          { name: "Private Feedback Filter", description: "Routes less-than-happy feedback to a private direct message before public posting." },
          { name: "Local SEO Dominance", description: "Consistent fresh 5-star reviews elevate your Google Maps pack ranking." },
        ],
        ctaText: "Book a call",
        ctaHref: "/book",
      },
      {
        title: "Continuous Conversion Tuning & Retainers",
        description: "Launching is only step one. Our ongoing managed retainers ensure your storefront, order builders, and integrations continuously adapt, improve, and drive higher revenue.",
        outcome: "Continuous Revenue & Intake Tuning",
        tagline: "Dedicated Technical Support and Ongoing Conversion Engineering.",
        overview: "Flat monthly retainers providing proactive speed audits, intake flow adjustments, copy updates, hosting monitoring, and priority technical support.",
        features: [
          { name: "Monthly Conversion Audits", description: "Regular review of booking completion rates and drop-off analytics." },
          { name: "Funnel & Menu Adjustments", description: "Adding new service tiers, price changes, and promotional packages on demand." },
          { name: "Uptime & Webhook Monitoring", description: "24/7 monitoring of Stripe webhooks, WhatsApp alerts, and calendar integrations." },
          { name: "Priority Support Line", description: "Direct communication channel with our lead engineer for quick turnaround updates." },
        ],
        ctaText: "Book a call",
        ctaHref: "/book",
      },
    ],

    // On-Page Editorial Insight for Services (GEO)
    insight: {
      eyebrow: "OPERATIONAL CONVERSION BENCHMARK",
      headline: "Why 3-Tap Mobile Intake Replaces Traditional Form Frictional Leaks",
      summary: "Traditional 12-field enquiry forms lose over 68% of smartphone visitors before submission. 3-tap order builders guide customers through selection, date pick, and deposit lock in under 45 seconds.",
      takeaways: [
        {
          metric: "68% Drop-Off Cut",
          title: "Frictionless Smartphone Flow",
          description: "Replacing endless text inputs with visual tap cards cuts customer completion time from minutes to under 45 seconds.",
        },
        {
          metric: "100% Commitment",
          title: "Upfront Stripe Deposit Capture",
          description: "Collecting a 20%–50% upfront deposit through Stripe or Apple Pay virtually eliminates unpaid appointment holds and no-shows.",
        },
        {
          metric: "< 30s Dispatch",
          title: "Instant WhatsApp Owner Alerts",
          description: "Orders push straight to your phone via WhatsApp with full job specifications, customer notes, and payment confirmation.",
        },
      ],
    },

    // Services Contextual FAQs
    faq: {
      eyebrow: "SOLUTIONS FAQ",
      headline: "Questions About Our Systems",
      description: "Clear answers on order builders, payment gateways, WhatsApp dispatches, and technical setup.",
      faqs: [
        {
          question: "Can the 3-tap order builder calculate bespoke prices for custom work?",
          answer: "Yes. We configure tiered pricing, size options, add-on services, and dynamic deposit calculations tailored directly to your business price list.",
        },
        {
          question: "Which payment processors and wallets are supported for deposits?",
          answer: "All storefronts integrate directly with Stripe, supporting Apple Pay, Google Pay, Visa, Mastercard, and American Express. Deposits land directly in your own bank account.",
        },
        {
          question: "How do booking requests reach me when a customer completes the flow?",
          answer: "Completed orders generate an instant WhatsApp dispatch to your smartphone with the customer’s name, selected services, booking date, and deposit status.",
        },
        {
          question: "Does the system integrate with Google Calendar or Outlook?",
          answer: "Yes. Confirmed bookings sync two-way with your Google or Outlook calendar to prevent double bookings.",
        },
        {
          question: "Can we collect client documents, records, or file uploads?",
          answer: "Yes. Our interactive intake builders support direct document uploads, accounting platform specifications (Xero, QuickBooks, FreeAgent), and structured sector triage.",
        },
      ],
    },
  },

  // Process Page Copy (`/process`)
  processPage: {
    headerTitle: "You do not have weeks to endure painful agency delays.",
    headerHighlight: "Live in 7 Days",
    headerSubtitle: "From initial diagnostic call to a live, functioning mobile storefront and booking builder in 7 business days. Zero operational disruption.",
    steps: [
      {
        number: "01",
        title: "Step 1: Operational Diagnostic & Friction Audit",
        sub: "Identifying where your business leaks enquiries, orders, and manual hours.",
        details: "We review your current enquiry channels, order forms, and manual admin tasks to map out your high-converting storefront and deposit intake blueprint.",
        deliverable: "Storefront Architecture & Friction Audit Blueprint",
      },
      {
        number: "02",
        title: "Step 2: Working Interactive Prototype Build",
        sub: "Delivering a working order or booking builder in 48 hours.",
        details: "We engineer a functional mobile prototype tailored to your brand, services, and pricing. You test the complete 3-tap customer flow directly on your smartphone before committing.",
        deliverable: "Live Working Prototype on Your Phone in 48 Hours",
      },
      {
        number: "03",
        title: "Step 3: Payment Gateway, Calendar & WhatsApp Integration",
        sub: "Connecting Stripe checkout, calendar booking, and WhatsApp alerts.",
        details: "We link your Stripe account for upfront deposit processing, connect your Google/Outlook calendar for live scheduling, and set up instant WhatsApp notifications to your phone.",
        deliverable: "Integrated Payment, Calendar & WhatsApp Gateway",
      },
      {
        number: "04",
        title: "Step 4: Zero-Downtime Launch & Asset Handoff",
        sub: "Seamless DNS cutover with 100% asset and code ownership.",
        details: "We point your existing domain with zero downtime. You receive 100% asset ownership and full administrative control, with optional ongoing management care.",
        deliverable: "Live Production Launch & Full Asset Ownership",
      },
    ],

    // On-Page Editorial Insight for Process (GEO)
    insight: {
      eyebrow: "DEPLOYMENT METHODOLOGY",
      headline: "How We Deploy in 7 Days Without Disrupting Your Existing Booking Flow",
      summary: "Most agencies take 6–12 weeks of endless back-and-forth. Our sprint protocol deploys in an isolated staging sandbox so your live business operations experience zero downtime.",
      takeaways: [
        {
          metric: "Zero Downtime",
          title: "Parallel Staging Architecture",
          description: "The new storefront is built entirely in a secure preview environment. Your existing website, domain, and email remain 100% live and untouched.",
        },
        {
          metric: "48h Proof",
          title: "Phone-Tested Working Prototype",
          description: "Before paying any setup invoice, you test the interactive order and booking builder on your personal smartphone.",
        },
        {
          metric: "< 15 Min",
          title: "Seamless DNS Cutover",
          description: "Public domain switchover occurs in minutes with automated SSL certification and zero disruption to incoming customer traffic.",
        },
      ],
    },

    // Process Contextual FAQs
    faq: {
      eyebrow: "PROCESS FAQ",
      headline: "Deployment & Setup Questions",
      description: "Everything about timelines, technical requirements, and our 7-day launch protocol.",
      faqs: [
        {
          question: "What do I need to supply to get started on Day 1?",
          answer: "Your logo, current price/service list, brand colours, and access to your domain provider. If you don't have photography, we can source high-end industry assets.",
        },
        {
          question: "Will my existing website experience downtime during the build?",
          answer: "Zero downtime. The build happens on a private staging link. The public switchover occurs in minutes once you approve the final build.",
        },
        {
          question: "What happens if I want changes during the 7-day build?",
          answer: "We hold a milestone review on Day 3 where you test the intake flow and request adjustments to copy, pricing steps, or branding.",
        },
        {
          question: "Can I connect my existing Stripe and Google accounts?",
          answer: "Yes. All payments flow directly into your own Stripe account, and bookings link to your existing Google or Outlook diary.",
        },
      ],
    },
  },

  // Portfolio Page Copy (`/portfolio`)
  portfolioPage: {
    headerTitle: "Explore our live digital storefronts, order builders, and client sandboxes.",
    headerHighlight: "Engineered For Revenue",
    headerSubtitle: "Interactive 3-tap booking flows, deposit checkouts, and bespoke storefronts deployed for UK local businesses.",
    noticeTitle: "Engineered Specifically To Your Business & Services",
    noticeDescription: "Every storefront is custom-engineered for your services, pricing options, calendar scheduling, and brand identity. Explore our client sandboxes below or test a free working prototype.",
    constructionTitle: "Request A Free Working Storefront Prototype",
    constructionDescription: "Want to see how a 3-tap order builder and instant WhatsApp alert system works for your business? We build a working prototype within 48 hours.",
    emailLabel: "Business Email",
    nameLabel: "Your Name",
    submitBtnText: "Book a call",
    underConstructionText: "Request custom storefront prototype: ",
  },

  // Pricing Page Copy (`/pricing`)
  pricingPage: {
    headerTitle: "Losing high-value customer enquiries costs far more than the system that captures them.",
    headerHighlight: "Engineered Scope & Growth Partnerships",
    headerSubtitle: "Sub-second mobile storefronts, 3-tap order builders, and managed growth infrastructure. Scoped transparently to your operational volume.",
    performanceSLATitle: "Strict Performance Commitments & Clarity",
    performanceSLASubtitle: "We Back Our Digital Systems With Transparent Commitments",
    performanceSLAParagraph: "Sprint-based agile delivery backed by robust edge cloud infrastructure, verified uptime, and ongoing search and schema refinements.",
    roiCalculator: {
      eyebrow: "REVENUE RECOVERY CALCULATOR",
      title: "Calculate Your Lost Enquiry Revenue",
      description: "Discover how much revenue 3-tap order builders, upfront deposit collection, and instant WhatsApp alerts recover each month.",
      annualTimeLabel: "Annual Admin Hours Saved",
      growthLiftLabel: "Est. Extra Jobs / Bookings Secured (+25%)",
      valueUnlockedLabel: "Total Annual Revenue Secured",
      valueDisclaimer: "Calculated based on converting mobile traffic through upfront deposit capture and speed-to-lead response.",
      recommendedLabel: "Recommended Package:",
      recommendedSuffix: " Architecture",
      applyBtnText: "Book a call",
      currentRevenueLabel: "Monthly Inbound Enquiries / Calls",
      weeklyHoursLabel: "Average Job / Consultation Value (£)",
    },

    // On-Page Editorial Insight for Pricing (GEO)
    insight: {
      eyebrow: "COMMERCIAL UNIT ECONOMICS",
      headline: "The Commercial Reality: One High-Ticket Job Pays for the Entire System",
      summary: "Unlike recurring SaaS platforms or bloated agency retainers, a high-converting storefront is a one-off capital investment that pays for itself in weeks.",
      takeaways: [
        {
          metric: "100% Ownership",
          title: "Zero Agency Lock-In",
          description: "You own the website code, domain, and Stripe merchant account completely. No subscription lock-in where you lose your site if you leave.",
        },
        {
          metric: "1 Client",
          title: "Rapid Commercial Payback",
          description: "For an independent UK accountancy practice averaging £1,500–£3,600 in annual recurring fees, onboarding just 1 corporate client fully repays the setup.",
        },
        {
          metric: "Zero Hassle",
          title: "Managed Cloud Care vs. Self-Hosting",
          description: "While you can self-host the raw codebase using our transfer steps, managing server patches, SSL, and backups independently creates ongoing technical hassle. Our automated £29–£49/mo direct debit takes care of everything with zero lock-in.",
        },
      ],
    },

    // Pricing Contextual FAQs
    faq: {
      eyebrow: "PRICING FAQ",
      headline: "Transparent Commercial Terms",
      description: "Straightforward answers on practice ownership, payments, hosting fees, and self-hosting transfer steps.",
      faqs: [
        {
          question: "Do I own the website and code after the build fee is paid?",
          answer: "Yes, 100%. Unlike subscription site builders where you lose your site if you cancel, you retain full asset and code ownership with zero agency lock-in.",
        },
        {
          question: "What are the ongoing monthly costs after launch?",
          answer: "Managed UK cloud hosting and technical maintenance is £29/month for Practice Core and £49/month for Practice Growth OS (£99/mo for Institutional). This covers automated SSL renewals, daily database backups, speed audits, and zero lock-in contracts.",
        },
        {
          question: "Can our practice opt for a one-time build without monthly hosting or maintenance?",
          answer: "Yes, 100%. You own all intellectual property. If you choose not to use our managed cloud hosting and maintenance, we will supply you with our handover checklist and instructions to transfer the Next.js codebase, environment variables, database records, and DNS configuration to your own servers. However, please be aware that managing your own cloud infrastructure, manual SSL renewals, daily database backups, edge speed optimizations, and troubleshooting downtime on your own involves significant ongoing technical friction and administrative hassle. For that reason, over 95% of practices keep our automated £29/mo or £49/mo direct-debit managed infrastructure active with zero lock-in contracts.",
        },
        {
          question: "Are there any hidden transaction fees or payment markups?",
          answer: "No. All customer payments process directly through your own Stripe account at standard Stripe processing rates (typically 1.4% + 20p for UK cards). We take zero cuts on standard setup packages.",
        },
      ],
    },
    oneTimeTiers: [
      {
        name: "Practice Core",
        price: "595",
        promoPrice: "495",
        monthlyHosting: "29",
        delivery: "48 Hours",
        interval: "one-time setup (or £495 promo)",
        milestoneBreakdown: "£29/mo managed cloud hosting · 100% practice asset ownership",
        description: "Sub-second mobile-first practice hub, partner call/email routing, MTD/ICAEW trust badges, 100% IP & DNS ownership.",
        features: [
          "High-Performance Mobile-First Practice Hub",
          "Direct Partner Call & Inbound Email Routing",
          "MTD / ICAEW & ACCA Trust Badges & Partner Directory",
          "48-Hour Turnaround & Verification Sprint",
          "Local SEO & UK Practice Schema.org Structured Data",
          "100% Intellectual Property & DNS Transfer",
        ],
        domainHostingNote: "£29/mo managed cloud hosting, automated SSL, daily backups & zero agency lock-in. 48-hour delivery.",
        cta: "Book a call",
        featured: false,
        tag: "Practice Core (Base entry)",
        highlight: "48-Hour Turnaround",
      },
      {
        name: "Practice Growth OS",
        price: "1,495",
        monthlyHosting: "49",
        delivery: "7–10 Days",
        interval: "one-time setup",
        milestoneBreakdown: "£49/mo managed infrastructure · Milestone-staged delivery",
        description: "60-second inbound enquiry triage, Calendly/Google/Outlook booking sync, instant WhatsApp partner dispatches, CRM lead routing.",
        features: [
          "60-Second Inbound Client Triage & Interactive Fee Scoper",
          "Direct Two-Way Calendar Booking (Calendly / Google / Outlook)",
          "Instant WhatsApp & Email Practice Partner Notifications",
          "Sector-Specific Triage Cards (Contractor, Landlord, Corp Tax)",
          "Centralized Back-End CRM Pipeline & Lead Routing",
          "Comprehensive UK Practice Schema & Speed Optimization",
        ],
        domainHostingNote: "£49/mo managed infrastructure, automated triage updates & ongoing schema alignment. 7–10 days delivery.",
        cta: "Book a call",
        featured: true,
        tag: "Sales Prof Tier · Most Popular",
        highlight: "7–10 Days Turnaround",
      },
      {
        name: "Institutional Practice Engine",
        price: "4,995 – 7,495",
        monthlyHosting: "99",
        delivery: "Staged Sprints",
        interval: "one-time setup",
        milestoneBreakdown: "£99/mo enterprise infrastructure · Scoped milestone delivery",
        description: "Bespoke multi-office infrastructure (WealthWise tier), custom tax/dividend estimators, client portal & practice management routing.",
        features: [
          "Bespoke Multi-Office & Multi-Partner Web Architecture",
          "Custom Tax, Dividend & Bookkeeping Estimator Engines",
          "Practice Management Routing (Karbon, AccountancyManager, Iris)",
          "Automated Speed-to-Lead Triage & Multi-Stage Client Intake",
          "Full Technical SEO, ICAEW/ACCA Compliance Alignment",
          "Dedicated Senior Systems Engineer & Staged Sprint Delivery",
        ],
        domainHostingNote: "£99/mo enterprise infrastructure, multi-office routing & priority SLA with direct senior engineer access.",
        cta: "Book a call",
        featured: false,
        tag: "Institutional Scale",
        highlight: "Staged Sprints Delivery",
      },
    ],
    monthlyTiers: [
      {
        name: "Launch Support",
        price: "195",
        interval: "billed monthly · zero lock-in contracts",
        milestoneBreakdown: "Continuous hosting oversight · Search indexing audits",
        description: "Essential technical maintenance, uptime monitoring, and search health checks to protect your storefront and ensure inquiries never drop.",
        features: [
          "Cloud Hosting Oversight & SSL Security Monitoring",
          "Monthly Google Search Console & Indexing Health Checks",
          "Back-End CRM & Calendar Sync Health Monitoring",
          "Email Notification Dispatch Health Checks",
          "Monthly Content, Service & Pricing Tweaks (Up to 1 hr)",
          "Standard Technical Support Desk",
        ],
        cta: "Book a call",
        featured: false,
        tag: "Launch Support",
        highlight: "Essential Care",
      },
      {
        name: "Leverage Growth",
        price: "495",
        interval: "billed monthly · zero lock-in contracts",
        milestoneBreakdown: "Active conversion tuning · Priority engineering desk",
        description: "Proactive monthly management for growing businesses that rely on automated bookings, email workflows, and regular performance audits.",
        features: [
          "Everything in Launch Support",
          "Booking Form & Intake Flow Maintenance",
          "Monthly Conversion & Search Keyword Review",
          "Email Automation Management & Delivery Monitoring",
          "CRM Pipeline & Booking Slot Rules Tuning",
          "Monthly Website Speed & Performance Audit",
          "Priority Technical Support Desk",
        ],
        cta: "Book a call",
        featured: true,
        tag: "Recommended",
        highlight: "Autonomous Care",
      },
      {
        name: "Enterprise Alliance",
        price: "995",
        interval: "billed monthly · zero lock-in contracts",
        milestoneBreakdown: "Dedicated monthly engineering · Direct Slack/WhatsApp",
        description: "Your external technology partner providing dedicated monthly engineering hours, custom workflows, and high-priority support.",
        features: [
          "Everything in Leverage Growth",
          "Dedicated Monthly Engineering Allocation (Up to 6 hrs)",
          "Multi-Location Regional Search & Schema Updates",
          "Custom CRM Database & Webhook Maintenance",
          "Lifecycle Email Campaign Review & Setup",
          "Monthly Written Systems & Conversion Performance Review",
          "Direct Senior Systems Engineer WhatsApp / Slack Channel",
        ],
        cta: "Book a call",
        featured: false,
        tag: "Enterprise Alliance",
        highlight: "Strategic Partner",
      },
    ],
    revenueShareTiers: [
      {
        name: "Starter Partner",
        price: "5%",
        interval: "of digital checkout revenue",
        milestoneBreakdown: "Applies strictly to online payments · Reconciled monthly",
        description: "Performance partnership for validated businesses with online booking. The 5% fee applies strictly to digital transactions processed through your website gateway.",
        features: [
          "5% Share of Digital Checkout Transactions & Deposits",
          "Zero Fee on In-Store, Cash, or Off-Platform Sales",
          "High-Performance Mobile Storefront",
          "Integrated Stripe Checkout & Card Processing",
          "Direct Back-End Calendar Booking",
          "Monthly Gateway Reconciliation Dashboard",
        ],
        cta: "Book a call",
        featured: false,
        tag: "Starter Partner",
        highlight: "Performance Baseline",
      },
      {
        name: "Pro Growth Partner",
        price: "8%",
        interval: "of digital checkout revenue",
        milestoneBreakdown: "Order builder + CRM + automated email notifications",
        description: "Our primary performance partnership: complete order builder, automated customer notifications, and CRM, funded through an 8% share on digital gateway transactions.",
        features: [
          "8% Share of Digital Checkout Transactions & Deposits",
          "Everything in Starter Partner",
          "Interactive Order Builder & Deposit Checkout Engine",
          "Centralized Back-End CRM System",
          "Automated Email & Notification Dispatches",
          "Advanced Local Schema & Search Optimization",
          "Automated Google Review Generation Flow",
        ],
        cta: "Book a call",
        featured: true,
        tag: "Most Popular",
        highlight: "Full Operations",
      },
      {
        name: "VIP Scale Partner",
        price: "10%",
        interval: "of digital checkout revenue",
        milestoneBreakdown: "Multi-location routing + advanced CRM + priority support",
        description: "Full-stack operational partnership for high-volume or multi-location companies with active online booking and multi-step dispatch workflows.",
        features: [
          "10% Share of Digital Checkout Transactions & Deposits",
          "Everything in Pro Growth Partner",
          "Multi-Location & Multi-Service Web Architecture",
          "Advanced CRM & Dormant Lead Recovery Workflows",
          "Multi-Stage Automated Email Journeys",
          "Comprehensive Search & Structured Schema Graph",
          "Direct Technical Partner Support Hotline",
        ],
        cta: "Book a call",
        featured: false,
        tag: "VIP Scale",
        highlight: "Maximum Skin in Game",
      },
    ],
    customScopeTiers: {
      oneTime: {
        name: "Bespoke Practice Architecture",
        price: "Custom Scope",
        interval: "agreed on discovery call",
        milestoneBreakdown: "Tailored sprint milestones based on practice scale & complexity",
        description: "For established multi-partner firms, franchise networks, or multi-office groups requiring custom Karbon/Iris/AccountancyManager integrations, custom calculators, or tailored enterprise SLAs.",
        features: [
          "Custom Practice Management Integrations (Karbon, Iris, Xero Practice Manager)",
          "Multi-Depot & Regional Practice Portal Architecture",
          "Specialized Partner Dispatch, Staff Booking & Branch Routing",
          "Enterprise Security, UK GDPR Data Enclaves & Custom SLAs",
          "Dedicated Systems Architect & Ongoing Engineering Allocation",
        ],
        cta: "Book a call",
        tag: "Enterprise Bespoke",
      },
      revenueShare: {
        name: "Bespoke Performance Partnership",
        price: "Custom Terms",
        interval: "agreed on discovery call",
        milestoneBreakdown: "Aligned performance tiers for enterprise operations",
        description: "For high-turnover businesses (£50k+/mo), enterprise groups, or low-margin operations where a standard rev share is unsuitable.",
        features: [
          "Tailored Revenue Share Percentages & Minimum Deposit Thresholds",
          "Hybrid Retainer-Plus-Performance Commission Options",
          "Multi-Depot or Multi-Brand Automated Infrastructure",
          "Custom Payment Reconciliation Connectors",
          "Dedicated Strategic Account Lead",
        ],
        cta: "Book a call",
        tag: "Bespoke Partnership",
      },
      monthly: {
        name: "Bespoke Managed Retainer",
        price: "Custom Scope",
        interval: "billed monthly · zero lock-in contracts",
        milestoneBreakdown: "Scoped engineering allocation & tailored enterprise SLA",
        description: "For franchise networks, multi-brand groups, or high-traffic platforms needing dedicated engineering allocations and custom SLAs.",
        features: [
          "Custom Monthly Engineering & Automation Hour Allocation",
          "Multi-Location Regional SEO & Schema Network Management",
          "Custom API, CRM Pipeline & Database Maintenance",
          "Continuous System Health Monitoring & Incident Priority",
          "Direct Senior Systems Engineer WhatsApp / Slack Channel",
        ],
        cta: "Book a call",
        tag: "Bespoke Retainer",
      },
    },
  },

  // Contact Concierge Copy (`/contact`)
  contactPage: {
    headerTitle: "Stop letting customer enquiries slip through unread.",
    headerHighlight: "Direct Gateway",
    headerSubtitle: "Ready to deploy a 3-tap order builder and instant WhatsApp alert system configured specifically for your business? Connect directly below.",
    supportEyebrow: "DIRECT ASSISTANCE",
    supportTitle: "Direct Human Response",
    supportDescription: "Speak directly with our UK engineering team. Zero generic ticketing queues.",
    emailLabel: "Direct Email",
    phoneLabel: "Call or WhatsApp",
    slaLabel: "Response Standard",
    slaValue: "Replied Within 1 Business Hour",
    whatsNextTitle: "What Occurs Next?",
    whatsNextItems: [
      "Instant acknowledgment and enquiry assessment.",
      "15-minute call to review your current customer flow and bottlenecks.",
      "Live working mobile prototype demonstrating your system in 48 hours.",
    ],
    // Contact Contextual FAQs
    faq: {
      eyebrow: "CONTACT FAQ",
      headline: "Common Questions",
      description: "Direct answers about response times, consultations, and our UK coverage.",
      faqs: [
        {
          question: "What is your typical response time for new enquiries?",
          answer: "We respond to all direct enquiries and WhatsApp messages within 1 business hour during UK working hours.",
        },
        {
          question: "Do you work with businesses outside Berkshire?",
          answer: "Yes. While our headquarters are in Berkshire, our deployments serve independent premier businesses across England, Scotland, and Wales.",
        },
        {
          question: "Can I request a prototype directly via WhatsApp?",
          answer: "Yes. Simply click our WhatsApp link, tell us your business name and service type, and we will prepare a preliminary prototype breakdown.",
        },
      ],
    },
  },

  // Testimonials / Cohort Status Page Copy
  testimonialsPage: {
    headerTitle: "Quantified Outcomes &",
    headerHighlight: "Verified Revenue Growth",
    headerSubtitle: "How premier UK local businesses eliminate enquiry drop-off, collect upfront deposits, and scale revenue with our automated mobile storefronts.",
  },

  // Booking Page Copy (`/book`)
  bookPage: {
    clinicalEvaluationLabel: "15-Minute Practice Diagnostic & Systems Alignment Call",
    headerTitle: "Uncover precisely where your business is losing",
    headerHighlight: "enquiries, orders, and revenue.",
    headerSubtitle: "Reserve a 15-minute slot on our live diary. We will dissect your current customer flow, show you where enquiries drop off, and demonstrate how a 3-tap order builder captures more revenue.",
    trustItems: [
      "15-minute focused operational consultation",
      "Live custom storefront prototype demonstration for your business",
      "Timing is confirmed after scoping",
    ],
    socialProofQuote: "On this 15-minute call, we show you the exact mobile storefront and deposit setup that stops prospective customers bouncing to competitors.",
    socialProofAuthor: "Mercian Wealth Standard",
    // Book Contextual FAQs
    faq: {
      eyebrow: "BOOKING FAQ",
      headline: "Discovery Call Questions",
      description: "Everything to know about reserving and preparing for your 15-minute consultation.",
      faqs: [
        {
          question: "What happens during the 15-minute discovery call?",
          answer: "We inspect your current mobile customer experience, identify where enquiries or orders are dropping off, and confirm specifications for your custom working prototype.",
        },
        {
          question: "Is there any sales pressure or obligation on the call?",
          answer: "None. If the prototype and commercial numbers make sense for your business, we proceed. If not, you keep the architectural advice free of charge.",
        },
        {
          question: "What do I need to prepare ahead of the call?",
          answer: "Just your website or social page link and a general idea of your top 2–3 service bottlenecks. No complex preparation is needed.",
        },
      ],
    },
  },

  // Accounting Practices Dedicated Page (`/practices`)
  practicesPage: {
    hero: {
      badge: "UK ACCOUNTING PRACTICES",
      headline: "Turn more enquiries into clients, and stop chasing paperwork.",
      subheadline: "We help UK accounting practices win more of the clients who enquire, spend less time chasing records and avoid missed deadlines, with your team in control of everything that goes out.",
      primaryCtaText: "Book a 15-minute walkthrough",
      primaryCtaHref: "/book",
      secondaryCtaText: "Get a free website review",
      secondaryCtaHref: "#website-review",
      tertiaryCtaText: "See how it works",
      tertiaryCtaHref: "#practice-visualizer",
      trustPills: [
        "More enquiries become clients",
        "Fewer hours chasing records",
        "Fewer missed deadlines",
        "Your team approves everything that goes out",
      ],
    },
    outcomesHeadline: "Three outcomes for your practice",
    outcomesFootnote: "Impact depends on your enquiry volume and fees. We estimate it with your own numbers on the call.",
    outcomes: [
      {
        id: "revenue",
        pillar: "REVENUE",
        title: "Win more of the clients who enquire",
        description: "Every enquiry gets a fast reply and a call booked, so the people who contact you end up with you, not the practice down the road.",
        footnote: "Impact depends on your enquiry volume and fees. We estimate it with your own numbers on the call.",
      },
      {
        id: "time",
        pillar: "TIME",
        title: "Get your senior people's time back",
        description: "Records and documents arrive on time without anyone chasing them, and clients are reminded ahead of every deadline.",
        footnote: "Impact depends on your enquiry volume and fees. We estimate it with your own numbers on the call.",
      },
      {
        id: "risk",
        pillar: "RISK",
        title: "Start every client properly",
        description: "New clients go from \"yes\" to ready to work with you without the back-and-forth on engagement letters, ID checks and authorisations.",
        footnote: "Impact depends on your enquiry volume and fees. We estimate it with your own numbers on the call.",
      },
    ],
    howItWorks: "Behind the scenes we use scheduled reminders and booking links, all approved by your team. Nothing goes to HMRC and we never need your clients' ledgers.",
    howItStartsTitle: "How it starts",
    howItStarts: [
      "A 15-minute walkthrough: we review your site and ask about how your practice works.",
      "We analyse what you need and come back with what's realistic and the price.",
      "We agree the scope in writing, then build in stages.",
    ],
    mtdSection: {
      badge: "MTD FOR INCOME TAX",
      title: "Quarterly updates mean more chasing, more often.",
      facts: [
        "6 April 2026: MTD for Income Tax became mandatory above £50,000 qualifying income",
        "April 2027: the threshold drops to £30,000",
        "Every quarter: updates due 7 Aug, 7 Nov, 7 Feb and 7 May",
      ],
    },
    systems: [
      {
        id: "intake",
        tag: "REVENUE OUTCOME",
        title: "Win more of the clients who enquire",
        subtitle: "Never lose an enquirer to the practice down the road.",
        description: "Every enquiry gets a fast reply and a call booked, so the people who contact you end up with you, not the practice down the road.",
        deliverables: [
          "Fast automated first reply and structured qualification",
          "Direct diary sync with your team's criteria",
          "Filters tyre-kickers with turnover thresholds",
          "Zero access to client ledgers or confidential records",
        ],
        roi: "Impact depends on your enquiry volume and fees. We estimate it with your own numbers on the call.",
      },
      {
        id: "chasing",
        tag: "CAPACITY & COMPLIANCE",
        title: "Get your senior people's time back",
        subtitle: "Records and documents arrive ahead of deadlines without manual chasing.",
        description: "Records and documents arrive on time without anyone chasing them, and clients are reminded ahead of every deadline.",
        deliverables: [
          "Pre-approved automated reminders for quarterly reporting and Self Assessment",
          "Your team approves every message template and schedule before dispatch",
          "Secure one-click upload link straight into your portal or inbox",
          "Reduces deadline panic and late submission friction",
        ],
        roi: "Impact depends on your enquiry volume and fees. We estimate it with your own numbers on the call.",
      },
      {
        id: "onboarding",
        tag: "CLIENT EXPERIENCE",
        title: "Start every client properly",
        subtitle: "New clients go from agreement to ready-to-work smoothly.",
        description: "New clients go from \"yes\" to ready to work with you without the back-and-forth on engagement letters, ID checks and authorisations.",
        deliverables: [
          "Standardised digital onboarding checklist for new instructions",
          "Automated follow-up for outstanding ID and authorisations",
          "Modern client experience that reinforces your fee pricing",
          "Smooth handover directly to your bookkeeping and payroll managers",
        ],
        roi: "Impact depends on your enquiry volume and fees. We estimate it with your own numbers on the call.",
      },
    ],
    speedTest: {
      badge: "DIAGNOSTIC TEST",
      title: "Test Your Practice Response Speed & MTD Readiness",
      subtitle: "Answer 5 diagnostic questions to measure where enquiries slip through and how to prepare for quarterly reporting.",
    },
    visualizer: {
      badge: "PRACTICE SANDBOX (SAMPLE DATA)",
      title: "Experience the enquiry-to-client pipeline in real time.",
      subtitle: "Sample data. Personas and fees are illustrative. Toggle through the governed workflows below to see how UK practices eliminate phone tag and keep senior staff focused on billable work.",
      tabs: [
        { id: "intake", number: "01", label: "Enquiry Intake Speed", short: "Speed Intake" },
        { id: "chasing", number: "02", label: "MTD Deadline Chaser", short: "Deadline Chaser" },
        { id: "onboarding", number: "03", label: "Onboarding Checklist", short: "Digital Onboarding" },
        { id: "roi", number: "04", label: "Capacity & Hours Saved", short: "Capacity Calculator" },
      ],
      complianceGuarantee: "Your team approves everything that goes out · No access to client ledgers · Built with UK GDPR in mind",
    },
    governance: {
      badge: "BUILT FOR RISK-AVERSE PRACTICES",
      title: "Built for risk-averse practices",
      principles: [
        {
          title: "Your team approves everything that goes out",
          desc: "Your team approves every message template and schedule before anything is sent, and can pause, edit or override any reminder at any time.",
        },
        {
          title: "We don't need access to client ledgers",
          desc: "The intake and chasing systems handle names, emails, deadlines and bookings. Uploaded documents go straight to your own portal or inbox, and we don't store them.",
        },
        {
          title: "Built with UK GDPR in mind",
          desc: "Built with UK data protection principles, explicit consent handling, direct opt-outs, and zero third-party training on your practice records.",
        },
        {
          title: "Works alongside Xero, Dext and IRIS",
          desc: "Layers cleanly on top of your existing software without operational disruption or replacing current tools.",
        },
      ],
    },
    faq: {
      eyebrow: "PRACTICE FAQ",
      headline: "Common questions from UK accounting practices.",
      faqs: [
        {
          question: "Does your system touch our clients' confidential financial data?",
          answer: "No. The intake and chasing systems handle names, emails, deadlines and bookings. Uploaded documents go straight to your own portal or inbox, and we don't store them.",
        },
        {
          question: "Can our team approve reminders before they're dispatched?",
          answer: "Yes. Your team approves every message template and schedule before anything is sent, and can pause, edit or override any reminder at any time.",
        },
        {
          question: "How does this help with MTD for Income Tax?",
          answer: "MTD means quarterly updates, so practices chase clients for records more often. The system sends pre-approved reminders ahead of each quarterly deadline and gives clients a one-click way to send records to you. It doesn't submit anything to HMRC.",
        },
        {
          question: "How long does deployment take?",
          answer: "Timing depends on scope, which we confirm after a short call. We'll need your approval of the message wording, access to your diary or booking tool and a contact on your team.",
        },
      ],
    },
    ctaSection: {
      badge: "PRACTICE WALKTHROUGH",
      title: "Turn more enquiries into clients, and stop chasing paperwork.",
      subtitle: "Book a 15-minute walkthrough: we review your site and ask about how your practice works.",
      primaryCtaText: "Book a 15-minute walkthrough",
      primaryCtaHref: "/book",
    },
  },
};

