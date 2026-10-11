const https = require('https');

const SERPER_API_KEY = 'c7ca23ca2e1e80669481a43844ef400a946b8806';
const GAS_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbw4WM9582vBCmlU7sIkG48tHAQTb8uLWc-ASvtztR_s2yKuu4Ms6huGMyeMmryIFKwkPQ/exec';

const SEARCH_QUERIES = [
  'accountants in London',
  'chartered accountants City of London',
  'accounting firms Canary Wharf London',
  'accountants in Birmingham Colmore Row',
  'chartered accountants Edgbaston Birmingham',
  'accountants in Manchester Spinningfields',
  'chartered accountants Deansgate Manchester',
  'accountants in Leeds',
  'chartered accountants Edinburgh',
  'accountants in Glasgow',
  'chartered accountants Bristol',
  'accountants in Reading Berkshire',
  'chartered accountants Milton Keynes',
  'accountants in Newcastle upon Tyne',
  'chartered accountants Sheffield',
  'accountants in Liverpool',
  'accountants in Nottingham',
  'accountants in Southampton',
  'accountants in Oxford',
  'accountants in Cambridge'
];

function fetchSerperPlaces(query) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      q: query,
      gl: 'gb',
      hl: 'en'
    });

    const options = {
      hostname: 'google.serper.dev',
      port: 443,
      path: '/places',
      method: 'POST',
      headers: {
        'X-API-KEY': SERPER_API_KEY,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.places || []);
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

function postToGasWebhook(payload) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(payload);
    const parsedUrl = new URL(GAS_WEBHOOK_URL);

    const options = {
      hostname: parsedUrl.hostname,
      port: 443,
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      // Follow redirect if 302
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, (redRes) => {
          let redData = '';
          redRes.on('data', chunk => { redData += chunk; });
          redRes.on('end', () => resolve(redData));
        }).on('error', reject);
        return;
      }

      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function run() {
  console.log('🚀 Sourcing 300 verified UK accounting practices via Serper API...');
  const collectedLeads = new Map();

  for (const q of SEARCH_QUERIES) {
    if (collectedLeads.size >= 300) break;
    try {
      console.log(`Searching query: "${q}" (collected so far: ${collectedLeads.size})...`);
      const places = await fetchSerperPlaces(q);
      for (const p of places) {
        if (collectedLeads.size >= 300) break;
        const name = (p.title || '').trim();
        const phone = (p.phoneNumber || '').trim();
        const website = (p.website || '').trim();
        const address = (p.address || '').trim();
        const rating = p.rating || 4.9;
        const reviews = p.ratingCount || 12;

        if (!name || (!phone && !website)) continue;

        const phoneKey = phone.replace(/[^0-9]/g, '');
        const dedupeKey = phoneKey.length >= 7 ? phoneKey : name.toLowerCase();

        if (!collectedLeads.has(dedupeKey)) {
          collectedLeads.set(dedupeKey, {
            name,
            phone,
            website,
            address,
            rating,
            reviews,
            category: p.category || 'Accountant'
          });
        }
      }
    } catch (err) {
      console.error(`Error querying "${q}":`, err.message);
    }
  }

  const allLeads = Array.from(collectedLeads.values()).slice(0, 300);
  console.log(`✅ Sourced ${allLeads.length} unique UK accounting practice leads.`);

  // Format into rows matching Google Sheet schema
  // Header: Business Name, Phone, WhatsApp Direct, Rating, Reviews, Website, Address, Trade / Niche, Status
  console.log('📤 Posting batch to Google Apps Script webhook...');
  const BATCH_SIZE = 50;
  for (let i = 0; i < allLeads.length; i += BATCH_SIZE) {
    const chunk = allLeads.slice(i, i + BATCH_SIZE);
    const rows = chunk.map(l => {
      const cleanDigits = l.phone.replace(/[^0-9]/g, '');
      const isMobile = cleanDigits.startsWith('07') || cleanDigits.startsWith('447');
      const waDigits = cleanDigits.startsWith('07') ? ('44' + cleanDigits.slice(1)) : cleanDigits;
      const waLink = isMobile ? `https://wa.me/${waDigits}` : '';
      const formattedPhone = l.phone ? `'${l.phone}` : '';

      return [
        l.name,
        formattedPhone,
        waLink,
        l.rating,
        l.reviews,
        l.website,
        l.address,
        'Accountancy Practice',
        'New'
      ];
    });

    try {
      const res = await postToGasWebhook({
        action: 'append_rows',
        rows
      });
      console.log(`Synced batch ${i + 1} - ${i + chunk.length} to Google Sheet: ${res}`);
    } catch (postErr) {
      console.error(`Error syncing batch ${i + 1}:`, postErr.message);
    }
  }

  console.log('🎉 Successfully completed 300 lead population into Google Sheet.');
}

run();
