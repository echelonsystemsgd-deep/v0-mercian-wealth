'use client'

import { Globe, MapPin, Star, Phone, ExternalLink, ChevronRight, Zap } from 'lucide-react'
import type { PlaybookEngine } from '@/hooks/use-playbook-engine'

interface OverviewTabProps {
  lead: {
    id: string
    name: string
    business_name?: string
    email?: string
    phone?: string
    website?: string
    service_interested?: string
    status: string
    created_at: string
    local_business_niche?: string
    notes?: string
    scraped_metadata?: Record<string, unknown>
  }
  engine: PlaybookEngine
  onGoToOutreach: () => void
}

const EVIDENCE_COLOURS = {
  observed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  inferred: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  measured: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
}

export function OverviewTab({ lead, engine, onGoToOutreach }: OverviewTabProps) {
  const {
    businessName, trade, hasWebsite, rating, reviewsCount, address, mapsUrl,
    nextActionLabel, nextActionReason, suggestedAngle, recommendedApproach,
    evidenceItems, recommendedChannel, handleCall, handleWhatsApp,
    nicheProfile,
  } = engine

  const rawWebsite = (lead.website || '').trim()

  return (
    <div className="space-y-5">
      {/* WHY THIS LEAD */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#0B0B0D] border border-white/10 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Why this lead</span>
        </div>
        <p className="text-sm text-zinc-200 leading-relaxed">
          {recommendedApproach}
        </p>
      </div>

      {/* NEXT ACTION */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#DAA640]/10 via-[#0B0B0D] to-[#141417] border border-[#DAA640]/20 space-y-3">
        <div className="flex items-center gap-2">
          <Zap size={14} className="text-[#DAA640]" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#DAA640]">Next action</span>
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-white">{nextActionLabel}</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">{nextActionReason}</p>
        </div>
        {suggestedAngle && (
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <p className="text-[11px] text-zinc-500 font-mono uppercase tracking-wider mb-1">Suggested opening</p>
            <p className="text-xs text-zinc-300 italic leading-relaxed">"{suggestedAngle}"</p>
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-2 pt-1">
          {recommendedChannel === 'whatsapp' ? (
            <button
              onClick={() => handleWhatsApp()}
              className="flex-1 py-2.5 px-4 rounded-xl bg-[#DAA640] hover:bg-[#C4932C] text-black font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              Send WhatsApp
            </button>
          ) : (
            <button
              onClick={handleCall}
              className="flex-1 py-2.5 px-4 rounded-xl bg-[#DAA640] hover:bg-[#C4932C] text-black font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Phone size={14} />
              Call {lead.phone || businessName}
            </button>
          )}
          <button
            onClick={onGoToOutreach}
            className="flex-1 sm:flex-none py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white font-medium text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            View outreach <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* EVIDENCE */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#0B0B0D] border border-white/10 space-y-3">
        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Evidence</span>
        <div className="flex flex-wrap gap-2">
          {evidenceItems.map((item, i) => (
            <span
              key={i}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium ${EVIDENCE_COLOURS[item.type]}`}
            >
              <span className="font-mono text-[9px] uppercase opacity-60">{item.type}</span>
              {item.label}
            </span>
          ))}
        </div>
      </div>

      {/* BUSINESS INFO */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#0B0B0D] border border-white/10 space-y-3">
        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Business info</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {lead.phone && (
            <div className="space-y-0.5">
              <p className="text-zinc-600 font-mono uppercase tracking-wider text-[10px]">Phone</p>
              <a href={`tel:${lead.phone}`} className="text-zinc-200 hover:text-[#DAA640] transition-colors">
                {lead.phone}
              </a>
            </div>
          )}
          {lead.email && (
            <div className="space-y-0.5">
              <p className="text-zinc-600 font-mono uppercase tracking-wider text-[10px]">Email</p>
              <a href={`mailto:${lead.email}`} className="text-zinc-200 hover:text-[#DAA640] transition-colors truncate block">
                {lead.email}
              </a>
            </div>
          )}
          <div className="space-y-0.5">
            <p className="text-zinc-600 font-mono uppercase tracking-wider text-[10px]">Niche</p>
            <p className="text-zinc-200">{nicheProfile.nicheName}</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-zinc-600 font-mono uppercase tracking-wider text-[10px]">Trade</p>
            <p className="text-zinc-200 capitalize">{trade}</p>
          </div>
          {address && address !== 'UK Regional' && (
            <div className="space-y-0.5">
              <p className="text-zinc-600 font-mono uppercase tracking-wider text-[10px]">Location</p>
              <div className="flex items-center gap-1.5">
                <MapPin size={11} className="text-zinc-500" />
                <span className="text-zinc-200">{address}</span>
                {mapsUrl && (
                  <a href={mapsUrl} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-[#DAA640] transition-colors">
                    <ExternalLink size={10} />
                  </a>
                )}
              </div>
            </div>
          )}
          {reviewsCount > 0 && (
            <div className="space-y-0.5">
              <p className="text-zinc-600 font-mono uppercase tracking-wider text-[10px]">Google rating</p>
              <div className="flex items-center gap-1.5">
                <Star size={11} className="fill-amber-400 text-amber-400" />
                <span className="text-zinc-200">{rating} · {reviewsCount} reviews</span>
              </div>
            </div>
          )}
          {hasWebsite && rawWebsite && (
            <div className="space-y-0.5">
              <p className="text-zinc-600 font-mono uppercase tracking-wider text-[10px]">Website</p>
              <a
                href={rawWebsite.startsWith('http') ? rawWebsite : `https://${rawWebsite}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-zinc-200 hover:text-[#DAA640] transition-colors truncate"
              >
                <Globe size={11} className="text-zinc-500 shrink-0" />
                <span className="truncate">{rawWebsite.replace(/^https?:\/\//, '')}</span>
                <ExternalLink size={9} className="text-zinc-500 shrink-0" />
              </a>
            </div>
          )}
          {lead.service_interested && (
            <div className="space-y-0.5">
              <p className="text-zinc-600 font-mono uppercase tracking-wider text-[10px]">Interested in</p>
              <p className="text-zinc-200">{lead.service_interested}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
