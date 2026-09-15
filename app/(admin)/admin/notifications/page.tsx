'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import {
  Bell,
  Trash2,
  Check,
  Send,
  Loader2,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertCircle,
  Inbox,
  User,
  Plus,
  X
} from 'lucide-react'

type NotificationRecord = {
  id: string
  user_id: string
  title: string
  description: string
  link: string
  is_read: boolean
  created_at: string
  profiles?: {
    full_name: string | null
    email: string | null
    role: string
  } | null
}

type UserProfile = {
  id: string
  full_name: string | null
  email: string | null
  role: string
}

const FILTER_TABS = [
  { id: 'all', label: 'All Dispatches' },
  { id: 'unread', label: 'Unread Only' },
  { id: 'read', label: 'Read Only' }
] as const

export default function NotificationsPage() {
  const supabase = createClient()
  const [notifications, setNotifications] = useState<NotificationRecord[]>([])
  const [users, setUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)
  
  // Dispatch form states
  const [showDispatchModal, setShowDispatchModal] = useState(false)
  const [dispatching, setDispatching] = useState(false)
  const [form, setForm] = useState({
    userId: '',
    title: '',
    description: '',
    link: '/client'
  })

  const triggerToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      // 1. Fetch notifications with defensive join
      let notificationsData: any[] = []
      const { data: primaryData, error: notifErr } = await supabase
        .from('user_notifications')
        .select(`
          id, user_id, title, description, link, is_read, created_at,
          profiles(full_name, email, role)
        `)
        .order('created_at', { ascending: false })

      if (notifErr) {
        // Fallback without join to guarantee UI stability
        const { data: fallbackData } = await supabase
          .from('user_notifications')
          .select('id, user_id, title, description, link, is_read, created_at')
          .order('created_at', { ascending: false })
        notificationsData = fallbackData ?? []
      } else {
        notificationsData = primaryData ?? []
      }

      setNotifications(notificationsData)

      // 2. Fetch clients & users for dispatch selector
      const { data: profilesData, error: profErr } = await supabase
        .from('profiles')
        .select('id, full_name, email, role')
        .neq('role', 'admin')
        .eq('is_suspended', false)
        .order('role', { ascending: true })

      if (profErr) throw profErr
      setUsers((profilesData as any) ?? [])
    } catch (err: any) {
      triggerToast(err.message || 'Error fetching records.', 'error')
    } finally {
      setLoading(false)
    }
  }, [supabase])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleMarkAsRead = async (id: string, isRead: boolean) => {
    try {
      const { error } = await supabase
        .from('user_notifications')
        .update({ is_read: isRead })
        .eq('id', id)

      if (error) throw error
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: isRead } : n))
      )
      triggerToast(isRead ? 'Notification marked as read.' : 'Notification marked as unread.')
    } catch (err: any) {
      triggerToast(err.message || 'Operation failed.', 'error')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this notification?')) return
    try {
      const { error } = await supabase
        .from('user_notifications')
        .delete()
        .eq('id', id)

      if (error) throw error
      setNotifications((prev) => prev.filter((n) => n.id !== id))
      triggerToast('Notification permanently deleted.')
    } catch (err: any) {
      triggerToast(err.message || 'Deletion failed.', 'error')
    }
  }

  const handleDispatch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.userId || !form.title || !form.description) {
      triggerToast('Please fill in all required fields.', 'error')
      return
    }

    setDispatching(true)
    try {
      const { error } = await supabase.from('user_notifications').insert({
        user_id: form.userId,
        title: form.title,
        description: form.description,
        link: form.link || '/client',
        is_read: false
      })

      if (error) throw error
      triggerToast('Notification dispatched successfully.')
      setShowDispatchModal(false)
      setForm({ userId: '', title: '', description: '', link: '/client' })
      fetchData()
    } catch (err: any) {
      triggerToast(err.message || 'Failed to dispatch notification.', 'error')
    } finally {
      setDispatching(false)
    }
  }

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'unread') return !n.is_read
    if (filter === 'read') return n.is_read
    return true
  })

  const unreadCount = notifications.filter(n => !n.is_read).length

  return (
    <div className="space-y-6 sm:space-y-8 relative">
      {/* Toast Alert */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl border text-sm font-medium shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200 ${
          toast.type === 'error'
            ? 'bg-red-500/15 border-red-500/30 text-red-400'
            : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
        }`}>
          {toast.type === 'error' ? <AlertCircle size={15} /> : <CheckCircle2 size={15} />}
          <span>{toast.msg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#DAA640] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DAA640]" />
            <span>Communication Dispatch</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">Notification Logs</h1>
          <p className="text-sm text-zinc-400">
            Audit client-side messages and dispatch broadcast announcements.
          </p>
        </div>
        <button
          onClick={() => setShowDispatchModal(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] text-xs font-semibold rounded-xl bg-[#DAA640] text-black hover:bg-[#c49535] transition-colors cursor-pointer self-start sm:self-center"
        >
          <Plus size={15} />
          <span>Dispatch Alert</span>
        </button>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="bg-[#0B0B0D] border border-white/10 rounded-2xl p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">Total Dispatches</span>
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-white mt-2 font-sans">{notifications.length}</p>
        </div>
        <div className="bg-[#0B0B0D] border border-white/10 rounded-2xl p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">Unread Alerts</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-white mt-2 font-sans">{unreadCount}</p>
        </div>
        <div className="col-span-2 sm:col-span-1 bg-[#0B0B0D] border border-white/10 rounded-2xl p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">Active Recipients</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-white mt-2 font-sans">{users.length}</p>
        </div>
      </div>

      {/* Motion Segmented Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-[#141417] border border-white/10 rounded-xl overflow-x-auto">
        {FILTER_TABS.map((t) => {
          const count = t.id === 'all'
            ? notifications.length
            : t.id === 'unread'
            ? unreadCount
            : notifications.length - unreadCount

          return (
            <button
              key={t.id}
              onClick={() => setFilter(t.id)}
              className="relative px-4 py-2 min-h-[40px] text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2"
            >
              {filter === t.id && (
                <motion.div
                  layoutId="activeNotifFilter"
                  className="absolute inset-0 bg-[#0B0B0D] border border-white/10 rounded-lg shadow-sm"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              <span className={`relative z-10 ${filter === t.id ? 'text-white' : 'text-zinc-400 hover:text-white'}`}>
                {t.label}
              </span>
              <span className={`relative z-10 text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                filter === t.id ? 'bg-white/10 text-white' : 'bg-white/5 text-zinc-500'
              }`}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Content Container */}
      {loading ? (
        <div className="bg-[#0B0B0D] rounded-2xl border border-white/10 p-12 flex flex-col items-center justify-center space-y-3">
          <Loader2 size={28} className="text-[#DAA640] animate-spin" />
          <p className="text-xs text-zinc-400 font-mono">Syncing notification dispatches...</p>
        </div>
      ) : filteredNotifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center px-6 bg-[#0B0B0D] rounded-2xl border border-white/10 max-w-md mx-auto space-y-4">
          <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-zinc-400">
            <Inbox size={20} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Dispatches Clear</h3>
            <p className="text-xs text-zinc-400 mt-1">No notification records matching this filter criteria.</p>
          </div>
          <button
            onClick={() => setShowDispatchModal(true)}
            className="px-4 py-2 min-h-[40px] text-xs font-semibold rounded-xl bg-[#DAA640] text-black hover:bg-[#c49535] transition-colors cursor-pointer"
          >
            Dispatch Custom Alert
          </button>
        </div>
      ) : (
        <div className="bg-[#0B0B0D] rounded-2xl border border-white/10 overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.01] text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                  <th className="px-6 py-3.5">Recipient</th>
                  <th className="px-6 py-3.5">Notification Title</th>
                  <th className="px-6 py-3.5">Description Preview</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Sent Date</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {filteredNotifications.map((notif) => (
                  <tr key={notif.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-xs font-semibold text-white">{notif.profiles?.full_name || 'System User'}</p>
                        <p className="text-[11px] text-zinc-400 font-mono">{notif.profiles?.email || 'N/A'}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs font-semibold text-white truncate max-w-[220px]" title={notif.title}>
                        {notif.title}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs text-zinc-400 leading-normal truncate max-w-[280px]" title={notif.description}>
                        {notif.description}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 text-xs text-zinc-300">
                        <span className={`w-1.5 h-1.5 rounded-full ${notif.is_read ? 'bg-emerald-500' : 'bg-amber-400 animate-pulse'}`} />
                        {notif.is_read ? 'Read' : 'Unread'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-zinc-400 font-mono">
                      {new Date(notif.created_at).toLocaleDateString('en-GB')} {new Date(notif.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleMarkAsRead(notif.id, !notif.is_read)}
                          className="p-2 rounded-lg bg-white/[0.03] border border-white/10 text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
                          title={notif.is_read ? 'Mark as Unread' : 'Mark as Read'}
                        >
                          <Check size={13} />
                        </button>
                        <button
                          onClick={() => handleDelete(notif.id)}
                          className="p-2 rounded-lg bg-white/[0.03] border border-white/10 text-red-400 hover:bg-red-500/10 hover:border-red-500/30 transition-colors cursor-pointer"
                          title="Delete Log"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="block md:hidden divide-y divide-white/5">
            {filteredNotifications.map((notif) => (
              <div key={notif.id} className="p-4 space-y-3 hover:bg-white/[0.02] transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{notif.title}</p>
                    <p className="text-xs text-zinc-400 mt-0.5">{notif.profiles?.full_name || 'System User'}</p>
                    <p className="text-[11px] text-zinc-500 font-mono truncate">{notif.profiles?.email}</p>
                  </div>
                  <span className="shrink-0 inline-flex items-center gap-1.5 text-xs text-zinc-300 bg-white/[0.03] border border-white/10 px-2 py-1 rounded-md">
                    <span className={`w-1.5 h-1.5 rounded-full ${notif.is_read ? 'bg-emerald-500' : 'bg-amber-400 animate-pulse'}`} />
                    {notif.is_read ? 'Read' : 'Unread'}
                  </span>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed line-clamp-2">{notif.description}</p>

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="text-[11px] text-zinc-400 font-mono">
                    {new Date(notif.created_at).toLocaleDateString('en-GB')} {new Date(notif.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleMarkAsRead(notif.id, !notif.is_read)}
                      className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                      title={notif.is_read ? 'Mark as Unread' : 'Mark as Read'}
                    >
                      <Check size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(notif.id)}
                      className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                      title="Delete Log"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DISPATCH NEW ALERT MODAL */}
      <AnimatePresence>
        {showDispatchModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#0B0B0D] border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-6 space-y-5"
            >
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-base font-serif font-bold text-white">Dispatch Custom Alert</h2>
                  <p className="text-xs text-zinc-400 mt-0.5">Send a real-time notification to a client's dashboard.</p>
                </div>
                <button
                  onClick={() => setShowDispatchModal(false)}
                  className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleDispatch} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">Recipient Profile *</label>
                  <select
                    required
                    value={form.userId}
                    onChange={(e) => setForm({ ...form, userId: e.target.value })}
                    className="w-full bg-[#141417] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white outline-none focus:border-white/20 transition-colors cursor-pointer [color-scheme:dark]"
                  >
                    <option value="" className="bg-[#0B0B0D]">-- Select Client / User --</option>
                    {users.map((u) => (
                      <option key={u.id} value={u.id} className="bg-[#0B0B0D]">
                        {u.full_name || 'Anonymous'} ({u.email}) - {u.role.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">Notification Title *</label>
                  <input
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. Design Proposal Ready for Review"
                    className="w-full bg-[#141417] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 outline-none focus:border-white/20 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">Description *</label>
                  <textarea
                    required
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Details explaining the purpose of this notification..."
                    rows={3}
                    className="w-full bg-[#141417] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 outline-none focus:border-white/20 transition-colors resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">Action Link (Optional)</label>
                  <input
                    value={form.link}
                    onChange={(e) => setForm({ ...form, link: e.target.value })}
                    placeholder="/client"
                    className="w-full bg-[#141417] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 outline-none focus:border-white/20 transition-colors font-mono"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setShowDispatchModal(false)}
                    className="px-4 py-2.5 min-h-[44px] text-xs font-semibold text-zinc-400 hover:text-white rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={dispatching}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] text-xs font-semibold bg-[#DAA640] text-black rounded-xl hover:bg-[#c49535] transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {dispatching ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                    <span>{dispatching ? 'Dispatching...' : 'Send Alert'}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
