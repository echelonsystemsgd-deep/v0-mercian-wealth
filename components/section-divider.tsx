"use client"

import { motion } from "framer-motion"

interface SectionDividerProps {
  id?: string
  chapter?: string
  title?: string
  className?: string
}

export function SectionDivider({ id, chapter, title, className = "" }: SectionDividerProps) {
  return (
    <div id={id} className={`relative w-full py-4 sm:py-8 flex items-center justify-center overflow-hidden z-20 ${className}`}>
      {/* Background Ambient Radial Glow */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-40"
        style={{
          background: "radial-gradient(circle at center, rgba(220, 174, 83, 0.08) 0%, rgba(9, 9, 11, 0) 70%)"
        }}
      />

      {/* Hairline Border with Gold Gradient */}
      <div className="absolute left-0 right-0 top-1/2 h-[1px] -translate-y-1/2 bg-gradient-to-r from-transparent via-[#DCAE53]/35 to-transparent" />
      
      {/* Centered Chapter Badge */}
      {chapter && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="relative px-4 sm:px-6 py-1.5 rounded-full bg-[#111115] border border-[#DCAE53]/30 shadow-[0_0_20px_rgba(220,174,83,0.15)] flex items-center justify-center gap-2.5 z-10 backdrop-blur-md max-w-[90%] sm:max-w-full text-center"
        >
          {/* Geometric bowtie icon */}
          <svg className="w-3 h-3 text-[#DCAE53] shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 4h16l-8 7.5L4 4zm0 16h16l-8-7.5L4 20z" />
          </svg>
          <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-[#DCAE53] truncate sm:whitespace-normal">
            SYSTEM {chapter} {title ? `· ${title}` : ""}
          </span>
          <svg className="w-3 h-3 text-[#DCAE53] shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 4h16l-8 7.5L4 4zm0 16h16l-8-7.5L4 20z" />
          </svg>
        </motion.div>
      )}
    </div>
  )
}
