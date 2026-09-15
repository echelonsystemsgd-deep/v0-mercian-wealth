'use client'

import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Calendar, ArrowUpRight } from 'lucide-react'

export interface AreaDataPoint {
  date: string
  label: string
  outreachSent: number
  pipelineValue: number
}

interface OutreachAreaChartProps {
  data?: AreaDataPoint[]
  className?: string
}

const DEFAULT_DATA: AreaDataPoint[] = [
  { date: 'Aug 17', label: 'Week 1', outreachSent: 28, pipelineValue: 4500 },
  { date: 'Aug 24', label: 'Week 2', outreachSent: 42, pipelineValue: 9800 },
  { date: 'Aug 31', label: 'Week 3', outreachSent: 65, pipelineValue: 16500 },
  { date: 'Sep 07', label: 'Week 4', outreachSent: 54, pipelineValue: 14200 },
  { date: 'Sep 14', label: 'Week 5', outreachSent: 82, pipelineValue: 24500 },
  { date: 'Sep 21', label: 'Week 6', outreachSent: 96, pipelineValue: 32000 },
]

export function OutreachAreaChart({
  data = DEFAULT_DATA,
  className = '',
}: OutreachAreaChartProps) {
  const [activeIndex, setActiveIndex] = useState<number>(data.length - 1)
  const containerRef = useRef<HTMLDivElement>(null)

  const activePoint = data[activeIndex] || data[data.length - 1]

  // Calculate SVG dimensions
  const width = 800
  const height = 260
  const paddingX = 40
  const paddingBottom = 40
  const paddingTop = 20
  const chartHeight = height - paddingBottom - paddingTop
  const chartWidth = width - paddingX * 2

  const maxPipeline = Math.max(...data.map((d) => d.pipelineValue), 10000) * 1.15
  const maxOutreach = Math.max(...data.map((d) => d.outreachSent), 50) * 1.15

  // Coordinate generators
  const getX = (index: number) => paddingX + (index / (data.length - 1)) * chartWidth
  const getYPipeline = (val: number) => paddingTop + chartHeight - (val / maxPipeline) * chartHeight
  const getYOutreach = (val: number) => paddingTop + chartHeight - (val / maxOutreach) * chartHeight

  // Construct smooth bezier curve path
  const buildSmoothPath = (getYFunc: (val: number) => number, key: 'pipelineValue' | 'outreachSent') => {
    const points = data.map((d, i) => ({ x: getX(i), y: getYFunc(d[key]) }))
    if (points.length === 0) return ''

    let path = `M ${points[0].x} ${points[0].y}`
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i]
      const p1 = points[i + 1]
      const cpX1 = p0.x + (p1.x - p0.x) * 0.45
      const cpY1 = p0.y
      const cpX2 = p1.x - (p1.x - p0.x) * 0.45
      const cpY2 = p1.y
      path += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`
    }
    return path
  }

  const pipelineLinePath = buildSmoothPath(getYPipeline, 'pipelineValue')
  const pipelineAreaPath = `${pipelineLinePath} L ${getX(data.length - 1)} ${height - paddingBottom} L ${getX(0)} ${height - paddingBottom} Z`

  const outreachLinePath = buildSmoothPath(getYOutreach, 'outreachSent')
  const outreachAreaPath = `${outreachLinePath} L ${getX(data.length - 1)} ${height - paddingBottom} L ${getX(0)} ${height - paddingBottom} Z`

  const activeX = getX(activeIndex)
  const activeYPipeline = getYPipeline(activePoint.pipelineValue)
  const activeYOutreach = getYOutreach(activePoint.outreachSent)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const percent = Math.max(0, Math.min(1, (mouseX - (paddingX / width) * rect.width) / ((chartWidth / width) * rect.width)))
    const index = Math.round(percent * (data.length - 1))
    if (index >= 0 && index < data.length) {
      setActiveIndex(index)
    }
  }

  return (
    <div className={`card-depth p-5 sm:p-6 flex flex-col justify-between ${className}`}>
      {/* Header with KPI and active readout */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            <h3 className="text-sm sm:text-base font-sans font-bold text-white tracking-tight">
              Outreach Velocity & Pipeline Value
            </h3>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Weekly WhatsApp volume indexed against generated deal pipeline.
          </p>
        </div>

        {/* Dynamic Legend / Scrubber Readout */}
        <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl self-start sm:self-center">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="w-2 h-2 rounded-full bg-[#DAA640]" />
            <span className="text-zinc-400">Pipeline:</span>
            <span className="font-bold text-white">
              £{activePoint.pipelineValue.toLocaleString()}
            </span>
          </div>
          <div className="w-px h-3 bg-white/15" />
          <div className="flex items-center gap-1.5 text-xs">
            <span className="w-2 h-2 rounded-full bg-zinc-400" />
            <span className="text-zinc-400">Outreach:</span>
            <span className="font-bold text-white">{activePoint.outreachSent}</span>
          </div>
        </div>
      </div>

      {/* Interactive SVG Area Chart */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={(e) => {
          if (!containerRef.current || !e.touches[0]) return
          const rect = containerRef.current.getBoundingClientRect()
          const touchX = e.touches[0].clientX - rect.left
          const percent = Math.max(0, Math.min(1, touchX / rect.width))
          const index = Math.round(percent * (data.length - 1))
          if (index >= 0 && index < data.length) setActiveIndex(index)
        }}
        className="relative w-full cursor-crosshair select-none"
      >
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto max-h-[220px] overflow-visible"
        >
          <defs>
            {/* Pipeline Gold Gradient Fill */}
            <linearGradient id="pipelineAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#DAA640" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#DAA640" stopOpacity="0.0" />
            </linearGradient>

            {/* Outreach Zinc Gradient Fill */}
            <linearGradient id="outreachAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#71717A" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#71717A" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0.2, 0.5, 0.8].map((ratio) => {
            const y = paddingTop + chartHeight * ratio
            return (
              <line
                key={ratio}
                x1={paddingX}
                y1={y}
                x2={width - paddingX}
                y2={y}
                stroke="rgba(255, 255, 255, 0.05)"
                strokeDasharray="4 4"
              />
            )
          })}

          {/* Pipeline Area & Line */}
          <path d={pipelineAreaPath} fill="url(#pipelineAreaGrad)" />
          <path
            d={pipelineLinePath}
            fill="none"
            stroke="#DAA640"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Outreach Volume Area & Line */}
          <path d={outreachAreaPath} fill="url(#outreachAreaGrad)" />
          <path
            d={outreachLinePath}
            fill="none"
            stroke="#A1A1AA"
            strokeWidth="1.5"
            strokeDasharray="2 2"
            strokeLinecap="round"
          />

          {/* Active Vertical Scrubber Line */}
          <line
            x1={activeX}
            y1={paddingTop}
            x2={activeX}
            y2={height - paddingBottom}
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />

          {/* Active Intersection Dots */}
          <circle
            cx={activeX}
            cy={activeYPipeline}
            r="4.5"
            fill="#DAA640"
            stroke="#0B0B0D"
            strokeWidth="2"
          />
          <circle
            cx={activeX}
            cy={activeYOutreach}
            r="3.5"
            fill="#A1A1AA"
            stroke="#0B0B0D"
            strokeWidth="1.5"
          />
        </svg>

        {/* Floating Tooltip with bklit aesthetic */}
        <div
          className="absolute pointer-events-none transition-all duration-100 ease-out hidden sm:block"
          style={{
            left: `${(activeX / width) * 100}%`,
            top: `${(Math.min(activeYPipeline, activeYOutreach) / height) * 100 - 30}%`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className="bg-[#141417]/95 backdrop-blur-md border border-white/15 px-3 py-2 rounded-xl shadow-2xl text-[11px] min-w-[130px] space-y-1">
            <div className="font-mono font-bold text-white border-b border-white/10 pb-1 flex items-center justify-between">
              <span>{activePoint.date}</span>
              <span className="text-zinc-400 text-[10px]">{activePoint.label}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DAA640]" /> Pipeline
              </span>
              <span className="font-mono font-bold text-white">
                £{activePoint.pipelineValue.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" /> Outreach
              </span>
              <span className="font-mono font-bold text-zinc-200">
                {activePoint.outreachSent} sent
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* X-Axis Date Badges */}
      <div className="flex items-center justify-between px-2 sm:px-6 pt-2 border-t border-white/5">
        {data.map((point, i) => {
          const isActive = i === activeIndex
          return (
            <button
              key={point.date}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`text-[10px] sm:text-xs font-mono transition-all px-2 py-1 rounded-lg cursor-pointer ${
                isActive
                  ? 'bg-[#DAA640] text-black font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {point.date}
            </button>
          )
        })}
      </div>
    </div>
  )
}
