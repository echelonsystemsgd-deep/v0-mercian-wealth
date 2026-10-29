const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const artifactDir = 'C:/Users/Deepg/.gemini/antigravity/brain/4b074ef8-77b1-43a2-b7ad-1d9cb79c7cc7';
const logoPath = path.join(artifactDir, 'brand_logo.jpg');
const qrPath = path.join(artifactDir, 'clean_qr.png');

const logoB64 = fs.readFileSync(logoPath).toString('base64');
const qrB64 = fs.readFileSync(qrPath).toString('base64');

// 1200 x 1700 High-Resolution Canvas (300 DPI A5 / A6 Leaflet Master)
const width = 1200;
const height = 1700;

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#040507" />
      <stop offset="40%" stop-color="#0a0b10" />
      <stop offset="100%" stop-color="#050508" />
    </linearGradient>

    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FCE588" />
      <stop offset="30%" stop-color="#DAA640" />
      <stop offset="70%" stop-color="#C9932B" />
      <stop offset="100%" stop-color="#93630A" />
    </linearGradient>

    <linearGradient id="goldGradSoft" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#DAA640" stop-opacity="0.05" />
      <stop offset="50%" stop-color="#DAA640" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#DAA640" stop-opacity="0.05" />
    </linearGradient>

    <radialGradient id="diyaLightTop" cx="50%" cy="15%" r="45%">
      <stop offset="0%" stop-color="#DAA640" stop-opacity="0.22" />
      <stop offset="60%" stop-color="#DAA640" stop-opacity="0.04" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>

    <radialGradient id="diyaLightBottom" cx="80%" cy="85%" r="35%">
      <stop offset="0%" stop-color="#DAA640" stop-opacity="0.15" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>

    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="18" flood-color="#000000" flood-opacity="0.8" />
    </filter>
  </defs>

  <!-- Background Base Canvas -->
  <rect x="0" y="0" width="${width}" height="${height}" fill="url(#bgGradient)" />
  <rect x="0" y="0" width="${width}" height="${height}" fill="url(#diyaLightTop)" />
  <rect x="0" y="0" width="${width}" height="${height}" fill="url(#diyaLightBottom)" />

  <!-- Outer Luxury Border with Corner Accents -->
  <rect x="45" y="45" width="1110" height="1610" rx="16" fill="none" stroke="url(#goldGrad)" stroke-width="2" stroke-opacity="0.45" />
  <rect x="55" y="55" width="1090" height="1590" rx="12" fill="none" stroke="#DAA640" stroke-width="1" stroke-opacity="0.15" stroke-dasharray="6,6" />

  <!-- Corner Ornament Accents -->
  <path d="M 40,75 L 75,40 M 40,40 L 40,80 M 40,40 L 80,40" stroke="url(#goldGrad)" stroke-width="2" fill="none" />
  <path d="M 1160,75 L 1125,40 M 1160,40 L 1160,80 M 1160,40 L 1120,40" stroke="url(#goldGrad)" stroke-width="2" fill="none" />
  <path d="M 40,1625 L 75,1660 M 40,1660 L 40,1620 M 40,1660 L 80,1660" stroke="url(#goldGrad)" stroke-width="2" fill="none" />
  <path d="M 1160,1625 L 1125,1660 M 1160,1660 L 1160,1620 M 1160,1660 L 1120,1660" stroke="url(#goldGrad)" stroke-width="2" fill="none" />

  <!-- TOP SECTION: Auspicious Festive Header (Wholesome & Universal) -->
  <g transform="translate(600, 120)" text-anchor="middle">
    <text y="0" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="16" font-weight="700" letter-spacing="6" fill="#DAA640">
      ✦ SHUBH DEEPAVALI &amp; NEW SAMVAT ✦
    </text>
    
    <text y="46" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="40" font-weight="800" fill="#FFFFFF" letter-spacing="-0.5">
      Wishing You Abundance, Light &amp; Prosperity
    </text>

    <!-- Warm Wholesome Festive Greeting -->
    <text y="88" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="18" font-weight="400" fill="#D1D5DB" letter-spacing="0.2">
      May this auspicious festival of lights illuminate your home, bring peace to your family,
    </text>
    <text y="116" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="18" font-weight="400" fill="#D1D5DB" letter-spacing="0.2">
      and bless your business with compounding growth, clarity, and limitless scale in the year ahead.
    </text>
  </g>

  <!-- Gold Divider Line -->
  <line x1="250" y1="285" x2="950" y2="285" stroke="url(#goldGradSoft)" stroke-width="2" />

  <!-- SECTION 2: What We Do (Universal & Wholesome) -->
  <g transform="translate(100, 320)">
    <!-- Section Badge -->
    <rect x="0" y="0" width="300" height="34" rx="17" fill="#DAA640" fill-opacity="0.12" stroke="#DAA640" stroke-opacity="0.35" stroke-width="1" />
    <text x="20" y="22" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="13" font-weight="700" fill="#FCE588" letter-spacing="1.5">
      ✦ OUR PURPOSE &amp; PHILOSOPHY
    </text>

    <!-- Headline -->
    <text x="0" y="80" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="34" font-weight="800" fill="#FFFFFF">
      Spend Time Celebrating. <tspan fill="url(#goldGrad)">Let Smart Systems Run The Grind.</tspan>
    </text>

    <!-- Paragraphs -->
    <text x="0" y="122" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="17.5" font-weight="400" fill="#E5E7EB">
      Our mission is straightforward: give business owners their most irreplaceable asset back—their time.
    </text>
    <text x="0" y="152" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="16.5" font-weight="400" fill="#9CA3AF">
      While you enjoy Diwali with the people who matter most, you shouldn't have to worry about unanswered client inquiries,
    </text>
    <text x="0" y="178" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="16.5" font-weight="400" fill="#9CA3AF">
      missed bookings, or manual bottlenecks. We engineer autonomous systems that manage your revenue growth on autopilot:
    </text>

    <!-- 3 Core Capability Cards -->
    <g transform="translate(0, 215)">
      <!-- Card 1 -->
      <rect x="0" y="0" width="315" height="155" rx="14" fill="#0D0F16" stroke="#DAA640" stroke-opacity="0.25" stroke-width="1" filter="url(#cardShadow)" />
      <circle cx="35" cy="35" r="16" fill="#DAA640" fill-opacity="0.15" />
      <text x="35" y="41" font-family="Arial" font-size="16" fill="#FCE588" text-anchor="middle">⚡</text>
      <text x="65" y="41" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="17" font-weight="700" fill="#FFFFFF">24/7 AI Lead Capture</text>
      <text x="20" y="78" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="13.5" fill="#9CA3AF">Instant replies in under 60 seconds.</text>
      <text x="20" y="100" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="13.5" fill="#9CA3AF">Qualifies high-intent prospects</text>
      <text x="20" y="122" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="13.5" fill="#9CA3AF">and notifies your team immediately.</text>

      <!-- Card 2 -->
      <rect x="342" y="0" width="315" height="155" rx="14" fill="#0D0F16" stroke="#DAA640" stroke-opacity="0.25" stroke-width="1" filter="url(#cardShadow)" />
      <circle cx="377" cy="35" r="16" fill="#DAA640" fill-opacity="0.15" />
      <text x="377" y="41" font-family="Arial" font-size="16" fill="#FCE588" text-anchor="middle">📅</text>
      <text x="407" y="41" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="17" font-weight="700" fill="#FFFFFF">Automated Booking</text>
      <text x="362" y="78" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="13.5" fill="#9CA3AF">Eliminates back-and-forth messages.</text>
      <text x="362" y="100" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="13.5" fill="#9CA3AF">Books pre-screened meetings</text>
      <text x="362" y="122" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="13.5" fill="#9CA3AF">directly into your calendar 24/7.</text>

      <!-- Card 3 -->
      <rect x="684" y="0" width="315" height="155" rx="14" fill="#0D0F16" stroke="#DAA640" stroke-opacity="0.25" stroke-width="1" filter="url(#cardShadow)" />
      <circle cx="719" cy="35" r="16" fill="#DAA640" fill-opacity="0.15" />
      <text x="719" y="41" font-family="Arial" font-size="16" fill="#FCE588" text-anchor="middle">🚀</text>
      <text x="749" y="41" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="17" font-weight="700" fill="#FFFFFF">High-Converting Funnels</text>
      <text x="704" y="78" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="13.5" fill="#9CA3AF">Bespoke high-speed websites</text>
      <text x="704" y="100" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="13.5" fill="#9CA3AF">and automated client intake</text>
      <text x="704" y="122" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="13.5" fill="#9CA3AF">engineered to maximize conversions.</text>
    </g>
  </g>

  <!-- SECTION 3: The Festive Privilege Offer Box (Universal for Anyone) -->
  <g transform="translate(100, 745)">
    <rect x="0" y="0" width="1000" height="350" rx="20" fill="#0A0B10" stroke="url(#goldGrad)" stroke-width="1.5" filter="url(#cardShadow)" />
    
    <!-- Inner Accent Header -->
    <path d="M 0,20 Q 0,0 20,0 L 980,0 Q 1000,0 1000,20 L 1000,56 L 0,56 Z" fill="#141622" />
    <text x="35" y="37" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="14" font-weight="800" fill="#FCE588" letter-spacing="2">
      🎁 YOUR COMPLIMENTARY FESTIVE PRIVILEGE PASS
    </text>
    <text x="965" y="37" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="13" font-weight="600" fill="#9CA3AF" text-anchor="end">
      Valid for Diwali &amp; Q4 Launch
    </text>

    <!-- Two-Column Universal Breakdown -->
    <g transform="translate(35, 78)">
      <!-- Column 1: For Prospective Clients & New Inquiries -->
      <g transform="translate(0, 0)">
        <rect x="0" y="0" width="445" height="235" rx="14" fill="#07080D" stroke="#DAA640" stroke-opacity="0.25" stroke-width="1" />
        <text x="24" y="35" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="16.5" font-weight="800" fill="#FFFFFF">
          For New Partners &amp; Inquiries
        </text>
        <text x="24" y="60" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="14" font-weight="700" fill="#DAA640">
          15-Min Lead Leak &amp; Automation Teardown
        </text>
        
        <text x="24" y="92" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="13" fill="#D1D5DB">
          • Pinpoint 3 places your customer funnel loses inquiries
        </text>
        <text x="24" y="118" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="13" fill="#D1D5DB">
          • Custom 1-page roadmap to reclaim 15+ hours/week
        </text>
        <text x="24" y="144" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="13" fill="#D1D5DB">
          • <tspan font-weight="700" fill="#FCE588">Festive Advantage:</tspan> £500 implementation waiver
        </text>
        <text x="24" y="185" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="12" font-weight="600" fill="#9CA3AF">
          Zero obligation. Built to give clarity heading into the New Year.
        </text>
      </g>

      <!-- Column 2: For Existing Clients & Network -->
      <g transform="translate(485, 0)">
        <rect x="0" y="0" width="445" height="235" rx="14" fill="#07080D" stroke="#DAA640" stroke-opacity="0.25" stroke-width="1" />
        <text x="24" y="35" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="16.5" font-weight="800" fill="#FFFFFF">
          For Existing Partners &amp; Clients
        </text>
        <text x="24" y="60" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="14" font-weight="700" fill="#10B981">
          Complimentary Seasonal Scale Package
        </text>
        
        <text x="24" y="92" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="13" fill="#D1D5DB">
          • Full workflow speed audit &amp; tune-up (Zero cost)
        </text>
        <text x="24" y="118" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="13" fill="#D1D5DB">
          • 1 new automated capability module deployed free
        </text>
        <text x="24" y="144" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="13" fill="#D1D5DB">
          • <tspan font-weight="700" fill="#FCE588">Founder Referral Pass:</tspan> Gift a peer £500 credit
        </text>
        <text x="24" y="185" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="12" font-weight="600" fill="#9CA3AF">
          Our sincere gratitude for trusting us to scale your business.
        </text>
      </g>
    </g>
  </g>

  <!-- SECTION 4: Universal Bottom Bar (Brand Monogram, Contact Info & 100% Working Scannable QR) -->
  <g transform="translate(100, 1140)">
    <rect x="0" y="0" width="1000" height="455" rx="20" fill="#07080B" stroke="#DAA640" stroke-opacity="0.35" stroke-width="1.5" />

    <!-- Left: Brand Identity & Contact Directory (No personal names) -->
    <g transform="translate(45, 45)">
      <!-- Official Brand Logo -->
      <image href="data:image/jpeg;base64,${logoB64}" x="0" y="0" width="95" height="95" preserveAspectRatio="xMidYMid meet" />
      
      <!-- Brand Name -->
      <g transform="translate(115, 25)">
        <text x="0" y="0" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="26" font-weight="900" fill="#FFFFFF" letter-spacing="1">
          MERCIAN <tspan fill="url(#goldGrad)">AUTOMATION</tspan>
        </text>
        <text x="0" y="26" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="14" font-weight="600" fill="#D8A643" letter-spacing="0.5">
          High-Converting Websites &amp; Autonomous AI Systems
        </text>
      </g>

      <!-- Wholesome Universal Team Sign-off (No specific individual names) -->
      <g transform="translate(0, 130)">
        <text x="0" y="0" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="16" font-weight="700" fill="#FCE588">
          "May your year ahead be blessed with health, clarity, and limitless prosperity."
        </text>
        <text x="0" y="28" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="15" font-weight="500" fill="#9CA3AF">
          — Warmest festive wishes from <tspan font-weight="700" fill="#FFFFFF">The Mercian Automation Team</tspan>
        </text>
      </g>

      <!-- Universal Contact Directory -->
      <g transform="translate(0, 205)">
        <rect x="0" y="0" width="550" height="150" rx="12" fill="#0D0F17" stroke="#DAA640" stroke-opacity="0.15" stroke-width="1" />
        
        <g transform="translate(25, 34)">
          <text x="0" y="0" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="14" font-weight="700" fill="#DAA640">🌐 Website:</text>
          <text x="160" y="0" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="14" font-weight="600" fill="#FFFFFF">mercianwealth.co.uk</text>

          <text x="0" y="36" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="14" font-weight="700" fill="#DAA640">📅 Priority Booking:</text>
          <text x="160" y="36" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="14" font-weight="600" fill="#FFFFFF">calendly.com/mercianwealthgs/30min</text>

          <text x="0" y="72" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="14" font-weight="700" fill="#DAA640">💬 Client Support:</text>
          <text x="160" y="72" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="14" font-weight="600" fill="#FFFFFF">Available Throughout Festive Season</text>
        </g>
      </g>
    </g>

    <!-- Right: Verified 100% Scannable QR Code Block with Wide Quiet Zone -->
    <g transform="translate(650, 45)">
      <rect x="0" y="0" width="305" height="365" rx="16" fill="#0C0D14" stroke="url(#goldGrad)" stroke-width="1.5" filter="url(#cardShadow)" />
      
      <!-- Top Callout -->
      <text x="152" y="32" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="13" font-weight="800" fill="#FCE588" text-anchor="middle" letter-spacing="1.5">
        SCAN TO CLAIM SESSION
      </text>

      <!-- The Real Scannable High-Contrast QR Code (Embed with pure quiet zone) -->
      <g transform="translate(48, 50)">
        <rect x="0" y="0" width="210" height="210" rx="12" fill="#FFFFFF" />
        <image href="data:image/png;base64,${qrB64}" x="10" y="10" width="190" height="190" preserveAspectRatio="xMidYMid meet" />
      </g>

      <!-- Subtext under QR -->
      <text x="152" y="285" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="13" font-weight="700" fill="#FFFFFF" text-anchor="middle">
        Scan with Phone Camera
      </text>
      <text x="152" y="308" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11.5" font-weight="500" fill="#9CA3AF" text-anchor="middle">
        Direct link to priority booking calendar
      </text>
      <text x="152" y="332" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" font-weight="700" fill="#DAA640" text-anchor="middle">
        ⚡ Strictly 10 Festive Slots Reserved
      </text>
    </g>
  </g>

  <!-- Bottom Auspicious Sanskrit Blessing -->
  <text x="600" y="1645" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="13" font-weight="600" fill="#DAA640" fill-opacity="0.75" text-anchor="middle" letter-spacing="2">
    शुभ दीपावली • ॐ श्री महालक्ष्म्यै नमः • ABUNDANCE • GROWTH • CLARITY
  </text>
</svg>
`;

// Write the SVG file
const svgOutputPath = path.join(artifactDir, 'mercian_diwali_leaflet.svg');
fs.writeFileSync(svgOutputPath, svg);

// Render to ultra-high-res 300 DPI print-ready PNG and JPG
const pngOutputPath = path.join(artifactDir, 'mercian_diwali_business_leaflet.png');
const jpgOutputPath = path.join(artifactDir, 'mercian_diwali_business_leaflet.jpg');

async function render() {
  await sharp(Buffer.from(svg))
    .png({ quality: 100 })
    .toFile(pngOutputPath);
  console.log('High-Res 300 DPI PNG updated at:', pngOutputPath);

  await sharp(Buffer.from(svg))
    .jpeg({ quality: 96 })
    .toFile(jpgOutputPath);
  console.log('High-Res Print JPG updated at:', jpgOutputPath);
}

render().catch(console.error);
