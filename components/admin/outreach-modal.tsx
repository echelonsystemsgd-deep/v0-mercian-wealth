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
  MessageSquare,
  Clock,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Trash2,
  Mic,
  Laptop,
  Flame,
  ThumbsUp
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
  const [activeTab, setActiveTab] = useState<'stage1' | 'stage2' | 'stage3' | 'followup' | 'closing' | 'voice'>('stage1')
  const [stage1Step, setStage1Step] = useState<'1a_confirm' | '1b_no_website' | '1b_broken_website'>('1a_confirm')
  const [stage2Variant, setStage2Variant] = useState<'combined' | 'soft_no'>('combined')
  const [followupStep, setFollowupStep] = useState<'followup1' | 'followup2' | 'followup3'>('followup1')
  const [closingBranch, setClosingBranch] = useState<'yes' | 'no'>('yes')
  const [customObservation, setCustomObservation] = useState('')
  const [copied, setCopied] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [isPromptOpen, setIsPromptOpen] = useState(false)

  // Auto-detect presence and set appropriate default pitch
  useEffect(() => {
    if (lead) {
      const rawWeb = (lead.website || '').trim()
      const hasWeb = rawWeb !== '' && rawWeb !== 'None' && rawWeb !== 'NO WEBSITE' && !rawWeb.toLowerCase().includes('facebook.com') && !rawWeb.toLowerCase().includes('instagram.com')
      if (hasWeb) {
        setCustomObservation("it's not loading properly on mobile, slow to respond, and hasn't been updated recently")
      }
    }
  }, [lead])

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

  const businessName = lead.business_name || 'Local Business'
  const trade = (lead.local_business_niche || lead.scraped_metadata?.trade || 'tradesperson').toLowerCase()
  const rawWebsite = (lead.website || '').trim()
  const hasWebsite = rawWebsite !== '' && rawWebsite !== 'None' && rawWebsite !== 'NO WEBSITE' && !rawWebsite.toLowerCase().includes('facebook.com') && !rawWebsite.toLowerCase().includes('instagram.com')
  
  // Rating and reviews sanitization (parse composite strings like '57 (★4.9)')
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

  // Address sanitization (filter out contaminated reviews/rating string)
  const rawAddr = (lead.scraped_metadata?.address || '').trim()
  const rawNotes = (lead.notes || '').trim()
  let address = rawAddr
  if (!address && rawNotes && !rawNotes.startsWith('·') && !rawNotes.includes('★')) {
    address = rawNotes
  }
  if (!address || address.startsWith('·') || address.includes('★')) {
    address = 'UK Regional'
  }
  const mapsUrl = lead.scraped_metadata?.google_maps_url

  // Phone Sanitization & Channel Detection
  const cleanDigits = (lead.phone || '').replace(/[^0-9]/g, '')
  const isMobile = cleanDigits.startsWith('447') || cleanDigits.startsWith('07')
  const isLandline = !isMobile && cleanDigits.length > 5

  // Live Prototype Dynamic URL
  const demoUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/preview/demo?name=${encodeURIComponent(businessName)}&trade=${encodeURIComponent(trade)}&phone=${encodeURIComponent(lead.phone || '')}&city=${encodeURIComponent(address)}&rating=${rating}&reviews=${reviewsCount}`
    : `https://mercianwealth.co.uk/preview/demo?name=${encodeURIComponent(businessName)}`

  // Domain name for upgrade pitch
  const domain = rawWebsite.replace(/^https?:\/\//, '').replace(/\/$/, '')

  // ─────────────────────────────────────────────────────────────────────────────
  // EXACT OUTREACH SCRIPTS (Full Standardized Framework)
  // ─────────────────────────────────────────────────────────────────────────────

  // STAGE 1: CONFIRM + INTRO
  const ownerName = lead.name && lead.name !== lead.business_name && !lead.name.includes('Owner') ? lead.name.split(' ')[0] : ''
  const stage1Text =
    stage1Step === '1a_confirm'
      ? `Hi 👋, is this ${businessName}?`
      : stage1Step === '1b_no_website'
      ? `Ah perfect 👍 I build websites for roofers, tradespeople, and construction businesses, and had a quick look but couldn't find a site for you — just WhatsApp/social by the looks of it.`
      : `Ah perfect 👍 I build websites for roofers, tradespeople, and construction businesses, and had a quick look at yours, but ${customObservation.trim() || "it's not loading on mobile, throwing a server error, hasn't been touched since 2023"}.`

  // STAGE 2: PAIN POINT + OUTCOME + PROTOTYPE OFFER (single combined message)
  const tradeNoun = trade || 'tradesperson'
  const stage2Text = `That's fine for now, but it means anyone who Googles a ${tradeNoun} in your area before messaging will land on a competitor's site instead of yours, even if you're the better choice. A proper site means people can find you, see your work, and message you straight away — more jobs landing in your inbox instead of going elsewhere first.\n\nHappy to put a free working example together for you, no cost, no obligation — built around how you already work, nothing generic.`

  // STAGE 3: SEND THE SITE (once built, then wait)
  const stage3Text = `Here you go 👇 ${demoUrl}\n\nHad a proper look at what you do and built it around that — your trade, your area, and a WhatsApp button so people can message you straight away instead of filling out a form. Have a look when you get a minute and let me know what you think.`

  // FOLLOW-UPS (if no response after Stage 3)
  const followupText =
    followupStep === 'followup1'
      ? `Hey — just checking this landed okay. No rush, just wanted to make sure you'd seen it.`
      : followupStep === 'followup2'
      ? `Hey again 👋 Totally understand if you've been busy — just wanted to check whether you'd had a chance to look at the site, or if you've got any questions on it.`
      : `Last one from me on this — if it's not the right time, that's completely fair, no hard feelings. If you ever do want to take it further, the offer's still open, just say the word.`

  // CLOSING BRANCHES
  const closingText =
    closingBranch === 'yes'
      ? `Great stuff 👍 Let's get it locked in properly — I'll send over what I need from you and we'll go from there. What's the best way to reach you if I've got quick questions along the way?`
      : `No worries at all, appreciate you letting me know 👍 If that ever changes, feel free to reach out — all the best with the business!`

  // VOICE NOTE PROMPTER (15s)
  const voiceNoteScript = `🎙️ 15-SECOND VOICE NOTE SCRIPT (Speak naturally):\n\n"Hey ${ownerName || 'mate'}, quick voice note — it's Gurtej from Mercian Wealth.\nHad a quick look for ${businessName} online and noticed you don't have a dedicated website up yet.\nPut together a free working prototype for you so you stop losing local ${tradeNoun} enquiries to competitors.\nSent you the link above, have a look when you get a minute off the tools and let me know what you think!"`

  const currentMessageText =
    activeTab === 'stage1'
      ? stage1Text
      : activeTab === 'stage2'
      ? stage2Text
      : activeTab === 'stage3'
      ? stage3Text
      : activeTab === 'followup'
      ? followupText
      : activeTab === 'closing'
      ? closingText
      : voiceNoteScript

  const currentBadgeText =
    activeTab === 'stage1'
      ? stage1Step === '1a_confirm'
        ? 'Stage 1 · 1A Confirm Name'
        : stage1Step === '1b_no_website'
        ? 'Stage 1 · 1B Intro (No Site)'
        : 'Stage 1 · 1B Intro (Outdated Site)'
      : activeTab === 'stage2'
      ? stage2Variant === 'combined'
        ? 'Stage 2 · Pain Point & Prototype Offer'
        : 'Stage 2 · Soft No Re-Pitch'
      : activeTab === 'stage3'
      ? 'Stage 3 · Send The Working Site'
      : activeTab === 'followup'
      ? followupStep === 'followup1'
        ? 'Follow-Up 1 · Check-In'
        : followupStep === 'followup2'
        ? 'Follow-Up 2 · Busy Check'
        : 'Follow-Up 3 · Final Break-Up'
      : activeTab === 'closing'
      ? closingBranch === 'yes'
        ? 'Closing · Branch YES (Lock In)'
        : 'Closing · Branch NO (Polite Decline)'
      : 'Voice Note Script'

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#0B0B0D] border border-white/10 rounded-2xl card-depth overflow-hidden z-10 flex flex-col max-h-[92vh]">
        {/* Header Strip */}
        <div className="p-5 border-b border-white/10 bg-[#141417]/50 flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#141417] text-[#DAA640] border border-[#DAA640]/30">
                {trade}
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
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-foreground">
              {businessName}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground pt-0.5">
              <span className="flex items-center gap-1 text-foreground font-medium">
                <Star size={12} className="fill-[#DAA640] text-[#DAA640]" /> {rating} ({reviewsCount} reviews)
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Phone size={12} /> {lead.phone || 'No phone'}
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
        <div className="p-6 space-y-6 overflow-y-auto flex-1 discord-scroll">
          {/* Telemetry / Info Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[#141417] border border-white/5 text-xs">
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
              <p className="text-[11px] font-medium text-muted-foreground">Antigravity / Demo</p>
              <div className="flex items-center gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => setIsPromptOpen(true)}
                  className="text-[#DAA640] hover:text-white hover:underline flex items-center gap-1 font-medium text-xs cursor-pointer"
                  title="Open Antigravity Vibecoding Prompts"
                >
                  <Sparkles size={12} className="text-[#DAA640]" /> Vibecoding Prompt
                </button>
                <span className="text-muted-foreground">•</span>
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-white hover:underline flex items-center gap-1 font-medium text-xs"
                  title="Open Live Prototype Preview"
                >
                  Live Demo <ExternalLink size={10} />
                </a>
              </div>
            </div>
          </div>

          {/* Outreach Sequence */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                Outreach Sequence
              </span>
              <span className="text-xs text-muted-foreground">
                Target: <strong className="text-foreground font-medium">{trade}</strong>
              </span>
            </div>

            {/* Sequence Tabs */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 p-1 rounded-xl bg-[#141417] border border-white/5">
              <button
                onClick={() => setActiveTab('stage1')}
                className={`py-2 px-1.5 text-[11px] sm:text-xs font-medium rounded-lg transition-all cursor-pointer text-center truncate ${
                  activeTab === 'stage1'
                    ? 'bg-[#DAA640]/15 text-[#DAA640] border border-[#DAA640]/30 font-bold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
              >
                1. Confirm & Intro
              </button>
              <button
                onClick={() => setActiveTab('stage2')}
                className={`py-2 px-1.5 text-[11px] sm:text-xs font-medium rounded-lg transition-all cursor-pointer text-center truncate ${
                  activeTab === 'stage2'
                    ? 'bg-[#DAA640]/15 text-[#DAA640] border border-[#DAA640]/30 font-bold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
              >
                2. The Pitch
              </button>
              <button
                onClick={() => setActiveTab('stage3')}
                className={`py-2 px-1.5 text-[11px] sm:text-xs font-medium rounded-lg transition-all cursor-pointer text-center truncate ${
                  activeTab === 'stage3'
                    ? 'bg-[#DAA640]/15 text-[#DAA640] border border-[#DAA640]/30 font-bold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
              >
                3. Send Site
              </button>
              <button
                onClick={() => setActiveTab('followup')}
                className={`py-2 px-1.5 text-[11px] sm:text-xs font-medium rounded-lg transition-all cursor-pointer text-center truncate ${
                  activeTab === 'followup'
                    ? 'bg-[#DAA640]/15 text-[#DAA640] border border-[#DAA640]/30 font-bold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
              >
                4. Follow-Ups
              </button>
              <button
                onClick={() => setActiveTab('closing')}
                className={`py-2 px-1.5 text-[11px] sm:text-xs font-medium rounded-lg transition-all cursor-pointer text-center truncate ${
                  activeTab === 'closing'
                    ? 'bg-[#DAA640]/15 text-[#DAA640] border border-[#DAA640]/30 font-bold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
              >
                5. Closing
              </button>
              <button
                onClick={() => setActiveTab('voice')}
                className={`py-2 px-1.5 text-[11px] sm:text-xs font-medium rounded-lg transition-all cursor-pointer text-center flex items-center justify-center gap-1 truncate ${
                  activeTab === 'voice'
                    ? 'bg-[#DAA640]/15 text-[#DAA640] border border-[#DAA640]/30 font-bold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
              >
                <Mic size={12} className="shrink-0" /> Voice Note
              </button>
            </div>

            {/* Sub-selectors and Protocol Guidance */}
            {activeTab === 'stage1' && (
              <div className="space-y-2.5">
                <div className="flex flex-wrap gap-2 p-1.5 rounded-lg bg-[#141417] border border-white/5 text-xs">
                  <button
                    onClick={() => setStage1Step('1a_confirm')}
                    className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                      stage1Step === '1a_confirm' ? 'bg-[#DAA640]/20 text-[#DAA640] border border-[#DAA640]/30' : 'text-muted-foreground hover:text-white'
                    }`}
                  >
                    1A. Confirm Name
                  </button>
                  <button
                    onClick={() => setStage1Step('1b_no_website')}
                    className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                      stage1Step === '1b_no_website' ? 'bg-[#DAA640]/20 text-[#DAA640] border border-[#DAA640]/30' : 'text-muted-foreground hover:text-white'
                    }`}
                  >
                    1B. Intro (No Website)
                  </button>
                  <button
                    onClick={() => setStage1Step('1b_broken_website')}
                    className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                      stage1Step === '1b_broken_website' ? 'bg-[#DAA640]/20 text-[#DAA640] border border-[#DAA640]/30' : 'text-muted-foreground hover:text-white'
                    }`}
                  >
                    1B. Intro (Broken / Outdated Site)
                  </button>
                </div>

                {stage1Step === '1b_broken_website' && (
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#141417] border border-white/10 text-xs">
                    <span className="text-muted-foreground shrink-0 font-medium text-[11px]">Specific Observation:</span>
                    <input
                      type="text"
                      value={customObservation}
                      onChange={(e) => setCustomObservation(e.target.value)}
                      placeholder="e.g. it's not loading, throwing a server error, hasn't been touched since 2023"
                      className="w-full bg-transparent border-none outline-none text-xs text-foreground placeholder:text-zinc-500 font-sans"
                    />
                  </div>
                )}

                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                  <span>
                    <strong>Stage 1 Protocol:</strong> Send <strong>1A</strong> and (wait for confirmation). Once confirmed, send <strong>1B</strong> and (wait for response).
                  </span>
                </div>
              </div>
            )}

            {activeTab === 'stage2' && (
              <div className="space-y-2.5">
                <div className="flex flex-wrap gap-2 p-1.5 rounded-lg bg-[#141417] border border-white/5 text-xs">
                  <button
                    onClick={() => setStage2Variant('combined')}
                    className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                      stage2Variant === 'combined' ? 'bg-[#DAA640]/20 text-[#DAA640] border border-[#DAA640]/30' : 'text-muted-foreground hover:text-white'
                    }`}
                  >
                    Combined Pain Point + Offer
                  </button>
                  <button
                    onClick={() => setStage2Variant('soft_no')}
                    className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                      stage2Variant === 'soft_no' ? 'bg-[#DAA640]/20 text-[#DAA640] border border-[#DAA640]/30' : 'text-muted-foreground hover:text-white'
                    }`}
                  >
                    Soft No / Re-Pitch
                  </button>
                </div>

                <div className="p-2.5 rounded-xl bg-[#DAA640]/10 border border-[#DAA640]/20 text-[#DAA640] text-xs flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DAA640] shrink-0" />
                  <span>
                    <strong>Stage 2 Protocol:</strong> Single combined message. (Wait for response — re-use this exact message if the first reaction is a soft/unsure no, before treating as a genuine decline).
                  </span>
                </div>
              </div>
            )}

            {activeTab === 'stage3' && (
              <div className="space-y-2.5">
                <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                  <span>
                    <strong>Stage 3 Protocol:</strong> Send once the prototype site is staged, then wait for their feedback.
                  </span>
                </div>
              </div>
            )}

            {activeTab === 'followup' && (
              <div className="space-y-2.5">
                <div className="flex flex-wrap gap-2 p-1.5 rounded-lg bg-[#141417] border border-white/5 text-xs">
                  <button
                    onClick={() => setFollowupStep('followup1')}
                    className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                      followupStep === 'followup1' ? 'bg-[#DAA640]/20 text-[#DAA640] border border-[#DAA640]/30' : 'text-muted-foreground hover:text-white'
                    }`}
                  >
                    Follow-up 1 (Check-in)
                  </button>
                  <button
                    onClick={() => setFollowupStep('followup2')}
                    className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                      followupStep === 'followup2' ? 'bg-[#DAA640]/20 text-[#DAA640] border border-[#DAA640]/30' : 'text-muted-foreground hover:text-white'
                    }`}
                  >
                    Follow-up 2 (Busy Check)
                  </button>
                  <button
                    onClick={() => setFollowupStep('followup3')}
                    className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                      followupStep === 'followup3' ? 'bg-[#DAA640]/20 text-[#DAA640] border border-[#DAA640]/30' : 'text-muted-foreground hover:text-white'
                    }`}
                  >
                    Follow-up 3 (Final Break-up)
                  </button>
                </div>

                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                  <span>
                    <strong>Follow-Ups Protocol:</strong> Send sequentially if no response after delivering Stage 3.
                  </span>
                </div>
              </div>
            )}

            {activeTab === 'closing' && (
              <div className="space-y-2.5">
                <div className="flex flex-wrap gap-2 p-1.5 rounded-lg bg-[#141417] border border-white/5 text-xs">
                  <button
                    onClick={() => setClosingBranch('yes')}
                    className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                      closingBranch === 'yes' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-muted-foreground hover:text-white'
                    }`}
                  >
                    <ThumbsUp size={12} /> Branch YES (Lock In)
                  </button>
                  <button
                    onClick={() => setClosingBranch('no')}
                    className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                      closingBranch === 'no' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'text-muted-foreground hover:text-white'
                    }`}
                  >
                    <XCircle size={12} /> Branch NO (Genuine Decline)
                  </button>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span>
                    {closingBranch === 'yes'
                      ? 'Branch YES: Great stuff! Lock it in properly and capture their onboarding requirements.'
                      : 'Branch NO: Polite, professional exit. Only send after Stage 2 has already been delivered.'}
                  </span>
                </div>
              </div>
            )}

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
                <span className="text-[11px] font-mono text-[#DAA640]">
                  {currentBadgeText}
                </span>
              </div>

              <p className="text-sm text-foreground/90 font-sans leading-relaxed whitespace-pre-line select-all">
                {currentMessageText}
              </p>

              {isLandline && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2">
                    <Phone size={12} className="text-amber-400 shrink-0" />
                    <span><strong>UK Landline Notice:</strong> {lead.phone} is a regional landline. If WhatsApp does not connect, dial directly.</span>
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
                      title={isLandline ? "Try WhatsApp (if registered as WhatsApp Business)" : "Open in WhatsApp"}
                    >
                      <Send size={13} /> {activeTab === 'stage1' ? 'Send via WhatsApp' : 'Send via WhatsApp'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Outcome Bar */}
          <div className="space-y-2.5 pt-2 border-t border-white/5">
            <p className="text-xs font-medium text-muted-foreground">
              Update Lead Status:
            </p>
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
      <AntigravityPromptModal
        isOpen={isPromptOpen}
        onClose={() => setIsPromptOpen(false)}
        lead={lead}
      />
    </div>
  )
}
