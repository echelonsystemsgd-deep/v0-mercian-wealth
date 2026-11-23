import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowLeft, Compass } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#08080A] text-white flex flex-col justify-between selection:bg-[#E2B857] selection:text-black">
      <Navbar />

      <main className="relative flex-1 flex items-center justify-center py-32 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        {/* Ambient radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#E2B857]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#121216] border border-[#E2B857]/40 text-[#E2B857] font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] chamfered-sm">
            <span className="w-1.5 h-1.5 bg-[#E2B857] animate-pulse" />
            <span>[ 404 · ROUTE UNREGISTERED ]</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold uppercase text-white tracking-wide leading-tight">
            System Coordinates <em className="italic font-normal text-[#E2B857]">Not Found</em>
          </h1>

          <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-400 max-w-md mx-auto leading-relaxed">
            The architectural endpoint you are attempting to access has either moved or requires elevated clearance. Return to the primary control interface below.
          </p>

          <div className="pt-4 flex items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#E2B857] hover:bg-[#F0C96E] text-black font-mono font-bold text-xs uppercase tracking-wider transition-all chamfered gold-glow"
            >
              <ArrowLeft size={14} />
              <span>RETURN TO WEALTH CORE ◆</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
