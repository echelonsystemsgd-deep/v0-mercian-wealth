'use client'

import React, { useState, useMemo } from 'react'
import {
  X,
  Phone,
  Globe,
  Check,
  Copy,
  Send,
  Calendar,
  AlertTriangle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Mail,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Building,
  User,
  ExternalLink,
  ShieldAlert,
  Trash2
} from 'lucide-react'
import { classifyPhoneNumber, buildWhatsAppOpenerUrl, buildTelUrl } from '@/lib/phone-classifier'
import { createClient } from '@/lib/supabase/client'

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
  friction_found?: string | null
  next_follow_up?: string | null
  date_messaged?: string | null
  scraped_metadata?: any
  [key: string]: any
}

export interface OutreachModalProps {
  lead: OutreachLead | null
  isOpen: boolean
  onClose: () => void
  onStatusChange?: (leadId: string, newStatus: string) => void
  onUpdateStatus?: (id: string, status: string) => Promise<void> | void
  onDeleteLead?: (id: string) => Promise<void> | void
  onMarkSent?: (leadId: string, type: 'opener' | 'fu1' | 'fu2') => void
}

export function OutreachModal({
  lead,
  isOpen,
  onClose,
  onStatusChange,
  onUpdateStatus,
  onDeleteLead,
  onMarkSent
}: OutreachModalProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [showObjections, setShowObjections] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const supabase = createClient()

  if (!isOpen || !lead) return null

  const phoneInfo = classifyPhoneNumber(lead.phone)
  const businessName = (lead.business_name || lead.name || 'Practice').trim()
  const directorName = (lead.name && lead.name !== businessName && !lead.name.toLowerCase().includes('director') && !lead.name.toLowerCase().includes('owner'))
    ? lead.name.trim()
    : 'Partner'

  // Extract Section M verified friction
  const rawFriction = useMemo(() => {
    const meta = (lead.scraped_metadata || {}) as Record<string, any>
    if (lead.friction_found) return lead.friction_found
    if (meta.friction_title) return meta.friction_title
    if (meta.observable_problem) return meta.observable_problem
    if (lead.notes && lead.notes.includes('VERIFIED FLAW:')) {
      const match = lead.notes.match(/VERIFIED FLAW:\s*([^\n]+)/i)
      if (match) return match[1].trim()
    }
    // Contextual fallback based on domain/notes
    return "Contact phone number isn't tap-to-call on mobile, and the contact page has no business triage form."
  }, [lead])

  const telLink = buildTelUrl(lead.phone)
  const waUrl = buildWhatsAppOpenerUrl(lead.phone, `Hi ${directorName}, Gurtej here from Mercian Wealth regarding the ${businessName} website.`)

  // Sales Prof Scripts
  const day1CallScript = `“Hey ${directorName}, I was on the ${businessName} site earlier and noticed ${rawFriction}. That’s exactly why I’m calling. Would it be totally crazy for a two minute chat to see if this is even relevant on your end?”`
  const bookScript = `“Let’s book 15-20 minutes later this week. I’ll show you what I’d change on your contact page to eliminate drop-off. Does Thursday or Friday at 10:30am work?”`
  
  const voicemailScript = `“Hi ${directorName}, it's Gurtej calling regarding the ${businessName} website. I noticed an issue on your mobile contact flow where ${rawFriction}. I'm sending a quick 10-second screenshot to your email and WhatsApp so you can see it directly. My number is 07851 055929. Speak soon.”`
  
  const followUpEmailSubject = `Quick note regarding ${businessName} website (${rawFriction.slice(0, 40)}...)`
  const followUpEmailBody = `Hi ${directorName},\n\nI called your office a moment ago.\n\nI was reviewing your website on mobile and noticed ${rawFriction}.\n\nFor an established practice handling corporate and commercial accounts, that creates unnecessary drop-off when prospects browse on their phones.\n\nI've put together a quick working prototype showing how other UK practices capture and qualify those enquiries instantly.\n\nWould it make sense to connect for 10–15 minutes this week to show you? If not, no problem at all—just let me know and I'll close the loop.\n\nBest regards,\nGurtej Deep\nMercian Wealth | 07851 055929 | mercianwealth.com`

  const whatsAppMessage = `Hi ${directorName}, Gurtej here from Mercian Wealth. Left a brief voicemail at your office earlier regarding the ${businessName} site—noticed ${rawFriction}. Just emailed you the details. Let me know if you'd like to see the quick prototype fix.`

  const handleCopy = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedKey(key)
      setTimeout(() => setCopiedKey(null), 2000)
    } catch (err) {
      console.error('Failed to copy to clipboard', err)
    }
  }

  const handleStatusUpdate = async (newStatus: string) => {
    setIsUpdating(true)
    try {
      const nowIso = new Date().toISOString()
      const meta = (lead.scraped_metadata || {}) as Record<string, any>
      const updatedMeta = {
        ...meta,
        last_action: newStatus,
        last_action_at: nowIso,
        ...(newStatus === 'Contacted' ? { contacted_at: nowIso } : {})
      }

      const { error } = await supabase
        .from('leads')
        .update({
          status: newStatus,
          scraped_metadata: updatedMeta,
          ...(newStatus === 'Lost' ? { is_archived: true } : {})
        })
        .eq('id', lead.id)

      if (error) throw error

      if (onUpdateStatus) {
        await onUpdateStatus(lead.id, newStatus)
      } else if (onStatusChange) {
        onStatusChange(lead.id, newStatus)
      }
      onClose()
    } catch (err) {
      console.error('Failed to update lead status:', err)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return
    setIsUpdating(true)
    try {
      if (onDeleteLead) {
        await onDeleteLead(lead.id)
      } else {
        await supabase.from('leads').delete().eq('id', lead.id)
      }
      onClose()
    } catch (err) {
      console.error('Failed to delete lead:', err)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#0B0B0D] border border-white/10 rounded-t-2xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#141417]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#DAA640]/10 border border-[#DAA640]/30 flex items-center justify-center text-[#DAA640] shrink-0 font-bold">
              <Building size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight truncate max-w-[280px] sm:max-w-md">
                  {businessName}
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {lead.status}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-400 mt-0.5">
                <span className="flex items-center gap-1">
                  <User size={12} className="text-[#DAA640]" />
                  <span>{directorName}</span>
                </span>
                {lead.website && (
                  <a
                    href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[#DAA640] hover:underline"
                  >
                    <Globe size={12} />
                    <span className="truncate max-w-[140px] sm:max-w-xs">{lead.website.replace(/^https?:\/\//, '')}</span>
                    <ExternalLink size={10} />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleDelete}
              className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-zinc-400 hover:text-rose-400 transition-colors cursor-pointer"
              title="Delete Lead"
            >
              <Trash2 size={16} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-5 flex-1">
          
          {/* Direct 1-Tap Dial Bar */}
          <div className="p-3.5 rounded-2xl bg-[#141417] border border-white/10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Phone size={18} className="text-emerald-400 shrink-0" />
              <div>
                <div className="text-xs text-zinc-400 font-mono">DIRECT OFFICE LINE</div>
                <div className="text-sm sm:text-base font-bold text-white font-mono">
                  {lead.phone || 'No Phone Recorded'}
                </div>
              </div>
            </div>

            {lead.phone && (
              <a
                href={telLink || undefined}
                className="px-4 py-2.5 min-h-[44px] rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
              >
                <Phone size={14} />
                <span>Call Partner</span>
              </a>
            )}
          </div>

          {/* Section M: The 1 Verified Human Friction */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1.5">
            <div className="flex items-center gap-2">
              <AlertTriangle size={15} className="text-amber-400" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400">
                VERIFIED SECTION M FRICTION (CALL HOOK)
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-medium">
              {rawFriction}
            </p>
          </div>

          {/* The Sales Prof Day 1 Script Card */}
          <div className="p-4 rounded-2xl bg-[#141417] border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#DAA640] uppercase tracking-wider">
                DAY 1 CALL SCRIPT (WORD FOR WORD)
              </span>
              <button
                onClick={() => handleCopy('script', day1CallScript)}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-zinc-300 font-mono flex items-center gap-1 transition-colors cursor-pointer"
              >
                {copiedKey === 'script' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                <span>{copiedKey === 'script' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="p-3 rounded-xl bg-black/60 border border-white/5 text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans italic">
              {day1CallScript}
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-xs text-emerald-300 leading-normal">
              <strong className="text-white">When they say yes to 2 mins: </strong>
              {bookScript}
            </div>
          </div>

          {/* Quick Objections Accordion */}
          <div className="rounded-2xl border border-white/10 bg-[#141417] overflow-hidden">
            <button
              onClick={() => setShowObjections(!showObjections)}
              className="w-full p-3.5 flex items-center justify-between text-xs font-mono font-bold text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              <span>QUICK REPLIES / OBJECTION CHEATSHEET</span>
              {showObjections ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {showObjections && (
              <div className="p-3.5 pt-0 space-y-2.5 border-t border-white/5 text-xs text-zinc-300">
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                  <div className="font-bold text-amber-400">“Send me an email”</div>
                  <div className="text-zinc-300 mt-0.5">“Happy to. What address? And if it isn’t relevant, say so and I’ll close it.”</div>
                </div>
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                  <div className="font-bold text-amber-400">“Busy until January”</div>
                  <div className="text-zinc-300 mt-0.5">“Understood. Which week in February should I call?”</div>
                </div>
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                  <div className="font-bold text-amber-400">“Who are you?”</div>
                  <div className="text-zinc-300 mt-0.5">“Gurtej, I build enquiry and follow-up systems for accounting practices. I noticed {rawFriction.slice(0, 30)}, so I called. Worth two minutes?”</div>
                </div>
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                  <div className="font-bold text-amber-400">“Not interested”</div>
                  <div className="text-zinc-300 mt-0.5">“No problem, thanks for the clarity.”</div>
                </div>
              </div>
            )}
          </div>

          {/* Voicemail & Immediate Follow-up Assets */}
          <div className="p-4 rounded-2xl bg-[#141417] border border-white/10 space-y-3">
            <span className="text-xs font-mono font-bold text-[#DAA640] uppercase tracking-wider block">
              IF VOICEMAIL: 20-SECOND NOTE + IMMEDIATE EMAIL & WHATSAPP
            </span>

            {/* Voicemail script */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>Voicemail Message:</span>
                <button
                  onClick={() => handleCopy('vm', voicemailScript)}
                  className="hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey === 'vm' ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                  <span>{copiedKey === 'vm' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 text-xs text-zinc-300 italic">
                {voicemailScript}
              </div>
            </div>

            {/* Email & WhatsApp Quick Copy */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => handleCopy('email', followUpEmailBody)}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-white flex items-center justify-between transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-sky-400" />
                  <span>Copy Follow-Up Email</span>
                </div>
                {copiedKey === 'email' ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              </button>

              {lead.phone && (
                <button
                  onClick={() => handleCopy('wa', whatsAppMessage)}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-white flex items-center justify-between transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <MessageSquare size={14} className="text-emerald-400" />
                    <span>Copy WhatsApp Text</span>
                  </div>
                  {copiedKey === 'wa' ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div className="p-3.5 sm:p-4 border-t border-white/10 bg-[#141417] flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
          <button
            onClick={() => handleStatusUpdate('Lost')}
            disabled={isUpdating}
            className="px-3 py-2.5 min-h-[44px] rounded-xl bg-white/5 hover:bg-rose-500/20 text-zinc-400 hover:text-rose-300 text-xs font-medium transition-colors cursor-pointer"
          >
            Not Relevant
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => {
                handleCopy('combo', `${followUpEmailBody}\n\n---\nWhatsApp:\n${whatsAppMessage}`)
                handleStatusUpdate('Contacted')
              }}
              disabled={isUpdating}
              className="flex-1 sm:flex-none px-4 py-2.5 min-h-[44px] rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-sky-300 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 size={14} />
              <span>Voicemail Left</span>
            </button>

            <button
              onClick={() => handleStatusUpdate('Call Booked')}
              disabled={isUpdating}
              className="flex-1 sm:flex-none px-5 py-2.5 min-h-[44px] rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Sparkles size={14} />
              <span>Booked 15-Min Demo</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
