'use client'

import { useState } from 'react'
import { RotateCw, HelpCircle, Sparkles } from 'lucide-react'

interface ObjectionFlipCardProps {
  objection: string
  rebuttal: string
  accentColor?: string
  icon?: React.ReactNode
}

/**
 * Kokonut UI 3D Flip Card Component
 * Provides fluid 3D card-flip interaction for handling cold-call objections in real-time.
 * Strictly adheres to the Mercian Wealth luxury gold/dark palette.
 */
export function ObjectionFlipCard({
  objection,
  rebuttal,
  accentColor = '#DCAE53',
  icon
}: ObjectionFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      className="group relative w-full h-[155px] cursor-pointer"
      style={{ perspective: '1000px' }}
      onClick={() => setIsFlipped((prev) => !prev)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setIsFlipped((prev) => !prev)
        }
      }}
      aria-label={`Objection flip card: ${objection}`}
    >
      <div
        className="w-full h-full duration-500 rounded-xl transition-all"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.45s cubic-bezier(0.4, 0.2, 0.2, 1)',
        }}
      >
        {/* FRONT SIDE: The Objection Prompt */}
        <div
          className="absolute inset-0 w-full h-full rounded-xl bg-[#141417] border border-white/10 hover:border-[#DCAE53]/40 p-4 flex flex-col justify-between shadow-lg transition-colors group-hover:bg-[#18181D]"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#DCAE53]/10 text-[#DCAE53]">
                {icon || <HelpCircle size={15} />}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-white/50">
                Tap to Flip Rebuttal
              </span>
            </div>
            <RotateCw size={13} className="text-white/40 group-hover:text-[#DCAE53] transition-colors" />
          </div>

          <div className="my-auto">
            <p className="text-sm sm:text-base font-bold text-white leading-snug line-clamp-2">
              “{objection}”
            </p>
          </div>

          <div className="flex items-center justify-between text-[11px] text-white/40 border-t border-white/5 pt-2">
            <span>Benevolent Counter-Frame</span>
            <span className="text-[#DCAE53] font-medium flex items-center gap-1">
              Reveal Script →
            </span>
          </div>
        </div>

        {/* BACK SIDE: The Psychological Rebuttal */}
        <div
          className="absolute inset-0 w-full h-full rounded-xl bg-gradient-to-br from-[#1C1C22] to-[#141417] border border-[#DCAE53]/50 p-4 flex flex-col justify-between shadow-xl text-left"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DCAE53]/15 text-[#DCAE53] border border-[#DCAE53]/30">
              <Sparkles size={11} /> High-Status Response
            </span>
            <RotateCw size={13} className="text-white/40 hover:text-white" />
          </div>

          <div className="my-auto overflow-y-auto max-h-[85px] pr-1 scrollbar-thin scrollbar-thumb-white/10">
            <p className="text-[12px] sm:text-[13px] text-white/90 leading-relaxed font-medium italic">
              {rebuttal}
            </p>
          </div>

          <div className="text-[10px] text-white/40 border-t border-white/5 pt-1.5 flex justify-between items-center">
            <span>Tap again to flip back</span>
            <span className="text-[#DCAE53] text-[10px]">Ready to deliver</span>
          </div>
        </div>
      </div>
    </div>
  )
}
