'use client'

import React, { useState } from 'react'
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
  FileText,
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
  const [scriptMode, setScriptMode] = useState<'intake' | 'security_grant'>('intake')
  const supabase = createClient()

  if (!isOpen || !lead) return null

  const phoneInfo = classifyPhoneNumber(lead.phone)
  const businessName = (lead.business_name || lead.name || 'Practice').trim()
  const directorName = (lead.name && lead.name !== businessName && !lead.name.toLowerCase().includes('director') && !lead.name.toLowerCase().includes('owner'))
    ? lead.name.trim()
    : 'Partner'

  // Extract Section M verified friction synchronously (no hook after early return)
  const meta = (lead.scraped_metadata || {}) as Record<string, any>
  let rawFriction = "Contact phone number isn't tap-to-call on mobile, and the contact page has no business triage form."
  if (lead.friction_found) {
    rawFriction = lead.friction_found
  } else if (meta.friction_title) {
    rawFriction = meta.friction_title
  } else if (meta.observable_problem) {
    rawFriction = meta.observable_problem
  } else if (lead.notes && lead.notes.includes('VERIFIED FLAW:')) {
    const match = lead.notes.match(/VERIFIED FLAW:\s*([^\n]+)/i)
    if (match) rawFriction = match[1].trim()
  }

  const telLink = buildTelUrl(lead.phone)
  const waUrl = buildWhatsAppOpenerUrl(lead.phone, `Hi ${directorName}, Gurtej here from Mercian Wealth regarding the ${businessName} website.`)

  // Sales Prof Scripts (3-Phase Cold Call Architecture)
  const cleanFriction = rawFriction.replace(/^[^:]+:\s*/, '').trim()
  const step1Permission = `“Hey ${directorName}, I was on the ${businessName} site earlier and noticed ${cleanFriction}. That’s exactly why I’m calling. Would it be totally crazy for a two minute chat to see if that’s even relevant on your end?”`
  const step2Diagnostic = `“Appreciate that. Basically, when new Ltd Co or sole trader enquiries land on your website out of hours, without structured triage they submit vague emails with missing turnover and records. Do your fee-earners spend a lot of time chasing prospects for missing details, or is intake pretty smooth on your side?”`
  const step3BridgeTo15Min = `“Makes total sense. Look, I promised to keep this to two minutes and I respect your time. What I've done on my end is put together a 60-second interactive scoper specifically for ${businessName} that pre-qualifies turnover and books directly into your calendar. Would it be a terrible idea to hop on a 15-minute screen share next Tuesday or Wednesday morning at 10:30am so I can show you how it works? If it’s not for you, no hard feelings at all.”`
  
  const voicemailScript = `“Hi ${directorName}, it's Gurtej calling regarding the ${businessName} website. I noticed an issue on your contact page where ${cleanFriction}. I'm sending a quick 10-second screenshot to your email so you can see it directly. My number is 07851 055929. Speak soon.”`
  
  const followUpEmailSubject = `Quick observation on ${businessName.toLowerCase().replace(/[^a-z0-9]/g, '')}.co.uk contact flow`
  const followUpEmailBody = `Hi ${directorName},\n\nI called your office a moment ago.\n\nI was reviewing your website on mobile earlier and noticed ${cleanFriction}.\n\nFor an established practice handling corporate and commercial accounts, that creates unnecessary drop-off when prospective clients browse after hours or on mobile.\n\nI've put together a quick 60-second interactive practice scoper showing how other UK firms qualify sole trader vs Ltd Co turnover upfront before booking directly into the partner calendar.\n\nWould it make sense to connect for 10–15 minutes next Tuesday or Wednesday at 10:30am to take a look? If not relevant on your end, no problem at all—just let me know and I'll close your file.\n\nBest regards,\nGurtej Deep\nMercian Wealth | 07851 055929 | mercianwealth.com`

  const whatsAppMessage = `Hi ${directorName}, Gurtej here from Mercian Wealth. Left a brief voicemail at your office earlier regarding the ${businessName} site—noticed ${cleanFriction}. Just emailed you a quick observation on it. Let me know if you'd like to see the 60-second prototype scoper.`

    // Security & State-Funded Grant Scripts (CISA CVE-2026-119977 / PHP2Shell + £4,000 Grant)
  const platformName = meta.build_platform || 'WordPress / PHP'
  const step1SecurityPermission = `“Hey ${directorName}, I was reviewing the ${businessName} website earlier and noticed it's running on ${platformName}. CISA just added an active remote code vulnerability (CVE-2026-119977 / PHP2Shell) to their Known Exploited catalog, but more importantly, there's an approved state-funded grant covering £4,000+ for staff AI and cyber compliance that pays 100% of the cost. Would it be totally crazy for a two minute chat to see if that's even relevant on your end?”`
  const step2SecurityDiagnostic = `“Appreciate that. Basically, for chartered practices holding confidential payroll, VAT, and client records, running unhardened PHP/WordPress contact forms is creating AML and GDPR exposure. But under the new workforce directive, qualifying UK practices can claim £4,000+ to upgrade intake systems and train staff with zero out-of-pocket cost. Are you already claiming your practice's regional allocation for this, or has no one walked you through the grant yet?”`
  const step3SecurityBridgeTo15Min = `“Makes total sense. Look, I promised to keep this to two minutes and I respect your time. I've prepared a 1-page compliance audit and grant eligibility summary specifically for ${businessName} showing how the £4,000 voucher gets claimed. Would it be a terrible idea to hop on a 15-minute screen share next Tuesday or Wednesday morning at 10:30am so I can run through the paperwork and show you how it works? If it’s not for you, no hard feelings at all.”`

  const voicemailSecurityScript = `“Hi ${directorName}, it's Gurtej calling regarding ${businessName}. I'm calling about the new CISA security advisory affecting your website platform, and the £4,000 state-funded AI and cyber compliance grant available for your practice. I'm emailing you the 1-page diagnostic and grant details directly. My number is 07851 055929. Speak soon.”`

  const followUpSecurityEmailSubject = `Notice: CISA security advisory & £4,000 state cyber grant qualification for ${businessName}`
  const followUpSecurityEmailBody = `Hi ${directorName},\n\nI called your office a moment ago regarding ${businessName}.\n\nTwo urgent items came up during a technical review of your practice's digital presence:\n\n1. Platform Security Advisory: CISA (Cybersecurity & Infrastructure Security Agency) recently added WordPress Core CVE-2026-119977 (TOCTOU RCE) and the PHP2Shell memory corruption flaws (CVE-2026-109618 / 109619, rated 9.2/10) to the Known Exploited Vulnerabilities catalog. For chartered accountancy practices handling confidential payroll, VAT, and client records, unhardened legacy CMS and PHP contact forms create active regulatory exposure.\n\n2. £4,000+ State-Funded Grant Allocation: Under the new workforce AI & Cybersecurity compliance directives, qualifying UK practices are eligible for a state-funded grant voucher covering £4,000+ in staff training and modern intake infrastructure. This is invoiced directly to the funding agency with £0 out-of-pocket cost to your firm.\n\nWe help practices migrate off legacy CMS setups to high-security, sub-second React/Next.js portals with automated client scoping, while facilitating the £4,000 grant application.\n\nWould it make sense to connect for 10–15 minutes next Tuesday or Wednesday at 10:30am to review your practice's grant qualification and security score? If not relevant on your end, no problem at all—just let me know and I'll close your file.\n\nBest regards,\nGurtej Deep\nMercian Wealth | 07851 055929 | mercianwealth.com`

  const whatsAppSecurityMessage = `Hi ${directorName}, Gurtej from Mercian Wealth. Left a brief voicemail at your office regarding the CISA security advisory for your website and the £4,000 state-funded AI & cyber compliance voucher available for ${businessName}. Just emailed you the 1-page summary. Let me know if you'd like to review the grant qualification next week.`

  const isSecurityMode = scriptMode === 'security_grant'
  const activeStep1 = isSecurityMode ? step1SecurityPermission : step1Permission
  const activeStep2 = isSecurityMode ? step2SecurityDiagnostic : step2Diagnostic
  const activeStep3 = isSecurityMode ? step3SecurityBridgeTo15Min : step3BridgeTo15Min
  const activeVmScript = isSecurityMode ? voicemailSecurityScript : voicemailScript
  const activeEmailSubject = isSecurityMode ? followUpSecurityEmailSubject : followUpEmailSubject
  const activeEmailBody = isSecurityMode ? followUpSecurityEmailBody : followUpEmailBody
  const activeWaMessage = isSecurityMode ? whatsAppSecurityMessage : whatsAppMessage

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

          <div className="flex items-center gap-1.5">
            <a
              href={`/audit/${lead.id}/pdf?print=true`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-[#DAA640]/15 hover:bg-[#DAA640]/25 border border-[#DAA640]/40 text-[#DAA640] hover:text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Generate and Download 1-Page PDF Audit"
            >
              <FileText size={14} />
              <span className="hidden sm:inline">1-Page PDF</span>
            </a>
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

          {/* Dual-Angle Script Switcher */}
          <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-[#141417] border border-white/10">
            <button
              type="button"
              onClick={() => setScriptMode('intake')}
              className={`py-2.5 px-3 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                !isSecurityMode
                  ? 'bg-[#DAA640] text-black shadow-lg shadow-[#DAA640]/20'
                  : 'text-zinc-400 hover:text-white bg-transparent'
              }`}
            >
              <Sparkles size={13} />
              <span>Intake Qualification Hook</span>
            </button>
            <button
              type="button"
              onClick={() => setScriptMode('security_grant')}
              className={`py-2.5 px-3 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                isSecurityMode
                  ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-lg shadow-rose-500/20'
                  : 'text-zinc-400 hover:text-white bg-transparent'
              }`}
            >
              <ShieldAlert size={13} />
              <span>🛡️ CISA / PHP & £4k Grant Hook</span>
            </button>
          </div>

          {isSecurityMode ? (
            <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-rose-500/15 via-amber-500/10 to-[#141417] border border-rose-500/30 space-y-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <ShieldAlert size={16} className="text-rose-400" />
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-400">
                    CISA KEV ALERT (CVE-2026-119977) & PHP2SHELL + £4,000 STATE GRANT
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  £0 Client Cost (£4k Voucher)
                </span>
              </div>
              <div className="text-xs text-zinc-300 leading-relaxed space-y-1">
                <p>
                  <strong className="text-rose-300">Vulnerabilities:</strong> CISA added WordPress Core CVE-2026-119977 (TOCTOU RCE) on Nov 3, 2026, alongside PHP2Shell (CVE-2026-109618 / 109619, CVSS 9.2). Critical RCE flaws actively targeted across legacy PHP/WordPress sites.
                </p>
                <p>
                  <strong className="text-emerald-300">Commercial Upsell:</strong> Government agencies cover £4,000+ for staff AI & cybersecurity adoption. The practice pays £0; we invoice the state agency directly while migrating them to modern Next.js (£595 setup + £29/mo).
                </p>
              </div>
            </div>
          ) : (
            /* Section M: The 1 Verified Human Friction */
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
          )}

          {/* The Sales Prof Day 1 Script Card */}
          <div className="p-4 rounded-2xl bg-[#141417] border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#DAA640] uppercase tracking-wider">
                DAY 1 CALL SCRIPT (WORD FOR WORD)
              </span>
              <button
                onClick={() => handleCopy('script', `${activeStep1}\n\n[When they say go ahead]:\n${activeStep2}\n\n[Bridge to 15-min demo]:\n${activeStep3}`)}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-zinc-300 font-mono flex items-center gap-1 transition-colors cursor-pointer"
              >
                {copiedKey === 'script' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                <span>{copiedKey === 'script' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Step 1: Permission */}
            <div className="p-3 rounded-xl bg-black/60 border border-white/5 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                Step 1: Permission (15 Seconds)
              </span>
              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans italic">
                {activeStep1}
              </p>
            </div>

            {/* Step 2: The 2-Minute Diagnostic */}
            <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-bold block">
                Step 2: When They Say "Go ahead / What is it?" (Use Your 2 Mins)
              </span>
              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans italic">
                {activeStep2}
              </p>
            </div>

            {/* Step 3: Respect The Limit & Bridge to 15 Mins */}
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                Step 3: After They Answer (Respect The 2-Min Limit & Bridge)
              </span>
              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans italic">
                {activeStep3}
              </p>
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
                  onClick={() => handleCopy('vm', activeVmScript)}
                  className="hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey === 'vm' ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                  <span>{copiedKey === 'vm' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 text-xs text-zinc-300 italic">
                {activeVmScript}
              </div>
            </div>

            {/* Written Email Preview */}
            <div className="p-3 rounded-xl bg-black/50 border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-sky-400 font-bold uppercase tracking-wider">
                  WRITTEN FOLLOW-UP EMAIL (SUBJECT + BODY)
                </span>
                <button
                  onClick={() => handleCopy('email_full', `Subject: ${activeEmailSubject}\n\n${activeEmailBody}`)}
                  className="hover:text-white flex items-center gap-1 text-xs text-sky-300 cursor-pointer font-mono"
                >
                  {copiedKey === 'email_full' ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                  <span>{copiedKey === 'email_full' ? 'Copied Full Email' : 'Copy Full Email'}</span>
                </button>
              </div>
              <div className="text-[11px] font-mono text-zinc-400 border-b border-white/5 pb-1">
                <strong>Subject:</strong> {activeEmailSubject}
              </div>
              <div className="text-xs text-zinc-300 whitespace-pre-wrap leading-relaxed font-sans max-h-32 overflow-y-auto">
                {activeEmailBody}
              </div>
            </div>

            {/* Email & WhatsApp Quick Copy */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => handleCopy('email_body', activeEmailBody)}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-white flex items-center justify-between transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-sky-400" />
                  <span>Copy Email Body Only</span>
                </div>
                {copiedKey === 'email_body' ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              </button>

              {lead.phone && (
                <button
                  onClick={() => handleCopy('wa', activeWaMessage)}
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

          <a
            href={`/audit/${lead.id}/pdf?print=true`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2.5 min-h-[44px] rounded-xl bg-[#DAA640]/15 hover:bg-[#DAA640]/25 border border-[#DAA640]/40 text-[#DAA640] hover:text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            title="Download Branded 1-Page Forensic PDF Audit"
          >
            <FileText size={14} />
            <span>Download 1-Page PDF</span>
          </a>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => {
                handleCopy('combo', `${activeEmailBody}\n\n---\nWhatsApp:\n${activeWaMessage}`)
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
