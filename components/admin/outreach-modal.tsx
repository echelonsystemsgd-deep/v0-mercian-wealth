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
  const [activeTab, setActiveTab] = useState<'stage1' | 'stage2' | 'followup' | 'voice'>('stage1')
  const [pitchType, setPitchType] = useState<'noWebsite' | 'brokenSite' | 'referral' | 'automation' | 'scrapedCustom'>('noWebsite')
  const [followupType, setFollowupType] = useState<'noResponse' | 'final' | 'comeBack' | 'declined'>('noResponse')
  const [copied, setCopied] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [isPromptOpen, setIsPromptOpen] = useState(false)

  // Auto-detect presence and set appropriate default pitch
  useEffect(() => {
    if (lead) {
      const rawWeb = (lead.website || '').trim()
      const hasWeb = rawWeb !== '' && rawWeb !== 'None' && rawWeb !== 'NO WEBSITE' && !rawWeb.toLowerCase().includes('facebook.com') && !rawWeb.toLowerCase().includes('instagram.com')
      if (lead.scraped_metadata?.stage_2_pitch) {
        setPitchType('scrapedCustom')
      } else if (hasWeb) {
        setPitchType('brokenSite')
      } else {
        setPitchType('noWebsite')
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
  // EXACT OUTREACH SCRIPTS
  // ─────────────────────────────────────────────────────────────────────────────

  // STAGE 1: OPENER (send alone, wait for reply)
  const ownerName = lead.name && lead.name !== lead.business_name && !lead.name.includes('Owner') ? lead.name.split(' ')[0] : ''
  const stage1Text = ownerName ? `Hi ${ownerName} 👋` : 'Hi 👋'

  // STAGE 2: THE PITCH (send only after they reply)
  let stage2Text = ''
  if (pitchType === 'scrapedCustom' && lead.scraped_metadata?.stage_2_pitch) {
    stage2Text = `${lead.scraped_metadata.stage_2_pitch}\n\nLive prototype for ${businessName}:\n${demoUrl}`
  } else if (pitchType === 'noWebsite') {
    stage2Text = `Came across ${businessName} — had a look for a website, couldn't find one. Here's the bit that actually matters: every day someone searches for a ${trade} near them, sees you're not there, and books with whoever showed up instead. That's not a maybe — it's happening right now, on jobs you'll never even know you lost.\n\nI build the site before I ever ask for money — I don't sell direction I haven't already shown. Put together this live prototype for ${businessName}:\n${demoUrl}\n\nIf it's not for you, no pressure at all, just glad I flagged it. If it is, we take it from there.`
  } else if (pitchType === 'brokenSite') {
    stage2Text = `Came across ${businessName} — saw your site at ${domain || 'online'}, noticed it isn't set up for instant mobile quotes or fast lead capture. That's not just a rough edge — it's the exact moment someone decides you're not worth the call, and picks the next result instead. Happening on repeat, quietly, without you ever seeing it.\n\nI build the upgraded storefront before I ever ask for money — I don't sell direction I haven't already shown. Here is what a high-converting version looks like for ${businessName}:\n${demoUrl}\n\nIf it's not for you, no pressure at all, just glad I flagged it. If it is, we take it from there.`
  } else if (pitchType === 'referral') {
    stage2Text = `Passed your number — said you might be after a modern website.\n\nI build the site before I ever ask for money — you're not paying for an idea, you're looking at something real. Took a few minutes to stage a prototype for ${businessName}:\n${demoUrl}\n\nIf it's useful, we take it from there and talk price. If not, no pressure at all.`
  } else {
    // Broader automation pitch
    stage2Text = `Came across ${businessName} — noticed you're getting steady interest, but every missed call or slow reply is a job going to whoever picked up faster.\n\nI build speed-to-lead systems that fix exactly that: faster response, less admin, more of what's already coming in actually turning into paying work.\n\nI show you a working version before anything's agreed — no cost, no pressure. If it's useful, we take it further. If not, no worries at all.`
  }

  // FOLLOW-UPS
  let followupText = ''
  if (followupType === 'noResponse') {
    followupText = `Hey — following up on ${businessName}'s site. No pressure at all, just wanted to check it landed and see where you're at.`
  } else if (followupType === 'final') {
    followupText = `Last one from me on this — if it's not a priority right now, that's completely fair. If it ever is, the offer stands, just say the word.`
  } else if (followupType === 'comeBack') {
    followupText = `No rush at all — happy to wait until you're ready. Just didn't want it to go unsaid: every day without it is a day someone's landing somewhere else instead of you. Whenever you're ready, everything's exactly as we left it.`
  } else {
    followupText = `No worries at all, appreciate you letting me know 👍 If that ever changes, feel free to reach out — all the best with the business!`
  }

  // VOICE NOTE PROMPTER (15s)
  const voiceNoteScript = `🎙️ 15-SECOND VOICE NOTE SCRIPT (Speak naturally):\n\n"Hey ${ownerName || 'mate'}, quick voice note — it's Gurtej from Mercian Wealth in Worcestershire.\nSaw your 5-star reviews on Google but noticed you don't have a website up yet.\nPut together a live preview for ${businessName} so you stop losing local jobs to competitors.\nSent you the link above, have a look whenever you're off the tools and let me know what you think!"`

  const currentMessageText =
    activeTab === 'stage1'
      ? stage1Text
      : activeTab === 'stage2'
      ? stage2Text
      : activeTab === 'followup'
      ? followupText
      : voiceNoteScript

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
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1 rounded-xl bg-[#141417] border border-white/5">
              <button
                onClick={() => setActiveTab('stage1')}
                className={`py-2 px-3 text-xs font-medium rounded-lg transition-all cursor-pointer text-center ${
                  activeTab === 'stage1'
                    ? 'bg-[#DAA640]/15 text-[#DAA640] border border-[#DAA640]/30'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
              >
                1. Opener
              </button>
              <button
                onClick={() => setActiveTab('stage2')}
                className={`py-2 px-3 text-xs font-medium rounded-lg transition-all cursor-pointer text-center ${
                  activeTab === 'stage2'
                    ? 'bg-[#DAA640]/15 text-[#DAA640] border border-[#DAA640]/30'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
              >
                2. The Pitch
              </button>
              <button
                onClick={() => setActiveTab('followup')}
                className={`py-2 px-3 text-xs font-medium rounded-lg transition-all cursor-pointer text-center ${
                  activeTab === 'followup'
                    ? 'bg-[#DAA640]/15 text-[#DAA640] border border-[#DAA640]/30'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
              >
                3. Follow-Ups
              </button>
              <button
                onClick={() => setActiveTab('voice')}
                className={`py-2 px-3 text-xs font-medium rounded-lg transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 ${
                  activeTab === 'voice'
                    ? 'bg-[#DAA640]/15 text-[#DAA640] border border-[#DAA640]/30'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
              >
                <Mic size={12} /> 4. Voice Note
              </button>
            </div>

            {/* Sub-selectors for Stage 2 & Follow-up */}
            {activeTab === 'stage2' && (
              <div className="flex flex-wrap gap-2 p-1.5 rounded-lg bg-[#141417] border border-white/5 text-xs">
                {lead.scraped_metadata?.stage_2_pitch && (
                  <button
                    onClick={() => setPitchType('scrapedCustom')}
                    className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                      pitchType === 'scrapedCustom' ? 'bg-[#DAA640]/20 text-[#DAA640] border border-[#DAA640]/30' : 'text-muted-foreground hover:text-white'
                    }`}
                  >
                    Bespoke Pitch
                  </button>
                )}
                <button
                  onClick={() => setPitchType('noWebsite')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                    pitchType === 'noWebsite' ? 'bg-[#DAA640]/20 text-[#DAA640] border border-[#DAA640]/30' : 'text-muted-foreground hover:text-white'
                  }`}
                >
                  No Website {hasWebsite && '(Override)'}
                </button>
                <button
                  onClick={() => setPitchType('brokenSite')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                    pitchType === 'brokenSite' ? 'bg-[#DAA640]/20 text-[#DAA640] border border-[#DAA640]/30' : 'text-muted-foreground hover:text-white'
                  }`}
                >
                  {hasWebsite ? 'Modern Redesign' : 'Outdated Website'}
                </button>
                <button
                  onClick={() => setPitchType('referral')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                    pitchType === 'referral' ? 'bg-[#DAA640]/20 text-[#DAA640] border border-[#DAA640]/30' : 'text-muted-foreground hover:text-white'
                  }`}
                >
                  Warm Referral
                </button>
                <button
                  onClick={() => setPitchType('automation')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                    pitchType === 'automation' ? 'bg-[#DAA640]/20 text-[#DAA640] border border-[#DAA640]/30' : 'text-muted-foreground hover:text-white'
                  }`}
                >
                  Speed-to-Lead
                </button>
              </div>
            )}

            {activeTab === 'followup' && (
              <div className="flex flex-wrap gap-2 p-1.5 rounded-lg bg-[#141417] border border-white/5 text-xs">
                <button
                  onClick={() => setFollowupType('noResponse')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                    followupType === 'noResponse' ? 'bg-[#DAA640]/20 text-[#DAA640] border border-[#DAA640]/30' : 'text-muted-foreground hover:text-white'
                  }`}
                >
                  No Response (48h)
                </button>
                <button
                  onClick={() => setFollowupType('final')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                    followupType === 'final' ? 'bg-[#DAA640]/20 text-[#DAA640] border border-[#DAA640]/30' : 'text-muted-foreground hover:text-white'
                  }`}
                >
                  Final Follow-up
                </button>
                <button
                  onClick={() => setFollowupType('comeBack')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                    followupType === 'comeBack' ? 'bg-[#DAA640]/20 text-[#DAA640] border border-[#DAA640]/30' : 'text-muted-foreground hover:text-white'
                  }`}
                >
                  Come Back Later
                </button>
                <button
                  onClick={() => setFollowupType('declined')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                    followupType === 'declined' ? 'bg-[#DAA640]/20 text-[#DAA640] border border-[#DAA640]/30' : 'text-muted-foreground hover:text-white'
                  }`}
                >
                  Polite Close
                </button>
              </div>
            )}

            {/* Guidance Alert for Stage 1 */}
            {activeTab === 'stage1' && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                <span>
                  <strong>Protocol:</strong> Send initial opener, await reply before delivering Stage 2 pitch.
                </span>
              </div>
            )}

            {/* Message Box */}
            <div className="relative rounded-xl bg-[#141417] border border-white/10 p-4 space-y-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground pb-2 border-b border-white/5">
                <span className="font-medium text-foreground">Message Body</span>
                <span className="text-[11px] text-[#DAA640]">
                  {activeTab === 'stage1'
                    ? 'Opener'
                    : activeTab === 'stage2'
                    ? 'Value Pitch'
                    : activeTab === 'followup'
                    ? 'Follow-up'
                    : 'Voice Script'}
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
