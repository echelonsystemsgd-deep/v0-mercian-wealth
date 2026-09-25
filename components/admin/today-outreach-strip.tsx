'use client'

import Link from 'next/link'
import { Zap, MessageSquare, ArrowRight, ExternalLink, Star, MapPin, Phone, CheckCircle2 } from 'lucide-react'

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
    const phone = lead.phone || ''
    const cleanDigits = phone.replace(/[^0-9]/g, '')
    if (!cleanDigits) return

    const ownerName = lead.name && lead.name !== lead.business_name && !lead.name.includes('Owner') ? lead.name.split(' ')[0] : ''
    const businessName = lead.business_name || 'your business'
    const opener = ownerName ? `Hi ${ownerName} 👋, is this ${businessName}?` : `Hi 👋, is this ${businessName}?`
    const url = `https://wa.me/${cleanDigits}?text=${encodeURIComponent(opener)}`
    window.open(url, '_blank')
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
          className="text-xs text-[#DAA640] hover:text-[#F5D90A] font-semibold flex items-center gap-1 self-start sm:self-center transition-colors"
        >
          <span>View All in Ledger</span>
          <ArrowRight size={12} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {leads.slice(0, 4).map((lead) => {
          const businessName = lead.business_name || lead.name
          const rawTrade = lead.local_business_niche || lead.scraped_metadata?.trade || 'Jeweller'
          const trade = (!rawTrade || rawTrade.length > 25 || rawTrade.startsWith('Hi ')) ? 'Jeweller' : rawTrade
          const rating = lead.scraped_metadata?.rating || 5.0
          const reviews = lead.scraped_metadata?.reviews_count || 0
          const rawAddr = (lead.scraped_metadata?.address || '').trim()
          const city = rawAddr && !rawAddr.startsWith('·') ? rawAddr.split(',')[0].trim() : 'UK'

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

                <div className="flex items-center gap-2 text-[10px] text-zinc-400">
                  <span className="flex items-center gap-1">
                    <MapPin size={10} className="text-[#DAA640]" />
                    {city}
                  </span>
                  <span className="flex items-center gap-0.5 text-amber-400 font-medium">
                    <Star size={10} className="fill-amber-400" />
                    {rating} ({reviews})
                  </span>
                </div>

                {lead.phone && (
                  <p className="text-[11px] font-mono text-zinc-300 flex items-center gap-1">
                    <Phone size={10} className="text-zinc-500" />
                    {lead.phone}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                <button
                  onClick={() => handleQuickWhatsApp(lead)}
                  className="flex-1 py-1.5 px-2.5 rounded-lg bg-[#DAA640] hover:bg-[#F5D90A] text-black text-[11px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer shadow-sm"
                  title="Launch WhatsApp Touch 1 Opener"
                >
                  <MessageSquare size={11} />
                  <span>WhatsApp</span>
                </button>

                <Link
                  href={`/admin/leads/${lead.id}`}
                  className="py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-[11px] font-medium flex items-center justify-center transition-colors cursor-pointer"
                  title="Open Lead Workspace"
                >
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
