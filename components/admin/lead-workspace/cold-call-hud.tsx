'use client'

import { useState } from 'react'
import { Phone, PhoneCall, Copy, Check, ChevronDown, ChevronUp, AlertCircle, ShieldAlert, Sparkles, UserCheck, Clock, CheckCircle2, XCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface ColdCallHudProps {
  lead: {
    id: string
    name?: string
    business_name?: string
    phone?: string
    website?: string
    status?: string
    notes?: string
    scraped_metadata?: Record<string, any>
  }
  onOutcomeRecorded: (outcome: string, notes: string) => Promise<void>
  onStatusUpdate: (status: string) => Promise<void>
}

export function ColdCallHud({ lead, onOutcomeRecorded, onStatusUpdate }: ColdCallHudProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [activeObjection, setActiveObjection] = useState<string | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)

  const meta = lead.scraped_metadata || {}
  const businessName = lead.business_name || lead.name || 'Practice'
  const partnerName = lead.name && lead.name !== 'Practice Partners' && lead.name !== 'Practice Director' 
    ? lead.name 
    : meta.partner_name || meta.director_name || null
  const phone = lead.phone || meta.phone || ''
  const location = meta.city || meta.address || 'UK'
  const trade = meta.trade || 'Chartered Accountants'

  // Extract plain-English flaw from notes or metadata
  const observableFlaw = meta.observable_problem || meta.friction_title || 'Mobile contact form lacks turnover qualification and direct consultation hold.'
  const commercialConsequence = meta.commercial_outcome || 'High-turnover Ltd Co directors searching out of hours drop off to competing practices, while partners waste billable hours on tire-kickers.'
  const concreteFix = meta.concrete_fix || 'Interactive 60-second client intake scoper pre-qualifying Ltd Co turnover with direct calendar sync.'

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(fieldId)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const handleRecordCallOutcome = async (outcomeStatus: string, label: string) => {
    try {
      setIsUpdating(true)
      await onOutcomeRecorded(label, `Recorded via Cold Call HUD: ${label}`)
      await onStatusUpdate(outcomeStatus)
    } finally {
      setIsUpdating(false)
    }
  }

  // 3-Phase Benevolent Call Script
  const phase1Gatekeeper = partnerName
    ? `Good morning — could you connect me with ${partnerName}, please?`
    : `Good morning — could you put me through to the senior partner managing new business instructions, please?`

  const phase2Opener = partnerName
    ? `Hi ${partnerName}, Gurtej here from Mercian Wealth. I'll be very brief as I know you're in the middle of client books.\n\nI was reviewing ${businessName} on mobile earlier. Your firm's ${trade} credentials look top tier, but I noticed something specific regarding your mobile contact intake: ${observableFlaw}.\n\nAhead of statutory tax deadlines, are your partners losing billable hours manually qualifying enquiries over email, or do you have a system in place that filters turnover before they reach your diary?`
    : `Hi, Gurtej here from Mercian Wealth. I'll keep this under 45 seconds because I know your partners are busy with client accounts.\n\nI was looking at ${businessName} on a phone earlier. Your practice reputation looks fantastic, but on mobile, your new client intake is: ${observableFlaw}.\n\nAre most of your new client discovery calls currently scheduled manually over email, or do you have an automated scoper pre-qualifying corporate turnover first?`

  const phase3Close = `We help established practices install a streamlined client triage portal. It lets a prospective director pre-qualify their turnover in 60 seconds and reserves a discovery call directly to your diary, while filtering out unqualified tire-kickers.\n\nWould you be opposed to a brief 5-minute catch-up tomorrow afternoon so you can see how this saves partner billable hours?`

  // Objections
  const OBJECTIONS = [
    {
      id: 'agency',
      title: 'We already have a web designer / agency',
      script: `Totally respect that, and cosmetic changes on the page are easy for them to fix in 10 minutes.\n\nWhat we solve is practice operations after the click: out-of-hours response speed and pre-qualifying corporate retainers before you speak with them. We don't replace your web person; we plug in an institutional intake engine. Happy to send over a quick summary for your partners to review on merit.`
    },
    {
      id: 'email',
      title: 'Just send an email with information',
      script: `Happy to do that. What is your direct email address?\n\nI'll send over a 2-sentence note highlighting the exact mobile friction point on your contact page. When would be best to follow up for 2 minutes once you've had a glance — tomorrow or Thursday?`
    },
    {
      id: 'busy',
      title: 'We are too busy / Not taking on new clients',
      script: `That is the best position for an established firm to be in. If you are already at capacity, that is actually the exact reason practices implement this: to strictly filter out lower-tier clients and only allow high-margin £1m+ turnover retainers through to partner calendars, without burning staff time fielding routine enquiries.`
    },
    {
      id: 'cost',
      title: 'How much does this cost?',
      script: `Our practice infrastructure typically ranges depending on whether you need a dedicated intake scoper or full practice onboarding automation. But before discussing fees, we verify whether your firm is actually leaking high-value retainers on mobile. If you can't capture an extra £3k–£5k annual retainer from this, you shouldn't do it. Fair enough to take 5 minutes to see the workflow first?`
    }
  ]

  return (
    <div className="rounded-2xl bg-gradient-to-b from-[#111116] to-[#0A0A0D] border border-emerald-500/30 p-5 shadow-2xl space-y-5">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <PhoneCall className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-white text-base">Cold Call Teleprompter & Battlecard</h3>
              <Badge variant="outline" className="text-emerald-400 border-emerald-500/30 text-[10px] font-mono uppercase">
                Live Dialing HUD
              </Badge>
            </div>
            <p className="text-xs text-zinc-400">
              Target: <span className="text-zinc-200 font-medium">{partnerName || 'Managing Partner'}</span> · {location}
            </p>
          </div>
        </div>

        {/* Big Click-to-Call Button */}
        {phone ? (
          <a
            href={`tel:${phone.replace(/\s+/g, '')}`}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-sm transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
          >
            <Phone className="h-4 w-4 fill-current" />
            <span>Call {phone}</span>
          </a>
        ) : (
          <Badge variant="secondary" className="text-xs text-amber-400 bg-amber-500/10 border-amber-500/20">
            No Direct Phone Listed
          </Badge>
        )}
      </div>

      {/* 3-Second Diagnostic Flashcard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-xl bg-black/40 border border-rose-500/20 space-y-1">
          <div className="flex items-center gap-1.5 text-rose-400 text-xs font-semibold uppercase tracking-wider">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>Observable Friction</span>
          </div>
          <p className="text-xs text-zinc-200 leading-relaxed font-medium">
            {observableFlaw}
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-black/40 border border-amber-500/20 space-y-1">
          <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>Commercial Consequence</span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed">
            {commercialConsequence}
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-black/40 border border-emerald-500/20 space-y-1">
          <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" />
            <span>The Natural Fix</span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed">
            {concreteFix}
          </p>
        </div>
      </div>

      {/* 3-Phase Teleprompter Script */}
      <div className="space-y-3 bg-black/50 p-4 rounded-xl border border-white/5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 font-semibold">
            <UserCheck className="h-3.5 w-3.5" /> Teleprompter Script (Benevolent Authority)
          </span>
          <span className="text-[11px] text-zinc-500">Zero groveling · High status</span>
        </div>

        {/* Phase 1 */}
        <div className="p-3 rounded-lg bg-zinc-900/60 border border-white/5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
              Phase 1: Gatekeeper / Pattern Interrupt
            </span>
            <button
              onClick={() => handleCopy(phase1Gatekeeper, 'p1')}
              className="text-zinc-500 hover:text-zinc-200 transition-colors"
            >
              {copiedField === 'p1' ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
            </button>
          </div>
          <p className="text-xs text-zinc-200 italic font-serif leading-relaxed">
            "{phase1Gatekeeper}"
          </p>
        </div>

        {/* Phase 2 */}
        <div className="p-3 rounded-lg bg-zinc-900/60 border border-white/5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
              Phase 2: Partner Opener & Problem Bridge
            </span>
            <button
              onClick={() => handleCopy(phase2Opener, 'p2')}
              className="text-zinc-500 hover:text-zinc-200 transition-colors"
            >
              {copiedField === 'p2' ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
            </button>
          </div>
          <p className="text-xs text-zinc-200 whitespace-pre-line leading-relaxed font-sans">
            {phase2Opener}
          </p>
        </div>

        {/* Phase 3 */}
        <div className="p-3 rounded-lg bg-zinc-900/60 border border-white/5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-purple-400 uppercase tracking-wider">
              Phase 3: The 10-Minute Discovery Close
            </span>
            <button
              onClick={() => handleCopy(phase3Close, 'p3')}
              className="text-zinc-500 hover:text-zinc-200 transition-colors"
            >
              {copiedField === 'p3' ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
            </button>
          </div>
          <p className="text-xs text-zinc-200 whitespace-pre-line leading-relaxed font-sans">
            {phase3Close}
          </p>
        </div>
      </div>

      {/* Interactive Objection Handling */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          Live Objection Handlers (Click to Reveal Script):
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {OBJECTIONS.map((obj) => {
            const isOpen = activeObjection === obj.id
            return (
              <div
                key={obj.id}
                className="rounded-xl border border-white/10 bg-zinc-900/50 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setActiveObjection(isOpen ? null : obj.id)}
                  className="w-full px-3 py-2.5 flex items-center justify-between text-left text-xs font-medium text-zinc-200 hover:bg-white/5 transition-colors"
                >
                  <span>"{obj.title}"</span>
                  {isOpen ? <ChevronUp className="h-3.5 w-3.5 text-zinc-400" /> : <ChevronDown className="h-3.5 w-3.5 text-zinc-500" />}
                </button>
                {isOpen && (
                  <div className="p-3 bg-black/60 border-t border-white/5 space-y-2">
                    <p className="text-xs text-emerald-300 leading-relaxed whitespace-pre-line">
                      {obj.script}
                    </p>
                    <button
                      onClick={() => handleCopy(obj.script, `obj_${obj.id}`)}
                      className="text-[10px] text-zinc-400 hover:text-zinc-200 flex items-center gap-1"
                    >
                      {copiedField === `obj_${obj.id}` ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                      <span>Copy Counter</span>
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* One-Click Call Outcome Strip */}
      <div className="border-t border-white/10 pt-4 flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs text-zinc-400 font-medium">Record Call Outcome:</span>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={isUpdating}
            onClick={() => handleRecordCallOutcome('Call Booked', 'Discovery Call Booked')}
            className="border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 text-xs h-8"
          >
            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
            Booked Discovery
          </Button>

          <Button
            size="sm"
            variant="outline"
            disabled={isUpdating}
            onClick={() => handleRecordCallOutcome('Contacted', 'Partner Spoken - Follow-up Needed')}
            className="border-amber-500/40 text-amber-400 hover:bg-amber-500/10 text-xs h-8"
          >
            <Clock className="h-3.5 w-3.5 mr-1" />
            Follow-up Needed
          </Button>

          <Button
            size="sm"
            variant="outline"
            disabled={isUpdating}
            onClick={() => handleRecordCallOutcome('Contacted', 'Gatekeeper / Voicemail Left')}
            className="border-blue-500/40 text-blue-400 hover:bg-blue-500/10 text-xs h-8"
          >
            <Phone className="h-3.5 w-3.5 mr-1" />
            Gatekeeper / VM
          </Button>

          <Button
            size="sm"
            variant="outline"
            disabled={isUpdating}
            onClick={() => handleRecordCallOutcome('Lost', 'Not Interested / Lost')}
            className="border-zinc-700 text-zinc-400 hover:bg-zinc-800 text-xs h-8"
          >
            <XCircle className="h-3.5 w-3.5 mr-1" />
            Not Interested
          </Button>
        </div>
      </div>
    </div>
  )
}
