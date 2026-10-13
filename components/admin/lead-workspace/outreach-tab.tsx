'use client'

import { useState } from 'react'
import { Phone, MessageSquare, Mail, ChevronDown, ChevronUp, Calculator, Globe } from 'lucide-react'
import { OutreachMessageCard } from './outreach-message-card'
import { CallOutcomeSheet } from './call-outcome-sheet'
import { WhatsAppSequenceBlocks } from '@/components/admin/whatsapp-sequence-blocks'
import type { PlaybookEngine } from '@/hooks/use-playbook-engine'
import { findAccountantIntelligence } from '@/lib/auditor/accountant-leads-registry'
import { LeadFrictionDossier } from '@/components/admin/lead-friction-dossier'
import { createClient } from '@/lib/supabase/client'

interface OutreachTabProps {
  lead: {
    id: string
    name: string
    business_name?: string
    phone?: string
    email?: string
    website?: string
  }
  engine: PlaybookEngine
  onOutcomeRecorded: (outcome: string, notes: string) => Promise<void>
  onStatusUpdate: (status: string) => Promise<void>
  onEmailSave?: (email: string) => Promise<void>
}

type Channel = 'whatsapp' | 'call' | 'email'

export function OutreachTab({ lead, engine, onOutcomeRecorded, onStatusUpdate, onEmailSave }: OutreachTabProps) {
  const {
    businessName,
    hasWebsite,
    isMobile,
    recommendedChannel,
    recommendedApproach,
    callOpener,
    whatsappMessage,
    emailSubject: engineEmailSubject,
    emailXMessage,
    evidenceItems,
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
    handleWhatsApp,
    handleCall,
    rating,
    reviewsCount,
    nicheProfile,
    protoUrl,
  } = engine

  const [channel, setChannel] = useState<Channel>(recommendedChannel)
  const [showOutcome, setShowOutcome] = useState(false)
  const [showPipeline, setShowPipeline] = useState(false)
  const [showTrackSelector, setShowTrackSelector] = useState(false)
  const [showCalculator, setShowCalculator] = useState(false)
  const [expandedPipelineId, setExpandedPipelineId] = useState<string | null>(null)
  const [manualEmail, setManualEmail] = useState(lead.email || '')
  const [savingEmail, setSavingEmail] = useState(false)

  const handleSaveEmail = async () => {
    if (!manualEmail.trim() || !onEmailSave) return
    setSavingEmail(true)
    await onEmailSave(manualEmail.trim())
    setSavingEmail(false)
  }

  const effectiveEmailSubject = engineEmailSubject || `Quick question regarding ${businessName}`
  const effectiveEmailBody = emailXMessage || `Hi,\n\n${callOpener}\n\nWould love to show you a quick example.\n\nBest regards,\nGurtej\nMercian Wealth`

  const accountantIntel = findAccountantIntelligence(lead.website, lead.business_name || lead.name)
  const supabase = createClient()
  const handleSaveNotes = async (newNotes: string) => {
    await supabase.from('leads').update({ notes: newNotes }).eq('id', lead.id)
  }

  return (
    <div className="space-y-5">
      {/* Forensic Friction & Notes Dossier */}
      <LeadFrictionDossier
        lead={lead as any}
        intel={accountantIntel}
        onSaveNotes={handleSaveNotes}
        onSendWhatsApp={(text) => handleWhatsApp(text)}
      />

      {/* Recommended approach */}
      <div className="p-4 rounded-2xl bg-[#0B0B0D] border border-white/10">
        <p className="text-xs text-zinc-500 font-mono uppercase tracking-wider mb-2">Recommended approach</p>
        <p className="text-sm text-zinc-200 leading-relaxed">{recommendedApproach}</p>
      </div>

      {/* Channel selector */}
      <div className="p-1 rounded-2xl bg-[#0B0B0D] border border-white/10 flex">
        {([
          { id: 'whatsapp', label: 'WhatsApp', Icon: MessageSquare, available: isMobile || !!lead.phone },
          { id: 'call', label: 'Call', Icon: Phone, available: !!lead.phone },
          { id: 'email', label: 'Email', Icon: Mail, available: !!lead.email },
        ] as { id: Channel; label: string; Icon: typeof Phone; available: boolean }[]).map(({ id, label, Icon, available }) => (
          <button
            key={id}
            onClick={() => available && setChannel(id)}
            disabled={!available}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
              channel === id
                ? 'bg-[#141417] text-white border border-white/10 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Icon size={13} />
            {label}
            {id === recommendedChannel && channel !== id && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#DAA640] shrink-0" />
            )}
          </button>
        ))}
      </div>

      {/* WHATSAPP VIEW */}
      {channel === 'whatsapp' && (
        <div className="space-y-3">
          {/* Track A sub-step selector (has website) */}
          {hasWebsite && (
            <div className="space-y-2">
              <button
                onClick={() => setShowTrackSelector(!showTrackSelector)}
                className="flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
              >
                {showTrackSelector ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                <Globe size={12} />
                <span>Website friction angle: <span className="text-zinc-300 font-medium">{trackAStep === 'a1_mobile' ? 'Mobile friction' : trackAStep === 'a2_password' ? 'Password locked' : trackAStep === 'a3_linktree' ? 'Linktree / social DM' : 'Custom observation'}</span></span>
              </button>
              {showTrackSelector && (
                <div className="p-3 rounded-xl bg-[#141417] border border-white/5 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {([
                      { id: 'a1_mobile', label: 'Mobile friction' },
                      { id: 'a2_password', label: 'Password locked' },
                      { id: 'a3_linktree', label: 'Linktree only' },
                      { id: 'a4_custom', label: 'Custom' },
                    ] as { id: typeof trackAStep; label: string }[]).map(({ id, label }) => (
                      <button
                        key={id}
                        onClick={() => setTrackAStep(id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                          trackAStep === id
                            ? 'bg-[#DAA640]/15 text-[#DAA640] border-[#DAA640]/30'
                            : 'bg-white/5 text-zinc-400 border-white/5 hover:text-white'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  {trackAStep === 'a4_custom' && (
                    <div className="space-y-1.5">
                      <label className="text-[11px] text-zinc-500 font-mono uppercase tracking-wider">Custom friction observation</label>
                      <input
                        type="text"
                        value={customObservation}
                        onChange={(e) => setCustomObservation(e.target.value)}
                        placeholder="e.g. consultation button leads to an empty form"
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-zinc-200 placeholder:text-zinc-600 outline-none focus:border-[#DAA640]/50 transition-colors"
                      />
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          { label: '🔒 Password-Locked', value: "it's currently locked behind a password screen and visitors can't view any pieces" },
                          { label: '🌲 Linktree Only', value: "there's only a Linktree with social DMs rather than a dedicated storefront" },
                          { label: '📱 Slow Mobile', value: "it's not loading properly on mobile and slow to respond" },
                        ].map((q) => (
                          <button
                            key={q.label}
                            onClick={() => setCustomObservation(q.value)}
                            className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-zinc-300 text-[10px] font-medium transition-colors cursor-pointer"
                          >
                            {q.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <WhatsAppSequenceBlocks
            sequence={engine.whatsAppSequence}
            phone={lead.phone}
            onSendWhatsApp={(text) => handleWhatsApp(text)}
          />

          {/* Record outcome after sending */}
          {!showOutcome ? (
            <button
              onClick={() => setShowOutcome(true)}
              className="w-full py-2 rounded-xl border border-white/10 bg-white/3 hover:bg-white/8 text-zinc-400 hover:text-zinc-200 text-xs font-medium transition-all cursor-pointer"
            >
              Record outcome
            </button>
          ) : (
            <CallOutcomeSheet
              leadId={lead.id}
              onOutcomeRecorded={async (outcome, notes) => {
                await onOutcomeRecorded(outcome, notes)
                setShowOutcome(false)
                if (outcome === 'interested') await onStatusUpdate('Contacted')
                else if (outcome === 'not_interested') await onStatusUpdate('Lost')
              }}
              onDismiss={() => setShowOutcome(false)}
            />
          )}
        </div>
      )}

      {/* CALL VIEW */}
      {channel === 'call' && (
        <div className="space-y-3">
          <OutreachMessageCard
            channel="call"
            message={callOpener}
            whyThisAngle={hasWebsite ? 'Reference one specific observation. Ask a question — don\'t pitch.' : 'Lead with the digital presence gap. Offer to show the prototype.'}
            evidenceTags={evidenceItems.slice(0, 2)}
            onSend={() => handleCall()}
            sendLabel={`Call ${lead.phone || businessName}`}
          />

          {/* After calling */}
          {!showOutcome ? (
            <button
              onClick={() => setShowOutcome(true)}
              className="w-full py-2 rounded-xl border border-white/10 bg-white/3 hover:bg-white/8 text-zinc-400 hover:text-zinc-200 text-xs font-medium transition-all cursor-pointer"
            >
              Record outcome
            </button>
          ) : (
            <CallOutcomeSheet
              leadId={lead.id}
              onOutcomeRecorded={async (outcome, notes) => {
                await onOutcomeRecorded(outcome, notes)
                setShowOutcome(false)
                if (outcome === 'interested') await onStatusUpdate('Contacted')
                else if (outcome === 'not_interested') await onStatusUpdate('Lost')
              }}
              onDismiss={() => setShowOutcome(false)}
            />
          )}
        </div>
      )}

      {/* EMAIL VIEW (Email X / Variable Y from PDFs) */}
      {channel === 'email' && (
        <div className="space-y-3">
          {/* Missing email prompt */}
          {!lead.email && (
            <div className="p-3.5 rounded-xl bg-[#141417] border border-amber-500/30 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
                <Mail size={13} />
                <span>No Email Address on File</span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Enter prospect email below or run the Website Friction Auditor under the Intelligence tab to extract it automatically.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={manualEmail}
                  onChange={(e) => setManualEmail(e.target.value)}
                  placeholder="e.g. info@business.co.uk"
                  className="flex-1 px-3 py-1.5 rounded-lg bg-black/50 border border-white/10 text-xs text-white placeholder:text-zinc-600 outline-none focus:border-[#DAA640]"
                />
                <button
                  onClick={handleSaveEmail}
                  disabled={!manualEmail.trim() || savingEmail}
                  className="px-3 py-1.5 rounded-lg bg-[#DAA640] hover:bg-[#C4932C] text-black font-semibold text-xs transition-all disabled:opacity-50 cursor-pointer"
                >
                  {savingEmail ? 'Saving...' : 'Save Email'}
                </button>
              </div>
            </div>
          )}

          <OutreachMessageCard
            channel="email"
            message={effectiveEmailBody}
            subject={effectiveEmailSubject}
            whyThisAngle="Outreach #1 Email X: Asks permission only (micro-yes). Describes one friction on one page without metric claims."
            evidenceTags={evidenceItems.slice(0, 2)}
            onSend={() => {
              if (lead.email) {
                window.open(`mailto:${lead.email}?subject=${encodeURIComponent(effectiveEmailSubject)}&body=${encodeURIComponent(effectiveEmailBody)}`)
              }
            }}
            sendLabel={lead.email ? `Open email composer · ${lead.email}` : 'Add an email to compose'}
          />

          {/* Record outcome after sending */}
          {!showOutcome ? (
            <button
              onClick={() => setShowOutcome(true)}
              className="w-full py-2 rounded-xl border border-white/10 bg-white/3 hover:bg-white/8 text-zinc-400 hover:text-zinc-200 text-xs font-medium transition-all cursor-pointer"
            >
              Record outcome
            </button>
          ) : (
            <CallOutcomeSheet
              leadId={lead.id}
              onOutcomeRecorded={async (outcome, notes) => {
                await onOutcomeRecorded(outcome, notes)
                setShowOutcome(false)
                if (outcome === 'interested') await onStatusUpdate('Contacted')
                else if (outcome === 'not_interested') await onStatusUpdate('Lost')
              }}
              onDismiss={() => setShowOutcome(false)}
            />
          )}
        </div>
      )}

      {/* Revenue calculator */}
      <div className="rounded-2xl bg-[#0B0B0D] border border-white/10 overflow-hidden">
        <button
          onClick={() => setShowCalculator(!showCalculator)}
          className="w-full flex items-center justify-between p-4 text-left cursor-pointer hover:bg-white/3 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Calculator size={14} className="text-amber-400" />
            <span className="text-xs font-semibold text-zinc-300">Revenue leakage diagnostic</span>
          </div>
          {showCalculator ? <ChevronUp size={14} className="text-zinc-500" /> : <ChevronDown size={14} className="text-zinc-500" />}
        </button>
        {showCalculator && (
          <div className="px-4 pb-4 space-y-4 border-t border-white/5">
            <p className="text-xs text-zinc-500 pt-3 leading-relaxed">
              Run this 2-minute diagnostic when the prospect says yes to the prototype. Anchor their economics before revealing pricing.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] text-zinc-500 flex items-center justify-between">
                  <span>Average ticket value</span>
                  <span className="text-white font-mono font-bold">£{ticketValue.toLocaleString()}</span>
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-500">£</span>
                  <input
                    type="number"
                    step={100}
                    min={100}
                    value={ticketValue}
                    onChange={(e) => setTicketValue(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-black/50 border border-white/10 text-xs text-white font-mono focus:border-amber-400 outline-none"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-zinc-500 flex items-center justify-between">
                  <span>Missed enquiries / month</span>
                  <span className="text-white font-mono font-bold">{missedEnquiries} missed</span>
                </label>
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={missedEnquiries}
                  onChange={(e) => setMissedEnquiries(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-black/50 border border-white/10 text-xs text-white font-mono focus:border-amber-400 outline-none"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-1 border-t border-amber-500/10 text-center">
              {[
                { label: 'Monthly estimate', value: `£${monthlyBleed.toLocaleString()}` },
                { label: 'Annual estimate', value: `£${annualBleed.toLocaleString()}` },
                { label: '£995 = ROI', value: `${ticketValue > 0 ? Math.round((ticketValue / 995) * 100) : 0}%` },
              ].map((s) => (
                <div key={s.label} className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <p className="text-amber-300 font-bold text-sm font-mono">{s.value}</p>
                  <p className="text-[9px] text-amber-500 mt-0.5 uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-zinc-600 italic">
              Clearly labelled as estimates — based on {missedEnquiries} missed {nicheProfile.itemsOrJobs} × £{ticketValue.toLocaleString()} average.
            </p>
          </div>
        )}
      </div>

      {/* More pipeline messages (collapsed) */}
      <div className="rounded-2xl bg-[#0B0B0D] border border-white/10 overflow-hidden">
        <button
          onClick={() => setShowPipeline(!showPipeline)}
          className="w-full flex items-center justify-between p-4 text-left cursor-pointer hover:bg-white/3 transition-colors"
        >
          <span className="text-xs font-semibold text-zinc-300">More outreach options</span>
          {showPipeline ? <ChevronUp size={14} className="text-zinc-500" /> : <ChevronDown size={14} className="text-zinc-500" />}
        </button>
        {showPipeline && (
          <div className="border-t border-white/5 divide-y divide-white/5">
            {pipelineMessages.map((msg) => (
              <div key={msg.id} className="overflow-hidden">
                <button
                  onClick={() => setExpandedPipelineId(expandedPipelineId === msg.id ? null : msg.id)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left cursor-pointer hover:bg-white/3 transition-colors"
                >
                  <span className="text-xs font-medium text-zinc-300">{msg.label}</span>
                  {expandedPipelineId === msg.id
                    ? <ChevronUp size={13} className="text-zinc-500 shrink-0" />
                    : <ChevronDown size={13} className="text-zinc-500 shrink-0" />}
                </button>
                {expandedPipelineId === msg.id && (
                  <div className="px-4 pb-4">
                    <OutreachMessageCard
                      channel="whatsapp"
                      message={msg.message}
                      compact
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
