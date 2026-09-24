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
      defaultTitle: "Mercian Wealth · Local Storefronts & Booking",
      titleTemplate: "%s · Mercian Wealth",
      description: "We build sub-second mobile storefronts, 3-tap booking builders, instant WhatsApp lead capture, and upfront deposit engines for UK local businesses. Test a live prototype on your phone.",
    },
    home: {
      title: "Mercian Wealth · Local Storefronts & Booking",
      description: "We help UK local businesses stop losing jobs to slow response. Mobile storefronts, 3-tap booking builders, instant WhatsApp alerts, and deposit collection.",
    },
    services: {
      title: "Storefronts & Booking Engines",
      description: "Custom mobile storefronts, interactive order builders, instant WhatsApp lead capture, upfront Stripe deposit collection, and automated Google review workflows.",
    },
    process: {
      title: "7-Day Deployment Protocol",
      description: "From custom mobile prototype to fully functioning online order or booking builder in 7 business days. Zero operational disruption to your business.",
    },
    portfolio: {
      title: "Client Prototypes & Work",
      description: "Explore live interactive sandboxes and verified client storefronts built for UK bakeries, bespoke jewellers, construction contractors, and clinics.",
    },
    pricing: {
      title: "Packages & Growth Retainers",
      description: "Essential Storefront (£495), Pro Order Builder (£995), Full Custom Build (£1,995). Transparent pricing with optional revenue-share partnerships.",
    },
    testimonials: {
      title: "Client Outcomes & Results",
      description: "Real operational outcomes for UK local businesses: 499 admin hours saved, £32,400 captured orders, and zero unreturned customer enquiries.",
    },
    contact: {
      title: "Contact & Engineering Gateway",
      description: "Connect directly with our UK engineering team, request a custom working prototype for your business, or enquire via WhatsApp.",
    },
    book: {
      title: "Book a 15-Minute Discovery Call",
      description: "Schedule a 15-minute call to identify your enquiry bottlenecks and test a custom mobile storefront prototype built for your business.",
    },
  },

  // Navbar Component
  navbar: {
    logo: "Mercian Wealth",
    tagline: "Mobile Storefronts · 3-Tap Booking Builders · WhatsApp Lead Capture",
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
        "Sub-second mobile storefronts eliminate visitor bounce and capture high-intent evening enquiries.",
        "Upfront Stripe deposit collection eliminates no-shows and secures cash flow.",
        "Instant WhatsApp lead dispatch alerts your team in under 5 seconds.",
        "Three core outcomes: more leads captured, faster response times, and less manual work on your end.",
      ]
    },

    // 1. Hero Section (Outcomes-First)
    hero: {
      eyebrow: "MORE LEADS · FASTER RESPONSE · LESS MANUAL WORK",
      headline: "We help local businesses stop losing jobs to whoever replies first.",
      subheadline: "Sub-second mobile storefronts, 3-tap booking builders, instant WhatsApp lead dispatch, and upfront deposit collection. More leads captured, faster response times, and less manual work on your end.",
      primaryCtaText: "Book a 15-Min Discovery Call",
      primaryCtaHref: "/book",
      secondaryCtaText: "See a free prototype for your business",
      secondaryCtaHref: "#prototype-modal",
      whatsappCtaText: "Message on WhatsApp",
      whatsappHref: "https://wa.me/447851055929",
      proofBadge: "More Leads Captured · Faster Response Times · Less Manual Work",
      trustItems: [
        "Sub-Second Mobile Storefronts",
        "3-Tap Booking & Order Builders",
        "Instant WhatsApp Lead Dispatch",
        "Upfront Stripe Deposit Checkout",
      ],
      unsureText: "Message directly on WhatsApp or test our live client prototypes below →",
    },

    // 2. What Changed (SYSTEM I)
    whatChanged: {
      eyebrow: "4 MARKET SHIFTS",
      headline: "The rules of customer acquisition shifted. Waiting is now an active choice to lose revenue.",
      subheadline: "Every business feels the shift in customer expectations. The operators who convert mobile visitors instantly capture market share while traditional setups leak lucrative jobs.",
      shifts: [
        {
          outcome: "Revenue Increased",
          tag: "3-TAP MOBILE STOREFRONTS",
          title: "Customers Don't Fill Out Long Contact Forms On Mobile",
          description: "The vast majority of local customers research and book on smartphones. When prospective clients face clunky contact forms, they leave. 3-tap order builders let customers select services and book in seconds.",
        },
        {
          outcome: "Risk Removed",
          tag: "INSTANT LEAD DISPATCH",
          title: "High-Value Enquiries Arrive Outside Working Hours",
          description: "Over 45% of customer enquiries arrive after 6 PM, at weekends, or while you're busy on-site. Instant WhatsApp alerts route qualified project details to your phone so you can lock the job first.",
        },
        {
          outcome: "Cost Reduced",
          tag: "ADMIN DRAG ELIMINATED",
          title: "Manual Follow-Ups & Scheduling Bleed Hundreds of Hours",
          description: "Chasing quotes, playing telephone tag, and typing data into spreadsheets is avoidable operational waste. Automated workflows handle scheduling, CRM updates, and reminders hands-off.",
        },
        {
          outcome: "Risk Removed",
          tag: "SPEED-TO-LEAD ADVANTAGE",
          title: "The Business That Answers First Keeps The Customer",
          description: "Responding within 60 seconds increases conversion by up to 391%. In local services, the first business to engage and confirm the booking wins the job.",
        },
      ],
    },

    // Divergence Comparison (The Two-Path Mechanic)
    divergenceComparison: {
      eyebrow: "OPERATIONAL LEVERAGE",
      headline: "Delayed response is an unforced error. Convert in seconds, or lose the job to someone who will.",
      subheadline: "In local services, the first business to engage and confirm the booking secures the revenue. You can continue relying on slow contact forms and manual message tag—or deploy fast mobile infrastructure that converts automatically.",
      pathConventional: {
        badge: "MANUAL DRAG · 5-FIGURE REVENUE LEAK",
        title: "The Traditional Setup",
        subtitle: "Losing high-ticket jobs while on-site, in meetings, or after hours.",
        points: [
          "Clunky mobile websites that take 4+ seconds to load.",
          "Buried contact forms that force customers to type paragraphs.",
          "Chasing bank transfers and unpaid deposits via message tag.",
          "Unanswered leads bouncing to competitors in under 60 seconds.",
        ]
      },
      pathMercian: {
        badge: "CONVERSION INFRASTRUCTURE · DIRECT REVENUE",
        title: "The Mercian Wealth Infrastructure",
        subtitle: "Sub-second storefronts, 3-tap booking, and upfront deposits.",
        points: [
          "Sub-second mobile storefront loaded in under 400ms.",
          "3-tap order and booking builders that eliminate form friction.",
          "Upfront Stripe deposit checkout guaranteeing customer commitment.",
          "Instant smartphone WhatsApp dispatch with full customer intake specs.",
        ],
      }
    },

    // 3. Bottleneck Analysis (SYSTEM II)
    bottleneck: {
      eyebrow: "WHERE REVENUE LEAKS",
      headline: "Four Places Your Business Leaks Revenue Every Single Week.",
      subheadline: "Most owners think they have a lead generation problem. In reality, they are losing customers who already want to buy, but hit friction before anyone replies.",
      goldSlogan: "Whilst competitors let enquiries sit in inboxes, your system converts instantly, confirms details, and secures deposits.",
      systemMode: "Mode: ",
      modeAutomated: "Automated Storefront Active",
      modeManual: "Manual Booking Drag",
      triggerBtnActive: "Deactivate Automation",
      triggerBtnInactive: "Activate Automation",
      diagnosticLink: "Book a call →",
      cards: [
        {
          id: "time-leak",
          outcome: "Time Wasted",
          tag: "MISSED INBOUND CALLS",
          metric: "5–12 calls/wk",
          title: "Unanswered Enquiries During Busy Hours",
          description: "Calls missed while serving clients, in consultations, or after hours. Callers rarely leave voicemails—they immediately call your nearest competitor.",
        },
        {
          id: "cost-leak",
          outcome: "Cost Incurred",
          tag: "SPEED-TO-LEAD LEAK",
          metric: "£1.5k–£4.5k/mo",
          title: "Slow Response to Web Enquiries",
          description: "Web and social enquiries sitting unaddressed for hours go cold. If you take more than 5 minutes to reply, conversion drops by 80%.",
        },
        {
          id: "risk-leak",
          outcome: "Risk Incurred",
          tag: "ADMIN REPETITION",
          metric: "6–10 hrs/wk",
          title: "Manual Scheduling & Data Entry",
          description: "Coordinating diary slots, sending reminders, copying names into spreadsheets, and chasing invoice payments manually.",
        },
        {
          id: "revenue-leak",
          outcome: "Revenue Lost",
          tag: "QUIET QUOTES",
          metric: "Compounding",
          title: "Zero Follow-Up on Issued Quotes",
          description: "Dozens of prospective clients who asked for a quote and went quiet, never receiving a follow-up message to revive the job.",
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
      eyebrow: "DEPLOYMENT OUTCOMES",
      headline: "Proven Outcomes. Zero Fabricated Metrics.",
      subheadline: "Real business outcomes from verified production systems alongside working interactive prototypes.",
      studies: [
        {
          id: "artisanal-bakery",
          title: "Artisanal Bakery & Confectionery (London)",
          badge: "VERIFIED PRODUCTION METRICS",
          outcomes: [
            { label: "Time saved", value: "499 hrs/yr" },
            { label: "Revenue captured", value: "+£32,400/yr" },
          ],
          problem: "Evening DM chaos, manual order intake, and chasing bank transfers by message tag cost hundreds of hours in admin drag.",
          solution: "Installed a bespoke 3-tap mobile storefront with automated qualification, instant Stripe deposits, and sub-second phone notifications.",
          image: "/stickman_baker_order.png",
          liveUrl: "/portfolio",
          isPrototype: false,
        },
        {
          id: "architectural-construction",
          title: "Example Build: Architectural Construction & Extension Quote Engine",
          badge: "ILLUSTRATIVE EXAMPLE BUILD · INTERACTIVE SANDBOX",
          outcomes: [
            { label: "Response latency", value: "< 500ms" },
            { label: "Quote intake", value: "100% Automated" },
          ],
          problem: "High-ticket contractors on job sites miss valuable commercial enquiries to whoever answers first.",
          solution: "Interactive sub-second project quote builder with automated qualification and instant WhatsApp team dispatch.",
          image: "/vanguard-construction-preview.png",
          liveUrl: "https://premium-local-construction-business-plum.vercel.app/",
          isPrototype: true,
        },
      ],
    },

    // 6. Founder & Positioning Statement (SYSTEM VI)
    whyMercianWealth: {
      eyebrow: "OPERATOR COMMITMENT",
      headline: "Engineered For Businesses That Refuse to Lose Leads.",
      description: "Your business should convert mobile visitors, capture upfront deposits, and alert your team in seconds without requiring you to be glued to your phone.",
      founderQuoteHeadline: "Clear Outcomes. Zero Jargon.",
      founderQuoteText: "We don't waste your time talking about tech stacks, frameworks, or buzzwords. We focus strictly on what changes for your bottom line: more leads captured, faster customer conversion, upfront cash collected, and less time spent on repetitive admin. If an infrastructure change doesn't save hours, cut costs, or bring in revenue, it doesn't get deployed.",
      founderQuoteAuthor: "Founder & Lead Infrastructure Engineer, Mercian Wealth",
      proofStats: [
        { label: "Load Speed", value: "< 400ms" },
        { label: "Lead Dispatch", value: "< 5 Seconds" },
        { label: "Prototype-First", value: "Zero Risk" },
      ],
      differentiators: [
        "High-Speed Mobile Conversion — Sub-second storefronts engineered for smartphones where 80%+ of local buyers land.",
        "Working Prototype First — You test a live, functioning version of your custom storefront on your phone before committing.",
        "Three Commercial Outcomes — Every deployment is engineered strictly to capture more leads, convert faster, or eliminate manual admin.",
      ],
      structuralRealityHeadline: "The Strategic Divide",
      standardAgency: {
        title: "Traditional Web / Admin Setup",
        items: [
          "Slow, bloated websites that lose mobile visitors before the page loads.",
          "Generic contact forms that force customers to type long paragraphs.",
          "Chasing deposits and invoices manually via back-and-forth messages.",
          "Zero automated review requests after jobs are completed.",
        ],
      },
      mercianWealth: {
        title: "Mercian Wealth Infrastructure",
        items: [
          "Sub-second mobile storefront loaded in under 400ms on 4G/5G.",
          "3-tap booking and order builders that convert visitors in seconds.",
          "Upfront Stripe deposit collection directly inside the checkout flow.",
          "Instant smartphone WhatsApp lead dispatch with full customer specifications.",
          "Automated post-service Google review collection to build local ranking dominance.",
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
      description: "Ultra-fast Next.js edge caching (<400ms), bank-grade Stripe payment protocols, instant WhatsApp Webhook routing, and 99.99% availability standard.",
    },

    // 7. Testimonials / Cohort Data
    testimonials: {
      eyebrow: "PROVEN OPERATIONAL RESULTS",
      headline: "How UK Local Businesses Eliminated Missed Leads and Grew Revenue.",
      subheadline: "Real outcomes from trade operators, private clinics, and local services who deployed our mobile storefronts and conversion infrastructure.",
      guarantee: "Strict Performance Standards · Sub-Second Response Standards · Transparent Retainers",
      cohortCard: {
        badge: "LOCAL COMMERCE INFRASTRUCTURE",
        title: "High-Conversion Storefronts Built For Direct Cash Flow",
        paragraph1: "We deploy sub-second mobile storefronts, 3-tap order builders, and hands-off workflow automations for UK businesses who refuse to lose customers to slow response.",
        paragraph2: "Upfront Stripe deposits, automated calendar synchronization, instant smartphone WhatsApp alerts, and automated Google review collection included as standard.",
        paragraph3: "Fixed Setup (£495–£1,995) + Optional Managed Retainers (£195–£995/mo). Zero lock-in, 100% asset ownership.",
        enquiryCtaText: "To review your operations and test a working prototype tailored to your business, book your 15-minute call below or message us directly on WhatsApp.",
      },
      trustPoints: [
        "Sub-Second Mobile Speed",
        "Upfront Stripe Deposits",
        "Instant Smartphone WhatsApp Alerts",
      ],
      items: [
        {
          quote: "Before working with Mercian Wealth, our team spent hours every evening chasing messages, manually taking orders, and verifying bank transfers. The 3-tap custom storefront and automated deposit flow reclaimed 499 hours of admin time in our first year and captured over £32,400 in direct orders.",
          author: "Founder & Operations Lead",
          role: "Bespoke Confectionery Director",
          location: "Artisanal Bakery & Confectionery · London",
          metric: "+£32,400 Captured / 499 Hrs Saved",
        },
      ],
    },

    // Commodity Trap
    commodityTrap: {
      eyebrow: "THE HARSH REALITY",
      headline: "Slow mobile pages and friction-heavy contact forms leak revenue. Instant booking closes deals.",
      subheadline: "In local services, speed-to-lead is everything. The business that responds first and confirms the booking consistently wins the customer.",
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
          question: "Do you charge percentage commissions on all our revenue?",
          answer: "No. For our fixed setup tiers (£495–£1,995), you retain 100% of all customer payments and own the asset with zero ongoing commissions. Our optional Revenue Share partnership is strictly for qualifying operators who choose aligned performance billing.",
        },
        {
          question: "What ongoing maintenance is required after launch?",
          answer: "Standard cloud hosting costs £5–£15/month paid directly to your chosen provider. We offer optional managed retainers (£195–£995/mo) for businesses wanting continuous conversion reviews, intake flow tuning, and priority updates.",
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
          question: "Can we collect customer measurements, photos, or file uploads?",
          answer: "Yes. Our interactive intake builders support direct smartphone photo uploads and specification fields for bespoke cakes, jewellery sizing, or property floorplans.",
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
          metric: "1–2 Jobs",
          title: "Rapid Commercial Payback",
          description: "For a local trade contractor, bespoke jeweller, or private clinic averaging £450–£1,200 per order, closing 2 extra jobs fully repays the build fee.",
        },
        {
          metric: "£5–£15/mo",
          title: "Direct Cloud Hosting",
          description: "Zero inflated maintenance markups. Standard edge hosting is paid directly to your chosen provider with transparent usage.",
        },
      ],
    },

    // Pricing Contextual FAQs
    faq: {
      eyebrow: "PRICING FAQ",
      headline: "Transparent Commercial Terms",
      description: "Straightforward answers on ownership, payments, hosting fees, and revenue share partnerships.",
      faqs: [
        {
          question: "Do I own the website and code after the build fee is paid?",
          answer: "Yes, 100%. Unlike subscription site builders where you lose your site if you cancel, you retain full asset and code ownership with zero agency lock-in.",
        },
        {
          question: "What are the ongoing monthly costs after launch?",
          answer: "Standard cloud hosting typically costs £5–£15/month paid directly to your hosting provider. Ongoing management retainers (£195–£995/mo) are completely optional for businesses wanting continuous conversion reviews, schema maintenance, and priority updates.",
        },
        {
          question: "How does the Revenue Share option work?",
          answer: "For qualifying businesses with proven volume, we lower the upfront setup fee and take an agreed 5%–10% performance fee strictly on digital orders and deposits processed through the online gateway.",
        },
        {
          question: "Are there any hidden transaction fees or payment markups?",
          answer: "No. All customer payments process directly through your own Stripe account at standard Stripe processing rates (typically 1.4% + 20p for UK cards). We take zero cuts on standard setup packages.",
        },
      ],
    },
    billingToggleSetup: "System Build (One-Time)",
    billingToggleRetainer: "Growth Retainer (Monthly)",
    billingToggleRevenueShare: "Revenue Share (5%–10%)",
    oneTimeTiers: [
      {
        name: "Essential Storefront",
        price: "495",
        interval: "one-time setup",
        milestoneBreakdown: "Client owns domain & hosting · 100% asset ownership",
        description: "High-converting 3-page digital storefront engineered for speed, Google Maps visibility, and instant quote capture.",
        features: [
          "High-Performance Mobile Storefront (3 Pages)",
          "Direct Call & Quote Intake Forms",
          "Payment Processing Integration (Stripe / Apple Pay)",
          "Local SEO & Google Search Visibility",
          "Schema.org Structured Data (JSON-LD markup for Google & crawlers)",
          "Back-End Calendar Booking & Direct Alerts",
        ],
        domainHostingNote: "Website requires yearly domain & hosting paid separately to your chosen provider (typically £5–£15/mo). You retain 100% ownership with zero lock-in.",
        cta: "Book a call",
        featured: false,
        tag: "Essential Storefront",
        highlight: "Mobile Storefront",
      },
      {
        name: "Pro Order Builder",
        price: "995",
        interval: "one-time setup",
        milestoneBreakdown: "Milestone-based delivery · Staged kickoff to launch",
        description: "Complete order intake and booking engine with deposit checkout, CRM lead management, and automated customer notifications.",
        features: [
          "Interactive Order Builder & Live Quote Calculator (Up to 7 Pages)",
          "Back-End CRM & Lead Management System",
          "Back-End Calendar Booking & Slot Management",
          "Automated Email Sequences & Notification Dispatches",
          "Integrated Payment & Deposit Processing",
          "Advanced Local SEO & Schema Architecture (Rich snippets & FAQ markup)",
        ],
        domainHostingNote: "Website requires yearly domain & hosting paid separately to your chosen provider based on your traffic needs. 100% client-owned infrastructure.",
        cta: "Book a call",
        featured: true,
        tag: "Most Popular",
        highlight: "Full Booking Engine",
      },
      {
        name: "Full Custom Build",
        price: "1,995",
        interval: "one-time setup",
        milestoneBreakdown: "Milestone-based delivery for custom multi-service operations",
        description: "End-to-end bespoke operational system for multi-service or multi-location businesses needing connected digital infrastructure.",
        features: [
          "Bespoke Multi-Service & Multi-Location Web Architecture",
          "Custom Back-End CRM & Automated Lead Pipelines",
          "Multi-Calendar Booking & Staff Dispatch Management",
          "Multi-Stage Email Automation Sequences & Follow-Ups",
          "Full Payment Gateway & Deposit Checkout Staging",
          "Comprehensive Technical SEO & Multi-Location Schema Graph",
        ],
        domainHostingNote: "Deployed on high-performance cloud hosting under your own account. Full intellectual property ownership with zero agency lock-in.",
        cta: "Book a call",
        featured: false,
        tag: "Enterprise",
        highlight: "Custom Operations",
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
        name: "Bespoke Build",
        price: "Custom Scope",
        interval: "agreed on discovery call",
        milestoneBreakdown: "Tailored sprint milestones based on business volume & complexity",
        description: "For established operations, multi-branch companies, or custom digital architectures that fall outside standard tiers.",
        features: [
          "Custom-Scoped Database & Multi-Service Architecture",
          "Custom ERP & Accounting Integrations (e.g. Xero/QuickBooks)",
          "Specialized Booking, Dispatch & Staff Routing Rules",
          "Full Payment Gateway, Deposit Staging & Merchant Setup",
          "Comprehensive Multi-Location SEO & Schema Architecture",
          "Dedicated Systems Architect & Staged Milestone Delivery",
        ],
        cta: "Book a call",
        tag: "Bespoke Scope",
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
    clinicalEvaluationLabel: "15-Minute Operational Discovery & Strategy Call",
    headerTitle: "Uncover precisely where your business is losing",
    headerHighlight: "enquiries, orders, and revenue.",
    headerSubtitle: "Reserve a 15-minute slot on our live diary. We will dissect your current customer flow, show you where enquiries drop off, and demonstrate how a 3-tap order builder captures more revenue.",
    trustItems: [
      "15-minute focused operational consultation",
      "Live custom storefront prototype demonstration for your business",
      "Guaranteed 7-day deployment timeline",
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
};
