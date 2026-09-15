'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter, ArrowRight, Info, CheckCircle2 } from 'lucide-react'

export interface FunnelStage {
  label: string
  shortLabel: string
  count: number
  color: string
}

interface OutreachFunnelChartProps {
  stages?: FunnelStage[]
  className?: string
}

const DEFAULT_STAGES: FunnelStage[] = [
  { label: 'Fresh Leads', shortLabel: 'Leads', count: 18, color: '#A1A1AA' },
  { label: 'WhatsApp Contacted', shortLabel: 'Contacted', count: 12, color: '#F59E0B' },
  { label: 'Strategy Call Booked', shortLabel: 'Booked', count: 6, color: '#F59E0B' },
  { label: 'Proposal Sent', shortLabel: 'Proposal', count: 3, color: '#DAA640' },
  { label: 'Won Client Deals', shortLabel: 'Won', count: 2, color: '#10B981' },
]

export function OutreachFunnelChart({
  stages = DEFAULT_STAGES,
  className = '',
}: OutreachFunnelChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const baselineCount = stages[0]?.count > 0 ? stages[0].count : 1

  return (
    <div className={`card-depth p-5 sm:p-6 flex flex-col justify-between ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-4 sm:mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#DAA640]" />
            <h3 className="text-sm sm:text-base font-sans font-bold text-white tracking-tight">
              Outreach Conversion Funnel
            </h3>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Real-time pipeline conversion velocity across client lifecycle stages.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[11px] font-mono text-zinc-300">
          <span>Overall Conversion:</span>
          <span className="font-bold text-emerald-400">
            {Math.round(((stages[stages.length - 1]?.count || 0) / baselineCount) * 100)}%
          </span>
        </div>
      </div>

      {/* SVG Multi-Layer Funnel Visual */}
      <div className="relative w-full py-4 overflow-hidden">
        {/* Responsive Desktop & Tablet Staged Funnel SVG */}
        <div className="w-full">
          <svg
            viewBox="0 0 1000 240"
            className="w-full h-auto max-h-[190px] overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="funnelGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3F3F46" stopOpacity="0.7" />
                <stop offset="25%" stopColor="#DAA640" stopOpacity="0.8" />
                <stop offset="70%" stopColor="#DAA640" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.95" />
              </linearGradient>
              <filter id="haloGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Stages rendered as curved horizontal segments */}
            {stages.map((stage, idx) => {
              const totalStages = stages.length
              const segmentWidth = 1000 / totalStages
              const xStart = idx * segmentWidth + 6
              const xEnd = (idx + 1) * segmentWidth - 6

              // Calculate top and bottom heights based on conversion curve
              const ratioStart = Math.max(0.2, (stages[idx]?.count || 0) / baselineCount)
              const ratioEnd = idx === totalStages - 1
                ? ratioStart * 0.95
                : Math.max(0.18, (stages[idx + 1]?.count || 0) / baselineCount)

              const topYStart = 120 - ratioStart * 85
              const botYStart = 120 + ratioStart * 85
              const topYEnd = 120 - ratioEnd * 85
              const botYEnd = 120 + ratioEnd * 85

              const isHovered = hoveredIndex === idx
              const percentage = Math.round(((stage.count || 0) / baselineCount) * 100)

              // SVG Path definition
              const pathD = `
                M ${xStart} ${topYStart}
                C ${xStart + segmentWidth * 0.4} ${topYStart},
                  ${xEnd - segmentWidth * 0.4} ${topYEnd},
                  ${xEnd} ${topYEnd}
                L ${xEnd} ${botYEnd}
                C ${xEnd - segmentWidth * 0.4} ${botYEnd},
                  ${xStart + segmentWidth * 0.4} ${botYStart},
                  ${xStart} ${botYStart}
                Z
              `

              return (
                <g
                  key={stage.label}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="cursor-pointer transition-all duration-200"
                >
                  {/* Outer subtle halo ring on hover */}
                  {isHovered && (
                    <path
                      d={pathD}
                      fill="none"
                      stroke={stage.color}
                      strokeWidth="6"
                      filter="url(#haloGlow)"
                      opacity={0.4}
                    />
                  )}

                  {/* Main Segment Fill */}
                  <path
                    d={pathD}
                    fill={isHovered ? stage.color : '#18181B'}
                    fillOpacity={isHovered ? 0.35 : 0.65}
                    stroke={isHovered ? stage.color : 'rgba(255, 255, 255, 0.12)'}
                    strokeWidth={isHovered ? 2 : 1}
                    className="transition-colors duration-200"
                  />

                  {/* Inner Specular Highlight */}
                  <path
                    d={`M ${xStart} ${topYStart} L ${xEnd} ${topYEnd}`}
                    stroke="rgba(255, 255, 255, 0.25)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                </g>
              )
            })}
          </svg>
        </div>

        {/* Dynamic HTML Stage Overlays (Counts, Percentages, and Labels) */}
        <div className="grid grid-cols-5 gap-1 sm:gap-2 mt-2">
          {stages.map((stage, idx) => {
            const isHovered = hoveredIndex === idx
            const percentage = Math.round(((stage.count || 0) / baselineCount) * 100)
            const dropoff = idx > 0
              ? Math.round((((stages[idx - 1].count - stage.count) / (stages[idx - 1].count || 1))) * 100)
              : 0

            return (
              <div
                key={stage.label}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`flex flex-col items-center text-center p-2 rounded-xl transition-all cursor-pointer ${
                  isHovered ? 'bg-white/10 ring-1 ring-white/20' : 'hover:bg-white/5'
                }`}
              >
                {/* Count */}
                <span className="text-sm sm:text-lg font-bold text-white font-sans tracking-tight">
                  {stage.count}
                </span>

                {/* Percentage Pill */}
                <span className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-mono font-bold my-1 transition-colors ${
                  isHovered ? 'bg-white text-black' : 'bg-black/60 text-zinc-300 border border-white/10'
                }`}>
                  {percentage}%
                </span>

                {/* Stage Label */}
                <span className="text-[10px] sm:text-xs font-medium text-zinc-400 truncate max-w-full">
                  <span className="hidden sm:inline">{stage.label}</span>
                  <span className="sm:hidden">{stage.shortLabel}</span>
                </span>

                {/* Drop-off context on hover */}
                {idx > 0 && (
                  <span className="text-[9px] font-mono text-zinc-400 mt-0.5 hidden md:block">
                    -{dropoff}% drop
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer Info Strip */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-3 border-t border-white/5 text-[11px] text-zinc-400">
        <div className="flex items-center gap-1.5">
          <Info size={13} className="text-[#DAA640] shrink-0" />
          <span>Stage transitions powered by direct WhatsApp touchpoints & calendar bookings.</span>
        </div>
        <span className="font-mono text-zinc-400">Target deal cycle: &lt; 7 days</span>
      </div>
    </div>
  )
}
