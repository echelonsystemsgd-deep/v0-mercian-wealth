"use client"

import Image, { type ImageProps } from "next/image"
import { useState } from "react"
import {
  BRAND_LOGO,
  BRAND_WATERMARK,
} from "@/lib/brand-assets"

type BrandLogoProps = Omit<ImageProps, "src" | "alt"> & {
  variant?: "logo" | "watermark"
  alt?: string
  /** When true, always shows the text wordmark regardless of image asset status */
  wordmarkOnly?: boolean
}

/**
 * WordmarkLogo — text fallback used when wordmarkOnly is explicitly requested.
 */
function WordmarkLogo({ className }: { className?: string }) {
  return (
    <span
      className={className}
      aria-label="Mercian Wealth Automation"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.4em",
        fontFamily: "'Inter', system-ui, sans-serif",
        letterSpacing: "0.08em",
        lineHeight: 1,
        userSelect: "none",
        fontWeight: 800,
        textTransform: "uppercase",
      }}
    >
      <span style={{ color: "#FFFFFF", fontSize: "inherit" }}>Mercian</span>
      <span
        style={{
          color: "#DCAE53",
          fontSize: "inherit",
          fontWeight: 800,
        }}
      >
        Wealth
      </span>
      <span
        style={{
          color: "#FFFFFF",
          fontSize: "0.8em",
          opacity: 0.85,
          fontWeight: 600,
          letterSpacing: "0.1em",
        }}
      >
        Automation
      </span>
    </span>
  )
}

function ModernBrandBadge({ className }: { className?: string }) {
  return (
    <div className={`h-full w-full rounded-lg bg-[#111115] border border-[#DCAE53]/40 flex items-center justify-center gap-2 px-3 py-1.5 shadow-lg shadow-black/50 ${className || ""}`}>
      {/* Geometric Bowtie / Hourglass MW Icon */}
      <svg className="w-5 h-5 text-[#DCAE53] shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 4h16l-8 7.5L4 4zm0 16h16l-8-7.5L4 20z" opacity="0.9" />
        <circle cx="12" cy="11.5" r="1.5" fill="#DCAE53" />
      </svg>
      <span className="font-sans font-extrabold text-xs tracking-widest text-white uppercase">Mercian Wealth Automation</span>
    </div>
  )
}

export function BrandLogo({
  variant = "logo",
  alt = "Mercian Wealth",
  wordmarkOnly = false,
  className,
  ...props
}: BrandLogoProps) {
  const [imgError, setImgError] = useState(false)
  const src = variant === "watermark" ? BRAND_WATERMARK : BRAND_LOGO

  if (wordmarkOnly) {
    return <WordmarkLogo className={className as string | undefined} />
  }

  if (imgError) {
    return <ModernBrandBadge className={className as string | undefined} />
  }

  const hasFill = (props as any).fill
  const imgWidth = hasFill ? undefined : (props as any).width || 140
  const imgHeight = hasFill ? undefined : (props as any).height || 40

  return (
    <Image
      {...(hasFill ? {} : { width: imgWidth, height: imgHeight })}
      {...props}
      src={src}
      alt={alt}
      className={className}
      onError={() => setImgError(true)}
      unoptimized
    />
  )
}
