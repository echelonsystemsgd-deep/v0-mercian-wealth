'use client'

import Link from 'next/link'
import { Zap, MessageSquare, ArrowRight, ExternalLink, Star, MapPin, Phone, CheckCircle2, Globe } from 'lucide-react'
import { classifyPhoneNumber, buildWhatsAppOpenerUrl, buildTelUrl } from '@/lib/phone-classifier'

export interface PriorityLead {
  id: string
  name: string
  business_name?: string
  phone?: string | null
  website?: string | null
  local_business_niche?: string | null
  status: string
  scraped_metadata?: {
    trade?: string
    rating?: number
    reviews_count?: number
    address?: string
  } | null
}

interface TodayOutreachStripProps {
  leads: PriorityLead[]
}

export function TodayOutreachStrip({ leads }: TodayOutreachStripProps) {
  const handleQuickWhatsApp = (lead: PriorityLead) => {
    const waUrl = buildWhatsAppOpenerUrl(lead.phone, lead.business_name || lead.name, lead.name)
    if (!waUrl) return
    window.open(waUrl, '_blank')
  }

  if (!leads || leads.length === 0) {
    return (
      <div className="p-5 rounded-2xl bg-[#0B0B0D] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 size={18} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white font-sans">All Fresh Leads Contacted</h3>
            <p className="text-xs text-zinc-400">No uncontacted leads pending. Ready to follow up on active deals.</p>
          </div>
        </div>
        <Link
          href="/admin/leads"
          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-zinc-200 border border-white/10 transition-colors flex items-center gap-1.5"
        >
          <span>Open Lead Ledger</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    )
  }

  return (
    <div className="rounded-2xl bg-[#0B0B0D] border border-white/10 p-5 space-y-4 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
            <Zap size={14} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white font-sans flex items-center gap-2">
              Today&apos;s Outreach Sprint
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30">
                {leads.length} Priority
              </span>
            </h3>
            <p className="text-xs text-zinc-400">
              Fresh uncontacted prospects with verified numbers. Send touch 1 in &lt;60 seconds.
            </p>
          </div>
        </div>

        <Link
          href="/admin/leads"
          className="text-xs text-[#DAA640] hover:text-[#F5D90A] font-semibold flex items-center gap-1 self-start sm:self-center transition-colors py-1"
        >
          <span>View All in Ledger</span>
          <ArrowRight size={12} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {leads.slice(0, 4).map((lead) => {
          const businessName = lead.business_name || lead.name
          const rawTrade = lead.local_business_niche || lead.scraped_metadata?.trade || 'Jeweller'
          const trade = (!rawTrade || rawTrade.length > 25 || rawTrade.startsWith('Hi ')) ? 'Jeweller' : rawTrade
          const rating = lead.scraped_metadata?.rating || 5.0
          const reviews = lead.scraped_metadata?.reviews_count || 0
          const rawAddr = (lead.scraped_metadata?.address || '').trim()
          const city = rawAddr && !rawAddr.startsWith('·') ? rawAddr.split(',')[0].trim() : 'UK'
          const rawWebsite = (lead.website || '').trim()
          const hasWebsite = rawWebsite !== '' && rawWebsite !== 'None' && rawWebsite !== 'NO WEBSITE'

          const phoneInfo = classifyPhoneNumber(lead.phone)
          const telUrl = buildTelUrl(lead.phone)

          return (
            <div
              key={lead.id}
              className="p-3.5 rounded-xl bg-[#141417] border border-white/5 hover:border-white/15 transition-all flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-semibold text-xs text-white group-hover:text-[#DAA640] transition-colors truncate">
                    {businessName}
                  </h4>
                  <span className="text-[9px] font-mono text-zinc-400 bg-white/5 px-1.5 py-0.5 rounded uppercase shrink-0">
                    {trade}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-zinc-400 flex-wrap">
                  <span className="flex items-center gap-1">
                    <MapPin size={10} className="text-[#DAA640]" />
                    {city}
                  </span>
                  <span className="flex items-center gap-0.5 text-amber-400 font-medium">
                    <Star size={10} className="fill-amber-400" />
                    {rating} ({reviews})
                  </span>
                </div>

                {/* Phone & Telecom Badge */}
                <div className="flex items-center justify-between gap-1 text-[11px] pt-0.5">
                  <span className="font-mono text-zinc-300 flex items-center gap-1 truncate">
                    <Phone size={10} className={phoneInfo.isWhatsAppViable ? 'text-emerald-400' : 'text-sky-400'} />
                    {phoneInfo.displayNational}
                  </span>
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded shrink-0 ${
                      phoneInfo.isWhatsAppViable
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                    }`}
                  >
                    {phoneInfo.isWhatsAppViable ? 'Mobile' : 'Landline'}
                  </span>
                </div>

                {/* Storefront / Website Link for Assessment */}
                <div className="pt-0.5">
                  {hasWebsite ? (
                    <a
                      href={rawWebsite.startsWith('http') ? rawWebsite : `https://${rawWebsite}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] text-zinc-400 hover:text-white flex items-center gap-1 transition-colors truncate max-w-full"
                    >
                      <Globe size={10} className="shrink-0 text-[#DAA640]" />
                      <span className="truncate">{rawWebsite.replace(/^https?:\/\//, '')}</span>
                      <ExternalLink size={9} className="shrink-0 text-zinc-500" />
                    </a>
                  ) : (
                    <span className="text-[10px] text-zinc-500 italic flex items-center gap-1">
                      <Globe size={10} className="text-zinc-600" /> No website detected
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                {phoneInfo.isWhatsAppViable ? (
                  <button
                    onClick={() => handleQuickWhatsApp(lead)}
                    className="flex-1 min-h-[36px] py-1.5 px-2.5 rounded-lg bg-[#DAA640] hover:bg-[#F5D90A] text-black text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95"
                    title="Launch WhatsApp Touch 1 Opener"
                  >
                    <MessageSquare size={12} />
                    <span>WhatsApp</span>
                  </button>
                ) : telUrl ? (
                  <a
                    href={telUrl}
                    className="flex-1 min-h-[36px] py-1.5 px-2.5 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-sky-300 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95"
                    title="Direct Call to Office Landline"
                  >
                    <Phone size={12} />
                    <span>Call Office</span>
                  </a>
                ) : (
                  <div className="flex-1 py-1.5 text-center text-[10px] text-zinc-500 font-mono">
                    No Direct Line
                  </div>
                )}

                <Link
                  href={`/admin/leads/${lead.id}`}
                  className="min-h-[36px] min-w-[36px] py-1.5 px-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-[11px] font-medium flex items-center justify-center transition-colors cursor-pointer"
                  title="Open Lead Dossier & Workspace"
                >
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

