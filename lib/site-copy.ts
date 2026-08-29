/**
 * lib/site-copy.ts
 *
 * Centralized Copy Registry for mercianwealth.com
 *
 * UK Construction, High-Ticket Trades & Premier Local Business Copy Standard.
 */

export const SITE_COPY = {
  // Global Meta Info
  metadata: {
    layout: {
      defaultTitle: "Mercian Wealth · AI Websites & Systems for Construction & Trade Businesses",
      titleTemplate: "%s · Mercian Wealth",
      description: "24/7 AI Quote Intake, instant WhatsApp van alerts & automated site-survey deposits for UK construction, renovation contractors & local trade businesses. Stop losing £10k+ jobs to missed calls."
    },
    home: {
      title: "Mercian Wealth · AI Websites & Systems for Construction & Trade Businesses",
      description: "24/7 AI Quote Intake, instant WhatsApp van alerts & automated site-survey deposits for UK construction, renovation contractors & local trade businesses. Stop losing £10k+ jobs to missed calls.",
    },
    services: {
      title: "Services · Mercian Wealth",
      description: "Sub-second mobile quote engines, 24/7 site survey booking, survey deposit capture, instant van WhatsApp dispatch, and automated 5-star review collection.",
    },
    process: {
      title: "Process · Mercian Wealth",
      description: "From our first 15-minute diagnostic call to live automated quote & deposit collection in 7 days. Zero operational hassle.",
    },
    portfolio: {
      title: "Portfolio · Mercian Wealth",
      description: "Test drive live interactive sandbox builds and explore custom web automation architectures engineered for UK construction & trade businesses.",
    },
    pricing: {
      title: "Pricing · Mercian Wealth",
      description: "Simple, transparent pricing with zero hidden fees. One upfront setup fee, flat monthly growth retainer, or revenue share.",
    },
    testimonials: {
      title: "Case Studies · Mercian Wealth",
      description: "Verified performance metrics, contractor case studies, and quantifiable operational outcomes from automated lead engines across the UK.",
    },
    contact: {
      title: "Contact · Mercian Wealth",
      description: "Stop letting missed calls on site and manual voicemail tag cost you high-ticket contracts. Request your free 15-minute diagnostic audit today.",
    },
    book: {
      title: "Book Audit · Mercian Wealth",
      description: "Pick a 15-minute slot with our founder to find out exactly where your business is leaking high-ticket leads while you work on site.",
    },
  },

  // Navbar Component
  navbar: {
    logo: "Mercian Wealth",
    links: [
      { label: "Services", href: "/services" },
      { label: "Process", href: "/process" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
    ],
    ctaText: "Book your free 15 minute audit",
    ctaHref: "/book",
  },

  // Homepage Sections
  homepage: {
    // 0. Live Telemetry Ticker
    telemetryTicker: {
      items: [
        "Missed calls while on scaffolding or driving?",
        "£10k+ extension leads lost in voicemail?",
        "Competitors winning local homeowner quotes?",
        "Stop losing high-ticket contracts while you work.",
      ]
    },

    // 1. Hero Section
    hero: {
      eyebrow: "AI WEBSITES & AUTOMATION FOR UK BUILDERS & TRADES",
      headline: "AI-Powered Websites That Capture £10k+ Quotes & Book Site Surveys 24/7.",
      subheadline: "You're on the scaffolding or driving the van—your competitors are answering your missed calls. We replace missed calls, buried texts, and late-night quote chasing with sub-second mobile quote engines, 24/7 site survey deposit collection, and instant WhatsApp alerts straight to your pocket.",
      primaryCtaText: "Claim Category Exclusivity & Free Audit",
      secondaryCtaText: "Test 3-Tap Quote Demo",
      proofBadge: "24/7 High-Ticket Lead Intake & Automated Site Survey Deposits",
      trustItems: [
        "Sub-1-Second Mobile Speed",
        "24/7 Automated Survey Deposits",
        "Instant Van WhatsApp Alerts",
        "Automated 5-Star Google Reviews",
      ],
      unsureText: "Book your free 15 minute audit to see how many hours and lost jobs we can recover for your trade business →",
    },

    // Divergence Comparison (The Two-Path Mechanic)
    divergenceComparison: {
      eyebrow: "TERRITORIAL COMPETITION",
      headline: "Local homeowners call 3 builders on Google. The first to reply in under 60 seconds wins.",
      subheadline: "The choice is stark: keep scribbling quote notes on scrap paper while power tools drown out your phone, or deploy an automated lead engine that scopes the project and locks the survey fee for you.",
      pathConventional: {
        badge: "MANUAL SCRAMBLE (DEFENSIVE)",
        title: "The Voicemail & Scrap Paper Scramble",
        subtitle: "Losing £5,000–£35,000 renovation projects to competitors while stuck on active job sites.",
        points: [
          "Missing 3–6 high-value quote calls every week because you cannot answer while working.",
          "Spending exhausting evenings returning voicemails after a 10-hour physical workday.",
          "Driving out for free site surveys only to find tire-kickers with zero real budget.",
          "0 Google reviews collected automatically, letting lesser rivals rank higher in local search.",
        ]
      },
      pathMercian: {
        badge: "AUTOMATED MONOPOLY (OFFENSIVE)",
        title: "The Mercian Trade Growth Engine",
        subtitle: "Instant mobile quoting, upfront survey deposits, and sub-60s smartphone alerts.",
        points: [
          "Homeowner specifies room specs, uploads photos & locks survey deposit 24/7.",
          "Instant WhatsApp dispatch hits your smartphone on site with complete job details.",
          "Sub-1-second mobile load speed captures the lead before they check another builder.",
          "Automated 5-star review request sent post-completion to cement #1 Google search ranking.",
        ],
        ctaText: "Claim your free 15 minute audit →",
      }
    },

    // 2. Deficit Diagnostic
    bottleneck: {
      eyebrow: "REVENUE LEAKAGE",
      headline: "An unanswered call isn't an inconvenience—it's a £15,000 donation to your biggest local competitor.",
      subheadline: "Every 10 minutes a high-ticket quote enquiry waits for a reply, your odds of winning the project plummet by 80%. Speed and automated qualification always win.",
      goldSlogan: "While rivals scramble with scrap paper and late-night voicemails, your automated storefront captures project specs, takes survey deposits, and alerts your phone while you work.",
      systemMode: "Mode: ",
      modeAutomated: "Automated Lead Engine",
      modeManual: "Manual Scramble",
      triggerBtnActive: "Deactivate Automated System",
      triggerBtnInactive: "Activate Automated System",
      diagnosticLink: "Book your free 15 minute audit →",
      
      cards: [
        {
          title: "Unanswered Calls While On Site",
          description: "High-value extension and renovation clients call while you are on a ladder or using power tools. By the time you check voicemail hours later, they have already booked a rival.",
        },
        {
          title: "Unpaid Site Visits & Tire-Kickers",
          description: "Wasting precious fuel and weekend hours driving to quote jobs for uncommitted leads with no budget or planning permission in place.",
        },
        {
          title: "Zero Reviews While Competitors Surge",
          description: "Delivering top-tier craftsmanship every week, but losing local Google search share because competitors have 100+ reviews collected automatically.",
        },
      ],
    },

    // 3. Commodity Trap
    commodityTrap: {
      eyebrow: "THE HARD TRUTH",
      headline: "Stop paying for passive contractor websites that act like static business cards.",
      description: "Generic DIY websites look cheap until you realize how many £10,000+ contracts they bleed every month. Slow load speeds, buried contact forms, and zero quote-qualification capabilities guarantee that your competitors win.",
    },

    // 4. Mercian Wealth Difference
    whyMercianWealth: {
      headline: "Built For UK Builders & Trade Specialists Who Play To Win.",
      description: "Your website should qualify project scopes, collect non-refundable site survey deposits, and dominate your local postcode on autopilot.",
      differentiators: [
        "Instant Project Scoping — Homeowners select extensions, lofts, or refits and reserve survey dates on mobile in under 30 seconds.",
        "Instant Van WhatsApp Alerts — Full project dimensions, postcodes, and deposit receipts delivered straight to your smartphone on site.",
        "Automatic 5-Star Review Engine — Collect verified Google reviews from happy clients automatically after job completion.",
      ],
      structuralRealityHeadline: "The Structural Choice",
      standardAgency: {
        title: "Standard Web Agency",
        items: [
          "Generic templates taking weeks or months to launch.",
          "No project scoping or survey deposit collection.",
          "No instant WhatsApp alerts for trade owners on site.",
          "Ongoing monthly fees for a site that sits idle.",
        ],
      },
      mercianWealth: {
        title: "Mercian Trade Lead Engine",
        items: [
          "Custom construction & trade storefront launched in 7 days.",
          "Upfront survey deposit collection built into checkout.",
          "Instant WhatsApp notification on every quote request.",
          "Automated Google review requests sent after every project.",
        ],
      },
    },

    // 5. Trend Adaptation Statement
    trendAdaptation: {
      eyebrow: "ALWAYS UP TO DATE",
      headline: "Your Lead Engine Runs 24/7 While You Build On Site.",
      description: "We handle hosting, security, CRM linkups, and content updates in the background. Your mobile storefront stays lightning-fast and ready to capture clients 365 days a year.",
    },

    // 6. Model Hint
    modelHint: {
      eyebrow: "TRANSPARENT PRICING",
      headline: "Simple Options Built For Trade Cash Flow.",
      description: "Choose the structure that fits your business best: one-time setup fee or flat monthly retainer with zero long-term commitments.",
    },

    // 7. Exclusivity Lock
    exclusivityLock: {
      eyebrow: "LOCAL CATEGORY LOCKOUT",
      headline: "We Only Partner With ONE Premier Contractor / Trade Specialist Per Postcode.",
      description: "To ensure total local market dominance, we enforce strict geographic territory limits. When we deploy our automated system for a builder, roofer, joiner, or local trade in your area, we do not take on their local rivals. You either lock down your territory today or compete against our system tomorrow.",
    },

    // 8. Flexible & Honest Pricing Structure
    testimonials: {
      eyebrow: "TRANSPARENT PRICING",
      headline: "Simple Pricing Options Built For Growth",
      subheadline: "One Upfront Setup Fee or Flat Monthly Retainer",
      guarantee: "Clear Promises · No Long Contracts · Transparent Pricing",
      
      cohortCard: {
        badge: "LOCAL CATEGORY LOCKOUT PIPELINE",
        title: "Ruthless Efficiency Built For Trade Business Cash Flow",
        paragraph1: "We build high-converting, automated lead engines for UK construction, renovation, and trade operators who refuse to lose high-ticket jobs to missed calls or manual admin.",
        paragraph2: "Upfront Stripe survey deposit collection, sub-1-second mobile performance, instant WhatsApp alerts, and automated Google review engines included out of the box.",
        paragraph3: "Single upfront setup fee or transparent flat monthly retainer. Zero hidden costs or long-term lock-in contracts.",
        enquiryCtaText: "To discuss your custom build and check category availability in your area, book your free 15 minute audit below.",
      },

      trustPoints: [
        "Category Exclusivity Policy",
        "Sub-1-Second Mobile Page Speed",
        "Instant Phone & WhatsApp Alerts",
      ],
    },

    // 9. FOMO Close & CTA Section
    cta: {
      headline: "The trade operators moving first in your postcode are locking up market share.",
      subheadline: "Book your 15-minute diagnostic call to analyze your lead leaks and claim your trade category slot before a local competitor takes it.",
      buttonText: "Claim Category Exclusivity & Free Audit",
    },

    // 10. FAQ Section
    faq: {
      eyebrow: "FAQ",
      headline: "Frequently Asked Questions",
      description: "Everything you need to know about our contractor build, site survey deposit capture, and pricing options.",
      faqs: [
        {
          question: "Do I need to be tech-savvy to manage this on site?",
          answer: "No. All notifications arrive directly on the phone or WhatsApp you already use in the van every day. If you can open a message, you can manage this.",
        },
        {
          question: "How do project scoping and survey deposits work?",
          answer: "Homeowners select their project type (extension, loft, roof, remodel), specify rough dimensions or upload photos, and pay a refundable or credited survey deposit before the booking is confirmed. You never drive to an unpaid tire-kicker again.",
        },
        {
          question: "Does this connect to my existing calendar and accounting software?",
          answer: "Yes. We automatically sync site survey bookings directly into your Google/Outlook Calendar and create draft quote/client records in Xero or QuickBooks UK.",
        },
        {
          question: "How fast can my construction storefront be live?",
          answer: "Your complete mobile quote engine and phone notification system are custom built, tested, and launched in 7 days.",
        },
        {
          question: "Can I update project prices or add new case studies?",
          answer: "Yes! You can request photo updates, new portfolio projects, or pricing changes anytime, and complimentary edits are included in our support.",
        },
      ],
    },
  },

  // Services Page Copy (`/services`)
  servicesPage: {
    headerTitle: "Missed enquiries, unpaid site visits, and manual quote-chasing are costing you thousands.",
    headerHighlight: "Here is what changes.",
    headerSubtitle: "We replace manual scramble with an automated lead engine that scopes projects, collects survey deposits, and alerts your phone 24/7.",
    objectionCallout: "Traditional website builders take weeks and still force you to handle bookings manually. Our 7-day process delivers a complete system ready to capture high-ticket contracts.",
    
    list: [
      {
        title: "Sub-Second Mobile Lead Engines",
        description: "90% of local homeowners search for builders, roofers, and trade specialists on their smartphones.",
        outcome: "Sub-1-Second Mobile Load Speed",
        tagline: "Turn Mobile Browsers Into Booked Projects.",
        overview: "Your site loads in under 1 second on any smartphone, establishing instant local authority and guiding homeowners directly into project scoping.",
        features: [
          { name: "Mobile-First Trade Design", description: "Tailored layout optimized for homeowners booking from smartphones." },
          { name: "Sub-1-Second Load Speed", description: "Loads instantly so visitors never bounce away to a rival contractor." },
          { name: "Local Search Optimization", description: "Built to help local customers find your business on Google Maps & search." },
          { name: "Tap-to-Quote & Tap-to-Call", description: "Frictionless buttons designed for fast mobile quote requests." },
        ],
        ctaText: "Book your free 15 minute audit",
        ctaHref: "/book",
      },
      {
        title: "24/7 Project Intake & Survey Deposits",
        description: "Unqualified tire-kickers and no-show site surveys drain your fuel, time, and sanity.",
        outcome: "24/7 Online Scoping & Deposit Capture",
        tagline: "Collect Survey Deposits Before You Turn The Ignition.",
        overview: "Homeowners specify project specs, dimensions, and preferred survey dates online 24/7, paying a survey deposit to confirm the booking before it hits your calendar.",
        features: [
          { name: "Interactive Scope Selector", description: "Dropdowns for extension types, room dimensions, and photo uploads." },
          { name: "Upfront Survey Deposit", description: "Securely collect survey fees via card, Apple Pay, or Google Pay." },
          { name: "Automatic Calendar Locking", description: "Blocks booked survey slots automatically so you never double-book." },
          { name: "3-Tap Mobile Checkout", description: "Fast checkout designed to maximize completed quote submissions." },
        ],
        ctaText: "Book your free 15 minute audit",
        ctaHref: "/book",
      },
      {
        title: "Instant Van WhatsApp Notifications",
        description: "You shouldn't have to log into complex desktop software while you're on a job site.",
        outcome: "Real-Time Mobile Project Alerts",
        tagline: "Immediate Alert Straight To Your Phone.",
        overview: "The second a homeowner submits a project or pays a survey deposit, an instant WhatsApp notification lands on your phone with full client details, address, and project specs.",
        features: [
          { name: "Instant WhatsApp Alerts", description: "Full project details sent straight to your phone as soon as a deposit is paid." },
          { name: "Auto-Reply Message Back", description: "Sends an instant friendly text to homeowners who call while tools are running." },
          { name: "Xero / QuickBooks Sync", description: "Automatically creates client contacts and invoice drafts." },
          { name: "Zero Tech Hassle", description: "Messages arrive on the smartphone you already use every day." },
        ],
        ctaText: "Book your free 15 minute audit",
        ctaHref: "/book",
      },
      {
        title: "Automated 5-Star Google Review Engine",
        description: "Competitors with inferior craftsmanship win jobs simply because they have more Google reviews.",
        outcome: "Automated Google Review Follow-Up",
        tagline: "Build 5-Star Local Dominance On Autopilot.",
        overview: "An automated message invites satisfied clients to leave a 5-star Google review right after their project is completed, building your search rank automatically.",
        features: [
          { name: "Smart Follow-Up Trigger", description: "Friendly automated text sent right after project sign-off." },
          { name: "1-Tap Direct Google Review Link", description: "Takes clients directly to your Google review box in one tap." },
          { name: "Private Feedback Filter", description: "Routes any minor snagging concerns privately to you first." },
          { name: "Continuous Search Authority", description: "Watch your 5-star Google reviews grow automatically project after project." },
        ],
        ctaText: "Book your free 15 minute audit",
        ctaHref: "/book",
      },
    ],
  },

  // Process Page Copy (`/process`)
  processPage: {
    headerTitle: "You don't have months to wait for a website.",
    headerHighlight: "Live in 7 Days",
    headerSubtitle: "From our first 15-minute call to live automated quote & survey collection in 7 days. Zero hassle.",
    steps: [
      {
        number: "01",
        title: "Step 1: The 15-Minute Audit",
        sub: "Identifying manual quote leaks.",
        details: "We review your current enquiry handling, missed calls on site, and quoting process to pinpoint where you are losing high-ticket contracts.",
        deliverable: "Custom Trade Action Plan",
      },
      {
        number: "02",
        title: "Step 2: Custom Build & Survey Deposit Setup",
        sub: "Building your high-performance lead engine.",
        details: "We build your mobile storefront and configure your project scoping and survey deposit capture system.",
        deliverable: "Storefront & Deposit Blueprint",
      },
      {
        number: "03",
        title: "Step 3: WhatsApp Dispatch & Accounting Linkup",
        sub: "Connecting instant on-site alerts.",
        details: "We link instant WhatsApp notifications straight to your smartphone and configure your automated Google review collector.",
        deliverable: "Live Verified Alert System",
      },
      {
        number: "04",
        title: "Step 4: Live Launch in 7 Days",
        sub: "Going live with complete peace of mind.",
        details: "Your system goes live! It begins capturing enquiries and taking survey deposits while you focus on building on site.",
        deliverable: "Live System & Ongoing Support",
      },
    ],
  },

  // Portfolio Page Copy (`/portfolio`)
  portfolioPage: {
    headerTitle: "See what an automated lead engine looks like for construction & trade businesses.",
    headerHighlight: "Built For Speed",
    headerSubtitle: "Engineered specifically for UK contractors and trade specialists who need instant speed and zero admin drag.",
    noticeTitle: "Tailored To Your Quoting Workflow",
    noticeDescription: "Every system is configured to match the exact quoting and site-survey workflow of a trade specialist. Rather than browsing generic templates, test our live prototypes or book a 15-minute call to see a demonstration tailored to your trade.",
    constructionTitle: "Book A Live System Demo",
    constructionDescription: "Want to see how our instant quote engines and WhatsApp alert systems work live? Schedule a 15-minute audit call.",
    emailLabel: "Business Email",
    nameLabel: "Your Name",
    submitBtnText: "Book your free 15 minute audit",
    underConstructionText: "Request live demonstration: ",
  },

  // Pricing Page Copy (`/pricing`)
  pricingPage: {
    headerTitle: "One missed £15,000 project a month costs far more than investing in a system that works.",
    headerHighlight: "Transparent Pricing",
    headerSubtitle: "Simple, transparent options with zero hidden fees. Pick the structure that fits your trade cash flow.",
    performanceSLATitle: "Clear Guarantees & Honest Promises",
    performanceSLASubtitle: "We Back Our Work With Clear Promises",
    performanceSLAParagraph: "Your system is delivered live in 7 days, fully tested, with zero monthly lock-in contracts or hidden surprises.",
    roiCalculator: {
      eyebrow: "Time & Revenue Calculator",
      title: "Calculate Your Saved Hours & Recovered Contracts",
      description: "See how many manual admin hours and lost projects an automated lead engine can save your trade business every month.",
      annualTimeLabel: "Annual Admin Hours Saved",
      growthLiftLabel: "Est. Extra High-Ticket Contracts (+15%)",
      valueUnlockedLabel: "Total Value Created",
      valueDisclaimer: "Calculated based on 12 hours/week saved + 15% conversion lift on quote & survey capture.",
      recommendedLabel: "Recommended Solution:",
      recommendedSuffix: " Option",
      applyBtnText: "Book your free 15 minute audit",
      currentRevenueLabel: "Current Monthly Turnover (£)",
      weeklyHoursLabel: "Weekly Hours Spent on Manual Admin & Voicemail",
    },
    billingToggleSetup: "One-Time Setup",
    billingToggleRetainer: "Monthly Retainer",
    billingToggleRevenueShare: "% Revenue Share",
    oneTimeTiers: [
      {
        name: "Essential Trade Storefront",
        price: "495",
        interval: "one-time setup fee",
        milestoneBreakdown: "Complete build & launch in 7 days",
        description: "A lightning-fast mobile quote website and lead capture system with zero recurring commitments.",
        features: [
          "3–5 Page Custom Mobile Trade Site",
          "Local Google Search & Maps Optimization",
          "24/7 Project Scope Intake Form",
          "Sub-1-Second Mobile Load Speed",
          "100% Code Ownership & Zero Lock-in",
          "30 Days Included Support",
        ],
        cta: "Book your free 15 minute audit",
        featured: false,
        tag: "One-Time Setup",
      },
      {
        name: "Pro Contractor Engine",
        price: "895",
        interval: "one-time setup fee",
        milestoneBreakdown: "Complete quote engine & WhatsApp alerts in 7 days",
        description: "Custom project quote builder with instant site survey deposit collection and WhatsApp alerts.",
        features: [
          "Everything in Essential Storefront",
          "24/7 Site Survey Booking & Deposit Capture",
          "Instant WhatsApp & SMS On-Site Notifications",
          "Automated 5-Star Google Review Engine",
          "Trade Customer & Project Database",
          "60 Days Included Support",
        ],
        cta: "Book your free 15 minute audit",
        featured: true,
        tag: "One-Time Setup",
      },
      {
        name: "Full Custom Multi-Trade Build",
        price: "1,495",
        interval: "one-time setup fee",
        milestoneBreakdown: "Complete multi-service automation in 14 days",
        description: "Full multi-service trade portal, custom cost calculators, Xero sync, and priority setup.",
        features: [
          "Everything in Pro Contractor Engine",
          "Multi-Trade / Multi-Location Architecture",
          "Custom Interactive Cost Calculators",
          "Xero / QuickBooks UK CRM Auto-Sync",
          "90 Days Technical Support & Staff Training",
          "Priority Support Desk",
        ],
        cta: "Book your free 15 minute audit",
        featured: false,
        tag: "One-Time Setup",
      },
    ],
    monthlyTiers: [
      {
        name: "Launch Support",
        price: "99",
        interval: "billed monthly (zero contract)",
        milestoneBreakdown: "Continuous speed & security monitoring",
        description: "Managed hosting, speed audits, security, and content edits to keep your trade site fast and up to date.",
        features: [
          "Managed Mobile Hosting & SSL Security",
          "Weekly Speed & Security Monitoring",
          "Complimentary Project & Price Edits",
          "Monthly Lead & Quote Telemetry Reports",
          "24/7 System Uptime Monitoring",
          "Fast Urgent Edit Turnaround",
        ],
        cta: "Book your free 15 minute audit",
        featured: false,
        tag: "Flat Monthly",
      },
      {
        name: "Growth & Maintenance",
        price: "195",
        interval: "billed monthly (zero contract)",
        milestoneBreakdown: "Active WhatsApp & survey maintenance",
        description: "Includes WhatsApp notification maintenance, survey deposit system updates, and seasonal campaigns.",
        features: [
          "Everything in Launch Support",
          "Active WhatsApp Alert & Webhook System",
          "Site Survey & Calendar Maintenance",
          "Seasonal Project Campaigns & Special Packages",
          "Unlimited Content & Portfolio Edits",
          "Dedicated Priority Support SLA (<4 Hours)",
        ],
        cta: "Book your free 15 minute audit",
        featured: true,
        tag: "Flat Monthly",
      },
      {
        name: "Full Managed Partner",
        price: "395",
        interval: "billed monthly (zero contract)",
        milestoneBreakdown: "Complete digital & automation management",
        description: "Complete digital management for growing construction firms or multi-van trade teams.",
        features: [
          "Everything in Growth & Maintenance",
          "CRM & Xero Pipeline Automation Updates",
          "Custom Local Marketing & Ad Campaign Builds",
          "Unlimited UI, Copy & Case Study Edits",
          "Direct Founder Phone Support Hotline",
          "Bi-Weekly Growth Strategy Calls",
        ],
        cta: "Book your free 15 minute audit",
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
        description: "Small setup deposit + 5% share of website sales generated.",
        features: [
          "Custom Mobile Trade Storefront",
          "24/7 Online Quote & Survey System",
          "Upfront Survey Deposit Collection",
          "Instant WhatsApp Notifications",
          "Shared Risk Alignment",
        ],
        cta: "Book your free 15 minute audit",
        featured: false,
        tag: "% Revenue Share",
      },
      {
        name: "Pro Growth Option",
        price: "8%",
        interval: "revenue share of website sales",
        milestoneBreakdown: "Performance alignment model",
        description: "Full booking system build for 8% share of website sales.",
        features: [
          "Everything in Starter Option",
          "Customer & Project Database",
          "Full Managed Hosting & Security",
          "Dedicated Priority Support",
        ],
        cta: "Book your free 15 minute audit",
        featured: true,
        tag: "% Revenue Share",
      },
      {
        name: "VIP Scale Option",
        price: "10%",
        interval: "revenue share of website sales",
        milestoneBreakdown: "Full scale partnership",
        description: "Complete high-volume quote engine + direct founder strategy.",
        features: [
          "Everything in Pro Growth Option",
          "Multi-Service Trade Architecture",
          "Direct Founder Phone Support",
        ],
        cta: "Book your free 15 minute audit",
        featured: false,
        tag: "% Revenue Share",
      },
    ],
    get setupTiers() {
      return this.oneTimeTiers
    },
    get retainerTiers() {
      return this.monthlyTiers
    },
  },

  // Contact Concierge Copy (`/contact`)
  contactPage: {
    headerTitle: "Stop letting missed calls on site and manual voicemail tag hold your trade back.",
    headerHighlight: "Get In Touch",
    headerSubtitle: "Have a question or ready to see how an automated lead engine works for your trade business? Connect directly below.",
    supportEyebrow: "Direct Support",
    supportTitle: "Fast Response Support",
    supportDescription: "No ticketing bots or long wait times. Speak directly with our lead automation developers.",
    emailLabel: "Email Support",
    phoneLabel: "Call or WhatsApp",
    slaLabel: "Fast Response Guarantee",
    slaValue: "Replied Within A Few Business Hours",
    whatsNextTitle: "What Happens Next?",
    whatsNextItems: [
      "Quick confirmation that we received your enquiry.",
      "Brief 15-minute call to review your current on-site workflow.",
      "Clear demonstration showing how automated quote capture works for your trade.",
    ],
  },

  // Testimonials / Cohort Status Page Copy
  testimonialsPage: {
    headerTitle: "Real Results &",
    headerHighlight: "Verified Contractor Outcomes",
    headerSubtitle: "How UK construction, renovation, and trade businesses capture £10k+ projects and save 12+ hours a week on autopilot.",
  },

  // Booking Page Copy (`/book`)
  bookPage: {
    clinicalEvaluationLabel: "Free 15-Minute Contractor Audit",
    headerTitle: "Find out exactly where your trade business is losing",
    headerHighlight: "high-ticket jobs and time.",
    headerSubtitle: "Pick a 15-minute slot on the calendar. We will review your current website, missed call leaks while on site, and survey booking system, and show you exactly what to fix.",
    trustItems: [
      "15-minute telephone call on your schedule",
      "Zero high-pressure sales pitch—just practical business answers",
      "Simple 7-day launch timeline"
    ],
    socialProofQuote: "On this 15-minute call, we will reveal the exact adjustments that allow local trade specialists in your area to capture survey deposits and 5-star Google reviews on autopilot without taking time away from active job sites.",
    socialProofAuthor: "Mercian Wealth Standard",
  },
}
