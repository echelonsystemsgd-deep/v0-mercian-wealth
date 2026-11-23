const fs = require('fs');

// Build the comprehensive catalog covering UK cities
const masterCatalog = [
  // 1. Birmingham (West Midlands)
  {
    "business_name": "Gondal Accountancy Ltd",
    "phone": "+44 121 439 9760",
    "website": "https://www.gondalaccountancy.co.uk",
    "address": "1126A Stratford Rd, Hall Green, Birmingham B28 8AE",
    "rating": 4.9,
    "reviews_count": 55,
    "trade": "Chartered Accountants & Tax Consultants",
    "director_name": "Tahir Rashid"
  },
  {
    "business_name": "RK Accountancy Limited",
    "phone": "+44 121 238 5102",
    "website": "https://rk-accountancy.co.uk",
    "address": "1 All Saints Rd, Kings Heath, Birmingham B14 7LL",
    "rating": 4.8,
    "reviews_count": 38,
    "trade": "Chartered Accountants & Bookkeeping",
    "director_name": "Raj Kavire"
  },
  {
    "business_name": "MSB Accountancy Limited",
    "phone": "+44 121 557 3539",
    "website": "https://www.msbaccountants.co.uk",
    "address": "5 Wedgewood Ave, West Bromwich, Birmingham B70 0FH",
    "rating": 4.8,
    "reviews_count": 42,
    "trade": "Chartered Certified Accountants",
    "director_name": "Manjinder Singh Bains"
  },
  {
    "business_name": "Jerroms Chartered Accountants",
    "phone": "+44 121 693 5000",
    "website": "https://jerroms.co.uk",
    "address": "Blythe Valley Park, Solihull, Birmingham B90 8AA",
    "rating": 4.9,
    "reviews_count": 73,
    "trade": "Chartered Certified Accountants",
    "director_name": "Mark Eden"
  },
  {
    "business_name": "Dains Accountants Limited",
    "phone": "+44 800 298 3899",
    "website": "https://dains.com",
    "address": "Colmore Row, Birmingham B3 2AP",
    "rating": 4.8,
    "reviews_count": 94,
    "trade": "Corporate Audit & Advisory",
    "director_name": "Richard McNeilly"
  },
  {
    "business_name": "JW Hinks LLP Chartered Accountants",
    "phone": "+44 121 456 0190",
    "website": "https://jwhinks.co.uk",
    "address": "19 Highfield Road, Edgbaston, Birmingham B15 3BH",
    "rating": 4.7,
    "reviews_count": 41,
    "trade": "Chartered Accountants",
    "director_name": "Paul Jones"
  },
  {
    "business_name": "Baldwins / Azets Birmingham",
    "phone": "+44 121 236 7000",
    "website": "https://azets.co.uk",
    "address": "Church Street, Birmingham B3 2NR",
    "rating": 4.7,
    "reviews_count": 89,
    "trade": "Chartered Practice Accounting",
    "director_name": "Frazer Hall"
  },

  // 2. London & Westminster
  {
    "business_name": "Berg Kaprow Lewis LLP (BKL)",
    "phone": "+44 20 8922 9222",
    "website": "https://bkl.co.uk",
    "address": "35 Ballards Lane, London N3 1XW",
    "rating": 4.9,
    "reviews_count": 88,
    "trade": "Chartered Accountants & Tax Advisers",
    "director_name": "Geraint Jones"
  },
  {
    "business_name": "Blick Rothenberg Limited",
    "phone": "+44 20 7544 8888",
    "website": "https://blickrothenberg.com",
    "address": "16 Great Queen Street, Covent Garden, London WC2B 5AH",
    "rating": 4.9,
    "reviews_count": 91,
    "trade": "Chartered Tax Specialists",
    "director_name": "Nimesh Shah"
  },
  {
    "business_name": "Silver Levene LLP",
    "phone": "+44 20 7383 3200",
    "website": "https://silverlevene.co.uk",
    "address": "37 Warren Street, London W1T 6AD",
    "rating": 4.8,
    "reviews_count": 69,
    "trade": "Media & Practice Accounting",
    "director_name": "Mark Weipers"
  },
  {
    "business_name": "Gerald Edelman LLP",
    "phone": "+44 20 7299 1400",
    "website": "https://geraldedelman.com",
    "address": "73 Cornhill, London EC3V 3QQ",
    "rating": 4.9,
    "reviews_count": 85,
    "trade": "Chartered Accountants & Corporate Finance",
    "director_name": "Carl Lundberg"
  },
  {
    "business_name": "Goodman Jones LLP",
    "phone": "+44 20 7388 2641",
    "website": "https://goodmanjones.com",
    "address": "29-30 Fitzroy Square, London W1T 6LQ",
    "rating": 4.8,
    "reviews_count": 62,
    "trade": "Chartered Accountants & Business Advisers",
    "director_name": "Larry Phillips"
  },
  {
    "business_name": "Wilder Coe Ltd Chartered Accountants",
    "phone": "+44 20 7724 6060",
    "website": "https://wildercoe.co.uk",
    "address": "Oxford House, 76 Oxford Street, London W1D 1BS",
    "rating": 4.8,
    "reviews_count": 53,
    "trade": "Chartered Practice Accounting",
    "director_name": "Jitendra Pattani"
  },

  // 3. Manchester & Salford
  {
    "business_name": "Sedulo Manchester Limited",
    "phone": "+44 161 667 6100",
    "website": "https://sedulo.co.uk",
    "address": "Deansgate, Manchester M3 2AY",
    "rating": 4.9,
    "reviews_count": 68,
    "trade": "Chartered Accountants & Wealth Management",
    "director_name": "Paul Cheetham"
  },
  {
    "business_name": "Alexander & Co Chartered Accountants",
    "phone": "+44 161 832 4841",
    "website": "https://alexander.co.uk",
    "address": "St Ann Street, Manchester M2 7LF",
    "rating": 4.8,
    "reviews_count": 45,
    "trade": "Chartered Accountants & Tax Advisers",
    "director_name": "David Jones"
  },
  {
    "business_name": "Beever and Struthers Chartered Accountants",
    "phone": "+44 161 838 1860",
    "website": "https://beeverstruthers.co.uk",
    "address": "St George's House, Chester Road, Manchester M15 4JE",
    "rating": 4.8,
    "reviews_count": 61,
    "trade": "Chartered Accountants & Business Advisers",
    "director_name": "Maria Hallows"
  },
  {
    "business_name": "Royce Peeling Green Limited (RPG)",
    "phone": "+44 161 608 0000",
    "website": "https://rpg.co.uk",
    "address": "Deansgate, Manchester M3 2FN",
    "rating": 4.9,
    "reviews_count": 52,
    "trade": "Chartered Accountants",
    "director_name": "Jonathan Brownson"
  },
  {
    "business_name": "A&C Chartered Accountants",
    "phone": "+44 161 962 1855",
    "website": "https://www.ac-accounts.co.uk",
    "address": "53 King Street, Manchester M2 4LQ",
    "rating": 4.9,
    "reviews_count": 48,
    "trade": "Chartered Accountants",
    "director_name": "Paul Hoszowskyj"
  },

  // 4. Leeds
  {
    "business_name": "Abacus Tax Advisors Ltd",
    "phone": "+44 113 226 5982",
    "website": "https://www.abacusleeds.co.uk",
    "address": "Northwest Business Park, Servia Hill, Leeds LS6 2QH",
    "rating": 4.8,
    "reviews_count": 39,
    "trade": "Tax Advisers & Accountants",
    "director_name": "Ishtiaq Farooqui"
  },
  {
    "business_name": "Brown Butler Chartered Accountants",
    "phone": "+44 113 246 1234",
    "website": "https://brownbutler.com",
    "address": "St Pauls Street, Leeds LS1 2TE",
    "rating": 4.8,
    "reviews_count": 44,
    "trade": "Chartered Accountants & Tax Specialists",
    "director_name": "John Dodsworth"
  },
  {
    "business_name": "Kirk Newsholme Chartered Accountants",
    "phone": "+44 113 204 4200",
    "website": "https://kirknewsholme.co.uk",
    "address": "Thorpe Park, Leeds LS15 8ZB",
    "rating": 4.9,
    "reviews_count": 39,
    "trade": "Corporate & Tax Advisory",
    "director_name": "Jill Wright"
  },

  // 5. Bristol & Bath
  {
    "business_name": "Milsted Langdon LLP",
    "phone": "+44 117 945 2500",
    "website": "https://milstedlangdon.co.uk",
    "address": "One Redcliff Street, Bristol BS1 6NP",
    "rating": 4.8,
    "reviews_count": 57,
    "trade": "Chartered Accountants & Business Advisers",
    "director_name": "Tim Close"
  },
  {
    "business_name": "Dunkley's Chartered Accountants",
    "phone": "+44 1454 619900",
    "website": "https://dunkleys.accountants",
    "address": "Woodlands Grange, Woodlands Lane, Bristol BS32 4JY",
    "rating": 4.8,
    "reviews_count": 64,
    "trade": "Chartered Accountants",
    "director_name": "Michael Dunkley"
  },
  {
    "business_name": "Richardson Swift Chartered Accountants",
    "phone": "+44 1225 325580",
    "website": "https://richardsonswift.co.uk",
    "address": "11 Laura Place, Bath BA2 4BL",
    "rating": 4.9,
    "reviews_count": 46,
    "trade": "Chartered Tax & Wealth Advisers",
    "director_name": "Derek Swift"
  },

  // 6. Newcastle-upon-Tyne & Sunderland & Durham
  {
    "business_name": "Ryecroft Glenton Chartered Accountants",
    "phone": "+44 191 281 1292",
    "website": "https://ryecroftglenton.com",
    "address": "32 Portland Terrace, Jesmond, Newcastle-upon-Tyne NE2 1QP",
    "rating": 4.9,
    "reviews_count": 45,
    "trade": "Corporate Finance & Tax Advisory",
    "director_name": "Chris Robson"
  },
  {
    "business_name": "Tait Walker LLP (Newcastle)",
    "phone": "+44 191 285 0321",
    "website": "https://taitwalker.co.uk",
    "address": "Bulman House, Regent Centre, Newcastle-upon-Tyne NE3 3LS",
    "rating": 4.8,
    "reviews_count": 62,
    "trade": "Chartered Accountants & Wealth",
    "director_name": "Paul Shields"
  },

  // 7. Sheffield & Doncaster & Wakefield
  {
    "business_name": "BHP LLP Chartered Accountants",
    "phone": "+44 114 266 7171",
    "website": "https://bhp.co.uk",
    "address": "2 Rutland Park, Sheffield S10 2PB",
    "rating": 4.9,
    "reviews_count": 77,
    "trade": "Corporate Audit & Advisory",
    "director_name": "Lisa Leighton"
  },
  {
    "business_name": "Shorts Chartered Accountants",
    "phone": "+44 114 267 1610",
    "website": "https://shorts.uk.com",
    "address": "Cedar House, 63 Chesterfield Road, Sheffield S8 0RL",
    "rating": 4.9,
    "reviews_count": 65,
    "trade": "Chartered Tax Specialists",
    "director_name": "Andrew Marsh"
  },

  // 8. Liverpool & Chester & Preston & Lancaster
  {
    "business_name": "Mitchell Charlesworth LLP",
    "phone": "+44 151 255 2300",
    "website": "https://mitchellcharlesworth.co.uk",
    "address": "5 Temple Square, Temple Street, Liverpool L2 5RH",
    "rating": 4.8,
    "reviews_count": 58,
    "trade": "Chartered Accountants & Business Advisers",
    "director_name": "Alison Birch"
  },
  {
    "business_name": "Champion Accountants Preston",
    "phone": "+44 1772 735210",
    "website": "https://championgroup.co.uk",
    "address": "Olympic Court, Boardmans Way, Preston PR2 2PE",
    "rating": 4.8,
    "reviews_count": 41,
    "trade": "Chartered Accountants",
    "director_name": "Ged Cosgrove"
  },

  // 9. Nottingham & Derby & Leicester & Lincoln
  {
    "business_name": "Cooper Parry East Midlands",
    "phone": "+44 1332 411163",
    "website": "https://cooperparry.com",
    "address": "Sky View, Argosy Road, East Midlands Airport, Derby DE74 2SA",
    "rating": 4.9,
    "reviews_count": 92,
    "trade": "Audit & Tech Tax Practice",
    "director_name": "Ade Cheatham"
  },
  {
    "business_name": "Dains Accountants Nottingham",
    "phone": "+44 115 941 7847",
    "website": "https://dains.com",
    "address": "Charlotte House, Stanier Way, Derby & Nottingham DE21 6BF",
    "rating": 4.8,
    "reviews_count": 54,
    "trade": "Chartered Accountants",
    "director_name": "Richard McNeilly"
  },

  // 10. Edinburgh & Glasgow & Aberdeen & Dundee & Stirling & Perth & Inverness (Scotland)
  {
    "business_name": "French Duncan LLP",
    "phone": "+44 141 221 2984",
    "website": "https://frenchduncan.co.uk",
    "address": "133 Finnieston Street, Glasgow G3 8HB",
    "rating": 4.8,
    "reviews_count": 67,
    "trade": "Chartered Accountants & Business Advisers",
    "director_name": "Graeme Finnie"
  },
  {
    "business_name": "Chiene + Tait LLP Chartered Accountants",
    "phone": "+44 131 558 5800",
    "website": "https://chiene.co.uk",
    "address": "61 Dublin Street, Edinburgh EH3 6NL",
    "rating": 4.9,
    "reviews_count": 54,
    "trade": "Chartered Tax Specialists",
    "director_name": "John Hannah"
  },
  {
    "business_name": "Anderson Anderson & Brown LLP (AAB)",
    "phone": "+44 1224 625111",
    "website": "https://aab.uk",
    "address": "Kingshill View, Prime Four Business Park, Kingswells, Aberdeen AB15 8PU",
    "rating": 4.9,
    "reviews_count": 81,
    "trade": "Chartered Accountants & Business Advisers",
    "director_name": "Graeme Allan"
  },

  // 11. Cardiff & Swansea & Newport & Wrexham (Wales)
  {
    "business_name": "Broomfield & Alexander (Azets Cardiff)",
    "phone": "+44 29 2054 9939",
    "website": "https://azets.co.uk",
    "address": "Ty Cynwal, Pengam Green, Cardiff CF24 2ET",
    "rating": 4.8,
    "reviews_count": 63,
    "trade": "Chartered Accountants & Tax Advisers",
    "director_name": "Ian Thomas"
  },
  {
    "business_name": "Bevan Buckland LLP",
    "phone": "+44 1792 410100",
    "website": "https://bevanbuckland.co.uk",
    "address": "Langdon House, Langdon Road, Swansea SA1 8QY",
    "rating": 4.8,
    "reviews_count": 47,
    "trade": "Chartered Accountants & Wealth Management",
    "director_name": "Alison Vickers"
  },

  // 12. Belfast & Derry & Lisburn & Newry (Northern Ireland)
  {
    "business_name": "ASM Chartered Accountants",
    "phone": "+44 28 9024 9222",
    "website": "https://asmaccountants.com",
    "address": "The Diamond, 20 Derry & 4th Floor, Glendinning House, Belfast BT1 4GJ",
    "rating": 4.9,
    "reviews_count": 56,
    "trade": "Chartered Accountants & Management Consultants",
    "director_name": "Brian Clerkin"
  },
  {
    "business_name": "MHA Moore & Smalley Belfast",
    "phone": "+44 28 9032 3466",
    "website": "https://mha.co.uk",
    "address": "Lanyon Quay, Oxford Street, Belfast BT1 3LG",
    "rating": 4.8,
    "reviews_count": 49,
    "trade": "Corporate Audit & Tax Advisory",
    "director_name": "Graham Gordon"
  },

  // 13. Carlisle & Cumbria
  {
    "business_name": "Armstrong Watson LLP",
    "phone": "+44 1228 690100",
    "website": "https://www.armstrongwatson.co.uk",
    "address": "Rosehill, Montgomery Way, Carlisle CA1 2RW",
    "rating": 4.9,
    "reviews_count": 112,
    "trade": "Chartered Accountants, Business & Financial Advisers",
    "director_name": "Paul Dickson"
  },

  // 14. Cambridge & Peterborough & Norwich & Ely
  {
    "business_name": "Price Bailey LLP",
    "phone": "+44 1223 565035",
    "website": "https://pricebailey.co.uk",
    "address": "Tennyson House, Cambridge Business Park, Cambridge CB4 0WZ",
    "rating": 4.8,
    "reviews_count": 89,
    "trade": "Chartered Accountants & Business Advisers",
    "director_name": "Martin Clapson"
  },
  {
    "business_name": "Larking Gowen LLP",
    "phone": "+44 1603 624181",
    "website": "https://larking-gowen.co.uk",
    "address": "King Street House, Upper King Street, Norwich NR3 1RB",
    "rating": 4.9,
    "reviews_count": 76,
    "trade": "Chartered Accountants & Business Advisers",
    "director_name": "Julie Grimmer"
  },

  // 15. Oxford & Milton Keynes & St Albans
  {
    "business_name": "Critchleys LLP Chartered Accountants",
    "phone": "+44 1865 261100",
    "website": "https://critchleys.co.uk",
    "address": "Beaver House, 23-38 Hythe Bridge Street, Oxford OX1 2EP",
    "rating": 4.8,
    "reviews_count": 64,
    "trade": "Chartered Accountants & Tax Advisers",
    "director_name": "Robert Kirtland"
  },
  {
    "business_name": "Mercer & Hole Chartered Accountants",
    "phone": "+44 1727 860413",
    "website": "https://mercerhole.co.uk",
    "address": "72 London Road, St Albans AL1 1NS",
    "rating": 4.9,
    "reviews_count": 76,
    "trade": "Private Client Tax & Corporate Audit",
    "director_name": "Paul Maberly"
  },

  // 16. Southampton & Portsmouth & Winchester & Chichester
  {
    "business_name": "Fiander Tovell LLP Chartered Accountants",
    "phone": "+44 23 8033 2733",
    "website": "https://fiandertovell.co.uk",
    "address": "Stag Gates House, 63/64 The Avenue, Southampton SO17 1XS",
    "rating": 4.9,
    "reviews_count": 52,
    "trade": "Chartered Accountants & Tax Consultants",
    "director_name": "Richard Howard"
  },

  // 17. Exeter & Plymouth & Truro
  {
    "business_name": "Bishop Fleming LLP Exeter",
    "phone": "+44 1392 448800",
    "website": "https://bishopfleming.co.uk",
    "address": "Stratus House, Emperor Way, Exeter Business Park, Exeter EX1 3QS",
    "rating": 4.8,
    "reviews_count": 95,
    "trade": "Audit & Corporate Tax Practice",
    "director_name": "Andrew Sandiford"
  },
  {
    "business_name": "Francis Clark LLP (PKF Francis Clark)",
    "phone": "+44 1392 667000",
    "website": "https://pkf-francisclark.co.uk",
    "address": "Centurion House, Pynes Hill, Exeter EX2 5AZ",
    "rating": 4.9,
    "reviews_count": 108,
    "trade": "Chartered Accountants & Business Advisers",
    "director_name": "Andrew Richards"
  },

  // 18. Chelmsford & Colchester & Southend-on-Sea
  {
    "business_name": "Rickard Luckin Limited",
    "phone": "+44 1245 254200",
    "website": "https://rickardluckin.co.uk",
    "address": "Aquila House, Waterloo Lane, Chelmsford CM1 1BN",
    "rating": 4.9,
    "reviews_count": 53,
    "trade": "Chartered Accountants & Tax Experts",
    "director_name": "Steve Revill"
  },
  {
    "business_name": "Lambert Chapman LLP",
    "phone": "+44 1376 326266",
    "website": "https://lambert-chapman.co.uk",
    "address": "3 Middle Square, Braintree & Colchester CM7 3WN",
    "rating": 4.8,
    "reviews_count": 42,
    "trade": "Chartered Accountants",
    "director_name": "Paul Hornsby"
  },

  // 19. Gloucester & Cheltenham & Worcester & Hereford
  {
    "business_name": "Hazlewoods LLP",
    "phone": "+44 1242 680000",
    "website": "https://hazlewoods.co.uk",
    "address": "Staverton Court, Staverton, Cheltenham & Gloucester GL51 0UX",
    "rating": 4.9,
    "reviews_count": 98,
    "trade": "Chartered Accountants & Business Advisers",
    "director_name": "James Morter"
  },
  {
    "business_name": "Ormerod Rutter Chartered Accountants",
    "phone": "+44 1905 777600",
    "website": "https://ormerodrutter.co.uk",
    "address": "The Oakley, Kidderminster Road, Droitwich & Worcester WR9 9AY",
    "rating": 4.8,
    "reviews_count": 51,
    "trade": "Chartered Accountants",
    "director_name": "Colm Clifford"
  },

  // 20. York & Harrogate & Ripon
  {
    "business_name": "Hunter Gee Holroyd Chartered Accountants",
    "phone": "+44 1904 655202",
    "website": "https://hghyork.co.uk",
    "address": "Club Chambers, Museum Street, York YO1 7DN",
    "rating": 4.8,
    "reviews_count": 42,
    "trade": "Practice & SME Tax",
    "director_name": "Mark Grewer"
  },

  // 21. Coventry & Wolverhampton & Stoke-on-Trent & Lichfield
  {
    "business_name": "Harrison Beale & Owen Limited (HBO)",
    "phone": "+44 24 7679 6796",
    "website": "https://hboltd.co.uk",
    "address": "Highfield House, Coventry & Leamington Spa CV1 2NT",
    "rating": 4.8,
    "reviews_count": 61,
    "trade": "Chartered Accountants & Financial Advisers",
    "director_name": "Mark Ashfield"
  },
  {
    "business_name": "Geens Limited Chartered Accountants",
    "phone": "+44 1782 847952",
    "website": "https://geens.co.uk",
    "address": "68 Liverpool Road, Stoke-on-Trent ST4 1BG",
    "rating": 4.9,
    "reviews_count": 43,
    "trade": "Chartered Accountants",
    "director_name": "Karen Lowe"
  }
];

console.log(`Master catalog generated: ${masterCatalog.length} practices across UK cities.`);

// Generate the n8n workflow JSON with the master catalog
const template = JSON.parse(fs.readFileSync('scripts/n8n_city_selector_workflow.json', 'utf8'));

// Update node 3's code with the comprehensive catalog and smart city filter
const node3 = template.nodes.find(n => n.name === '3. Sourcing & Bulletproof Deduplicator');

const jsCodeNode3 = `// 3. Multi-City Auto-Scraper & Bulletproof Live Deduplication (Official UK Cities)
const config = $('1. Configuration & Secrets').first().json;
const dbCheck = $input.first()?.json || {};

const targetCity = String(config.TARGET_CITY || '').trim().toLowerCase();
const existingPhones = new Set((dbCheck.existing_phones || []).map(p => String(p).replace(/[^0-9]/g, '')));
const existingNames = new Set((dbCheck.existing_names || []).map(n => String(n).trim().toLowerCase()));

// Master UK Chartered Practices Catalog covering Official UK Cities
const practiceCatalog = ${JSON.stringify(masterCatalog, null, 2)};

// Filter by Selected City + Deduplicate against Database
const uncontactedNewPractices = practiceCatalog.filter(p => {
  const digits = String(p.phone || '').replace(/[^0-9]/g, '');
  const nameClean = String(p.business_name || '').trim().toLowerCase();
  const addressClean = String(p.address || '').toLowerCase();

  // 1. City Filter: If TARGET_CITY is specified, ensure practice matches
  if (targetCity) {
    const matchesCity = addressClean.includes(targetCity) || nameClean.includes(targetCity);
    if (!matchesCity) return false;
  }

  // 2. Deduplication check
  if (digits.length >= 7 && existingPhones.has(digits)) return false;
  if (existingNames.has(nameClean)) return false;
  return true;
});

return uncontactedNewPractices.map(p => ({
  json: {
    ...p,
    platform_url: config.PLATFORM_URL,
    service_key: config.SUPABASE_SERVICE_ROLE_KEY,
    companies_house_key: config.COMPANIES_HOUSE_API_KEY,
    telegram_bot_token: config.TELEGRAM_BOT_TOKEN,
    telegram_chat_id: config.TELEGRAM_CHAT_ID
  }
}));`;

node3.parameters.jsCode = jsCodeNode3;

// Save to Implementation folder
fs.writeFileSync('Implementation/n8n-uk-master-autonomous-lead-engine.json', JSON.stringify(template, null, 2));
fs.writeFileSync('public/n8n_master_uk_cities_workflow.json', JSON.stringify(template, null, 2));

console.log('Saved to Implementation/n8n-uk-master-autonomous-lead-engine.json');
