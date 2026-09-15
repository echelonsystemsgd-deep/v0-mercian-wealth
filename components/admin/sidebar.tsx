'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { useState } from 'react'
import {
  LayoutDashboard,
  Inbox,
  Users,
  FolderKanban,
  Calendar,
  Settings,
  ScrollText,
  LogOut,
  ChevronRight,
  Menu,
  X,
  MessageSquare,
  Bell,
  Globe,
  Star,
  Image as ImageIcon,
  ShieldAlert,
  Briefcase,
  Terminal,
  ChevronDown,
  DollarSign,
  Receipt,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const sidebarGroups = [
  {
    title: 'Control Center',
    key: 'control',
    items: [
      { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/admin/messages', label: 'Message Desk', icon: MessageSquare },
      { href: '/admin/notifications', label: 'Notifications', icon: Bell },
    ]
  },
  {
    title: 'Pipelines & Revenue',
    key: 'pipeline',
    items: [
      { href: '/admin/leads', label: 'Leads', icon: Inbox },
      { href: '/admin/bookings', label: 'Bookings', icon: Calendar },
      { href: '/admin/quotes', label: 'Quotes & Invoices', icon: Receipt },
    ]
  },
  {
    title: 'Production Vault',
    key: 'production',
    items: [
      { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
      { href: '/admin/clients', label: 'Client Directory', icon: Users },
    ]
  },
  {
    title: 'Marketing Manager',
    key: 'marketing',
    items: [
      { href: '/admin/portfolio', label: 'Portfolio', icon: FolderKanban },
      { href: '/admin/testimonials', label: 'Testimonials', icon: Star },
      { href: '/admin/pricing', label: 'Pricing', icon: DollarSign },
      { href: '/admin/content', label: 'Content', icon: ScrollText },
    ]
  },
  {
    title: 'Core Engine',
    key: 'engine',
    items: [
      { href: '/admin/media', label: 'Media Library', icon: ImageIcon },
      { href: '/admin/settings', label: 'Settings', icon: Settings },
    ]
  }
]

import { useEffect } from 'react'

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false)
  const [adminProfile, setAdminProfile] = useState<any>(null)
  
  // Track open state of nested groupings
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    control: true,
    pipeline: true,
    production: true,
    marketing: true,
    engine: true
  })

  const toggleGroup = (group: string) => {
    setOpenGroups(prev => ({ ...prev, [group]: !prev[group] }))
  }

  const handleSignOut = async () => {
    const supabase = createClient()
    try {
      await supabase.auth.signOut()
    } catch {}
    // Clear all supabase auth tokens from localStorage
    try {
      const projectRef = process.env.NEXT_PUBLIC_SUPABASE_URL?.match(/https:\/\/([^.]+)/)?.[1]
      if (projectRef) {
        localStorage.removeItem(`sb-${projectRef}-auth-token`)
      }
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('sb-') && key.endsWith('-auth-token')) {
          localStorage.removeItem(key)
        }
      })
    } catch {}
    window.location.href = '/login'
  }

  useEffect(() => {
    const loadProfile = async () => {
      const supabaseClient = createClient()
      const { data: { user } } = await supabaseClient.auth.getUser()
      if (user) {
        const { data } = await supabaseClient
          .from('profiles')
          .select('full_name, avatar_url')
          .eq('id', user.id)
          .maybeSingle()
        
        let resolvedAvatar = null
        if (data?.avatar_url) {
          if (data.avatar_url.startsWith('http') || data.avatar_url.startsWith('data:')) {
            resolvedAvatar = data.avatar_url
          } else {
            const { data: signedData } = await supabaseClient.storage.from('avatars').createSignedUrl(data.avatar_url, 3600)
            if (signedData) resolvedAvatar = signedData.signedUrl
          }
        }

        setAdminProfile({
          full_name: data?.full_name || 'Administrator',
          avatar_url: resolvedAvatar,
          email: user.email
        })
      }
    }
    loadProfile()
  }, [])

  // Close sidebar on navigation change on mobile
  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <>
      {/* Floating Toggle Button for Mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-3 z-50 p-3 w-10 h-10 rounded-xl bg-[#0B0B0D] border border-white/10 text-white hover:bg-white/5 transition-all duration-200 cursor-pointer flex items-center justify-center"
        style={{
          left: isOpen ? '268px' : '16px'
        }}
      >
        {isOpen ? <X size={16} /> : <Menu size={16} />}
      </button>

      {/* Backdrop for Mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-xs z-30 transition-opacity duration-300"
        />
      )}

      <aside className={`flex flex-col h-dvh w-64 border-r border-white/10 bg-[#0B0B0D] fixed inset-y-0 z-40 transition-[left] duration-300 lg:left-auto ${isOpen ? 'left-0' : 'left-[-256px]'} lg:relative lg:left-0`}>
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9 shrink-0 rounded-lg overflow-hidden border border-white/10">
              <Image
                src="/Logo1.jpeg"
                alt="Mercian Wealth"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-sans text-sm font-bold text-white leading-tight">Mercian</p>
              <p className="text-[11px] text-zinc-400 font-mono">Operations</p>
            </div>
          </div>
        </div>

        {/* Console Switcher */}
        <div className="px-4 py-3 border-b border-white/10 relative shrink-0 z-50">
          <button
            onClick={() => setIsSwitcherOpen(!isSwitcherOpen)}
            className="w-full flex items-center justify-between gap-3 px-3 py-2 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-200 text-left cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-[#DAA640]/10 border border-[#DAA640]/25 flex items-center justify-center text-[#DAA640] shrink-0">
                <ShieldAlert size={14} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate">Operations Console</p>
              </div>
            </div>
            <ChevronDown size={12} className={`text-zinc-400 transition-transform duration-200 shrink-0 ${isSwitcherOpen ? 'rotate-180' : ''}`} />
          </button>

          {isSwitcherOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsSwitcherOpen(false)} />
              <div className="absolute left-4 right-4 mt-1 bg-[#141417] border border-white/10 rounded-xl p-2 z-50 space-y-1 animate-in fade-in slide-in-from-top-1 duration-150">
                <Link
                  href="/admin"
                  onClick={() => setIsSwitcherOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#DAA640]/10 border border-[#DAA640]/20 text-[#DAA640] text-xs font-medium transition-all"
                >
                  <ShieldAlert size={14} className="shrink-0 text-[#DAA640]" />
                  <span>Operations Console</span>
                </Link>

                <Link
                  href="/client"
                  onClick={() => setIsSwitcherOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 text-xs font-medium transition-all"
                >
                  <Briefcase size={14} className="shrink-0 text-zinc-400" />
                  <span>Client Portal</span>
                </Link>

                <Link
                  href="/dashboard"
                  onClick={() => setIsSwitcherOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 text-xs font-medium transition-all"
                >
                  <Terminal size={14} className="shrink-0 text-zinc-400" />
                  <span>Vetting Terminal</span>
                </Link>

                <div className="h-px bg-white/10 my-1" />

                <Link
                  href="/"
                  onClick={() => setIsSwitcherOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 text-xs font-medium transition-all"
                >
                  <Globe size={14} className="shrink-0 text-zinc-400" />
                  <span>Public Site</span>
                </Link>
              </div>
            </>
          )}
        </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-4 overflow-y-auto">
        {sidebarGroups.map((group) => {
          const isGroupOpen = openGroups[group.key]
          return (
            <div key={group.key} className="space-y-1">
              {/* Group Title Toggle */}
              <button
                type="button"
                onClick={() => toggleGroup(group.key)}
                className="w-full flex items-center justify-between px-3 py-1 text-[11px] font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer text-left"
              >
                <span>{group.title}</span>
                <ChevronDown
                  size={10}
                  className={`text-zinc-500 transition-transform duration-200 ${isGroupOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Group Items */}
              {isGroupOpen && (
                <div className="space-y-0.5 animate-in fade-in slide-in-from-top-1 duration-150">
                  {group.items.map(({ href, label, icon: Icon }) => {
                    const isActive = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)
                    return (
                      <Link
                        key={href}
                        href={href}
                        onClick={handleLinkClick}
                        className={`group flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                          isActive
                            ? 'bg-[#DAA640]/10 text-[#DAA640] border border-[#DAA640]/25'
                            : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
                        }`}
                      >
                        <Icon
                          size={14}
                          className={`shrink-0 transition-colors ${isActive ? 'text-[#DAA640]' : 'text-zinc-400 group-hover:text-white'}`}
                        />
                        <span className="flex-1 truncate">{label}</span>
                        {isActive && <ChevronRight size={12} className="text-[#DAA640]/50" />}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Footer Admin Profile Card */}
      <div className="px-4 py-3 border-t border-white/10 flex items-center justify-between gap-3 shrink-0 bg-white/[0.01]">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center relative shrink-0">
            {adminProfile?.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={adminProfile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <Users size={14} className="text-zinc-300" />
            )}
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-white truncate leading-none">
              {adminProfile?.full_name || 'Administrator'}
            </p>
            <p className="text-[9px] text-zinc-400 truncate mt-1 leading-none font-mono">
              {adminProfile?.email || 'admin@wealthapp.com'}
            </p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="p-2 rounded-lg hover:bg-rose-500/10 text-zinc-400 hover:text-rose-400 transition-all cursor-pointer shrink-0"
          title="Sign Out"
        >
          <LogOut size={14} />
        </button>
      </div>
    </aside>
    </>
  )
}
