import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  if (!id) {
    return NextResponse.json({ error: 'Lead identifier is required' }, { status: 400 })
  }

  // Use supabaseAdmin to allow access to the audit report view without session friction
  const supabase = supabaseAdmin || (await createClient())

  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)

  const query = supabase.from('leads').select('*')
  const { data: lead, error } = isUuid
    ? await query.eq('id', id).maybeSingle()
    : await query.ilike('business_name', `%${id}%`).maybeSingle()

  if (error || !lead) {
    return NextResponse.json({ error: 'Lead audit not found' }, { status: 404 })
  }

  return NextResponse.json({
    lead,
    timestamp: new Date().toISOString()
  })
}
