'use client'

import { useState, useEffect, useCallback } from 'react'
import type { WhatsApp3MessageSequence, VariableY } from '@/lib/auditor/types'
import { buildWhatsApp3MessageSequence } from '@/lib/auditor/deterministic'

export interface OutreachLead {
  id: string
  name: string
  business_name?: string
  email?: string
  phone?: string
  website?: string
  service_interested?: string
  status: string
  source?: string
  created_at: string
  is_archived?: boolean
  local_business_niche?: string
  outreach_category?: string
  outreach_stage?: string
  whatsapp_direct_url?: string
  prototype_url?: string
  notes?: string
  scraped_metadata?: {
    rating?: number | string
    reviews_count?: number | string
    reviews?: number | string
    rating_reviews?: string
    address?: string
    trade?: string
    stage_1_opener?: string
    stage_2_pitch?: string
    follow_up_1?: string
    follow_up_final?: string
    google_maps_url?: string
    channel?: string
  }
}

export interface NicheProfile {
  nicheName: string
  coreOffering: string
  offeringBenefits: string
  keyAction1: string
  depositPercentage: string
  theMath: string
  defaultTicket: number
  ticketLabel: string
  itemsOrJobs: string
  missedDefault: number
}

export interface EvidenceItem {
  type: 'observed' | 'inferred' | 'measured'
  label: string
}

export interface PipelineMessage {
  id: string
  label: string
  message: string
}

export interface PlaybookEngine {
  // Lead metadata
  businessName: string
  trade: string
  hasWebsite: boolean
  isMobile: boolean
  isLandline: boolean
  cleanDigits: string
  address: string
  city: string
  rating: number
  reviewsCount: number
  protoUrl: string
  mapsUrl: string | undefined
  nicheProfile: NicheProfile

  // Human-readable operator outputs
  recommendedChannel: 'whatsapp' | 'call'
  nextActionLabel: string
  nextActionReason: string
  suggestedAngle: string
  recommendedApproach: string
  evidenceItems: EvidenceItem[]

  // Current message for selected channel
  callOpener: string
  whatsappMessage: string
  whatsAppSequence: WhatsApp3MessageSequence
  emailSubject: string
  emailXMessage: string

  // Selectable pipeline messages (collapsed section)
  pipelineMessages: PipelineMessage[]

  // Revenue calculator state
  ticketValue: number
  missedEnquiries: number
  monthlyBleed: number
  annualBleed: number
  setTicketValue: (v: number) => void
  setMissedEnquiries: (v: number) => void

  // Sub-step state for Track A (advanced mode)
  trackAStep: 'a1_mobile' | 'a2_password' | 'a3_linktree' | 'a4_custom'
  setTrackAStep: (v: 'a1_mobile' | 'a2_password' | 'a3_linktree' | 'a4_custom') => void
  customObservation: string
  setCustomObservation: (v: string) => void

  // Actions
  handleCopy: (text?: string) => Promise<void>
  handleWhatsApp: (text?: string) => void
  handleCall: () => void
  copied: boolean
}

function detectNiche(trade: string, businessName: string): NicheProfile {
  const t = trade.toLowerCase()
  const b = businessName.toLowerCase()

  const isAccountant =
    t.includes('account') || b.includes('account') ||
    t.includes('tax') || b.includes('tax') ||
    t.includes('bookkeep') || b.includes('bookkeep') ||
    t.includes('audit') || b.includes('audit') ||
    t.includes('practice') || b.includes('practice') ||
    t.includes('payroll') || b.includes('payroll')

  if (isAccountant) {
    return {
      nicheName: 'Chartered Accounting Practice',
      coreOffering: 'corporate tax, statutory accounts, payroll & business advisory',
      offeringBenefits: 'ICAEW / ACCA credentials, MTD compliance & proactive tax planning',
      keyAction1: 'book an initial discovery & scoping consultation',
      depositPercentage: 'direct monthly retainer mandate',
      theMath: 'securing 1 or 2 new Ltd Co annual retainers',
      defaultTicket: 3500,
      ticketLabel: 'annual corporate client retainer',
      itemsOrJobs: 'retainers',
      missedDefault: 2,
    }
  }

  const isDiamond =
    t.includes('diamond') || b.includes('diamond') || t.includes('gem') || t.includes('atelier')
  const isJewellery =
    isDiamond || t.includes('jewel') || t.includes('gold') || t.includes('watch')
  const isContractor =
    t.includes('build') || t.includes('roof') || t.includes('plumb') || t.includes('electr') ||
    t.includes('join') || t.includes('carpent') || t.includes('contract') || t.includes('landscap')
  const isClinic =
    t.includes('clinic') || t.includes('aesthet') || t.includes('dent') ||
    t.includes('skin') || t.includes('salon') || t.includes('spa')

  if (isDiamond) {
    return {
      nicheName: 'Diamond Atelier & Fine Jeweller',
      coreOffering: 'bespoke diamond commissions, engagement rings & fine jewellery',
      offeringBenefits: '4Cs grading, certified diamond carats & bespoke atelier craftsmanship',
      keyAction1: 'book a private showroom consultation or appointment',
      depositPercentage: '20% holding deposit or bespoke design lock',
      theMath: 'securing 1 bespoke diamond ring or custom piece',
      defaultTicket: 3000,
      ticketLabel: 'bespoke diamond ring or custom commission',
      itemsOrJobs: 'pieces',
      missedDefault: 2,
    }
  }
  if (isJewellery) {
    return {
      nicheName: 'High-End Jeweller',
      coreOffering: 'curated pre-loved gold, watches & bespoke pieces',
      offeringBenefits: 'verified hallmarks, carats & workshop craftsmanship',
      keyAction1: 'book a private in-store viewing',
      depositPercentage: '20% holding deposit to reserve in safe',
      theMath: 'selling 1 vintage watch or 2 gold rings',
      defaultTicket: 2500,
      ticketLabel: 'bespoke commission or estate piece',
      itemsOrJobs: 'pieces',
      missedDefault: 2,
    }
  }
  if (isContractor) {
    return {
      nicheName: 'Trade Contractor',
      coreOffering: 'extensions, structural renovations & trade projects',
      offeringBenefits: 'before/after project transformations & structural warranties',
      keyAction1: 'request an on-site survey & instant quote',
      depositPercentage: '£250 project scoping deposit',
      theMath: 'winning 1 renovation or roofing contract',
      defaultTicket: 3500,
      ticketLabel: 'contract or renovation job',
      itemsOrJobs: 'jobs',
      missedDefault: 2,
    }
  }
  if (isClinic) {
    return {
      nicheName: 'Clinic / Aesthetics',
      coreOffering: 'bespoke cosmetic treatments & clinical procedures',
      offeringBenefits: 'treatment results, practitioner credentials & fixed pricing',
      keyAction1: 'schedule a private consultation',
      depositPercentage: '£50 consultation booking deposit',
      theMath: 'booking 2 treatment courses',
      defaultTicket: 600,
      ticketLabel: 'treatment package or procedure',
      itemsOrJobs: 'treatments',
      missedDefault: 4,
    }
  }
  return {
    nicheName: 'Local High-Ticket Service',
    coreOffering: `${trade} commissions & client projects`,
    offeringBenefits: 'verified client reviews, past project showcases & pricing',
    keyAction1: 'schedule an initial consultation',
    depositPercentage: 'a secure card deposit',
    theMath: 'securing 1 or 2 new client bookings',
    defaultTicket: 1500,
    ticketLabel: 'client project or booking',
    itemsOrJobs: 'services',
    missedDefault: 3,
  }
}

export function usePlaybookEngine(lead: OutreachLead | null): PlaybookEngine {
  const businessName = lead?.business_name || lead?.name || 'Local Business'
  const rawTrade = lead?.local_business_niche || lead?.scraped_metadata?.trade || 'local trade'
  const cleanTrade =
    !rawTrade || rawTrade.length > 30 || rawTrade.startsWith('Hi ') || rawTrade.toLowerCase().includes('came across')
      ? 'local trade'
      : rawTrade
  const trade = cleanTrade

  const nicheProfile = detectNiche(trade, businessName)

  // Website detection
  const rawWebsite = (lead?.website || '').trim()
  const hasWebsite =
    rawWebsite !== '' &&
    rawWebsite !== 'None' &&
    rawWebsite !== 'NO WEBSITE' &&
    !rawWebsite.toLowerCase().includes('facebook.com') &&
    !rawWebsite.toLowerCase().includes('instagram.com')

  // Phone detection
  const cleanDigits = (lead?.phone || '').replace(/[^0-9]/g, '')
  const isMobile = cleanDigits.startsWith('447') || cleanDigits.startsWith('07')
  const isLandline = !isMobile && cleanDigits.length > 5

  // Rating & reviews
  let rating = Number(lead?.scraped_metadata?.rating || 5.0)
  let reviewsCount = Number(
    lead?.scraped_metadata?.reviews_count ??
    (lead?.scraped_metadata as Record<string, unknown>)?.reviews ??
    0
  )
  const compositeRating =
    (lead?.scraped_metadata as Record<string, unknown>)?.rating_reviews as string ||
    lead?.notes || ''
  if ((!reviewsCount || reviewsCount === 0) && compositeRating) {
    const match = compositeRating.match(/(\d+)\s*\([★*]?\s*([\d.]+)\)/)
    if (match) {
      reviewsCount = parseInt(match[1], 10)
      rating = parseFloat(match[2])
    }
  }

  // Address
  const rawAddr = (lead?.scraped_metadata?.address || '').trim()
  const rawNotes = (lead?.notes || '').trim()
  let address = rawAddr
  if (!address && rawNotes && !rawNotes.startsWith('·') && !rawNotes.includes('★')) {
    address = rawNotes
  }
  if (!address || address.startsWith('·') || address.includes('★')) {
    address = 'UK Regional'
  }
  const city =
    address && address !== 'UK Regional' && !address.includes('·')
      ? address.split(',')[0].trim()
      : 'your area'

  const mapsUrl = lead?.scraped_metadata?.google_maps_url

  // Prototype URL
  const demoUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/preview/demo?name=${encodeURIComponent(businessName)}&trade=${encodeURIComponent(trade)}&phone=${encodeURIComponent(lead?.phone || '')}&city=${encodeURIComponent(address)}&rating=${rating}&reviews=${reviewsCount}`
      : `https://mercianwealth.co.uk/preview/demo?name=${encodeURIComponent(businessName)}`

  const isJewellery =
    trade.toLowerCase().includes('jewel') ||
    trade.toLowerCase().includes('gold') ||
    trade.toLowerCase().includes('diamond') ||
    trade.toLowerCase().includes('watch')

  const isContractor =
    trade.toLowerCase().includes('build') || trade.toLowerCase().includes('roof') ||
    trade.toLowerCase().includes('plumb') || trade.toLowerCase().includes('electr') ||
    trade.toLowerCase().includes('join') || trade.toLowerCase().includes('carpent') ||
    trade.toLowerCase().includes('contract') || trade.toLowerCase().includes('landscap')

  const protoUrl =
    lead?.prototype_url ||
    (isJewellery
      ? `https://veyra-premium-3-d-jewellery-e-comme.vercel.app/?client=${encodeURIComponent(businessName)}`
      : demoUrl)

  const ownerName =
    lead?.name && lead.name !== lead.business_name && !lead.name.includes('Owner')
      ? lead.name.split(' ')[0]
      : ''

  // State
  const [ticketValue, setTicketValue] = useState<number>(nicheProfile.defaultTicket)
  const [missedEnquiries, setMissedEnquiries] = useState<number>(nicheProfile.missedDefault)
  const [trackAStep, setTrackAStep] = useState<'a1_mobile' | 'a2_password' | 'a3_linktree' | 'a4_custom'>('a1_mobile')
  const [customObservation, setCustomObservation] = useState('')
  const [copied, setCopied] = useState(false)

  // Sync on lead change
  useEffect(() => {
    if (lead) {
      setTicketValue(nicheProfile.defaultTicket)
      setMissedEnquiries(nicheProfile.missedDefault)
      if (hasWebsite) {
        setTrackAStep('a1_mobile')
        setCustomObservation("it's not loading properly on mobile, slow to respond, and hasn't been updated recently")
      } else {
        setCustomObservation('')
      }
      setCopied(false)
    }
  }, [lead?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const monthlyBleed = (ticketValue || 0) * (missedEnquiries || 0)
  const annualBleed = monthlyBleed * 12

  // ── Message content ────────────────────────────────────────────────────────

  // TRACK B MESSAGES (No Website)
  const trackBHandshake = `Hi 👋, is this ${businessName}?`

  const trackBQuestion = `Great! Came across ${businessName} — love the work you do.\n\nQuick question: do you have a dedicated mobile storefront where evening clients can browse your ${nicheProfile.coreOffering} and book, or do you handle everything strictly over the phone?`

  // NOTE: The fabricated 75% statistic has been removed. Replaced with evidence-based language.
  const trackBPitchPrototype = `Completely makes sense — that's actually why I reached out. You've clearly got the reputation, but without a digital storefront, customers searching in the evening or at weekends can't take action when they're ready.\n\nWhen someone is ready to book on a Sunday night, having no way to browse or enquire online means they often move on to whoever has something they can interact with straight away.\n\nRather than talk theory, I put together a quick working mobile prototype for ${businessName} showing how clients could browse your work and lock in a booking directly.\n\nOpen to taking a quick look on your phone? (Zero obligation at all 👍)`

  const trackBSunday = `Hi 👋 Came across ${businessName} — great reputation in ${city}.\n\nQuick observation: right now there's no digital storefront for evening clients to explore your ${nicheProfile.coreOffering} or lock in an appointment outside working hours.\n\nWhen someone discovers you after hours and can't take action, they tend to move on to whoever has something they can interact with right then.\n\nPut together a quick working mobile prototype for ${businessName} showing how clients could browse your work and confirm a booking directly on their phone.\n\nOpen to seeing a 30-second preview? (Zero obligation 👍)`

  const trackBDirect = `Hi ${ownerName || 'there'}, came across ${businessName} on Google — quick observation:\n\nYou've got top reviews, but no mobile storefront where clients searching in the evening can browse your ${nicheProfile.coreOffering} or lock in a slot outside working hours.\n\nWhen someone searches after hours with no way to take action, they tend to move on quickly.\n\nPut together a quick 30-second mobile concept showing how ${businessName} could capture those evening enquiries automatically.\n\nOpen to having a quick look on your phone? (If not, no worries at all 👍)`

  // TRACK A MESSAGES (Has Website)
  const trackAMobile = `Hi ${ownerName || 'there'}, came across ${businessName} — quick observation:\n\nNoticed your site on mobile has a form that takes quite a bit of pinching and scrolling to fill out on a smartphone.\n\nWhen high-intent clients search on their phone in the evening, having to type detailed specs on a small screen causes hesitation, so they drop off to whoever has instant booking.\n\nEngineered a fast 30-second mobile concept showing how clients could explore your ${nicheProfile.coreOffering} and lock in an appointment in 2 taps.\n\nOpen to taking a quick look on your phone? (If not, no worries at all 👍)`

  const trackAPassword = `Hi ${ownerName || 'there'}, came across ${businessName} — quick observation:\n\nNoticed ${hasWebsite ? rawWebsite.replace(/^https?:\/\//, '').replace(/\/.*$/, '') : 'your website storefront'} is currently locked behind a password screen, so clients visiting from Instagram or Google Maps can't actually view any pieces.\n\nWhen someone is looking for ${nicheProfile.coreOffering} in the evening, hitting a password wall creates immediate friction, and they bounce to another local option.\n\nPut together a quick 30-second mobile prototype showing how ${businessName} could showcase your collections and let clients reserve directly.\n\nOpen to having a quick look on your phone? (If not, no stress at all 👍)`

  const trackALinktree = `Hi team at ${businessName}, love the curation of your recent pieces.\n\nQuick observation — noticed your bio points to a Linktree where evening clients have to message back and forth on Instagram just to check prices or reserve a piece.\n\nWith high-value ${nicheProfile.itemsOrJobs}, having to wait hours for a DM reply causes buyers to hesitate and look elsewhere before you can respond.\n\nPut together a quick mobile prototype showing how ${businessName} could let clients browse verified pieces and lock in a holding deposit or viewing directly on their phone.\n\nOpen to seeing a quick 30-second preview link? (If not, no worries at all 👍)`

  const trackACustom = `Hi ${ownerName || 'there'}, came across ${businessName} — quick observation:\n\nNoticed ${customObservation.trim() || "your mobile layout is slow to respond and has no direct reservation mechanism"}.\n\nWhen high-intent evening clients search on their phone, that friction causes hesitation, so they leave and message whoever answers first.\n\nPut together a fast 30-second mobile concept showing how ${businessName} could streamline that step and capture bookings directly.\n\nOpen to taking a quick look on your phone? (If not, no worries at all 👍)`

  // Email X / Variable Y (Outreach #1 Written Pathway from PDFs)
  const emailPage = hasWebsite
    ? trackAStep === 'a1_mobile'
      ? 'your mobile quote/enquiry page'
      : trackAStep === 'a2_password'
      ? 'your storefront entrance'
      : trackAStep === 'a3_linktree'
      ? 'your bio link navigation'
      : 'your mobile booking flow'
    : 'your Google Maps presence'

  const emailProblem = hasWebsite
    ? trackAStep === 'a1_mobile'
      ? 'the enquiry form has multiple input fields that require extensive scrolling on a smartphone'
      : trackAStep === 'a2_password'
      ? 'the storefront is currently locked behind a password screen'
      : trackAStep === 'a3_linktree'
      ? 'the bio link points to a Linktree requiring social DMs rather than a direct booking storefront'
      : customObservation || 'the mobile booking lane has points of hesitation'
    : 'there is no dedicated digital storefront for evening customers'

  const emailReason = hasWebsite
    ? 'when evening buyers search on mobile, having to navigate unnecessary steps causes hesitation'
    : 'when someone is ready to book outside operating hours, having no digital booking means they cannot take action'

  const emailConsequence = hasWebsite
    ? 'they postpone the enquiry and leave to find whoever offers a fast 2-tap appointment'
    : 'they slip through to whoever takes online bookings first'

  const emailSubject = hasWebsite ? `Quick question regarding ${emailPage}` : `Mobile storefront for ${businessName}`

  const emailGreeting = ownerName ? `Hi ${ownerName},` : 'Hi,'
  const emailXMessage = `${emailGreeting}\n\nI noticed ${emailProblem} on ${emailPage}, and because ${emailReason}, ${emailConsequence}.\n\nI put together a quick 30-second mobile concept showing how ${businessName} could resolve this on ${emailPage}. You can review it fast, and if it's not useful, ignore it and it ends.\n\nOpen to taking a quick look?\n\nBest regards,\nGurtej\nMercian Wealth`

  // ── Unified 3-Message WhatsApp Sequence (Single Source of Truth) ─────────
  const engineVariableY: VariableY = {
    name: ownerName || undefined,
    company: businessName,
    website: hasWebsite ? rawWebsite.replace(/^https?:\/\//, '').replace(/\/.*$/, '') : 'None',
    page: emailPage,
    websiteProblem: emailProblem,
    evidence: hasWebsite ? `Observed on ${emailPage}` : 'Public Google Maps listing verified',
    customerNextStep: hasWebsite ? 'Request quote or book online' : 'Find and browse services after hours',
    lane: hasWebsite ? 'Mobile browsing & conversion lane' : 'Initial trust & verification',
    recognizableReason: emailReason,
    consequenceMechanics: emailConsequence,
    subjectLine: emailSubject,
  }

  const whatsAppSequence = buildWhatsApp3MessageSequence(
    engineVariableY,
    hasWebsite ? 'HAS_WEBSITE' : 'NO_WEBSITE',
    trade,
    city
  )

  const whatsappMessage = whatsAppSequence.message1.text

  // Call Opener
  const callOpener = hasWebsite
    ? `Hi, is this ${businessName}? I was looking at your website and noticed something specific — ${trackAStep === 'a1_mobile' ? 'your mobile form is quite complex to fill out on a phone' : trackAStep === 'a2_password' ? "it's currently password protected so clients can't browse" : trackAStep === 'a3_linktree' ? 'you\'re directing clients to a Linktree rather than a dedicated storefront' : customObservation || 'there\'s a friction point in the customer journey'}. Is that something you\'re aware of?`
    : `Hi, is this ${businessName}? Quick one — I noticed you've got a strong reputation on Google Maps with ${reviewsCount > 0 ? `${reviewsCount} reviews` : 'good reviews'}, but there's no dedicated digital storefront for customers who find you in the evening. I put together a quick prototype to show you what that could look like. Are you open to taking a look?`

  // Evidence items
  const evidenceItems: EvidenceItem[] = [
    ...(hasWebsite
      ? [{ type: 'observed' as const, label: `Website detected: ${rawWebsite.replace(/^https?:\/\//, '').replace(/\/$/, '')}` }]
      : [{ type: 'observed' as const, label: 'No website detected — digital presence opportunity' }]),
    ...(reviewsCount > 0
      ? [{ type: 'observed' as const, label: `${rating}★ / ${reviewsCount} Google reviews confirmed` }]
      : []),
    ...(mapsUrl
      ? [{ type: 'observed' as const, label: 'Google Maps listing confirmed' }]
      : []),
    ...(!hasWebsite
      ? [{ type: 'inferred' as const, label: 'Evening visitors may have limited options without a digital presence' }]
      : [{ type: 'inferred' as const, label: 'Evening mobile users may experience friction in the current journey' }]),
  ]

  // Next action
  const nextActionLabel = isMobile || !lead?.phone ? 'Send WhatsApp opener' : 'Call this lead'
  const recommendedChannel: 'whatsapp' | 'call' = isMobile ? 'whatsapp' : 'call'
  const nextActionReason = !hasWebsite
    ? `No digital storefront detected${reviewsCount > 0 ? ` — ${reviewsCount} Google reviews show established reputation` : ''}`
    : `Website detected — mobile friction angle available`
  const suggestedAngle = whatsAppSequence.message1.text
  const recommendedApproach = !hasWebsite
    ? `Lead with digital presence opportunity. ${businessName} has an established local reputation but no digital storefront for evening customers. Offer the prototype.`
    : `Lead with one specific observation about ${trackAStep === 'a1_mobile' ? 'mobile form friction' : trackAStep === 'a2_password' ? 'password lock on storefront' : trackAStep === 'a3_linktree' ? 'Linktree rather than dedicated storefront' : 'observed friction point'}. Never pitch on message 1.`

  // Pipeline messages (collapsed section — operator-facing labels only)
  const closedContext = isJewellery ? 'the showroom is closed' : isContractor ? "you're off the tools" : 'your premises are closed'
  const freeTimeContext = isJewellery ? 'between showroom clients' : isContractor ? 'off the tools' : 'with a spare minute'

  const qualifyIntroText = `Brilliant. Before I put it together on my end — I don't build generic templates. I engineer each system specifically around the exact customer journey and economics of ${businessName}.\n\nQuick 2-minute diagnostic so I get the prototype 100% dialled in for you:`
  const q1Text = `1. What's your primary high-ticket focus right now? And roughly what is an average ${nicheProfile.ticketLabel} worth to you in gross revenue?`
  const q2Text = `2. When a client wants to discuss a high-value project, do they currently just message back and forth, or do you have a dedicated booking system with a holding deposit to lock in surveys and eliminate no-shows?`
  const q3Text = `3. When someone discovers ${businessName} in the evening, what actually happens? Can they explore your work, build confidence, and lock in a consultation, or do they bounce to whoever answers online first?`
  const q4Text = `4. Realistically, how many potential high-ticket enquiries do you think slip through each month simply because there's no fast digital storefront capturing them outside working hours?\n\n(Estimate based on ${missedEnquiries} missed ${nicheProfile.itemsOrJobs} × £${ticketValue.toLocaleString()} = £${monthlyBleed.toLocaleString()}/month or £${annualBleed.toLocaleString()}/year.)`
  const q5Text = `5. So if having this system captures literally ONE single customer over the next 90 days that would have otherwise gone to a competitor — that completely pays off the entire project, right?`

  const prototypeText = `Hi ${ownerName || 'there'},\n\nI've put together that bespoke prototype for ${businessName} so you can see firsthand how this would work:\n\n👉 ${protoUrl}\n\nRather than a generic template, I engineered it specifically around how high-intent clients make buying decisions today:\n\n1. Captures evening & mobile traffic: Clients can explore your ${nicheProfile.offeringBenefits} and build trust before contacting you.\n2. Direct action & deposit locks: Clients can ${nicheProfile.keyAction1} or secure their slot instantly with ${nicheProfile.depositPercentage}.\n3. Sub-second speed: Built to load in under 400ms on 4G/5G mobile phones.\n\n(Note: The photos and items currently on there are realistic placeholders just to show you the layout and customer journey).\n\nWhen it comes to taking this live:\n• Full ownership: We build it, hand over the keys completely — zero monthly agency lock-in.\n• Hands-off managed: You WhatsApp us photos and prices of new ${nicheProfile.itemsOrJobs} as they come in.\n\nHave a browse through on your phone and let me know how you find it 👍`

  const bookCallText = `Glad you like how the prototype flows!\n\nWhen it comes to getting this live for ${businessName}, it's completely straightforward — either you own the system outright for a one-off £995 (where 1 single ${nicheProfile.theMath} pays off the entire build fee), or we manage it completely hands-off for £195/month.\n\nWould it be worth hopping on a quick 10-minute screen share or phone call so I can show you how the lead alerts & deposit routing work behind the scenes?\n\nI've got a slot open at 10:30 AM or 3:15 PM — do either of those work for you?`

  const pricingText = `Based on how we work with local businesses, here are the two options:\n\n---\n\nOption 1: Complete Asset Ownership\n• Build Fee: £995 one-off (or £495 for Essential 3-page builds)\n• Payment: 50% deposit to begin, 50% when fully live\n• 100% Asset Ownership: You own the code, domain, and customer data\n• The Math: Securing just ${nicheProfile.theMath} pays for the entire build fee\n\n---\n\nOption 2: Fully Managed Growth Retainer\n• Setup Fee: £495 initial setup\n• Management: £195/month (rolling monthly, cancel anytime)\n• Hosting, SSL, and domain renewals included\n• Unlimited stock & content updates via WhatsApp within 24h\n• Continuous local Google SEO ranking in ${city}\n\n---\n\nWhich setup suits you best?`

  const onboardingText = `Perfect. To turn the prototype into your live business system, all I need from you:\n\n1. Initial Content: 6–10 photos of your best ${nicheProfile.itemsOrJobs} along with prices and brief descriptions (you can send them right here on WhatsApp).\n2. Notifications: The phone number and email address where you want customer bookings and deposit receipts routed.\n3. Payouts: Your business bank details or existing Stripe account so 100% of customer deposits go directly to your account.\n\nI'll send over the invoice for the initial 50% deposit, and we can start getting your live site launched this week.`

  const scarcityText = `No problem at all, completely respect your decision.\n\nJust keep one thing in mind: when someone is actively looking for ${nicheProfile.coreOffering} in the evening, they don't wait — they go to whoever shows their work and allows them to book right then. Every week without a high-converting digital storefront hands those enquiries to whoever answers online first.\n\nI'll keep this prototype active for the next 48 hours in case you reconsider. After that, I'll archive the demo and offer the ${city} slot to another local ${trade} in the area so we don't build competing systems in the same territory.\n\nWishing you and ${businessName} all the best.`

  const voiceScript = `🎙️ 15-SECOND VOICE NOTE:\n\n"Hey ${ownerName || 'there'}, quick voice note — it's Gurtej from Mercian Wealth.\nHad a look for ${businessName} online and put together a free working prototype showing how your ${nicheProfile.coreOffering} can be showcased to capture evening enquiries.\nSent you the preview link above — take a look on your phone when you get a minute ${freeTimeContext} and let me know what you think!"`

  const pipelineMessages: PipelineMessage[] = [
    {
      id: 'qualify',
      label: 'Revenue leakage diagnostic',
      message: `${qualifyIntroText}\n\n${q1Text}\n\n${q2Text}\n\n${q3Text}\n\n${q4Text}\n\n${q5Text}`,
    },
    { id: 'prototype', label: 'Send prototype', message: prototypeText },
    { id: 'book_call', label: 'Book a call', message: bookCallText },
    { id: 'pricing', label: 'Pricing options (£995 / £195pm)', message: pricingText },
    { id: 'onboarding', label: 'Onboarding checklist', message: onboardingText },
    { id: 'scarcity', label: 'Final follow-up', message: scarcityText },
    { id: 'voice', label: 'Voice note script', message: voiceScript },
  ]

  const handleCopy = useCallback(async (text?: string) => {
    const toCopy = text || whatsappMessage
    try {
      await navigator.clipboard.writeText(toCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }, [whatsappMessage])

  const handleWhatsApp = useCallback((text?: string) => {
    const msg = text || whatsappMessage
    const waUrl = lead?.whatsapp_direct_url
      || (cleanDigits ? `https://wa.me/${cleanDigits}?text=${encodeURIComponent(msg)}` : '')
    if (waUrl) window.open(waUrl, '_blank')
  }, [lead?.whatsapp_direct_url, cleanDigits, whatsappMessage])

  const handleCall = useCallback(() => {
    if (lead?.phone) window.open(`tel:${lead.phone}`, '_self')
  }, [lead?.phone])

  return {
    businessName,
    trade,
    hasWebsite,
    isMobile,
    isLandline,
    cleanDigits,
    address,
    city,
    rating,
    reviewsCount,
    protoUrl,
    mapsUrl,
    nicheProfile,
    recommendedChannel,
    nextActionLabel,
    nextActionReason,
    suggestedAngle,
    recommendedApproach,
    evidenceItems,
    callOpener,
    whatsappMessage,
    whatsAppSequence,
    emailSubject,
    emailXMessage,
    pipelineMessages,
    ticketValue,
    missedEnquiries,
    monthlyBleed,
    annualBleed,
    setTicketValue,
    setMissedEnquiries,
    trackAStep,
    setTrackAStep,
    customObservation,
    setCustomObservation,
    handleCopy,
    handleWhatsApp,
    handleCall,
    copied,
  }
}
