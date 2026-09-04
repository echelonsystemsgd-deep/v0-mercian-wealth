/**
 * lib/site-copy.ts
 *
 * Centralised Copy Registry for mercianwealth.com
 *
 * High-Leverage AI Voice Agents, Autonomous Telephony, Spatial Fleet Dispatch & Multi-Agent Operations
 * Engineered for High-Ticket Trade Operators, Private Clinics, Haulage Fleets & Commercial Real Estate across the UK.
 */

export const SITE_COPY = {
  // Global Meta Info
  metadata: {
    layout: {
      defaultTitle: "Mercian Wealth · Autonomous AI Voice, Dispatch & Workflow Operations",
      titleTemplate: "%s · Mercian Wealth",
      description: "We deploy 24/7 custom AI voice phone callers, spatial fleet dispatch dashboards, and multi-agent workflow infrastructure for high-ticket UK enterprises.",
    },
    home: {
      title: "Mercian Wealth · 24/7 AI Voice Phone Agents & Autonomous Dispatch",
      description: "Sub-500ms inbound & outbound AI voice callers, automated spatial dispatch, and multi-agent operational workflows for UK commercial services.",
    },
    services: {
      title: "Autonomous AI Infrastructure & Solutions · Mercian Wealth",
      description: "24/7 Inbound Voice Callers, Outbound Reactivation SDRs, Spatial Fleet Dispatch & Custom Agent Gateways.",
    },
    process: {
      title: "Agile Deployment Protocol · Mercian Wealth",
      description: "From telephony diagnostic audit to live 24/7 AI voice receptionists and spatial WhatsApp dispatch via collaborative rapid sprints.",
    },
    portfolio: {
      title: "Interactive AI Sandboxes & Telemetry · Mercian Wealth",
      description: "Live interactive voice agent sandboxes, spatial dispatch simulators, and multi-agent workflow demonstrations.",
    },
    pricing: {
      title: "Commercial Retainer Terms · Mercian Wealth",
      description: "Transparent UK GBP (£) pricing: Fixed implementation setup (£2,250–£5,500) + Flat managed monthly operations retainers (£1,250–£3,500/mo).",
    },
    testimonials: {
      title: "Operational Outcomes & Case Studies · Mercian Wealth",
      description: "Quantified revenue recovery, zero missed emergency calls, and 10x ROI for high-ticket UK operators.",
    },
    contact: {
      title: "Direct Engineering Gateway · Mercian Wealth",
      description: "Connect directly with our lead AI automation engineers or schedule a 15-minute diagnostic voice audit.",
    },
    book: {
      title: "Book Voice Diagnostic Audit · Mercian Wealth",
      description: "Schedule a 15-minute diagnostic call to uncover exactly how much revenue your business is losing to missed calls and manual dispatch drag.",
    },
  },

  // Navbar Component
  navbar: {
    logo: "Mercian Wealth",
    tagline: "AI Voice · Spatial Dispatch · Operations",
    links: [
      { label: "AI Solutions", href: "/services" },
      { label: "Deployment Protocol", href: "/process" },
      { label: "Voice Sandboxes", href: "/portfolio" },
      { label: "Retainer Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
    ],
    ctaText: "Book 15-Min Voice Audit",
    ctaHref: "/book",
    whatsappCtaText: "WhatsApp Engineering",
    whatsappHref: "https://wa.me/447851055929",
  },

  // Homepage Sections
  homepage: {
    // 0. Live Telemetry Ticker
    telemetryTicker: {
      items: [
        "Unanswered calls bleed 5-figure revenue straight to your competitors in under 60 seconds.",
        "Sub-500ms neural voice agents qualify, capture deposits, and dispatch 24/7/365.",
        "Spatial matching routes emergency jobs to closest technicians with zero dispatcher lag.",
        "Managed AI operations retainers include continuous prompt tuning, voice SLA & telephony monitoring.",
      ]
    },

    // 1. Hero Section
    hero: {
      eyebrow: "AUTONOMOUS TELEPHONY · 24/7 VOICE AGENTS · SPATIAL DISPATCH",
      headline: "We Deploy Autonomous AI Voice, Dispatch & Workflow Operations for High-Ticket Services.",
      subheadline: "Stop losing £3,000+ jobs to missed after-hours calls and manual dispatch chaos. We engineer sub-500ms inbound/outbound AI voice agents, real-time spatial fleet dispatch, and automated multi-agent workflows that run your operations 24/7.",
      primaryCtaText: "Message on WhatsApp",
      primaryCtaHref: "https://wa.me/447851055929",
      secondaryCtaText: "Book 15-Min Voice Audit",
      secondaryCtaHref: "/book",
      proofBadge: "Sub-500ms Voice Pickup · 24/7/365 Zero Downtime · Spatial Matching · 99.98% SLA",
      trustItems: [
        "24/7 Sub-500ms AI Voice Receptionists",
        "Autonomous Inbound & Outbound Calling",
        "Real-Time Spatial Dispatch & Driver PWAs",
        "Bespoke Multi-Agent Workflow Gateways",
      ],
      unsureText: "Message our engineering team on WhatsApp or test our live interactive voice sandboxes below →",
    },

    // Divergence Comparison (The Two-Path Mechanic)
    divergenceComparison: {
      eyebrow: "OPERATIONAL LEVERAGE",
      headline: "Delayed response is an unforced error. Answer in 500ms, or lose the job to someone who will.",
      subheadline: "In high-ticket services, the first business to pick up the phone and confirm dispatch secures the contract. You can continue relying on overwhelmed human staff and missed after-hours calls—or deploy autonomous AI infrastructure that scales effortlessly.",
      pathConventional: {
        badge: "MANUAL DRAG · 5-FIGURE REVENUE LEAK",
        title: "The Overwhelmed Human Bottleneck",
        subtitle: "Losing lucrative commercial contracts and emergency jobs whilst technicians are on-site or receptionists are busy.",
        points: [
          "Haemorrhaging 10–25 lucrative commercial calls monthly because customers hit voicemail after 17:00 or at weekends.",
          "Wasting hours manually calling technicians, texting job coordinates, and verifying driver tachograph schedules.",
          "Delayed follow-up on high-ticket ad leads (£4,000+ cosmetic dental / roofing leads going cold in under 15 minutes).",
          "Paying £35,000+/year per receptionist only to endure human sick days, call hold queues, and booking errors.",
        ]
      },
      pathMercian: {
        badge: "AUTONOMOUS INFRASTRUCTURE · 24/7 DOMINANCE",
        title: "The Mercian AI Operations Engine",
        subtitle: "Sub-500ms human-fidelity voice answering, spatial dispatch routing, and automated deposit capture.",
        points: [
          "Inbound voice agents answer in under 0.4s 24/7/365, qualify caller intent, and collect emergency upfront card deposits.",
          "Spatial matching engine checks real-time GPS geofences and dispatches closest technicians via WhatsApp/PWA in 28 seconds.",
          "Autonomous outbound SDRs dial new ad leads within 45 seconds to lock consultations directly onto doctor/director calendars.",
          "Managed operations retainer guarantees 99.98% telephony uptime, latency monitoring, and continuous weekly conversation audits.",
        ],
        ctaText: "Book your 15-minute voice diagnostic audit →",
      }
    },

    // 2. Deficit Diagnostic
    bottleneck: {
      eyebrow: "REVENUE HAEMORRHAGE",
      headline: "A missed emergency call is not an inconvenience—it is a £3,000+ contract gifted to your rival.",
      subheadline: "Every minute a high-intent commercial prospect waits for a callback, their likelihood of closing drops by 80%. When customers face emergencies, speed-to-answer is the only metric that matters.",
      goldSlogan: "Whilst competitors let inbound calls roll to voicemail, your AI voice receptionist picks up instantly, qualifies the job, and locks the booking.",
      systemMode: "Mode: ",
      modeAutomated: "24/7 Autonomous AI Operations",
      modeManual: "Manual Reception Drag",
      triggerBtnActive: "Deactivate Autonomous Voice",
      triggerBtnInactive: "Activate Autonomous Voice",
      diagnosticLink: "Book your 15-minute voice diagnostic audit →",
      
      cards: [
        {
          title: "Missed After-Hours Emergency & Commercial Calls",
          description: "60% of high-ticket commercial HVAC, plumbing, and property calls happen after 17:00. If nobody answers within 3 rings, they immediately dial the next company on Google.",
        },
        {
          title: "Manual Dispatch, Phone Tag & Driver Friction",
          description: "Dispatchers wasting billable hours manually ringing drivers, texting addresses, and chasing proof-of-delivery updates over chaotic WhatsApp groups.",
        },
        {
          title: "Cold Leads & Slow Follow-Up on Ad Spend",
          description: "Spending thousands on Meta and Google Ads, but leads go cold because clinic receptionists are busy with in-person patients and take hours to call back.",
        },
      ],
    },

    // 3. Commodity Trap
    commodityTrap: {
      eyebrow: "THE HARSH REALITY",
      headline: "Basic web forms and generic chatbots do not close high-ticket clients. Autonomous voice does.",
      description: "High-ticket commercial clients and urgent patients do not fill out static 10-field web forms and wait 2 days for an email. They demand immediate telephone confirmation, real-time qualification, and guaranteed dispatch.",
    },

    // 4. Mercian Wealth Difference
    whyMercianWealth: {
      headline: "Engineered For High-Ticket Trades, Private Clinics, Haulage & Property Fleets.",
      description: "Your operational infrastructure should answer every call in <500ms, qualify complex requirements, route spatial dispatch, and generate revenue on total autopilot.",
      differentiators: [
        "24/7 AI Voice Phone Agents — Natural human conversational tone, zero robotic lag, sub-500ms pickup.",
        "Spatial Fleet Matching & PWA Dispatch — Instant geofence driver routing and WhatsApp dispatch alerts in <0.4s.",
        "Autonomous Outbound SDR & Lead Reactivation — Dials leads within 45s and revives past databases on autopilot.",
      ],
      structuralRealityHeadline: "The Strategic Divide",
      standardAgency: {
        title: "Standard Web / Marketing Agency",
        items: [
          "Builds static brochure sites that don't answer phones or dispatch jobs.",
          "Zero telephony, SIP trunk, or low-latency voice engineering capability.",
          "Passes unqualified leads straight to your overwhelmed front desk.",
          "No ongoing prompt tuning, conversation QA audits, or telephony SLAs.",
          "Charges expensive retainers with zero direct revenue-tied operational value.",
        ],
      },
      mercianWealth: {
        title: "Mercian Wealth Autonomous AI",
        items: [
          "Sub-500ms AI voice phone receptionists deployed via rapid agile sprints (7–14 days target).",
          "Spatial geofence matching & instant WhatsApp/PWA driver dispatch.",
          "Automated upfront Stripe deposit capture on emergency callouts.",
          "Continuous managed operations: prompt optimization & weekly call QA.",
          "Clear, high-ROI monthly retainers that pay for themselves in 1–2 saved jobs.",
        ],
      },
      founderQuoteHeadline: "Operational Velocity Is The Ultimate Unfair Advantage",
      founderQuoteText: "You have built a premier reputation in your industry. Your operational telephony should operate at the exact same standard of excellence—answering calls in 400ms, qualifying £5,000 jobs, and dispatching your fleet on total autopilot 24/7/365.",
      founderQuoteAuthor: "Founder & Lead AI Architect, Mercian Wealth",
      proofStats: [
        { label: "Deployment Target", value: "7–14 Days" },
        { label: "Voice Latency", value: "< 420ms" },
        { label: "Dispatch Alert", value: "< 0.4s" },
      ],
    },

    // 5. Trend Adaptation Statement
    trendAdaptation: {
      eyebrow: "CONTINUOUS UPTIME & SLA",
      headline: "Your Autonomous Operations Run 24/7 Whilst You Focus On High-Value Execution.",
      description: "We handle SIP infrastructure, sub-second latency monitoring, subagent logic tuning, and edge-case prompt audits. Your AI telephony engine remains razor-sharp 365 days a year.",
    },

    // 6. Model Hint
    modelHint: {
      eyebrow: "HIGH-ROI RETAINER STRUCTURE",
      headline: "Managed AI Operations Retainers Engineered For Decisive ROI.",
      description: "Every tier includes implementation setup + monthly managed operations: dedicated telephony maintenance, sub-second latency monitoring, continuous prompt tuning, and conversation auditing.",
    },

    // 7. Category Exclusivity & Postcode Lock
    exclusivity: {
      eyebrow: "TERRITORIAL EXCLUSIVITY",
      headline: "We partner with only one premier commercial operator per sector in each territory.",
      subheadline: "Because our autonomous AI voice receptionists and speed-to-lead engines capture the majority of local inbound demand, we cannot deploy these decisive advantages for direct rivals simultaneously.",
      badge: "One Operator Per Sector Allocation",
      lockDescription: "Once a territory allocation is claimed, that sector is permanently locked against direct competitors for the duration of our partnership.",
      buttonText: "Check Sector & Territory Availability",
      buttonHref: "/book",
    },

    exclusivityLock: {
      eyebrow: "TERRITORIAL EXCLUSIVITY",
      headline: "We Partner With Selected Premier High-Ticket Operators Across the UK.",
      description: "To guarantee decisive commercial dominance, we partner with selected premier operators per postcode and trade sector. When we deploy our 24/7 voice and dispatch infrastructure for your brand, you hold an insurmountable speed advantage.",
    },

    // 8. Testimonials Section
    testimonials: {
      eyebrow: "PROVEN OPERATIONAL RESULTS",
      headline: "How high-ticket operators eliminated missed calls and added 6-figure revenue.",
      subheadline: "Real outcomes from commercial HVAC, private aesthetics, haulage, and property firms who upgraded to our autonomous AI voice and dispatch infrastructure.",
      guarantee: "Strict Performance SLAs · Telephony Latency Guarantees · Transparent Retainers",
      
      cohortCard: {
        badge: "AUTONOMOUS OPERATIONS BLUEPRINT",
        title: "Enterprise AI Infrastructure Built For Direct Cash Flow",
        paragraph1: "We engineer low-latency AI voice agents, spatial fleet dispatch, and multi-agent workflows for UK commercial operators who refuse to surrender revenue to missed calls and manual admin.",
        paragraph2: "24/7 Sub-500ms voice answering, automated upfront Stripe deposit collection, instant WhatsApp/PWA dispatch, and continuous conversation audits included as standard.",
        paragraph3: "Structured Build + Monthly Managed Operations Retainer (£1,250–£3,500/mo). Zero hidden fees, clear 99.98% telephony SLA.",
        enquiryCtaText: "To audit your current call leakage and test a live voice agent configured for your firm, book your 15-minute diagnostic audit below or message us directly on WhatsApp.",
      },

      trustPoints: [
        "Sub-500ms Voice Answering Latency",
        "Spatial Geofence Fleet Matching",
        "Instant Smartphone WhatsApp / PWA Dispatch",
      ],

      items: [
        {
          quote: "We were missing 15–20 emergency commercial HVAC calls every weekend because our on-call engineers were driving or on rooftops. Mercian deployed a 24/7 AI voice dispatcher in 6 days. It qualifies the breakdown, collects a £350 diagnostic deposit, and pings the nearest engineer in 30 seconds. It paid for its annual retainer in the first 3 weeks.",
          author: "David H.",
          role: "Operations Director",
          location: "Apex Commercial Climate · Berkshire & Thames Valley",
          metric: "+£64,000 Recovered Pipeline",
        },
        {
          quote: "Our aesthetic clinic was generating hundreds of consultation leads from Instagram ads, but our receptionists took 3–4 hours to call them back. Mercian's outbound voice agent now calls leads within 45 seconds and books them directly into our diary with a secured deposit. Our consultation show-up rate jumped from 42% to 89%.",
          author: "Dr. Elena Rostova",
          role: "Clinical Lead & Founder",
          location: "Aura Private Aesthetics · London & West Midlands",
          metric: "89% Consultation Show Rate",
        },
      ],
    },

    // 7. Pricing Tiers
    pricing: {
      eyebrow: "MANAGED AI OPERATIONS & RETAINERS",
      headline: "Predictable Investment. Massive Operational ROI.",
      subheadline: "Choose between our managed AI voice & dispatch tiers. Every package includes full custom deployment plus ongoing monthly operations, latency monitoring, and prompt engineering.",
      setupFeeDisclaimer: "Implementation setup covers SIP trunk architecture, custom voice persona engineering, bespoke subagent logic, CRM integration, and end-to-end testing.",
      monthlyDisclaimer: "Retainers cover dedicated telephony servers, continuous conversation auditing, weekly prompt tuning, API throughput, and guaranteed <500ms latency SLA.",
      revenueShareDisclaimer: "Subject to qualification for high-volume booking platforms and enterprise dispatch operations.",
    },

    // 8. Lead Capture / Postcode Lock
    leadCapture: {
      eyebrow: "TERRITORIAL VOICE & DISPATCH AUDIT",
      headline: "Verify if your sector and territory are still available.",
      subheadline: "Enter your postcode and industry below to run a real-time availability check and schedule your 15-minute voice diagnostic audit with our lead AI architects.",
      postcodePlaceholder: "e.g. SL4 1PD or B91 3QJ",
      businessNamePlaceholder: "Your Business Name",
      phonePlaceholder: "Your WhatsApp / Mobile Number",
      submitButtonText: "Check Availability & Request Voice Audit",
      guaranteeText: "100% Free · Zero Obligation · Live Interactive Voice Demo Included",
      
      consultationBooking: {
        headline: "Book Your 15-Minute Voice Diagnostic Audit",
        subheadline: "Pick a time on our live diary. We will analyse your current inbound call flow, demonstrate a live AI voice agent tailored to your services, and show you exactly where revenue is leaking.",
        calendarPlaceholder: "Select a date and time slot from our live diary below.",
        enquiryCtaText: "To audit your current call leakage and test a live voice agent configured for your firm, book your 15-minute diagnostic audit below or message us directly on WhatsApp.",
      },

      trustPoints: [
        "Sub-500ms Voice Answering Latency",
        "Spatial Geofence Fleet Matching",
        "Instant Smartphone WhatsApp / PWA Dispatch",
      ],
    },

    // 9. FOMO Close & CTA Section
    cta: {
      headline: "Ready to stop losing 5-figure contracts to missed calls?",
      subheadline: "Message us directly on WhatsApp or book a 15-minute voice diagnostic call to test an interactive AI voice agent tailored to your exact industry and dispatch workflow.",
      buttonText: "Book Your 15-Min Voice Audit",
      whatsappButtonText: "Chat on WhatsApp",
    },

    // 10. FAQ Section
    faq: {
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      headline: "Direct Answers. Zero Jargon.",
      description: "Everything you need to know about our 24/7 AI voice phone agents, spatial dispatch systems, telephony SLAs, and managed monthly retainers.",
      faqs: [
        {
          question: "Does the AI voice sound natural, or does it sound like a robotic IVR menu?",
          answer: "Our voice agents use ultra-low-latency neural speech models operating under 450ms with natural human intonation, pauses, and backchanneling. In over 85% of calls, customers believe they are speaking directly with a senior human receptionist.",
        },
        {
          question: "How does the AI handle complex edge cases or angry customers?",
          answer: "We engineer strict boundary guardrails and custom subagent triage logic. If a caller presents an edge case outside the AI's parameter scope, the system seamlessly transfers the call live to your on-call manager's mobile with full transcription context.",
        },
        {
          question: "What is included in the monthly managed operations retainer?",
          answer: "Your monthly retainer covers dedicated telephony and voice server infrastructure, continuous latency monitoring, weekly conversation auditing to fix edge cases, monthly prompt enhancements, CRM API maintenance, and 24/7 uptime SLA.",
        },
        {
          question: "How quickly can our 24/7 voice agent and dispatch system go live?",
          answer: "Deployment duration is tailored to each operator. For standard builds where the owner has scripts and pricing ready, we aim for a 7–14 business day sprint. More comprehensive enterprise architectures or complex multi-branch integrations take longer depending on technical scope and owner feedback cadence.",
        },
        {
          question: "Does this integrate with our existing CRM, calendar, or accounting software?",
          answer: "Yes. We build native webhooks and API bridges into ServiceTitan, Jobber, Cliniko, HubSpot, Salesforce, Xero, QuickBooks, Google Calendar, and custom databases.",
        },
      ],
    },
  },

  // Services Page Copy (`/services`)
  servicesPage: {
    headerTitle: "Missed calls, delayed lead follow-up, and manual dispatch chaos are costing you 6 figures.",
    headerHighlight: "Here is the autonomous solution.",
    headerSubtitle: "We replace administrative drag with 24/7 AI voice phone agents, real-time spatial dispatch, autonomous outbound SDRs, and custom multi-agent workflows.",
    objectionCallout: "Traditional agencies build static websites that still require manual phone answering. Our agile engineering protocol deploys an autonomous AI operations engine that captures revenue 24/7.",
    
    list: [
      {
        title: "24/7 Inbound & Outbound AI Voice Agents",
        description: "Over 60% of high-ticket commercial enquiries and emergency calls occur after hours or while staff are busy on-site.",
        outcome: "Sub-450ms Neural Voice Pickup",
        tagline: "Never Miss Another High-Ticket Contract.",
        overview: "Our human-fidelity voice agents answer every call in under 500ms, qualify customer requirements, collect non-refundable deposits via Apple Pay/SMS, and book appointments 24/7/365.",
        features: [
          { name: "Sub-500ms Voice Telephony Latency", description: "Natural human conversations with zero awkward robotic pauses or delays." },
          { name: "Intelligent Triage & Intent Qualification", description: "Identifies emergency level, project budget, customer location, and timeline." },
          { name: "Automated Upfront Deposit Collection", description: "Collects callout fees and consultation deposits before dates are locked." },
          { name: "Live Call Escalation Guardrails", description: "Transfers complex VIP cases directly to your mobile with full transcript summary." },
        ],
        ctaText: "Book Voice Diagnostic Audit",
        ctaHref: "/book",
      },
      {
        title: "Operator Dashboards & Spatial Fleet Dispatch",
        description: "Dispatchers wasting hours ringing technicians, texting addresses, and manually tracking field operations.",
        outcome: "Real-Time Geofence Spatial Matching",
        tagline: "Automated Fleet & Technician Dispatch in Under 30 Seconds.",
        overview: "The second a customer confirms an emergency callout or service job, our spatial matching engine locates the nearest on-duty technician and dispatches full details via WhatsApp and driver PWA.",
        features: [
          { name: "Spatial GPS Geofence Matching", description: "Instantly pairs jobs with the closest available field technician or driver." },
          { name: "Sub-0.4s WhatsApp & PWA Alerts", description: "Dispatches complete job specifications, client notes, and GPS routes to staff." },
          { name: "Customer Live GPS ETA Tracking", description: "Sends an automated SMS with real-time technician arrival ETA to the client." },
          { name: "Proof-of-Delivery & Signature Ingestion", description: "Automatically archives job completion photos and customer sign-offs." },
        ],
        ctaText: "Book Voice Diagnostic Audit",
        ctaHref: "/book",
      },
      {
        title: "Autonomous Outbound & Database Reactivation SDRs",
        description: "Expensive ad leads going cold after 15 minutes and dormant customer databases sitting unmonetised.",
        outcome: "< 45s Speed-To-Lead Dialing",
        tagline: "Revive Cold Leads and Convert Ad Clicks on Autopilot.",
        overview: "Our outbound voice and multi-channel SDRs call new form leads within 45 seconds, answer objections, qualify budgets, and re-engage past client lists with targeted seasonal campaigns.",
        features: [
          { name: "45-Second Speed-To-Lead Engine", description: "Calls new Meta/Google ad leads immediately while purchase intent is at its peak." },
          { name: "Automated Database Reactivation", description: "Systematically contacts past 6–12 month customer lists to fill empty diary slots." },
          { name: "Multi-Channel WhatsApp & SMS Workflows", description: "Follows up unbooked calls with automated calendar booking links." },
          { name: "Direct CRM & Calendar Auto-Sync", description: "Locks qualified appointments directly onto your senior team's calendars." },
        ],
        ctaText: "Book Voice Diagnostic Audit",
        ctaHref: "/book",
      },
      {
        title: "Custom Agent Skills & Bifrost Gateways",
        description: "Off-the-shelf software tools cannot handle bespoke operational rules, multi-step workflows, or custom APIs.",
        outcome: "Enterprise Multi-Agent Infrastructure",
        tagline: "Bespoke Autonomous AI Engineered For Your Exact Business Rules.",
        overview: "We architect custom subagent networks, tool calling gateways, document ingestion pipelines, and specialized AI skills tailored to your proprietary operational workflow.",
        features: [
          { name: "Custom Agent Tool & Skill Development", description: "Agents connected to your custom internal databases, inventory, and ERPs." },
          { name: "Bifrost Gateway & Telephony Routing", description: "Robust API middleware managing load balancing, retry logic, and failovers." },
          { name: "UK & GDPR Compliant Data Residency", description: "Zero AI model training on client proprietary data with strict encryption." },
          { name: "99.98% Telephony SLA & Managed Retainer", description: "Dedicated engineering team monitoring uptime, latency, and prompt accuracy." },
        ],
        ctaText: "Book Voice Diagnostic Audit",
        ctaHref: "/book",
      },
    ],
  },

  // Process Page Copy (`/process`)
  processPage: {
    headerTitle: "You do not have months to endure painful software development.",
    headerHighlight: "Live in 7 Days",
    headerSubtitle: "From initial telephony audit to a live 24/7 AI voice receptionist and spatial dispatch engine in 7 days. Zero operational drag.",
    steps: [
      {
        number: "01",
        title: "Step 1: Telephony & Call Flow Diagnostic Audit",
        sub: "Auditing missed call revenue, customer objections, and dispatch bottlenecks.",
        details: "We analyse your call volume, after-hours leakage, common customer questions, and dispatch requirements to engineer the exact conversational and routing architecture.",
        deliverable: "AI Voice & Telephony Blueprint",
      },
      {
        number: "02",
        title: "Step 2: Voice Persona & Subagent Engineering",
        sub: "Crafting sub-500ms neural voice models and custom qualification logic.",
        details: "We build your custom voice agent persona, train boundary guardrails, configure qualification scripts, and integrate Stripe upfront deposit gateways.",
        deliverable: "Interactive Voice Agent Sandbox",
      },
      {
        number: "03",
        title: "Step 3: Spatial Dispatch & Telephony SIP Integration",
        sub: "Connecting carrier-grade SIP trunks, WhatsApp webhooks, and driver PWAs.",
        details: "We connect your business phone numbers, link instant smartphone WhatsApp dispatch alerts, configure spatial geofence matching, and test live edge cases.",
        deliverable: "Live Verified Dispatch Engine",
      },
      {
        number: "04",
        title: "Step 4: Commercial Go-Live & Managed Operations",
        sub: "Activating 24/7 autonomous operations with continuous prompt tuning.",
        details: "Your autonomous voice and dispatch engine goes live. We begin our monthly managed operations: monitoring latency, auditing call logs weekly, and optimizing booking conversion.",
        deliverable: "24/7 Live Operations & Monthly Retainer SLA",
      },
    ],
  },

  // Portfolio Page Copy (`/portfolio`)
  portfolioPage: {
    headerTitle: "Explore interactive AI voice sandboxes and operational telemetry.",
    headerHighlight: "Sub-500ms AI Telephony",
    headerSubtitle: "Engineered specifically for high-ticket service operators who demand zero missed calls and sub-second dispatch speed.",
    noticeTitle: "Configured To Your Exact Industry & Call Flow",
    noticeDescription: "Every voice agent and dispatch system is customized to match your company's proprietary service lines, deposit rules, and technician schedules. Test our live voice sandboxes below or book a 15-minute diagnostic call.",
    constructionTitle: "Request A Live Custom Voice Demo",
    constructionDescription: "Want to hear an AI voice agent customized with your company name, services, and pricing? Schedule a 15-minute voice diagnostic audit.",
    emailLabel: "Business Email",
    nameLabel: "Your Name",
    submitBtnText: "Book Voice Audit",
    underConstructionText: "Request live voice demonstration: ",
  },

  // Pricing Page Copy (`/pricing`)
  pricingPage: {
    headerTitle: "A single missed commercial contract costs far more than the autonomous system that secures it.",
    headerHighlight: "Transparent Retainer & Implementation Terms",
    headerSubtitle: "Clear, understandable engineering tiers. Fixed implementation setup to build your custom AI infrastructure + Flat monthly managed retainers to maintain, monitor, and host your systems 24/7.",
    performanceSLATitle: "Strict Performance SLAs & Scope Commitments",
    performanceSLASubtitle: "We Back Our Autonomous Telephony With Transparent Standards",
    performanceSLAParagraph: "Rapid agile delivery targeted between 7–14 business days (timeline adapts to owner responsiveness and custom technical requirements), backed by guaranteed <500ms voice latency, 99.98% telephony uptime, and weekly prompt tuning.",
    roiCalculator: {
      eyebrow: "REVENUE RECOVERY CALCULATOR",
      title: "Calculate Your Missed Call Revenue Leakage",
      description: "Discover how many thousands in lost commercial jobs an automated 24/7 voice receptionist recovers each month.",
      annualTimeLabel: "Annual Admin Hours Recovered",
      growthLiftLabel: "Est. Extra Contracts Secured (+25%)",
      valueUnlockedLabel: "Total Annual Revenue Recovered",
      valueDisclaimer: "Calculated based on recovering 85% of missed after-hours and on-site inbound inquiries.",
      recommendedLabel: "Recommended Retainer:",
      recommendedSuffix: " Architecture",
      applyBtnText: "Book Voice Diagnostic Audit",
      currentRevenueLabel: "Monthly Inbound Calls",
      weeklyHoursLabel: "Average Deal / Job Value (£)",
    },
    billingToggleSetup: "Implementation Setup",
    billingToggleRetainer: "Monthly Managed Retainer",
    billingToggleRevenueShare: "Enterprise Custom",
    oneTimeTiers: [
      {
        name: "Core Voice & Dispatch Setup",
        price: "2,250",
        interval: "one-off custom engineering build",
        milestoneBreakdown: "Target: 7–14 days (duration depends on owner readiness & script approval)",
        description: "Full engineering build of your 24/7 AI voice receptionist. We write custom triage prompts, configure emergency criteria, connect your UK phone number, and setup WhatsApp dispatch alerts.",
        features: [
          "Custom 24/7 AI Voice Phone Receptionist (<450ms latency)",
          "Bespoke Emergency Triage & Budget Qualification Decision Tree",
          "Instant WhatsApp & SMS Smartphone Alert to On-Duty Technicians",
          "Stripe & Apple Pay Upfront Callout Deposit Gateway",
          "Google / Outlook Calendar Synchronization (Live Slot Booking)",
          "30 Days Included Post-Launch Tuning & Refinement",
        ],
        cta: "Book Voice Audit",
        featured: false,
        tag: "Setup Implementation",
      },
      {
        name: "Autonomous Growth & Dispatch Setup",
        price: "3,850",
        interval: "one-off custom engineering build",
        milestoneBreakdown: "Target: 10–21 days (duration depends on CRM access & fleet data)",
        description: "Dual inbound + outbound telephony infrastructure. Includes sub-45s outbound dialing on new web leads, spatial GPS geofence technician matching, and driver PWA dispatch workflows.",
        features: [
          "Everything in Core Voice & Dispatch Setup",
          "Automated Outbound Speed-To-Lead Dialing (<45s Response on Ad Leads)",
          "Spatial Fleet Geofence Matching & Technician Proximity Routing",
          "Driver Smartphone PWA & Customer Live GPS Arrival Links",
          "Dormant Past Customer Database Reactivation Dialer Engine",
          "60 Days Included Post-Launch Tuning & Support Desk",
        ],
        cta: "Book Voice Audit",
        featured: true,
        tag: "Most Popular Setup",
      },
      {
        name: "Enterprise Multi-Agent Infrastructure",
        price: "5,500",
        interval: "one-off bespoke engineering build",
        milestoneBreakdown: "Bespoke schedule tailored to enterprise scope & owner specs",
        description: "Custom multi-agent telephony network for multi-branch commercial operations, custom legacy ERP/ServiceTitan bridges, and dedicated multi-depot routing architecture.",
        features: [
          "Everything in Autonomous Growth Setup",
          "Multi-Branch, Multi-Depot & Multi-Territory Regional Routing",
          "Custom Internal API Connectors (ServiceTitan / Salesforce / Xero / ERP)",
          "Dedicated Low-Latency Voice Server Trunking & Isolated Telephony Node",
          "Bespoke Multi-Agent Skill Logic (Dispatch + Billing + Tier-3 Triage)",
          "90 Days Priority Support, SLA Warranty & Staff Training Desk",
        ],
        cta: "Book Voice Audit",
        featured: false,
        tag: "Enterprise Architecture",
      },
    ],
    monthlyTiers: [
      {
        name: "Core Managed Operations Retainer",
        price: "1,250",
        interval: "billed monthly · zero lock-in contracts",
        milestoneBreakdown: "1,500 mins voice allowance · Continuous prompt tuning",
        description: "Keeps your 24/7 voice receptionist online, hosted, and sharp. Includes dedicated telephony line hosting, weekly conversation audits to tune prompts and eliminate errors, and technical support.",
        features: [
          "Dedicated Voice Server Hosting & 99.98% SIP Telephony Uptime SLA",
          "Up to 1,500 Included Minutes of AI Voice Telephony per Month",
          "Weekly Prompt Audits: Engineers review calls and tune edge cases",
          "Instant Smartphone WhatsApp & SMS Dispatch Gateway Maintenance",
          "Monthly Revenue Recovery Telemetry: See calls saved & revenue locked",
          "Fast Technical Support Desk (Direct response within 2 hours)",
        ],
        cta: "Book Voice Audit",
        featured: false,
        tag: "Monthly Retainer",
      },
      {
        name: "Autonomous Growth Retainer",
        price: "2,250",
        interval: "billed monthly · zero lock-in contracts",
        milestoneBreakdown: "3,500 mins voice allowance · Inbound + Outbound SDR",
        description: "Full-service management for operators who want continuous pipeline growth. Covers inbound reception, outbound lead speed-dialing, spatial fleet routing, and bi-weekly conversion optimization.",
        features: [
          "Everything in Core Managed Operations Retainer",
          "Up to 3,500 Included Minutes of AI Voice Telephony & Outbound Dialing",
          "Active Outbound SDR Maintenance: Calling web leads within 45 seconds",
          "Spatial Fleet Geofence Routing & Driver PWA Infrastructure Care",
          "Bi-Weekly Script & Conversion Engineering to Increase Close Rates",
          "Direct Founder Emergency Telephony Escalation Hotline",
        ],
        cta: "Book Voice Audit",
        featured: true,
        tag: "Recommended Retainer",
      },
      {
        name: "Enterprise Dedicated Operations",
        price: "3,500",
        interval: "billed monthly · zero lock-in contracts",
        milestoneBreakdown: "High-volume bandwidth · Dedicated AI architect desk",
        description: "For multi-branch commercial enterprises, large vehicle fleets, or high-volume call centers requiring dedicated engineer oversight, custom skill expansions, and strict uptime guarantees.",
        features: [
          "Everything in Autonomous Growth Retainer",
          "High-Volume Telephony Bandwidth (Custom Enterprise Voice Minute Tiers)",
          "Continuous Custom Agent Skill & Workflow Additions (Zero Hidden Labour)",
          "Multi-Depot & Regional Branch Routing Quality Assurance",
          "Dedicated Senior AI Architect Desk & Guaranteed 30-Min SLA",
          "Weekly Executive Review Calls: Call conversion, dispatch & growth ROI",
        ],
        cta: "Book Voice Audit",
        featured: false,
        tag: "Enterprise Retainer",
      },
    ],
    revenueShareTiers: [
      {
        name: "Enterprise Performance Partnership",
        price: "Custom",
        interval: "performance-aligned operational model",
        milestoneBreakdown: "Available for qualifying high-volume operators",
        description: "Reduced setup fee + performance fee per qualified booked appointment or recovered commercial contract. Perfect for large fleets with proven call volume.",
        features: [
          "Complete Autonomous AI Voice & Dispatch Infrastructure",
          "Risk-Aligned Performance Revenue Structure (£/booked appointment)",
          "Dedicated High-Volume Telephony Bandwidth & SIP Trunks",
          "Full CRM & Dispatch Workflow Integration",
          "Strict Business Volume Qualification Required (Min 400 calls/mo)",
        ],
        cta: "Book Voice Audit",
        featured: false,
        tag: "Performance Partnership",
      },
    ],
    setupTiers: [
      {
        name: "Core Voice & Dispatch Setup",
        price: "2,250",
        interval: "one-off custom engineering build",
        milestoneBreakdown: "Target: 7–14 days (duration depends on owner readiness & script approval)",
        description: "Full engineering build of your 24/7 AI voice receptionist. We write custom triage prompts, configure emergency criteria, connect your UK phone number, and setup WhatsApp dispatch alerts.",
        features: [
          "Custom 24/7 AI Voice Phone Receptionist (<450ms latency)",
          "Bespoke Emergency Triage & Budget Qualification Decision Tree",
          "Instant WhatsApp & SMS Smartphone Alert to On-Duty Technicians",
          "Stripe & Apple Pay Upfront Callout Deposit Gateway",
          "Google / Outlook Calendar Synchronization (Live Slot Booking)",
          "30 Days Included Post-Launch Tuning & Refinement",
        ],
        cta: "Book Voice Audit",
        featured: false,
        tag: "Setup Implementation",
      },
      {
        name: "Autonomous Growth & Dispatch Setup",
        price: "3,850",
        interval: "one-off custom engineering build",
        milestoneBreakdown: "Target: 10–21 days (duration depends on CRM access & fleet data)",
        description: "Dual inbound + outbound telephony infrastructure. Includes sub-45s outbound dialing on new web leads, spatial GPS geofence technician matching, and driver PWA dispatch workflows.",
        features: [
          "Everything in Core Voice & Dispatch Setup",
          "Automated Outbound Speed-To-Lead Dialing (<45s Response on Ad Leads)",
          "Spatial Fleet Geofence Matching & Technician Proximity Routing",
          "Driver Smartphone PWA & Customer Live GPS Arrival Links",
          "Dormant Past Customer Database Reactivation Dialer Engine",
          "60 Days Included Post-Launch Tuning & Support Desk",
        ],
        cta: "Book Voice Audit",
        featured: true,
        tag: "Most Popular Setup",
      },
      {
        name: "Enterprise Multi-Agent Infrastructure",
        price: "5,500",
        interval: "one-off bespoke engineering build",
        milestoneBreakdown: "Bespoke schedule tailored to enterprise scope & owner specs",
        description: "Custom multi-agent telephony network for multi-branch commercial operations, custom legacy ERP/ServiceTitan bridges, and dedicated multi-depot routing architecture.",
        features: [
          "Everything in Autonomous Growth Setup",
          "Multi-Branch, Multi-Depot & Multi-Territory Regional Routing",
          "Custom Internal API Connectors (ServiceTitan / Salesforce / Xero / ERP)",
          "Dedicated Low-Latency Voice Server Trunking & Isolated Telephony Node",
          "Bespoke Multi-Agent Skill Logic (Dispatch + Billing + Tier-3 Triage)",
          "90 Days Priority Support, SLA Warranty & Staff Training Desk",
        ],
        cta: "Book Voice Audit",
        featured: false,
        tag: "Enterprise Architecture",
      },
    ],
    retainerTiers: [
      {
        name: "Core Managed Operations Retainer",
        price: "1,250",
        interval: "billed monthly · zero lock-in contracts",
        milestoneBreakdown: "1,500 mins voice allowance · Continuous prompt tuning",
        description: "Keeps your 24/7 voice receptionist online, hosted, and sharp. Includes dedicated telephony line hosting, weekly conversation audits to tune prompts and eliminate errors, and technical support.",
        features: [
          "Dedicated Voice Server Hosting & 99.98% SIP Telephony Uptime SLA",
          "Up to 1,500 Included Minutes of AI Voice Telephony per Month",
          "Weekly Prompt Audits: Engineers review calls and tune edge cases",
          "Instant Smartphone WhatsApp & SMS Dispatch Gateway Maintenance",
          "Monthly Revenue Recovery Telemetry: See calls saved & revenue locked",
          "Fast Technical Support Desk (Direct response within 2 hours)",
        ],
        cta: "Book Voice Audit",
        featured: false,
        tag: "Monthly Retainer",
      },
      {
        name: "Autonomous Growth Retainer",
        price: "2,250",
        interval: "billed monthly · zero lock-in contracts",
        milestoneBreakdown: "3,500 mins voice allowance · Inbound + Outbound SDR",
        description: "Full-service management for operators who want continuous pipeline growth. Covers inbound reception, outbound lead speed-dialing, spatial fleet routing, and bi-weekly conversion optimization.",
        features: [
          "Everything in Core Managed Operations Retainer",
          "Up to 3,500 Included Minutes of AI Voice Telephony & Outbound Dialing",
          "Active Outbound SDR Maintenance: Calling web leads within 45 seconds",
          "Spatial Fleet Geofence Routing & Driver PWA Infrastructure Care",
          "Bi-Weekly Script & Conversion Engineering to Increase Close Rates",
          "Direct Founder Emergency Telephony Escalation Hotline",
        ],
        cta: "Book Voice Audit",
        featured: true,
        tag: "Recommended Retainer",
      },
      {
        name: "Enterprise Dedicated Operations",
        price: "3,500",
        interval: "billed monthly · zero lock-in contracts",
        milestoneBreakdown: "High-volume bandwidth · Dedicated AI architect desk",
        description: "For multi-branch commercial enterprises, large vehicle fleets, or high-volume call centers requiring dedicated engineer oversight, custom skill expansions, and strict uptime guarantees.",
        features: [
          "Everything in Autonomous Growth Retainer",
          "High-Volume Telephony Bandwidth (Custom Enterprise Voice Minute Tiers)",
          "Continuous Custom Agent Skill & Workflow Additions (Zero Hidden Labour)",
          "Multi-Depot & Regional Branch Routing Quality Assurance",
          "Dedicated Senior AI Architect Desk & Guaranteed 30-Min SLA",
          "Weekly Executive Review Calls: Call conversion, dispatch & growth ROI",
        ],
        cta: "Book Voice Audit",
        featured: false,
        tag: "Enterprise Retainer",
      },
    ],
  },

  // Contact Concierge Copy (`/contact`)
  contactPage: {
    headerTitle: "Stop letting high-ticket commercial calls roll to voicemail.",
    headerHighlight: "Direct Gateway",
    headerSubtitle: "Ready to deploy 24/7 AI voice phone agents and spatial dispatch configured specifically for your operations? Connect directly below.",
    supportEyebrow: "DIRECT ENGINEERING ASSISTANCE",
    supportTitle: "Direct Human Response",
    supportDescription: "Speak directly with our senior AI automation architects in the UK. Zero generic ticketing queues.",
    emailLabel: "Direct Email",
    phoneLabel: "Call or WhatsApp",
    slaLabel: "Response Standard",
    slaValue: "Replied Within 1 Business Hour",
    whatsNextTitle: "What Occurs Next?",
    whatsNextItems: [
      "Instant acknowledgment and call flow assessment.",
      "15-minute diagnostic audit to review your call volume and dispatch bottlenecks.",
      "Live interactive voice agent demonstration configured for your exact services.",
    ],
  },

  // Testimonials / Cohort Status Page Copy
  testimonialsPage: {
    headerTitle: "Quantified Outcomes &",
    headerHighlight: "Verified Revenue Recovery",
    headerSubtitle: "How commercial operators eliminate missed after-hours calls, automate dispatch, and add 6-figure revenue with 24/7 AI voice infrastructure.",
  },

  // Booking Page Copy (`/book`)
  bookPage: {
    clinicalEvaluationLabel: "15-Minute Voice Diagnostic Audit",
    headerTitle: "Uncover precisely where your business is losing",
    headerHighlight: "contracts, emergency jobs, and billable hours.",
    headerSubtitle: "Reserve a 15-minute slot on our live diary. We will dissect your inbound call flow, demonstrate a live custom AI voice agent, and present the exact autonomous blueprint to capture 100% of demand.",
    trustItems: [
      "15-minute focused operational consultation on your schedule",
      "Live custom AI voice agent demonstration for your firm",
      "Guaranteed 7-day deployment timeline"
    ],
    socialProofQuote: "On this 15-minute call, we reveal the exact autonomous voice protocol that enables premier UK operators to answer every call in <500ms, collect upfront deposits, and eliminate dispatcher bottlenecks 24/7.",
    socialProofAuthor: "Mercian Wealth Standard",
  },
};
