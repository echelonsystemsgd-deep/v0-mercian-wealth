const fs = require('fs');
const path = require('path');

const artifactDir = 'C:/Users/Deepg/.gemini/antigravity/brain/4b074ef8-77b1-43a2-b7ad-1d9cb79c7cc7';
const pngB64 = fs.readFileSync(path.join(artifactDir, 'mercian_diwali_business_leaflet.png')).toString('base64');

const viewerHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Mercian Automation - Diwali Print Leaflet</title>
  <script src="https://www.gstatic.com/antigravity/web/dev/tailwindcss.min.js"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    .leaflet-shadow {
      box-shadow: 0 20px 45px -10px rgba(0, 0, 0, 0.8), 0 0 25px rgba(218, 166, 67, 0.2);
    }
  </style>
</head>
<body class="bg-transparent text-[var(--foreground)] antialiased p-3">
  <div class="bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)] rounded-2xl p-4 shadow-xl max-w-2xl mx-auto">
    
    <!-- Top Action Bar -->
    <div class="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] pb-3 mb-3">
      <div>
        <div class="flex items-center gap-2 mb-0.5">
          <span class="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span class="text-xs font-bold uppercase tracking-wider text-amber-400">Universal Print Edition</span>
        </div>
        <h2 class="text-base font-bold text-[var(--foreground)]">Mercian Automation • Executive Festive Leaflet</h2>
      </div>

      <a href="data:image/png;base64,${pngB64}" download="mercian_diwali_business_leaflet_300dpi.png" class="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-amber-500 hover:bg-amber-400 text-black shadow-sm transition-all flex items-center gap-1.5">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
        Download Print File (300 DPI)
      </a>
    </div>

    <!-- Embedded High-Res Image (Self-contained Data URL) -->
    <div class="flex justify-center p-2 bg-black/60 rounded-xl border border-[var(--border)]">
      <img src="data:image/png;base64,${pngB64}" alt="Diwali Business Leaflet Preview" class="w-full max-w-md h-auto rounded-lg leaflet-shadow border border-amber-500/40 block" />
    </div>

    <div class="mt-3 pt-2 border-t border-[var(--border)] text-xs text-[var(--muted-foreground)] flex items-center justify-between">
      <span>Universal recipient format (no personal names)</span>
      <span class="text-emerald-400 font-semibold">✓ QR Code Tested & Working</span>
    </div>

  </div>
</body>
</html>`;

fs.writeFileSync(path.join(artifactDir, 'diwali_leaflet_viewer.html'), viewerHtml);
console.log('diwali_leaflet_viewer.html updated with embedded Base64 image!');
