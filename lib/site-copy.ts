/**
 * lib/site-copy.ts
 *
 * Centralised Copy Registry for mercianwealth.com
 *
 * AI Automation Agency (AIA) — Voice Agents, Chatbots & Growth Infrastructure
 * Engineered for Premier Local Businesses, Trade Operators, Clinics & Commercial Services across the UK.
 */

export const SITE_COPY = {
  // Global Meta Info
  metadata: {
    layout: {
      defaultTitle: "Mercian Wealth · AI Voice, Chatbots & Automation for UK Businesses",
      titleTemplate: "%s · Mercian Wealth",
      description: "We deploy 24/7 AI voice receptionists, enquiry chatbots, email outreach engines, and hands-off workflow automation for UK local businesses. See a working prototype before committing.",
    },
    home: {
      title: "Mercian Wealth · AI Voice, Chatbots & Automation for UK Businesses",
      description: "Capture every lead, answer in seconds, and eliminate manual admin. 24/7 AI phone receptionists, enquiry chatbots, and automated workflows. Test a working prototype before you decide.",
    },
    services: {
      title: "AI Voice, Chatbots & Automation Systems · Mercian Wealth",
      description: "24/7 AI Inbound Phone Calling, Automated Customer Support Chatbots, Repetitive Admin Automation, Email Outreach, and High-Converting Web Platforms.",
    },
    process: {
      title: "AI Automation Deployment Protocol · Mercian Wealth",
      description: "From custom working prototype to fully deployed AI phone agent and automation workflows in 7 days. Zero business disruption.",
    },
    portfolio: {
      title: "AI Systems & Client Case Studies · Mercian Wealth",
      description: "Explore live AI voice callers, automated triage chatbots, and workflow engines deployed for UK local businesses.",
    },
    pricing: {
      title: "Engineered Systems & Retainer Pricing · Mercian Wealth",
      description: "Storefronts, voice automation, and managed growth infrastructure engineered for UK businesses. Transparent engineered scoping and aligned revenue-share partnerships.",
    },
    testimonials: {
      title: "Operational Outcomes & Verified ROI · Mercian Wealth",
      description: "Quantified revenue recovery, zero missed calls, and verifiable business ROI for UK service operators.",
    },
    contact: {
      title: "Direct Gateway · Mercian Wealth",
      description: "Connect directly with our UK team or request a custom working AI prototype for your business.",
    },
    book: {
      title: "Book an AI Discovery Call · Mercian Wealth",
      description: "Schedule a 15-minute call to discuss your business bottlenecks and test a live AI prototype before deciding.",
    },
  },

  // Navbar Component
  navbar: {
    logo: "Mercian Wealth",
    tagline: "AI Voice Receptionists · 24/7 Chatbots · Workflow Automation",
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
        "Unanswered customer calls go straight to your competitors in under 60 seconds.",
        "24/7 AI phone receptionists answer on ring one, qualify leads, and book live into your calendar.",
        "Intelligent chatbots answer enquiries instantly across web, WhatsApp, and social channels.",
        "Three core outcomes: more leads captured, faster response times, and less manual work on your end.",
      ]
    },

    // 1. Hero Section (Outcomes-First)
    hero: {
      eyebrow: "MORE LEADS · FASTER RESPONSE · LESS MANUAL WORK",
      headline: "We help local businesses stop losing jobs to whoever replies first.",
      subheadline: "24/7 AI phone receptionists, instant enquiry chatbots, automated email outreach, and hands-off admin workflows. More leads captured, faster response times, and less manual work on your end.",
      primaryCtaText: "Book a 15-Min Discovery Call",
      primaryCtaHref: "/book",
      secondaryCtaText: "See a free prototype of your AI system",
      secondaryCtaHref: "#prototype-modal",
      whatsappCtaText: "Message on WhatsApp",
      whatsappHref: "https://wa.me/447851055929",
      proofBadge: "More Leads Captured · Faster Response Times · Less Manual Work",
      trustItems: [
        "Every Call Answered 24/7",
        "Sub-60s Inbound Response",
        "Automated Calendar Bookings",
        "Zero Manual Admin Drag",
      ],
      unsureText: "Message directly on WhatsApp or test our live AI demos below →",
    },

    // 2. What Changed (SYSTEM I)
    whatChanged: {
      eyebrow: "WHAT CHANGED",
      headline: "The rules of customer acquisition shifted. Waiting is now an active choice to lose revenue.",
      subheadline: "Every business feels the shift in customer expectations. The operators who answer instantly capture market share while traditional setups leak lucrative jobs.",
      shifts: [
        {
          outcome: "Revenue Increased",
          tag: "INBOUND PHONE CAPTURE",
          title: "Customers Don't Leave Voicemails, They Call The Next Result",
          description: "When an inbound caller hits voicemail, 82% immediately hang up and dial your nearest competitor. An AI phone receptionist answers on ring one, answers questions, and locks the booking.",
        },
        {
          outcome: "Risk Removed",
          tag: "24/7 ENQUIRY TRIAGE",
          title: "High-Value Enquiries Arrive Outside Working Hours",
          description: "Over 45% of customer enquiries arrive after 6 PM, at weekends, or while you're busy on-site. Intelligent chatbots qualify requirements and secure appointments before Monday morning.",
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
          description: "Responding within 60 seconds increases conversion by up to 391%. In local services, the first business to engage and book the customer wins the job.",
        },
      ],
    },

    // Divergence Comparison (The Two-Path Mechanic)
    divergenceComparison: {
      eyebrow: "OPERATIONAL LEVERAGE",
      headline: "Delayed response is an unforced error. Answer in seconds, or lose the job to someone who will.",
      subheadline: "In local services, the first business to pick up the phone and confirm the booking secures the revenue. You can continue relying on voicemails and manual message tag—or deploy 24/7 AI systems that scale effortlessly.",
      pathConventional: {
        badge: "MANUAL DRAG · 5-FIGURE REVENUE LEAK",
        title: "The Traditional Setup",
        subtitle: "Losing high-ticket jobs while on-site, in meetings, or after hours.",
        points: [
          "Missed phone calls going straight to voicemail while busy on-site.",
          "Buried web contact forms left unread for hours or days.",
          "Hours spent playing manual phone/email tag to coordinate appointments.",
          "Cold quotes abandoned with zero automated follow-up calls.",
        ]
      },
      pathMercian: {
        badge: "AI AUTOMATION · 24/7 REVENUE CAPTURE",
        title: "The Mercian AI Infrastructure",
        subtitle: "Sub-second response, 24/7 call answering, and hands-off booking.",
        points: [
          "24/7 AI phone receptionist answering on ring one in natural, fluent English.",
          "Instant enquiry chatbot qualifying leads and booking live slots 24/7.",
          "Sub-60s automated outbound callbacks to revive quiet quotes.",
          "Direct smartphone WhatsApp alerts with full customer intake specs.",
        ],
      }
    },

    // 3. Bottleneck Analysis (SYSTEM II)
    bottleneck: {
      eyebrow: "WHERE REVENUE LEAKS",
      headline: "Four Places Your Business Leaks Revenue Every Single Week.",
      subheadline: "Most owners think they have a lead generation problem. In reality, they are losing customers who already want to buy, but hit friction before anyone replies.",
      goldSlogan: "Whilst competitors let enquiries sit in inboxes, your AI answers instantly, confirms details, and secures bookings.",
      systemMode: "Mode: ",
      modeAutomated: "AI Automation Active",
      modeManual: "Manual Reception Drag",
      triggerBtnActive: "Deactivate AI Engine",
      triggerBtnInactive: "Activate AI Engine",
      diagnosticLink: "Book a call →",
      cards: [
        {
          id: "time-leak",
          outcome: "Time Wasted",
          tag: "MISSED INBOUND CALLS",
          metric: "5–12 calls/wk",
          title: "Unanswered Phone Calls During Busy Hours",
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
          description: "Dozens of prospective clients who asked for a quote and went quiet, never receiving a follow-up call to revive the job.",
        },
      ],
    },

    // 4. Offer Mechanism (SYSTEM III)
    offerMechanism: {
      eyebrow: "THE OFFER PROTOCOL",
      headline: "Before we deploy your actual system, we build a working prototype of it.",
      subheadline: "You will never be asked to commit based on promises, slide decks, or vague proposals. You test your actual AI assistant running on your phone before any agreement.",
      steps: [
        {
          stepNumber: "01",
          title: "We build a working AI prototype specific to your business.",
          description: "Not a deck, not a proposal. Real phone agent, real chatbot flow, tailored to your exact services and pricing.",
          metric: "Real Business Logic",
        },
        {
          stepNumber: "02",
          title: "You test it directly on your own smartphone.",
          description: "Call the AI agent, test how it answers questions, check how it books appointments, and receive the instant WhatsApp alert.",
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
      eyebrow: "VERIFIED PROOF & WORKING CONCEPTS",
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
      description: "Your business should answer immediately, qualify requirements, and secure appointments 24/7 without requiring you to be glued to your phone.",
      founderQuoteHeadline: "Clear Outcomes. Zero Tool-Talk.",
      founderQuoteText: "We don't waste your time talking about models, vector stores, or technical jargon. We focus strictly on what changes for your bottom line: more leads captured, faster response times, fewer missed calls, and less time spent on repetitive admin. If an automation doesn't save hours, cut costs, or bring in revenue, it doesn't get deployed.",
      founderQuoteAuthor: "Founder & Lead Automation Engineer, Mercian Wealth",
      proofStats: [
        { label: "Response Time", value: "< 60 Seconds" },
        { label: "Call Coverage", value: "24/7/365" },
        { label: "Prototype-First", value: "Zero Risk" },
      ],
      differentiators: [
        "24/7 Voice & Chat Coverage — Answering every call and enquiry instantly in natural, polite British English.",
        "Working Prototype First — You test a live, functioning version of your AI agent on your smartphone before committing.",
        "Three Commercial Outcomes — Every deployment is engineered strictly to capture more leads, answer faster, or eliminate manual admin.",
      ],
      structuralRealityHeadline: "The Strategic Divide",
      standardAgency: {
        title: "Traditional Web / Admin Setup",
        items: [
          "Misses calls during busy hours or after closing, losing enquiries to rivals.",
          "Leaves website contact forms sitting unread for hours or days.",
          "Relies on manual staff time for repetitive scheduling and data entry.",
          "Lets issued quotes sit cold with zero structured follow-up calls.",
        ],
      },
      mercianWealth: {
        title: "Mercian Wealth AI Systems",
        items: [
          "24/7 AI Phone Receptionist answering on ring one and booking calendar slots.",
          "Intelligent Chatbots answering enquiries instantly across web & WhatsApp.",
          "Sub-60s automated outbound calls to follow up with new web leads immediately.",
          "Automated CRM sync, calendar confirmation, and instant WhatsApp owner alerts.",
          "Continuous managed optimization: prompt refinement, voice tuning, and monthly improvements.",
        ],
      },
    },

    // Trend Adaptation (Why Mercian Wealth)
    trendAdaptation: {
      eyebrow: "CONTINUOUS OPTIMIZATION",
      headline: "Voice Models & Prompts Refined Continuously.",
      description: "As customer questions evolve and new services launch, our engineering team audits your call logs and refines your conversational logic so your AI never stumbles.",
    },

    // Model Hint (Why Mercian Wealth)
    modelHint: {
      eyebrow: "ENTERPRISE TELEPHONY",
      headline: "Carrier-Grade UK Voice & SIP Infrastructure.",
      description: "Low-latency edge voice delivery (<550ms), carrier-grade call routing, conditional forwarding, and instant smartphone notifications with 99.98% availability.",
    },

    // 7. Testimonials / Cohort Data
    testimonials: {
      eyebrow: "PROVEN OPERATIONAL RESULTS",
      headline: "How UK Local Businesses Eliminated Missed Leads and Grew Revenue.",
      subheadline: "Real outcomes from trade operators, private clinics, and commercial services who deployed our 24/7 AI voice and automation systems.",
      guarantee: "Strict Performance SLAs · Sub-Second Response Standards · Transparent Retainers",
      cohortCard: {
        badge: "AI INFRASTRUCTURE BLUEPRINT",
        title: "Autonomous Revenue Operations Built For Direct Cash Flow",
        paragraph1: "We deploy 24/7 AI voice receptionists, enquiry chatbots, and hands-off workflow automations for UK businesses who refuse to lose customers to slow response.",
        paragraph2: "Ring-one pickup, automated calendar synchronization, instant smartphone WhatsApp alerts, and automated review collection included as standard.",
        paragraph3: "Fixed Setup (£495–£1,695) + Flat Managed Retainers (£195–£695/mo). Zero lock-in, clear 99.98% uptime SLA.",
        enquiryCtaText: "To review your operations and test a working AI prototype tailored to your business, book your 15-minute call below or message us directly on WhatsApp.",
      },
      trustPoints: [
        "24/7 Voice & Chat Coverage",
        "Sub-60s Inbound Response",
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
      headline: "Unanswered calls and slow callbacks leak revenue. Instant response closes deals.",
      subheadline: "In local services, speed-to-lead is everything. The business that answers within 60 seconds wins the customer 78% of the time.",
    },

    // 7. Pricing Tiers
    pricing: {
      eyebrow: "AI AUTOMATION SYSTEMS & MANAGED RETAINERS",
      headline: "Predictable Investment. Measurable Commercial Return.",
      subheadline: "Choose between our turnkey AI implementation packages and flat monthly management retainers. Every build includes custom configuration, live testing, calendar integrations, and instant phone alerts.",
      setupFeeDisclaimer: "Implementation setup covers bespoke prompt architecture, phone number provisioning, CRM and calendar integration, custom triage logic, and rigorous testing.",
      monthlyDisclaimer: "Management retainers cover dedicated AI voice and model compute, telephony infrastructure, webhook monitoring, prompt tuning, and continuous workflow optimization with zero lock-in contracts.",
      revenueShareDisclaimer: "Custom multi-location and enterprise specifications available on request.",
    },

    // 8. Lead Capture / Postcode Lock
    leadCapture: {
      eyebrow: "TERRITORIAL AVAILABILITY AUDIT",
      headline: "Verify if your sector and territory are still available.",
      subheadline: "Enter your postcode and industry below to run a real-time availability check and schedule your 15-minute AI consultation with our team.",
      postcodePlaceholder: "e.g. SL4 1PD or B91 3QJ",
      businessNamePlaceholder: "Your Business Name",
      phonePlaceholder: "Your WhatsApp / Mobile Number",
      submitButtonText: "Check Availability & Request Prototype",
      guaranteeText: "100% Free · Zero Obligation · Live Interactive Prototype Included",
      
      consultationBooking: {
        headline: "Book Your 15-Minute AI Discovery Call",
        subheadline: "Pick a time on our live diary. We will analyse your current response times, demonstrate a live AI prototype tailored to your services, and show you exactly where enquiries are leaking.",
        calendarPlaceholder: "Select a date and time slot from our live diary below.",
        enquiryCtaText: "To review your operations and test a working AI prototype configured for your business, book your 15-minute call below or message us directly on WhatsApp.",
      },

      trustPoints: [
        "24/7 AI Phone Receptionist",
        "Sub-60s Response Speed",
        "Instant Smartphone WhatsApp Alerts",
      ],
    },

    // 9. FOMO Close & CTA Section
    cta: {
      headline: "Stop guessing what faster, automated, and more profitable would look like. See it.",
      subheadline: "Request a custom working AI prototype for your business. You see the outcome running on your own phone before making any commitment.",
      buttonText: "See Your Free AI Prototype",
      secondaryButtonText: "Book a call",
      whatsappButtonText: "Chat on WhatsApp",
    },

    // 10. FAQ Section
    faq: {
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      headline: "Direct Answers. Zero Jargon.",
      description: "Everything you need to know about our AI phone agents, chatbots, workflow automations, and how the prototype works.",
      faqs: [
        {
          question: "How realistic does the AI phone receptionist actually sound to customers?",
          answer: "The AI speaks in natural, polite British English with ultra-low latency (<600ms response time). It handles interruptions, answers business FAQs accurately, and sounds professional and natural. Test our live audio demo above to hear it.",
        },
        {
          question: "Will setting up AI disrupt our existing business phone number or systems?",
          answer: "No. You keep your existing phone number completely. We simply configure conditional call forwarding so that if you don't answer within 3 rings, or if your line is busy, the AI seamlessly picks up.",
        },
        {
          question: "How does the AI book appointments into our calendar?",
          answer: "We connect the AI directly to your Google Calendar, Outlook, Calendly, or CRM. The AI checks your real-time availability live on the call, proposes available slots, and books the appointment directly.",
        },
        {
          question: "What happens if a customer asks a complex or unusual question?",
          answer: "The AI is programmed with strict guardrails. If a caller asks something outside its scope, it politely takes down their details, notes their exact question, and immediately pings you via WhatsApp/SMS so you can follow up with full context.",
        },
        {
          question: "How does the free working prototype work before we commit?",
          answer: "We build a functioning prototype of your AI assistant within 48 hours. You call the AI from your own phone and test how it responds. You only decide to proceed if you love the experience and see the commercial value.",
        },
        {
          question: "What is included in the monthly management retainer?",
          answer: "All retainers are month-to-month with 30 days notice and zero lock-in. Retainers cover dedicated AI voice and model minutes, telephony server infrastructure, prompt refinement, CRM maintenance, and continuous system optimization.",
        },
      ],
    },
  },

  // Services Page Copy (`/services`)
  servicesPage: {
    headerTitle: "Missed phone calls, slow response times, and manual admin are costing you revenue.",
    headerHighlight: "Here is what we build.",
    headerSubtitle: "We build and deploy 24/7 AI voice receptionists, enquiry chatbots, email outreach engines, and workflow automation for ambitious UK businesses.",
    objectionCallout: "Traditional setups rely on staff who cannot answer calls at 8 PM, during appointments, or while serving clients. We engineer 24/7 autonomous infrastructure that captures leads, answers questions, and confirms bookings around the clock.",
    
    list: [
      {
        title: "AI Inbound Calling (24/7 Voice Receptionist)",
        description: "Every missed call is a customer who hires your competitor. Our AI answers every inbound call on ring one, qualifies the lead, and books them into your live calendar.",
        outcome: "100% Call Answering & Instant Booking",
        tagline: "Never Let Another Phone Call Go to Voicemail.",
        overview: "A natural, fluent AI receptionist configured with your exact service offerings, pricing guidance, and availability. It answers questions, handles objections, and secures bookings 24/7.",
        features: [
          { name: "Ring-One Pickup", description: "Answers immediately 24/7/365 with zero hold times or customer frustration." },
          { name: "Live Calendar Booking", description: "Checks your real-time diary availability and books appointments directly." },
          { name: "Natural British Voice", description: "Ultra-low latency conversational speech with natural cadence and tone." },
          { name: "Instant WhatsApp Handoff", description: "Sends call summary, customer requirements, and recording link to your phone." },
        ],
        ctaText: "Book a call",
        ctaHref: "/book",
      },
      {
        title: "Chatbots & 24/7 Automated Customer Support",
        description: "Enquiries that sit overnight or at weekends go cold. Our intelligent chatbots answer questions instantly on your website, WhatsApp, and Instagram.",
        outcome: "< 60s Enquiry Response 24/7",
        tagline: "Engage, Qualify & Book Leads Outside Working Hours.",
        overview: "An intelligent conversational chatbot trained on your business knowledge. It engages prospective clients instantly, collects project specifications, and books them in.",
        features: [
          { name: "Multi-Channel Triage", description: "Operates seamlessly on your website, WhatsApp, and social channels." },
          { name: "Lead Qualification", description: "Asks the right scoping questions to filter out time-wasters automatically." },
          { name: "Upfront Deposit Locking", description: "Can collect consultation fees or booking deposits via Stripe / Apple Pay." },
          { name: "Instant Smartphone Alert", description: "Pushes hot qualified lead details straight to your phone in seconds." },
        ],
        ctaText: "Book a call",
        ctaHref: "/book",
      },
      {
        title: "Workflow & Repetitive Admin Automation",
        description: "Spending hours every week typing customer info into spreadsheets, chasing invoice payments, and sending manual reminders burns valuable time.",
        outcome: "8–15 Hours Saved Every Week",
        tagline: "Eliminate The Repetitive Admin Dragging You Down.",
        overview: "Custom backend automations connecting your forms, phone calls, CRM, calendar, and accounting tools so your business runs smoothly on autopilot.",
        features: [
          { name: "Automated Data Entry", description: "Syncs customer intake specs directly into your CRM or Google Sheets." },
          { name: "Automated Appointment Reminders", description: "Reduces no-shows with timed SMS and WhatsApp confirmation sequences." },
          { name: "Automated Review Extraction", description: "Requests 5-star Google reviews from satisfied customers automatically." },
          { name: "Invoice & Payment Triggers", description: "Generates quotes, invoices, and payment receipts without manual intervention." },
        ],
        ctaText: "Book a call",
        ctaHref: "/book",
      },
      {
        title: "AI Outbound Calling & Speed-to-Lead",
        description: "Leads who submit a form are 21x more likely to buy if contacted within 5 minutes. The AI calls them within 30 seconds to lock in the appointment.",
        outcome: "30-Second Speed-to-Lead Callback",
        tagline: "Speed-to-Lead Callbacks & Dormant Quote Reactivation.",
        overview: "Autonomous voice calling engines that phone incoming web leads within seconds of submission, plus automated outbound phone campaigns to revive quiet quotes.",
        features: [
          { name: "Instant Callback on Form Fill", description: "Calls the prospect while they are still on your website thinking about your service." },
          { name: "Dormant Quote Reactivation", description: "Politely calls past leads who went quiet to check if they are ready to proceed." },
          { name: "Natural Conversation Flow", description: "Handles common objections, confirms interest, and books calendar dates." },
          { name: "Detailed Call Telemetry", description: "Full call recording, outcome tagging, and transcription sent to your CRM." },
        ],
        ctaText: "Book a call",
        ctaHref: "/book",
      },
      {
        title: "Consistent Outbound Email Lead Engines",
        description: "Waiting passively for word-of-mouth creates feast-or-famine cycles. Our outbound email engines keep your pipeline consistently filled with commercial opportunities.",
        outcome: "Predictable Inbound Commercial Pipeline",
        tagline: "Consistent Outreach Bringing New Leads to You.",
        overview: "Targeted, highly personalized outbound email sequences that reach local commercial clients, property managers, and businesses who need your exact services.",
        features: [
          { name: "Verified B2B Prospect Lists", description: "Curated targeting ensuring emails only reach verified decision-makers." },
          { name: "Personalized Outreach Sequences", description: "Natural, non-spammy messaging focused on commercial value." },
          { name: "Domain Reputation Protection", description: "Dedicated sending domains with SPF, DKIM, and DMARC monitoring." },
          { name: "Positive Reply Handoff", description: "Interested prospects routed directly to your calendar or WhatsApp." },
        ],
        ctaText: "Book a call",
        ctaHref: "/book",
      },
      {
        title: "High-Converting Web Platforms (The Foundation)",
        description: "Over 70% of local service enquiries come from mobile. If your website is slow, outdated, or confusing, all your marketing and word-of-mouth is wasted.",
        outcome: "Sub-Second Mobile Load Speed",
        tagline: "The High-Performance Digital Foundation for Your AI.",
        overview: "Sub-second Next.js web platforms built to house your AI chatbots, voice widgets, and booking flows with bespoke design and search engine optimization.",
        features: [
          { name: "Sub-Second Mobile Speed", description: "Loads in under 900ms to eliminate visitor bounce rates completely." },
          { name: "3-Tap Booking Flow", description: "Frictionless intake allowing customers to book and pay deposits easily." },
          { name: "Search & AEO Optimization", description: "Structured schema markup so Google and AI search engines recommend you." },
          { name: "Zero Downtime Cutover", description: "Seamless launch keeping your existing domain, email, and rankings intact." },
        ],
        ctaText: "Book a call",
        ctaHref: "/book",
      },
    ],
  },

  // Process Page Copy (`/process`)
  processPage: {
    headerTitle: "You do not have weeks to endure painful agency delays.",
    headerHighlight: "Live in 7 Days",
    headerSubtitle: "From initial diagnostic call to a live, functioning AI voice agent and automation workflow in 7 days. Zero operational disruption.",
    steps: [
      {
        number: "01",
        title: "Step 1: Operational Diagnostic & Bottleneck Audit",
        sub: "Identifying where your business leaks leads, calls, and manual hours.",
        details: "We analyse your current call volume, missed call rates, enquiry channels, and repetitive admin tasks to design your custom automation blueprint.",
        deliverable: "AI Automation & Revenue Recovery Blueprint",
      },
      {
        number: "02",
        title: "Step 2: Working AI Prototype Build",
        sub: "Building a functional voice agent and chatbot within 48 hours.",
        details: "We configure an AI assistant trained on your exact business services, pricing, and booking rules. You test it live on your own smartphone before committing.",
        deliverable: "Live Working Prototype in 48 Hours",
      },
      {
        number: "03",
        title: "Step 3: Calendar, CRM & Phone Integration",
        sub: "Connecting call forwarding, calendars, WhatsApp alerts, and automations.",
        details: "We configure seamless call forwarding, connect your Google/Outlook calendar, set up instant WhatsApp owner alerts, and test all edge cases.",
        deliverable: "Fully Integrated AI & Telephony Setup",
      },
      {
        number: "04",
        title: "Step 4: Go-Live & Managed AI Optimization",
        sub: "Zero-downtime launch with continuous prompt tuning and monitoring.",
        details: "We switch on your AI assistants with zero disruption. Our monthly care begins: monitoring call transcripts, tuning prompts, and expanding automations.",
        deliverable: "Live Production Deployment & Retainer SLA",
      },
    ],
  },

  // Portfolio Page Copy (`/portfolio`)
  portfolioPage: {
    headerTitle: "Explore our recent AI systems and automation deployments.",
    headerHighlight: "Engineered For Revenue",
    headerSubtitle: "Bespoke AI voice receptionists, enquiry chatbots, and automated workflows deployed for UK local businesses.",
    noticeTitle: "Configured Specifically To Your Business & Services",
    noticeDescription: "Every AI assistant is trained on your exact business services, pricing rules, calendar availability, and brand tone. Explore our case studies below or test a free working prototype.",
    constructionTitle: "Request A Free Working AI Prototype",
    constructionDescription: "Want to see how an AI phone receptionist and enquiry chatbot would handle your customer enquiries? We build a working prototype within 48 hours.",
    emailLabel: "Business Email",
    nameLabel: "Your Name",
    submitBtnText: "Book a call",
    underConstructionText: "Request custom AI prototype: ",
  },

  // Pricing Page Copy (`/pricing`)
  pricingPage: {
    headerTitle: "Losing a single high-value customer costs far more than the AI that captures them.",
    headerHighlight: "Engineered Scope & Growth Partnerships",
    headerSubtitle: "Bespoke digital storefronts, autonomous voice systems, and managed growth infrastructure. Scoped transparently to your operational metrics and volume requirements.",
    performanceSLATitle: "Strict Performance Commitments & SLAs",
    performanceSLASubtitle: "We Back Our AI Systems With Transparent Commitments",
    performanceSLAParagraph: "Rapid 7-day deployment backed by guaranteed sub-second response times, 99.98% uptime SLA, and hands-off monthly prompt refinement.",
    roiCalculator: {
      eyebrow: "REVENUE RECOVERY CALCULATOR",
      title: "Calculate Your Lost Enquiry Revenue",
      description: "Discover how much revenue 24/7 AI call answering, instant chatbot triage, and automated follow-ups recover each month.",
      annualTimeLabel: "Annual Admin Hours Saved",
      growthLiftLabel: "Est. Extra Jobs / Bookings Secured (+25%)",
      valueUnlockedLabel: "Total Annual Revenue Secured",
      valueDisclaimer: "Calculated based on recovering missed inbound calls and answering web leads in under 60 seconds.",
      recommendedLabel: "Recommended Package:",
      recommendedSuffix: " Architecture",
      applyBtnText: "Book a call",
      currentRevenueLabel: "Monthly Inbound Enquiries / Calls",
      weeklyHoursLabel: "Average Job / Consultation Value (£)",
    },
    billingToggleSetup: "System Build (Custom Scope)",
    billingToggleRetainer: "Growth Retainer",
    billingToggleRevenueShare: "Revenue Share (Skin in the Game)",
    oneTimeTiers: [
      {
        name: "Essential Storefront",
        price: "495",
        interval: "one-time build",
        milestoneBreakdown: "Delivered live in 48 hours with full Google Business routing",
        description: "High-converting 3-page digital storefront engineered for speed, Google Maps visibility, and instant quote capture.",
        features: [
          "High-Performance Mobile Storefront (3 Pages)",
          "Google Business Profile Optimization",
          "Instant Speed-to-Lead WhatsApp Routing",
          "Direct Call & Quote Intake Forms",
          "UK Local SEO & Schema Metadata",
          "Hosting Setup & 30-Day Launch Support",
        ],
        cta: "Get Started",
        featured: false,
        tag: "Essential Storefront",
        highlight: "Fast 48h Turnaround",
      },
      {
        name: "Pro Order Builder",
        price: "995",
        interval: "one-time build",
        milestoneBreakdown: "50% deposit on kickoff, 50% upon verified launch",
        description: "Complete order intake and booking engine with deposit checkout and automated customer notifications.",
        features: [
          "Everything in Essential Storefront (Up to 7 Pages)",
          "Interactive Quote Builder & Live Cost Calculator",
          "Automated Stripe / Bank Deposit Checkout",
          "SMS & WhatsApp Confirmation Dispatches",
          "Customer Admin & Lead Management Portal",
          "60-Day Post-Launch Growth Support",
        ],
        cta: "Most Popular",
        featured: true,
        tag: "Most Popular",
        highlight: "Full Booking Engine",
      },
      {
        name: "Full Custom Build",
        price: "1,995",
        interval: "bespoke scope",
        milestoneBreakdown: "Milestone-based delivery for custom multi-service operations",
        description: "End-to-end custom operational automation, multi-service workflows, or multi-location booking infrastructure.",
        features: [
          "Bespoke Multi-Location Web Architecture",
          "Autonomous Subagent & CRM Pipelines",
          "Automated Invoice & Contract Engine",
          "Custom Staff Schedules & Route Dispatch",
          "Priority 24/7 Dedicated Engineering Support",
        ],
        cta: "Book Discovery",
        featured: false,
        tag: "Enterprise",
        highlight: "Custom Operations",
      },
    ],
    monthlyTiers: [
      {
        name: "Launch Support",
        price: "Managed Scope",
        interval: "billed monthly · zero lock-in contracts",
        milestoneBreakdown: "Continuous edge CDN · 24/7 critical system monitoring",
        description: "Continuous hosting, speed audits, and priority updates to preserve your digital momentum and uptime.",
        features: [
          "Premium Dedicated Ultra-Fast CDN Hosting",
          "Weekly Security & Speed Audits",
          "3 Hours Design & Copywriting Updates/mo",
          "Monthly Traffic & SEO Analytics Report",
          "24/7 Critical System Monitoring",
          "Standard Support Desk (Response within 24 hours)",
        ],
        cta: "Book a call",
        featured: false,
        tag: "Launch Support",
        highlight: "Essential Care",
      },
      {
        name: "Leverage Growth",
        price: "Managed Scope",
        interval: "billed monthly · zero lock-in contracts",
        milestoneBreakdown: "Continuous AI model re-tuning · Priority 4-hour SLA",
        description: "Comprehensive management for businesses running 24/7 AI phone answering, customer intake, and automated workflows.",
        features: [
          "Everything in Launch Support",
          "Includes 1,500 Voice Calling & Chatbot Minutes / Month",
          "Dedicated UK Telephony Infrastructure & Call Forwarding",
          "Bi-Weekly Call Transcript Audits & Voice Prompt Refinement",
          "Calendar & CRM Webhook Maintenance",
          "Priority Technical Support Desk (Response within 4 hours)",
        ],
        cta: "Book a call",
        featured: true,
        tag: "Recommended",
        highlight: "Autonomous Care",
      },
      {
        name: "Enterprise Alliance",
        price: "Managed Scope",
        interval: "billed monthly · zero lock-in contracts",
        milestoneBreakdown: "Fractional CTO advisory · Direct Slack hotline",
        description: "Your complete external fractional Chief Technology & Marketing advisory partner with high voice capacity and active outbound.",
        features: [
          "Everything in Leverage Growth",
          "Weekly High-Level Growth Consulting Call",
          "Includes 3,500 Voice Calling & Chat Minutes / Month",
          "Active Outbound Speed-to-Lead & Reactivation Dialing",
          "Dedicated Senior Automation Engineer Hotline",
          "Guaranteed Same-Day Support SLA",
          "Monthly Executive Revenue Review & Pipeline Optimization",
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
        interval: "of captured digital revenue",
        milestoneBreakdown: "Zero upfront implementation drag · Reconciled monthly",
        description: "Percentage-based partnership for validated businesses seeking automated speed-to-lead and 3-tap storefront conversion.",
        features: [
          "5% of Captured Digital Revenue",
          "Sub-Second Inbound Lead Response",
          "3-Tap Mobile Storefront Architecture",
          "Automated Google Review Extraction",
          "Monthly Reconciliation Dashboard",
          "Zero Upfront Implementation Drag",
        ],
        cta: "Book a call",
        featured: false,
        tag: "Starter Rev Share",
        highlight: "Performance Baseline",
      },
      {
        name: "Pro Growth Partner",
        price: "8%",
        interval: "of captured digital revenue",
        milestoneBreakdown: "Inbound phone AI + web concierge + calendar auto-booking",
        description: "Our flagship performance partnership: Inbound Voice + Web Chatbot + Automated Calendar Booking & Re-engagement.",
        features: [
          "8% of Captured Digital Revenue",
          "Everything in Starter Partner",
          "24/7 AI Inbound Phone Receptionist",
          "Live Calendar Booking During Calls",
          "Automated WhatsApp Dispatch",
          "Priority Technical Account Lead",
        ],
        cta: "Book a call",
        featured: true,
        tag: "Most Popular",
        highlight: "Full Operations",
      },
      {
        name: "VIP Scale Partner",
        price: "10%",
        interval: "of captured digital revenue",
        milestoneBreakdown: "Outbound speed-to-lead dialing + dedicated engineering",
        description: "High-volume performance scaling with active outbound recovery, custom ERP webhooks, and dedicated engineering.",
        features: [
          "10% of Captured Digital Revenue",
          "Everything in Pro Growth",
          "Outbound Speed-to-Lead Dialing Engine",
          "Dormant Quote Reactivation Calling",
          "Bespoke Next.js Platform & Multi-Location Routing",
          "Weekly Executive Strategy Reviews",
        ],
        cta: "Book a call",
        featured: false,
        tag: "VIP Scale",
        highlight: "Maximum Skin in Game",
      },
    ],
    setupTiers: [
      {
        name: "Starter AI Engine",
        price: "495",
        interval: "one-off fixed investment",
        milestoneBreakdown: "Delivered in 5–7 business days",
        description: "For local operators wanting 24/7 web & WhatsApp enquiry triage so no lead ever goes cold outside working hours.",
        features: [
          "Custom-Trained 24/7 Website AI Chatbot",
          "Automated Lead Qualification & Intake Form",
          "Instant WhatsApp Alert to Owner on New Leads",
          "Google / Outlook Calendar Synchronization",
          "Custom Service & Pricing Knowledge Base",
          "30 Days Included Post-Launch Support & Adjustments",
        ],
        cta: "Book a call",
        featured: false,
        tag: "Starter",
      },
      {
        name: "Complete AI Operations",
        price: "995",
        interval: "one-off fixed investment",
        milestoneBreakdown: "Delivered in 7 business days",
        description: "Our flagship package: 24/7 AI Inbound Phone Receptionist + Web Chatbot + Automated Calendar Booking & SMS Reminders.",
        features: [
          "Everything in Starter AI Engine",
          "24/7 AI Inbound Phone Receptionist (Natural British Voice)",
          "Ring-One Answering & Conditional Call Forwarding Setup",
          "Live Calendar Booking During Phone Calls",
          "Automated SMS & WhatsApp Appointment Reminders",
          "Automated 5-Star Google Review Extraction Sequence",
          "CRM Integration & Automated Data Entry (Sheets / Airtable)",
          "60 Days Included Post-Launch Support Desk",
        ],
        cta: "Book a call",
        featured: true,
        tag: "Most Popular",
      },
      {
        name: "Flagship Growth Engine",
        price: "1,695",
        interval: "one-off fixed investment",
        milestoneBreakdown: "Delivered in 10–14 business days",
        description: "Full end-to-end autonomous revenue infrastructure: Inbound Voice + Outbound Lead Reactivation + Cold Email Outreach.",
        features: [
          "Everything in Complete AI Operations",
          "Autonomous AI Outbound Calling (<30s Speed-to-Lead)",
          "Dormant Quote Reactivation Calling Engine",
          "Dedicated Outbound B2B Email Lead Engine Setup",
          "Bespoke High-Converting Next.js Web Platform Included",
          "Custom CRM Webhook & Multi-User Pipeline Architecture",
          "90 Days Priority Support & Dedicated Account SLA",
        ],
        cta: "Book a call",
        featured: false,
        tag: "Flagship",
      },
    ],
    retainerTiers: [
      {
        name: "Care & Chatbot Retainer",
        price: "195",
        interval: "billed monthly · zero lock-in contracts",
        milestoneBreakdown: "AI Chat compute · Continuous webhook monitoring",
        description: "Maintains your 24/7 AI chatbot, lead qualification flows, and instant WhatsApp alerts. Covers all AI compute and monthly knowledge updates.",
        features: [
          "Dedicated AI Model Compute & Hosting Infrastructure",
          "Up to 1,000 AI Chat Conversations / Month",
          "WhatsApp Alert Gateway Maintenance & Health Checks",
          "Monthly Knowledge Base, Service & Price Updates",
          "Continuous System Monitoring & 99.98% Uptime SLA",
          "Standard Support Desk (Response within 24 hours)",
        ],
        cta: "Book a call",
        featured: false,
        tag: "Chatbot Retainer",
      },
      {
        name: "Full AI Voice & Operations Retainer",
        price: "395",
        interval: "billed monthly · zero lock-in contracts",
        milestoneBreakdown: "Includes 1,500 voice/chat minutes · Priority tuning",
        description: "Comprehensive management for businesses running 24/7 AI phone answering and workflow automations. Includes dedicated voice minutes and monthly prompt tuning.",
        features: [
          "Everything in Care & Chatbot Retainer",
          "Includes 1,500 Voice Calling & Chatbot Minutes / Month",
          "Dedicated UK Telephony Infrastructure & Call Forwarding",
          "Bi-Weekly Call Transcript Audits & Voice Prompt Refinement",
          "Calendar & CRM Webhook Maintenance",
          "Automated Google Review Campaign Monitoring",
          "Priority Technical Support Desk (Response within 4 hours)",
        ],
        cta: "Book a call",
        featured: true,
        tag: "Recommended Retainer",
      },
      {
        name: "Enterprise Growth Retainer",
        price: "695",
        interval: "billed monthly · zero lock-in contracts",
        milestoneBreakdown: "Includes 3,500 voice minutes · Outbound email engine",
        description: "For high-volume operators, multi-depot trades, or clinics requiring high voice capacity, active outbound calling, and continuous pipeline generation.",
        features: [
          "Everything in Full AI Voice Retainer",
          "Includes 3,500 Voice Calling & Chat Minutes / Month",
          "Active Outbound Speed-to-Lead & Reactivation Dialing",
          "Managed B2B Cold Email Outreach Engine (Monitoring & Deliverability)",
          "Dedicated Senior Automation Engineer Hotline",
          "Guaranteed Same-Day Support SLA",
          "Monthly Executive Revenue Review & Pipeline Optimization",
        ],
        cta: "Book a call",
        featured: false,
        tag: "Growth Retainer",
      },
    ],
  },

  // Contact Concierge Copy (`/contact`)
  contactPage: {
    headerTitle: "Stop letting customer calls and enquiries slip through unread.",
    headerHighlight: "Direct Gateway",
    headerSubtitle: "Ready to deploy 24/7 AI voice answering and enquiry chatbots configured specifically for your business? Connect directly below.",
    supportEyebrow: "DIRECT ASSISTANCE",
    supportTitle: "Direct Human Response",
    supportDescription: "Speak directly with our UK automation engineering team. Zero generic ticketing queues.",
    emailLabel: "Direct Email",
    phoneLabel: "Call or WhatsApp",
    slaLabel: "Response Standard",
    slaValue: "Replied Within 1 Business Hour",
    whatsNextTitle: "What Occurs Next?",
    whatsNextItems: [
      "Instant acknowledgment and response-time assessment.",
      "15-minute call to review your current enquiry flow and bottlenecks.",
      "Live working AI prototype demonstrating your system in 48 hours.",
    ],
  },

  // Testimonials / Cohort Status Page Copy
  testimonialsPage: {
    headerTitle: "Quantified Outcomes &",
    headerHighlight: "Verified Revenue Growth",
    headerSubtitle: "How premier UK local businesses eliminate missed calls, automate appointment bookings, and scale revenue with our AI automation infrastructure.",
  },

  // Booking Page Copy (`/book`)
  bookPage: {
    clinicalEvaluationLabel: "15-Minute AI Discovery & Strategy Call",
    headerTitle: "Uncover precisely where your business is losing",
    headerHighlight: "calls, enquiries, and revenue.",
    headerSubtitle: "Reserve a 15-minute slot on our live diary. We will dissect your current enquiry channels, show you where leads drop off, and demonstrate how 24/7 AI voice and chat capture more revenue.",
    trustItems: [
      "15-minute focused operational & AI consultation",
      "Live custom AI prototype demonstration for your business",
      "Guaranteed 7-day deployment timeline"
    ],
    socialProofQuote: "On this 15-minute call, we show you the exact AI phone and chatbot setup that stops prospective customers bouncing to competitors.",
    socialProofAuthor: "Mercian Wealth Standard",
  },
};
