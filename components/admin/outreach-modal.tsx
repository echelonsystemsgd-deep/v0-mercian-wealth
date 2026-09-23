'use client'

import { useState, useEffect } from 'react'
import {
  X,
  Send,
  Copy,
  Check,
  Phone,
  Globe,
  MapPin,
  Star,
  ExternalLink,
  Clock,
  Sparkles,
  AlertTriangle,
  Trash2,
  Mic,
  Flame,
  Calculator,
  ShieldCheck,
  TrendingDown,
  CheckCircle2
} from 'lucide-react'

import { AntigravityPromptModal } from './antigravity-prompt-modal'

export interface OutreachLead {
  id: string
  name: string
  business_name: string
  email: string
  phone: string | null
  website: string | null
  service_interested: string | null
  status: string
  source: string
  created_at: string
  is_archived: boolean
  local_business_niche?: string | null
  outreach_category?: string | null
  outreach_stage?: string | null
  whatsapp_direct_url?: string | null
  prototype_url?: string | null
  notes?: string | null
  scraped_metadata?: {
    rating?: number
    reviews_count?: number
    address?: string
    trade?: string
    stage_1_opener?: string
    stage_2_pitch?: string
    follow_up_1?: string
    follow_up_final?: string
    google_maps_url?: string
    channel?: string
  } | null
}

interface OutreachModalProps {
  isOpen: boolean
  onClose: () => void
  lead: OutreachLead | null
  onUpdateStatus: (leadId: string, newStatus: string) => Promise<void>
  onDeleteLead?: (leadId: string) => Promise<void>
}

export function OutreachModal({
  isOpen,
  onClose,
  lead,
  onUpdateStatus,
  onDeleteLead,
}: OutreachModalProps) {
  // 6 Playbook Stages + Voice Note
  const [activeTab, setActiveTab] = useState<
    'stage1' | 'stage2' | 'qualify' | 'stage3' | 'stage4' | 'stage5' | 'voice'
  >('stage1')

  // Sub-step states
  const [stage1Step, setStage1Step] = useState<'1a_confirm' | '1b_hook' | '1b_broken'>('1a_confirm')
  const [qualifyStep, setQualifyStep] = useState<'all' | 'q1' | 'q2' | 'q3' | 'q4'>('all')
  const [stage3Variant, setStage3Variant] = useState<'both' | 'option1' | 'option2'>('both')
  const [customObservation, setCustomObservation] = useState('')

  // Interactive Revenue Leakage Diagnostic Calculator State
  const [ticketValue, setTicketValue] = useState<number>(2500)
  const [missedEnquiries, setMissedEnquiries] = useState<number>(2)

  const [copied, setCopied] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [isPromptOpen, setIsPromptOpen] = useState(false)

  // Trade and Niche Profile Detection
  const businessName = lead?.business_name || 'Local Business'
  const rawTrade = lead?.local_business_niche || lead?.scraped_metadata?.trade || 'local trade'
  const cleanTrade =
    !rawTrade || rawTrade.length > 30 || rawTrade.startsWith('Hi ') || rawTrade.toLowerCase().includes('came across')
      ? 'local trade'
      : rawTrade
  const trade = cleanTrade.toLowerCase()

  const isJewellery =
    trade.includes('jewel') ||
    trade.includes('diamond') ||
    trade.includes('gold') ||
    trade.includes('gem') ||
    trade.includes('atelier') ||
    trade.includes('watch')
  const isContractor =
    trade.includes('build') ||
    trade.includes('roof') ||
    trade.includes('plumb') ||
    trade.includes('electr') ||
    trade.includes('join') ||
    trade.includes('carpent') ||
    trade.includes('contract') ||
    trade.includes('landscap')
  const isClinic =
    trade.includes('clinic') ||
    trade.includes('aesthet') ||
    trade.includes('dent') ||
    trade.includes('skin') ||
    trade.includes('salon') ||
    trade.includes('spa')

  const nicheProfile = isJewellery
    ? {
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
    : isContractor
    ? {
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
    : isClinic
    ? {
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
    : {
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

  // Synchronize defaults on lead change
  useEffect(() => {
    if (lead) {
      const rawWeb = (lead.website || '').trim()
      const hasWeb =
        rawWeb !== '' &&
        rawWeb !== 'None' &&
        rawWeb !== 'NO WEBSITE' &&
        !rawWeb.toLowerCase().includes('facebook.com') &&
        !rawWeb.toLowerCase().includes('instagram.com')
      if (hasWeb) {
        setCustomObservation("it's not loading properly on mobile, slow to respond, and hasn't been updated recently")
      } else {
        setCustomObservation('')
      }
      setTicketValue(nicheProfile.defaultTicket)
      setMissedEnquiries(nicheProfile.missedDefault)
    }
  }, [lead?.id])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen || !lead) return null

  const rawWebsite = (lead.website || '').trim()
  const hasWebsite =
    rawWebsite !== '' &&
    rawWebsite !== 'None' &&
    rawWebsite !== 'NO WEBSITE' &&
    !rawWebsite.toLowerCase().includes('facebook.com') &&
    !rawWebsite.toLowerCase().includes('instagram.com')

  // Rating and reviews sanitization
  let rating = Number(lead.scraped_metadata?.rating || 5.0)
  let reviewsCount = Number(lead.scraped_metadata?.reviews_count ?? (lead.scraped_metadata as any)?.reviews ?? 0)
  const compositeRating = (lead.scraped_metadata as any)?.rating_reviews || lead.notes || ''
  if ((!reviewsCount || reviewsCount === 0) && compositeRating) {
    const match = compositeRating.match(/(\d+)\s*\([★*]?\s*([\d.]+)\)/)
    if (match) {
      reviewsCount = parseInt(match[1], 10)
      rating = parseFloat(match[2])
    }
  }

  // Address sanitization
  const rawAddr = (lead.scraped_metadata?.address || '').trim()
  const rawNotes = (lead.notes || '').trim()
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

  // Phone Sanitization & Channel Detection
  const cleanDigits = (lead.phone || '').replace(/[^0-9]/g, '')
  const isMobile = cleanDigits.startsWith('447') || cleanDigits.startsWith('07')
  const isLandline = !isMobile && cleanDigits.length > 5

  // Live Prototype Dynamic URL
  const demoUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/preview/demo?name=${encodeURIComponent(businessName)}&trade=${encodeURIComponent(trade)}&phone=${encodeURIComponent(lead.phone || '')}&city=${encodeURIComponent(address)}&rating=${rating}&reviews=${reviewsCount}`
      : `https://mercianwealth.co.uk/preview/demo?name=${encodeURIComponent(businessName)}`

  const protoUrl =
    lead.prototype_url ||
    (isJewellery
      ? `https://veyra-premium-3-d-jewellery-e-comme.vercel.app/?client=${encodeURIComponent(businessName)}`
      : demoUrl)

  const ownerName =
    lead.name && lead.name !== lead.business_name && !lead.name.includes('Owner') ? lead.name.split(' ')[0] : ''

  // Calculated Financial Leakage
  const monthlyBleed = (ticketValue || 0) * (missedEnquiries || 0)
  const annualBleed = monthlyBleed * 12
  const oneJobRoi = ticketValue > 0 ? Math.round((ticketValue / 995) * 100) : 0

  // ─────────────────────────────────────────────────────────────────────────────
  // 6-STAGE STANDARDIZED SCRIPTS
  // ─────────────────────────────────────────────────────────────────────────────

  // STAGE 1: HOOK & OFFER
  const stage1Text =
    stage1Step === '1a_confirm'
      ? `Hi 👋, is this ${businessName}?`
      : stage1Step === '1b_broken'
      ? `Hi 👋 Came across ${businessName} — love the craftsmanship in your work. Had a quick look at your site, but ${customObservation.trim() || "it's not loading properly on mobile, slow to respond, and hasn't been updated recently"}.\n\nWhen high-intent customers find you on their phone in the evening, they want to browse your work, build confidence, and book or enquire right then.\n\nRather than just tell you what I mean, I'd be happy to put together a quick working prototype so you can actually see it on your phone — completely free, no obligation at all. Want me to put one together for you?`
      : `Hi 👋 Came across ${businessName} — love your work.\n\nDo you have a website or storefront I could look at where you showcase your ${nicheProfile.coreOffering}?\n\n(Wait for them to respond: "No / just social / visit shop")\n\nI had a look around ${businessName} and that's actually what caught my attention. You've already got the reputation and the business behind it, but when someone discovers you online in the evening and wants to properly look through what you offer, there's no dedicated place for them to do that. They can't easily browse your work, understand what you offer, build confidence, and take the next step.\n\nIt’s not about having a website just to say you've got one. It's about making sure that when someone is already interested, you've got somewhere that presents your business properly, builds trust, and turns that interest into a deposit or confirmed booking.\n\nRather than just tell you what I mean, I'd be happy to put together a quick working prototype so you can actually see it on your phone.\n\nIt wouldn't be a finished website — just something to show how your ${nicheProfile.coreOffering} could be presented and how customers might browse, decide, and get in touch.\n\nCompletely free, no obligation at all. Want me to put one together for you?`

  // STAGE 2: SEND PROTOTYPE
  const stage2Text = `Hi ${ownerName || 'there'},\n\nI’ve put together that prototype for ${businessName} so you can see firsthand how this would work for your business:\n\n👉 ${protoUrl}\n\nRather than a generic template, I engineered it specifically around how high-intent customers make buying decisions today:\n\n1. Captures Evening & Mobile Traffic: Over 75% of local searches in ${city} happen on mobile phones outside normal working hours. Customers can explore your exact ${nicheProfile.offeringBenefits} and build trust before contacting you.\n2. Direct Action & Deposit Locks: Customers can ${nicheProfile.keyAction1} or secure their slot instantly with an upfront ${nicheProfile.depositPercentage} so you stop time-wasters.\n3. Sub-Second Speed: Built to load in under 400ms on 4G/5G phones with zero friction or clunky forms.\n\n(Note: The photos and items currently on there are realistic placeholders just to show you the layout and customer journey).\n\nWhen it comes to taking this live, we work around whatever fits your schedule best:\n• If you want full ownership, we build it, hand over the keys completely, and you have zero monthly agency lock-in.\n• If you prefer a hands-off managed setup, you just WhatsApp us photos and prices of new ${nicheProfile.itemsOrJobs} as they come in, and we handle all uploads, updates, and maintenance for you.\n\nHave a browse through on your phone and let me know how you find it 👍`

  // STAGE 3: REVENUE LEAKAGE QUALIFYING FRAMEWORK
  const q1Text = `Before we talk about the build, just to understand the economics of your business — roughly what is an average ${nicheProfile.ticketLabel} worth to you in revenue or gross margin?`
  const q2Text = `Right now, over 75% of high-intent searches in ${city} happen on smartphones in the evening or on weekends when you're off the tools / shop is closed. When someone discovers ${businessName} on Sunday at 9 PM, what actually happens? Can they explore your work and lock in a consultation, or do they bounce to whoever answers online first?`
  const q3Text = `Realistically, how many potential high-ticket enquiries do you think slip through the cracks each month simply because there's no fast digital storefront capturing them outside working hours?\n\n(Math Anchor: ${missedEnquiries} missed ${nicheProfile.itemsOrJobs} × £${ticketValue.toLocaleString()} = £${monthlyBleed.toLocaleString()}/month or £${annualBleed.toLocaleString()}/year in leaking revenue).`
  const q4Text = `So if having this dedicated system captures literally ONE single customer over the next 90 days that would have otherwise gone to a competitor — that completely pays off the entire project, and everything after that is pure profit, right?`

  const qualifyFullText = `🔥 4-QUESTION REVENUE LEAKAGE DIAGNOSTIC (Run before presenting price):\n\n1. Question 1 (Ticket Anchor):\n"${q1Text}"\n→ Target: "Around £${ticketValue.toLocaleString()}"\n\n2. Question 2 (Sunday Evening Reality):\n"${q2Text}"\n→ Target: "They probably bounce / message someone else / wait until Monday"\n\n3. Question 3 (Quantifying Monthly Bleed):\n"${q3Text}"\n→ Target: "Probably 2 or 3 a month" (£${monthlyBleed.toLocaleString()}/mo | £${annualBleed.toLocaleString()}/year loss)\n\n4. Question 4 (The 1-Job Payoff Pre-Close):\n"${q4Text}"\n→ Target: "Yeah, absolutely."\n\n[Prospect has now pre-closed themselves before seeing the £995 or £495 price tag].`

  const qualifyText =
    qualifyStep === 'all'
      ? qualifyFullText
      : qualifyStep === 'q1'
      ? q1Text
      : qualifyStep === 'q2'
      ? q2Text
      : qualifyStep === 'q3'
      ? q3Text
      : q4Text

  // STAGE 4: DUAL PRICING PITCH
  const pricingOption1Text = `Option 1: Complete Asset Ownership (One-Off Investment)\nBest if you want a permanent asset with zero ongoing agency fees.\n\n• Build Fee: £995 one-off (or £495 for Essential 3-page builds)\n• Payment Terms: 50% initial deposit (£497.50) to begin uploading your actual photos/content and configuring payment payouts; remaining 50% only when the site is fully live and you are 100% satisfied.\n• 100% Asset Ownership: You own the website code, domain, and customer data completely.\n• Domain & Running Fees: You can manage your own domain/hosting, or if you prefer me to manage edge cloud servers & SSL renewals, it's just £12/month (or £120/year).\n• The Commercial Math: Securing just ${nicheProfile.theMath} pays for the entire build fee. Everything after that is pure profit.`

  const pricingOption2Text = `Option 2: Fully Managed Growth Retainer (100% Hands-Off)\nBest if you are busy running the business and don't want to touch any technology at all.\n\n• Setup Fee: £495 initial setup (reduced upfront build cost).\n• Management Retainer: £195 / month (rolling monthly, cancel anytime).\n• Domain & Running Fees: Hosting, SSL, and domain renewals are 100% included.\n• What We Handle Every Month:\n  - Unlimited stock & content updates via WhatsApp within 24h\n  - Pricing & calendar adjustments\n  - Continuous local Google SEO ranking in ${city}`

  const pricingBothText = `Based on how we work with local businesses, here is how the two options break down:\n\n---\n\n${pricingOption1Text}\n\n---\n\n${pricingOption2Text}\n\n---\n\nIf you want to own it outright, Option 1 is best. If you want someone to actively manage the updates and running fees for you hands-free, Option 2 is ideal.\n\nWhich setup suits you best?`

  const stage3Text =
    stage3Variant === 'both' ? pricingBothText : stage3Variant === 'option1' ? pricingOption1Text : pricingOption2Text

  // STAGE 5: ONBOARDING CHECKLIST
  const stage4Text = `Perfect. To turn the prototype into your live business system, all I need from you to get started is:\n\n1. Initial Content: 6–10 photos of your best ${nicheProfile.itemsOrJobs} along with prices and brief descriptions (you can just send them right here on WhatsApp).\n2. Notifications: The phone number and email address where you want customer bookings, quote alerts, and deposit receipts routed.\n3. Payouts: Your business bank details or existing Stripe account so 100% of customer deposits go directly to your account.\n\nI'll send over the invoice for the initial 50% deposit, and we can start getting your live site launched this week.`

  // STAGE 6: 48-HOUR MACHIAVELLIAN SCARCITY
  const stage5Text = `No problem at all, completely respect your decision.\n\nJust keep one commercial reality in mind: over 75% of customers in ${city} now research on their smartphones in the evening before ever making a phone call or visiting a premises.\n\nWhen someone is actively looking for ${nicheProfile.coreOffering} on a Sunday evening, they don't wait — they go to whoever shows their work, proves their credibility, and allows them to book or enquire right then. Every week without a high-converting digital storefront is essentially handing those lucrative jobs to whoever answers online first.\n\nI’ll keep this prototype active for the next 48 hours in case you reconsider. After that, I’ll be archiving the demo and offering the ${city} catchment slot to another local ${trade} in the area so we don't build competing systems in the same territory.\n\nWishing you and ${businessName} all the best with business.`

  // VOICE NOTE SCRIPT (15s)
  const voiceNoteScript = `🎙️ 15-SECOND VOICE NOTE SCRIPT (Speak naturally):\n\n"Hey ${ownerName || 'there'}, quick voice note — it's Gurtej from Mercian Wealth.\nHad a quick look for ${businessName} online and put together a free working prototype for you showing how your ${nicheProfile.coreOffering} can be showcased to capture evening mobile traffic in ${city}.\nSent you the preview link above, take a look on your phone when you get a minute off the tools and let me know what you think!"`

  const currentMessageText =
    activeTab === 'stage1'
      ? stage1Text
      : activeTab === 'stage2'
      ? stage2Text
      : activeTab === 'qualify'
      ? qualifyText
      : activeTab === 'stage3'
      ? stage3Text
      : activeTab === 'stage4'
      ? stage4Text
      : activeTab === 'stage5'
      ? stage5Text
      : voiceNoteScript

  const currentBadgeText =
    activeTab === 'stage1'
      ? stage1Step === '1a_confirm'
        ? 'Stage 1 · 1A Confirm Name'
        : stage1Step === '1b_hook'
        ? 'Stage 1 · 1B Core Hook & Offer'
        : 'Stage 1 · 1B Outdated/Broken Site Hook'
      : activeTab === 'stage2'
      ? 'Stage 2 · Deliver Working Prototype'
      : activeTab === 'qualify'
      ? qualifyStep === 'all'
        ? 'Stage 3 · Full Leakage Diagnostic'
        : `Stage 3 · ${qualifyStep.toUpperCase()} Question`
      : activeTab === 'stage3'
      ? stage3Variant === 'both'
        ? 'Stage 4 · Dual Pricing Pitch'
        : stage3Variant === 'option1'
        ? 'Stage 4 · Option 1 Asset Ownership'
        : 'Stage 4 · Option 2 Managed Retainer'
      : activeTab === 'stage4'
      ? 'Stage 5 · 3-Step Onboarding'
      : activeTab === 'stage5'
      ? 'Stage 6 · 48h Machiavellian Scarcity'
      : 'Voice Note Prompter'

  const handleCopy = () => {
    navigator.clipboard.writeText(currentMessageText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSendWhatsApp = async () => {
    if (!cleanDigits) return
    const textToSend = activeTab === 'voice' ? stage1Text : currentMessageText
    const url = `https://wa.me/${cleanDigits}?text=${encodeURIComponent(textToSend)}`
    window.open(url, '_blank')

    if (lead.status === 'New' && isMobile) {
      await onUpdateStatus(lead.id, 'Contacted')
    }
  }

  const handleStatusClick = async (status: string) => {
    setUpdating(true)
    try {
      await onUpdateStatus(lead.id, status)
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-[#0B0B0D] border border-white/10 rounded-2xl card-depth overflow-hidden z-10 flex flex-col max-h-[92vh]">
        {/* Header Strip */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-[#141417]/50 flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#141417] text-[#DAA640] border border-[#DAA640]/30">
                {nicheProfile.nicheName}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium border ${
                  lead.status === 'Won'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : lead.status === 'Lost'
                    ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                    : lead.status === 'Contacted'
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    : 'bg-white/5 text-muted-foreground border-white/10'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    lead.status === 'Won'
                      ? 'bg-emerald-400'
                      : lead.status === 'Lost'
                      ? 'bg-rose-400'
                      : lead.status === 'Contacted'
                      ? 'bg-amber-400'
                      : 'bg-[#DAA640]'
                  }`}
                />
                {lead.status}
              </span>
              {!hasWebsite && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium bg-rose-500/10 text-rose-400 border border-rose-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  No Website
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-foreground">{businessName}</h2>
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground pt-0.5">
              <span className="flex items-center gap-1 text-foreground font-medium">
                <Star size={12} className="fill-[#DAA640] text-[#DAA640]" /> {rating} ({reviewsCount} reviews)
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Phone size={12} /> {lead.phone || 'No phone'}
              </span>
              <span>•</span>
              <span className="text-accent-gold/90 font-mono text-[11px]">
                Target: {nicheProfile.ticketLabel} (£{nicheProfile.defaultTicket.toLocaleString()})
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-5 overflow-y-auto flex-1 discord-scroll">
          {/* Telemetry / Info Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-[#141417] border border-white/5 text-xs">
            <div>
              <p className="text-[11px] font-medium text-muted-foreground">Digital Presence</p>
              {hasWebsite ? (
                <a
                  href={rawWebsite.startsWith('http') ? rawWebsite : `https://${rawWebsite}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#DAA640] hover:underline flex items-center gap-1 font-medium mt-1 truncate"
                >
                  <Globe size={12} /> {rawWebsite} <ExternalLink size={10} />
                </a>
              ) : (
                <span className="text-amber-400 font-medium flex items-center gap-1 mt-1">
                  <AlertTriangle size={12} /> No custom storefront
                </span>
              )}
            </div>

            <div>
              <p className="text-[11px] font-medium text-muted-foreground">Location</p>
              <p className="text-foreground truncate flex items-center gap-1 mt-1">
                <MapPin size={12} className="text-[#DAA640] shrink-0" /> {address}
              </p>
            </div>

            <div>
              <p className="text-[11px] font-medium text-muted-foreground">Prototype Preview</p>
              <div className="flex items-center gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => setIsPromptOpen(true)}
                  className="text-[#DAA640] hover:text-white hover:underline flex items-center gap-1 font-medium text-xs cursor-pointer"
                  title="Open Antigravity Vibecoding Prompts"
                >
                  <Sparkles size={12} className="text-[#DAA640]" /> Prompt
                </button>
                <span className="text-muted-foreground">•</span>
                <a
                  href={protoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-white hover:underline flex items-center gap-1 font-medium text-xs truncate"
                  title="Open Live Prototype Preview"
                >
                  Live Demo <ExternalLink size={10} />
                </a>
              </div>
            </div>
          </div>

          {/* Sequence Tabs */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                Playbook Acquisition Pipeline
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                1-Job Anchor: <strong className="text-accent-gold">£{ticketValue.toLocaleString()}</strong>
              </span>
            </div>

            {/* Sequence Tabs Bar */}
            <div className="grid grid-cols-3 sm:grid-cols-7 gap-1 p-1 rounded-xl bg-[#141417] border border-white/5">
              <button
                onClick={() => setActiveTab('stage1')}
                className={`py-2 px-1 text-[11px] font-medium rounded-lg transition-all cursor-pointer text-center truncate ${
                  activeTab === 'stage1'
                    ? 'bg-[#DAA640]/15 text-[#DAA640] border border-[#DAA640]/30 font-bold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
              >
                1. Hook
              </button>
              <button
                onClick={() => setActiveTab('stage2')}
                className={`py-2 px-1 text-[11px] font-medium rounded-lg transition-all cursor-pointer text-center truncate ${
                  activeTab === 'stage2'
                    ? 'bg-[#DAA640]/15 text-[#DAA640] border border-[#DAA640]/30 font-bold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
              >
                2. Prototype
              </button>
              <button
                onClick={() => setActiveTab('qualify')}
                className={`py-2 px-1 text-[11px] font-medium rounded-lg transition-all cursor-pointer text-center flex items-center justify-center gap-1 truncate ${
                  activeTab === 'qualify'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                    : 'text-amber-400/80 hover:text-amber-300 hover:bg-amber-500/10'
                }`}
                title="Mandatory Diagnostic: Qualify Leakage before pricing!"
              >
                <Flame size={12} className="text-amber-400 shrink-0" />
                <span className="truncate">3. Qualify</span>
              </button>
              <button
                onClick={() => setActiveTab('stage3')}
                className={`py-2 px-1 text-[11px] font-medium rounded-lg transition-all cursor-pointer text-center truncate ${
                  activeTab === 'stage3'
                    ? 'bg-[#DAA640]/15 text-[#DAA640] border border-[#DAA640]/30 font-bold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
              >
                4. Pricing
              </button>
              <button
                onClick={() => setActiveTab('stage4')}
                className={`py-2 px-1 text-[11px] font-medium rounded-lg transition-all cursor-pointer text-center truncate ${
                  activeTab === 'stage4'
                    ? 'bg-[#DAA640]/15 text-[#DAA640] border border-[#DAA640]/30 font-bold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
              >
                5. Onboard
              </button>
              <button
                onClick={() => setActiveTab('stage5')}
                className={`py-2 px-1 text-[11px] font-medium rounded-lg transition-all cursor-pointer text-center truncate ${
                  activeTab === 'stage5'
                    ? 'bg-[#DAA640]/15 text-[#DAA640] border border-[#DAA640]/30 font-bold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
              >
                6. Scarcity
              </button>
              <button
                onClick={() => setActiveTab('voice')}
                className={`py-2 px-1 text-[11px] font-medium rounded-lg transition-all cursor-pointer text-center flex items-center justify-center gap-1 truncate ${
                  activeTab === 'voice'
                    ? 'bg-[#DAA640]/15 text-[#DAA640] border border-[#DAA640]/30 font-bold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
              >
                <Mic size={11} className="shrink-0" /> Voice
              </button>
            </div>

            {/* TAB 1: HOOK SUB-SELECTORS */}
            {activeTab === 'stage1' && (
              <div className="space-y-2.5">
                <div className="flex flex-wrap gap-2 p-1.5 rounded-lg bg-[#141417] border border-white/5 text-xs">
                  <button
                    onClick={() => setStage1Step('1a_confirm')}
                    className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                      stage1Step === '1a_confirm'
                        ? 'bg-[#DAA640]/20 text-[#DAA640] border border-[#DAA640]/30'
                        : 'text-muted-foreground hover:text-white'
                    }`}
                  >
                    1A. Confirm Name
                  </button>
                  <button
                    onClick={() => setStage1Step('1b_hook')}
                    className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                      stage1Step === '1b_hook'
                        ? 'bg-[#DAA640]/20 text-[#DAA640] border border-[#DAA640]/30'
                        : 'text-muted-foreground hover:text-white'
                    }`}
                  >
                    1B. Hook & Free Prototype Offer
                  </button>
                  <button
                    onClick={() => setStage1Step('1b_broken')}
                    className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                      stage1Step === '1b_broken'
                        ? 'bg-[#DAA640]/20 text-[#DAA640] border border-[#DAA640]/30'
                        : 'text-muted-foreground hover:text-white'
                    }`}
                  >
                    1B. Hook (Outdated / Broken Site)
                  </button>
                </div>

                {stage1Step === '1b_broken' && (
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#141417] border border-white/10 text-xs">
                    <span className="text-muted-foreground shrink-0 font-medium text-[11px]">Specific Observation:</span>
                    <input
                      type="text"
                      value={customObservation}
                      onChange={(e) => setCustomObservation(e.target.value)}
                      placeholder="e.g. it's not loading, slow to respond, hasn't been updated recently"
                      className="w-full bg-transparent border-none outline-none text-xs text-foreground placeholder:text-zinc-500 font-sans"
                    />
                  </div>
                )}

                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                  <span>
                    <strong>Stage 1 Protocol:</strong> Send <strong>1A</strong> and wait for their confirmation. Once confirmed, send <strong>1B</strong> to propose the free working prototype.
                  </span>
                </div>
              </div>
            )}

            {/* TAB 2: PROTOTYPE PROTOCOL */}
            {activeTab === 'stage2' && (
              <div className="space-y-2.5">
                <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                  <span>
                    <strong>Stage 2 Protocol:</strong> Send the live prototype link highlighting Evening Mobile Traffic, Direct Action & Deposit Locks, and Sub-Second Speed.
                  </span>
                </div>
              </div>
            )}

            {/* TAB 3: REVENUE LEAKAGE DIAGNOSTIC & CALCULATOR */}
            {activeTab === 'qualify' && (
              <div className="space-y-3">
                {/* Interactive Revenue Leakage Diagnostic Engine */}
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-amber-500/10 via-[#181512] to-amber-500/5 border border-amber-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                      <Calculator size={14} />
                      <span>Revenue Leakage Diagnostic Engine</span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400">
                      Anchors £995 as {oneJobRoi}% ROI
                    </span>
                  </div>

                  {/* Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] text-muted-foreground flex items-center justify-between">
                        <span>Average Ticket / Job Value</span>
                        <span className="text-foreground font-mono font-bold">£{ticketValue.toLocaleString()}</span>
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">£</span>
                        <input
                          type="number"
                          step={100}
                          min={100}
                          value={ticketValue}
                          onChange={(e) => setTicketValue(Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-black/50 border border-white/10 text-xs text-foreground font-mono focus:border-amber-400 outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] text-muted-foreground flex items-center justify-between">
                        <span>Missed Enquiries / Month</span>
                        <span className="text-foreground font-mono font-bold">{missedEnquiries} missed</span>
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={30}
                        value={missedEnquiries}
                        onChange={(e) => setMissedEnquiries(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-black/50 border border-white/10 text-xs text-foreground font-mono focus:border-amber-400 outline-none"
                      />
                    </div>
                  </div>

                  {/* Calculations Strip */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-amber-500/20 text-center">
                    <div className="p-2 rounded-lg bg-black/40 border border-amber-500/20">
                      <p className="text-[10px] text-zinc-400 uppercase">Monthly Bleed</p>
                      <p className="text-xs sm:text-sm font-mono font-bold text-rose-400">
                        £{monthlyBleed.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-2 rounded-lg bg-black/40 border border-amber-500/20">
                      <p className="text-[10px] text-zinc-400 uppercase">Annual Loss</p>
                      <p className="text-xs sm:text-sm font-mono font-bold text-rose-300">
                        £{annualBleed.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-2 rounded-lg bg-black/40 border border-emerald-500/20">
                      <p className="text-[10px] text-zinc-400 uppercase">1-Job Payoff</p>
                      <p className="text-xs sm:text-sm font-mono font-bold text-emerald-400">
                        {oneJobRoi}% ROI
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sub-steps Selector */}
                <div className="flex flex-wrap gap-1.5 p-1 rounded-lg bg-[#141417] border border-white/5 text-xs">
                  <button
                    onClick={() => setQualifyStep('all')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                      qualifyStep === 'all'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'text-muted-foreground hover:text-white'
                    }`}
                  >
                    Full 4-Step Walkthrough
                  </button>
                  <button
                    onClick={() => setQualifyStep('q1')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                      qualifyStep === 'q1'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'text-muted-foreground hover:text-white'
                    }`}
                  >
                    Q1: Ticket Anchor
                  </button>
                  <button
                    onClick={() => setQualifyStep('q2')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                      qualifyStep === 'q2'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'text-muted-foreground hover:text-white'
                    }`}
                  >
                    Q2: Sunday Evening
                  </button>
                  <button
                    onClick={() => setQualifyStep('q3')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                      qualifyStep === 'q3'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'text-muted-foreground hover:text-white'
                    }`}
                  >
                    Q3: Monthly Bleed
                  </button>
                  <button
                    onClick={() => setQualifyStep('q4')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                      qualifyStep === 'q4'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'text-muted-foreground hover:text-white'
                    }`}
                  >
                    Q4: 1-Job Pre-Close
                  </button>
                </div>
              </div>
            )}

            {/* TAB 4: DUAL PRICING SUB-SELECTORS */}
            {activeTab === 'stage3' && (
              <div className="space-y-2.5">
                <div className="flex flex-wrap gap-2 p-1.5 rounded-lg bg-[#141417] border border-white/5 text-xs">
                  <button
                    onClick={() => setStage3Variant('both')}
                    className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                      stage3Variant === 'both'
                        ? 'bg-[#DAA640]/20 text-[#DAA640] border border-[#DAA640]/30'
                        : 'text-muted-foreground hover:text-white'
                    }`}
                  >
                    Complete Dual Pathway Pitch
                  </button>
                  <button
                    onClick={() => setStage3Variant('option1')}
                    className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                      stage3Variant === 'option1'
                        ? 'bg-[#DAA640]/20 text-[#DAA640] border border-[#DAA640]/30'
                        : 'text-muted-foreground hover:text-white'
                    }`}
                  >
                    Option 1: £995 Asset Ownership
                  </button>
                  <button
                    onClick={() => setStage3Variant('option2')}
                    className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                      stage3Variant === 'option2'
                        ? 'bg-[#DAA640]/20 text-[#DAA640] border border-[#DAA640]/30'
                        : 'text-muted-foreground hover:text-white'
                    }`}
                  >
                    Option 2: £495 + £195/mo Retainer
                  </button>
                </div>

                <div className="p-2.5 rounded-xl bg-[#DAA640]/10 border border-[#DAA640]/20 text-[#DAA640] text-xs flex items-center gap-2">
                  <ShieldCheck size={14} className="shrink-0" />
                  <span>
                    <strong>Commercial Math Rule:</strong> Always frame £995 against their £{annualBleed.toLocaleString()} annual leak. 1 order pays off the build completely!
                  </span>
                </div>
              </div>
            )}

            {/* TAB 5: ONBOARDING PROTOCOL */}
            {activeTab === 'stage4' && (
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 size={14} className="shrink-0" />
                <span>
                  <strong>Stage 5 Onboarding:</strong> Send the 3-step checklist (Photos, Routing, Bank/Stripe) and issue initial 50% deposit invoice (£497.50).
                </span>
              </div>
            )}

            {/* TAB 6: 48H SCARCITY PROTOCOL */}
            {activeTab === 'stage5' && (
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                <AlertTriangle size={14} className="shrink-0" />
                <span>
                  <strong>Stage 6 Loss-Aversion:</strong> Send ONLY if prospect says &ldquo;Can&apos;t afford it&rdquo; or &ldquo;No thanks&rdquo;. Reallocates catchment territory to a competitor.
                </span>
              </div>
            )}

            {/* TAB 7: VOICE NOTE PROTOCOL */}
            {activeTab === 'voice' && (
              <div className="p-2.5 rounded-xl bg-[#DAA640]/10 border border-[#DAA640]/20 text-[#DAA640] text-xs flex items-center gap-2">
                <Mic size={13} className="shrink-0" />
                <span>
                  <strong>Voice Note Protocol:</strong> Speak naturally off the cuff. Keep it under 15 seconds.
                </span>
              </div>
            )}

            {/* Message Box */}
            <div className="relative rounded-xl bg-[#141417] border border-white/10 p-4 space-y-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground pb-2 border-b border-white/5">
                <span className="font-medium text-foreground">Message Body</span>
                <span className="text-[11px] font-mono text-[#DAA640]">{currentBadgeText}</span>
              </div>

              <p className="text-xs sm:text-sm text-foreground/90 font-sans leading-relaxed whitespace-pre-line select-all">
                {currentMessageText}
              </p>

              {isLandline && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2">
                    <Phone size={12} className="text-amber-400 shrink-0" />
                    <span>
                      <strong>UK Landline Notice:</strong> {lead.phone} is a regional landline. If WhatsApp does not connect, dial directly.
                    </span>
                  </span>
                  <a
                    href={`tel:${lead.phone}`}
                    className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 font-medium shrink-0 text-xs flex items-center gap-1"
                  >
                    <Phone size={12} /> Call Directly
                  </a>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/5">
                <button
                  onClick={handleCopy}
                  className="px-3 py-2 rounded-lg border border-white/10 hover:border-[#DAA640]/30 bg-white/5 hover:bg-[#DAA640]/10 text-xs font-medium text-foreground flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  {copied ? 'Copied' : 'Copy Script'}
                </button>

                {cleanDigits && (
                  <div className="flex items-center gap-2">
                    {isLandline && (
                      <a
                        href={`tel:${lead.phone}`}
                        className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-foreground border border-white/10 font-medium text-xs flex items-center gap-1.5 transition-all"
                      >
                        <Phone size={13} /> Call {lead.phone}
                      </a>
                    )}

                    <button
                      onClick={handleSendWhatsApp}
                      className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                      title={isLandline ? 'Try WhatsApp (if registered as WhatsApp Business)' : 'Open in WhatsApp'}
                    >
                      <Send size={13} /> Send via WhatsApp
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Outcome Status Bar */}
          <div className="space-y-2.5 pt-2 border-t border-white/5">
            <p className="text-xs font-medium text-muted-foreground">Update Lead Status:</p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              <button
                disabled={updating}
                onClick={() => handleStatusClick('New')}
                className={`py-2 px-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  lead.status === 'New'
                    ? 'bg-white/15 text-white border-white/30'
                    : 'bg-white/5 hover:bg-white/10 text-muted-foreground border-white/10'
                }`}
              >
                <Clock size={13} /> New
              </button>

              <button
                disabled={updating}
                onClick={() => handleStatusClick('Contacted')}
                className={`py-2 px-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  lead.status === 'Contacted'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-amber-500/5 hover:bg-amber-500/10 text-amber-400/80 border-amber-500/20'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Contacted
              </button>

              <button
                disabled={updating}
                onClick={() => handleStatusClick('Call Booked')}
                className={`py-2 px-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  lead.status === 'Call Booked'
                    ? 'bg-[#DAA640]/20 text-[#DAA640] border-[#DAA640]/40'
                    : 'bg-[#DAA640]/5 hover:bg-[#DAA640]/10 text-[#DAA640]/80 border-[#DAA640]/20'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#DAA640]" /> Booked
              </button>

              <button
                disabled={updating}
                onClick={() => handleStatusClick('Won')}
                className={`py-2 px-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  lead.status === 'Won'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-400/80 border-emerald-500/20'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Won
              </button>

              <button
                disabled={updating}
                onClick={() => handleStatusClick('Lost')}
                className={`py-2 px-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  lead.status === 'Lost'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : 'bg-rose-500/5 hover:bg-rose-500/10 text-rose-400/80 border-rose-500/20'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Lost
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/5 bg-black/40 flex items-center justify-between text-xs">
          {onDeleteLead && (
            <button
              onClick={() => {
                if (confirm(`Permanently delete "${businessName}"?`)) {
                  onDeleteLead(lead.id)
                  onClose()
                }
              }}
              className="text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Trash2 size={13} /> Delete Lead
            </button>
          )}

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-foreground font-semibold transition-all cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Dedicated Antigravity Vibecoding & Prototype Prompt Modal */}
      <AntigravityPromptModal isOpen={isPromptOpen} onClose={() => setIsPromptOpen(false)} lead={lead} />
    </div>
  )
}
