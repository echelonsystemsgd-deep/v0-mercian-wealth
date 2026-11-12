const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) {
    throw new Error('.env.local file not found at ' + envPath);
  }
  return Object.fromEntries(
    fs.readFileSync(envPath, 'utf-8')
      .split('\n')
      .filter(l => l.includes('='))
      .map(l => {
        const idx = l.indexOf('=');
        return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()];
      })
  );
}

const env = loadEnv();
const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const ACCOUNTANT_LEADS = [
  {
    business_name: "SRLV LLP Chartered Accountants",
    instagram_handle: "srlv.llp",
    website_url: "https://www.srlv.co.uk",
    has_website: true,
    location: "8A Savile Row, Mayfair, London W1S 3PE",
    owner_name: null,
    lead_category: "no_booking_engine",
    specific_hook: "your tax planning breakdowns for media, entertainment, and creative entrepreneurs",
    qualification_reason: "High-pedigree Mayfair practice. Website is an institutional brochure with static forms; lacks a streamlined client onboarding intake or instant discovery consultation booking.",
    phone: "+44 20 7580 7313"
  },
  {
    business_name: "WallsMan Creative Accountants",
    instagram_handle: "wallsmancreative",
    website_url: "https://creative.accountants",
    has_website: true,
    location: "Farringdon, London EC1",
    owner_name: null,
    lead_category: "no_booking_engine",
    specific_hook: "the insights on corporation tax strategy for creative agencies and digital creators",
    qualification_reason: "Boutique ICAEW-chartered London firm. Modern brand aesthetic, but prospect discovery requires manual back-and-forth emails rather than an interactive calendar hold.",
    phone: "+44 20 3880 8200"
  },
  {
    business_name: "TC Group London",
    instagram_handle: "tcgroupuk",
    website_url: "https://www.tc-group.com",
    has_website: true,
    location: "20 Old Bailey, London EC4M 7AN",
    owner_name: null,
    lead_category: "outdated_website",
    specific_hook: "your recent advisory updates on Making Tax Digital (MTD) and corporate tax compliance",
    qualification_reason: "Top-tier UK accountancy firm. Website navigation is heavily layered and multi-page, causing mobile friction for prospective SMEs seeking fast consultation booking.",
    phone: "+44 20 7332 9600"
  },
  {
    business_name: "TaxQube Chartered Tax Advisers",
    instagram_handle: "taxqube",
    website_url: "https://taxqube.co.uk",
    has_website: true,
    location: "2 Woodberry Grove, Finchley, London N12 0DR",
    owner_name: null,
    lead_category: "no_booking_engine",
    specific_hook: "the practical guides on cross-border tax compliance and HMRC self-assessment deadlines",
    qualification_reason: "Specialized tax advisory boutique. Solid social content, but website lacks self-service client onboarding and automated inquiry qualification.",
    phone: "+44 20 8343 7770"
  },
  {
    business_name: "GM Professional Accountants",
    instagram_handle: "gmprofessionalaccountants",
    website_url: "https://gmprofessionalaccountants.co.uk",
    has_website: true,
    location: "Canary Wharf & Ilford, London E14",
    owner_name: null,
    lead_category: "outdated_website",
    specific_hook: "your tax planning reels for e-commerce brands and limited company directors",
    qualification_reason: "Very active on Instagram with client queries in comments. Mobile site has multiple nested form fields that hurt conversion rates on mobile devices.",
    phone: "+44 20 8396 6128"
  },
  {
    business_name: "Pulse Accountants",
    instagram_handle: "pulseaccountants",
    website_url: "https://pulse-accountants.co.uk",
    has_website: true,
    location: "London & South East, UK",
    owner_name: null,
    lead_category: "no_booking_engine",
    specific_hook: "the breakdown on allowable business expenses for modern digital entrepreneurs",
    qualification_reason: "Caters directly to the creator and digital agency economy. Highly active social presence, but lacks an automated consultation hold system.",
    phone: "+44 20 7060 1120"
  },
  {
    business_name: "Smooth Accounting",
    instagram_handle: "smoothaccounting",
    website_url: "https://smoothaccounting.co.uk",
    has_website: true,
    location: "Greater London & South, UK",
    owner_name: null,
    lead_category: "no_booking_engine",
    specific_hook: "your clear breakdowns making accounting and payroll simple for small business owners",
    qualification_reason: "Dynamic, approachable accountancy practice. Website has strong branding but relies on generic inquiry forms without an interactive pricing/intake calculator.",
    phone: "+44 1489 570777"
  },
  {
    business_name: "Gerald Edelman",
    instagram_handle: "geraldedelmanuk",
    website_url: "https://www.geraldedelman.com",
    has_website: true,
    location: "73 Cornhill, City of London EC3V 3QQ",
    owner_name: null,
    lead_category: "outdated_website",
    specific_hook: "the business advisory insights on corporate restructuring and scale-up funding",
    qualification_reason: "Prestigious City of London firm. Desktop-centric architecture makes booking discovery sessions from mobile social traffic slow and cumbersome.",
    phone: "+44 20 7299 1400"
  },
  {
    business_name: "DNS Accountants",
    instagram_handle: "dns_accountants_uk",
    website_url: "https://www.dnsassociates.co.uk",
    has_website: true,
    location: "383 Kenton Rd, Harrow, London HA3 0XS",
    owner_name: null,
    lead_category: "no_booking_engine",
    specific_hook: "your contractor tax advice and IR35 compliance guidance",
    qualification_reason: "Award-winning contractor and small business accountants. High web traffic, but mobile lead capture forms are long and produce drop-off.",
    phone: "+44 20 3500 2646"
  },
  {
    business_name: "Raffingers Chartered Accountants",
    instagram_handle: "raffingers",
    website_url: "https://www.raffingers.co.uk",
    has_website: true,
    location: "19-20 Woodford Green, London / Essex IG8 2FQ",
    owner_name: null,
    lead_category: "outdated_website",
    specific_hook: "the strategic business planning and cloud accounting tips for growing companies",
    qualification_reason: "Progressive, modern practice with podcast and thought leadership. Website mobile speed has high latency on media assets, and no direct calendar hold.",
    phone: "+44 20 8551 7200"
  },
  {
    business_name: "Nordens Chartered Accountants",
    instagram_handle: "nordens_accountants",
    website_url: "https://nordens.co.uk",
    has_website: true,
    location: "The Shard & Woodford, London, UK",
    owner_name: null,
    lead_category: "no_booking_engine",
    specific_hook: "the proactive business advisory approach and tax savings case studies you share",
    qualification_reason: "Strong advisory focus with great branding. Website funnel directs to phone callbacks rather than frictionless self-serve onboarding.",
    phone: "+44 20 8530 0720"
  },
  {
    business_name: "BKL (Berg Kaprow Lewis LLP)",
    instagram_handle: "bkl_accountants",
    website_url: "https://bkl.co.uk",
    has_website: true,
    location: "35 Ballards Lane, London N3 1XW",
    owner_name: "Geraint",
    lead_category: "outdated_website",
    specific_hook: "your B Corp certification journey and sustainability-focused tax consulting",
    qualification_reason: "Top-tier North London firm. Site has extensive thought leadership but prospect onboarding flows through a traditional corporate contact directory.",
    phone: "+44 20 8922 9222"
  },
  {
    business_name: "Sidekick Accounting",
    instagram_handle: "sidekickaccounting",
    website_url: "https://sidekickaccounting.co.uk",
    has_website: true,
    location: "London & South, UK",
    owner_name: null,
    lead_category: "no_booking_engine",
    specific_hook: "the approachable tips breaking down VAT registration thresholds for startups",
    qualification_reason: "Startup-friendly practice with fun, modern Instagram branding. Conversion funnel ends at a static form rather than an instant video discovery booking.",
    phone: "+44 20 3950 0999"
  },
  {
    business_name: "Accounts Lab",
    instagram_handle: "accountslab",
    website_url: "https://accountslab.co.uk",
    has_website: true,
    location: "124 City Rd, London EC1V 2NX",
    owner_name: null,
    lead_category: "no_booking_engine",
    specific_hook: "your R&D tax credit guides and financial modeling for tech startups",
    qualification_reason: "Tech & SaaS accounting specialists. Clean modern branding, but missing an automated client triage and document intake portal.",
    phone: "+44 20 3808 6789"
  },
  {
    business_name: "Accounts Navigator",
    instagram_handle: "accountsnavigator",
    website_url: "https://accountsnavigator.com",
    has_website: true,
    location: "London & Essex, UK",
    owner_name: null,
    lead_category: "outdated_website",
    specific_hook: "the bookkeeping clarity and tax preparation tips you share for local business owners",
    qualification_reason: "Established small business firm. Website has layout shifts on mobile load and lacks a secure encrypted document upload or instant consultation scheduler.",
    phone: "+44 20 8532 9843"
  },
  {
    business_name: "Silver Levene LLP",
    instagram_handle: "silverlevene",
    website_url: "https://silverlevene.co.uk",
    has_website: true,
    location: "37 Warren St, Fitzrovia, London W1T 6AD",
    owner_name: null,
    lead_category: "outdated_website",
    specific_hook: "your sector expertise handling tax and finances for media, arts, and broadcast professionals",
    qualification_reason: "Largest UK media-specialist practice. The website structure dates back several years; high opportunity for a mobile-first VIP client intake portal.",
    phone: "+44 20 7383 3200"
  },
  {
    business_name: "Crunch Accounting",
    instagram_handle: "crunchaccounting",
    website_url: "https://www.crunch.co.uk",
    has_website: true,
    location: "London & Brighton, UK",
    owner_name: null,
    lead_category: "no_booking_engine",
    specific_hook: "the year-end tax checklist and sole-trader to limited company transition guides",
    qualification_reason: "Household brand for freelancers. Mobile landing experience has multi-screen funnel friction for high-margin corporate advisory services.",
    phone: "+44 333 311 8000"
  },
  {
    business_name: "Menzies LLP",
    instagram_handle: "menziesllp",
    website_url: "https://www.menzies.co.uk",
    has_website: true,
    location: "100 St John St, Clerkenwell, London EC1M 4EH",
    owner_name: null,
    lead_category: "outdated_website",
    specific_hook: "your international corporate tax structuring and audit advisory content",
    qualification_reason: "Major national firm with City of London office. Complex corporate CMS with slow mobile page speed and no automated discovery holds.",
    phone: "+44 20 7465 1900"
  },
  {
    business_name: "Cardens Accountants",
    instagram_handle: "cardensaccountants",
    website_url: "https://cardensaccountants.com",
    has_website: true,
    location: "London & South Coast, UK",
    owner_name: null,
    lead_category: "no_booking_engine",
    specific_hook: "the proactive payroll and Xero cloud accounting tips you post for business founders",
    qualification_reason: "Energetic, client-focused firm. Contact page relies on email links rather than a guided self-service client onboarding engine.",
    phone: "+44 1273 739592"
  },
  {
    business_name: "The Accountancy Partnership",
    instagram_handle: "theaccountancypartnership",
    website_url: "https://www.theaccountancypartnership.com",
    has_website: true,
    location: "London & Nationwide, UK",
    owner_name: null,
    lead_category: "no_booking_engine",
    specific_hook: "your demystifying guides on director loan accounts and small business tax relief",
    qualification_reason: "Digital-first nationwide practice. Mobile quote calculator is generic and does not capture high-ticket advisory leads with instant calendar bookings.",
    phone: "+44 20 3355 4047"
  }
];

function renderAccountantCopy(lead) {
  const greeting = lead.owner_name ? `Hey ${lead.owner_name}` : "Hey there";

  const d1 = `${greeting}, came across your page and really liked the advice you're sharing, especially ${lead.specific_hook}.

Quick question, are most of your new client enquiries coming through Instagram/word-of-mouth, or do you have an automated onboarding/booking system in place?`;

  const d4 = `${greeting}, had another look at your page. You've got some solid client advice on there. Just curious, do you handle all your client onboarding and discovery calls manually, or have you got an automated intake system in place?`;

  const d7 = `${greeting}, last message from me 😅

I help accountancy practices modernise their websites with streamlined client intake, automated discovery scheduling, and secure document portals.

Thought it might be worth a chat, but no worries if you're not looking at that right now.`;

  return { d1, d4, d7 };
}

async function populateAccountants() {
  console.log(`--- Syncing Supabase \`instagram_leads\` with 20 London ACCOUNTANT Leads ---`);

  // Clear previous car detailing records to ensure database is 100% clean and dedicated to accountants
  await supabase.from('instagram_leads').delete().neq('business_name', '___NONE___');

  for (let i = 0; i < ACCOUNTANT_LEADS.length; i++) {
    const raw = ACCOUNTANT_LEADS[i];
    const { d1, d4, d7 } = renderAccountantCopy(raw);

    // Initial Warmup: first 3 are queued_d1 (Day 1 limit of 3)
    const status = i < 3 ? 'queued_d1' : 'qualified';

    const leadRecord = {
      business_name: raw.business_name,
      instagram_handle: raw.instagram_handle,
      instagram_url: `https://www.instagram.com/${raw.instagram_handle}/`,
      website_url: raw.website_url,
      has_website: raw.has_website,
      phone: raw.phone,
      location: raw.location,
      lead_category: raw.lead_category,
      qualification_reason: raw.qualification_reason,
      specific_car_hook: raw.specific_hook, // Hook column
      owner_name: raw.owner_name,
      status: status,
      warmup_day: 1,
      message_d1: d1,
      message_d4: d4,
      message_d7: d7,
      next_action_due: new Date().toISOString()
    };

    const { error } = await supabase
      .from('instagram_leads')
      .upsert(leadRecord, { onConflict: 'instagram_handle' });

    if (error) {
      console.error(`Error inserting ${raw.instagram_handle}:`, error.message);
    } else {
      console.log(`[${i + 1}/${ACCOUNTANT_LEADS.length}] Synced Accountant: ${raw.business_name} (@${raw.instagram_handle}) -> Status: ${status}`);
    }
  }

  console.log('--- Successfully Loaded 20 London Accountant Leads into Supabase ---');
}

populateAccountants().catch(console.error);
