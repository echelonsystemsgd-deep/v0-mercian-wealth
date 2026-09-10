import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateQuoteNumber } from '@/lib/quotes'
import crypto from 'crypto'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { data: quotes, error } = await supabase
    .from('quotes')
    .select(`
      *,
      items:quote_items(*)
    `)
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ quotes })
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const body = await req.json()
    const {
      client_id,
      client_name,
      client_business,
      client_email,
      client_phone,
      client_address,
      items = [],
      rev_share_percentage = 0,
      projected_client_sales = 0,
      deposit_type = 'milestone_50',
      custom_deposit = null,
      scope_notes = '',
    } = body

    if (!client_name) {
      return NextResponse.json({ error: 'Client name is required' }, { status: 400 })
    }

    // Calculate subtotals
    let oneTimeSubtotal = 0
    let monthlySubtotal = 0

    items.forEach((item: any) => {
      const price = Number(item.unit_price) || 0
      const qty = Number(item.quantity) || 1
      if (item.billing_interval === 'monthly') {
        monthlySubtotal += price * qty
      } else if (item.billing_interval === 'one_time') {
        oneTimeSubtotal += price * qty
      }
    })

    const estimatedRevShareMonthly = (Number(projected_client_sales) * (Number(rev_share_percentage) / 100)) || 0

    // Deposit calculation
    let depositRequired = 0
    if (deposit_type === 'milestone_50') {
      depositRequired = Math.round(oneTimeSubtotal * 0.5)
    } else if (deposit_type === 'milestone_25') {
      depositRequired = Math.round(oneTimeSubtotal * 0.25)
    } else if (deposit_type === 'fixed' && custom_deposit !== null) {
      depositRequired = Number(custom_deposit)
    } else {
      depositRequired = oneTimeSubtotal
    }

    const quoteNumber = generateQuoteNumber()
    const secureToken = crypto.randomBytes(24).toString('hex')

    // Insert Quote
    const { data: quote, error: quoteError } = await supabase
      .from('quotes')
      .insert({
        quote_number: quoteNumber,
        secure_token: secureToken,
        client_id: client_id || null,
        client_name,
        client_business: client_business || null,
        client_email: client_email || null,
        client_phone: client_phone || null,
        client_address: client_address || null,
        status: 'draft',
        one_time_subtotal: oneTimeSubtotal,
        monthly_subtotal: monthlySubtotal,
        rev_share_percentage: Number(rev_share_percentage) || 0,
        projected_client_sales: Number(projected_client_sales) || 0,
        estimated_rev_share_monthly: estimatedRevShareMonthly,
        deposit_required: depositRequired,
        deposit_type,
        scope_notes,
        valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      })
      .select()
      .single()

    if (quoteError || !quote) {
      return NextResponse.json({ error: quoteError?.message || 'Failed to create quote' }, { status: 500 })
    }

    // Insert Items
    if (items.length > 0) {
      const quoteItemsData = items.map((item: any) => ({
        quote_id: quote.id,
        catalog_item_id: item.catalog_item_id || null,
        item_type: item.item_type || 'catalog',
        name: item.name,
        description: item.description || null,
        unit_price: Number(item.unit_price) || 0,
        quantity: Number(item.quantity) || 1,
        billing_interval: item.billing_interval || 'one_time',
        rev_share_pct: Number(item.rev_share_pct) || 0,
      }))

      const { error: itemsError } = await supabase
        .from('quote_items')
        .insert(quoteItemsData)

      if (itemsError) {
        return NextResponse.json({ error: itemsError.message }, { status: 500 })
      }
    }

    return NextResponse.json({ quote, success: true }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
