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
} from 'lucide-react'

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
  const [activeTab, setActiveTab] = useState<'stage1' | 'stage2' | 'followup1' | 'followupFinal'>('stage1')
  const [copied, setCopied] = useState(false)
  const [updating, setUpdating] = useState(false)

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
  const trade = lead.local_business_niche || lead.scraped_metadata?.trade || 'Tradesperson'
  const rawWebsite = lead.website
  const hasWebsite = rawWebsite && rawWebsite !== 'None' && rawWebsite !== 'NO WEBSITE'
  const rating = lead.scraped_metadata?.rating ?? 5.0
  const reviewsCount = lead.scraped_metadata?.reviews_count ?? 0
  const address = lead.scraped_metadata?.address || lead.notes || 'United Kingdom'
  const mapsUrl = lead.scraped_metadata?.google_maps_url

  // Phone Sanitization
  const cleanDigits = (lead.phone || '').replace(/[^0-9]/g, '')
  const isMobile = (lead.phone || '').startsWith('+447') || (lead.phone || '').startsWith('07')
  const channel = isMobile ? 'WhatsApp / Mobile' : 'Landline / Direct Call'

  // Scripts
  const stage1Text = 'Hi 👋'
  const stage2Text =
    lead.scraped_metadata?.stage_2_pitch ||
    (hasWebsite
      ? `Came across ${businessName} — checked out your profile. Just wanted to see if you're taking on more ${trade.toLowerCase()} jobs right now, or if you're currently full?`
      : `Came across ${businessName} — had a look for a website, couldn't find one. Here's the bit that actually matters: every day someone searches for a ${trade.toLowerCase()} near them, sees you're not there, and books with whoever showed up instead. I build the storefront before I ever ask for money — if it's not for you, no pressure at all.`)

  const followUp1Text =
    lead.scraped_metadata?.follow_up_1 ||
    `Hey — following up on ${businessName}. No pressure at all, just wanted to check if this landed and see where you're at.`

  const followUpFinalText =
    lead.scraped_metadata?.follow_up_final ||
    `Last one from me on this — if it's not a priority right now, that's completely fair. If it ever is, the offer stands, just say the word.`

  const currentMessageText =
    activeTab === 'stage1'
      ? stage1Text
      : activeTab === 'stage2'
      ? stage2Text
      : activeTab === 'followup1'
      ? followUp1Text
      : followUpFinalText

  const handleCopy = () => {
    navigator.clipboard.writeText(currentMessageText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSendWhatsApp = async () => {
    if (!cleanDigits) return
    const url = `https://wa.me/${cleanDigits}?text=${encodeURIComponent(currentMessageText)}`
    window.open(url, '_blank')

    // Optimistically update status to Contacted if still New
    if (lead.status === 'New') {
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
      <div className="relative w-full max-w-2xl bg-[#0b0f17] border border-gold/25 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8),0_0_20px_rgba(212,175,55,0.15)] overflow-hidden z-10 flex flex-col max-h-[90vh]">
        {/* Header Strip */}
        <div className="p-5 border-b border-gold/15 bg-gradient-to-r from-gold/10 via-white/[0.02] to-transparent flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gold/15 text-gold border border-gold/30">
                {trade}
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                  lead.status === 'Won'
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    : lead.status === 'Lost'
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                    : lead.status === 'Contacted'
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                    : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                }`}
              >
                {lead.status}
              </span>
              {!hasWebsite && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-red-500/15 text-red-400 border border-red-500/30 animate-pulse">
                  🔥 No Website
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-foreground">
              {businessName}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground pt-1">
              <span className="flex items-center gap-1 text-amber-300 font-semibold">
                <Star size={12} className="fill-amber-300" /> {rating} ({reviewsCount} reviews)
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Phone size={12} /> {lead.phone || 'No phone'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-gold/80">
                <MessageSquare size={12} /> {channel}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 discord-scroll">
          {/* Telemetry / Info Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-black/40 border border-white/5 text-xs">
            <div>
              <p className="text-[10px] uppercase font-bold text-muted-foreground">Digital Presence</p>
              {hasWebsite ? (
                <a
                  href={rawWebsite.startsWith('http') ? rawWebsite : `https://${rawWebsite}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 hover:underline flex items-center gap-1 font-medium mt-0.5 truncate"
                >
                  <Globe size={11} /> {rawWebsite} <ExternalLink size={10} />
                </a>
              ) : (
                <span className="text-amber-400 font-bold flex items-center gap-1 mt-0.5">
                  <AlertTriangle size={11} /> No custom storefront
                </span>
              )}
            </div>

            <div>
              <p className="text-[10px] uppercase font-bold text-muted-foreground">Location</p>
              <p className="text-foreground truncate flex items-center gap-1 mt-0.5">
                <MapPin size={11} className="text-gold shrink-0" /> {address}
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase font-bold text-muted-foreground">Google Listing</p>
              {mapsUrl ? (
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gold hover:underline flex items-center gap-1 font-medium mt-0.5"
                >
                  <ExternalLink size={11} /> Open Google Maps
                </a>
              ) : (
                <span className="text-muted-foreground">Maps unlinked</span>
              )}
            </div>
          </div>

          {/* Outreach Sequence Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gold flex items-center gap-1.5">
                <Sparkles size={14} /> Multi-Stage Outreach Cockpit
              </span>
              <span className="text-[11px] text-muted-foreground">
                Tailored for: <strong className="text-foreground">{trade}</strong>
              </span>
            </div>

            {/* Sequence Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 rounded-xl bg-black/50 border border-white/5">
              <button
                onClick={() => setActiveTab('stage1')}
                className={`py-2 px-3 text-xs font-bold rounded-lg transition-all cursor-pointer text-center ${
                  activeTab === 'stage1'
                    ? 'bg-gold/20 text-gold border border-gold/30 shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
              >
                1. Opener (Hi 👋)
              </button>
              <button
                onClick={() => setActiveTab('stage2')}
                className={`py-2 px-3 text-xs font-bold rounded-lg transition-all cursor-pointer text-center ${
                  activeTab === 'stage2'
                    ? 'bg-gold/20 text-gold border border-gold/30 shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
              >
                2. Value Pitch
              </button>
              <button
                onClick={() => setActiveTab('followup1')}
                className={`py-2 px-3 text-xs font-bold rounded-lg transition-all cursor-pointer text-center ${
                  activeTab === 'followup1'
                    ? 'bg-gold/20 text-gold border border-gold/30 shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
              >
                3. Follow-Up 1
              </button>
              <button
                onClick={() => setActiveTab('followupFinal')}
                className={`py-2 px-3 text-xs font-bold rounded-lg transition-all cursor-pointer text-center ${
                  activeTab === 'followupFinal'
                    ? 'bg-gold/20 text-gold border border-gold/30 shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
              >
                4. Final Close
              </button>
            </div>

            {/* Message Box */}
            <div className="relative rounded-xl bg-[#06080d] border border-gold/15 p-4 space-y-3 shadow-inner">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground pb-2 border-b border-white/5">
                <span className="font-semibold text-foreground/80">Message Preview:</span>
                <span className="text-[10px] text-gold/80">
                  {activeTab === 'stage1'
                    ? 'Quick Pattern Interrupt'
                    : activeTab === 'stage2'
                    ? 'Pain-Point Demonstration Pitch'
                    : activeTab === 'followup1'
                    ? 'Day 2 Polite Check-in'
                    : 'Zero-Pressure Departure'}
                </span>
              </div>

              <p className="text-sm text-foreground/90 font-sans leading-relaxed whitespace-pre-line select-all">
                {currentMessageText}
              </p>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/5">
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-lg border border-white/10 hover:border-gold/30 bg-white/5 hover:bg-gold/10 text-xs font-semibold text-foreground flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {copied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
                  {copied ? 'Copied!' : 'Copy Text'}
                </button>

                {isMobile && (
                  <button
                    onClick={handleSendWhatsApp}
                    className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all cursor-pointer"
                  >
                    <Send size={13} /> Send via WhatsApp
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Quick Outcome Bar */}
          <div className="space-y-2 pt-2 border-t border-white/5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Update Lead Outcome:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                disabled={updating}
                onClick={() => handleStatusClick('Won')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  lead.status === 'Won'
                    ? 'bg-emerald-500 text-black border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                    : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                }`}
              >
                <CheckCircle2 size={14} /> Mark Won 🟢
              </button>

              <button
                disabled={updating}
                onClick={() => handleStatusClick('Call Booked')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  lead.status === 'Call Booked'
                    ? 'bg-purple-500 text-white border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                    : 'bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border-purple-500/30'
                }`}
              >
                <Clock size={14} /> Call Booked 🟣
              </button>

              <button
                disabled={updating}
                onClick={() => handleStatusClick('Contacted')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  lead.status === 'Contacted'
                    ? 'bg-amber-500 text-black border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                    : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border-amber-500/30'
                }`}
              >
                <MessageSquare size={14} /> Contacted 🟡
              </button>

              <button
                disabled={updating}
                onClick={() => handleStatusClick('Lost')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  lead.status === 'Lost'
                    ? 'bg-rose-500 text-white border-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.4)]'
                    : 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border-rose-500/30'
                }`}
              >
                <XCircle size={14} /> Mark Lost 🔴
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
    </div>
  )
}
