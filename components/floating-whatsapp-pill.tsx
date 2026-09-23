"use client"

import { motion } from "framer-motion"
import { MessageSquare, ArrowUpRight } from "lucide-react"

export function FloatingWhatsAppPill() {
  const whatsappUrl =
    "https://wa.me/447851055929?text=Hi%20Gurtej%2C%20I%20saw%20the%20Mercian%20Wealth%20platform%20and%20would%20like%20to%20discuss%20a%20free%20working%20prototype%20for%20my%20business."

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-40 font-sans"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Line with Gurtej"
        className="group relative flex items-center gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full bg-[#0E0E12]/95 border border-[#DAA640]/40 hover:border-[#DAA640] text-white shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_25px_rgba(218,166,64,0.3)] hover:scale-[1.03] active:scale-95 cursor-pointer"
      >
        {/* Pulsing Emerald Live Indicator */}
        <div className="relative flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black transition-colors">
            <MessageSquare size={15} />
          </div>
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-black animate-pulse" />
        </div>

        {/* Text Details */}
        <div className="text-left pr-1">
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-white group-hover:text-[#DAA640] transition-colors">
              WhatsApp Gurtej
            </span>
            <ArrowUpRight size={12} className="text-zinc-400 group-hover:text-white transition-colors" />
          </div>
          <p className="text-[10px] font-mono text-zinc-400 leading-tight">
            Direct Line · &lt;15m Reply
          </p>
        </div>
      </a>
    </motion.div>
  )
}
