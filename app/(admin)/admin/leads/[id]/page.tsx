import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { LeadWorkspaceClient } from './lead-workspace-client'

export const dynamic = 'force-dynamic'

export default async function LeadWorkspacePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: lead, error } = await supabase
    .from('leads')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !lead) redirect('/admin/leads')

  const { data: sessions } = await supabase
    .from('strategy_sessions')
    .select('*')
    .eq('lead_id', id)
    .order('scheduled_at', { ascending: false })

  const { data: activities } = await supabase
    .from('activity_logs')
    .select('*')
    .eq('target_id', id)
    .eq('target_table', 'leads')
    .order('created_at', { ascending: false })
    .limit(50)

  return (
    <LeadWorkspaceClient
      lead={lead}
      sessions={sessions || []}
      activities={activities || []}
    />
  )
}
