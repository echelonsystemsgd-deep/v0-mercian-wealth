'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  Search,
  Inbox,
  Calendar,
  Receipt,
  FolderKanban,
  Users,
  MessageSquare,
  Settings,
  Plus,
  FileSpreadsheet,
  ExternalLink,
  Zap,
  ArrowRight,
  Sparkles,
  Command as CommandIcon
} from 'lucide-react'
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from '@/components/ui/command'

interface SearchResult {
  id: string
  title: string
  subtitle: string
  type: 'lead' | 'client' | 'project' | 'quote'
  url: string
}

export function AdminCommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [searching, setSearching] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  // Global hotkey listener (Cmd+K or Ctrl+K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  // Live query Supabase when typing in command palette
  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setSearchResults([])
      return
    }

    const timer = setTimeout(async () => {
      setSearching(true)
      try {
        const [leadsRes, projectsRes, clientsRes] = await Promise.all([
          supabase
            .from('leads')
            .select('id, name, business_name, phone')
            .or(`name.ilike.%${query}%,business_name.ilike.%${query}%`)
            .limit(4),
          supabase
            .from('projects')
            .select('id, project_name, client_name')
            .or(`project_name.ilike.%${query}%,client_name.ilike.%${query}%`)
            .limit(3),
          supabase
            .from('profiles')
            .select('id, full_name, email')
            .or(`full_name.ilike.%${query}%,email.ilike.%${query}%`)
            .limit(3),
        ])

        const results: SearchResult[] = []

        if (leadsRes.data) {
          leadsRes.data.forEach((lead) => {
            results.push({
              id: `lead-${lead.id}`,
              title: lead.business_name || lead.name,
              subtitle: `Lead · ${lead.phone || lead.name}`,
              type: 'lead',
              url: `/admin/leads/${lead.id}`,
            })
          })
        }

        if (projectsRes.data) {
          projectsRes.data.forEach((proj) => {
            results.push({
              id: `proj-${proj.id}`,
              title: proj.project_name,
              subtitle: `Project · ${proj.client_name}`,
              type: 'project',
              url: `/admin/projects/${proj.id}`,
            })
          })
        }

        if (clientsRes.data) {
          clientsRes.data.forEach((client) => {
            results.push({
              id: `client-${client.id}`,
              title: client.full_name || 'Client',
              subtitle: `Client · ${client.email}`,
              type: 'client',
              url: `/admin/clients`,
            })
          })
        }

        setSearchResults(results)
      } catch (err) {
        console.error('Command search error:', err)
      } finally {
        setSearching(false)
      }
    }, 200)

    return () => clearTimeout(timer)
  }, [query, supabase])

  const handleSelect = useCallback((url: string) => {
    setOpen(false)
    router.push(url)
  }, [router])

  return (
    <>
      {/* Top Header Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-zinc-400 hover:text-white transition-all cursor-pointer group"
        title="Open Command Palette (Ctrl+K)"
      >
        <Search size={13} className="text-zinc-500 group-hover:text-[#DAA640] transition-colors" />
        <span className="hidden sm:inline">Search admin or jump to…</span>
        <span className="sm:hidden">Search…</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-500 group-hover:text-zinc-300">
          <CommandIcon size={10} />K
        </kbd>
      </button>

      {/* Command Dialog */}
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Command Palette"
        description="Search records, switch pipelines, or trigger instant actions."
        className="bg-[#0B0B0D] border border-white/15 text-white max-w-xl"
      >
        <CommandInput
          placeholder="Search leads, projects, clients, or type a command…"
          value={query}
          onValueChange={setQuery}
          className="text-white placeholder:text-zinc-500"
        />
        <CommandList className="max-h-[350px] p-2 space-y-2">
          <CommandEmpty className="py-6 text-center text-xs text-zinc-500">
            {searching ? 'Searching database...' : 'No matching records found.'}
          </CommandEmpty>

          {/* Database search results if query typed */}
          {searchResults.length > 0 && (
            <CommandGroup heading="Database Records">
              {searchResults.map((item) => (
                <CommandItem
                  key={item.id}
                  onSelect={() => handleSelect(item.url)}
                  className="px-3 py-2 rounded-xl hover:bg-[#141417] text-xs cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    {item.type === 'lead' ? (
                      <Inbox size={14} className="text-[#DAA640]" />
                    ) : item.type === 'project' ? (
                      <FolderKanban size={14} className="text-sky-400" />
                    ) : (
                      <Users size={14} className="text-emerald-400" />
                    )}
                    <div>
                      <p className="font-semibold text-white">{item.title}</p>
                      <p className="text-[10px] text-zinc-400">{item.subtitle}</p>
                    </div>
                  </div>
                  <ArrowRight size={12} className="text-zinc-500" />
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {/* Quick Actions */}
          <CommandGroup heading="Quick Actions">
            <CommandItem
              onSelect={() => handleSelect('/admin/leads?queue=ready_to_whatsapp')}
              className="px-3 py-2 rounded-xl hover:bg-[#141417] text-xs cursor-pointer flex items-center gap-2.5"
            >
              <Zap size={14} className="text-amber-400" />
              <span>Start Daily Outreach Sprint</span>
            </CommandItem>
            <CommandItem
              onSelect={() => handleSelect('/admin/leads?action=new')}
              className="px-3 py-2 rounded-xl hover:bg-[#141417] text-xs cursor-pointer flex items-center gap-2.5"
            >
              <Plus size={14} className="text-[#DAA640]" />
              <span>Create New Lead</span>
            </CommandItem>
            <CommandItem
              onSelect={() => handleSelect('/admin/quotes')}
              className="px-3 py-2 rounded-xl hover:bg-[#141417] text-xs cursor-pointer flex items-center gap-2.5"
            >
              <Receipt size={14} className="text-emerald-400" />
              <span>Draft Client Quote / Invoice</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator className="bg-white/5 my-1" />

          {/* Navigation Shortcuts */}
          <CommandGroup heading="Navigation">
            {[
              { label: 'Command Center Dashboard', url: '/admin', icon: Sparkles },
              { label: 'Lead Outreach Ledger', url: '/admin/leads', icon: Inbox },
              { label: 'Bookings & Strategy Sessions', url: '/admin/bookings', icon: Calendar },
              { label: 'Quotes & Invoices', url: '/admin/quotes', icon: Receipt },
              { label: 'Projects Vault', url: '/admin/projects', icon: FolderKanban },
              { label: 'Client Directory', url: '/admin/clients', icon: Users },
              { label: 'Messages Desk', url: '/admin/messages', icon: MessageSquare },
              { label: 'Admin Settings', url: '/admin/settings', icon: Settings },
            ].map((nav) => {
              const NavIcon = nav.icon
              return (
                <CommandItem
                  key={nav.url}
                  onSelect={() => handleSelect(nav.url)}
                  className="px-3 py-2 rounded-xl hover:bg-[#141417] text-xs cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <NavIcon size={14} className="text-zinc-400" />
                    <span>{nav.label}</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">{nav.url}</span>
                </CommandItem>
              )
            })}
          </CommandGroup>

          <CommandSeparator className="bg-white/5 my-1" />

          {/* External Links */}
          <CommandGroup heading="External">
            <CommandItem
              onSelect={() => {
                setOpen(false)
                window.open('/', '_blank')
              }}
              className="px-3 py-2 rounded-xl hover:bg-[#141417] text-xs cursor-pointer flex items-center gap-2.5"
            >
              <ExternalLink size={14} className="text-zinc-400" />
              <span>View Public Mercian Wealth Website</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
