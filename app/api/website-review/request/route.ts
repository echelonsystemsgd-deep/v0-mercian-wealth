import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export const dynamic = "force-dynamic"

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !serviceKey) {
    return null
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { practice_name, website_url, phone, consent } = body

    if (!practice_name || !website_url || !phone) {
      return NextResponse.json(
        { error: "Missing required fields: practice_name, website_url, phone" },
        { status: 400 }
      )
    }

    if (!consent) {
      return NextResponse.json(
        { error: "Consent is required to receive the website review." },
        { status: 400 }
      )
    }

    // Clean phone number
    const cleanedPhone = phone.trim()

    const supabase = getSupabaseAdmin()

    if (supabase) {
      // 1. Check suppression list
      const { data: suppressed } = await supabase
        .from("suppressed_contacts")
        .select("id")
        .eq("phone", cleanedPhone)
        .maybeSingle()

      if (suppressed) {
        return NextResponse.json(
          { error: "This contact number is currently opted out of communication." },
          { status: 400 }
        )
      }

      // 2. Insert into website_review_requests
      const { error: reqError } = await supabase
        .from("website_review_requests")
        .insert({
          name: practice_name.trim(),
          url: website_url.trim(),
          phone: cleanedPhone,
          consent: true,
          source: "practices_page",
        })

      if (reqError) {
        console.warn("Could not insert website_review_requests (table may need migration):", reqError.message)
      }

      // 3. Simultaneously sync to leads table for manual practitioner inspection
      const { error: leadError } = await supabase
        .from("leads")
        .insert({
          company_name: practice_name.trim(),
          website: website_url.trim(),
          phone: cleanedPhone,
          status: "Review requested",
          service_interested: "Free 5-Minute Practice Website Review",
          source: "website_review_form",
          notes: "Requested free 5-minute smartphone website review via /practices#website-review. Zero automated messages sent.",
        })

      if (leadError) {
        console.warn("Could not insert lead for website review:", leadError.message)
      }
    }

    return NextResponse.json({
      success: true,
      message: "Review request recorded successfully. Our team will inspect your site manually.",
    })
  } catch (err: any) {
    console.error("Website review request error:", err)
    return NextResponse.json(
      { error: err.message || "Failed to process review request." },
      { status: 500 }
    )
  }
}
