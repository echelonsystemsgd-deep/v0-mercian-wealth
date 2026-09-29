"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { BRAND_WATERMARK } from "@/lib/brand-assets"

interface WatermarkProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center" | "custom";
  className?: string;
  opacity?: number;
}

export function Watermark({ position = "center", className = "", opacity = 0.15 }: WatermarkProps) {
  // Always use static public/ path directly — no Supabase CMS dependency.
  // This ensures Vercel and localhost render identically.
  const src = BRAND_WATERMARK

  const getPositionClasses = () => {
    switch (position) {
      case "top-left": return "items-start justify-start";
      case "top-right": return "items-start justify-end";
      case "bottom-left": return "items-end justify-start";
      case "bottom-right": return "items-end justify-end";
      case "center": return "items-center justify-center";
      case "custom": return "";
      default: return "items-center justify-center";
    }
  }

  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none z-[-10] flex ${getPositionClasses()} ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: opacity, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative w-[280px] h-[280px] sm:w-[480px] sm:h-[480px] md:w-[700px] md:h-[700px] lg:w-[850px] lg:h-[850px] max-w-[90vw] max-h-[90vh] rounded-full overflow-hidden blur-[2px]"
      >
        <Image
          src={src}
          alt=""
          fill
          className="object-cover rounded-full"
          unoptimized
        />
      </motion.div>
    </div>
  )
}
