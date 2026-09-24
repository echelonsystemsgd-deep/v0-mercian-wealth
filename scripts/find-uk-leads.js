import fs from 'fs';
import path from 'path';

const APIFY_TOKEN = process.env.APIFY_API_TOKEN;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function findLeads() {
  const query = process.argv[2] || 'Roofers in Solihull, UK';
  const maxLeads = parseInt(process.argv[3] || '25', 10);
  const minReviews = parseInt(process.argv[4] || '1', 10);
  const niche = process.argv[5] || detectTradeNoun('', query, '');

  console.log(`\n🔍 Searching Google Maps for: "${query}"`);
  console.log(`🎯 Target Sector: ${niche.toUpperCase()} | Max: ${maxLeads} | Min Reviews: ${minReviews}`);
  console.log('⏳ Connecting to Apify engine (Zero Google Cloud required)...');

  try {
    const response = await fetch(
      `https://api.apify.com/v2/acts/compass~crawler-google-places/run-sync-get-dataset-items?token=${APIFY_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          searchStringsArray: [query],
          maxCrawledPlacesPerSearch: maxLeads,
          language: 'en',
          countryCode: 'gb',
          allPlacesNoSearchAction: '',
          includeWebResults: false
        })
      }
    );

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Apify error (${response.status}): ${err}`);
    }

    const items = await response.json();
    console.log(`📥 Scraped ${items.length} raw places. Applying Mercian Wealth qualification protocol...`);

    const qualified = [];

    for (const data of items) {
      const rawWebsite = (data.website || '').trim();
      const rawPhone = (data.phone || data.phoneUnformatted || '').trim();
      const totalScore = Number(data.totalScore || 0);
      const reviewsCount = Number(data.reviewsCount || 0);
      const businessName = data.title || data.name || 'Local Business';
      const address = data.address || data.city || 'UK Regional';

      // 1. Phone number is mandatory for speed-to-lead
      if (!rawPhone) continue;

      // 2. Minimum reviews check (ensures business is actively operating)
      if (reviewsCount < minReviews) continue;

      // 3. Classify online presence into 3 pathways (has_website, no_website, needs_review)
      const classification = classifyOnlinePresence(rawWebsite, rawPhone, businessName);

      // 4. Sanitize UK Phone
      let cleanPhone = rawPhone.replace(/[^0-9+]/g, '');
      if (cleanPhone.startsWith('0')) {
        cleanPhone = '+44' + cleanPhone.substring(1);
      }

      const isMobile = cleanPhone.startsWith('+447');
      const channel = isMobile ? 'WhatsApp / SMS' : 'Landline / Direct Call';
      const waDigits = cleanPhone.replace('+', '');
      const tradeNoun = detectTradeNoun(data.categoryName, query, businessName);
      const stage2 = generate5PartOutreach(businessName, classification, tradeNoun, data.city || 'your area');
      const waLink = isMobile
        ? `https://wa.me/${waDigits}?text=${encodeURIComponent(stage2)}`
        : null;

      const stage1 = `Hi 👋, is this ${businessName}?`;

      qualified.push({
        name: 'Owner / Director',
        business_name: businessName,
        email: `contact@${cleanSlug(businessName)}.co.uk`,
        phone: cleanPhone,
        website: rawWebsite || null,
        service_interested: 'Digital Storefront & Speed-to-Lead Automation',
        notes: `${address} · Google Rating: ★${totalScore} (${reviewsCount} reviews) · Search: "${query}"`,
        status: 'New',
        source: 'google_maps_outreach',
        lead_type: 'local',
        local_business_niche: niche,
        outreach_category: classification,
        outreach_stage: 'uncontacted',
        whatsapp_direct_url: waLink,
        scraped_metadata: {
          reviews_count: reviewsCount,
          rating: totalScore,
          address: address,
          place_id: data.placeId || null,
          categories: data.categories || [data.categoryName],
          google_maps_url: data.url || null,
          channel: channel,
          stage_1_opener: stage1,
          stage_2_pitch: stage2
        }
      });
    }

    console.log(`\n🎯 Found ${qualified.length} QUALIFIED LEADS matching Mercian Wealth criteria:\n`);
    console.table(
      qualified.map(q => ({
        'Business Name': q.business_name,
        'Phone': q.phone,
        'Category': q.outreach_category,
        'Reviews': `${q.scraped_metadata.reviews_count} (★${q.scraped_metadata.rating})`,
        'WhatsApp': q.whatsapp_direct_url ? 'READY' : 'Landline'
      }))
    );

    // 6. Sync into Supabase (Mercian Wealth Central DB)
    if (qualified.length > 0) {
      console.log(`\n⚡ Syncing ${qualified.length} leads directly into Supabase (public.leads)...`);
      await syncToSupabase(qualified);
    }

    // 7. Save local JSON backup
    const outputPath = path.resolve(process.cwd(), 'qualified-leads.json');
    fs.writeFileSync(outputPath, JSON.stringify(qualified, null, 2));
    console.log(`💾 Local backup saved to: qualified-leads.json\n`);

  } catch (err) {
    console.error('❌ Error finding leads:', err.message);
  }
}

function detectTradeNoun(category, query, name) {
  const combined = ((category || '') + ' ' + (query || '') + ' ' + (name || '')).toLowerCase();
  if (combined.includes('roof')) return 'roofer';
  if (combined.includes('dent') || combined.includes('implant') || combined.includes('smile')) return 'dentist';
  if (combined.includes('account') || combined.includes('tax') || combined.includes('bookkeep')) return 'accountant';
  if (combined.includes('carpent') || combined.includes('joiner')) return 'carpenter';
  if (combined.includes('plumb') || combined.includes('drain') || combined.includes('heat')) return 'plumber';
  if (combined.includes('electric')) return 'electrician';
  if (combined.includes('build') || combined.includes('construct') || combined.includes('loft') || combined.includes('extension')) return 'builder';
  if (combined.includes('cake') || combined.includes('baker') || combined.includes('confection')) return 'baker';
  if (combined.includes('clean')) return 'cleaner';
  if (combined.includes('landscap') || combined.includes('tree') || combined.includes('garden')) return 'landscaper';
  if (combined.includes('paint') || combined.includes('decorat')) return 'decorator';
  return 'tradesperson';
}

function getSpecificIssue(website) {
  if (!website) return 'the site is currently inaccessible';
  const w = website.toLowerCase();
  if (w.includes('facebook.com')) return 'it only points to an unverified Facebook page';
  if (w.includes('instagram.com')) return 'it only directs to an Instagram profile without a quote intake';
  if (w.includes('yell.com') || w.includes('checkatrade.com')) return 'it only links back to a shared directory listing';
  return 'the site failed to open properly';
}

function classifyOnlinePresence(website, phone, businessName) {
  if (!phone || !businessName) return 'needs_review';
  if (!website || website === '') return 'no_website';
  const w = website.toLowerCase();
  if (
    w.includes('facebook.com') ||
    w.includes('instagram.com') ||
    w.includes('tiktok.com') ||
    w.includes('yell.com') ||
    w.includes('checkatrade.com') ||
    w.includes('linktr.ee')
  ) {
    return 'no_website';
  }
  return 'has_website';
}

function generate5PartOutreach(businessName, classification, tradeNoun, location) {
  const city = location || 'your area';
  if (classification === 'no_website') {
    return [
      `Hi, came across ${businessName} — great reputation in ${city}.`,
      `Quick observation: had a look for your dedicated site to check your past work and booking info, but couldn't find one active.`,
      `Usually when a customer is comparing local ${tradeNoun} specialists in the evening, having no dedicated place to quickly confirm services and booking availability means they have less certainty at that decision point, so they continue looking at alternatives.`,
      `Put together a quick 30-second mobile concept showing how ${businessName} could showcase your work and let clients request bookings directly on their phone.`,
      `Open to taking a quick look? (Zero obligation at all 👍)`
    ].join('\n\n');
  }

  // Pathway 1: Has Website (Queued for specific decision friction audit)
  return [
    `Hi, came across ${businessName} while reviewing ${tradeNoun} specialists in ${city}.`,
    `Had a quick look through your mobile website on my phone and noticed one friction point where evening visitors trying to enquire run into hesitation.`,
    `When customers compare local specialists after hours, small mobile friction at the contact step causes them to pause and check competitors instead of completing the enquiry.`,
    `Recorded a 30-second screen walkthrough showing exactly where it happens and a quick 1-click fix.`,
    `Mind if I send the 30s link over? (Zero obligation at all 👍)`
  ].join('\n\n');
}

function cleanSlug(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

async function syncToSupabase(leads) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify(leads)
    });

    if (res.ok) {
      console.log(`✅ Successfully synced ${leads.length} leads to Supabase public.leads!`);
    } else {
      const err = await res.text();
      console.warn(`⚠️ Supabase response (${res.status}): ${err}`);
    }
  } catch (err) {
    console.error('❌ Failed to sync to Supabase:', err.message);
  }
}

findLeads();
