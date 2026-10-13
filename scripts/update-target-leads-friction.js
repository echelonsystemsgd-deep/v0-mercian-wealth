const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const TARGET_LEADS_DATA = [
  {
    domainKeyword: 'barrieingramaccounts',
    businessName: 'Barrie Ingram Accounts Ltd',
    phone: '+447908228472',
    trade: 'Chartered Accountant',
    location: 'Colchester, Essex',
    frictionBadge: 'Outdated Tax Rates & Static Form',
    pageLocation: 'Homepage & /services',
    observableFriction: 'Outdated tax rate references and static contact form lacking fee expectations or instant booking.',
    consequenceMechanics: 'Fee-earners waste 15+ hours/month fielding unqualified tire-kickers while premium Ltd Co retainers bounce to firms offering instant booking holds.',
    prototypeRemedy: 'Interactive Corporation Tax & Retainer Estimator (£150k-£5M slider) + 60-second direct calendar booking hold.',
    customNotes: `• VERIFIED FLAW: Outdated tax guidance & generic contact form with zero price anchoring.\n• LOCATION: Homepage hero & /services.\n• COMMERCIAL LEAK: Prospects have no idea of monthly retainer tiers (£450-£1,450/mo), causing partner time to be burned on tire-kickers.\n• PROTOTYPE FIX: Corporation Tax slider + direct calendar booking session.`,
    whatsappMsg1: `Hi Barrie 👋 Came across Barrie Ingram Accounts in Colchester — quick question: when new Ltd Co directors land on your website in the evening, how does your team pre-qualify their turnover before scheduling discovery calls?`,
    whatsappMsg2: `Makes complete sense! I had a quick look through barrieingramaccounts.co.uk on mobile and noticed the enquiry form doesn't anchor retainer tiers or let directors reserve a consultation slot on the spot. Usually leads to telephone tag or tire-kickers who aren't ready for professional fees.`,
    whatsappMsg3: `We engineered an interactive intake prototype specifically for UK accounting practices:\nhttps://uk-accountancy-os-prototype.vercel.app/\n\nIt lets directors calculate their Corporation Tax band, view estimated retainers, and book directly in 60 seconds.\n\nOpen to a brief 10-minute call to walk through the numbers?\nBook a call with me here: [Link to Book a Call]`,
    whatsappQuick: `Hi Barrie, noticed on barrieingramaccounts.co.uk that incoming business enquiries hit a static form without fee anchoring or instant booking.\n\nWe built a live interactive prototype for UK accountants with a built-in Corporation Tax estimator and 60-second booking flow:\nhttps://uk-accountancy-os-prototype.vercel.app/\n\nWould you be open to a 10-minute call to see how this filters tire-kickers?\nBook a call with me here: [Link to Book a Call]`
  },
  {
    domainKeyword: 'ksrathod',
    businessName: 'K S Rathod & Co Ltd',
    phone: '+447831587536',
    trade: 'Chartered Certified Accountant',
    location: 'Wembley / London',
    frictionBadge: 'Raw Mailto Link & No Mobile Booking',
    pageLocation: '/contact-us & mobile navigation',
    observableFriction: 'Raw unformatted mailto links, no mobile-first consultation reservation, and zero retainer anchoring.',
    consequenceMechanics: 'Prospective clients bounce back to Google to message whoever offers 1-tap booking confirmation.',
    prototypeRemedy: 'Fixed bottom mobile consultation bar (48px touch target) + instant discovery scheduler.',
    customNotes: `• VERIFIED FLAW: Raw mailto link + office-hours phone barrier on mobile.\n• LOCATION: /contact-us.\n• COMMERCIAL LEAK: Evening visitors bounce immediately when forced to open default email app.\n• PROTOTYPE FIX: Sticky mobile consultation bar + 60s calendar reservation.`,
    whatsappMsg1: `Hi Kirit 👋 Came across K S Rathod & Co — quick question: when prospective commercial clients search your practice on mobile outside working hours, how do you capture them before they bounce?`,
    whatsappMsg2: `Reason I ask is I visited ksrathod.co.uk on mobile and noticed reaching you requires either copying an email or waiting for office hours. Most high-value directors searching in the evening simply move on to the next practice.`,
    whatsappMsg3: `We built a working prototype showing how UK accounting practices capture these inquiries frictionlessly:\nhttps://uk-accountancy-os-prototype.vercel.app/\n\nIt lets business owners check tax bands and book directly into your diary in 60 seconds.\n\nCould we grab 10 minutes on a call to see how this works for K S Rathod & Co?\nBook a call with me here: [Link to Book a Call]`,
    whatsappQuick: `Hi Kirit, noticed on ksrathod.co.uk that mobile visitors have to copy raw email links or call during business hours to book an appointment.\n\nWe engineered a live prototype for UK practices that locks in consultations 24/7 in 60 seconds with instant fee tiering:\nhttps://uk-accountancy-os-prototype.vercel.app/\n\nOpen to a brief 10-minute call to review it?\nBook a call with me here: [Link to Book a Call]`
  },
  {
    domainKeyword: '852',
    businessName: '852 Accounting',
    phone: '+447739546042',
    trade: 'Chartered Management Accountant',
    location: 'London',
    frictionBadge: 'Cryptic Layout & Hidden Retainers',
    pageLocation: 'Homepage hero & single-page layout',
    observableFriction: 'Cryptic minimalist layout hiding practice capabilities with no retainer tiering or direct consultation hold.',
    consequenceMechanics: 'Visitors assume the firm is either excessively expensive or limited in scope, leading to lost advisory instructions.',
    prototypeRemedy: '3-Tier Service Architecture (Compliance, Tax Planning, Advisory/CFO) + dynamic fee simulator.',
    customNotes: `• VERIFIED FLAW: Minimalist aesthetic obscures core capabilities and pricing brackets.\n• LOCATION: Homepage hero.\n• COMMERCIAL LEAK: Mid-market founders bounce due to lack of fee transparency or clear next steps.\n• PROTOTYPE FIX: 3-tier value matrix + interactive retainer calculator.`,
    whatsappMsg1: `Hi team 👋 Came across 852 Accounting in London — love the clean aesthetic. Quick question: how do you currently pre-qualify founders on retainer expectations before discovery calls?`,
    whatsappMsg2: `Reason I ask is that while 852.limited is visually sleek, prospective clients can't gauge fee bands or lock in a consultation slot directly. Mid-market founders often hesitate when next steps aren't crystal clear.`,
    whatsappMsg3: `We created a working model showing how modern practices balance high design with conversion:\nhttps://uk-accountancy-os-prototype.vercel.app/\n\nIt pre-qualifies turnover bands and allows 60-second meeting bookings without sacrificing brand prestige.\n\nWould you be open to a 10-minute call this week?\nBook a call with me here: [Link to Book a Call]`,
    whatsappQuick: `Hi team, 852.limited has great branding, but lacks upfront fee tiering and instant consultation booking for prospective founders.\n\nTake a look at this live prototype designed for modern UK accounting practices:\nhttps://uk-accountancy-os-prototype.vercel.app/\n\nIt filters inquiries and books consultations in under a minute.\nLet's connect for 10 minutes: [Link to Book a Call]`
  },
  {
    domainKeyword: 'rkpartners',
    businessName: 'C J Driscoll Chartered Accountants',
    phone: '+447930651376',
    trade: 'Chartered Accountants & Tax Advisers',
    location: 'Romford / Essex',
    frictionBadge: 'Dense Compliance Wall & Phone-Tag',
    pageLocation: '/services & /contact',
    observableFriction: 'Dense wall-of-text compliance list (VAT, audit, payroll) without interactive client tiering or instant calendar booking.',
    consequenceMechanics: 'The firm receives price resistance on proposals while spending partner hours on administrative phone-tag.',
    prototypeRemedy: 'High-value Advisory & Tax Strategy tiering + automated booking qualification.',
    customNotes: `• VERIFIED FLAW: Wall-of-text compliance bullets without tiered packages.\n• LOCATION: /services.\n• COMMERCIAL LEAK: Anchors practice as commodity service provider; invites price-haggling.\n• PROTOTYPE FIX: Categorized advisory packages + Corporation Tax estimation slider.`,
    whatsappMsg1: `Hi team 👋 Came across C J Driscoll & RK Partners — quick question: how do you currently package and qualify incoming advisory inquiries versus standard compliance clients?`,
    whatsappMsg2: `Reason I ask is that rkpartners.co.uk presents services in a traditional text list, which often invites price comparison against cheap bookkeepers rather than positioning your partner-level tax advisory expertise.`,
    whatsappMsg3: `We developed a live UK accountancy OS prototype to solve that positioning challenge:\nhttps://uk-accountancy-os-prototype.vercel.app/\n\nIt anchors clients onto £850+/mo advisory retainers and books qualified strategy sessions automatically.\n\nOpen to a brief 10-minute call to walk through the system?\nBook a call with me here: [Link to Book a Call]`,
    whatsappQuick: `Hi team, noticed on rkpartners.co.uk that comprehensive advisory services are listed as standard compliance bullets without upfront fee tiering.\n\nWe built a live demo showing how UK practices elevate advisory retainers and automate bookings:\nhttps://uk-accountancy-os-prototype.vercel.app/\n\nOpen to a quick 10-minute call to review?\nBook a call with me here: [Link to Book a Call]`
  },
  {
    domainKeyword: 'protax',
    businessName: 'Pro Tax Accountant Chelmsford',
    phone: '+447985689912',
    trade: 'Tax & Accounting Specialist',
    location: 'Chelmsford, Essex',
    frictionBadge: '25-Keyword Dump & Heavy Form',
    pageLocation: 'Homepage & /contact-us',
    observableFriction: '25-item keyword dump in navigation, multi-field form, and zero upfront fee pre-qualification.',
    consequenceMechanics: 'High volume of unqualified inbound leads burns partner capacity with low close rates.',
    prototypeRemedy: 'Streamlined 3-step intake, turnover pre-qualification slider, and direct calendar synchronization.',
    customNotes: `• VERIFIED FLAW: Cluttered 25+ item service dump + lengthy enquiry form.\n• LOCATION: Homepage & enquiry form.\n• COMMERCIAL LEAK: Burns staff hours manually sorting through low-value enquiries.\n• PROTOTYPE FIX: Clean 3-tier service selector + instant calendar slot booking.`,
    whatsappMsg1: `Hi team 👋 Came across Pro Tax Accountant in Chelmsford — quick question: with such high traffic across your tax services, what percentage of website inquiries are pre-qualified before your team calls them?`,
    whatsappMsg2: `Reason I ask is that protaxaccountant.co.uk uses lengthy contact forms and service lists that often result in your team spending hours filtering through tire-kickers who aren't ready for your tax advisory rates.`,
    whatsappMsg3: `We built an interactive intake system specifically to automate that qualification:\nhttps://uk-accountancy-os-prototype.vercel.app/\n\nIt lets directors select their turnover bracket, review expected retainers, and book directly into your diary.\n\nLet's do a quick 10-minute call to see how this eliminates manual triage.\nBook a call with me here: [Link to Book a Call]`,
    whatsappQuick: `Hi team, noticed protaxaccountant.co.uk captures leads via long forms without pre-qualifying turnover, meaning staff time is wasted on unqualified inquiries.\n\nHere is a live prototype demonstrating automated 60-second booking with tax qualification:\nhttps://uk-accountancy-os-prototype.vercel.app/\n\nOpen to a 10-minute call?\nBook a call with me here: [Link to Book a Call]`
  },
  {
    domainKeyword: 'ffconsultants',
    businessName: 'Future Focus Consultants Ltd',
    phone: '+447765292472',
    trade: 'Management Consultants & Accountants',
    location: 'London',
    frictionBadge: 'Generic Corporate Copy & No Diagnostic',
    pageLocation: '/contact & homepage',
    observableFriction: 'Generic corporate copy with no instant diagnostic or direct meeting scheduling.',
    consequenceMechanics: 'Visitors delay action and continue researching rival firms that demonstrate digital convenience.',
    prototypeRemedy: 'Interactive Corporation Tax calculator showing estimated liability & 60-second booking flow.',
    customNotes: `• VERIFIED FLAW: Traditional corporate brochure copy with no diagnostic hooks.\n• LOCATION: Homepage & /contact.\n• COMMERCIAL LEAK: Prospects browse passively without taking action.\n• PROTOTYPE FIX: Self-serve tax liability simulator + real-time strategy session booking.`,
    whatsappMsg1: `Hi team 👋 Came across Future Focus Consultants — quick question: when high-growth business directors visit ffconsultants.co.uk, how do you capture them before they leave to compare other firms?`,
    whatsappMsg2: `Reason I ask is that the site uses traditional contact forms without an interactive diagnostic. Business owners browsing outside working hours usually prefer immediate answers over waiting for an email response.`,
    whatsappMsg3: `We created a prototype showing how forward-thinking UK practices convert those visitors on the spot:\nhttps://uk-accountancy-os-prototype.vercel.app/\n\nIt allows prospects to calculate their Corporation Tax liability and book a strategy session in under a minute.\n\nWould you be open to a 10-minute call this week?\nBook a call with me here: [Link to Book a Call]`,
    whatsappQuick: `Hi team, ffconsultants.co.uk has solid corporate positioning but lacks an interactive tool to capture after-hours directors.\n\nTake a look at this live practice prototype with instant tax calculations and direct booking:\nhttps://uk-accountancy-os-prototype.vercel.app/\n\nOpen to a 10-minute call?\nBook a call with me here: [Link to Book a Call]`
  },
  {
    domainKeyword: 'aggarwal',
    businessName: 'Aggarwal Accounts',
    phone: '+447443419408',
    trade: 'Accountancy Practice',
    location: 'Isleworth / London',
    frictionBadge: 'Fragmented Branch Intake & Static Forms',
    pageLocation: '/contact-us & branch pages',
    observableFriction: 'Fragmented multi-branch contact numbers with ununified contact forms and no instant partner scheduling.',
    consequenceMechanics: 'Inbound leads get lost between branch phone lines, delaying response times beyond the 5-minute golden window.',
    prototypeRemedy: 'Unified Practice Hub intake routing leads into correct partner diaries automatically.',
    customNotes: `• VERIFIED FLAW: Fragmented branch phone numbers and ununified enquiry forms.\n• LOCATION: /contact-us.\n• COMMERCIAL LEAK: Prospects bounce during branch selection confusion; lead response delayed.\n• PROTOTYPE FIX: Unified digital intake that pre-qualifies turnover and books direct.`,
    whatsappMsg1: `Hi team 👋 Came across Aggarwal Accounts — quick question: when new clients reach your website, how does your intake route them between your locations without manual telephone tag?`,
    whatsappMsg2: `Reason I ask is that having multiple branch contact options without a unified booking flow often confuses mobile users and delays your response times during busy filing periods.`,
    whatsappMsg3: `We designed an accountancy intake system that unifies branch booking into a streamlined 60-second experience:\nhttps://uk-accountancy-os-prototype.vercel.app/\n\nProspects specify turnover, see their fee tier, and book straight into the appropriate calendar.\n\nLet's do a quick 10-minute call to see how this simplifies your intake:\nBook a call with me here: [Link to Book a Call]`,
    whatsappQuick: `Hi team, noticed aggarwalaccounts.com routes leads across multiple branch numbers without a unified booking engine.\n\nHere is a live prototype showing how UK practices streamline multi-office intake into a 60-second booking flow:\nhttps://uk-accountancy-os-prototype.vercel.app/\n\nBook a call with me here: [Link to Book a Call]`
  },
  {
    domainKeyword: 'hslaccountancy',
    businessName: 'HSL Accountancy Solutions',
    phone: '+447926450250',
    trade: 'Accountants & Tax Consultants',
    location: 'Hounslow / West London',
    frictionBadge: 'Static Brochure & Missing Calendar Hold',
    pageLocation: 'Homepage & /contact',
    observableFriction: 'Traditional static brochure site lacking interactive proof, fee estimates, or real-time appointment booking.',
    consequenceMechanics: 'Visitors postpone reaching out and often hire the first practice that provides instant scheduling confirmation.',
    prototypeRemedy: 'Practice Hub with instant tax calculations, fee tiering, and direct calendar selection.',
    customNotes: `• VERIFIED FLAW: Traditional brochure layout with zero interactive client tooling.\n• LOCATION: Homepage & /contact.\n• COMMERCIAL LEAK: After-hours SME traffic is completely unmonetized; leads bounce.\n• PROTOTYPE FIX: 24/7 calendar reservation + Corporation Tax calculation slider.`,
    whatsappMsg1: `Hi team 👋 Came across HSL Accountancy Solutions in West London — quick question: how do you currently capture local SME directors who search your practice in the evening after hours?`,
    whatsappMsg2: `Reason I ask is that hslaccountancysolutions.co.uk uses a traditional format where visitors have to wait for an email callback. Most directors browsing at night prefer securing an appointment on the spot.`,
    whatsappMsg3: `We built a working prototype demonstrating how progressive accountancy firms capture those after-hours leads:\nhttps://uk-accountancy-os-prototype.vercel.app/\n\nIt gives clients an instant tax estimate and lets them book directly in 60 seconds.\n\nOpen to a brief 10-minute call to see how this works?\nBook a call with me here: [Link to Book a Call]`,
    whatsappQuick: `Hi team, noticed hslaccountancysolutions.co.uk lacks direct booking for directors researching outside business hours.\n\nTake a look at this live prototype designed to capture and qualify SME accounting leads 24/7:\nhttps://uk-accountancy-os-prototype.vercel.app/\n\nBook a call with me here: [Link to Book a Call]`
  },
  {
    domainKeyword: 'accability',
    businessName: 'AccountAbility Yorkshire Limited',
    phone: '+447766053732',
    trade: 'Accountancy Practice',
    location: 'Yorkshire, UK',
    frictionBadge: 'Unqualified Inbound & Missing Retainer Anchor',
    pageLocation: '/contact-us & services',
    observableFriction: 'Generic inquiry form with no turnover tiering or retainer anchoring, leading to unqualified inbound requests.',
    consequenceMechanics: 'High volume of non-productive discovery calls lowers overall practice billing realization rates.',
    prototypeRemedy: 'Turnover band qualification slider (£150k-£5M) anchoring standard £850/mo retainer tier.',
    customNotes: `• VERIFIED FLAW: Generic contact form with no turnover or budget qualification.\n• LOCATION: /contact-us.\n• COMMERCIAL LEAK: Fee-earners waste time on calls with micro-businesses unable to pay standard retainers.\n• PROTOTYPE FIX: Automatic turnover tiering that anchors £850/mo advisory retainers.`,
    whatsappMsg1: `Hi team 👋 Came across AccountAbility Yorkshire — quick question: when new business enquiries land on accability.co.uk, how do you filter out low-margin leads before partner time is booked?`,
    whatsappMsg2: `Reason I ask is that your contact page accepts enquiries without qualifying turnover or fee expectations. Practices using this traditional format often find their diaries filled with prospects not ready for standard retainer fees.`,
    whatsappMsg3: `We developed a live prototype demonstrating how UK firms automate this pre-qualification:\nhttps://uk-accountancy-os-prototype.vercel.app/\n\nProspects select their turnover bracket, see expected fee bands, and book direct—filtering out tire-kickers automatically.\n\nLet's jump on a quick 10-minute call to walk through the system.\nBook a call with me here: [Link to Book a Call]`,
    whatsappQuick: `Hi team, noticed accability.co.uk accepts general inquiries without turnover tiering, which often burns partner hours on unqualified leads.\n\nHere is a live prototype showing how UK firms pre-qualify retainers and automate bookings:\nhttps://uk-accountancy-os-prototype.vercel.app/\n\nBook a call with me here: [Link to Book a Call]`
  },
  {
    domainKeyword: 'brad-scott',
    businessName: 'Brad Scott CPA',
    phone: '+447654827739',
    trade: 'Certified Public Accountant',
    location: 'Lebanon, IN / Directory Profile',
    frictionBadge: 'Directory Hostage & No Practice Storefront',
    pageLocation: 'Local directory profile page',
    observableFriction: 'Hosted on a 3rd-party directory with no independent modern practice storefront or direct calendar booking.',
    consequenceMechanics: 'Visitors compare competing accountants on the same directory page, leaking high-fee corporate engagements.',
    prototypeRemedy: 'Independent practice portal with custom domain branding, fee calculator, and direct meeting scheduler.',
    customNotes: `• VERIFIED FLAW: Hosted on a generic directory page surrounded by competitor listings.\n• LOCATION: Directory listing.\n• COMMERCIAL LEAK: Zero brand authority; clients compare rivals on the same page.\n• PROTOTYPE FIX: Dedicated practice portal with interactive tax estimator and 60s booking.`,
    whatsappMsg1: `Hi Brad 👋 Quick question regarding your accounting practice: how are commercial clients currently booking consultations with you without competing against directory listings?`,
    whatsappMsg2: `Reason I ask is that your current web profile is hosted within a local directory alongside other pros rather than an authoritative, dedicated practice portal with direct booking.`,
    whatsappMsg3: `We engineered a dedicated client acquisition prototype showing how modern firms capture clients directly:\nhttps://uk-accountancy-os-prototype.vercel.app/\n\nIt features an interactive tax estimator and locks in client appointments in under 60 seconds.\n\nOpen to a brief 10-minute call to see how this elevates your practice?\nBook a call with me here: [Link to Book a Call]`,
    whatsappQuick: `Hi Brad, noticed your web presence is tied to a directory listing with no direct booking engine.\n\nTake a look at this dedicated practice prototype with instant tax tiering and 60-second booking:\nhttps://uk-accountancy-os-prototype.vercel.app/\n\nBook a call with me here: [Link to Book a Call]`
  }
];

async function updateLeads() {
  console.log('🔄 Starting update of target accounting leads in Supabase...');

  for (const item of TARGET_LEADS_DATA) {
    // Locate the lead by domain or business name
    const { data: existingLeads, error: searchErr } = await supabase
      .from('leads')
      .select('id, business_name, website, scraped_metadata')
      .or(`website.ilike.%${item.domainKeyword}%,business_name.ilike.%${item.domainKeyword}%`);

    if (searchErr) {
      console.error(`Error finding lead for ${item.domainKeyword}:`, searchErr.message);
      continue;
    }

    if (!existingLeads || existingLeads.length === 0) {
      console.warn(`⚠️ No lead found matching keyword: ${item.domainKeyword}`);
      continue;
    }

    for (const lead of existingLeads) {
      console.log(`📍 Updating Lead [${lead.id}]: ${lead.business_name || item.businessName}`);

      const updatedMetadata = {
        ...(lead.scraped_metadata || {}),
        trade: item.trade,
        friction_title: item.frictionBadge,
        page_location: item.pageLocation,
        observable_problem: item.observableFriction,
        commercial_consequence: item.consequenceMechanics,
        prototype_remedy: item.prototypeRemedy,
        whatsapp_msg1: item.whatsappMsg1,
        whatsapp_msg2: item.whatsappMsg2,
        whatsapp_msg3: item.whatsappMsg3,
        whatsapp_quick: item.whatsappQuick,
        prototype_url: 'https://uk-accountancy-os-prototype.vercel.app/',
        forensic_notes: item.customNotes
      };

      const { error: updateErr } = await supabase
        .from('leads')
        .update({
          local_business_niche: item.trade,
          notes: item.customNotes,
          scraped_metadata: updatedMetadata
        })
        .eq('id', lead.id);

      if (updateErr) {
        console.error(`❌ Failed to update ${lead.id}:`, updateErr.message);
      } else {
        console.log(`✅ Successfully updated lead ${lead.id} with friction dossier & WhatsApp copy.`);
      }
    }
  }

  console.log('✨ All target leads updated successfully in Supabase.');
}

updateLeads().catch(console.error);
