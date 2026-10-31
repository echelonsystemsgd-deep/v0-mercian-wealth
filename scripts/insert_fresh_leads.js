const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const updateLead = {
  name: 'CA Gaurav Aggarwal',
  business_name: 'CA Gaurav Aggarwal (Arora Aggarwal & Co)',
  email: 'gauravca77@yahoo.com',
  website: 'https://aroraaggarwal.com',
  status: 'New',
  service_interested: 'Practice OS & High-Net-Worth Advisory Intake',
  notes: '• LOCATION: 47-A, Mall Rd, INA Colony, Amritsar, Punjab 143001\n• PRACTICE: Established Chartered Accountancy practice handling high-net-worth commercial tax litigation and statutory audits.\n• FLAW: Relying on legacy email inbox routing with no automated pre-qualification portal or document vault for high-net-worth litigation clients.\n• FIX: Institutional Practice OS with encrypted case document upload and instant consultation scheduling.',
  scraped_metadata: {
    channel: 'email',
    trade: 'Chartered Accountants',
    address: '47-A, Mall Rd, INA Colony, Amritsar, Punjab 143001',
    friction_title: 'Unauthenticated High-Value Tax Intake',
    observable_problem: 'Commercial litigation practice taking sensitive client briefs via insecure manual email chains.'
  }
};

const leadsToInsert = [
  // Warm Client 1
  {
    business_name: 'Sell Your Stamps UK',
    name: 'Ali Nawaz',
    phone: '+447935220677',
    email: null,
    website: 'https://v0-stamp-valuation-app-eight.vercel.app/',
    service_interested: 'Interactive Valuation Portal & Acquisition App',
    status: 'New',
    lead_type: 'enterprise',
    local_business_niche: 'Philately & Precious Collectibles E-Commerce',
    whatsapp_direct_url: 'https://wa.me/447935220677',
    notes: '• CLIENT STATUS: Warm direct dialogue with founder Ali Nawaz regarding the Sell Your Stamps UK interactive valuation & buy-back platform.\n• PROTOTYPE: https://v0-stamp-valuation-app-eight.vercel.app/\n• PENDING ASSETS: Final sign-off on buy-back rates, main phone/email, domain DNS, £50k transit insurance confirmation.\n• NEXT ACTION: Low-friction peer micro-nudge offering 15-minute sync to finalize and point domain live.',
    scraped_metadata: {
      channel: 'whatsapp',
      trade: 'Collectibles & Valuation App',
      friction_title: 'Unfinished Domain & Rate Configuration',
      observable_problem: 'Client prototype ready; awaiting final legal/rate sign-off and domain DNS pointing.',
      prototype_url: 'https://v0-stamp-valuation-app-eight.vercel.app/'
    }
  },
  // Warm Client 2
  {
    business_name: 'Chitram TV / Shiva Technology Ltd',
    name: 'Viky',
    phone: null,
    email: null,
    website: 'https://uk-streaming-client-prototype.vercel.app/',
    service_interested: 'OTT Streaming Portal & PayPal Live Gateway',
    status: 'New',
    lead_type: 'enterprise',
    local_business_niche: 'IPTV & Digital Streaming Services',
    whatsapp_direct_url: null,
    notes: '• CLIENT STATUS: Warm partnership dialogue with Viky regarding Chitram TV streaming client checkout.\n• PROTOTYPE: https://uk-streaming-client-prototype.vercel.app/\n• PENDING ASSETS: Live PayPal Business credentials & domain connection.\n• LAST UPDATE: Viky confirmed colleague was sorting PayPal credentials on Oct 23.\n• NEXT ACTION: Frictionless follow-up checking if keys are ready to plug in for deployment.',
    scraped_metadata: {
      channel: 'whatsapp',
      trade: 'Streaming & Payment Portal',
      friction_title: 'PayPal Business Integration Handover',
      observable_problem: 'Live checkout gateway awaiting merchant PayPal API keys from client team.',
      prototype_url: 'https://uk-streaming-client-prototype.vercel.app/'
    }
  },
  // Amritsar CA 2
  {
    business_name: 'Padam Dhawan & Co.',
    name: 'Sahil Dhawan / Practice Partners',
    phone: '+919216907388',
    email: 'sahil.dhawan@yahoo.co.in',
    website: 'http://pdamritsar.com/',
    service_interested: 'Corporate Tax Portal & Automated GST Triage',
    status: 'New',
    lead_type: 'enterprise',
    local_business_niche: 'Chartered Accountants & Statutory Audit',
    whatsapp_direct_url: 'https://wa.me/919216907388',
    notes: '• LOCATION: 3, Race Course Rd, opp. IMA House, White Avenue, Amritsar 143001\n• PRACTICE: Multi-partner Chartered Accountancy firm handling corporate audits, GST compliance, and NRI advisory.\n• FLAW: Static HTTP website lacking SSL encryption on client contact routes, creating immediate trust hesitation for institutional directors.\n• FIX: Bank-grade client intake engine with SSL enforcement and direct corporate audit booking.',
    scraped_metadata: {
      channel: 'email',
      trade: 'Chartered Accountants',
      address: '3, Race Course Rd, opp. IMA House, White Avenue, Amritsar 143001',
      friction_title: 'Insecure HTTP Client Routes & Static Form',
      observable_problem: 'Prominent statutory audit practice serving corporate entities over unencrypted HTTP.'
    }
  },
  // Amritsar CA 3
  {
    business_name: 'B.K. Joshi & Associates Law Firm',
    name: 'Advocate Puneet Krishan Joshi',
    phone: '+919872037320',
    email: 'puneetkrishanjoshi@gmail.com',
    website: null,
    service_interested: 'Institutional Legal Client Intake & Dispute Portal',
    status: 'New',
    lead_type: 'enterprise',
    local_business_niche: 'Corporate Commercial Law & Tax Disputes',
    whatsapp_direct_url: 'https://wa.me/919872037320',
    notes: '• LOCATION: 2nd floor, Furniture Market, Katra Sher Singh Hall Bazar, Amritsar 143001\n• PRACTICE: High-reputation commercial law and tax dispute practice.\n• FLAW: Zero digital intake infrastructure; institutional corporate clients forced into unstructured phone triage or in-person walk-ins.\n• FIX: VIP Legal Triage platform pre-qualifying corporate retainer matters with automated conflict checks.',
    scraped_metadata: {
      channel: 'email',
      trade: 'Corporate Law Firm & Tax Disputes',
      address: '2nd floor, Furniture Market, Katra Sher Singh Hall Bazar, Amritsar 143001',
      friction_title: 'Zero Digital Retainer Intake',
      observable_problem: 'Prestige commercial dispute practice operating without any digital client onboarding or screening mechanism.'
    }
  },
  // Amritsar CA 4
  {
    business_name: 'Parul A Gupta & Associates',
    name: 'CA Parul Gupta',
    phone: '+919781411070',
    email: null,
    website: null,
    service_interested: 'Practice OS & Digital Client Portal',
    status: 'New',
    lead_type: 'enterprise',
    local_business_niche: 'Chartered Accountants & Corporate Tax',
    whatsapp_direct_url: 'https://wa.me/919781411070',
    notes: '• LOCATION: 1st Floor, 23-A, Office No. 2, near Jagat Jyoti Senior Secondary School, Rani Ka Bagh, Amritsar 143001\n• PRACTICE: Progressive CA firm specializing in corporate tax filings, business structuring, and financial audits.\n• FLAW: Inbound clients must call manually or visit office; no friction-free mobile intake for modern startup founders and SMEs.',
    scraped_metadata: {
      channel: 'whatsapp',
      trade: 'Chartered Accountants',
      address: 'Rani Ka Bagh, Amritsar 143001',
      friction_title: 'Manual Phone-Only Intake',
      observable_problem: 'SME tax practice relying exclusively on phone tag with no 24/7 corporate intake pipeline.'
    }
  },
  // Amritsar CA 5
  {
    business_name: 'V.Bhatia & Associates',
    name: 'CA V. Bhatia',
    phone: '+919888960702',
    email: null,
    website: null,
    service_interested: 'Practice OS & High-Ticket Tax Intake',
    status: 'New',
    lead_type: 'enterprise',
    local_business_niche: 'Chartered Accountants & Financial Advisory',
    whatsapp_direct_url: 'https://wa.me/919888960702',
    notes: '• LOCATION: Pandit Deen Dayal Complex, Sco 33, Cooper Rd, Amritsar 143006\n• PRACTICE: Commercial accounting and tax advisory practice in central Amritsar commercial corridor.\n• FLAW: Lacks automated client intake triage; prospective corporate clients drop off during busy filing cycles.',
    scraped_metadata: {
      channel: 'whatsapp',
      trade: 'Chartered Accountants',
      address: 'Cooper Rd, Amritsar 143006',
      friction_title: 'Drop-off During Busy Season',
      observable_problem: 'High-volume commercial corridor practice lacking automated qualification for new corporate retainers.'
    }
  },
  // Fresh UK Lead 1
  {
    business_name: 'A&C Chartered Accountants',
    name: 'Managing Partner',
    phone: '0161 832 4841',
    email: 'info@ac-accounts.co.uk',
    website: 'https://www.ac-accounts.co.uk',
    service_interested: 'Practice OS & Corporate Triage Engine',
    status: 'New',
    lead_type: 'enterprise',
    local_business_niche: 'Independent SME Chartered Accountants',
    whatsapp_direct_url: null,
    notes: '• LOCATION: Manchester, UK\n• PRACTICE: Established independent chartered accountancy practice serving regional SMEs and directors.\n• FLAW: Generic legacy contact form with zero price tiering or instant discovery hold; corporate prospects face 24-48h email lag.\n• FIX: Modern Practice OS with instant corporate pre-qualification and discovery calendar integration.',
    scraped_metadata: {
      channel: 'email',
      trade: 'Chartered Accountants',
      address: 'Manchester, UK',
      friction_title: 'Static Unqualified Contact Form & Triage Lag',
      observable_problem: 'High-growth Manchester SME practice operating an open unvalidated form with 24h+ response lag.'
    }
  },
  // Fresh UK Lead 2
  {
    business_name: 'Collins Chartered Accountants',
    name: 'Partner Team',
    phone: '0121 748 7100',
    email: 'admin@collins-chartered-accountants.co.uk',
    website: 'https://www.collins-chartered-accountants.co.uk',
    service_interested: 'Practice OS & Corporate Booking Engine',
    status: 'New',
    lead_type: 'enterprise',
    local_business_niche: 'Chartered Accountants & Corporate Tax',
    whatsapp_direct_url: null,
    notes: '• LOCATION: Castle Bromwich, Birmingham, UK\n• PRACTICE: Independent corporate chartered accounting practice handling statutory audits, payroll, and corporate compliance.\n• FLAW: Unanchored mobile call CTAs and friction-heavy multi-field questionnaire causing mobile drop-off for busy company directors.\n• FIX: 60-second friction-free intake widget with instant discovery booking.',
    scraped_metadata: {
      channel: 'email',
      trade: 'Chartered Accountants',
      address: 'Castle Bromwich, Birmingham, UK',
      friction_title: 'Mobile Click-to-Call Friction & Multi-field Form',
      observable_problem: 'Regional Birmingham corporate accounting firm with non-responsive consultation anchors.'
    }
  },
  // Fresh UK Lead 3
  {
    business_name: 'Abacus Tax Advisors Ltd',
    name: 'Tax Partners',
    phone: '0113 245 1200',
    email: 'tax@abacusleeds.co.uk',
    website: 'https://www.abacusleeds.co.uk',
    service_interested: 'High-Net-Worth Tax Intake & Retainer Portal',
    status: 'New',
    lead_type: 'enterprise',
    local_business_niche: 'Independent Tax Advisors & Wealth Structuring',
    whatsapp_direct_url: null,
    notes: '• LOCATION: Leeds, West Yorkshire, UK\n• PRACTICE: Independent chartered tax consultancy advising on corporate restructuring, R&D tax, and family wealth preservation.\n• FLAW: Complex pre-consultation inquiries routed into an unencrypted generic inbox; no secure document triage before client discovery.\n• FIX: Institutional client onboarding portal with pre-consultation document verification.',
    scraped_metadata: {
      channel: 'email',
      trade: 'Chartered Tax Specialists',
      address: 'Leeds, West Yorkshire, UK',
      friction_title: 'Unsecured Pre-Consultation Tax Intake',
      observable_problem: 'High-ticket tax advisory firm requiring clients to email sensitive accounts without portal encryption.'
    }
  },
  // Fresh UK Lead 4
  {
    business_name: 'Armstrong Watson (Manchester Hub)',
    name: 'Regional Partner Team',
    phone: '0161 832 6800',
    email: 'help@armstrongwatson.co.uk',
    website: 'https://www.armstrongwatson.co.uk',
    service_interested: 'Practice OS & Commercial Client Onboarding',
    status: 'New',
    lead_type: 'enterprise',
    local_business_niche: 'Commercial Business Advisers & Chartered Accountants',
    whatsapp_direct_url: null,
    notes: '• LOCATION: Manchester, UK\n• PRACTICE: Leading independent practice specializing in family businesses, audit, and commercial restructuring.\n• FLAW: High drop-off corporate intake form requiring 7+ fields before revealing partner availability or intake triage.\n• FIX: Rapid 2-step commercial intake holding calendar slots upfront with zero phone tag.',
    scraped_metadata: {
      channel: 'email',
      trade: 'Commercial Chartered Accountants',
      address: 'Manchester, UK',
      friction_title: '7-Field Contact Wall Creating Director Drop-off',
      observable_problem: 'Major commercial advisory practice losing mobile directors to lengthy unstructured contact forms.'
    }
  },
  // Fresh UK Lead 5
  {
    business_name: 'Infincible Limited',
    name: 'Marianne Green',
    phone: '0117 900 1600',
    email: 'marianne.green@infincible.com',
    website: 'https://www.infincible.com',
    service_interested: 'Practice OS & Modern Retainer Portal',
    status: 'New',
    lead_type: 'enterprise',
    local_business_niche: 'ICAEW Regulated Chartered Accountancy',
    whatsapp_direct_url: null,
    notes: '• LOCATION: Henleaze Business Centre, Harbury Road, Bristol, BS9 4PN\n• PRACTICE: Progressive ICAEW chartered firm serving tech startups and fast-growth SMEs across the South West.\n• FLAW: Unsecured mailto links and no automated retainer onboarding flow, causing friction when signing new monthly SME retainers.\n• FIX: Institutional Practice OS with automated fee-tier selection and electronic onboarding hold.',
    scraped_metadata: {
      channel: 'email',
      trade: 'ICAEW Chartered Accountants',
      address: 'Bristol, BS9 4PN',
      friction_title: 'Missing Automated Retainer Onboarding',
      observable_problem: 'Forward-looking Bristol practice relying on manual mailto links for monthly client onboarding.'
    }
  }
];

async function updateAndInsert() {
  // 1. Update existing Arora Aggarwal & Co
  const { error: updErr } = await supabase
    .from('leads')
    .update(updateLead)
    .eq('phone', '+919814310561');

  if (updErr) {
    console.error('Error updating CA Gaurav Aggarwal:', updErr);
  } else {
    console.log('Successfully updated CA Gaurav Aggarwal (Arora Aggarwal & Co)');
  }

  // 2. Insert other 11 leads
  const { data, error: insErr } = await supabase
    .from('leads')
    .insert(leadsToInsert)
    .select('id, business_name, status');

  if (insErr) {
    console.error('Error inserting remaining leads:', insErr);
  } else {
    console.log(`Successfully inserted ${data.length} fresh leads!`);
    data.forEach(d => console.log(`✓ [${d.id}] ${d.business_name} (${d.status})`));
  }
}

updateAndInsert();
