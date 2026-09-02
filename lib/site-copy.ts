/**
 * lib/site-copy.ts
 *
 * Centralized Copy Registry for mercianwealth.com
 *
 * Mobile Storefronts, 3-Tap Order Builders, WhatsApp Order Alerts & Review Automation
 * for Bakeries, Catering, Food Artisans & Local Services across Berkshire & the UK.
 */

export const SITE_COPY = {
  // Global Meta Info
  metadata: {
    layout: {
      defaultTitle: "Mercian Wealth · Storefronts, Automation & Growth Systems",
      titleTemplate: "%s · Mercian Wealth",
      description: "Mobile storefronts, 3-tap order builders, instant WhatsApp alerts & automated Google review systems for bakeries, catering businesses, food artisans & local services across Berkshire & the UK."
    },
    home: {
      title: "Mercian Wealth · Storefronts, Automation & Growth Systems",
      description: "Mobile storefronts, 3-tap order builders, instant WhatsApp alerts & automated Google review systems for bakeries, catering businesses, food artisans & local services across Berkshire & the UK.",
    },
    services: {
      title: "Services · Mercian Wealth",
      description: "Mobile storefronts, 3-tap order builders, instant WhatsApp order notifications, and automated 5-star Google review collection.",
    },
    process: {
      title: "Process · Mercian Wealth",
      description: "From our first 15-minute diagnostic call to a live mobile storefront and automated order dispatch in 7 days. Zero operational hassle.",
    },
    portfolio: {
      title: "Portfolio · Mercian Wealth",
      description: "Test drive live interactive sandbox storefronts and explore custom order builder architectures engineered for local businesses and food artisans.",
    },
    pricing: {
      title: "Pricing · Mercian Wealth",
      description: "Simple, transparent pricing with zero hidden fees. One upfront setup fee (£495–£1,450) or flat monthly growth retainer.",
    },
    testimonials: {
      title: "Case Studies · Mercian Wealth",
      description: "Verified operational outcomes and automated lead engines across Berkshire and the UK.",
    },
    contact: {
      title: "Contact · Mercian Wealth",
      description: "Stop losing orders in buried DMs and manual message tags. Request your free 15-minute diagnostic audit or message us on WhatsApp.",
    },
    book: {
      title: "Book Audit · Mercian Wealth",
      description: "Pick a 15-minute slot to see how many hours and lost orders an automated storefront can save your local business.",
    },
  },

  // Navbar Component
  navbar: {
    logo: "Mercian Wealth",
    tagline: "Storefronts · Automation · Growth",
    links: [
      { label: "What We Build", href: "/services" },
      { label: "Process", href: "/process" },
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
        "Orders getting lost in Instagram DMs & voicemails?",
        "Chasing deposits manually while prepping orders?",
        "Local customers ordering from competitors on Google?",
        "Automate your storefront, alerts & reviews in 7 days.",
      ]
    },

    // 1. Hero Section
    hero: {
      eyebrow: "STOREFRONTS · AUTOMATION · GROWTH",
      headline: "Storefronts, automation, and growth systems for local businesses.",
      subheadline: "We build sub-second mobile storefronts, 3-tap order builders, instant WhatsApp alerts, and automated Google review systems for bakeries, catering businesses, food artisans, and local services across Berkshire & the UK.",
      primaryCtaText: "Message on WhatsApp",
      primaryCtaHref: "https://wa.me/447851055929",
      secondaryCtaText: "Book a 15-Min Call",
      secondaryCtaHref: "/book",
      proofBadge: "3-Tap Mobile Checkout · Instant WhatsApp Alerts · Automated 5★ Reviews",
      trustItems: [
        "Sub-1-Second Mobile Storefronts",
        "3-Tap Custom Order Builders",
        "Instant WhatsApp Dispatch Alerts",
        "Automated 5-Star Google Reviews",
      ],
      unsureText: "Message us directly on WhatsApp or book a 15-minute call to see what your automated storefront looks like →",
    },

    // Divergence Comparison (The Two-Path Mechanic)
    divergenceComparison: {
      eyebrow: "OPERATIONAL CHOICE",
      headline: "Customers order in seconds when it's easy. Friction sends them straight to competitors.",
      subheadline: "The choice is stark: keep juggling messy DMs, missed calls, and manual bank transfers, or deploy a streamlined storefront that takes orders, locks deposits, and alerts your phone 24/7.",
      pathConventional: {
        badge: "MANUAL JUGGLE (ADMIN DRAG)",
        title: "The DM & Scrap Paper Scramble",
        subtitle: "Losing custom celebration orders and catering bookings while in the kitchen or on site.",
        points: [
          "Losing 5–10 orders a week because customers wait hours for a reply in Instagram DMs.",
          "Spending exhausting evenings checking manual bank transfers and calculating quotes.",
          "Dealing with no-shows and unpaid cancellations on custom orders.",
          "Zero Google reviews collected automatically, letting rivals rank higher on Google Maps.",
        ]
      },
      pathMercian: {
        badge: "AUTOMATED SYSTEM (EFFICIENCY)",
        title: "The Mercian Growth Engine",
        subtitle: "Instant 3-tap ordering, upfront deposit capture, and sub-60s WhatsApp alerts.",
        points: [
          "Customers customize flavors, sizes & dates online 24/7, paying deposits instantly via Apple Pay/Card.",
          "Instant WhatsApp dispatch hits your smartphone with full order specs and pickup/event date.",
          "Sub-1-second mobile load speed captures customers before they bounce elsewhere.",
          "Automated 5-star review request sent post-delivery to cement #1 local Google Maps ranking.",
        ],
        ctaText: "Book your free 15 minute audit →",
      }
    },

    // 2. Deficit Diagnostic
    bottleneck: {
      eyebrow: "REVENUE LEAKAGE",
      headline: "An unanswered enquiry isn't an inconvenience—it's lost revenue given to a competitor.",
      subheadline: "Every 10 minutes a custom order or service enquiry waits for a reply, the likelihood of completing the booking drops sharply. Speed and frictionless ordering always win.",
      goldSlogan: "While competitors juggle scrap paper and buried DMs, your automated storefront captures custom orders, collects deposits, and alerts your phone while you work.",
      systemMode: "Mode: ",
      modeAutomated: "Automated Storefront Engine",
      modeManual: "Manual Scramble",
      triggerBtnActive: "Deactivate Automated System",
      triggerBtnInactive: "Activate Automated System",
      diagnosticLink: "Book your free 15 minute audit →",
      
      cards: [
        {
          title: "Lost Orders in Buried DMs & Missed Calls",
          description: "Customers enquiry while you're baking, prepping, or on a job. By the time you reply hours later, they have already ordered from someone else.",
        },
        {
          title: "Chasing Manual Deposits & Bank Transfers",
          description: "Wasting hours texting back and forth to confirm flavor choices, event dates, and bank account details for upfront deposits.",
        },
        {
          title: "Zero Google Reviews While Rivals Rank Higher",
          description: "Delivering exceptional quality every week, but losing local Google search share because competitors have 100+ reviews collected automatically.",
        },
      ],
    },

    // 3. Commodity Trap
    commodityTrap: {
      eyebrow: "THE HARD TRUTH",
      headline: "Stop paying for static websites that don't take orders or capture deposits.",
      description: "Generic DIY websites look cheap until you realize how many orders they bleed every month. Slow mobile load speeds, buried contact forms, and lack of deposit automation ensure customers abandon checkout.",
    },

    // 4. Mercian Wealth Difference
    whyMercianWealth: {
      headline: "Built For Bakeries, Catering, Food Artisans & Local Services.",
      description: "Your website should showcase your products, configure custom orders, collect non-refundable deposits, and dominate local search on autopilot.",
      differentiators: [
        "3-Tap Mobile Order Builder — Customers configure options, flavors, dimensions & dates in under 30 seconds.",
        "Instant WhatsApp Dispatch Alerts — Full order specifications, allergen notes, and payment receipts delivered straight to your phone.",
        "Automatic 5-Star Review Engine — Collect verified Google reviews from delighted clients automatically after delivery.",
      ],
      structuralRealityHeadline: "The Structural Choice",
      standardAgency: {
        title: "Standard Web Agency",
        items: [
          "Generic templates taking weeks or months to build.",
          "No custom order builder or automated deposit collection.",
          "No instant WhatsApp alerts for business owners on the go.",
          "Ongoing monthly fees for a site that doesn't automate anything.",
        ],
      },
      mercianWealth: {
        title: "Mercian Local Growth Engine",
        items: [
          "Custom mobile storefront launched in 7 days.",
          "Upfront deposit capture built directly into 3-tap checkout.",
          "Instant WhatsApp notification on every single order or booking.",
          "Automated Google review requests sent after every completion.",
        ],
      },
    },

    // 5. Trend Adaptation Statement
    trendAdaptation: {
      eyebrow: "ALWAYS OPERATIONAL",
      headline: "Your Storefront Takes Orders 24/7 While You Focus On Quality.",
      description: "We handle hosting, security, WhatsApp webhooks, and updates in the background. Your mobile storefront stays fast and ready to convert customers 365 days a year.",
    },

    // 6. Model Hint
    modelHint: {
      eyebrow: "TRANSPARENT PRICING",
      headline: "Simple Options Built For Local Business Cash Flow.",
      description: "Choose the structure that fits your business: one-time setup fee (£495–£1,450) or flat monthly support with zero long-term commitments.",
    },

    // 7. Exclusivity Lock
    exclusivityLock: {
      eyebrow: "LOCAL AREA PARTNERSHIP",
      headline: "We Partner With Selected Premier Local Businesses Per Postcode.",
      description: "To ensure maximum local impact, we work closely with dedicated food artisans and local service providers across Berkshire & the UK. When we deploy our automated ordering system in your area, you gain an unfair local speed advantage.",
    },

    // 8. Pricing & Packages
    testimonials: {
      eyebrow: "TRANSPARENT PRICING",
      headline: "Simple Pricing Options Built For Growth",
      subheadline: "One Upfront Setup Fee or Flat Monthly Retainer",
      guarantee: "Clear Promises · No Hidden Fees · Transparent Pricing",
      
      cohortCard: {
        badge: "LOCAL STOREFRONT & AUTOMATION BLUEPRINT",
        title: "Streamlined Systems Built For Local Business Cash Flow",
        paragraph1: "We build high-converting mobile storefronts and automation engines for UK bakeries, catering businesses, food artisans, and local service providers who refuse to lose orders to messy manual admin.",
        paragraph2: "Upfront Stripe deposit collection, sub-1-second mobile performance, instant WhatsApp alerts, and automated Google review engines included out of the box.",
        paragraph3: "Single upfront setup fee (£495–£1,450) or transparent flat monthly support. Zero hidden costs or long-term lock-in contracts.",
        enquiryCtaText: "To discuss your custom build and test an interactive prototype, book your free 15 minute audit below or message us on WhatsApp.",
      },

      trustPoints: [
        "Sub-1-Second Mobile Page Speed",
        "3-Tap Order Builder with Instant Deposit",
        "Instant Smartphone WhatsApp Alerts",
      ],
    },

    // 9. FOMO Close & CTA Section
    cta: {
      headline: "Ready to stop losing orders in DMs and automate your business?",
      subheadline: "Message us directly on WhatsApp or book a 15-minute diagnostic call to see an interactive prototype tailored to your business.",
      buttonText: "Book Your 15-Min Audit",
      whatsappButtonText: "Chat on WhatsApp",
    },

    // 10. FAQ Section
    faq: {
      eyebrow: "FAQ",
      headline: "Frequently Asked Questions",
      description: "Everything you need to know about our mobile storefronts, order builder, WhatsApp alerts, and pricing options.",
      faqs: [
        {
          question: "Do I need technical skills to manage this?",
          answer: "No. All order alerts arrive directly on the WhatsApp account you already use every day. If you can read a WhatsApp text, you can run this.",
        },
        {
          question: "How do custom order builders and deposit capture work?",
          answer: "Customers select sizes, flavors, portion numbers, or service options, pick their desired date, and pay a secure deposit via Apple Pay or Card before the order is confirmed.",
        },
        {
          question: "Does this connect to my existing calendar or accounting tools?",
          answer: "Yes. We automatically sync bookings and pickup dates to your Google/Outlook Calendar and create customer records and invoices.",
        },
        {
          question: "How fast can my storefront and automation be live?",
          answer: "Your complete mobile storefront, 3-tap order builder, and WhatsApp alert system are custom configured, tested, and launched in 7 days.",
        },
        {
          question: "Can I update products, flavors, or prices?",
          answer: "Yes. You can request menu updates, new product photos, or price changes anytime, and complimentary edits are included in our support.",
        },
      ],
    },
  },

  // Services Page Copy (`/services`)
  servicesPage: {
    headerTitle: "Missed orders in DMs, manual payment chasing, and zero reviews are costing you sales.",
    headerHighlight: "Here is what changes.",
    headerSubtitle: "We replace manual admin with an automated system that takes orders, collects deposits, alerts your phone, and gathers 5-star reviews 24/7.",
    objectionCallout: "Traditional websites take weeks to build and still require manual order taking. Our 7-day process delivers a complete automated storefront ready to convert.",
    
    list: [
      {
        title: "Sub-Second Mobile Storefronts",
        description: "Over 85% of local customers order from their smartphones while browsing on Instagram or Google.",
        outcome: "Sub-1-Second Mobile Load Speed",
        tagline: "Turn Mobile Browsers Into Paid Orders.",
        overview: "Your storefront loads in under 1 second on any smartphone, establishing instant local authority and guiding customers directly into 3-tap checkout.",
        features: [
          { name: "Mobile-First Storefront Design", description: "Tailored layout optimized for frictionless mobile ordering." },
          { name: "Sub-1-Second Load Speed", description: "Loads instantly so visitors never bounce away to a competitor." },
          { name: "Local Google Maps & Search SEO", description: "Built to help local customers find your business on Google." },
          { name: "Direct WhatsApp & Call Buttons", description: "Frictionless buttons designed for instant customer enquiries." },
        ],
        ctaText: "Book 15-Min Audit",
        ctaHref: "/book",
      },
      {
        title: "3-Tap Order Builders & Instant Deposits",
        description: "Unconfirmed orders and endless DM back-and-forth drain your time and cause cancellations.",
        outcome: "24/7 Online Scoping & Deposit Capture",
        tagline: "Collect Deposits Upfront Automatically.",
        overview: "Customers customize flavors, sizes, catering counts, and dates online 24/7, paying a deposit via Apple Pay or Card to confirm the booking before it hits your calendar.",
        features: [
          { name: "Interactive Flavor & Scope Selector", description: "Customizable dropdowns for tiers, dietary notes, and photo uploads." },
          { name: "Upfront Deposit Checkout", description: "Securely collect deposits via Apple Pay, Google Pay, or Card." },
          { name: "Automatic Calendar Booking", description: "Blocks booked event or pickup slots automatically so you never double-book." },
          { name: "3-Tap Mobile Flow", description: "Fast checkout designed to maximize completed orders." },
        ],
        ctaText: "Book 15-Min Audit",
        ctaHref: "/book",
      },
      {
        title: "Instant Smartphone WhatsApp Alerts",
        description: "You shouldn't have to check complicated desktop software while you're prepping orders or working.",
        outcome: "Real-Time Mobile Order Alerts",
        tagline: "Immediate Alert Straight To Your Phone.",
        overview: "The second a customer submits an order or pays a deposit, an instant WhatsApp notification lands on your phone with complete details, allergen notes, and event date.",
        features: [
          { name: "Instant WhatsApp Alerts", description: "Full order details sent straight to your phone as soon as an order is placed." },
          { name: "Automated Instant Customer Confirmation", description: "Sends an instant friendly confirmation text to the customer." },
          { name: "Accounting & CRM Auto-Sync", description: "Automatically creates customer records and invoice drafts." },
          { name: "Zero Tech Hassle", description: "Messages arrive on the WhatsApp you already use every day." },
        ],
        ctaText: "Book 15-Min Audit",
        ctaHref: "/book",
      },
      {
        title: "Automated 5-Star Google Review Engine",
        description: "Competitors with inferior quality win customers simply because they have more Google reviews.",
        outcome: "Automated 5-Star Google Review Follow-Up",
        tagline: "Build 5-Star Local Dominance On Autopilot.",
        overview: "An automated message invites delighted customers to leave a 5-star Google review right after their order is fulfilled, building your local ranking automatically.",
        features: [
          { name: "Smart Review Trigger", description: "Friendly automated text sent right after order fulfillment." },
          { name: "1-Tap Direct Google Review Link", description: "Takes customers directly to your Google review box in one tap." },
          { name: "Private Feedback Filter", description: "Routes any minor customer questions privately to you first." },
          { name: "Continuous Search Authority", description: "Watch your 5-star Google reviews grow automatically order after order." },
        ],
        ctaText: "Book 15-Min Audit",
        ctaHref: "/book",
      },
    ],
  },

  // Process Page Copy (`/process`)
  processPage: {
    headerTitle: "You don't have months to wait for a website.",
    headerHighlight: "Live in 7 Days",
    headerSubtitle: "From our first 15-minute call to a live automated storefront and order notification system in 7 days. Zero hassle.",
    steps: [
      {
        number: "01",
        title: "Step 1: The 15-Minute Audit",
        sub: "Identifying order leaks and manual bottlenecks.",
        details: "We review your current ordering process, DM bottlenecks, and deposit collection to pinpoint where you are losing sales.",
        deliverable: "Custom Action Plan",
      },
      {
        number: "02",
        title: "Step 2: Custom Storefront & Order Builder Setup",
        sub: "Building your high-performance mobile storefront.",
        details: "We build your mobile storefront and configure your 3-tap order builder and automated deposit capture system.",
        deliverable: "Storefront & Order Blueprint",
      },
      {
        number: "03",
        title: "Step 3: WhatsApp Dispatch & Alert Linkup",
        sub: "Connecting instant mobile alerts.",
        details: "We link instant WhatsApp notifications straight to your smartphone and configure your automated Google review collector.",
        deliverable: "Live Verified Alert System",
      },
      {
        number: "04",
        title: "Step 4: Live Launch in 7 Days",
        sub: "Going live with complete peace of mind.",
        details: "Your system goes live! It begins capturing orders and taking deposits while you focus on delivering exceptional quality.",
        deliverable: "Live Storefront & Ongoing Support",
      },
    ],
  },

  // Portfolio Page Copy (`/portfolio`)
  portfolioPage: {
    headerTitle: "Explore interactive prototypes for bakeries, catering & local businesses.",
    headerHighlight: "Built For Speed",
    headerSubtitle: "Engineered specifically for food artisans and local service providers who need instant speed and zero admin drag.",
    noticeTitle: "Tailored To Your Ordering Workflow",
    noticeDescription: "Every system is configured to match the exact ordering and deposit workflow of your business. Test our live prototypes or schedule a 15-minute call to see a live demonstration tailored to your products.",
    constructionTitle: "Book A Live System Demo",
    constructionDescription: "Want to see how our 3-tap order builders and WhatsApp alert systems work live? Schedule a 15-minute audit call.",
    emailLabel: "Business Email",
    nameLabel: "Your Name",
    submitBtnText: "Book 15-Min Audit",
    underConstructionText: "Request live demonstration: ",
  },

  // Pricing Page Copy (`/pricing`)
  pricingPage: {
    headerTitle: "One lost catering order or celebration booking costs far more than investing in a system that works.",
    headerHighlight: "Transparent Pricing",
    headerSubtitle: "Simple, transparent options with zero hidden fees. Pick the structure that fits your business cash flow.",
    performanceSLATitle: "Clear Guarantees & Honest Promises",
    performanceSLASubtitle: "We Back Our Work With Clear Promises",
    performanceSLAParagraph: "Your system is delivered live in 7 days, fully tested, with zero monthly lock-in contracts or hidden surprises.",
    roiCalculator: {
      eyebrow: "Time & Revenue Calculator",
      title: "Calculate Your Saved Hours & Recovered Orders",
      description: "See how many manual admin hours and lost orders an automated storefront can save your business every month.",
      annualTimeLabel: "Annual Admin Hours Saved",
      growthLiftLabel: "Est. Extra Orders Captured (+15%)",
      valueUnlockedLabel: "Total Value Created",
      valueDisclaimer: "Calculated based on 10 hours/week saved + 15% conversion lift on order capture.",
      recommendedLabel: "Recommended Solution:",
      recommendedSuffix: " Option",
      applyBtnText: "Book 15-Min Audit",
      currentRevenueLabel: "Current Monthly Turnover (£)",
      weeklyHoursLabel: "Weekly Hours Spent on DMs, Invoicing & Phone Calls",
    },
    billingToggleSetup: "One-Time Setup",
    billingToggleRetainer: "Monthly Support",
    billingToggleRevenueShare: "% Revenue Share",
    oneTimeTiers: [
      {
        name: "Essential Storefront",
        price: "495",
        interval: "one-time setup fee",
        milestoneBreakdown: "Complete build & launch in 7 days",
        description: "A lightning-fast mobile storefront and lead capture system with zero recurring commitments.",
        features: [
          "3–5 Page Custom Mobile Storefront",
          "Local Google Search & Maps Optimization",
          "24/7 Product / Service Enquiry Form",
          "Sub-1-Second Mobile Load Speed",
          "100% Code Ownership & Zero Lock-in",
          "30 Days Included Support",
        ],
        cta: "Book 15-Min Audit",
        featured: false,
        tag: "One-Time Setup",
      },
      {
        name: "Pro Automation Engine",
        price: "895",
        interval: "one-time setup fee",
        milestoneBreakdown: "Complete order builder & WhatsApp alerts in 7 days",
        description: "Custom 3-tap order builder with instant deposit collection and WhatsApp notifications.",
        features: [
          "Everything in Essential Storefront",
          "3-Tap Custom Order Builder & Deposit Capture",
          "Instant WhatsApp & SMS Order Notifications",
          "Automated 5-Star Google Review Engine",
          "Customer & Order Database",
          "60 Days Included Support",
        ],
        cta: "Book 15-Min Audit",
        featured: true,
        tag: "One-Time Setup",
      },
      {
        name: "Full Custom Multi-Build",
        price: "1,450",
        interval: "one-time setup fee",
        milestoneBreakdown: "Complete custom architecture in 14 days",
        description: "Full multi-location or multi-service portal, custom menu builders, accounting auto-sync, and priority setup.",
        features: [
          "Everything in Pro Automation Engine",
          "Multi-Service / Multi-Location Architecture",
          "Custom Interactive Menu & Price Builders",
          "Accounting / CRM Auto-Sync",
          "90 Days Technical Support & Training",
          "Priority Support Desk",
        ],
        cta: "Book 15-Min Audit",
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
        description: "Managed hosting, speed audits, security, and content edits to keep your storefront fast and up to date.",
        features: [
          "Managed Mobile Hosting & SSL Security",
          "Weekly Speed & Security Monitoring",
          "Complimentary Menu & Price Edits",
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
        milestoneBreakdown: "Active WhatsApp & order builder maintenance",
        description: "Includes WhatsApp notification maintenance, deposit system updates, and seasonal menu promotions.",
        features: [
          "Everything in Launch Support",
          "Active WhatsApp Alert & Webhook Maintenance",
          "Order Builder & Calendar Maintenance",
          "Seasonal Campaigns & Special Packages",
          "Unlimited Menu & Photo Edits",
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
        description: "Complete digital management for growing food businesses or multi-branch service operators.",
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
    revenueShareTiers: [
      {
        name: "Starter Option",
        price: "5%",
        interval: "revenue share of website sales",
        milestoneBreakdown: "Low upfront deposit alignment",
        description: "Small setup deposit + 5% share of website sales generated.",
        features: [
          "Custom Mobile Storefront",
          "24/7 Online Order & Enquiry System",
          "Upfront Deposit Collection",
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
        description: "Full booking system build for 8% share of website sales.",
        features: [
          "Everything in Starter Option",
          "Customer & Order Database",
          "Full Managed Hosting & Security",
          "Dedicated Priority Support",
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
        description: "Complete high-volume order engine + direct founder strategy.",
        features: [
          "Everything in Pro Growth Option",
          "Multi-Service / Multi-Branch Architecture",
          "Direct Founder Phone Support",
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
        interval: "one-time setup fee",
        milestoneBreakdown: "Delivered & live in 7 business days",
        description: "Custom mobile storefront, 24/7 lead intake, instant mobile order dispatch, and Google Maps SEO.",
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
        tag: "One-Time Setup",
      },
      {
        name: "Pro Automation Engine",
        price: "895",
        interval: "one-time setup fee",
        milestoneBreakdown: "Delivered & live in 7 business days",
        description: "Interactive 3-tap order builder, instant WhatsApp phone alerts, automated deposit capture, and 5-star Google review engine.",
        features: [
          "Everything in Essential Storefront",
          "3-Tap Custom Order Builder & Deposit Capture",
          "Instant WhatsApp & SMS Order Notifications",
          "Automated 5-Star Google Review Engine",
          "Customer & Order Database",
          "60 Days Included Support",
        ],
        cta: "Book 15-Min Audit",
        featured: true,
        tag: "One-Time Setup",
      },
      {
        name: "Full Custom Multi-Build",
        price: "1,450",
        interval: "one-time setup fee",
        milestoneBreakdown: "Complete custom architecture in 14 days",
        description: "Full multi-location or multi-service portal, custom menu builders, accounting auto-sync, and priority setup.",
        features: [
          "Everything in Pro Automation Engine",
          "Multi-Service / Multi-Location Architecture",
          "Custom Interactive Menu & Price Builders",
          "Accounting / CRM Auto-Sync",
          "90 Days Technical Support & Training",
          "Priority Support Desk",
        ],
        cta: "Book 15-Min Audit",
        featured: false,
        tag: "One-Time Setup",
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
          "Complimentary Menu & Price Edits",
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
        milestoneBreakdown: "Active WhatsApp & order builder maintenance",
        description: "Includes WhatsApp notification maintenance, deposit system updates, and seasonal menu promotions.",
        features: [
          "Everything in Launch Support",
          "Active WhatsApp Alert & Webhook Maintenance",
          "Order Builder & Calendar Maintenance",
          "Seasonal Campaigns & Special Packages",
          "Unlimited Menu & Photo Edits",
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
        description: "Complete digital management for growing food businesses or multi-branch service operators.",
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
    headerTitle: "Stop letting orders get lost in DMs and manual message tag.",
    headerHighlight: "Get In Touch",
    headerSubtitle: "Have a question or ready to see how an automated storefront works for your business? Connect directly below.",
    supportEyebrow: "Direct Support",
    supportTitle: "Fast Response Support",
    supportDescription: "No ticketing bots or long wait times. Speak directly with our automation team.",
    emailLabel: "Email Support",
    phoneLabel: "Call or WhatsApp",
    slaLabel: "Fast Response Guarantee",
    slaValue: "Replied Within A Few Business Hours",
    whatsNextTitle: "What Happens Next?",
    whatsNextItems: [
      "Quick confirmation that we received your enquiry.",
      "Brief 15-minute call to review your current ordering workflow.",
      "Live demonstration showing how automated order intake works for your business.",
    ],
  },

  // Testimonials / Cohort Status Page Copy
  testimonialsPage: {
    headerTitle: "Real Results &",
    headerHighlight: "Verified Business Outcomes",
    headerSubtitle: "How local bakeries, caterers, and service providers capture more orders and save 10+ hours a week on autopilot.",
  },

  // Booking Page Copy (`/book`)
  bookPage: {
    clinicalEvaluationLabel: "Free 15-Minute Business Audit",
    headerTitle: "Find out exactly where your business is losing",
    headerHighlight: "orders, deposits, and time.",
    headerSubtitle: "Pick a 15-minute slot on the calendar. We will review your current website, DM bottlenecks, and ordering system, and show you exactly what to fix.",
    trustItems: [
      "15-minute telephone call on your schedule",
      "Zero high-pressure sales pitch—just practical business answers",
      "Simple 7-day launch timeline"
    ],
    socialProofQuote: "On this 15-minute call, we will reveal the exact system that allows local businesses in your area to capture deposits and 5-star Google reviews on autopilot without wasting hours in DMs.",
    socialProofAuthor: "Mercian Wealth Standard",
  },
};

