'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  X,
  Send,
  Zap,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Phone,
  Globe,
  MapPin,
  Star,
  ExternalLink,
  MessageSquare,
  Trophy,
} from 'lucide-react'
import type { Lead } from '@/app/(admin)/admin/leads/page'
import { getLeadPathway } from '@/app/(admin)/admin/leads/page'
import { classifyPhoneNumber, buildWhatsAppOpenerUrl, buildTelUrl } from '@/lib/phone-classifier'

interface OutreachSprintRunnerProps {
  isOpen: boolean
  onClose: () => void
  leads: Lead[]
  onUpdateStatus: (leadId: string, status: string) => Promise<void>
}

export function OutreachSprintRunner({
  isOpen,
  onClose,
  leads,
  onUpdateStatus,
}: OutreachSprintRunnerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [completedCount, setCompletedCount] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  const activeLead = leads[currentIndex]

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      } else if (e.key === 'ArrowLeft') {
        handlePrev()
      } else if (e.key === 'Enter' && !isFinished && activeLead) {
        handleSendAndAdvance()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, isFinished, activeLead, currentIndex])

  const handleNext = () => {
    if (currentIndex < leads.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      setIsFinished(true)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
      setIsFinished(false)
    }
  }

  const handleSendAndAdvance = async () => {
    if (!activeLead) return

    const phoneInfo = classifyPhoneNumber(activeLead.phone)
    if (phoneInfo.isWhatsAppViable) {
      const url = buildWhatsAppOpenerUrl(activeLead.phone, activeLead.business_name || activeLead.name, activeLead.name)
      if (url) window.open(url, '_blank')
    } else {
      const tel = buildTelUrl(activeLead.phone)
      if (tel) window.location.href = tel
    }

    // Advance status to Contacted
    await onUpdateStatus(activeLead.id, 'Contacted')
    setCompletedCount((prev) => prev + 1)

    // Move to next lead
    handleNext()
  }

  if (!isOpen) return null

  const progressPct = leads.length > 0 ? Math.round(((currentIndex) / leads.length) * 100) : 0

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#0B0B0D] border border-[#DAA640]/30 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        
        {/* Top Header: Progress & Close */}
        <div className="px-5 py-4 border-b border-white/10 bg-[#111115] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-sans flex items-center gap-2">
                Outreach Sprint Runner
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#DAA640]/15 text-[#DAA640] border border-[#DAA640]/30">
                  {leads.length > 0 ? `${currentIndex + 1} of ${leads.length}` : '0 Leads'}
                </span>
              </h2>
              <p className="text-[11px] font-mono text-zinc-400">
                Press <kbd className="px-1 py-0.2 rounded bg-white/10 text-white font-bold">Enter</kbd> to Send & Next, <kbd className="px-1 py-0.2 rounded bg-white/10 text-white font-bold">→</kbd> to Skip.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Sprint Progress Bar */}
        <div className="w-full bg-white/5 h-1.5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-[#DAA640] transition-all duration-300"
            style={{ width: `${isFinished ? 100 : progressPct}%` }}
          />
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 flex-1 overflow-y-auto space-y-5">
          {isFinished ? (
            /* Celebration Screen when sprint finishes */
            <div className="py-8 text-center space-y-5 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <Trophy size={32} />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-2xl font-bold text-white">Sprint Completed!</h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  You contacted {completedCount} local businesses in this session. All leads have been transitioned to Contacted in the pipeline.
                </p>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-[#DAA640] hover:bg-[#F5D90A] text-black font-bold text-xs transition-all cursor-pointer shadow-sm"
                >
                  Return to Ledger
                </button>
              </div>
            </div>
          ) : activeLead ? (
            <div className="space-y-5">
              {/* Lead Details Card */}
              <div className="p-4 rounded-xl bg-[#141417] border border-white/5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-sans font-bold text-lg text-white">
                      {activeLead.business_name || activeLead.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-medium text-zinc-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded uppercase">
                        {activeLead.local_business_niche || 'Local Business'}
                      </span>
                      <span className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
                        <Star size={11} className="fill-amber-400 text-amber-400" />
                        {activeLead.scraped_metadata?.rating || 5.0} ({activeLead.scraped_metadata?.reviews_count || 0})
                      </span>
                    </div>
                  </div>

                  {(() => {
                    const pathway = getLeadPathway(activeLead)
                    if (pathway === 'HAS_WEBSITE') {
                      return (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                          Has Website
                        </span>
                      )
                    }
                    if (pathway === 'NO_WEBSITE') {
                      return (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-amber-400/10 text-amber-300 border border-amber-400/20">
                          No Website (Gap)
                        </span>
                      )
                    }
                    return (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        Needs Review
                      </span>
                    )
                  })()}
                </div>

                {(() => {
                  const phoneInfo = classifyPhoneNumber(activeLead.phone)
                  return (
                    <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-white/5 font-mono">
                      <div className="flex items-center gap-1.5 text-zinc-200">
                        <Phone size={12} className={phoneInfo.isWhatsAppViable ? 'text-emerald-400' : 'text-sky-400'} />
                        <span>{phoneInfo.displayNational}</span>
                        <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono ${phoneInfo.isWhatsAppViable ? 'bg-emerald-500/10 text-emerald-400' : 'bg-sky-500/10 text-sky-400'}`}>
                          {phoneInfo.badgeText}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <MapPin size={12} className="text-zinc-500 shrink-0" />
                        <span className="truncate">{activeLead.scraped_metadata?.address || 'UK Area'}</span>
                      </div>
                    </div>
                  )
                })()}
              </div>

              {/* Ready-to-Send Opener Box */}
              <div className="rounded-xl bg-[#070709] border border-white/10 p-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-zinc-400 font-semibold flex items-center gap-1.5">
                    <MessageSquare size={13} className="text-emerald-400" />
                    Message 1 Opener (Ready to Send)
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">Strict Rule: No Pitch on Touch 1</span>
                </div>
                <p className="font-sans text-sm text-zinc-100 bg-[#121217] p-3.5 rounded-lg border border-white/5">
                  {activeLead.name && activeLead.name !== activeLead.business_name && !activeLead.name.includes('Owner')
                    ? `Hi ${activeLead.name.split(' ')[0]} 👋, is this ${activeLead.business_name || 'your business'}?`
                    : `Hi 👋, is this ${activeLead.business_name || 'your business'}?`}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-center text-xs text-zinc-400 py-8">No leads in this sprint queue.</p>
          )}
        </div>

        {/* Footer Navigation */}
        {!isFinished && (
          <div className="px-5 py-3.5 border-t border-white/10 bg-[#111115] flex items-center justify-between gap-3 shrink-0">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-zinc-300 hover:text-white text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft size={14} />
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleNext}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer border border-white/10"
              >
                <span>Skip</span>
                <ChevronRight size={14} />
              </button>

              {(() => {
                const phoneInfo = classifyPhoneNumber(activeLead?.phone)
                return (
                  <button
                    onClick={handleSendAndAdvance}
                    className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md cursor-pointer ${
                      phoneInfo.isWhatsAppViable
                        ? 'bg-[#DAA640] hover:bg-[#F5D90A] text-black shadow-[#DAA640]/20'
                        : 'bg-sky-500 hover:bg-sky-400 text-white shadow-sky-500/20'
                    }`}
                  >
                    {phoneInfo.isWhatsAppViable ? <Send size={13} /> : <Phone size={13} />}
                    <span>{phoneInfo.isWhatsAppViable ? 'Send WhatsApp & Next' : 'Call Office & Next'}</span>
                  </button>
                )
              })()}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
