"use client"

import { motion } from "framer-motion"

interface PageHeaderProps {
  title: string
  subtitle: string
  highlight?: string
}

export function PageHeader({ title, subtitle, highlight }: PageHeaderProps) {
  return (
    <section className="relative pt-36 pb-16 lg:pt-48 lg:pb-24 overflow-hidden bg-[#09090B]">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[#09090B]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#DCAE53]/30 to-transparent" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#DCAE53]/5 rounded-full blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
            {title}{" "}
            {highlight && <span className="text-[#DCAE53]">{highlight}</span>}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
