'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Phone,
  PhoneCall,
  Globe,
  Copy,
  Check,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  AlertTriangle,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Building,
  User,
  ExternalLink,
  ShieldAlert,
  Send,
  MessageSquare,
  Mail,
  Share2,
  Zap,
  RotateCw,
  Eye,
  SlidersHorizontal,
  Smartphone
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { classifyPhoneNumber, buildWhatsAppOpenerUrl, buildTelUrl } from '@/lib/phone-classifier'
import { ObjectionFlipCard } from './objection-flip-card'

export interface CallingLead {
  id: string
  name?: string
  business_name?: string
  phone?: string | null
  website?: string | null
  email?: string | null
  status?: string
  notes?: string | null
  scraped_metadata?: Record<string, any>
  friction_found?: string | null
  trade?: string
}

interface CallingCockpitProps {
  isOpen: boolean
  onClose: () => void
  leads: CallingLead[]
  initialIndex?: number
  onStatusUpdate?: (id: string, status: string) => Promise<void> | void
  onOutcomeRecorded?: (id: string, outcome: string, notes: string) => Promise<void> | void
}

export function CallingCockpit({
  isOpen,
  onClose,
  leads,
  initialIndex = 0,
  onStatusUpdate,
  onOutcomeRecorded
}: CallingCockpitProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [activeChannel, setActiveChannel] = useState<'phone' | 'whatsapp' | 'email' | 'social'>('email')
  const [activeStep, setActiveStep] = useState<'day1' | 'day3' | 'day5'>('day1')
  const [quickNote, setQuickNote] = useState('')
  const [showLivePreview, setShowLivePreview] = useState(false)
  const [autoAdvance, setAutoAdvance] = useState(true)
  const [isLogging, setIsLogging] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const supabase = createClient()

  // Keep index within bounds when leads array changes
  useEffect(() => {
    if (initialIndex >= 0 && initialIndex < leads.length) {
      setCurrentIndex(initialIndex)
    }
  }, [initialIndex, leads.length])

  const currentLead = useMemo(() => {
    if (!leads || leads.length === 0) return null
    return leads[currentIndex] || leads[0]
  }, [leads, currentIndex])

  // Extract structured intelligence
  const meta = useMemo(() => (currentLead?.scraped_metadata || {}) as Record<string, any>, [currentLead])
  const businessName = currentLead?.business_name || currentLead?.name || 'Accountancy Practice'
  const partnerName = (currentLead?.name &&
    currentLead.name !== businessName &&
    !currentLead.name.toLowerCase().includes('partner') &&
    !currentLead.name.toLowerCase().includes('director') &&
    !currentLead.name.toLowerCase().includes('practice'))
    ? currentLead.name.trim()
    : meta.partner_name || meta.director_name || null

  const phone = currentLead?.phone || meta.phone || ''
  const phoneInfo = useMemo(() => classifyPhoneNumber(phone), [phone])
  const location = meta.city || meta.address || 'UK'
  const trade = meta.trade || 'Chartered Accountants'
  const techStack = meta.tech_stack || meta.stack_summary || 'Standard Web Stack'
  const vulnerabilities = meta.vulnerabilities || 'Standard security posture'

  // Plain-English diagnostic flaw
  const observableFlaw = meta.observable_problem ||
    meta.friction_title ||
    (currentLead?.notes && currentLead.notes.includes('• VERIFIED FLAW:')
      ? currentLead.notes.match(/• VERIFIED FLAW:\s*([^\n]+)/i)?.[1]?.trim()
      : 'Mobile contact intake lacks turnover qualification and direct calendar booking hold.')

  const commercialOutcome = meta.commercial_outcome ||
    (currentLead?.notes && currentLead.notes.includes('• COMMERCIAL LEVER:')
      ? currentLead.notes.match(/• COMMERCIAL LEVER:\s*([^\n]+)/i)?.[1]?.trim()
      : 'High-margin Ltd Co directors searching out of hours abandon to modern firms with instant scheduling, while partners waste billable hours triaging unqualified enquiries over email.')

  const concreteFix = meta.concrete_fix ||
    (currentLead?.notes && currentLead.notes.includes('• ARCHITECTURE FIX:')
      ? currentLead.notes.match(/• ARCHITECTURE FIX:\s*([^\n]+)/i)?.[1]?.trim()
      : 'Interactive 60-second client intake scoper pre-qualifying Ltd Co turnover with direct calendar sync.')

  // 2-Tier Monetization Architecture
  const trojanHorse = meta.trojan_horse_storefront || 'Sub-second luxury mobile storefront fixing intake drop-off.'
  const automatorUpsell = meta.automator_upsell_engine || '60s turnover qualification filter + Speed-to-lead WhatsApp + calendar hold.'
  const setupPrice = meta.deal_tier_setup || '£1,995'
  const retainerPrice = meta.deal_tier_retainer || '£695/mo'
  const y1Value = meta.deal_total_y1_value || '£10,335'

  // 3-Phase Benevolent Call Script
  const phase1Gatekeeper = partnerName
    ? `Good morning — could you connect me with ${partnerName}, please?`
    : `Good morning — could you put me through to the senior partner managing new business instructions, please?`

  const phase2Opener = partnerName
    ? `Hi ${partnerName}, Gurtej here from Mercian Wealth. I'll be very brief as I know you're in the middle of client books.\n\nI was reviewing ${businessName} on mobile earlier. Your firm's ${trade} credentials look top tier, but I noticed something specific regarding your mobile intake: ${observableFlaw}\n\nAhead of statutory tax deadlines, are your partners losing billable hours manually qualifying enquiries over email, or do you have a system in place that handles that automatically?`
    : `Good morning, Gurtej here from Mercian Wealth. I'll be very brief—I was reviewing ${businessName} on mobile earlier. Your practice credentials look top tier, but I noticed something specific regarding your mobile intake: ${observableFlaw}\n\nAhead of statutory tax deadlines, are your partners losing billable hours manually qualifying enquiries over email, or do you have a system in place that handles that automatically?`

  const phase3Close = `“Makes total sense. Look, I promised to keep this to two minutes and I respect your time.\n\nWhat other high-growth practices do is deploy a 60-second interactive scoper that pre-qualifies sole trader vs Ltd Co turnover upfront before booking directly into the partner calendar.\n\nWould it be totally crazy to connect for 15 minutes next Tuesday or Wednesday morning at 10:30am so you can evaluate the architecture? If it's not relevant on your end, no hard feelings at all.”`

  // Lesson-Accurate Written Outreach Suite (Day 1, Day 3, Day 5)
  const cleanFirstName = partnerName ? partnerName.split(' ')[0] : 'Partner'
  const observationShort = (observableFlaw || 'mobile intake lacks turnover qualification and calendar hold')
    .replace(/^[^:]+:\s*/, '')
    .replace(/\.$/, '')

  // 1. WhatsApp Suite
  const whatsAppDay1 = `Hey ${cleanFirstName}, was on ${businessName}'s site earlier and noticed ${observationShort}. We engineered a clean Practice OS prototype for your firm that unifies intake into a 60-second corporate flow with native scheduling. Would it be totally crazy to share a quick 60-second preview?`
  const whatsAppDay3 = `Hey ${cleanFirstName}, messaged earlier this week regarding the intake friction on ${businessName}'s site. Worth a quick 2-minute look, or should I just close the loop here?`
  const whatsAppDay5 = `Hey ${cleanFirstName}, reached out a couple times after reviewing your site. Before I move on, just wanted to give you the opportunity to give a clear yes or no on this, no hard feelings either way.`

  // 2. Email Suite
  const emailDay1Subject = `Quick observation regarding ${businessName} mobile client intake`
  const emailDay1Body = `Hey ${cleanFirstName},\n\nI was on ${businessName}'s site earlier and noticed ${observationShort}.\n\nThat's exactly why I'm reaching out. We actually engineered a clean Practice OS prototype specifically for ${businessName} that unifies your intake into a sleek 60-second corporate pre-qualification flow with native scheduling on your domain.\n\nWould it be totally crazy for a quick 10-minute side-by-side look early next week to see if this is even relevant on your end?\n\nBest regards,\nGurtej Deep\nFounder · Mercian Wealth\n07851 055929 | mercianwealth.com`

  const emailDay3Subject = `Re: Quick observation regarding ${businessName} mobile client intake`
  const emailDay3Body = `Hey ${cleanFirstName},\n\nSent a quick note earlier this week regarding the intake friction on ${businessName}'s site.\n\nWorth a quick 2-minute look, or should I just close the loop here?\n\nBest,\nGurtej`

  const emailDay5Subject = `Re: Quick observation regarding ${businessName} mobile client intake`
  const emailDay5Body = `Hey ${cleanFirstName},\n\nReached out a couple of times after reviewing your site. Before I move on, just wanted to give you the opportunity to give a clear yes or no on this, no hard feelings either way.\n\nBest,\nGurtej`

  // 3. Social DM Suite (LinkedIn / Instagram)
  const socialDay1 = `Hey ${cleanFirstName}, was on ${businessName}'s site earlier and noticed ${observationShort}. We engineered a clean Practice OS prototype for your firm that fixes this with instant corporate qualification & scheduling. Would it be totally crazy to share a 60-second preview to see if it's relevant?`
  const socialDay3 = `Hey ${cleanFirstName}, sent a note earlier regarding the intake friction on your site. Worth a quick 2-min look, or should I close the loop here?`
  const socialDay5 = `Hey ${cleanFirstName}, reached out a couple times. Before I move on, just wanted to give you a chance to give a clear yes or no, no hard feelings either way.`

  // Social Discovery Links
  const linkedInSearchUrl = `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent((partnerName ? `${partnerName} ` : '') + businessName)}`
  const instagramSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(`${businessName} instagram`)}`

  // Current Dynamic Content based on activeStep
  const currentWhatsAppCopy = activeStep === 'day1' ? whatsAppDay1 : activeStep === 'day3' ? whatsAppDay3 : whatsAppDay5
  const currentEmailSubject = activeStep === 'day1' ? emailDay1Subject : activeStep === 'day3' ? emailDay3Subject : emailDay5Subject
  const currentEmailBody = activeStep === 'day1' ? emailDay1Body : activeStep === 'day3' ? emailDay3Body : emailDay5Body
  const currentSocialCopy = activeStep === 'day1' ? socialDay1 : activeStep === 'day3' ? socialDay3 : socialDay5

  const telUrl = buildTelUrl(phone)
  const waUrl = buildWhatsAppOpenerUrl(phone, currentWhatsAppCopy)

  // Copy helper
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  // Navigation handlers
  const handleNextLead = useCallback(() => {
    if (currentIndex < leads.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      setQuickNote('')
    }
  }, [currentIndex, leads.length])

  const handlePrevLead = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
      setQuickNote('')
    }
  }, [currentIndex])

  // Call outcome logging
  const handleRecordOutcome = async (outcomeStatus: string, label: string) => {
    if (!currentLead) return
    setIsLogging(true)
    const finalNote = quickNote.trim()
      ? `Recorded via Calling Cockpit: ${label} | Note: ${quickNote.trim()}`
      : `Recorded via Calling Cockpit: ${label}`

    try {
      // 1. Update Supabase leads table
      await supabase
        .from('leads')
        .update({
          status: outcomeStatus,
          notes: currentLead.notes ? `${currentLead.notes}\n• [CALL LOG ${new Date().toLocaleDateString('en-GB')}]: ${finalNote}` : finalNote,
          updated_at: new Date().toISOString()
        })
        .eq('id', currentLead.id)

      // 2. Insert into audit/activity log
      try {
        await supabase.from('audit_logs').insert({
          action: 'cold_call_outcome',
          entity_id: currentLead.id,
          entity_type: 'leads',
          meta: {
            outcome: label,
            status: outcomeStatus,
            phone,
            business_name: businessName,
            note: quickNote.trim() || undefined
          }
        })
      } catch {
        // Silently handle audit logging if not configured
      }

      // 3. Callback props
      if (onOutcomeRecorded) await onOutcomeRecorded(currentLead.id, label, finalNote)
      if (onStatusUpdate) await onStatusUpdate(currentLead.id, outcomeStatus)

      // Show toast
      setToastMessage(`✓ Logged: ${label}`)
      setTimeout(() => setToastMessage(null), 2500)

      // Auto-advance
      if (autoAdvance && currentIndex < leads.length - 1) {
        handleNextLead()
      }
    } catch (err) {
      console.error('Failed to log call outcome:', err)
    } finally {
      setIsLogging(false)
    }
  }

  // Keyboard navigation listener
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing inside input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return
      }

      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'j' || e.key === 'ArrowRight') {
        e.preventDefault()
        handleNextLead()
      } else if (e.key === 'k' || e.key === 'ArrowLeft') {
        e.preventDefault()
        handlePrevLead()
      } else if (e.key === '1') {
        e.preventDefault()
        handleRecordOutcome('Proposal Sent', 'Booked Discovery Call')
      } else if (e.key === '2') {
        e.preventDefault()
        handleRecordOutcome('Contacted', 'Gatekeeper Blocked')
      } else if (e.key === '3') {
        e.preventDefault()
        handleRecordOutcome('Contacted', 'No Answer / Voicemail')
      } else if (e.key === '4') {
        e.preventDefault()
        handleRecordOutcome('Lost', 'Not Interested / Lost')
      } else if (e.key === ' ' && phone && telUrl) {
        // Space to Dial
        e.preventDefault()
        window.location.href = telUrl
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, currentIndex, leads.length, phone, telUrl, handleNextLead, handlePrevLead, onClose])

  if (!isOpen || !currentLead) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      {/* COCKPIT CONTAINER */}
      <div className="relative w-full max-w-[1500px] h-[94vh] max-h-[960px] bg-[#09090B] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-white">

        {/* ── TOP HEADER BAR ── */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-[#141417]/90 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#DCAE53]/15 text-[#DCAE53]">
                <Zap size={18} />
              </span>
              <div>
                <h1 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
                  Mercian Wealth Calling Cockpit
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DCAE53]/20 text-[#DCAE53] border border-[#DCAE53]/30">
                    Lead {currentIndex + 1} of {leads.length}
                  </span>
                </h1>
                <p className="text-[11px] text-white/50 hidden sm:block">
                  Keyboard: <kbd className="px-1 py-0.5 bg-white/10 rounded text-[10px]">Space</kbd> Dial · <kbd className="px-1 py-0.5 bg-white/10 rounded text-[10px]">1-4</kbd> Log Outcome · <kbd className="px-1 py-0.5 bg-white/10 rounded text-[10px]">J/K</kbd> Prev/Next · <kbd className="px-1 py-0.5 bg-white/10 rounded text-[10px]">Esc</kbd> Exit
                </p>
              </div>
            </div>
          </div>

          {/* Toast feedback badge */}
          {toastMessage && (
            <div className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 animate-in fade-in slide-in-from-top-1">
              {toastMessage}
            </div>
          )}

          {/* Navigation & Controls */}
          <div className="flex items-center gap-2">
            {/* Auto-advance toggle */}
            <button
              type="button"
              onClick={() => setAutoAdvance(!autoAdvance)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 cursor-pointer ${
                autoAdvance
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-white/5 text-white/50 border-white/10'
              }`}
              title="Auto-advance to next lead on outcome logging"
            >
              <span className={`w-2 h-2 rounded-full ${autoAdvance ? 'bg-emerald-400 animate-pulse' : 'bg-white/30'}`} />
              <span className="hidden sm:inline">Auto-Advance</span>
            </button>

            {/* Prev / Next Buttons */}
            <div className="flex items-center rounded-lg border border-white/10 bg-white/5 overflow-hidden">
              <button
                type="button"
                onClick={handlePrevLead}
                disabled={currentIndex === 0}
                className="p-1.5 text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Previous Lead (K)"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="text-xs px-2 font-mono text-white/60">
                {currentIndex + 1}/{leads.length}
              </span>
              <button
                type="button"
                onClick={handleNextLead}
                disabled={currentIndex === leads.length - 1}
                className="p-1.5 text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Next Lead (J)"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Close Cockpit */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors ml-1"
              aria-label="Close Cockpit"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* ── 3-PANE WORKSPACE BODY ── */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-y-auto lg:overflow-hidden">

          {/* ════ PANE 1: TARGET FIRM DOSSIER (col-span-3) ════ */}
          <div className="lg:col-span-3 border-r border-white/10 bg-[#0D0D12] p-4 sm:p-5 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              {/* Practice Headline */}
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    currentLead.status === 'New'
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : currentLead.status === 'Contacted'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-white/10 text-white/70'
                  }`}>
                    {currentLead.status || 'New'}
                  </span>
                  <span className="text-[11px] text-white/40 flex items-center gap-1">
                    <Building size={12} /> {location}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white leading-tight">
                  {businessName}
                </h2>
                {partnerName && (
                  <p className="text-xs text-[#DCAE53] font-semibold flex items-center gap-1.5 mt-1">
                    <User size={13} /> {partnerName}
                  </p>
                )}
              </div>

              {/* Primary Call Action Button */}
              {phone && telUrl ? (
                <a
                  href={telUrl}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-4 py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-emerald-500/20 transition-all duration-200 cursor-pointer text-center group"
                >
                  <PhoneCall size={18} className="text-white shrink-0 group-hover:scale-110 transition-transform" />
                  <span>Call {phone}</span>
                </a>
              ) : (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400 font-medium text-center">
                  No verified phone number listed
                </div>
              )}

              {/* Website Link & Mobile Viewport Toggle */}
              {currentLead.website && currentLead.website !== 'None' ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <a
                      href={currentLead.website.startsWith('http') ? currentLead.website : `https://${currentLead.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-[#DCAE53] transition-colors flex items-center gap-1.5 truncate max-w-[210px]"
                    >
                      <Globe size={13} className="shrink-0 text-white/40" />
                      <span className="truncate">{currentLead.website.replace(/^https?:\/\/(www\.)?/, '')}</span>
                      <ExternalLink size={11} className="shrink-0 text-white/40" />
                    </a>

                    <button
                      type="button"
                      onClick={() => setShowLivePreview(!showLivePreview)}
                      className={`px-2 py-1 rounded text-[11px] font-medium border flex items-center gap-1 transition-colors ${
                        showLivePreview
                          ? 'bg-[#DCAE53]/20 text-[#DCAE53] border-[#DCAE53]/40'
                          : 'bg-white/5 text-white/50 border-white/10 hover:text-white'
                      }`}
                    >
                      <Smartphone size={12} />
                      {showLivePreview ? 'Hide View' : 'Live 390px'}
                    </button>
                  </div>

                  {/* 390px Sandbox Iframe */}
                  {showLivePreview && (
                    <div className="relative w-full h-[260px] rounded-xl border border-white/20 bg-black overflow-hidden shadow-inner">
                      <iframe
                        src={currentLead.website.startsWith('http') ? currentLead.website : `https://${currentLead.website}`}
                        title="390px Mobile View"
                        className="w-[390px] h-[844px] origin-top-left scale-[0.62] border-0 pointer-events-auto"
                      />
                    </div>
                  )}
                </div>
              ) : null}

              {/* Tech Stack & Vulnerability Chips */}
              <div className="p-3 bg-[#141417] border border-white/5 rounded-xl space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-white/40 flex items-center gap-1">
                  <ShieldAlert size={12} className="text-[#DCAE53]" /> Tech Architecture
                </span>
                <p className="text-xs font-semibold text-white/90">
                  {techStack}
                </p>
                <p className="text-[11px] text-white/50 leading-relaxed">
                  {vulnerabilities}
                </p>
              </div>

              {/* 2-Tier Monetization Architecture Card */}
              <div className="p-3 bg-gradient-to-br from-[#1C1C22] to-[#141417] border border-[#DCAE53]/30 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#DCAE53] flex items-center gap-1">
                    <Sparkles size={11} /> Monetization Blueprint
                  </span>
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#DCAE53]/15 text-[#DCAE53] border border-[#DCAE53]/30">
                    Est. Y1: {y1Value}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="bg-white/5 p-2 rounded-lg">
                    <div className="flex items-center justify-between text-[11px] font-bold text-white mb-0.5">
                      <span className="text-emerald-400">Tier 1 · Door-Opener</span>
                      <span className="text-white font-mono">{setupPrice}</span>
                    </div>
                    <p className="text-[10px] text-white/70 leading-snug">
                      {trojanHorse}
                    </p>
                  </div>

                  <div className="bg-white/5 p-2 rounded-lg">
                    <div className="flex items-center justify-between text-[11px] font-bold text-white mb-0.5">
                      <span className="text-[#DCAE53]">Tier 2 · Automator Engine</span>
                      <span className="text-white font-mono">{retainerPrice}</span>
                    </div>
                    <p className="text-[10px] text-white/70 leading-snug">
                      {automatorUpsell}
                    </p>
                  </div>
                </div>
              </div>

              {/* Local London Time Reference */}
              <div className="flex items-center justify-between text-[11px] text-white/40 px-1">
                <span className="flex items-center gap-1">
                  <Clock size={12} /> London Local Time
                </span>
                <span className="font-mono text-white/70">
                  {new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/London' })}
                </span>
              </div>
            </div>

            {/* Quick Channel Mode Toggles */}
            <div className="border-t border-white/10 pt-3 mt-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 block mb-2">
                Outreach Channel
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
                <button
                  type="button"
                  onClick={() => setActiveChannel('email')}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeChannel === 'email'
                      ? 'bg-blue-500 text-white shadow-sm'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Mail size={13} /> Email
                </button>
                <button
                  type="button"
                  onClick={() => setActiveChannel('whatsapp')}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeChannel === 'whatsapp'
                      ? 'bg-emerald-500 text-[#09090B] shadow-sm'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <MessageSquare size={13} /> WhatsApp
                </button>
                <button
                  type="button"
                  onClick={() => setActiveChannel('social')}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeChannel === 'social'
                      ? 'bg-purple-500 text-white shadow-sm'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Share2 size={13} /> Social DM
                </button>
                <button
                  type="button"
                  onClick={() => setActiveChannel('phone')}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeChannel === 'phone'
                      ? 'bg-[#DCAE53] text-[#09090B] shadow-sm'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Phone size={13} /> Phone
                </button>
              </div>
            </div>
          </div>

          {/* ════ PANE 2: TELEPROMPTER FOCUS HUD (col-span-6) ════ */}
          <div className="lg:col-span-6 bg-[#09090B] p-4 sm:p-6 overflow-y-auto flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentLead.id}-${activeChannel}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                className="space-y-5"
              >
                {/* ── CHANNEL: PHONE HUD ── */}
                {activeChannel === 'phone' && (
                  <>
                    {/* 3-Second Diagnostic Proof Card (Magic UI Border Beam Styling) */}
                    <div className="relative rounded-xl bg-gradient-to-br from-[#1C1C22] to-[#141417] p-4 sm:p-5 border border-[#DCAE53]/40 shadow-xl overflow-hidden">
                      <div className="flex items-center justify-between mb-2">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DCAE53] uppercase tracking-wider">
                          <Sparkles size={14} /> 3-Second Forensic Diagnostic
                        </span>
                        <span className="text-[11px] text-white/40">Read before dialing</span>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <p className="text-[11px] font-bold text-red-400 uppercase tracking-wide">
                            Layer 1 · Observable Flaw (Visual Proof)
                          </p>
                          <p className="text-sm font-semibold text-white/95 leading-snug">
                            {observableFlaw}
                          </p>
                        </div>

                        <div className="border-t border-white/5 pt-2">
                          <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wide">
                            Layer 2 · Commercial Lever (Partner Billable Hours)
                          </p>
                          <p className="text-xs text-white/80 leading-relaxed">
                            {commercialOutcome}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 3-Phase Benevolent Call Script */}
                    <div className="space-y-3.5">
                      {/* Phase 1: Gatekeeper Pattern Interrupt */}
                      <div className="p-3.5 rounded-xl bg-[#141417] border border-white/10">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-white/50">
                            Phase 1 · Gatekeeper Pattern Interrupt
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopy(phase1Gatekeeper, 'p1')}
                            className="text-white/40 hover:text-white text-[11px] flex items-center gap-1"
                          >
                            {copiedKey === 'p1' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                          </button>
                        </div>
                        <p className="text-sm text-white/90 font-medium">
                          “{phase1Gatekeeper}”
                        </p>
                      </div>

                      {/* Phase 2: Diagnostic Commercial Opener */}
                      <div className="p-4 rounded-xl bg-[#141417] border-2 border-[#DCAE53]/30 shadow-md">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold uppercase tracking-wider text-[#DCAE53] flex items-center gap-1.5">
                            <Sparkles size={13} /> Phase 2 · Diagnostic Commercial Opener
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopy(phase2Opener, 'p2')}
                            className="text-white/40 hover:text-white text-[11px] flex items-center gap-1"
                          >
                            {copiedKey === 'p2' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                          </button>
                        </div>
                        <p className="text-sm sm:text-base text-white font-medium leading-relaxed">
                          “{phase2Opener}”
                        </p>
                      </div>

                      {/* Phase 3: High-Status 15-Minute Close */}
                      <div className="p-3.5 rounded-xl bg-[#141417] border border-white/10">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                            Phase 3 · High-Status Scoping Call Close
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopy(phase3Close, 'p3')}
                            className="text-white/40 hover:text-white text-[11px] flex items-center gap-1"
                          >
                            {copiedKey === 'p3' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                          </button>
                        </div>
                        <p className="text-xs sm:text-sm text-white/85 font-medium leading-relaxed">
                          {phase3Close}
                        </p>
                      </div>
                    </div>

                    {/* Kokonut UI 3D Objection Flip-Cards */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-white/50 flex items-center gap-1.5">
                          <HelpCircle size={14} className="text-[#DCAE53]" /> Objection Handling (Tap Card to Flip)
                        </span>
                        <span className="text-[11px] text-white/40">3D Rebuttals</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <ObjectionFlipCard
                          objection="Just send me an email"
                          rebuttal="I certainly can, but my emails tend to be vague without understanding your practice intake first. Do you have 2 minutes now to see if this even applies to your firm, or are you in client accounts?"
                        />
                        <ObjectionFlipCard
                          objection="We already have a web guy"
                          rebuttal="Understood. Most web designers build static brochures. We engineer automated client intake scopers that pre-qualify Ltd Co turnover before bookings reach partners. Does your web guy guarantee that?"
                        />
                        <ObjectionFlipCard
                          objection="We get all clients by referral"
                          rebuttal="Referrals are best. But when high-fee referrals search your firm on mobile after hours and see an open comments box with no booking hold, up to 40% abandon. Is that worth plugging?"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* ── CHANNEL: WHATSAPP DIRECT ── */}
                {activeChannel === 'whatsapp' && (
                  <div className="p-5 rounded-xl bg-[#141417] border border-emerald-500/30 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                        <MessageSquare size={14} /> WhatsApp Outreach Sequence
                      </span>
                      {/* Sequence Step Toggle */}
                      <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/10 self-start sm:self-auto">
                        <button
                          type="button"
                          onClick={() => setActiveStep('day1')}
                          className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                            activeStep === 'day1' ? 'bg-emerald-500 text-black shadow-sm' : 'text-white/60 hover:text-white'
                          }`}
                        >
                          Day 1 (Context)
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveStep('day3')}
                          className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                            activeStep === 'day3' ? 'bg-emerald-500 text-black shadow-sm' : 'text-white/60 hover:text-white'
                          }`}
                        >
                          Day 3 (Clarity)
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveStep('day5')}
                          className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                            activeStep === 'day5' ? 'bg-emerald-500 text-black shadow-sm' : 'text-white/60 hover:text-white'
                          }`}
                        >
                          Day 5 (Decision)
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-black/40 rounded-xl border border-white/10 text-sm sm:text-base text-white/90 leading-relaxed font-mono">
                      {currentWhatsAppCopy}
                    </div>

                    <div className="flex items-center gap-3 flex-wrap">
                      {waUrl && (
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm inline-flex items-center gap-2 transition-colors cursor-pointer shadow-md"
                        >
                          <MessageSquare size={16} /> Open WhatsApp Web
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => handleCopy(currentWhatsAppCopy, 'wa')}
                        className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm inline-flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        {copiedKey === 'wa' ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                        Copy Message
                      </button>
                    </div>
                  </div>
                )}

                {/* ── CHANNEL: FOLLOW-UP EMAIL ── */}
                {activeChannel === 'email' && (
                  <div className="p-5 rounded-xl bg-[#141417] border border-blue-500/30 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                        <Mail size={14} /> Direct Email Sequence
                      </span>
                      {/* Sequence Step Toggle */}
                      <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/10 self-start sm:self-auto">
                        <button
                          type="button"
                          onClick={() => setActiveStep('day1')}
                          className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                            activeStep === 'day1' ? 'bg-blue-500 text-white shadow-sm' : 'text-white/60 hover:text-white'
                          }`}
                        >
                          Day 1 (Cold)
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveStep('day3')}
                          className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                            activeStep === 'day3' ? 'bg-blue-500 text-white shadow-sm' : 'text-white/60 hover:text-white'
                          }`}
                        >
                          Day 3 (Clarity)
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveStep('day5')}
                          className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                            activeStep === 'day5' ? 'bg-blue-500 text-white shadow-sm' : 'text-white/60 hover:text-white'
                          }`}
                        >
                          Day 5 (Decision)
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wide text-white/40 block mb-1">
                        Subject Line
                      </label>
                      <input
                        type="text"
                        readOnly
                        value={currentEmailSubject}
                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-xs font-mono text-white/90"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wide text-white/40 block mb-1">
                        Body Copy
                      </label>
                      <textarea
                        rows={7}
                        readOnly
                        value={currentEmailBody}
                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-xs font-mono text-white/90 leading-relaxed"
                      />
                    </div>

                    <div className="flex items-center gap-3 flex-wrap">
                      <button
                        type="button"
                        onClick={() => handleCopy(`${currentEmailSubject}\n\n${currentEmailBody}`, 'email')}
                        className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm inline-flex items-center gap-2 transition-colors cursor-pointer shadow-md"
                      >
                        {copiedKey === 'email' ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                        Copy Subject & Body
                      </button>
                      {currentLead.email ? (
                        <a
                          href={`mailto:${currentLead.email}?subject=${encodeURIComponent(currentEmailSubject)}&body=${encodeURIComponent(currentEmailBody)}`}
                          className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm inline-flex items-center gap-2 transition-colors cursor-pointer"
                        >
                          <Send size={16} /> Open in Mail App ({currentLead.email})
                        </a>
                      ) : (
                        <span className="text-[11px] text-white/40 self-center">No direct email on file — send via website form or LinkedIn</span>
                      )}
                    </div>
                  </div>
                )}

                {/* ── CHANNEL: SOCIAL DM (LINKEDIN & INSTAGRAM) ── */}
                {activeChannel === 'social' && (
                  <div className="p-5 rounded-xl bg-[#141417] border border-purple-500/30 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                        <Share2 size={14} /> Social Direct Message (LinkedIn & Instagram)
                      </span>
                      {/* Sequence Step Toggle */}
                      <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/10 self-start sm:self-auto">
                        <button
                          type="button"
                          onClick={() => setActiveStep('day1')}
                          className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                            activeStep === 'day1' ? 'bg-purple-500 text-white shadow-sm' : 'text-white/60 hover:text-white'
                          }`}
                        >
                          Day 1 (Hook DM)
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveStep('day3')}
                          className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                            activeStep === 'day3' ? 'bg-purple-500 text-white shadow-sm' : 'text-white/60 hover:text-white'
                          }`}
                        >
                          Day 3 (Clarity)
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveStep('day5')}
                          className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                            activeStep === 'day5' ? 'bg-purple-500 text-white shadow-sm' : 'text-white/60 hover:text-white'
                          }`}
                        >
                          Day 5 (Decision)
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-black/40 rounded-xl border border-white/10 text-sm sm:text-base text-white/90 leading-relaxed font-mono">
                      {currentSocialCopy}
                    </div>

                    <div className="flex items-center gap-3 flex-wrap">
                      <button
                        type="button"
                        onClick={() => handleCopy(currentSocialCopy, 'social')}
                        className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm inline-flex items-center gap-2 transition-colors cursor-pointer shadow-md"
                      >
                        {copiedKey === 'social' ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                        Copy DM Message
                      </button>
                      <a
                        href={linkedInSearchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-3 rounded-xl bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 border border-sky-500/30 font-medium text-sm inline-flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <ExternalLink size={15} /> Find on LinkedIn
                      </a>
                      <a
                        href={instagramSearchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-3 rounded-xl bg-pink-600/20 hover:bg-pink-600/30 text-pink-300 border border-pink-500/30 font-medium text-sm inline-flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <ExternalLink size={15} /> Find on Instagram
                      </a>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ════ PANE 3: OUTCOME DOCK & NOTES (col-span-3) ════ */}
          <div className="lg:col-span-3 border-l border-white/10 bg-[#0D0D12] p-4 sm:p-5 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-white/50 block mb-1">
                  1-Click Call Outcome
                </span>
                <p className="text-xs text-white/40">
                  Logs to database & advances to next lead
                </p>
              </div>

              {/* 4 Primary Outcome Action Cards */}
              <div className="grid grid-cols-1 gap-2.5">
                <button
                  type="button"
                  disabled={isLogging}
                  onClick={() => handleRecordOutcome('Proposal Sent', 'Booked Discovery Call')}
                  className="w-full p-3.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-500/60 transition-all text-left group cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                      <Sparkles size={16} /> ✦ Booked Discovery Call
                    </span>
                    <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      1
                    </kbd>
                  </div>
                  <p className="text-[11px] text-white/50 mt-1">
                    Moved to Proposal / Scoping Stage
                  </p>
                </button>

                <button
                  type="button"
                  disabled={isLogging}
                  onClick={() => handleRecordOutcome('Contacted', 'Gatekeeper Blocked')}
                  className="w-full p-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-all text-left group cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-amber-400 flex items-center gap-2">
                      <ShieldAlert size={15} /> Gatekeeper Blocked
                    </span>
                    <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      2
                    </kbd>
                  </div>
                  <p className="text-[11px] text-white/50 mt-1">
                    Partner unavailable / Call again later
                  </p>
                </button>

                <button
                  type="button"
                  disabled={isLogging}
                  onClick={() => handleRecordOutcome('Contacted', 'No Answer / Voicemail')}
                  className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-left group cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white/80 flex items-center gap-2">
                      <PhoneCall size={15} className="text-white/40" /> No Answer / Voicemail
                    </span>
                    <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/10 text-white/60">
                      3
                    </kbd>
                  </div>
                  <p className="text-[11px] text-white/50 mt-1">
                    Rang out / Left benevolent voicemail
                  </p>
                </button>

                <button
                  type="button"
                  disabled={isLogging}
                  onClick={() => handleRecordOutcome('Lost', 'Not Interested / Lost')}
                  className="w-full p-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 transition-all text-left group cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-red-400 flex items-center gap-2">
                      <XCircle size={15} /> Not Interested / Lost
                    </span>
                    <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-red-500/20 text-red-300 border border-red-500/30">
                      4
                    </kbd>
                  </div>
                  <p className="text-[11px] text-white/50 mt-1">
                    Close file / Exclude from outreach
                  </p>
                </button>
              </div>

              {/* Quick Call Note Input */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-white/50 block">
                  Quick Call Note
                </label>
                <input
                  type="text"
                  value={quickNote}
                  onChange={(e) => setQuickNote(e.target.value)}
                  placeholder="e.g. Partner in audit till 3pm..."
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#DCAE53]"
                />

                {/* Preset Note Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['Call 2pm', 'In audit', 'Send email first', 'Decision maker absent'].map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => setQuickNote(chip)}
                      className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/5 transition-colors cursor-pointer"
                    >
                      +{chip}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Keyboard Hint Bar */}
            <div className="border-t border-white/10 pt-3 text-[11px] text-white/40 space-y-1">
              <div className="flex items-center justify-between">
                <span>Dial shortcut:</span>
                <kbd className="font-mono bg-white/10 px-1 py-0.5 rounded text-[10px] text-white/70">Space</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span>Cycle leads:</span>
                <span className="font-mono text-white/70">J (Next) / K (Prev)</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
