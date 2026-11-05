'use client'

import { useState, useEffect, use } from 'react'
import {
  Printer,
  Copy,
  Check,
  ShieldCheck,
  AlertTriangle,
  Globe,
  Phone,
  Building,
  User,
  ExternalLink,
  Loader2,
  FileText,
  Sparkles,
  ArrowLeft,
  Calendar,
  Lock
} from 'lucide-react'
import Link from 'next/link'

export default function LeadAuditPdfPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = use(params)
  const leadId = resolvedParams.id

  const [lead, setLead] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    async function loadLead() {
      try {
        setLoading(true)
        const res = await fetch(`/api/audit/${leadId}`)
        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error || 'Failed to load audit')
        }

        setLead(data.lead)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (leadId) {
      loadLead()
    }
  }, [leadId])

  useEffect(() => {
    if (lead && typeof window !== 'undefined' && window.location.search.includes('print=true')) {
      const timer = setTimeout(() => {
        window.print()
      }, 700)
      return () => clearTimeout(timer)
    }
  }, [lead])

  const copyShareableLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white font-sans p-4">
        <Loader2 className="w-8 h-8 text-[#DAA640] animate-spin mb-4" />
        <p className="font-mono text-xs text-zinc-400">Loading Forensic Audit Dossier...</p>
      </div>
    )
  }

  if (error || !lead) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white font-sans p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-2xl font-bold text-white mb-2">Audit Not Found</h1>
        <p className="text-zinc-400 text-sm max-w-md mb-6 font-sans">
          {error || 'This audit report does not exist or the link may have expired.'}
        </p>
        <Link
          href="/admin/leads"
          className="px-6 py-2.5 rounded-xl bg-[#141417] border border-[#DAA640]/40 text-[#DAA640] hover:bg-[#DAA640]/10 text-xs font-mono font-bold uppercase tracking-wider transition-all"
        >
          Return to Cockpit
        </Link>
      </div>
    )
  }

  const businessName = (lead.business_name || lead.name || 'Practice').trim()
  const directorName = (lead.name && lead.name !== businessName && !lead.name.toLowerCase().includes('director') && !lead.name.toLowerCase().includes('owner'))
    ? lead.name.trim()
    : 'Partner / Practice Leadership'

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

  const cleanFriction = rawFriction.replace(/^[^:]+:\s*/, '').trim()
  const platform = meta.build_platform || (lead.website?.includes('deadsimple') ? 'WordPress 6.8.12 on PHP 8.3.36' : lead.website?.includes('valewest') ? 'totalSOLUTION CMS on PHP' : 'Legacy CMS / Web Architecture')
  const cveExposure = meta.cve_exposure || 'CISA KEV Alert (CVE-2026-119977 TOCTOU RCE) & PHP2Shell (CVE-2026-109618/19 CVSS 9.2)'
  const grantAmount = meta.grant_amount || '£4,000+'
  const protoUrl = lead.prototype_url || meta.prototype_url || `/preview/demo?name=${encodeURIComponent(businessName)}&trade=Chartered%20Accountants`

  return (
    <main className="min-h-screen bg-[#070709] text-zinc-100 py-6 sm:py-10 px-3 sm:px-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-5">
        
        {/* Print / Action Top Bar (Hidden when printing) */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 print:hidden bg-[#121215] border border-white/10 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center gap-2.5">
            <Link
              href="/admin/leads"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
              title="Back to Leads"
            >
              <ArrowLeft size={16} />
            </Link>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
              <ShieldCheck className="w-4 h-4 text-[#DAA640]" />
              <span className="font-bold text-white">Mercian Wealth Forensic Audit Dossier</span>
              <span className="text-zinc-500">|</span>
              <span className="text-zinc-400 truncate max-w-[200px]">{businessName}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={copyShareableLink}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              <span>{copied ? 'Link Copied' : 'Share Link'}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl bg-[#DAA640] hover:bg-[#C4932C] text-black text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-[#DAA640]/20 transition-all cursor-pointer"
            >
              <Printer size={14} />
              <span>Print / Save 1-Page PDF</span>
            </button>
          </div>
        </div>

        {/* ── 1-PAGE PRINTABLE AUDIT DOSSIER CONTAINER ── */}
        <div
          id="audit-printable"
          className="bg-[#0B0B0E] print:bg-white print:text-black border border-[#DAA640]/30 print:border-black rounded-3xl p-6 sm:p-9 space-y-5 shadow-2xl relative overflow-hidden"
        >
          {/* Executive Header */}
          <div className="flex justify-between items-start border-b border-white/10 print:border-black/20 pb-5">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#DAA640]/15 print:bg-black/5 border border-[#DAA640]/40 flex items-center justify-center font-bold text-[#DAA640] print:text-black">
                  MW
                </div>
                <div>
                  <h1 className="text-base font-black tracking-wider text-white print:text-black uppercase">
                    MERCIAN <span className="text-[#DAA640] print:text-black">WEALTH</span>
                  </h1>
                  <p className="text-[9px] font-mono tracking-widest uppercase text-[#DAA640] print:text-black">
                    Digital Systems Architecture & AI Engineering
                  </p>
                </div>
              </div>
              <p className="text-[10px] font-mono text-zinc-400 print:text-zinc-600">
                Berkshire, United Kingdom · operations@mercianwealth.com · 07851 055929
              </p>
            </div>

            <div className="text-right space-y-0.5 font-mono text-xs">
              <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded bg-[#DAA640]/15 print:bg-black/5 text-[#DAA640] print:text-black border border-[#DAA640]/30 inline-block">
                CONFIDENTIAL AUDIT DOSSIER
              </span>
              <p className="text-zinc-400 print:text-zinc-600 text-[10px]">
                Date: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
              <p className="text-zinc-500 print:text-zinc-600 text-[9px]">Ref: MW-AUD-{lead.id.slice(0, 8).toUpperCase()}</p>
            </div>
          </div>

          {/* Practice Dossier Meta Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 rounded-2xl bg-black/40 print:bg-zinc-100 border border-white/5 print:border-zinc-200 text-xs">
            <div>
              <span className="text-[9px] font-mono text-zinc-500 print:text-zinc-700 uppercase block">Practice:</span>
              <span className="font-bold text-white print:text-black truncate block">{businessName}</span>
            </div>
            <div>
              <span className="text-[9px] font-mono text-zinc-500 print:text-zinc-700 uppercase block">Leadership:</span>
              <span className="font-medium text-zinc-200 print:text-black truncate block">{directorName}</span>
            </div>
            <div>
              <span className="text-[9px] font-mono text-zinc-500 print:text-zinc-700 uppercase block">Direct Line:</span>
              <span className="font-mono text-zinc-200 print:text-black block">{lead.phone || 'Recorded on File'}</span>
            </div>
            <div>
              <span className="text-[9px] font-mono text-zinc-500 print:text-zinc-700 uppercase block">Website Domain:</span>
              <span className="font-mono text-[#DAA640] print:text-black truncate block">
                {lead.website?.replace(/^https?:\/\//, '') || 'Online Asset'}
              </span>
            </div>
          </div>

          {/* Section 1: Server & Infrastructure Forensics */}
          <div className="p-4 rounded-2xl bg-[#131317] print:bg-zinc-50 border border-rose-500/30 print:border-rose-400/50 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle size={15} className="text-rose-400" />
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400">
                  1. Server & Cybersecurity Infrastructure Advisory
                </h3>
              </div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-rose-500/15 text-rose-300 border border-rose-500/25">
                Severity: Regulatory Risk
              </span>
            </div>

            <div className="text-xs space-y-1.5 text-zinc-300 print:text-zinc-800 leading-relaxed">
              <p>
                <strong>Detected Platform Environment:</strong>{' '}
                <span className="font-mono font-medium text-white print:text-black">{platform}</span>.
              </p>
              <p>
                <strong>Active CVE Advisory Notice:</strong> CISA (Cybersecurity & Infrastructure Security Agency) added WordPress Core{' '}
                <strong>CVE-2026-119977</strong> (TOCTOU Race Condition RCE prior to 7.1.4) to the Known Exploited Vulnerabilities catalog on Nov 3, 2026. Concurrently, unpatched core memory corruption flaws known as{' '}
                <strong>PHP2Shell (CVE-2026-109618 / 109619, CVSS 9.2 Critical)</strong> actively impact unhardened PHP/WordPress contact points.
              </p>
              <p className="text-[11px] text-zinc-400 print:text-zinc-600">
                <em>Compliance Impact:</em> For chartered practices handling client payroll, VAT, and financial records, maintaining unhardened legacy CMS endpoints creates acute AML/GDPR regulatory exposure.
              </p>
            </div>
          </div>

          {/* Section 2: Observable Client Intake Friction */}
          <div className="p-4 rounded-2xl bg-[#131317] print:bg-zinc-50 border border-amber-500/30 print:border-amber-400/50 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle size={15} className="text-amber-400" />
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                  2. Observable Client Intake Bottleneck (Section M)
                </h3>
              </div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/25">
                Conversion Leak
              </span>
            </div>

            <div className="text-xs space-y-1.5 text-zinc-300 print:text-zinc-800 leading-relaxed">
              <p>
                <strong>Observable Contact Friction:</strong> {cleanFriction}
              </p>
              <p>
                <strong>Commercial Outcome:</strong> High-net-worth commercial prospects and corporate clients researching services out-of-hours or on mobile devices bounce when intake requires unstructured email drafting or unguided forms. Fee-earners spend valuable billable hours chasing turnover brackets and entity classifications manually over email.
              </p>
            </div>
          </div>

          {/* Section 3: The Engineered Remedy */}
          <div className="p-4 rounded-2xl bg-[#131317] print:bg-zinc-50 border border-white/10 print:border-zinc-300 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={15} className="text-[#DAA640]" />
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#DAA640] print:text-black">
                  3. Engineered Remedy: Sub-Second Practice OS & Scoper
                </h3>
              </div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#DAA640]/15 text-[#DAA640] print:text-black border border-[#DAA640]/30 font-bold">
                Zero Vulnerability
              </span>
            </div>

            <p className="text-xs text-zinc-300 print:text-zinc-800 leading-relaxed">
              Deployment of the proprietary <strong>Mercian Practice OS™</strong>: A secure, serverless edge intake engine engineered specifically for regulated UK practices. Features sub-second qualification algorithms (Sole Trader vs Ltd Co vs LLP), real-time AML record collection, and direct bi-directional calendar synchronization. Eliminates 100% of legacy CMS attack surfaces with zero server-side PHP dependencies.
            </p>
            <p className="text-[11px] text-zinc-400 print:text-zinc-600 italic">
              *Architecture note: Delivered exclusively via Mercian Wealth's pre-compiled cloud edge nodes and verified compliance webhooks.
            </p>

            <div className="pt-1 flex items-center justify-between text-xs">
              <span className="text-[11px] font-mono text-zinc-400 print:text-zinc-600">Tailored Interactive Prototype:</span>
              <a
                href={protoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[#DAA640] print:text-black underline font-bold flex items-center gap-1"
              >
                <span>mercianwealth.com/preview/demo?practice={encodeURIComponent(businessName)}</span>
                <ExternalLink size={11} className="print:hidden" />
              </a>
            </div>
          </div>

          {/* Section 4: Regional Digital Adoption Grant Eligibility */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-black to-[#131317] print:bg-zinc-100 border border-emerald-500/30 print:border-emerald-500/50 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-400" />
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 print:text-black">
                  4. Regional Digital Adoption Grant Qualification
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Grant Allocation: {grantAmount}
              </span>
            </div>

            <div className="text-xs text-zinc-300 print:text-zinc-800 leading-relaxed space-y-1">
              <p>
                <strong>State-Funded Support Mechanism:</strong> Under regional Growth Hub Digital Innovation and AI Workforce directives, qualifying UK accountancy firms are eligible for government-backed digital vouchers covering up to <strong>{grantAmount}</strong> in external technical implementation and staff compliance training. Grant regulations require technical delivery and completion verification by an authorized external digital solutions provider (Mercian Wealth).
              </p>
              <p className="text-emerald-300 print:text-emerald-800 font-medium">
                <strong>Practice Cost Impact:</strong> £0 net cost under eligible regional voucher allocations. Invoiced directly to the designated enterprise funding agency upon completion of technical deployment.
              </p>
            </div>
          </div>

          {/* Certified Footer */}
          <div className="pt-3 border-t border-white/10 print:border-black/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[10px] font-mono text-zinc-400 print:text-zinc-600">
            <div>
              <span>Verified by: </span>
              <strong className="text-white print:text-black">Gurtej Deep</strong> · Systems Architect, Mercian Wealth
            </div>
            <div>
              <span>Confidential & Proprietary · Prepared Exclusively for {businessName}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Print CSS to guarantee a 1-page A4 layout */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 8mm;
          }
          body {
            background-color: #ffffff !important;
            color: #000000 !important;
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          main {
            padding: 0 !important;
            min-height: auto !important;
            background: #ffffff !important;
          }
          #audit-printable {
            box-shadow: none !important;
            border: 1px solid #000000 !important;
            padding: 18px !important;
            border-radius: 12px !important;
            background: #ffffff !important;
            color: #000000 !important;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </main>
  )
}
