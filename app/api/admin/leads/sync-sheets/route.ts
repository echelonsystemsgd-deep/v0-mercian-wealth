import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ladebhmyywkcqtyazxxk.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhZGViaG15eXdrY3F0eWF6eHhrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTY4NTAzNSwiZXhwIjoyMDk3MjYxMDM1fQ.m_FBVwQCgj9OWqz1dajV7pGpoA5yF1Hyir71gibCKEE'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Mode 1: Delete a specific lead by phone or business name
    if (body.action === 'delete_lead' || body.action === 'delete') {
      const { phone, business_name } = body

      let query = supabase.from('leads').delete()

      if (phone) {
        query = query.eq('phone', phone)
      } else if (business_name) {
        query = query.eq('business_name', business_name)
      } else {
        return NextResponse.json({ error: 'phone or business_name required' }, { status: 400 })
      }

      const { data, error } = await query.select()
      if (error) throw error

      return NextResponse.json({
        success: true,
        deleted: data?.length || 0,
        message: `Deleted ${data?.length || 0} matching lead(s) from backend.`
      })
    }

    // Mode 2: Reconcile active leads from Google Sheets (deletes leads no longer present in sheet)
    if (body.action === 'reconcile' && Array.isArray(body.active_phones)) {
      const activePhones = body.active_phones.map((p: string) => String(p).trim()).filter(Boolean)

      // Get all outreach leads
      const { data: outreachLeads, error: fetchErr } = await supabase
        .from('leads')
        .select('id, phone, business_name')
        .eq('source', 'google_maps_outreach')

      if (fetchErr) throw fetchErr

      // Find leads whose phones are no longer in activePhones
      const idsToDelete = (outreachLeads || [])
        .filter(lead => lead.phone && !activePhones.includes(lead.phone))
        .map(lead => lead.id)

      if (idsToDelete.length > 0) {
        const { error: delErr } = await supabase
          .from('leads')
          .delete()
          .in('id', idsToDelete)

        if (delErr) throw delErr
      }

      return NextResponse.json({
        success: true,
        deleted_count: idsToDelete.length,
        message: `Synced with Google Sheets: removed ${idsToDelete.length} deleted leads from backend.`
      })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (err: any) {
    console.error('Error syncing leads with Google Sheets:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
