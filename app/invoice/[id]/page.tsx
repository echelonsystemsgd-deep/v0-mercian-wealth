'use client'

import { useState, useEffect, use } from 'react'
import { formatCurrency, MERCIAN_BANK_DETAILS, type Invoice } from '@/lib/quotes'
import {
  Printer,
  Copy,
  Check,
  Building2,
  AlertCircle,
  Loader2,
  Calendar,
  CreditCard,
  ShieldCheck,
} from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

export default function ClientInvoicePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = use(params)
  const invoiceId = resolvedParams.id

  const [invoice, setInvoice] = useState<Invoice | null>(null)
  const [bankDetails, setBankDetails] = useState<any>(MERCIAN_BANK_DETAILS)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  useEffect(() => {
    async function loadInvoice() {
      try {
        setLoading(true)
        const res = await fetch(`/api/invoice/${invoiceId}`)
        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error || 'Failed to load invoice')
        }

        setInvoice(data.invoice)
        if (data.bankDetails) {
          setBankDetails(data.bankDetails)
        }
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (invoiceId) {
      loadInvoice()
    }
  }, [invoiceId])

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(label)
    toast.success(`Copied ${label} to clipboard`)
    setTimeout(() => setCopiedField(null), 2000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090B] flex flex-col items-center justify-center text-white font-sans p-4">
        <Loader2 className="w-8 h-8 text-[#DCAE53] animate-spin mb-4" />
        <p className="font-mono text-sm text-slate-400">Loading Official Invoice...</p>
      </div>
    )
  }

  if (error || !invoice) {
    return (
      <div className="min-h-screen bg-[#09090B] flex flex-col items-center justify-center text-white font-sans p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-2xl font-bold text-white mb-2">Invoice Not Found</h1>
        <p className="text-slate-400 text-sm max-w-md mb-6 font-sans">
          {error || 'This invoice does not exist or the link may be invalid.'}
        </p>
        <Link
          href="/"
          className="px-6 py-2.5 rounded-xl bg-[#18181F] border border-[#DCAE53]/40 text-[#DCAE53] hover:bg-[#DCAE53]/10 text-xs font-mono font-bold uppercase tracking-wider transition-all"
        >
          Return to Mercian Wealth
        </Link>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#09090B] text-slate-100 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Print / Action Top Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:hidden bg-[#111115] border border-white/10 rounded-2xl p-4">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <ShieldCheck className="w-4 h-4 text-[#DCAE53]" />
            <span>Official Client Invoice View</span>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#18181F] border border-[#DCAE53]/40 text-[#DCAE53] hover:bg-[#DCAE53]/10 text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              <Printer size={14} />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>

        {/* INVOICE PRINTABLE CONTAINER */}
        <div
          id="invoice-printable"
          className="bg-[#09090B] border border-[#DCAE53]/40 rounded-3xl p-6 sm:p-10 space-y-6 shadow-2xl"
        >
          {/* Header Letterhead */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-white/10 pb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#111115] border border-[#DCAE53]/40 flex items-center justify-center p-1.5">
                  <svg className="w-6 h-6 text-[#DCAE53]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4 4h16l-8 7.5L4 4zm0 16h16l-8-7.5L4 20z" opacity="0.9" />
                    <circle cx="12" cy="11.5" r="1.5" fill="#DCAE53" />
                  </svg>
                </div>
                <div>
                  <div className="font-sans font-black text-base tracking-wider text-white uppercase">
                    MERCIAN <span className="text-[#DCAE53]">WEALTH</span>
                  </div>
                  <p className="text-[10px] font-mono text-[#DCAE53] tracking-widest uppercase">
                    {bankDetails.tagline || MERCIAN_BANK_DETAILS.tagline}
                  </p>
                </div>
              </div>
              <p className="text-[11px] font-mono text-slate-400">
                West Midlands, United Kingdom · operations@mercianwealth.com
              </p>
            </div>

            <div className="text-left sm:text-right space-y-1 font-mono text-xs w-full sm:w-auto">
              <span className="text-xl font-bold text-white block tracking-wide">INVOICE</span>
              <span className="text-[#DCAE53] font-bold block">{invoice.invoice_number}</span>
              <span className="text-slate-400 block">
                Issue Date: {new Date(invoice.issue_date).toLocaleDateString('en-GB')}
              </span>
              <span className="text-slate-400 block">
                Due Date: {invoice.due_date ? new Date(invoice.due_date).toLocaleDateString('en-GB') : 'Upon Receipt'}
              </span>
            </div>
          </div>

          {/* Billed To */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
            <div className="p-4 rounded-xl bg-[#111115] border border-white/5 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Billed To:</span>
              <strong className="text-white text-sm block">
                {invoice.client_business || invoice.client_name}
              </strong>
              <p className="text-slate-300">Attn: {invoice.client_name}</p>
              {invoice.client_email && <p className="text-slate-400 font-mono">{invoice.client_email}</p>}
              {invoice.client_phone && <p className="text-slate-400 font-mono">{invoice.client_phone}</p>}
              {invoice.client_address && <p className="text-slate-400">{invoice.client_address}</p>}
            </div>

            <div className="p-4 rounded-xl bg-[#111115] border border-white/5 space-y-2 font-mono">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Payment Status:</span>
              <span
                className={`inline-block px-2.5 py-1 rounded text-xs font-bold uppercase ${
                  invoice.status === 'paid'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'bg-[#DCAE53]/10 text-[#DCAE53] border border-[#DCAE53]/30'
                }`}
              >
                ● {invoice.status}
              </span>
              <p className="text-[11px] text-slate-400">
                Payment Terms: {invoice.payment_terms}
              </p>
            </div>
          </div>

          {/* Financial Ledger Table */}
          <div className="rounded-xl border border-white/10 overflow-hidden">
            <div className="grid grid-cols-12 px-4 py-2.5 bg-[#18181F] text-[11px] font-mono text-slate-400 uppercase">
              <div className="col-span-8">Description</div>
              <div className="col-span-4 text-right">Amount Due</div>
            </div>
            <div className="p-4 space-y-2 text-xs font-sans">
              <div className="flex justify-between items-center text-white">
                <span>Turnkey Systems Implementation Setup (Sprint Initiation Deposit)</span>
                <span className="font-mono font-bold text-sm">{formatCurrency(invoice.deposit_amount)}</span>
              </div>
              {invoice.balance_due > 0 && (
                <div className="flex justify-between items-center text-slate-400">
                  <span>Remaining Balance Due on Final Go-Live</span>
                  <span className="font-mono">{formatCurrency(invoice.balance_due)}</span>
                </div>
              )}
            </div>
            <div className="p-4 bg-[#111115] border-t border-white/10 flex justify-between items-center font-mono">
              <div>
                <span className="text-xs text-slate-400 block uppercase">Deposit Due Now</span>
                <span className="text-[10px] text-slate-400">
                  {bankDetails.vatNotice || MERCIAN_BANK_DETAILS.vatNotice}
                </span>
              </div>
              <span className="text-2xl font-extrabold text-[#DCAE53]">
                {formatCurrency(invoice.deposit_amount)}
              </span>
            </div>
          </div>

          {/* Bank Coordinates Directives */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#111115] border border-white/10 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <Building2 className="w-4 h-4 text-[#DCAE53]" />
                <span className="text-xs uppercase text-[#DCAE53] tracking-wider">
                  UK Faster Payments Bank Directives
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#DCAE53] bg-[#DCAE53]/10 border border-[#DCAE53]/25 px-2.5 py-0.5 rounded-full font-bold">
                GBP (£) Faster Payments / BACS
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-slate-300">
              {[
                { label: 'Account Holder', value: bankDetails.accountName || MERCIAN_BANK_DETAILS.accountName },
                { label: 'Sort Code', value: bankDetails.sortCode || MERCIAN_BANK_DETAILS.sortCode },
                { label: 'Account Number', value: bankDetails.accountNumber || MERCIAN_BANK_DETAILS.accountNumber },
                { label: 'Bank Name', value: bankDetails.bankName || MERCIAN_BANK_DETAILS.bankName },
              ].map((field, i) => (
                <div
                  key={i}
                  onClick={() => copyToClipboard(field.value, field.label)}
                  className="p-3 rounded-xl bg-[#18181F] border border-white/5 hover:border-[#DCAE53]/40 cursor-pointer transition-all group relative"
                >
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                    {field.label}
                  </span>
                  <span className="text-white font-bold block truncate font-mono text-sm group-hover:text-[#DCAE53] transition-colors">
                    {field.value}
                  </span>
                  <div className="absolute top-2 right-2 text-slate-500 group-hover:text-[#DCAE53]">
                    {copiedField === field.label ? (
                      <Check size={12} className="text-emerald-400" />
                    ) : (
                      <Copy size={12} />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-[#0D0D11] border border-white/5 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Payment Reference:</span>
              <button
                onClick={() => copyToClipboard(invoice.invoice_number, 'Reference')}
                className="font-bold text-[#DCAE53] hover:underline inline-flex items-center gap-1.5"
              >
                <span>{invoice.invoice_number}</span>
                {copiedField === 'Reference' ? (
                  <Check size={12} className="text-emerald-400" />
                ) : (
                  <Copy size={12} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Guarantee */}
        <footer className="text-center text-xs font-mono text-slate-500 py-4 space-y-1">
          <p>Mercian Wealth · Storefronts · Automation · Growth.</p>
          <p>{bankDetails.vatNotice || MERCIAN_BANK_DETAILS.vatNotice}</p>
        </footer>
      </div>
    </main>
  )
}
