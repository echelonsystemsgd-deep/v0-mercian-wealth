'use client'

import { useState, useEffect, use } from 'react'
import { motion } from 'framer-motion'
import { BrandLogo } from '@/components/brand-logo'
import { formatCurrency, MERCIAN_BANK_DETAILS } from '@/lib/quotes'
import {
  CheckCircle2,
  ShieldCheck,
  Clock,
  ArrowRight,
  Printer,
  Copy,
  Check,
  AlertCircle,
  FileText,
  CreditCard,
  Building2,
  Loader2,
} from 'lucide-react'
import { toast } from 'sonner'

export default function ClientQuotePortal({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = use(params)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quote, setQuote] = useState<any>(null)
  const [bankDetails, setBankDetails] = useState<any>(MERCIAN_BANK_DETAILS)
  const [accepting, setAccepting] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const [copiedBankField, setCopiedBankField] = useState<string | null>(null)

  useEffect(() => {
    async function loadQuote() {
      try {
        setLoading(true)
        const res = await fetch(`/api/quote/${token}`)
        if (!res.ok) {
          throw new Error('Quote proposal not found or link has expired.')
        }
        const data = await res.json()
        setQuote(data.quote)
        if (data.bankDetails) setBankDetails(data.bankDetails)
        if (data.quote.status === 'accepted' || data.quote.status === 'invoiced') {
          setAccepted(true)
        }
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    if (token) {
      loadQuote()
    }
  }, [token])

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopiedBankField(label)
    toast.success(`Copied ${label} to clipboard`)
    setTimeout(() => setCopiedBankField(null), 2000)
  }

  const handleAcceptQuote = async () => {
    try {
      setAccepting(true)
      const res = await fetch(`/api/quote/${token}/accept`, {
        method: 'POST',
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to accept proposal')
      setAccepted(true)
      toast.success('Proposal accepted! Deposit invoice initialized.')
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setAccepting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090B] flex flex-col items-center justify-center text-white font-sans p-4">
        <Loader2 className="w-8 h-8 text-[#DCAE53] animate-spin mb-4" />
        <p className="font-mono text-sm text-slate-400">Loading Mercian Wealth Proposal...</p>
      </div>
    )
  }

  if (error || !quote) {
    return (
      <div className="min-h-screen bg-[#09090B] flex flex-col items-center justify-center text-white font-sans p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-serif font-bold text-white mb-2">Proposal Unavailable</h1>
        <p className="text-sm text-slate-400 max-w-md mb-6">{error || 'This proposal could not be retrieved. Please contact Mercian Wealth.'}</p>
        <a
          href="/"
          className="px-5 py-2.5 rounded-xl bg-[#18181F] border border-[#DCAE53]/30 text-[#DCAE53] text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#DCAE53]/10 transition-colors"
        >
          Return to Homepage
        </a>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#09090B] text-slate-100 font-sans py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#DCAE53]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        {/* Top Letterhead Bar */}
        <header className="p-6 sm:p-8 rounded-3xl bg-[#111115] border border-white/8 shadow-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#09090B] border border-[#DCAE53]/40 flex items-center justify-center p-2 shadow-inner">
              <svg className="w-7 h-7 text-[#DCAE53]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 4h16l-8 7.5L4 4zm0 16h16l-8-7.5L4 20z" opacity="0.9" />
                <circle cx="12" cy="11.5" r="1.5" fill="#DCAE53" />
              </svg>
            </div>
            <div>
              <div className="font-sans font-black text-lg tracking-wider text-white uppercase flex items-center gap-1.5">
                <span>MERCIAN</span>
                <span className="text-[#DCAE53]">WEALTH</span>
              </div>
              <p className="text-[11px] font-mono text-[#DCAE53] tracking-widest uppercase">
                {MERCIAN_BANK_DETAILS.tagline}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="px-3 py-1.5 rounded-xl bg-[#18181F] border border-white/10 font-mono text-xs text-slate-300">
              Ref: <span className="text-white font-bold">{quote.quote_number}</span>
            </div>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#18181F] border border-white/10 text-slate-300 hover:text-white text-xs font-mono font-medium transition-colors"
            >
              <Printer size={13} />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </header>

        {/* Client & Project Overview Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#111115] border border-white/8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
            <div>
              <span className="text-[10px] font-mono text-[#DCAE53] uppercase tracking-widest font-bold block mb-1">
                SYSTEM ARCHITECTURE PROPOSAL
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                {quote.client_business || quote.client_name}
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Prepared for <strong className="text-white">{quote.client_name}</strong>
                {quote.client_email && ` · ${quote.client_email}`}
              </p>
            </div>

            <div>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${
                accepted
                  ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                  : 'bg-[#DCAE53]/10 border border-[#DCAE53]/30 text-[#DCAE53]'
              }`}>
                {accepted ? <CheckCircle2 size={13} /> : <Clock size={13} />}
                {accepted ? 'Proposal Accepted' : 'Active Proposal'}
              </span>
            </div>
          </div>

          {/* Scope Notes / Executive Summary */}
          {quote.scope_notes && (
            <div className="p-4 rounded-2xl bg-[#18181F] border border-white/5 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                Deliverable Objectives &amp; Scope Overview
              </span>
              <p className="text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-line">
                {quote.scope_notes}
              </p>
            </div>
          )}

          {/* System Deliverables Table */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold text-[#DCAE53] uppercase tracking-widest">
              Included Systems &amp; Technical Scope
            </h3>

            <div className="rounded-2xl border border-white/8 overflow-hidden bg-[#0D0D11]">
              <div className="grid grid-cols-12 px-4 py-3 bg-[#18181F] border-b border-white/5 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                <div className="col-span-8 sm:col-span-9">Deliverable / Capability</div>
                <div className="col-span-4 sm:col-span-3 text-right">Investment</div>
              </div>

              <div className="divide-y divide-white/5">
                {quote.items && quote.items.map((item: any, idx: number) => (
                  <div key={idx} className="grid grid-cols-12 px-4 py-4 items-center text-sm font-sans">
                    <div className="col-span-8 sm:col-span-9 space-y-1 pr-4">
                      <div className="font-bold text-white flex items-center gap-2">
                        <span>{item.name}</span>
                        {item.item_type === 'bespoke' && (
                          <span className="text-[9px] font-mono uppercase bg-[#DCAE53]/10 text-[#DCAE53] border border-[#DCAE53]/25 px-1.5 py-0.5 rounded">
                            Bespoke
                          </span>
                        )}
                        {item.billing_interval === 'monthly' && (
                          <span className="text-[9px] font-mono uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 px-1.5 py-0.5 rounded">
                            Monthly
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <div className="col-span-4 sm:col-span-3 text-right font-mono font-bold text-white text-base">
                      {formatCurrency(item.unit_price)}
                      {item.billing_interval === 'monthly' && <span className="text-xs text-slate-400 font-normal">/mo</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Revenue Share Projection Block (if applicable) */}
          {quote.rev_share_percentage > 0 && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-[#18181F] to-transparent border border-emerald-500/25 space-y-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Performance Revenue Share Partnership ({quote.rev_share_percentage}%)
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  Est. {formatCurrency(quote.estimated_rev_share_monthly)}/mo
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Our fee is tied directly to the digital revenue processed through your storefront and booking engines (projected at {formatCurrency(quote.projected_client_sales)}/mo baseline). No hidden costs — we win when your systems capture revenue.
              </p>
            </div>
          )}

          {/* Totals & Milestones Grid */}
          <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-white/5">
            <div className="p-4 rounded-2xl bg-[#18181F] border border-white/5 space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                Milestone &amp; Deposit Schedule
              </span>
              <div className="space-y-1.5 text-xs text-slate-300 font-sans">
                <div className="flex justify-between font-bold text-white">
                  <span>Sprint 1 Initiation Deposit Due:</span>
                  <span className="text-[#DCAE53] font-mono text-sm font-extrabold">{formatCurrency(quote.deposit_required)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Balance Due on Final Launch:</span>
                  <span className="font-mono">{formatCurrency(quote.one_time_subtotal - quote.deposit_required)}</span>
                </div>
                {quote.monthly_subtotal > 0 && (
                  <div className="flex justify-between text-slate-400 pt-1 border-t border-white/5">
                    <span>Monthly Retainer:</span>
                    <span className="font-mono text-white">{formatCurrency(quote.monthly_subtotal)}/mo</span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#18181F] to-[#0D0D11] border border-[#DCAE53]/30 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[10px] font-mono text-[#DCAE53] uppercase tracking-widest font-bold">
                  Total Implementation Value
                </span>
                <div className="text-2xl sm:text-3xl font-mono font-extrabold text-white mt-1">
                  {formatCurrency(quote.one_time_subtotal)}
                </div>
                <p className="text-[11px] font-mono text-slate-400 mt-1">
                  {MERCIAN_BANK_DETAILS.vatNotice}
                </p>
              </div>

              {!accepted ? (
                <button
                  onClick={handleAcceptQuote}
                  disabled={accepting}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#DAA640] to-[#B88528] hover:from-[#E5B85C] hover:to-[#C99632] text-[#09090B] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-[#DAA640]/20 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {accepting ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <>
                      <span>Accept Proposal &amp; Lock Sprint</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              ) : (
                <div className="py-2.5 px-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold flex items-center justify-center gap-2">
                  <CheckCircle2 size={14} />
                  <span>Proposal Accepted · Build Locked</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bank Transfer Coordinates Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#111115] border border-white/8 shadow-2xl space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-white font-serif font-bold text-lg">
              <Building2 className="w-5 h-5 text-[#DCAE53]" />
              <span>Direct Bank Transfer Directives</span>
            </div>
            <span className="text-xs font-mono text-[#DCAE53] bg-[#DCAE53]/10 border border-[#DCAE53]/25 px-2.5 py-1 rounded-full font-bold">
              GBP (£) Faster Payments / BACS
            </span>
          </div>

          <p className="text-xs text-slate-400 font-sans leading-relaxed">
            To confirm your project initiation deposit of <strong className="text-white">{formatCurrency(quote.deposit_required)}</strong>, please remit payment via UK Faster Payments to the official account below, referencing your quote number.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
            {[
              { label: 'Bank Name', value: bankDetails.bankName },
              { label: 'Account Name', value: bankDetails.accountName },
              { label: 'Sort Code', value: bankDetails.sortCode },
              { label: 'Account Number', value: bankDetails.accountNumber },
            ].map((field, i) => (
              <div
                key={i}
                onClick={() => copyToClipboard(field.value, field.label)}
                className="p-3 rounded-xl bg-[#18181F] border border-white/5 hover:border-[#DCAE53]/40 cursor-pointer transition-all group relative"
              >
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  {field.label}
                </span>
                <span className="font-mono text-sm font-bold text-white group-hover:text-[#DCAE53] transition-colors">
                  {field.value}
                </span>
                <div className="absolute top-2 right-2 text-slate-500 group-hover:text-[#DCAE53]">
                  {copiedBankField === field.label ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-[#0D0D11] border border-white/5 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Payment Reference:</span>
            <button
              onClick={() => copyToClipboard(quote.quote_number, 'Reference')}
              className="font-bold text-[#DCAE53] hover:underline inline-flex items-center gap-1.5"
            >
              <span>{quote.quote_number}</span>
              {copiedBankField === 'Reference' ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
            </button>
          </div>
        </div>

        {/* Footer Guarantee */}
        <footer className="text-center text-xs font-mono text-slate-500 py-4 space-y-1">
          <p>Mercian Wealth · Storefronts · Automation · Growth.</p>
          <p>{MERCIAN_BANK_DETAILS.vatNotice}</p>
        </footer>
      </div>
    </main>
  )
}
