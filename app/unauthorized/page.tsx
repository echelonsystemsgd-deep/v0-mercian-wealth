'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShieldAlert, ArrowLeft, Home, Lock, LogIn, LogOut, ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { BrandLogo } from '@/components/brand-logo'

export default function UnauthorizedPage() {
  const router = useRouter()
  const [userRole, setUserRole] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkRole = async () => {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          setIsAuthenticated(true)
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single()

          if (profile?.role) {
            setUserRole(profile.role)
          }
        }
      } catch (err) {
        console.error('Error checking user session:', err)
      } finally {
        setLoading(false)
      }
    }
    checkRole()
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-[#09090B] text-[#F0EDE6] relative overflow-hidden flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full bg-red-500/5 blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[360px] h-[360px] rounded-full bg-[#DCAE53]/5 blur-[120px]" />
      </div>

      <div className="max-w-lg w-full relative z-10 text-center space-y-7 bg-[#111115] border border-red-500/25 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
        {/* Brand Monogram */}
        <div className="flex justify-center">
          <div className="relative h-12 w-12 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
            <BrandLogo variant="logo" alt="Mercian Wealth" fill className="object-cover" priority />
          </div>
        </div>

        {/* Security Shield Icon with pulse */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shadow-[0_0_30px_rgba(239,68,68,0.15)]">
          <ShieldAlert size={32} className="animate-pulse" />
        </div>

        {/* Text Details */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/25 text-red-400 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest">
            <Lock size={12} />
            <span>Restricted Operator Zone</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Access Restricted
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
            This administration terminal is reserved strictly for authorized Mercian Wealth systems engineers and operators. Client accounts and unauthenticated visitors do not have access privileges here.
          </p>
        </div>

        {/* Warning Callout Box */}
        <div className="p-3.5 rounded-xl bg-[#18181F] border border-white/10 text-left flex items-start gap-3">
          <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[#DCAE53] shrink-0 mt-0.5">
            <Lock size={14} />
          </div>
          <div className="text-[11px] leading-relaxed text-slate-300">
            <span className="font-semibold text-white">Looking for your quote or invoice?</span> Use the private link provided directly to you via email or WhatsApp. No operator login is required to review or pay invoices.
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {/* Primary Action: Back to Home */}
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#DCAE53] hover:bg-[#E5B85C] text-[#09090B] font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-[#DCAE53]/20 text-center cursor-pointer"
          >
            <Home size={15} />
            <span>Return to Main Site</span>
          </Link>

          {/* If authenticated client, show client portal link */}
          {isAuthenticated && userRole === 'client' && (
            <Link
              href="/client"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[#DCAE53]/30 hover:border-[#DCAE53]/60 bg-[#18181F] text-[#DCAE53] font-semibold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all duration-200 text-center"
            >
              <span>Client Portal</span>
              <ArrowRight size={15} />
            </Link>
          )}

          {/* Staff Login fallback */}
          {!isAuthenticated ? (
            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 bg-[#18181F] text-slate-300 hover:text-white font-semibold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all duration-200 text-center"
            >
              <LogIn size={15} />
              <span>Operator Sign In</span>
            </Link>
          ) : (
            <button
              onClick={handleSignOut}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 bg-[#18181F] text-slate-300 hover:text-white font-semibold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all duration-200 text-center cursor-pointer"
            >
              <LogOut size={15} />
              <span>Sign Out</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
