/**
 * lib/site-copy.ts
 *
 * Centralised Copy Registry for mercianwealth.com
 *
 * High-Leverage AI Automation, 3-Tap Mobile Storefronts, WhatsApp Order Dispatch & Review Extraction
 * Engineered for Ambitious Local Businesses & Premier Service Operators across Berkshire & the UK.
 */

export const SITE_COPY = {
  // Global Meta Info
  metadata: {
    layout: {
      defaultTitle: "Mercian Wealth · Storefronts, Automation & Growth Systems",
      titleTemplate: "%s · Mercian Wealth",
      description: "We engineer high-converting mobile storefronts, 3-tap custom booking and order engines, instant WhatsApp alerts, and automated Google review engines for UK local businesses.",
    },
    home: {
      title: "Mercian Wealth · Storefronts, Automation & Growth Systems",
      description: "Sub-second mobile storefronts, 3-tap booking engines, instant WhatsApp dispatch alerts, and automated review extraction for UK local businesses.",
    },
    services: {
      title: "What We Build · Mercian Wealth",
      description: "Bespoke mobile storefronts, automated deposit capture, instant WhatsApp operational dispatch, and systematic 5-star Google review engines.",
    },
    process: {
      title: "The 7-Day Protocol · Mercian Wealth",
      description: "From diagnostic audit to a fully operational, automated booking and WhatsApp alert engine in 7 days. Zero operational drag.",
    },
    portfolio: {
      title: "Prototypes · Mercian Wealth",
      description: "Live interactive storefront sandboxes and custom booking prototypes engineered for premier local businesses and service operators.",
    },
    pricing: {
      title: "Commercial Terms · Mercian Wealth",
      description: "Transparent GBP (£) pricing with zero hidden fees. Fixed one-off setup (£495–£1,450) or flat monthly growth support.",
    },
    testimonials: {
      title: "Case Studies · Mercian Wealth",
      description: "Quantified operational outcomes, recovered project bookings, and automated revenue engines across Berkshire and the UK.",
    },
    contact: {
      title: "Direct Gateway · Mercian Wealth",
      description: "Stop haemorrhaging high-value enquiries in unread DMs. Connect directly via WhatsApp or book a 15-minute diagnostic audit.",
    },
    book: {
      title: "Book Diagnostic · Mercian Wealth",
      description: "Schedule a 15-minute diagnostic call to uncover exactly where your business is losing bookings, deposits, and billable hours.",
    },
  },

  // Navbar Component
  navbar: {
    logo: "Mercian Wealth",
    tagline: "Storefronts · Automation · Growth",
    links: [
      { label: "What We Build", href: "/services" },
      { label: "Protocol", href: "/process" },
      { label: "Prototypes", href: "/portfolio" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
    ],
    ctaText: "Book 15-Min Audit",
    ctaHref: "/book",
    whatsappCtaText: "WhatsApp Us",
    whatsappHref: "https://wa.me/447851055929",
  },

  // Homepage Sections
  homepage: {
    // 0. Live Telemetry Ticker
    telemetryTicker: {
      items: [
        "Unanswered Instagram DMs bleed revenue straight to your competitors.",
        "Manual bank transfers and uncollected deposits create unpaid cancellations.",
        "Speed wins: customers order within 30 seconds when checkout is frictionless.",
        "Deploy a 24/7 automated storefront, WhatsApp dispatch & review engine in 7 days.",
      ]
    },

    // 1. Hero Section
    hero: {
      eyebrow: "MOBILE STOREFRONTS · ORDER AUTOMATION · LOCAL GROWTH",
      headline: "We Build Fast Mobile Storefronts & AI Automations That Capture Orders, Collect Deposits, and Scale Local Businesses 24/7.",
      subheadline: "Stop losing high-value enquiries in unread Instagram DMs and manual phone tag. We engineer sub-second mobile storefronts, 3-tap booking engines, instant WhatsApp dispatch alerts, and automated Google review engines for premier local businesses across Berkshire & the UK.",
      primaryCtaText: "Message on WhatsApp",
      primaryCtaHref: "https://wa.me/447851055929",
      secondaryCtaText: "Book a 15-Min Audit",
      secondaryCtaHref: "/book",
      proofBadge: "3-Tap Checkout · Sub-1s Load Speed · WhatsApp Dispatch · 5★ Reviews",
      trustItems: [
        "Sub-1-Second Mobile Storefronts",
        "3-Tap Custom Booking Engines",
        "Instant WhatsApp Dispatch Alerts",
        "Automated 5-Star Review Extraction",
      ],
      unsureText: "Message our team directly on WhatsApp or book a 15-minute diagnostic call to test a live prototype configured for your business →",
    },

    // Divergence Comparison (The Two-Path Mechanic)
    divergenceComparison: {
      eyebrow: "OPERATIONAL LEVERAGE",
      headline: "Friction is an unforced error. Make ordering instant, or lose the customer to someone who will.",
      subheadline: "In local commerce, customers buy when impulse is high. You can continue juggling buried DMs, lost project notes, and manual deposit chasing—or deploy an automated engine that captures bookings and deposits 24/7.",
      pathConventional: {
        badge: "MANUAL JUGGLE · OPERATIONAL DRAG",
        title: "The DM & Scrap Paper Vulnerability",
        subtitle: "Losing high-margin custom bookings and project enquiries whilst serving clients or fulfilling work on-site.",
        points: [
          "Haemorrhaging 5–10 lucrative project bookings weekly because customers wait hours for a reply in Instagram or Facebook DMs.",
          "Exhausting your evenings manually typing quotes, verifying bank transfers, and reconciling booking dates.",
          "Absorbing no-shows and last-minute cancellations on bespoke bookings due to uncollected upfront deposits.",
          "Zero systematic Google reviews collected, allowing inferior local competitors to outrank you on Google Maps.",
        ]
      },
      pathMercian: {
        badge: "SYSTEMATIC AUTOMATION · MARKET DOMINANCE",
        title: "The Mercian Automation Engine",
        subtitle: "Instant 3-tap customer checkout, non-refundable deposit capture, and sub-second WhatsApp dispatch.",
        points: [
          "Customers configure project specifications, custom requirements, bespoke notes & dates online 24/7, paying deposits instantly via Apple Pay/Card.",
          "Instant WhatsApp dispatch hits your smartphone with comprehensive booking specifications and scheduled dates in under 0.4 seconds.",
          "Sub-1-second mobile load speeds convert impulsive mobile browsers before they bounce elsewhere.",
          "Automated 5-star review extraction sent post-completion to cement undisputed #1 local Google Maps ranking.",
        ],
        ctaText: "Book your free 15-minute diagnostic audit →",
      }
    },

    // 2. Deficit Diagnostic
    bottleneck: {
      eyebrow: "REVENUE HAEMORRHAGE",
      headline: "A delayed response is not an inconvenience—it is profit gifted directly to your competitor.",
      subheadline: "Every 10 minutes a bespoke enquiry sits unread in an inbox, the probability of closing the booking plummets. In local business, ruthless efficiency and instant ordering always triumph.",
      goldSlogan: "Whilst competitors scramble with scrap paper and buried messages, your automated storefront captures custom orders, collects deposits, and alerts your phone in real time.",
      systemMode: "Mode: ",
      modeAutomated: "Automated Storefront Engine",
      modeManual: "Manual Scramble",
      triggerBtnActive: "Deactivate Automated System",
      triggerBtnInactive: "Activate Automated System",
      diagnosticLink: "Book your free 15-minute diagnostic audit →",
      
      cards: [
        {
          title: "Lost Revenue in Buried DMs & Missed Calls",
          description: "Customers enquire whilst you are on-site, serving clients, or fulfilling orders. By the time you reply hours later, they have already paid a competitor.",
        },
        {
          title: "Chasing Manual Deposits & Bank Transfers",
          description: "Wasting billable hours texting back and forth to confirm project specifications, dates, and bank account numbers for upfront deposits.",
        },
        {
          title: "Stagnant Google Reviews Whilst Rivals Rank Higher",
          description: "Delivering exceptional craftsmanship every week, but losing local search share because competitors systematically harvest 100+ verified Google reviews on autopilot.",
        },
      ],
    },

    // 3. Commodity Trap
    commodityTrap: {
      eyebrow: "THE HARSH REALITY",
      headline: "Static DIY websites do not generate orders. They bleed customer attention.",
      description: "Generic DIY websites look cheap until you calculate how many orders they cost you each month. Clunky mobile navigation, buried contact forms, and lack of deposit automation guarantee that impulsive buyers abandon checkout.",
    },

    // 4. Mercian Wealth Difference
    whyMercianWealth: {
      headline: "Engineered For Ambitious Local Businesses & Premier Service Operators.",
      description: "Your digital asset should showcase your craftsmanship, configure bespoke bookings, collect non-refundable deposits, and dominate local search on total autopilot.",
      differentiators: [
        "3-Tap Mobile Booking Engine — Customers customise options, scopes, project specifications & dates in under 30 seconds.",
        "Instant WhatsApp Dispatch Alerts — Full booking specifications, client notes, and payment receipts delivered straight to your phone.",
        "Systematic 5-Star Review Engine — Extract verified Google reviews from delighted clients automatically after completion.",
      ],
      structuralRealityHeadline: "The Strategic Divide",
      standardAgency: {
        title: "Standard Web Agency",
        items: [
          "Bloated generic templates taking months to build.",
          "Zero bespoke booking engines or deposit capture mechanisms.",
          "Buried static contact forms with days-long email response lag.",
          "Zero post-completion Google review automation.",
          "High overheads, complex retainers, and generic non-converting copy.",
        ],
      },
      mercianWealth: {
        title: "Mercian Wealth Architecture",
        items: [
          "Delivered and fully operational in 7 business days.",
          "3-tap mobile booking engine with instant Apple Pay / Stripe deposits.",
          "Sub-0.4s WhatsApp order dispatch straight to your smartphone.",
          "Automated 5-star Google review extraction to rank #1 locally.",
          "Zero long-term lock-in with flat, clear, risk-aligned pricing.",
        ],
      },
      founderQuoteHeadline: "Craftsmanship Deserves Systematic Commercial Power",
      founderQuoteText: "You have spent years mastering your craft and building local reputation. Your digital system should operate with the exact same standard of excellence—capturing high-value clients and locking deposits on total autopilot while you execute your work.",
      founderQuoteAuthor: "Founder & Lead Architect, Mercian Wealth",
      proofStats: [
        { label: "Turnaround Time", value: "7 Days" },
        { label: "Mobile Load Speed", value: "< 0.8s" },
        { label: "Alert Dispatch", value: "< 0.4s" },
      ],
    },

    // 5. Trend Adaptation Statement
    trendAdaptation: {
      eyebrow: "CONTINUOUS UPTIME",
      headline: "Your Storefront Captures Bookings 24/7 Whilst You Focus On Craftsmanship.",
      description: "We handle cloud infrastructure, speed optimization, WhatsApp webhooks, and performance updates in the background. Your digital intake engine remains lightning-fast and ready to convert 365 days a year.",
    },

    // 6. Model Hint
    modelHint: {
      eyebrow: "TRANSPARENT TERMS",
      headline: "Simple Commercial Structures Built For Local Cash Flow.",
      description: "Select the model that suits your operations: one-off setup fee (£495–£1,450) or transparent flat monthly support with zero long-term lock-in.",
    },

    // 7. Category Exclusivity & Postcode Lock
    exclusivity: {
      eyebrow: "TERRITORIAL EXCLUSIVITY",
      headline: "We partner with only one premier business per trade category in each local postcode.",
      subheadline: "Because our automated review and booking systems are built to dominate local Google search and outpace local competitors, we cannot deploy these unfair advantages for your rivals simultaneously.",
      badge: "One Operator Per Postcode Allocation",
      lockDescription: "Once an exclusive postcode allocation is claimed, that territory is permanently locked against direct competitors for the duration of our partnership.",
      buttonText: "Check Your Postcode Availability",
      buttonHref: "/book",
    },

    exclusivityLock: {
      eyebrow: "TERRITORIAL EXCLUSIVITY",
      headline: "We Partner With Selected Premier Local Businesses Per Postcode.",
      description: "To guarantee decisive local advantage, we partner with selected premier local businesses per postcode across Berkshire, the West Midlands & the UK. When we deploy our automated booking system for your brand, you hold an insurmountable speed advantage in your territory.",
    },

    // 8. Testimonials Section
    testimonials: {
      eyebrow: "PROVEN OPERATIONAL RESULTS",
      headline: "How premier local businesses eliminated DM chaos and scaled deposits.",
      subheadline: "Real outcomes from ambitious local operators who upgraded to our sub-second mobile storefronts and WhatsApp dispatch systems.",
      guarantee: "Strict Commitments · Zero Hidden Costs · Transparent Pricing",
      
      cohortCard: {
        badge: "LOCAL STOREFRONT & AUTOMATION BLUEPRINT",
        title: "High-Leverage Systems Built For Local Business Cash Flow",
        paragraph1: "We engineer high-converting mobile storefronts and automation engines for UK local businesses and service operators who refuse to surrender revenue to chaotic manual admin.",
        paragraph2: "Upfront Stripe deposit collection, sub-1-second mobile performance, instant WhatsApp alerts, and automated Google review engines included as standard.",
        paragraph3: "Single one-off setup fee (£495–£1,450) or transparent flat monthly support. Zero hidden charges, zero fine-print lock-in contracts.",
        enquiryCtaText: "To inspect your current order bottlenecks and test a live prototype, book your free 15-minute diagnostic audit below or message us directly on WhatsApp.",
      },

      trustPoints: [
        "Sub-1-Second Mobile Page Speed",
        "3-Tap Booking Engine with Instant Deposit",
        "Instant Smartphone WhatsApp Alerts",
      ],

      items: [
        {
          quote: "We used to lose 4–5 high-value client enquiries every single week because we were busy on-site and couldn't reply to DMs instantly. Mercian deployed an automated booking engine with WhatsApp notifications in 6 days. We now capture non-refundable upfront deposits before any consultation hits our diary.",
          author: "Sarah M.",
          role: "Managing Director",
          location: "Vanguard Client Operations · West Midlands",
          metric: "+38% Upfront Revenue",
        },
        {
          quote: "The automated intake system and instant WhatsApp routing completely eliminated our late-night enquiry chasing. Customers select their package, submit their specifications, and pay their deposit online. Our team only speaks with qualified decision-makers.",
          author: "Marcus T.",
          role: "Principal Operator",
          location: "Sovereign Commercial Group · Warwickshire",
          metric: "14.5 Hrs Saved / Wk",
        },
      ],
    },

    // 7. Pricing Tiers
    pricing: {
      eyebrow: "TRANSPARENT COMMERCIAL PRICING",
      headline: "Zero Hidden Retainers. Clear Fixed Engagements.",
      subheadline: "Choose between our one-off capital deployment tiers, flexible ongoing maintenance packages, or performance-aligned revenue share partnerships.",
      setupFeeDisclaimer: "All setup tiers include complete bespoke build, mobile optimisation, WhatsApp alert configuration, and 30–90 days included technical support.",
      monthlyDisclaimer: "Zero long-term lock-in contracts. Upgrade, downgrade, or cancel maintenance at any time with 30 days notice.",
      revenueShareDisclaimer: "Subject to business qualification and verified monthly digital transaction volume. Includes zero upfront design risk.",
    },

    // 8. Lead Capture / Postcode Lock
    leadCapture: {
      eyebrow: "TERRITORIAL POSTCODE AUDIT",
      headline: "Verify if your local territory and category are still available.",
      subheadline: "Enter your postcode below to run a real-time availability check and schedule your 15-minute diagnostic audit with our engineering team.",
      postcodePlaceholder: "e.g. SL4 1PD or B91 3QJ",
      businessNamePlaceholder: "Your Business Name",
      phonePlaceholder: "Your WhatsApp / Mobile Number",
      submitButtonText: "Check Territory & Request Audit",
      guaranteeText: "100% Free · Zero Obligation · Live Prototype Demonstration Included",
      
      consultationBooking: {
        headline: "Book Your 15-Minute Diagnostic Audit",
        subheadline: "Pick a time on our calendar. We will review your current customer intake process, demonstrate a live prototype tailored to your business, and show you exactly where enquiries are leaking.",
        calendarPlaceholder: "Select a date and time slot from our live diary below.",
        enquiryCtaText: "To inspect your current order bottlenecks and test a live prototype, book your free 15-minute diagnostic audit below or message us directly on WhatsApp.",
      },

      trustPoints: [
        "Sub-1-Second Mobile Page Speed",
        "3-Tap Booking Engine with Instant Deposit",
        "Instant Smartphone WhatsApp Alerts",
      ],
    },

    // 9. FOMO Close & CTA Section
    cta: {
      headline: "Ready to stop losing orders in DMs and automate your business?",
      subheadline: "Message us directly on WhatsApp or book a 15-minute diagnostic call to see an interactive prototype tailored to your exact services and workflow.",
      buttonText: "Book Your 15-Min Audit",
      whatsappButtonText: "Chat on WhatsApp",
    },

    // 10. FAQ Section
    faq: {
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      headline: "Direct Answers. Zero Jargon.",
      description: "Everything you need to know about our mobile storefronts, booking engines, WhatsApp dispatch, and commercial terms.",
      faqs: [
        {
          question: "Do I require technical skills to operate this system?",
          answer: "None whatsoever. All booking notifications arrive directly on the WhatsApp application you already use every day. If you can read a text message, you can manage your operations seamlessly.",
        },
        {
          question: "How do custom booking engines and deposit capture function?",
          answer: "Customers select service options, project scopes, custom requirements, and delivery/appointment dates online, paying a mandatory deposit via Apple Pay or Card before the booking is locked into your schedule.",
        },
        {
          question: "Does this synchronise with my existing calendar and accounting tools?",
          answer: "Yes. We automatically synchronise bookings and appointment dates to your Google or Outlook Calendar and generate customer records and invoice drafts automatically.",
        },
        {
          question: "How quickly can my storefront and automation go live?",
          answer: "Your bespoke mobile storefront, 3-tap booking engine, and WhatsApp alert engine are configured, rigorously tested, and launched in 7 business days.",
        },
        {
          question: "Can I update services, packages, or pricing?",
          answer: "Yes. You can request package adjustments, new portfolio photo uploads, or price updates at any time, with complimentary edits included in our support.",
        },
      ],
    },
  },

  // Services Page Copy (`/services`)
  servicesPage: {
    headerTitle: "Unread DMs, unpaid cancellations, and zero reviews are bleeding your revenue.",
    headerHighlight: "Here is the solution.",
    headerSubtitle: "We replace manual admin drag with an automated engine that captures orders, locks deposits, alerts your phone, and extracts 5-star Google reviews 24/7.",
    objectionCallout: "Traditional agencies take months to build static websites that still require manual order taking. Our 7-day protocol delivers an automated revenue engine ready to convert.",
    
    list: [
      {
        title: "Sub-Second Mobile Storefronts",
        description: "Over 85% of local customers order from their smartphones whilst browsing on Instagram or Google.",
        outcome: "Sub-1-Second Mobile Load Speed",
        tagline: "Convert Impulsive Mobile Browsers Into Paid Orders.",
        overview: "Your storefront loads in under 1 second on any smartphone, establishing instant local authority and guiding customers effortlessly into 3-tap checkout.",
        features: [
          { name: "Mobile-First Storefront Architecture", description: "Bespoke layout optimised for frictionless mobile ordering." },
          { name: "Sub-1-Second Load Speed", description: "Loads instantaneously so high-intent visitors never bounce to a competitor." },
          { name: "Local Google Maps & Search Dominance", description: "Structured schema built to rank your brand at the summit of local search." },
          { name: "Direct WhatsApp & Call Triggers", description: "Frictionless gateways engineered for instant customer enquiries." },
        ],
        ctaText: "Book 15-Min Audit",
        ctaHref: "/book",
      },
      {
        title: "3-Tap Booking Engines & Instant Deposits",
        description: "Unconfirmed enquiries and endless DM negotiations consume hours and produce costly cancellations.",
        outcome: "24/7 Bespoke Configuration & Deposit Capture",
        tagline: "Lock Non-Refundable Deposits Automatically.",
        overview: "Customers customise project options, service tiers, package scope, and dates online 24/7, paying a mandatory deposit via Apple Pay or Card to confirm the booking before it reaches your diary.",
        features: [
          { name: "Interactive Scope & Package Selector", description: "Customisable dropdowns for service tiers, project notes, and file uploads." },
          { name: "Upfront Deposit Gateway", description: "Securely capture non-refundable deposits via Apple Pay, Google Pay, or Card." },
          { name: "Automated Calendar Scheduling", description: "Blocks booked event or appointment slots automatically to prevent double-bookings." },
          { name: "3-Tap Mobile Checkout", description: "Frictionless checkout engineered to maximise completed bookings." },
        ],
        ctaText: "Book 15-Min Audit",
        ctaHref: "/book",
      },
      {
        title: "Instant Smartphone WhatsApp Dispatch",
        description: "You cannot manage complicated desktop software whilst fulfilling orders, working on-site, or serving clients.",
        outcome: "Real-Time Mobile Order Dispatch",
        tagline: "Sub-Second Alerts Straight To Your Smartphone.",
        overview: "The instant a customer submits a booking or pays a deposit, an instant WhatsApp notification lands on your phone with full specifications, client notes, and scheduled dates.",
        features: [
          { name: "Sub-0.4s WhatsApp Alerts", description: "Complete booking specifications dispatched straight to your phone instantaneously." },
          { name: "Automated Customer Confirmation", description: "Dispatches an instant professional confirmation message to the customer." },
          { name: "Accounting & CRM Synchronisation", description: "Automatically creates customer records and invoice drafts in Xero / QuickBooks." },
          { name: "Zero Technical Friction", description: "Operates seamlessly on the WhatsApp application you already use every day." },
        ],
        ctaText: "Book 15-Min Audit",
        ctaHref: "/book",
      },
      {
        title: "Automated 5-Star Google Review Extraction",
        description: "Competitors with inferior craftsmanship win customers solely because they possess more Google reviews.",
        outcome: "Systematic 5-Star Review Generation",
        tagline: "Build Undisputed Local Search Dominance On Autopilot.",
        overview: "An automated trigger invites delighted customers to leave a 5-star Google review immediately after their project or order is completed, steadily elevating your local ranking.",
        features: [
          { name: "Intelligent Review Trigger", description: "Polite automated message dispatched immediately following completion." },
          { name: "1-Tap Direct Google Review Gateway", description: "Directs customers straight into the 5-star Google review dialogue in one tap." },
          { name: "Private Feedback Filter", description: "Intercepts any minor customer questions privately before public posting." },
          { name: "Compounding Search Authority", description: "Watch your 5-star Google reviews compound booking after booking." },
        ],
        ctaText: "Book 15-Min Audit",
        ctaHref: "/book",
      },
    ],
  },

  // Process Page Copy (`/process`)
  processPage: {
    headerTitle: "You do not have months to wait for a traditional website.",
    headerHighlight: "Live in 7 Days",
    headerSubtitle: "From our initial 15-minute diagnostic audit to a live automated storefront and WhatsApp dispatch engine in 7 days. Zero operational hassle.",
    steps: [
      {
        number: "01",
        title: "Step 1: The 15-Minute Diagnostic Audit",
        sub: "Pinpointing booking haemorrhages and manual bottlenecks.",
        details: "We analyse your current customer intake workflow, DM bottlenecks, and payment chasing to identify precisely where revenue is escaping.",
        deliverable: "Custom Automation Roadmap",
      },
      {
        number: "02",
        title: "Step 2: Storefront & 3-Tap Booking Engine Configuration",
        sub: "Engineering your high-performance mobile storefront.",
        details: "We build your mobile storefront and configure your 3-tap booking engine with automated deposit collection and calendar slot locking.",
        deliverable: "Interactive Storefront Architecture",
      },
      {
        number: "03",
        title: "Step 3: WhatsApp Dispatch & Review Engine Linkup",
        sub: "Connecting sub-second mobile alerts and review triggers.",
        details: "We link instant WhatsApp notifications straight to your smartphone and configure your automated Google review extraction engine.",
        deliverable: "Live Verified Dispatch System",
      },
      {
        number: "04",
        title: "Step 4: Commercial Launch in 7 Days",
        sub: "Going live with complete operational certainty.",
        details: "Your engine goes live. It captures custom bookings and locks deposits 24/7 whilst you focus entirely on delivering exceptional craftsmanship.",
        deliverable: "Live Storefront & Ongoing Support",
      },
    ],
  },

  // Portfolio Page Copy (`/portfolio`)
  portfolioPage: {
    headerTitle: "Explore interactive prototypes for premier local businesses.",
    headerHighlight: "Built For Speed",
    headerSubtitle: "Engineered specifically for local business operators who demand sub-second speed and zero administrative drag.",
    noticeTitle: "Tailored To Your Exact Booking & Intake Workflow",
    noticeDescription: "Every system is configured to match the exact project specifications, deposit requirements, and dispatch workflows of your business. Test our live prototypes or book a 15-minute call for a bespoke demonstration.",
    constructionTitle: "Request A Bespoke Prototype Demo",
    constructionDescription: "Want to see how our 3-tap booking engines and WhatsApp alert systems function live for your brand? Schedule a 15-minute diagnostic audit.",
    emailLabel: "Business Email",
    nameLabel: "Your Name",
    submitBtnText: "Book 15-Min Audit",
    underConstructionText: "Request live demonstration: ",
  },

  // Pricing Page Copy (`/pricing`)
  pricingPage: {
    headerTitle: "A single lost project enquiry or bespoke booking costs far more than a system that secures them automatically.",
    headerHighlight: "Transparent Pricing",
    headerSubtitle: "Clear, predictable investment with zero hidden charges. Select the commercial structure that matches your cash flow.",
    performanceSLATitle: "Strict Commitments & Honest Guarantees",
    performanceSLASubtitle: "We Back Our Architecture With Clear Commitments",
    performanceSLAParagraph: "Your system is delivered operational in 7 business days, fully tested, with zero monthly lock-in contracts or unexpected fees.",
    roiCalculator: {
      eyebrow: "REVENUE RECOVERY CALCULATOR",
      title: "Calculate Your Saved Hours & Recovered Orders",
      description: "Discover how many hours of manual admin and lost customer enquiries an automated storefront recovers each month.",
      annualTimeLabel: "Annual Admin Hours Recovered",
      growthLiftLabel: "Est. Extra Orders Captured (+15%)",
      valueUnlockedLabel: "Total Annual Value Unlocked",
      valueDisclaimer: "Calculated based on 10 hours/week saved on manual admin + 15% conversion lift on order capture.",
      recommendedLabel: "Recommended Architecture:",
      recommendedSuffix: " Package",
      applyBtnText: "Book 15-Min Audit",
      currentRevenueLabel: "Current Monthly Turnover (£)",
      weeklyHoursLabel: "Weekly Hours Spent on DMs, Invoicing & Manual Phone Calls",
    },
    billingToggleSetup: "One-Off Setup",
    billingToggleRetainer: "Monthly Support",
    billingToggleRevenueShare: "% Revenue Share",
    oneTimeTiers: [
      {
        name: "Essential Storefront",
        price: "495",
        interval: "one-off setup fee",
        milestoneBreakdown: "Complete build & launch in 7 days",
        description: "A lightning-fast mobile storefront and automated lead intake engine with zero recurring lock-in.",
        features: [
          "3–5 Page Bespoke Mobile Storefront",
          "Local Google Search & Maps Optimisation",
          "24/7 Product / Service Enquiry Gateway",
          "Sub-1-Second Mobile PageSpeed Guarantee",
          "100% Code Ownership & Zero Lock-in",
          "30 Days Included Support",
        ],
        cta: "Book 15-Min Audit",
        featured: false,
        tag: "One-Off Setup",
      },
      {
        name: "Pro Automation Engine",
        price: "895",
        interval: "one-off setup fee",
        milestoneBreakdown: "Complete booking engine & WhatsApp alerts in 7 days",
        description: "Bespoke 3-tap booking engine with instant deposit capture, WhatsApp dispatch, and automated Google review extraction.",
        features: [
          "Everything in Essential Storefront",
          "3-Tap Custom Booking Engine & Deposit Capture",
          "Instant WhatsApp & SMS Order Notifications",
          "Automated 5-Star Google Review Engine",
          "Customer & Order Management Database",
          "60 Days Included Technical Support",
        ],
        cta: "Book 15-Min Audit",
        featured: true,
        tag: "One-Off Setup",
      },
      {
        name: "Full Custom Multi-Build",
        price: "1,450",
        interval: "one-off setup fee",
        milestoneBreakdown: "Complete custom architecture in 14 days",
        description: "Comprehensive multi-location or multi-service portal, custom package configurators, accounting auto-sync, and priority launch.",
        features: [
          "Everything in Pro Automation Engine",
          "Multi-Service / Multi-Location Architecture",
          "Custom Interactive Scope & Dynamic Price Configurators",
          "Accounting & CRM Auto-Synchronisation (Xero / QuickBooks)",
          "90 Days Technical Support & Staff Training",
          "Priority Dedicated Support Desk",
        ],
        cta: "Book 15-Min Audit",
        featured: false,
        tag: "One-Off Setup",
      },
    ],
    monthlyTiers: [
      {
        name: "Launch Support",
        price: "99",
        interval: "billed monthly (zero contract)",
        milestoneBreakdown: "Continuous speed & security monitoring",
        description: "Managed high-speed cloud hosting, speed audits, security, and content edits to keep your storefront operating at peak efficiency.",
        features: [
          "Managed Mobile Cloud Hosting & SSL Security",
          "Continuous Speed & Uptime Monitoring",
          "Complimentary Package & Price Adjustments",
          "Monthly Order & Conversion Analytics",
          "24/7 Critical System Monitoring",
          "Rapid Turnaround on Urgent Edits",
        ],
        cta: "Book 15-Min Audit",
        featured: false,
        tag: "Flat Monthly",
      },
      {
        name: "Growth & Maintenance",
        price: "195",
        interval: "billed monthly (zero contract)",
        milestoneBreakdown: "Active WhatsApp & booking engine maintenance",
        description: "Includes active WhatsApp alert maintenance, deposit gateway updates, and promotional package launches.",
        features: [
          "Everything in Launch Support",
          "Active WhatsApp Alert & Webhook Maintenance",
          "Booking Engine & Calendar Synchronisation Care",
          "Seasonal Promotional Campaigns & Package Config",
          "Unlimited Package, Content & Photo Edits",
          "Priority Support SLA (<4 Hours Response)",
        ],
        cta: "Book 15-Min Audit",
        featured: true,
        tag: "Flat Monthly",
      },
      {
        name: "Full Managed Partner",
        price: "395",
        interval: "billed monthly (zero contract)",
        milestoneBreakdown: "Complete digital & automation management",
        description: "Full digital and automation governance for high-volume local operators or multi-branch service enterprises.",
        features: [
          "Everything in Growth & Maintenance",
          "CRM & Automated Revenue Pipeline Governance",
          "Bespoke Local Marketing & Promotional Funnel Builds",
          "Unlimited UI, Copywriting & Feature Edits",
          "Direct Founder Telephone Support Hotline",
          "Bi-Weekly Strategic Growth Consultations",
        ],
        cta: "Book 15-Min Audit",
        featured: false,
        tag: "Flat Monthly",
      },
    ],
    revenueShareTiers: [
      {
        name: "Starter Option",
        price: "5%",
        interval: "revenue share of website sales",
        milestoneBreakdown: "Low upfront deposit alignment",
        description: "Nominal setup deposit + 5% share of online sales generated through the platform.",
        features: [
          "Bespoke Mobile Storefront",
          "24/7 Online Order & Lead Capture System",
          "Upfront Deposit Collection Gateway",
          "Instant WhatsApp Notifications",
          "Shared Risk Alignment",
        ],
        cta: "Book 15-Min Audit",
        featured: false,
        tag: "% Revenue Share",
      },
      {
        name: "Pro Growth Option",
        price: "8%",
        interval: "revenue share of website sales",
        milestoneBreakdown: "Performance alignment model",
        description: "Complete order intake & automation deployment for 8% share of generated digital revenue.",
        features: [
          "Everything in Starter Option",
          "Customer & Order Database",
          "Fully Managed Cloud Hosting & Security",
          "Dedicated Priority Technical Support",
        ],
        cta: "Book 15-Min Audit",
        featured: true,
        tag: "% Revenue Share",
      },
      {
        name: "VIP Scale Option",
        price: "10%",
        interval: "revenue share of website sales",
        milestoneBreakdown: "Full scale partnership",
        description: "High-volume custom order engine + direct founder strategic support.",
        features: [
          "Everything in Pro Growth Option",
          "Multi-Service / Multi-Branch Architecture",
          "Direct Founder Telephone Support",
        ],
        cta: "Book 15-Min Audit",
        featured: false,
        tag: "% Revenue Share",
      },
    ],
    setupTiers: [
      {
        name: "Essential Mobile Storefront",
        price: "495",
        interval: "one-off setup fee",
        milestoneBreakdown: "Delivered & operational in 7 business days",
        description: "Bespoke mobile storefront, 24/7 enquiry intake, instant mobile notification, and local search optimisation.",
        features: [
          "3–5 Page Custom Mobile Storefront",
          "Sub-1-Second Mobile PageSpeed Guarantee",
          "24/7 Online Enquiry & Lead Capture System",
          "Local Google SEO & Schema Foundation",
          "100% Code Ownership & Zero Lock-In",
          "30 Days Included Post-Launch Support",
        ],
        cta: "Book 15-Min Audit",
        featured: false,
        tag: "One-Off Setup",
      },
      {
        name: "Pro Automation Engine",
        price: "895",
        interval: "one-off setup fee",
        milestoneBreakdown: "Delivered & operational in 7 business days",
        description: "Interactive 3-tap booking engine, instant WhatsApp phone alerts, automated deposit capture, and 5-star Google review engine.",
        features: [
          "Everything in Essential Storefront",
          "3-Tap Custom Booking Engine & Deposit Capture",
          "Instant WhatsApp & SMS Order Notifications",
          "Automated 5-Star Google Review Engine",
          "Customer & Order Database",
          "60 Days Included Support",
        ],
        cta: "Book 15-Min Audit",
        featured: true,
        tag: "One-Off Setup",
      },
      {
        name: "Full Custom Multi-Build",
        price: "1,450",
        interval: "one-off setup fee",
        milestoneBreakdown: "Complete custom architecture in 14 days",
        description: "Full multi-location or multi-service portal, custom package configurators, accounting auto-sync, and priority setup.",
        features: [
          "Everything in Pro Automation Engine",
          "Multi-Service / Multi-Location Architecture",
          "Custom Interactive Scope & Price Configurators",
          "Accounting / CRM Auto-Sync",
          "90 Days Technical Support & Training",
          "Priority Support Desk",
        ],
        cta: "Book 15-Min Audit",
        featured: false,
        tag: "One-Off Setup",
      },
    ],
    retainerTiers: [
      {
        name: "Launch Support",
        price: "99",
        interval: "billed monthly (zero contract)",
        milestoneBreakdown: "Continuous speed & security monitoring",
        description: "Managed hosting, speed audits, security, and content edits to keep your storefront fast and up to date.",
        features: [
          "Managed Mobile Hosting & SSL Security",
          "Weekly Speed & Security Monitoring",
          "Complimentary Package & Price Edits",
          "Monthly Order & Traffic Reports",
          "24/7 System Uptime Monitoring",
          "Fast Urgent Edit Turnaround",
        ],
        cta: "Book 15-Min Audit",
        featured: false,
        tag: "Flat Monthly",
      },
      {
        name: "Growth & Maintenance",
        price: "195",
        interval: "billed monthly (zero contract)",
        milestoneBreakdown: "Active WhatsApp & booking engine maintenance",
        description: "Includes WhatsApp notification maintenance, deposit system updates, and seasonal promotional campaigns.",
        features: [
          "Everything in Launch Support",
          "Active WhatsApp Alert & Webhook Maintenance",
          "Booking Engine & Calendar Maintenance",
          "Seasonal Campaigns & Special Packages",
          "Unlimited Package & Photo Edits",
          "Dedicated Priority Support SLA (<4 Hours)",
        ],
        cta: "Book 15-Min Audit",
        featured: true,
        tag: "Flat Monthly",
      },
      {
        name: "Full Managed Partner",
        price: "395",
        interval: "billed monthly (zero contract)",
        milestoneBreakdown: "Complete digital & automation management",
        description: "Complete digital management for growing local businesses or multi-branch service operators.",
        features: [
          "Everything in Growth & Maintenance",
          "CRM & Automated Pipeline Updates",
          "Custom Local Marketing & Ad Campaign Builds",
          "Unlimited UI, Copy & Promotion Edits",
          "Direct Founder Phone Support Hotline",
          "Bi-Weekly Growth Strategy Calls",
        ],
        cta: "Book 15-Min Audit",
        featured: false,
        tag: "Flat Monthly",
      },
    ],
  },

  // Contact Concierge Copy (`/contact`)
  contactPage: {
    headerTitle: "Stop letting high-intent enquiries get buried in unread DMs.",
    headerHighlight: "Direct Gateway",
    headerSubtitle: "Ready to inspect an automated storefront configured specifically for your services and intake workflow? Connect directly below.",
    supportEyebrow: "DIRECT ASSISTANCE",
    supportTitle: "Direct Human Response",
    supportDescription: "No automated ticket queues or overseas call centres. Speak directly with our lead automation engineers in Berkshire.",
    emailLabel: "Direct Email",
    phoneLabel: "Call or WhatsApp",
    slaLabel: "Response Standard",
    slaValue: "Replied Within 2 Business Hours",
    whatsNextTitle: "What Occurs Next?",
    whatsNextItems: [
      "Instant confirmation acknowledging your enquiry.",
      "Brief 15-minute diagnostic call to review your current intake bottlenecks.",
      "Live interactive prototype demonstration configured for your exact services.",
    ],
  },

  // Testimonials / Cohort Status Page Copy
  testimonialsPage: {
    headerTitle: "Quantified Results &",
    headerHighlight: "Verified Local Outcomes",
    headerSubtitle: "How premier local businesses and service operators capture more custom bookings and recover 10+ hours of manual admin each week.",
  },

  // Booking Page Copy (`/book`)
  bookPage: {
    clinicalEvaluationLabel: "15-Minute Operational Diagnostic",
    headerTitle: "Uncover precisely where your business is haemorrhaging",
    headerHighlight: "bookings, deposits, and billable hours.",
    headerSubtitle: "Reserve a 15-minute slot on our diary. We will dissect your current customer intake, DM friction, and payment capture, presenting the exact automation blueprint to resolve it.",
    trustItems: [
      "15-minute focused telephone consultation on your schedule",
      "Zero high-pressure sales pitch—pure operational clarity",
      "Guaranteed 7-day deployment timeline"
    ],
    socialProofQuote: "On this 15-minute call, we reveal the exact automation protocol that enables premier local businesses to lock deposits and harvest 5-star Google reviews on autopilot without wasting hours in DMs.",
    socialProofAuthor: "Mercian Wealth Standard",
  },
};
